// ==UserScript==
// @name         Youtube Gentle's Auto Gain
// @author       GentlePuppet
// @version      1.1.1
// @description  This script automatically boosts quiet YouTube videos or lowers loud videos by sampling the average volume and adjusting the gain over a few seconds.
// @include      https://www.youtube.com/*
// @icon         https://www.youtube.com/s/desktop/1eca3218/img/favicon_144.png
// @updateURL    https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Hide%20Watched%20Videos/Dynamic%20Gain.user.js
// @downloadURL  https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Hide%20Watched%20Videos/Dynamic%20Gain.user.js
// ==/UserScript==

if (window.location.href.includes("watch?v=")) {

    // CONFIGURATION — You can tweak these to suit your needs
    const config = {
        targetVolume: 50,           // Target loudness level (higher = louder output gain)
        sampleCount: 100,            // Number of samples taken for volume analysis
        maxGain: 2,                 // Maximum gain multiplier allowed (to avoid distortion)
        sampleInterval: 100,        // Time (ms) between each sample
        resampleEvery: 5000,        // Time (ms) between dynamic gain adjustments
        minVolumeThreshold: 20,     // Skip gain adjustment if average volume is below this (e.g., during silence)
        gainChangeThreshold: 0.35,  // Only apply new gain if change is greater than this (avoids micro adjustments)
        volumeChangeDelay: 2500     // Time (ms) to wait before resampling after volume change
    };
    // CONFIGURATION — You can tweak these to suit your needs

    const audioCtx = new AudioContext();
    const gainNode = audioCtx.createGain();
    const analyser = audioCtx.createAnalyser();

    window.addEventListener("yt-page-data-updated", () => setTimeout(boostAudio, 1000));

    async function boostAudio() {
        const sleep = ms => new Promise(r => setTimeout(r, ms));
        let video = null;

        for (let i = 0; i < 10; i++) {
            video = document.querySelector("video");
            if (video) break;
            await sleep(300);
        }

        if (!video) {
            console.warn("Video element not found.");
            return setTimeout(boostAudio, 1000);
        }

        if (video.paused || video.readyState < 3) {
            await new Promise(resolve => video.addEventListener("playing", function once() {
                video.removeEventListener("playing", once);
                resolve();
            }));
        }

        gainNode.gain.value = 1;
        const source = audioCtx.createMediaElementSource(video);
        source.connect(gainNode);
        gainNode.connect(analyser);
        analyser.connect(audioCtx.destination);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const getAverageVolume = () => {
            analyser.getByteFrequencyData(dataArray);
            return dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        };

        // Overlay
        if (!document.querySelector('.boost-overlay')) {
            const overlay = document.createElement("div");
            overlay.className = "boost-overlay";
            overlay.style.cssText = `height:47px;width:107px;margin-left:8px;display:inline-block;text-shadow:-1px -1px 2px #000,1px -1px 2px #000,-1px 1px 2px #000,1px 1px 2px #000;pointer-events:auto;`;
            overlay.style.fontFamily = 'monospace';
            document.querySelector('.ytp-time-contents')?.appendChild(overlay);
            overlay.textContent = `🔊 Auto Gain: ${gainNode.gain.value.toFixed(2)}×`;
            const style = document.createElement('style');
            style.textContent = `.boost-overlay[data-tooltip]:hover::after {content: attr(data-tooltip);margin-left:-107px;height:47px;width:107px;position: fixed;background: rgba(0, 0, 0, 0.75);color: white;padding: 4px 8px;border-radius: 4px;white-space: nowrap;font-size: 12px;z-index: 9999;}`;
            document.head.appendChild(style);
        }

        let isPaused = video.paused;
        video.addEventListener("pause", () => { isPaused = true; });
        video.addEventListener("play", () => { isPaused = false; });

        // Handle volume change
        let volumeChangeTimeout;
        video.addEventListener("volumechange", () => {
            clearTimeout(volumeChangeTimeout);
            volumeChangeTimeout = setTimeout(() => config.volumeChangeDelay);
        });

        let prevAvgVolume = null;
        const spinnerChars = ['╴', '╯', '╵', '╰', '╶', '╭', '╻', '╮'];
        const spinnerChars2 = ['◴ ', '◷ ', '◶ ', '◵ '];


        let spinnerIndex = 0;

        async function gainAdjustmentLoop() {
            while (true) {
                if (isPaused) {
                    await sleep(500);
                    continue;
                }

                let volumeSum = 0;
                let overlay = document.querySelector('.boost-overlay')
                console.log("Starting sampling loop");
                for (let i = 0; i <= config.sampleCount - 2;) {
                    if (isPaused) {
                        await sleep(500);
                        continue;
                    }

                    volumeSum += getAverageVolume();
                    i++;

                    overlay.textContent = `${spinnerChars2[spinnerIndex % spinnerChars2.length]} Auto Gain: ${gainNode.gain.value.toFixed(2)}×`;
                    overlay.setAttribute("data-tooltip", `(${i + 1}/${config.sampleCount}) Resampling...`);
                    spinnerIndex++;
                    await sleep(config.sampleInterval);
                }
                overlay.setAttribute("data-tooltip", `(${config.sampleCount}/${config.sampleCount}) Resampled`);

                const avgVolume = volumeSum / config.sampleCount;
                if (avgVolume < config.minVolumeThreshold) {
                    overlay.textContent = `🔊 Auto Gain: ${gainNode.gain.value.toFixed(2)}×`;
                } else {
                    const volumeFactor = Math.max(video.volume, 0.1);
                    const suggestedGain = Math.min((config.targetVolume * volumeFactor) / avgVolume, config.maxGain);
                    const currentGain = gainNode.gain.value;
                    if (Math.abs(currentGain - suggestedGain) > config.gainChangeThreshold) {
                        overlay.textContent = `🔊 Auto Gain: ${suggestedGain.toFixed(2)}×`;
                        gainNode.gain.setTargetAtTime(suggestedGain, audioCtx.currentTime, 0.5);
                    } else {
                        overlay.textContent = `🔊 Auto Gain: ${gainNode.gain.value.toFixed(2)}×`;
                    }
                }
                await sleep(config.resampleEvery);
            }
        }
        gainAdjustmentLoop();
    }
}
