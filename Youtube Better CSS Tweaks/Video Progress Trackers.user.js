// ==UserScript==
// @name         Youtube Gentle's Youtube Video Progress Trackers
// @version      1.7
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
    .DummyContainerProgress {width: 100%; height: 3px; outline: none; padding-top: 2px;}
    .DummyPlayProgress {width: 100%; height: 3px; position: absolute; left: 0px; transform-origin: 0 0; z-index: 3; background-color: #f00;}
    .DummyLoadProgress {width: 100%; height: 3px; position: absolute; left: 0px; transform-origin: 0 0; z-index: 2; background: rgba(255,255,255,0.4);}
    .DummyBackgroundProgress {width: 100%; height: 3px; position: absolute; left: 0px; transform-origin: 0 0; z-index: 1; background: rgba(90,90,90,0.4);}
    .VTLC {display: block; min-width: fit-content; overflow: hidden; font-weight: 500; color: #f1f1f1; font-size: 14px; line-height: 36px; background-color: var(--yt-spec-badge-chip-background); padding: 0px 10px; border-radius: 2px; margin-left: 8px;}
`);

window.addEventListener("yt-page-data-updated", function(e) {
    if(window.location.href.indexOf("watch") !==-1 ) {
        // Mini Progress Bar
        const DCP = $('<div/>').attr({class: "DummyContainerProgress"})
        const DPP = $('<div/>').attr({class: "DummyPlayProgress", style: "transform: scaleX(0);"})
        const DLP = $('<div/>').attr({class: "DummyLoadProgress", style: "transform: scaleX(0);"})
        const DBP = $('<div/>').attr({class: "DummyBackgroundProgress"})
        function createdummytimer() {
            if (document.querySelector(".DummyContainerProgress") == null) {
                DCP.insertAfter('.html5-video-player')
                $('.DummyContainerProgress').append(DPP)
                $('.DummyContainerProgress').append(DLP)
                $('.DummyContainerProgress').append(DBP)
                requestAnimationFrame(createdummytimer)
            } else {
                requestAnimationFrame(createdummytimer)
            }
        }
        requestAnimationFrame(createdummytimer)
        function UpdateMiniBar() {
            function timeup() {
                var dummy = document.querySelector(".DummyPlayProgress")
                if (!dummy) {return}
                var video = document.querySelector(".video-stream.html5-main-video")
                dummy.style.transform = "scaleX("+(video.currentTime/video.duration)+")"
            }
            function progup() {
                var dummy = document.querySelector(".DummyLoadProgress")
                if (!dummy) {return}
                var video = document.querySelector(".video-stream.html5-main-video")
                if (!video.buffered.length) {return}
                var buffer = video.buffered.end(video.buffered.length-1)/video.duration
                if(buffer < 0){return}
                dummy.style.transform = "scaleX("+buffer+")"
            }
            const player = document.querySelector(".html5-video-player")
            const video = document.querySelector(".video-stream.html5-main-video")
            function CreateProgressEvent() {
                if (!video || !player) {
                    requestAnimationFrame(CreateProgressEvent)
                }
                else if (!player.classList.contains("progress-event")) {
                    video.addEventListener("timeupdate", timeup)
                    video.addEventListener("progress", progup)
                    player.classList.add("progress-event");
                } else {
                    $('.DummyPlayProgress').attr({style: "transform: scaleX(0);"});
                    $('.DummyLoadProgress').attr({style: "transform: scaleX(0);"});
                }
            }
            requestAnimationFrame(CreateProgressEvent)
        }
        requestAnimationFrame(UpdateMiniBar)

        // Video Time Left Counter
        function createTime() {
            const cont = document.querySelector('.VTLC')
            if (cont) {
                UpdateTime();
            }
            if (!cont) {
                const container2 = $('<div>').addClass('VTLC')
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
            function vtlc() {$('.VTLC').text(format(document.querySelector(".video-stream.html5-main-video").duration - document.querySelector(".video-stream.html5-main-video").currentTime, document.querySelector(".video-stream.html5-main-video").playbackRate))}
            const player = document.querySelector(".html5-video-player")
            const video = document.querySelector(".video-stream.html5-main-video")
            const cont = document.querySelector('.VTLC')
            function VideoTime() {
                if (!video || !cont) {
                    requestAnimationFrame(VideoTime)
                }
                if (!player.classList.contains("time-event")) {
                    video.addEventListener("timeupdate", vtlc)
                    player.classList.add("time-event");
                }
                else {
                    requestAnimationFrame(VideoTime)
                }
            }
            requestAnimationFrame(VideoTime)
        }
        requestAnimationFrame(createTime)
    }
});




















