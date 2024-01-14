// ==UserScript==
// @name         Gentle's Ad Skipper
// @version      1.8
// @author       GentlePuppet
// @match        https://www.youtube.com/*
// @icon         https://www.youtube.com/s/desktop/1eca3218/img/favicon_144.png
// @description  A simple script to instantly skip any ads that start playing. It also hides various static ads.
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @run-at       document-start
// @updateURL    https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Better%20CSS%20Tweaks/Friendly%20Ad%20Block.user.js
// @downloadURL  https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Better%20CSS%20Tweaks/Friendly%20Ad%20Block.user.js
// @grant        GM_addStyle
// ==/UserScript==
GM_addStyle(`
    .ytd-companion-slot-renderer, .ytd-action-companion-ad-renderer, yt-mealbar-promo-renderer#mealbar-promo-renderer,
    .ytd-watch-next-secondary-results-renderer.sparkles-light-cta, .ytd-unlimited-offer-module-renderer,
    .ytp-ad-overlay-image, .ytp-ad-text-overlay,
    div#root.style-scope.ytd-display-ad-renderer.yt-simple-endpoint, div#sparkles-container.style-scope.ytd-promoted-sparkles-web-renderer,
    .ytd-display-ad-renderer, .ytd-statement-banner-renderer, .ytd-in-feed-ad-layout-renderer,
    div#player-ads.style-scope.ytd-watch-flexy, ytd-engagement-panel-section-list-renderer[target-id='engagement-panel-ads'],
    .ytd-banner-promo-renderer, .ytd-video-masthead-ad-v3-renderer, .ytd-primetime-promo-renderer
    {display: none !important;}
`);
let TimerActive = false
function ClickAdButtons() {document.querySelectorAll(".ytp-ad-skip-button, .ytp-ad-skip-button-modern").forEach(b => {if (b !== null) {b.click()}})}
function AdTimer() {
    if (!TimerActive) {
        TimerActive = true
        function update() {
            if (document.querySelector(".ad-showing, .ad-interrupting, ytp-ad-display-override" )) {
                document.querySelector('#movie_player > div.html5-video-container > video').muted = true
                if (document.querySelector('#movie_player > div.html5-video-container > video').currentTime > 0) {
                    document.querySelector('#movie_player > div.html5-video-container > video').currentTime = Math.max(0, document.querySelector('#movie_player > div.html5-video-container > video').duration - 0.1)
                    document.querySelector('#movie_player > div.html5-video-container > video').paused && document.querySelector('#movie_player > div.html5-video-container > video').play()
                    document.querySelector('#movie_player > div.html5-video-container > video').muted = false
                }
                ClickAdButtons()
            }
            requestAnimationFrame(update)
        }
        requestAnimationFrame(update)
    }
}
window.addEventListener("yt-page-data-updated", function() {AdTimer()})
