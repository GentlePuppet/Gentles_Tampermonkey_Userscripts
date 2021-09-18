// ==UserScript==
// @name         Youtube Gentle's Better CSS Tweaks
// @author       GentlePuppet
// @version      1.2
// @include      https://www.youtube.com/*
// @icon         https://www.youtube.com/s/desktop/1eca3218/img/favicon_144.png
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

// Playlist Wider Grabbing Handles
GM_addStyle('#index-container.ytd-playlist-video-renderer{padding-right: 150px !important; z-index:1 !important; cursor: grab !important;} #content.ytd-playlist-video-renderer{margin-left: -150px !important; z-index:0 !important;}');

// Miniplaylist Wider Grabbing Handles
GM_addStyle('#index-container.ytd-playlist-panel-video-renderer{padding-right: 100px !important; z-index:1 !important; cursor: grab !important;} #thumbnail-container.ytd-playlist-panel-video-renderer{margin-left: -100px !important; z-index:0 !important;}');

// Wider Playlist Meta
GM_addStyle('a.yt-simple-endpoint.ytd-playlist-panel-video-renderer{min-width: 390px !important; max-width: 390px !important; z-index: 0;} #menu.ytd-playlist-panel-video-renderer{margin-left: -50px !important; z-index: 3; opacity: 0;} #menu.ytd-playlist-panel-video-renderer:hover{background-color: var(--yt-spec-badge-chip-background); border: 1px solid rebeccapurple; opacity: 1;}');

// Wider/Bigger Stats for Nerds
GM_addStyle('.html5-video-info-panel{width: 750px !important; font-size: 15px !important; opacity: 75% !important;} .ytp-horizonchart, .ytp-horizonchart > canvas{width: 400px !important;} .html5-video-info-panel-close{right: 40px !important; height: 50px !important; width: 50px !important; text-align: center !important; font-size: 50px !important; font-family: Consolas !important;}');

// Hover for Bigger Avatar | Description
GM_addStyle('#avatar.ytd-video-owner-renderer:hover {height: 150px; width: 150px; transition: height 0.5s, width 0.5s;} #avatar.ytd-video-owner-renderer {height: 48px; width: 48px; transition: height 0.5s, width 0.5s;} #avatar.ytd-video-owner-renderer > img {height: 100% !important; width: 100% !important;}');

// Hover for Bigger Avatar | Comments
GM_addStyle('#author-thumbnail.ytd-comment-renderer yt-img-shadow.ytd-comment-renderer:hover {height: 150px; width: 150px; transition: height 0.5s, width 0.5s;} #author-thumbnail.ytd-comment-renderer yt-img-shadow.ytd-comment-renderer {height: 40px; width: 40px; transition: height 0.5s, width 0.5s;}');

// Hover for Bigger Avatar | Comment Replies
GM_addStyle('ytd-comment-renderer:not([comment-style=backstage-comment])[is-reply] #author-thumbnail.ytd-comment-renderer yt-img-shadow.ytd-comment-renderer:hover, ytd-comment-renderer[is-creator-reply] #author-thumbnail.ytd-comment-renderer yt-img-shadow.ytd-comment-renderer:hover {height: 150px; width: 150px; transition: height 0.5s, width 0.5s;} ytd-comment-renderer:not([comment-style=backstage-comment])[is-reply] #author-thumbnail.ytd-comment-renderer yt-img-shadow.ytd-comment-renderer, ytd-comment-renderer[is-creator-reply] #author-thumbnail.ytd-comment-renderer yt-img-shadow.ytd-comment-renderer {height: 24px; width: 24px; transition: height 0.5s, width 0.5s;}');

// Watched Playlist Videos
GM_addStyle('#Watched_Playlist_Video {Opacity: 80%; background: #271b38; #Watched_Playlist_Video > a > div > #thumbnail-container > ytd-thumbnail > #thumbnail > yt-img-shadow > img {Opacity: 40%; }');

// Video Borders
GM_addStyle('ytd-grid-video-renderer {border: 2px solid var(--yt-spec-brand-background-secondary2); padding: 5px;} ytd-compact-video-renderer {border: 2px solid var(--yt-spec-brand-background-secondary2); padding: 5px;}');

