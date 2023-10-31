// ==UserScript==
// @name         Youtube Gentle's Youtube Progress Things
// @version      1.0
// @author       GentlePuppet
// @include      https://www.youtube.com/*
// @icon         https://www.youtube.com/s/desktop/1eca3218/img/favicon_144.png
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require      https://raw.githubusercontent.com/carhartl/jquery-cookie/v1.4.1/jquery.cookie.js
// @run-at       document-start
// @updateURL    https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Better%20CSS%20Tweaks/Video%20Progress%20Trackers.user.js
// @downloadURL  https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Better%20CSS%20Tweaks/Video%20Progress%20Trackers.user.js
// ==/UserScript==
window.addEventListener("yt-page-data-updated", function(e) {
    // Mini Progress Bar
    // Created by Gentle
    if(window.location.href.indexOf("watch") !==-1 ) {
        const dummyprogress = document.querySelector(".DummyContainerProgress");
        const DCP = $('<div/>').attr({class: "DummyContainerProgress", style: "width: 100%; height: 3px; bottom: 0; left: 0; outline: none; padding-top: 2px;"});
        const DPP = $('<div/>').attr({class: "DummyPlayProgress", style: "transform: scaleX(0);width: 100%; height: 3px; position: absolute; left: 0px; transform-origin: 0 0; z-index: 3; background-color: #f00;"});
        const DLP = $('<div/>').attr({class: "DummyLoadProgress", style: "transform: scaleX(0);width: 100%; height: 3px; position: absolute; left: 0px; transform-origin: 0 0; z-index: 2; background: rgba(255,255,255,.4);"});
        const DBP = $('<div/>').attr({class: "DummyBackgroundProgress", style: "width: 100%; height: 3px; position: absolute; left: 0px; transform-origin: 0 0; z-index: 1; background: rgba(255,255,255,.2);"});
        var createdummytimer = setInterval(function() {
            if (dummyprogress) {
                clearInterval(createdummytimer);
                $('.DummyPlayProgress').attr({style: "transform: scaleX(0);width: 100%; height: 3px; position: absolute; left: 0px; transform-origin: 0 0; background-color: #f00;"});
                $('.DummyLoadProgress').attr({style: "transform: scaleX(0);width: 100%; height: 3px; position: absolute; left: 0px; transform-origin: 0 0; background: rgba(255,255,255,.4);"});
                UpdateDummyProgress();
            }
            if (!dummyprogress) {
                clearInterval(createdummytimer);
                DCP.insertAfter('.html5-video-player');
                $('.DummyContainerProgress').append(DPP);
                $('.DummyContainerProgress').append(DLP);
                $('.DummyContainerProgress').append(DBP);
                UpdateDummyProgress()
                return;
            }
        },1000);
    }
    // Update Mini Progress Bar
    // Original Code Created by Nemanja Bu for "Always Show Progress Bar" | Modified for Gentle's "Mini Progress Bar"
    // https://greasyfork.org/en/scripts/30046-youtube-always-show-progress-bar/code
    function UpdateDummyProgress() {
        function timeup() {progressbar.style.transform = "scaleX("+(video.currentTime/video.duration)+")";}
        function progup() {var buffer = video.buffered.end(video.buffered.length-1)/video.duration;if(buffer < 0){return};loadbar.style.transform = "scaleX("+buffer+")";}
        const video = document.querySelector(".video-stream.html5-main-video");
        const container = document.querySelector("ytd-player > #container");
        const progressbar = container.querySelector(".DummyPlayProgress");
        const loadbar = container.querySelector(".DummyLoadProgress");
        video.removeEventListener("timeupdate", timeup);
        video.removeEventListener("progress", progup);
        var findVideoInterval = setInterval(function() {
            if (!video || !progressbar || !loadbar) {return;}
            video.addEventListener("timeupdate", timeup);
            video.addEventListener("progress", progup);
            clearInterval(findVideoInterval)
        },1000);
    }
    // Video Time Left Counter
    // Created by Gentle
    if(window.location.href.indexOf("watch") !==-1 ) {
        var createTime = setInterval(function() {
            const cont = document.querySelector('.VTLC')
            if (cont) {
                clearInterval(createTime);
                UpdateTime();
            }
            if (!cont) {
                const container2 = $('<div>').addClass('VTLC').css({display: 'block',overflow: 'hidden','font-weight': 500,color: '#f1f1f1','font-size': '14px','line-height': '36px','background-color': 'var(--yt-spec-badge-chip-background)',padding: '0px 10px','border-radius': '2px','margin-left': '8px'})
                const subbutton = document.querySelector('#owner > #subscribe-button')
                $(container2).insertAfter(subbutton);
            }
        },1000);
        function format(sec) {
            let hours = Math.floor(sec / 3600)
            let minutes = Math.floor(sec % 3600 / 60)
            let seconds = Math.ceil(sec % 3600 % 60)
            if (hours < 10) hours = '0' + hours
            if (minutes < 10) minutes = '0' + minutes
            if (seconds < 10) seconds = '0' + seconds
            return `${hours}:${minutes}:${seconds}`
        }
        function UpdateTime() {
            function vtlc() {$('.VTLC').text(format(video.duration - video.currentTime))}
            const video = document.querySelector(".video-stream.html5-main-video");
            const cont = document.querySelector('.VTLC')
            video.removeEventListener("timeupdate", vtlc);
            var VideoTime = setInterval(function() {
                if (!video || !cont) {return;}
                video.addEventListener("timeupdate", vtlc);
                clearInterval(VideoTime);
            },1000);
        }
    }
});
