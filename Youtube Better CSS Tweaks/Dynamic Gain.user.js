// ==UserScript==
// @name         Youtube Gentle's Auto Gain
// @author       GentlePuppet
// @version      3.0
// @description  This script automatically boosts quiet YouTube videos or lowers loud videos by automatically adjusting audio gain with smoothing.
// @author       Special Thanks to this old extension I found and adapted some of their javascript: https://github.com/Kelvin-Ng/youtube-volume-normalizer
// @grant        GM_addStyle
// @include      https://www.youtube.com/*
// @icon         https://www.youtube.com/s/desktop/1eca3218/img/favicon_144.png
// @updateURL    https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Better%20CSS%20Tweaks/Dynamic%20Gain.user.js
// @downloadURL  https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Better%20CSS%20Tweaks/Dynamic%20Gain.user.js
// ==/UserScript==
GM_addStyle(`
    .boost-close {
        cursor: pointer;
        margin-left: 10px;
        user-select: none;
        top: 4px;
        right: 6px;
        position: absolute;
    }
    .boost-switch {
        position: relative;
        display: inline-block;
        width: 46px;
        height: 24px;
        vertical-align: middle;
    }
    .boost-switch input {
        display: none;
    }
    .boost-slider {
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
    .boost-slider:before {
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
    .boost-switch input:checked + .boost-slider {
        background-color: #3fa34d;
    }
    .boost-switch input:checked + .boost-slider:before {
        transform: translateX(22px);
    }
    .disable-gain {
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        opacity: 0.8
        cursor: pointer;
        border: 1px outset #000
    }
    .disable-gain:hover {
        opacity: 1 !important;
    }
    .boost-config {
        position: absolute;
        background: rgb(from var(--yt-spec-brand-background-solid) r g b / 0.9);
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
        max-width: 260px;
        border: 1px outset black;
    }
    .boost-container {
        display: inline-block;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        cursor: pointer;
        min-width: 0;
        line-height: var(--yt-delhi-pill-height, 48px);
        padding: var(--yt-delhi-pill-top-height, 12px) 8px 8px 0px;
        margin-left: -10px;
    }
    .boost-overlay {
        background-color: transparent;
        height: var(--yt-delhi-pill-height, 48px);
        width: fit-content;
        display: inline-block;
        position: relative;
        z-index: 999;
        pointer-events: auto;
        cursor: pointer;
        text-shadow: rgb(0, 0, 0) -1px -1px 2px, rgb(0, 0, 0) 1px -1px 2px, rgb(0, 0, 0) -1px 1px 2px, rgb(0, 0, 0) 1px 1px 2px;
        padding: 0px 8px;
        border-radius: 28px;
    }
    .boost-overlay:hover {
        background-color: var(--yt-spec-overlay-button-secondary,rgba(255,255,255,.1));
    }
`)

const debug = false

const config = {
    targetLoudnessDb: -3,         // Desired loudness level in dB (higher = louder)
    maxGain: 2,                   // Maximum gain multiplier allowed
    gainSmoothingTime: 0.5,       // Seconds for smoothing gain changes
    compressorEnabled: false,     // Choose whether to enable/disable the compressor (true/false)
    ignoreDRC: false,             // Choose whether to ignore youtube's DRC (Dynamic Range Compression)
    compressorThreshold: 0,       // Threshold where compression begins
    compressorKnee: 0,            // Softness of transition into compression
    compressorRatio: 20,          // Compression ratio. Larger = stronger compression
    compressorAttack: 0.003,      // How quickly the compressor reacts
    compressorRelease: 0.25,      // How quickly the compressor stops compressing
};

const audioCtx = new AudioContext();
const gainNode = audioCtx.createGain();
const compressor = audioCtx.createDynamicsCompressor();

let video = null;
let currentSource = null;
let currentVideo = null;
let gainDisabled = false;
let container = null;
let overlay = null;

//==================================================
// --------------- HELPER FUNCTIONS ---------------
//==================================================

