// ==UserScript==
// @name         Gentle's Ad Block
// @version      1.5
// @author       Originally by 0x48piraj | Converted to a simpified userscript by Gentle
// @match        https://www.youtube.com/*
// @icon         https://www.youtube.com/s/desktop/1eca3218/img/favicon_144.png
// @description  Friendly Ad Block is an extension created by 0x48piraj @https://github.com/0x48piraj/fadblock/tree/master. Converted into a simple userscript by Gentle.
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @run-at       document-start
// @updateURL    https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Better%20CSS%20Tweaks/Friendly%20Ad%20Block.user.js
// @downloadURL  https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Better%20CSS%20Tweaks/Friendly%20Ad%20Block.user.js
// ==/UserScript==

var script = document.createElement('script'); script.src = "https://code.jquery.com/jquery-3.7.1.min.js"; document.getElementsByTagName('head')[0].appendChild(script);

let TimerActive = false;

window.addEventListener("yt-page-data-updated", function() {AdTimer();})

function AdTimer() {
    const video = $("video")
    if (TimerActive == false) {
        TimerActive = true;
        setInterval(function() {
            if ($(".ad-showing") || $(".ad-interrupting")) {
                video.currentTime = video.duration - 0.1
                ClickAdButton($(".ytp-ad-skip-button"));
                ClickAdButton($(".ytp-ad-skip-button-modern"));
            }
        },100);
    }
}
AdTimer()

function ClickAdButton(e) {
    if (e == null) {return} else {e.click()}
}

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
    setTimeout(HideAdLoop, 1000);
});
