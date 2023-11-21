// ==UserScript==
// @name         Youtube Gentle's Youtube Video Progress Trackers
// @version      1.6
// @author       GentlePuppet
// @description  Adds video progression displays
// @match        https://www.youtube.com/*
// @icon         https://www.youtube.com/s/desktop/1eca3218/img/favicon_144.png
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @run-at       document-start
// @grant        GM_addStyle
// @updateURL    https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Better%20CSS%20Tweaks/Video%20Progress%20Trackers.user.js
// @downloadURL  https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Better%20CSS%20Tweaks/Video%20Progress%20Trackers.user.js
// ==/UserScript==
GM_addStyle(`
    #container.ytd-player:has(.ytp-fullscreen) > .DummyContainerProgress {margin-top:-7px !important;}
    #container.ytd-player:not(.ytp-fullscreen) > .DummyContainerProgress {margin-top: 0px;}
`);

window.addEventListener("yt-page-data-updated", function(e) {
    // Mini Progress Bar
    // Created by Gentle
    if(window.location.href.indexOf("watch") !==-1 ) {
        const DCP = $('<div/>').attr({class: "DummyContainerProgress", style: "width: 100%; height: 3px; outline: none; padding-top: 2px; margin-top: 0px;"});
        const DPP = $('<div/>').attr({class: "DummyPlayProgress", style: "transform: scaleX(0);width: 100%; height: 3px; position: absolute; left: 0px; transform-origin: 0 0; z-index: 3; background-color: #df6eed;"});
        const DLP = $('<div/>').attr({class: "DummyLoadProgress", style: "transform: scaleX(0);width: 100%; height: 3px; position: absolute; left: 0px; transform-origin: 0 0; z-index: 2; background: rgba(255,255,255,0.4);"});
        const DBP = $('<div/>').attr({class: "DummyBackgroundProgress", style: "width: 100%; height: 3px; position: absolute; left: 0px; transform-origin: 0 0; z-index: 1; background: rgba(90,90,90,0.4);"});
        function createdummytimer() {
            if (document.querySelector(".DummyContainerProgress") == null) {
                DCP.insertAfter('.html5-video-player');
                $('.DummyContainerProgress').append(DPP);
                $('.DummyContainerProgress').append(DLP);
                $('.DummyContainerProgress').append(DBP);
                UpdateDummyProgress();
                requestAnimationFrame(createdummytimer);
            } else {requestAnimationFrame(createdummytimer)}
        }
        requestAnimationFrame(createdummytimer)
    }
    // Update Mini Progress Bar
    // Original Code Created by Nemanja Bu for "Always Show Progress Bar" | Modified for Gentle's "Mini Progress Bar"
    // https://greasyfork.org/en/scripts/30046-youtube-always-show-progress-bar/code
    function UpdateDummyProgress() {
        function timeup() {progressbar.style.transform = "scaleX("+(video.currentTime/video.duration)+")";}
        function progup() {if (!video.buffered.length) {return;};var buffer = video.buffered.end(video.buffered.length-1)/video.duration;if(buffer < 0){return};loadbar.style.transform = "scaleX("+buffer+")";}
        document.querySelector(".video-stream").removeEventListener("timeupdate", timeup, true);
        document.querySelector(".video-stream").removeEventListener("progress", progup, true);
        $('.DummyPlayProgress').attr({style: "transform: scaleX(0);width: 100%; height: 3px; position: absolute; left: 0px; transform-origin: 0 0; z-index: 3; background-color: #df6eed;"});
        $('.DummyLoadProgress').attr({style: "transform: scaleX(0);width: 100%; height: 3px; position: absolute; left: 0px; transform-origin: 0 0; z-index: 2; background: rgba(255,255,255,0.4);"});
        const video = document.querySelector(".video-stream");
        const progressbar = document.querySelector(".DummyPlayProgress");
        const loadbar = document.querySelector(".DummyLoadProgress");
        function findVideoInterval() {
            if (!video || !progressbar || !loadbar) {requestAnimationFrame(findVideoInterval)}
            video.addEventListener("timeupdate", timeup, true);
            video.addEventListener("progress", progup, true);
        }
        requestAnimationFrame(findVideoInterval)
    }
    // Video Time Left Counter
    // Created by Gentle
    if(window.location.href.indexOf("watch") !==-1 ) {
        function createTime() {
            const cont = document.querySelector('.VTLC')
            if (cont) {
                UpdateTime();
            }
            if (!cont) {
                const container2 = $('<div>').addClass('VTLC').css({display: 'block','min-width': 'fit-content',overflow: 'hidden','font-weight': 500,color: '#f1f1f1','font-size': '14px','line-height': '36px','background-color': 'var(--yt-spec-badge-chip-background)',padding: '0px 10px','border-radius': '2px','margin-left': '8px'})
                const subbutton = document.querySelector('#owner > #subscribe-button')
                $(container2).insertAfter(subbutton);
                requestAnimationFrame(createTime)
            }
        }
        function format(sec, rate) {
            if (!sec) {return `00:00:00`}
            let time = sec/rate
            let hours = Math.floor(time / 3600)
            let minutes = Math.floor(time % 3600 / 60)
            let seconds = Math.ceil(time % 3600 % 60)
            if (hours < 10) hours = '0' + hours
            if (minutes < 10) minutes = '0' + minutes
            if (seconds < 10) seconds = '0' + seconds
            return `${hours}:${minutes}:${seconds}`
        }
        function UpdateTime() {
            function vtlc() {$('.VTLC').text(format(video.duration - video.currentTime, video.playbackRate))}
            document.querySelector(".video-stream").removeEventListener("timeupdate", vtlc, true);
            const video = document.querySelector(".video-stream.html5-main-video");
            const cont = document.querySelector('.VTLC')
            function VideoTime() {
                if (!video || !cont) {requestAnimationFrame(VideoTime)}
                video.addEventListener("timeupdate", vtlc, true);
            }
            requestAnimationFrame(VideoTime)
        }
        requestAnimationFrame(createTime)
    }
});