// Sets the compressor settings from the config
function applyCompressorConfig() {
    compressor.threshold.value = config.compressorThreshold;
    compressor.knee.value = config.compressorKnee;
    compressor.ratio.value = config.compressorRatio;
    compressor.attack.value = config.compressorAttack;
    compressor.release.value = config.compressorRelease;
}

// Get the volume from the stats for nerds
async function fastLoudnessRead() {
    if (debug) console.log("AutoGain: OpenStatsPanel")
    const player = document.querySelector("#movie_player");

    if (!player || typeof player.getStatsForNerds !== "function") {
        return null;
    }

    const stats = player.getStatsForNerds();
    if (!stats) return null;

    const vol = stats.volume ?? "";
    const match = vol.match(/content loudness\s*(-?\d+(?:\.\d+)?)\s*dB/i);

    if (!match) return null;

    const dB = parseFloat(match[1]);

    // Respect your DRC logic
    const hasDRC = vol.includes("DRC");
    if (hasDRC && !config.ignoreDRC) {
        gainNode.gain.value = 1;
        return null;
    }
    if (debug) console.log("AutoGain: Return DB: " + dB)

    return dB;
}

// Wait for the video to exist before continuing
function getVideo() {
    return document.querySelector("#movie_player video");
}
async function waitForPlayer() {
    if (debug) console.log("AutoGain: Wait for video")
    for (let i = 0; i < 40; i++) { // ~1 second max
        const v = getVideo();
        if (v) return v;
        await new Promise(r => setTimeout(r, 25));
    }
    return null;
}

