// ==UserScript==
// @name         Youtube Gentle's Auto Gain
// @author       GentlePuppet
// @version      1.0
// @include      https://www.youtube.com/*
// @icon         https://www.youtube.com/s/desktop/1eca3218/img/favicon_144.png
// @updateURL    https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/refs/heads/main/Youtube%20Better%20CSS%20Tweaks/Dynamic%20Gain.user.js
// @downloadURL  https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/refs/heads/main/Youtube%20Better%20CSS%20Tweaks/Dynamic%20Gain.user.js
// ==/UserScript==

if (window.location.href.includes("watch?v=")) {

    // CONFIGURATION — You can tweak these to suit your needs
    const targetVolume = 50,           // Target loudness level (higher = louder output gain)
          sampleCount = 150,           // Number of samples taken for initial volume analysis
          maxgain = 2,                 // Maximum gain multiplier allowed (to avoid distortion)
          dynamicSampleCount = 50,    // Samples taken during dynamic resampling (every X seconds)
          dynamicSampleInterval = 100, // Time (ms) between each dynamic sample
          resampleEvery = 5000,       // Time (ms) between dynamic gain adjustments
          minVolumeThreshold = 20,     // Skip gain adjustment if average volume is below this (e.g., during silence)
          gainChangeThreshold = 0.35,  // Only apply new gain if change is greater than this (avoids micro adjustments)
          shortSampleCount = 100,      // Samples taken after changing the volume for resampling
          volumeChangeDelay = 2500;    // Time (ms) to wait before resampling after volume change
    // CONFIGURATION — You can tweak these to suit your needs

    const audioCtx = new AudioContext(),
          source = audioCtx.createMediaElementSource(document.querySelector("video")),
          gainNode = audioCtx.createGain(),
          analyser = audioCtx.createAnalyser();

    window.addEventListener("yt-page-data-updated", () => {
        setTimeout(BoostQuietAudio, 1000);

        async function BoostQuietAudio() {
            let videoElement;
            for (let i = 0; i < 10; i++) {
                videoElement = document.querySelector("video");
                if (videoElement) break;
                await new Promise(r => setTimeout(r, 300));
            }
            if (!videoElement) {
                console.warn("No video element found after delay.");
                setTimeout(BoostQuietAudio, 1000);
                return;
            }

            if (videoElement.paused || videoElement.readyState < 3) {
                console.log("Waiting for video to start playing...");
                await new Promise(resolve => {
                    videoElement.addEventListener("playing", function onPlay() {
                        videoElement.removeEventListener("playing", onPlay);
                        resolve();
                    });
                });
            }

            gainNode.gain.value = 1;
            source.connect(gainNode);
            gainNode.connect(analyser);
            analyser.connect(audioCtx.destination);

            const dataArray = new Uint8Array(analyser.frequencyBinCount),
                  sleep = ms => new Promise(r => setTimeout(r, ms)),
                  getAverageVolume = () => {
                      analyser.getByteFrequencyData(dataArray);
                      return dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
                  };

            const timeContents = document.querySelector('.ytp-time-contents');
            const overlay = document.createElement('div');
            overlay.classList.add('boost-overlay');
            overlay.style.cssText = `margin-left:8px;display:inline-block;text-shadow:-1px -1px 2px #000,1px -1px 2px #000,-1px 1px 2px #000,1px 1px 2px #000;`;
            timeContents?.querySelectorAll('.boost-overlay').forEach(el => el.remove());
            timeContents?.appendChild(overlay);

            let volumeSum = 0;
            for (let i = 0; i < sampleCount; i++) {
                volumeSum += getAverageVolume();
                overlay.textContent = `🔊 Sampling volume: ${i + 1}/${sampleCount}`;
                await sleep(100);
            }

            const averageVolume = volumeSum / sampleCount,
                  volumeFactor = Math.max(videoElement.volume, 0.1),
                  boostFactor = Math.min((targetVolume * volumeFactor) / averageVolume, maxgain);

            gainNode.gain.value = boostFactor;
            overlay.textContent = `🔊 Gain: ${boostFactor.toFixed(2)}×`;

            async function resampleOnVolumeChange() {
                let sum = 0;
                for (let i = 0; i < shortSampleCount; i++) {
                    sum += getAverageVolume();
                    overlay.textContent = `🔊 Resampling volume: ${i + 1}/${shortSampleCount}`;
                    await sleep(100);
                }
                const shortAvg = sum / shortSampleCount,
                      volFactor = Math.max(videoElement.volume, 0.1),
                      newGain = Math.min((targetVolume * volFactor) / shortAvg, maxgain);
                gainNode.gain.value = newGain;
                overlay.textContent = `🔊 Gain: ${newGain.toFixed(2)}×`;
            }

            let volumeChangeTimeout;
            videoElement.addEventListener("volumechange", () => {
                console.log("Volume changed by user, waiting to re-sample...");
                clearTimeout(volumeChangeTimeout);
                volumeChangeTimeout = setTimeout(() => {
                    resampleOnVolumeChange();
                    volumeChangeTimeout = null;
                }, volumeChangeDelay);
            });

            let isPaused = videoElement.paused;
            videoElement.addEventListener("pause", () => {
                isPaused = true;
                console.log("Video paused — pausing gain adjustments.");
            });
            videoElement.addEventListener("play", () => {
                isPaused = false;
                console.log("Video playing — resuming gain adjustments.");
            });

            let prevAvgVolume = null;
            async function dynamicGainAdjustLoop() {
                while (true) {
                    if (isPaused) {
                        await sleep(resampleEvery);
                        continue;
                    }
                    let dynamicSum = 0;
                    for (let i = 0; i < dynamicSampleCount; i++) {
                        dynamicSum += getAverageVolume();
                        await sleep(dynamicSampleInterval);
                    }
                    const dynamicAvg = dynamicSum / dynamicSampleCount;

                    if (dynamicAvg < minVolumeThreshold) {
                        // too quiet to act on
                    } else {
                        if (prevAvgVolume !== null) {
                            const smoothing = 0.5;
                            dynamicAvg = prevAvgVolume * smoothing + dynamicAvg * (1 - smoothing);
                        }
                        prevAvgVolume = dynamicAvg;

                        const volumeFactor = Math.max(video.volume, 0.1);
                        const suggestedGain = Math.min((targetVolume * volumeFactor) / dynamicAvg, maxgain);
                        const currentGain = gainNode.gain.value;

                        if (Math.abs(currentGain - suggestedGain) > gainChangeThreshold) {
                            gainNode.gain.setTargetAtTime(suggestedGain, audioCtx.currentTime, 0.5);
                            overlay.textContent = `🔊 Auto Gain: ${suggestedGain.toFixed(2)}×`;
                        }
                    }
                    await sleep(resampleEvery);
                }
            }
            setTimeout(dynamicGainAdjustLoop, 20000);
        }
    });
}
