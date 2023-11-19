// ==UserScript==
// @name         Gentle's Ad Block
// @version      1.4
// @author       Originally by 0x48piraj | Converted to a simpified userscript by Gentle
// @match        https://www.youtube.com/*
// @icon         https://www.youtube.com/s/desktop/1eca3218/img/favicon_144.png
// @description  A simple script to quickly skip any ads that start playing. It doesn't block ads so it should never be detected.
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @run-at       document-start
// @updateURL    https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Better%20CSS%20Tweaks/Friendly%20Ad%20Block.user.js
// @downloadURL  https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Better%20CSS%20Tweaks/Friendly%20Ad%20Block.user.js
// ==/UserScript==

// Create TimerActive Variable.
let TimerActive = false;

// Attach Adtimer function to the page update event to restart the timer if the page changes.
window.addEventListener("yt-page-data-updated", function() {AdTimer();})

// The Adtimer function that is the core of the ad skipper.
function AdTimer() {
    // If the timer isn't already running start it.
    if (TimerActive == false) {
        TimerActive = true;
        // Loop every 100ms to check if an ad is playing.
        setInterval(function() {
            const adplaying = $('.html5-video-player.ad-showing')[0] || $('.html5-video-player.ad-interrupting')[0]
            if (adplaying) {SkipAd()}
            ClickAdButton($(".ytp-ad-skip-button"));
            ClickAdButton($(".ytp-ad-skip-button-modern"));
        },100);
    }
}

// Core function that skips the ads.
function SkipAd(e) {

    // Select the video.
    let video = $('video')[0];

    // If the video fails to be selected end early.
    if (video.currentTime == undefined) {console.log('GAB: Video Missing'); return;}

    // Set the video's current time to the last 0.1 second and then click the skip buttons if they exist.
    video.currentTime = video.duration - 0.1;
    console.log('GAB: Ad Skipped');

    // Pass these selectors to the click button function.
}

// Function to click the passed through element
function ClickAdButton(e) {
    // If the selected element doesn't exist end the function early, otherwise click the button.
    if (e == null) {return} else {e.click()}
}

// This block is from Friendly Ad Block created by 0x48piraj @https://github.com/0x48piraj/fadblock/tree/master.
// Converted to a userscript by Gentle.
window.addEventListener("yt-page-data-updated", function(e) {
    function HideAdLoop() {
        const staticAds = [".ytd-companion-slot-renderer", ".ytd-action-companion-ad-renderer", // in-feed video ads
                           ".ytd-watch-next-secondary-results-renderer.sparkles-light-cta", ".ytd-unlimited-offer-module-renderer", // similar components
                           ".ytp-ad-overlay-image", ".ytp-ad-text-overlay", // deprecated overlay ads (04-06-2023)
                           "div#root.style-scope.ytd-display-ad-renderer.yt-simple-endpoint", "div#sparkles-container.style-scope.ytd-promoted-sparkles-web-renderer",
                           ".ytd-display-ad-renderer", ".ytd-statement-banner-renderer", ".ytd-in-feed-ad-layout-renderer", // homepage ads
                           "div#player-ads.style-scope.ytd-watch-flexy, div#panels.style-scope.ytd-watch-flexy", // sponsors
                           ".ytd-banner-promo-renderer", ".ytd-video-masthead-ad-v3-renderer", ".ytd-primetime-promo-renderer" // subscribe for premium & youtube tv ads
                          ];
        staticAds.forEach((ad) => {document.querySelectorAll(ad).forEach((el) => (el.style.display = "none"))});
    }
    // Wait 1 second then hide all the elements listed above.
    setTimeout(HideAdLoop, 1000);
});