// Utility to prevent multiple events firing close together
function debounce(fn, delay) {
    let timer = null;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

// This function gets the content loudness and applies adjusted gain in dB
const debouncedUpdateGain = debounce(updateGainFromStats, 250);

// Cookie utilities for saving/loading config settings
function saveConfigToCookie() {
    document.cookie = `gainConfig=${encodeURIComponent(JSON.stringify(config))}; path=/; max-age=31536000`;
}
function loadConfigFromCookie() {
    if (debug) console.log("AutoGain: Load config from cookie (2)")
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

//==================================================
// --------------- HELPER FUNCTIONS ---------------
//==================================================

// Listen for dynamic navigation changes (SPA routing)
window.addEventListener("yt-page-data-updated", initOnWatchPage);

// Also run on initial load in case it's already on a video
initOnWatchPage();

async function initOnWatchPage() {
    if (!location.pathname.startsWith("/watch")) return;

    if (window.hasRunGainScript) {return;} // Prevent duplicate runs
    if (debug) console.log("AutoGain: Begin Init (1)")
    window.hasRunGainScript = true;

    loadConfigFromCookie();
    createOverlay();
    await boostAudio();
    updateGainFromStats();

    // Add an eventlister to the page so the final step is re-run everytime the page changes (new video loads) so the gain can be adjusted (for the new video)
    window.addEventListener("yt-page-data-updated", updateGainFromStats(true));
}

// Create the gain overlay
function createOverlay() {
    let container = document.querySelector('.boost-container');
    let overlay = document.querySelector('.boost-overlay');

    if (debug) console.log("AutoGain: Begin createOverlay (3)")
    if (!overlay) {
        if (container) container.remove()
        container = document.createElement("div");
        container.className = "boost-container";
        overlay = document.createElement("div");
        overlay.className = "boost-overlay";
        document.querySelector('.ytp-left-controls')?.appendChild(container);
        document.querySelector('.boost-container')?.appendChild(overlay);
    }

    // Create text update function for the overlay
    overlay.setOverlayText = (function() {
        let lastText = '';
        return function(text) {
            if (text === lastText) return;
            lastText = text;
            requestAnimationFrame(() => {
                this.textContent = text;
            });
        };
    })();

    // Create the hidden config panel
    let configBox = document.createElement("div");
    configBox.className = "boost-config";
    configBox.style.cssText = 'display: none;';
    // document.body.appendChild(configBox);
    document.querySelector('ytd-app')?.appendChild(configBox);


    // Hidden container for compressor tuning
    let compressorSettingsBox = document.createElement("div");
    compressorSettingsBox.style.display = "none";
    compressorSettingsBox.style.marginLeft = "20px";
    compressorSettingsBox.style.padding = "6px 0 0 0";
    compressorSettingsBox.style.borderLeft = "1px solid #555";
    compressorSettingsBox.style.paddingLeft = "10px";
    compressorSettingsBox.style.display = config.compressorEnabled ? "block" : "none";

    let headerRow = document.createElement('div'); headerRow.style.display = 'flex'; headerRow.style.justifyContent = 'space-between'; headerRow.style.alignItems = 'center';
    let headerTitle = document.createElement('div'); headerTitle.textContent = 'Gain Settings'; headerTitle.style.fontWeight = 'bold';
    let closeButton = document.createElement('div'); closeButton.className = "boost-close"; closeButton.title = "Close settings and Update gain"; closeButton.textContent = '[✕]'; closeButton.style.cursor = 'pointer'; closeButton.style.marginLeft = '10px'; closeButton.style.userSelect = 'none'; closeButton.addEventListener('click', () => {configBox.style.display = 'none';});

    headerRow.appendChild(headerTitle); headerRow.appendChild(closeButton); configBox.appendChild(headerRow);

    closeButton.addEventListener("click", () => {configBox.style.display = "none"; debouncedUpdateGain()}); configBox.addEventListener("click", e => {e.stopPropagation();});

    // Utility: Create labeled input row
    function createInput(labelText, key, type = 'number', step = 'any', tooltip = '', onChange = null) {
        let container = document.createElement('div');
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'space-between';

        let label = document.createElement('label');
        label.textContent = labelText;
        label.style.marginRight = "10px";
        label.style.flex = "1";
        label.title = tooltip;

        if (type === 'checkbox') {
            // Create toggle switch
            let toggleContainer = document.createElement('label');
            toggleContainer.className = 'boost-switch';
            toggleContainer.title = tooltip;

            let input = document.createElement('input');
            input.type = 'checkbox';
            input.checked = config[key];

            let slider = document.createElement('span');
            slider.className = 'boost-slider';

            input.addEventListener('change', () => {
                config[key] = input.checked;
                if (onChange) onChange(input.checked);
                saveConfigToCookie();
                console.log(`Config updated: ${key} = ${input.checked}`);
            });

            toggleContainer.appendChild(input);
            toggleContainer.appendChild(slider);
            container.appendChild(label);
            container.appendChild(toggleContainer);

        } else {
            // Regular number input
            let input = document.createElement('input');
            input.type = type;
            input.value = config[key];
            input.step = step;
            input.style.width = "80px";
            input.style.color = "#fff";
            input.style.backgroundColor = "var(--yt-spec-brand-background-primary)";
            input.style.borderRadius = "5px";
            input.style.border = "1px inset #000";
            input.style.padding = "3px";
            input.title = tooltip;

            input.addEventListener('change', () => {
                let value = parseFloat(input.value);
                if (!isNaN(value)) {
                    config[key] = value;
                    if (onChange) onChange(value);
                    saveConfigToCookie();
                } else {
                    input.value = config[key];
                }
            });

            container.appendChild(label);
            container.appendChild(input);
        }

        return container;
    }

    // Add input fields to the config box
    configBox.appendChild(createInput("Target Loudness (dB):", "targetLoudnessDb", 'number', 'any',
                                      "Target loudness level (in decibels) you'd like videos normalized to."))

    configBox.appendChild(createInput("Max Gain:", "maxGain", 'number', 'any',
                                      "Maximum allowed volume boost multiplier.\nPrevents very quiet videos from becoming excessively loud."))

    configBox.appendChild(createInput("Smoothing Time (s):", "gainSmoothingTime", 'number', 'any',
                                      "Time in seconds to smoothly transition gain changes.\nAvoids sudden volume jumps when adjusting the gain."))

    configBox.appendChild(createInput("Ignore Stable Volume", "ignoreDRC", "checkbox", '',
                                      "Ignore YouTube's built-in Dynamic Range Compression when available.\nIgnoring tends to make videos louder than expected when Stable Volume is enabled.\nRecommend just turning Stable Volume off instead of using this, but it's your choice."))

    configBox.appendChild(createInput("Enable Compressor", "compressorEnabled", "checkbox", '',
                                      "Enable a dynamic range compressor to even out loud and soft parts.\nUseful for videos with inconsistent audio.\nEnable to tweak the compressor settings.",
                                      () => {
        // Enable the compressor settings box
        compressorSettingsBox.style.display = config.compressorEnabled ? "block" : "none";

        // Reposition the config box so it's not jutting out weirdly
        let rect = overlay.getBoundingClientRect();
        let left = rect.left + (rect.width - configBox.offsetWidth) / 2
        configBox.style.left = `${left}px`;
        configBox.style.top = `${window.scrollY + rect.top - configBox.offsetHeight - 20}px`;

        // Enable and update the compressor
        applyCompressorConfig()
    }));

    configBox.appendChild(compressorSettingsBox);
    compressorSettingsBox.appendChild(createInput("Threshold (dB):", "compressorThreshold", 'number', 'any', "Threshold where compression begins."),               () => applyCompressorConfig());
    compressorSettingsBox.appendChild(createInput("Knee (dB):",      "compressorKnee",      'number', 'any', "Softness of transition into compression."),          () => applyCompressorConfig());
    compressorSettingsBox.appendChild(createInput("Ratio:",          "compressorRatio",     'number', 'any', "Compression ratio. Larger = stronger compression."), () => applyCompressorConfig());
    compressorSettingsBox.appendChild(createInput("Attack (s):",     "compressorAttack",    'number', 'any', "How quickly the compressor reacts."),                () => applyCompressorConfig());
    compressorSettingsBox.appendChild(createInput("Release (s):",    "compressorRelease",   'number', 'any', "How quickly the compressor stops compressing."),     () => applyCompressorConfig());


    // Toggle to Disable Gain for the current video
    let disableGainBtn = document.createElement('button');
    disableGainBtn.className = "disable-gain";
    disableGainBtn.textContent = "Disable Gain (Current Video)";
    disableGainBtn.style.backgroundColor = "#8b0000";

    disableGainBtn.addEventListener('click', () => {
        gainDisabled = !gainDisabled;
        if (gainDisabled) {
            gainNode.gain.value = 1;
            overlay.setOverlayText("🔇 Gain Disabled");
            disableGainBtn.textContent = "Enable Gain (Current Video)";
            disableGainBtn.style.backgroundColor = "#008b0c";
            disableGainBtn.style.borderStyle = "inset";
        } else {
            debouncedUpdateGain();
            disableGainBtn.textContent = "Disable Gain (Current Video)";
            disableGainBtn.style.backgroundColor = "#8b0000";
            disableGainBtn.style.borderStyle = "outset";
        }
    });
    configBox.appendChild(disableGainBtn);


    // Toggle box visibility when clicking the overlay
    overlay.addEventListener("click", () => {
        if (configBox.style.display === "none") {
            // Show the box
            configBox.style.display = "flex";

            // Get the overlay position and dimensions
            let rect = overlay.getBoundingClientRect();
            let left = rect.left + (rect.width - configBox.offsetWidth) / 2

            // Position the configBox centered above the overlay
            configBox.style.left = `${left}px`;

            // Put the box just above the overlay with some spacing
            configBox.style.top = `${window.scrollY + rect.top - configBox.offsetHeight - 20}px`;
        } else {
            // Hide the box
            configBox.style.display = "none";
            updateGainFromStats(false, true)
        }
    });

    // Set the overlay text
    overlay.setOverlayText(`🔊 Gain: Initialized...`);
}

// Main logic to hook into the video and apply audio gain dynamically
async function boostAudio() {
    if (debug) console.log("AutoGain: Begin boostAudio (4)")

    // A short break to check for the video element
    video = await waitForPlayer();

    video.addEventListener("loadeddata", () => updateGainFromStats(true));
    video.addEventListener("canplay", () => updateGainFromStats(true));

    // Save the found video as the current video to adjust the gain for
    currentVideo = video;
    gainDisabled = false;

    // Wait for video to play or be ready to play
    if (video.readyState < 1) {
        await new Promise(resolve => video.addEventListener("loadeddata", resolve, { once: true }));
    }

    await setupAudioGraph(currentVideo)
}

// Create the audio Nodes
async function setupAudioGraph(video) {
    if (debug) console.log("AutoGain: Begin setupAudioGraph (5)")
    // Reset gain
    gainNode.gain.value = 1;

    // Disconnect existing source if any
    if (currentSource) {
        currentSource.disconnect();
        if (debug) console.log("AutoGain: Disconnected Source")

    }

    // Create new source
    const source = audioCtx.createMediaElementSource(video);
    currentSource = source;

    // If the compressor is enabled create and connect it, otherwise just connect the gain to the audio
    if (config.compressorEnabled) {
        source.connect(compressor);
        compressor.connect(gainNode);
        applyCompressorConfig()
        if (debug) console.log("AutoGain: Connected Compressor")

    } else {
        source.connect(gainNode);
        if (debug) console.log("AutoGain: Connected Gain")
    }

    // Plug the gained audio back into the audio output
    gainNode.connect(audioCtx.destination);
}

// Updates the gain
async function updateGainFromStats(resetgain = false, smoothing = false) {
    if (debug) console.log("AutoGain: Begin updateGain")

    let container = document.querySelector('.boost-container');
    let overlay = document.querySelector('.boost-overlay');

    if (resetgain) {
        gainDisabled = false
    }

    if (gainDisabled) {
        overlay.setOverlayText("🔇 Gain Disabled");
        return;
    }

    // Reset the overlay text
    overlay.setOverlayText(`🔊 Gain: Loading...`);
    if (debug) console.log("AutoGain: Gain Loading")

    // Open the stats for nerds and get the content loudness dB level
    if (debug) console.log("AutoGain: Await DB")

    // Get DB level from Stats For Nerds
    const dB = await fastLoudnessRead();
    if (debug) console.log("AutoGain: Got dB: " + dB)
    //const dB = await openStatsPanelAndGetDb();

    // If the previous function returns null, then stop
    if (dB == null) {overlay.setOverlayText(`🔊 Gain: Stable Volume Active`);return;}

    // Display the raw loudness on the overlay (This all happens so fast that you'll likely never see this)
    overlay.setOverlayText(`🔊 Gain: Content Loudness: ${dB} dB`);

    // Do the adjustment math
    let gainTarget = Math.pow(10, (config.targetLoudnessDb - dB) / 20);
    gainTarget = Math.min(gainTarget, config.maxGain);
    if (debug) console.log("AutoGain: Target Gain: " + gainTarget)

    // Apply the new adjusted gain smoothly over time
    if (smoothing) {
        gainNode.gain.setTargetAtTime(gainTarget, audioCtx.currentTime, config.gainSmoothingTime);
    } else {
        gainNode.gain.setTargetAtTime(gainTarget, audioCtx.currentTime, 0);
    }

    // Check if the adjusted gain to show if gain is being increased or decreased
    const gainDiffDb = config.targetLoudnessDb - dB;
    const sign = gainDiffDb > 0 ? '+' : '';
    if (debug) console.log("AutoGain: Gain " + sign)

    // Update the overlay text with the adjusted gain
    if (dB != config.targetLoudnessDb) {
        overlay.setOverlayText(`🔊 Gain: ${sign}${gainDiffDb.toFixed(2)} dB`);
    } else {
        overlay.setOverlayText(`🔊 Gain: No Gain`);
    }
}
