// ==UserScript==
// @name         Friendly Ad Block
// @version      1.0
// @author       Created by 0x48piraj | Converted to userscript by Gentle
// @match        https://www.youtube.com/*
// @icon         https://www.youtube.com/s/desktop/1eca3218/img/favicon_144.png
// @description  Friendly Ad Block is an extension created by 0x48piraj @https://github.com/0x48piraj/fadblock/tree/master. Converted into a simple userscript by Gentle.
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @run-at       document-start
// @updateURL    https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Better%20CSS%20Tweaks/Friendly%20Ad%20Block.user.js
// @downloadURL  https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Better%20CSS%20Tweaks/Friendly%20Ad%20Block.user.js
// ==/UserScript==
setInterval(function() {
    const videoContainer = document.getElementById("movie_player");
    const isAd = videoContainer?.classList.contains("ad-interrupting") || videoContainer?.classList.contains("ad-showing");
    const skipLock = document.querySelector(".ytp-ad-preview-text")?.innerText;
    const surveyLock = document.querySelector(".ytp-ad-survey")?.length > 0;

    const videoPlayer = document.getElementsByClassName("video-stream")[0];
    const adbutton = document.querySelector(".ytp-ad-skip-button")
    const adbuttonmodern = document.querySelector(".ytp-ad-skip-button-modern")

    if (videoPlayer && !isAd && !skipLock) {
        videoPlayer.muted = false;
    }
    if (isAd && skipLock) {
        videoPlayer.muted = true;
        videoPlayer.currentTime = videoPlayer.duration - 0.1;
        videoPlayer.paused && videoPlayer.play()
        adbutton?.click();
        adbuttonmodern?.click();
    } else if (isAd && surveyLock) {
        adbutton?.click();
        adbuttonmodern?.click();
    }
},100);

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
