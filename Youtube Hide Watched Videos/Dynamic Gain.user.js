// ==UserScript==
// @name         Youtube Gentle's Auto Gain
// @author       GentlePuppet
// @version      2.5.5
// @description  Please install this and then check for an update again, I had the wrong update url. The script will still work as it should. But please update to 2.6
// @author       This file is temporary and is only for quickly patching the update url to the correct one and will be deleted in a few days.
// @grant        GM_addStyle
// @include      https://www.youtube.com/*
// @icon         https://www.youtube.com/s/desktop/1eca3218/img/favicon_144.png
// @updateURL    https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/refs/heads/main/Youtube%20Better%20CSS%20Tweaks/Dynamic%20Gain.user.js
// @downloadURL  https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/refs/heads/main/Youtube%20Better%20CSS%20Tweaks/Dynamic%20Gain.user.js
// ==/UserScript==
GM_addStyle(`
    .auto-gain {
        display: none;
    }
    .toggle-switch {
        position: relative;
        display: inline-block;
        width: 46px;
        height: 24px;
        vertical-align: middle;
    }
    .toggle-switch input {
        display: none;
    }
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #777;
        transition: 0.3s;
        border-radius: 24px;
    }
    .slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: 0.3s;
        border-radius: 50%;
    }
    .toggle-switch input:checked + .slider {
        background-color: #3fa34d;
    }
    .toggle-switch input:checked + .slider:before {
        transform: translateX(22px);
    }
`);


// Listen for dynamic navigation changes (SPA routing)
window.addEventListener("yt-navigate-finish", () => {
    if (window.location.href.includes("watch?v=")) {
        setTimeout(() => initOnWatchPage(), 1000); // Slight delay to ensure video is mounted
    }
});

// Also run on initial load in case it's already on a video
initOnWatchPage();