// ReArranged Things
GM_addStyle(`
    .style-scope.ytd-browse.grid.grid-6-columns {
       padding-bottom: var(--ytd-miniplayer-offset, 0);
       flex: none;
       margin-bottom: 16px;
       width: auto;
       max-width: 40000px;
       margin: 0px 50px 0px 50px;
    }
    #items.ytd-grid-renderer > ytd-grid-channel-renderer.ytd-grid-renderer {
       margin-right: 5px !important;
       display: inline-block !important;
       width: 120px !important;
       margin-bottom: 5px !important;
    }
`);

// Dynamically Taller Playlist
waitForKeyElements ('#container.ytd-playlist-panel-renderer, ytd-playlist-panel-renderer[js-panel-height_]', playlistHeight, 0);
waitForKeyElements ('ytd-watch-flexy[flexy_][js-panel-height_] #panels.ytd-watch-flexy ytd-engagement-panel-section-list-renderer.ytd-watch-flexy', playlistHeight, 0);
function playlistHeight () {
    var WindowHeightCalc = (((Math.floor(($(window).height()-87)/64))*64)+11);
    var WindowHeight = (WindowHeightCalc + "px !important;");
    $("#container.ytd-playlist-panel-renderer, ytd-playlist-panel-renderer[js-panel-height_]").attr('style', 'max-height: ' + WindowHeight);
    $("ytd-watch-flexy[flexy_][js-panel-height_] #panels.ytd-watch-flexy ytd-engagement-panel-section-list-renderer.ytd-watch-flexy").attr('style', 'max-height: ' + WindowHeight);
    $("#secondary-inner > ytd-playlist-panel-renderer").attr('style', 'max-height: ' + WindowHeight);
}
$(window).resize(playlistHeight);

window.addEventListener("yt-page-data-updated", function(e) {

    // Fade out Watched Videos from Playlists
    waitForKeyElements ('ytd-playlist-panel-video-renderer > a > div > div > ytd-thumbnail > a > div > ytd-thumbnail-overlay-resume-playback-renderer > #progress[style="width: 100%;"]', FadeWatched, 0);
    function FadeWatched (jNode) {
        jNode.parents("ytd-playlist-panel-video-renderer").attr("id", "Watched_Playlist_Video");
        jNode.parent().remove();
    }

    // Force Subs Page to be Wider
    waitForKeyElements('.style-scope.ytd-browse.grid.grid-6-columns', OverrideWidth, 0);
    function OverrideWidth (jnode) {
        jnode.attr("style", "width: auto !important");
    }

    // Kbps to KB/s in Stat's For Nerds
    waitForKeyElements('.html5-video-info-panel-content > div:nth-child(9) > span > span:nth-child(2)', ConverttoKBs, 0);
    function ConverttoKBs () {
        var CTKB = $('<span/>').attr({id: "CTKB", value: " • 0 KB/s"});
        $(CTKB).insertAfter('.html5-video-info-panel-content > div:nth-child(9) > span > span:nth-child(2)');
        var ConvertkbpsFunc = setInterval(function() {
            var conspd = document.querySelector(".html5-video-info-panel-content > div:nth-child(9) > span > span:nth-child(2)");
            if (!conspd) {return;}
            var convertedspeed = $('.html5-video-info-panel-content > div:nth-child(9) > span > span:nth-child(2)').text().replace(' Kbps', '');
            $('#CTKB').text(" • " + (Math.round(convertedspeed/8)) + " KB/s")
        },1000);
    }

    // Mini Progress Bar
    waitForKeyElements('.html5-video-container > video', CreateDummyProgress, 0);
    function CreateDummyProgress () {
        var dummyprogress = document.querySelector(".DummyContainerProgress");
        if (dummyprogress) {return;}

        var DCP = $('<div/>').attr({class: "DummyContainerProgress", style: "width: 100%; height: 3px; bottom: 0; left: 0; outline: none; padding-top: 2px;"});
        var DPP = $('<div/>').attr({class: "DummyPlayProgress", style: "transform: scaleX(0);width: 100%; height: 3px; position: absolute; left: 0px; transform-origin: 0 0; background-color: #9b08ad;"});
        var DLP = $('<div/>').attr({class: "DummyLoadProgress", style: "transform: scaleX(0);width: 100%; height: 3px; position: absolute; left: 0px; transform-origin: 0 0; background: rgba(255,255,255,.4);"});

        if (!dummyprogress) {
            DCP.insertAfter('.html5-video-player');
            $('.DummyContainerProgress').append(DPP);
            $('.DummyContainerProgress').append(DLP);
        }

        // Update Mini Progress Bar
        // Original Code Created by Nemanja Bu for "Always Show Progress Bar" | Modified for Gentle's "Mini Progress Bar"
        // https://greasyfork.org/en/scripts/30046-youtube-always-show-progress-bar/code var findVideoInterval = setInterval(function() {
        var findVideoInterval = setInterval(function() {
            var ytplayer = document.querySelector(".html5-video-player:not(.addedupdateevents)");
            if (!ytplayer) {return;}
            clearInterval(findVideoInterval);
            ytplayer.className+=" addedupdateevents";
            var video = ytplayer.querySelector("video");
            var container = document.querySelector("ytd-player > #container");
            var progressbar = container.querySelector(".DummyPlayProgress");
            var loadbar = container.querySelector(".DummyLoadProgress");
            if (!video || !progressbar || !loadbar) {return;}
            video.addEventListener("timeupdate",function() {progressbar.style.transform = "scaleX("+(video.currentTime/video.duration)+")";});
            video.addEventListener("progress",function() {loadbar.style.transform = "scaleX("+(video.buffered.end(video.buffered.length-1)/video.duration)+")";});
        },500);
    }
});

