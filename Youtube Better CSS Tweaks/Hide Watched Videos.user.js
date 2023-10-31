// ==UserScript==
// @name         Youtube Hide Watched Videos
// @author       GentlePuppet
// @version      1.4.4
// @match        https://www.youtube.com/*
// @icon         https://www.youtube.com/s/desktop/1eca3218/img/favicon_144.png
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require      https://raw.githubusercontent.com/carhartl/jquery-cookie/v1.4.1/jquery.cookie.js
// @grant        GM_addStyle
// @run-at       document-start
// @updateURL    https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Better%20CSS%20Tweaks/Hide%20Watched%20Videos.user.js
// @downloadURL  https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Better%20CSS%20Tweaks/Hide%20Watched%20Videos.user.js
// ==/UserScript==
// Watched Video Show/Hide Button Stylings and Dim Watched Videos
GM_addStyle(`
    .WatchedVideoButton {align-self: normal !important;color: var(--yt-spec-text-primary) !important;overflow: hidden !important;font-size: var(--ytd-subheadline-link_-_font-size) !important;font-weight: var(--ytd-subheadline-link_-_font-weight) !important;line-height: var(--ytd-subheadline-link_-_line-height) !important;letter-spacing: var(--ytd-subheadline-link_-_letter-spacing) !important;background: #383838 !important;border: black 1px solid;cursor: pointer;text-shadow: 1px 1px 3px black;}
    .WatchedVideoButton:hover {background: #595959 !important;}
    .Watched_Video_Shown {Opacity: 80%; background: #271b38; border: 2px #004eff solid; padding: 5px; }
    .Watched_Video_Shown > div > ytd-thumbnail {Opacity: 40%; }
    .Watched_Video_Hidden {Opacity: 80%; background: #271b38; border: 2px #004eff solid; padding: 5px; }
    .Watched_Video_Hidden > div > ytd-thumbnail {Opacity: 40%; }
    ytd-continuation-item-renderer {height: 0px !important;}
    paper-spinner.ytd-continuation-item-renderer {display: none !important; margin: 0px !important;}
    .ytp-spinner {display: none !important;}
`);
window.addEventListener("yt-page-data-updated", function(e) {
    var wvh = null;
    var wvs = null;
    delete wvh
    delete wvs
    $("#WatchedVideosNumber").text("0");
    if(window.location.href.indexOf("playlist") == -1 || window.location.href.indexOf("history") == -1) {
        // Variables
        var HideWatchedVideosButton = document.querySelector("#HideWatchedVideosButton");
        var ShowWatchedVideosButton = document.querySelector("#ShowWatchedVideosButton");
        var HiddenVideosCounterCheck = document.querySelector("#WatchedVideosNumber");
        // Hide Watched Videos every 2.5 Seconds
        setInterval(function() {
            if($.cookie('hidewatchedvideos', Number) == 1) {
                $.cookie('hidewatchedvideos', '1', { domain: '.youtube.com', expires: 7, path: '/' });
                $('div[id="progress"]').parents("ytd-grid-video-renderer").attr("class", "Watched_Video_Hidden").hide();
                $('div[id="progress"]').parents("ytd-compact-video-renderer").attr("class", "Watched_Video_Hidden").hide();
                $('div[id="progress"]').parents("ytd-rich-item-renderer").attr("class", "Watched_Video_Hidden").hide();
                $('ytd-grid-video-renderer').find('ytd-thumbnail-overlay-resume-playback-renderer').remove();
                $('ytd-compact-video-renderer').find('ytd-thumbnail-overlay-resume-playback-renderer').remove();
                $('ytd-rich-item-renderer').find('ytd-thumbnail-overlay-resume-playback-renderer').remove();
            }
            if($.cookie('hidewatchedvideos', Number) == 0) {
                $.cookie('hidewatchedvideos', '0', { domain: '.youtube.com', expires: 7, path: '/' });
                $('div[id="progress"]').parents("ytd-grid-video-renderer").attr("class", "Watched_Video_Shown");
                $('div[id="progress"]').parents("ytd-compact-video-renderer").attr("class", "Watched_Video_Shown");
                $('div[id="progress"]').parents("ytd-rich-item-renderer").attr("class", "Watched_Video_Shown");
                $('ytd-grid-video-renderer').find('ytd-thumbnail-overlay-resume-playback-renderer').remove();
                $('ytd-compact-video-renderer').find('ytd-thumbnail-overlay-resume-playback-renderer').remove();
                $('ytd-rich-item-renderer').find('ytd-thumbnail-overlay-resume-playback-renderer').remove();
            }
            var wvh = $(".Watched_Video_Hidden").length;
            var wvs = $(".Watched_Video_Shown").length;
            $("#WatchedVideosNumber").text(wvh + wvs);
        },2500);
        // Create Watched Videos Number Counter
        waitForKeyElements ('#start.ytd-masthead', CreateHiddenVideosCounter, 0);
        function CreateHiddenVideosCounter () {
            if($.cookie('hidewatchedvideos') == undefined) {$.cookie('hidewatchedvideos', '1', { domain: '.youtube.com', expires: 7, path: '/' });}
            if (!HiddenVideosCounterCheck) {
                var ra123 = $('<div/>').attr({type: "div",id: "WatchedVideosNumber",class: "WatchedVideosNumberlabel",style: "color: var(--yt-spec-text-primary) !important; font-size: var(--ytd-subheadline-link_-_font-size) !important; background: #720586 !important; padding: 9px; border: black 1px solid; height: 19px; text-shadow: 1px black; text-shadow: 1px 1px 3px black;"});
                $('#start.ytd-masthead').append(ra123);
                $("#WatchedVideosNumber").text("0");
            }
        }
		// Create Toggle Button
        waitForKeyElements ('#WatchedVideosNumber', CreateToggleButton, 0);
        function CreateToggleButton () {
            var r2 = $('<input/>').attr({type: "button",id: "HideWatchedVideosButton",value: "Toggle Watched Videos",class: "WatchedVideoButton"});
            $(r2).insertBefore('#WatchedVideosNumber');
            document.getElementById("HideWatchedVideosButton").addEventListener("click", ToggleClickAction, false);
            if($.cookie('hidewatchedvideos', Number) == 1) {$('.WatchedVideoButton').attr('value', 'Show Watched Videos').attr('style', 'width: 175px;');}
            if($.cookie('hidewatchedvideos', Number) == 0) {$('.WatchedVideoButton').attr('value', 'Hide Watched Videos').attr('style', 'width: 168px;');}
        }
		// Toggle Action
		function ToggleClickAction() {
            if($.cookie('hidewatchedvideos', Number) == 0) {
				$.cookie('hidewatchedvideos', '1', { domain: '.youtube.com', expires: 7, path: '/' });
				$('.Watched_Video_Shown').removeAttr('style');
				$(".Watched_Video_Shown").each(function() {$(this).hide()});
				$(".Watched_Video_Shown").each(function() {$(this).attr("class", "Watched_Video_Hidden")});
				$('.WatchedVideoButton').attr('value', 'Show Watched Videos').attr('style', 'width: 175px;');
                return
            }
            if($.cookie('hidewatchedvideos', Number) == 1) {
				$.cookie('hidewatchedvideos', '0', { domain: '.youtube.com', expires: 7, path: '/' });
				$(".Watched_Video_Hidden").each(function() {$(this).show()});
				$(".Watched_Video_Hidden").each(function() {$(this).attr("class", "Watched_Video_Shown")});
				$('.WatchedVideoButton').attr('value', 'Hide Watched Videos').attr('style', 'width: 168px;');
                return
            }
        }
}});