function initOnWatchPage() {
    // Create the config
    const config = {
        targetLoudnessDb: -3,         // Desired loudness level in dB (higher = louder)
        maxGain: 2,                   // Maximum gain multiplier allowed
        gainSmoothingTime: 0.5,       // Seconds for smoothing gain changes
        compressorEnabled: false,     // Choose whether to enable/disable the compressor (true/false)
        ignoreDRC: false,             // Choose wheater to ignore youtube's DRC (Dynamic Range Compression)
    };

    // Setup AudioContext and audio nodes
    const audioCtx = new AudioContext();
    const gainNode = audioCtx.createGain();
    const compressor = audioCtx.createDynamicsCompressor();

    // Compressor settings
    compressor.threshold.value = 0;
    compressor.knee.value = 0;
    compressor.ratio.value = 20;
    compressor.attack.value = 0.003;
    compressor.release.value = 0.25;

    // --- Helper Functions ---
    // --------------------------

    // Wait for an element using a CSS selector
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

    // Wait for an element using an XPath expression
    function waitForXpath(xpath, context = document) {
        return new Promise(resolve => {
            function check() {
                const result = document.evaluate(xpath, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (result) {
                    resolve(result);
                    return true;
                }
                return false;
            }
            if (check()) return;
            const observer = new MutationObserver(() => {
                if (check()) observer.disconnect();
            });
            observer.observe(document.body, { childList: true, subtree: true });
        });
    }

    // Opens Stats for Nerds panel, parses the content loudness dB value, then closes it again
    async function openStatsPanelAndGetDb() {
        const videoPlayer = await waitForSelector('#movie_player');
        videoPlayer.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true }));
        const menu = await waitForSelector('.ytp-contextmenu');
        const statsButton = await waitForXpath('div/div/div[6]', menu);
        statsButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        const closeButton = await waitForSelector('.html5-video-info-panel-close');
        const panelContent = await waitForSelector('.html5-video-info-panel-content');
        closeButton.classList.add('auto-gain')
        panelContent.classList.add('auto-gain')
        const loudnessSpan = await waitForXpath('div[4]/span', panelContent);
        await new Promise(res => setTimeout(res, 100));
        const text = loudnessSpan.innerText;
        const hasDRC = text.includes("DRC");
        if (hasDRC && !config.ignoreDRC) {
            closeButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            panelContent.classList.remove('auto-gain');
            closeButton.classList.remove('auto-gain');
            gainNode.gain.value = 1;
            return null;  // Signal to skip gain correction
        }
        const match = text.match(/content loudness\s*(-?\d+(\.\d+)?)\s*dB/i);
        let dB = 0;
        if (match) {
            dB = parseFloat(match[1]);
        }
        closeButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        panelContent.classList.remove('auto-gain')
        closeButton.classList.remove('auto-gain')
        return dB;
    }

    // Pause the script for a time
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Cookie utilities for saving/loading config
    function saveConfigToCookie() {
        document.cookie = `gainConfig=${encodeURIComponent(JSON.stringify(config))}; path=/; max-age=31536000`;
    }
    function loadConfigFromCookie() {
        const match = document.cookie.match(/(?:^|; )gainConfig=([^;]*)/);
        if (match) {
            try {
                const saved = JSON.parse(decodeURIComponent(match[1]));
                Object.assign(config, saved); // Merge saved values into config
            } catch (e) {
                console.warn('Failed to load config from cookie:', e);
            }
        }
    }

    // --------------------------
    // --- Helper Functions ---

    if (!window.location.href.includes("watch?v=")) return;
    if (window.hasRunGainScript) return; // Prevent duplicate runs
    window.hasRunGainScript = true;

    loadConfigFromCookie();
    setTimeout(boostAudio, 1000);


    // Main logic to hook into the video and apply audio gain dynamically
    async function boostAudio() {
        let video = null;
        let currentSource = null;
        let currentVideo = null;

        // A short loop to check for the video element
        for (let i = 0; i < 10; i++) {
            video = document.querySelector("video");
            if (video) break;
            await sleep(300);
        }

        // If the video fails to be found then restart and try again (just a backup, shouldn't really be needed)
        if (!video || video === currentVideo) {return setTimeout(boostAudio, 1000);}

        // Save the found video as the current video to adjust the gain for
        currentVideo = video;

        // Wait for video to play or be ready to play
        if (video.paused || video.readyState < 3) {
            await new Promise(resolve => video.addEventListener("playing", function once() {
                video.removeEventListener("playing", once);
                resolve();
            }));
        }

        // Create the audio Nodes

        // Create the audio Nodes
        function setupAudioGraph(video) {
            // Disconnect existing source if any
            if (currentSource) {
                currentSource.disconnect();
            }

            // Create new source
            const source = audioCtx.createMediaElementSource(video);
            currentSource = source;

            // Reset gain
            gainNode.gain.value = 1;

            // If the compressor is enabled create and connect it, otherwise just connect the gain to the audio
            if (config.compressorEnabled) {
                source.connect(compressor);
                compressor.connect(gainNode);
            } else {
                source.connect(gainNode);
            }

            // Plug the gained audio back into the audio output
            gainNode.connect(audioCtx.destination);
        }
        setupAudioGraph(currentVideo)

        // Create the gain overlay
        let overlay = document.querySelector('.boost-overlay');
        if (!overlay) {
            overlay = document.createElement("div");
            overlay.className = "boost-overlay";
            overlay.style.cssText = `height:47px;width:fit-content;margin-left:8px;display:inline-block;text-shadow:-1px -1px 2px #000,1px -1px 2px #000,-1px 1px 2px #000,1px 1px 2px #000;z-index:999;pointer-events:auto;`;
            document.querySelector('.ytp-time-contents')?.appendChild(overlay);
        }

        // Create the hidden config panel
        const configBox = document.createElement("div"); configBox.style.cssText = `
        position: absolute;
        background: rgba(28, 28, 28, .9);
        text-shadow: 0 0 2px rgba(0, 0, 0, .5);
        transition: opacity .1s cubic-bezier(0,0,.2,1);
        color: white;
        padding: 10px;
        border-radius: 6px;
        z-index: 9999;
        font-size: 13px;
        display: none;
        flex-direction:
        column; gap: 8px;
        max-width: 260px;`;
        document.body.appendChild(configBox);

        const headerRow = document.createElement('div'); headerRow.style.display = 'flex'; headerRow.style.justifyContent = 'space-between'; headerRow.style.alignItems = 'center';
        const headerTitle = document.createElement('div'); headerTitle.textContent = 'Gain Settings'; headerTitle.style.fontWeight = 'bold';
        const closeButton = document.createElement('div'); closeButton.title = "Close settings and Update gain"; closeButton.textContent = '[✕]'; closeButton.style.cursor = 'pointer'; closeButton.style.marginLeft = '10px'; closeButton.style.userSelect = 'none'; closeButton.addEventListener('click', () => {configBox.style.display = 'none';});

        headerRow.appendChild(headerTitle); headerRow.appendChild(closeButton); configBox.appendChild(headerRow);

        closeButton.addEventListener("click", () => {configBox.style.display = "none"; updateGainFromStats()}); configBox.addEventListener("click", e => {e.stopPropagation();});

        // Utility: Create labeled input row
        function createInput(labelText, key, type = 'number', step = 'any', tooltip = '') {
            const container = document.createElement('div');
            container.style.display = 'flex';
            container.style.alignItems = 'center';
            container.style.justifyContent = 'space-between';

            const label = document.createElement('label');
            label.textContent = labelText;
            label.style.marginRight = "10px";
            label.style.flex = "1";
            label.title = tooltip;

            if (type === 'checkbox') {
                // Create toggle switch
                const toggleContainer = document.createElement('label');
                toggleContainer.className = 'toggle-switch';
                toggleContainer.title = tooltip;

                const input = document.createElement('input');
                input.type = 'checkbox';
                input.checked = config[key];

                const slider = document.createElement('span');
                slider.className = 'slider';

                input.addEventListener('change', () => {
                    config[key] = input.checked;
                    saveConfigToCookie();
                    console.log(`Config updated: ${key} = ${input.checked}`);
                });

                toggleContainer.appendChild(input);
                toggleContainer.appendChild(slider);
                container.appendChild(label);
                container.appendChild(toggleContainer);
            } else {
                // Regular number input
                const input = document.createElement('input');
                input.type = type;
                input.value = config[key];
                input.step = step;
                input.style.width = "80px";
                input.title = tooltip;

                input.addEventListener('change', () => {
                    let value = parseFloat(input.value);
                    if (isNaN(value)) {
                        value = config[key];
                        input.value = value;
                        return;
                    }
                    config[key] = value;
                    saveConfigToCookie();
                    console.log(`Config updated: ${key} = ${value}`);
                });

                container.appendChild(label);
                container.appendChild(input);
            }

            configBox.appendChild(container);
        }

        // Add input fields to the config box
        createInput("Target Loudness (dB):", "targetLoudnessDb", 'number', 'any',
                    "Target loudness level (in decibels) you'd like videos normalized to.");

        createInput("Max Gain:", "maxGain", 'number', 'any',
                    "Maximum allowed volume boost multiplier.\nPrevents very quiet videos from becoming excessively loud.");

        createInput("Smoothing Time (s):", "gainSmoothingTime", 'number', 'any',
                    "Time in seconds to smoothly transition gain changes.\nAvoids sudden volume jumps when adjusting the gain.");

        createInput("Enable Compressor", "compressorEnabled", "checkbox", '',
                    "Enable a dynamic range compressor to even out loud and soft parts.\nUseful for videos with inconsistent audio.");

        createInput("Ignore DRC", "ignoreDRC", "checkbox", '',
                    "Ignore YouTube's built-in Dynamic Range Compression.\nIgnoring tends to make videos louder than expected when YouTube is already dampening loudness.");


        // Toggle box visibility when clicking the overlay
        overlay.addEventListener("click", () => {
            if (configBox.style.display === "none") {
                // Show the box
                configBox.style.display = "flex";

                // Get the overlay position and dimensions
                const rect = overlay.getBoundingClientRect();

                // Position the configBox above the overlay, horizontally aligned to the overlay's left edge
                configBox.style.left = `${rect.left}px`;

                // Put the box just above the overlay with 8px spacing
                configBox.style.top = `${window.scrollY + rect.top - configBox.offsetHeight - 8}px`;
            } else {
                // Hide the box
                configBox.style.display = "none";
                updateGainFromStats()
            }
        });

        // Set the overlay text
        overlay.textContent = `🔊 Gain: Loading...`;

        // This function gets the content loudness and applies adjusted gain in dB
        async function updateGainFromStats() {
            // Reset the overlay text
            overlay.textContent = `🔊 Gain: Loading...`;

            // Open the stats for nerds and get the content loudness dB level
            const dB = await openStatsPanelAndGetDb();

            // If the previous function returns null, then stop
            if (dB == null) {overlay.textContent = `🔊 Gain: DRC Active`;return;}

            // Display the raw loudness on the overlay (This all happens so fast that you'll likely never see this)
            overlay.textContent = `🔊 Gain: Content Loudness: ${dB} dB`;

            // Do the adjustment math
            let gainTarget = Math.pow(10, (config.targetLoudnessDb - dB) / 20);
            gainTarget = Math.min(gainTarget, config.maxGain);

            // Apply the new adjusted gain smoothly over time
            gainNode.gain.setTargetAtTime(gainTarget, audioCtx.currentTime, config.gainSmoothingTime);

            // Check if the adjusted gain to show if gain is being increased or decreased
            const gainDiffDb = config.targetLoudnessDb - dB;
            const sign = gainDiffDb > 0 ? '+' : '';

            // Update the overlay text with the adjusted gain
            if (dB != config.targetLoudnessDb) {
                overlay.textContent = `🔊 Gain: ${sign}${gainDiffDb.toFixed(2)} dB`;
            } else {
                overlay.textContent = `🔊 Gain: No Gain`;
            }
        }
        // Add an eventlister to the page so the final step is re-run everytime the page changes (new video loads) so the gain can be adjusted (for the new video)
        window.addEventListener("yt-page-data-updated", () => setTimeout(updateGainFromStats, 500));

        // FInally actually run the final step function
        updateGainFromStats();
    }
}