// Video Time Left Counter
// Created by wormboy | Modified by Gentle
// https://greasyfork.org/en/scripts/368389-youtube-time-remaining-counter
const container = document.createElement('div')
container.style.cssText = `
display: block;
max-height: var(--yt-user-comment-line-height, 2.1rem);
overflow: hidden;
font-size: var(--ytd-user-comment_-_font-size);
font-weight: var(--ytd-user-comment_-_font-weight);
line-height: var(--ytd-user-comment_-_line-height);
letter-spacing: var(--ytd-user-comment_-_letter-spacing);
color: #f50053;
`
const dot = document.createElement('span')
dot.style.cssText = `
margin-left: 4px;
margin-right: 4px;
display: block;
max-height: var(--yt-user-comment-line-height, 2.1rem);
overflow: hidden;
font-size: var(--ytd-user-comment_-_font-size);
font-weight: var(--ytd-user-comment_-_font-weight);
line-height: var(--ytd-user-comment_-_line-height);
letter-spacing: var(--ytd-user-comment_-_letter-spacing);
color: var(--yt-spec-text-secondary);
`

const string = document.createTextNode('')
container.appendChild(string)

let tick = Date.now()
const interval = 1000

function update(event) {
    const timestamp = Date.now()
    const delta = timestamp - tick
    if (delta > interval) {
        tick = timestamp - (delta % interval)
        draw(event)
    }
}

function draw(event) {
    const { duration, currentTime } = event.target
    string.data = isNaN(duration) ? '' : format(duration - currentTime)
}

function format(sec) {
    let hours = Math.floor(sec / 3600)
    let minutes = Math.floor(sec % 3600 / 60)
    let seconds = Math.ceil(sec % 3600 % 60)
    if (hours < 10) hours = '0' + hours
    if (minutes < 10) minutes = '0' + minutes
    if (seconds < 10) seconds = '0' + seconds
    return `${hours}:${minutes}:${seconds}`
}

window.addEventListener('yt-player-updated', playerUpdated)
function playerUpdated(event) {
    const video = event.target.querySelector('.video-stream.html5-main-video')
    video.removeEventListener('timeupdate', update)
    video.addEventListener('timeupdate', update)
}

window.addEventListener('yt-page-data-updated', pageDataUpdated)
function pageDataUpdated(event) {
    const info = event.target.querySelector('#info-text.ytd-video-primary-info-renderer')
    $(container).insertAfter(info)
    $(dot).insertBefore(container)
    $(dot).text('•')
}

{
    const [target, video, info] = [
        document.querySelector('ytd-page-manager'),
        document.querySelector('ytd-page-manager .video-stream.html5-main-video'),
        document.querySelector('ytd-page-manager ytd-video-primary-info-renderer #container #info')
    ]
    if (video) playerUpdated({ target })
    if (info) pageDataUpdated({ target })
}
