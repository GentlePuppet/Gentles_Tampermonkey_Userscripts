// ==UserScript==
// @name         Youtube Gentle's Auto Gain
// @author       GentlePuppet
// @author       Special Thanks to this old extension I found and adapted some of their javascript: https://github.com/Kelvin-Ng/youtube-volume-normalizer
// @version      2.0
// @description  This script automatically boosts quiet YouTube videos or lowers loud videos by automatically adjusting audio gain with smoothing.
// @include      https://www.youtube.com/*
// @icon         https://www.youtube.com/s/desktop/1eca3218/img/favicon_144.png
// @updateURL    https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Hide%20Watched%20Videos/Dynamic%20Gain.user.js
// @downloadURL  https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Hide%20Watched%20Videos/Dynamic%20Gain.user.js
// ==/UserScript==

if (window.location.href.includes("watch?v=")) {

    const config = {
        targetLoudnessDb: 0,         // Desired loudness level in dB (higher = louder)
        maxGain: 2,                   // Maximum gain multiplier allowed
        gainSmoothingTime: 0.5,       // Seconds for smoothing gain changes
    };

    const audioCtx = new AudioContext();
    const gainNode = audioCtx.createGain();
    const compressor = audioCtx.createDynamicsCompressor();
    compressor.threshold.value = 0;
    compressor.knee.value = 0;
    compressor.ratio.value = 20;
    compressor.attack.value = 0.003;
    compressor.release.value = 0.25;

    function waitForSelector(selector) {
        return new Promise(resolve => {
            const el = document.querySelector(selector);
            if (el) return resolve(el);
            const observer = new MutationObserver(() => {
                const el = document.querySelector(selector);
                if (el) {
                    resolve(el);
                    observer.disconnect();
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
        });
    }

    //window.addEventListener("yt-page-data-updated", () => setTimeout(boostAudio, 1000));

    let currentSource = null;
    let currentVideo = null;

    setTimeout(boostAudio, 1000)

    async function boostAudio() {
        const sleep = ms => new Promise(r => setTimeout(r, ms));
        let video = null;

        for (let i = 0; i < 10; i++) {
            video = document.querySelector("video");
            if (video) break;
            await sleep(300);
        }

        if (!video || video === currentVideo) {
            return setTimeout(boostAudio, 1000);
        }

        currentVideo = video;

        if (video.paused || video.readyState < 3) {
            await new Promise(resolve => video.addEventListener("playing", function once() {
                video.removeEventListener("playing", once);
                resolve();
            }));
        }

        if (currentSource) {
            currentSource.disconnect();
        }

        // Reset gain to 1 on new video
        gainNode.gain.value = 1

        // Create and connect new audio nodes
        const source = audioCtx.createMediaElementSource(video);
        currentSource = source;
        source.connect(compressor);
        compressor.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        // Create or update overlay
        let overlay = document.querySelector('.boost-overlay');
        if (!overlay) {
            overlay = document.createElement("div");
            overlay.className = "boost-overlay";
            overlay.style.cssText = `height:47px;width:fit-content;margin-left:8px;display:inline-block;text-shadow:-1px -1px 2px #000,1px -1px 2px #000,-1px 1px 2px #000,1px 1px 2px #000;pointer-events:none;`;
            document.querySelector('.ytp-time-contents')?.appendChild(overlay);
        }
        overlay.textContent = `🔊 Gain: Loading...`;

        const waitForXpath = (xpath, context = document) => new Promise(resolve => {
            const check = () => {
                const result = document.evaluate(xpath, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (result) {
                    resolve(result);
                    return true;
                }
                return false;
            };
            if (check()) return;
            const observer = new MutationObserver(() => {
                if (check()) observer.disconnect();
            });
            observer.observe(document.body, { childList: true, subtree: true });
        });

        const openStatsPanelAndGetDb = async () => {
            const videoPlayer = await waitForSelector('#movie_player');
            videoPlayer.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true }));
            const menu = await waitForSelector('.ytp-contextmenu');
            const statsButton = await waitForXpath('div/div/div[6]', menu);
            statsButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            const closeButton = await waitForSelector('.html5-video-info-panel-close');
            const panelContent = await waitForSelector('.html5-video-info-panel-content');

            //const originalDisplay = panelContent.style.display;
            //panelContent.style.display = 'none';

            const loudnessSpan = await waitForXpath('div[4]/span', panelContent);

            await new Promise(res => setTimeout(res, 100));
            const text = loudnessSpan.innerText;
            const match = text.match(/content loudness\s*(-?\d+(\.\d+)?)\s*dB/i);
            let dB = 0;
            if (match) {
                dB = parseFloat(match[1]);
            }

            //panelContent.style.display = originalDisplay;
            closeButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

            return dB;
        };

        async function updateGainFromStats() {
            overlay.textContent = `🔊 Gain: Loading...`;
            const dB = await openStatsPanelAndGetDb();
            if (dB == null) {
                setTimeout(updateGainFromStats, 1000)
                return;
            }
            console.log(`[Gain] Content Loudness: ${dB} dB`);
            overlay.textContent = `🔊 Gain: Content Loudness: ${dB} dB`;
            let gainTarget = Math.pow(10, (config.targetLoudnessDb - dB) / 20);
            gainTarget = Math.min(gainTarget, config.maxGain);
            gainNode.gain.setTargetAtTime(gainTarget, audioCtx.currentTime, config.gainSmoothingTime);
            const gainDiffDb = config.targetLoudnessDb - dB;
            const sign = gainDiffDb > 0 ? '+' : '';
            if (dB != config.targetLoudnessDb) {
                overlay.textContent = `🔊 Gain: ${sign}${gainDiffDb.toFixed(2)} dB`;
            } else {
                overlay.textContent = `🔊 Gain: No Gain`;
            }

            window.addEventListener("yt-page-data-updated", () => setTimeout(updateGainFromStats, 500));
        }

        // Initial gain setup
        updateGainFromStats();
    }
}
