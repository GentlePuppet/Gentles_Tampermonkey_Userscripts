// ==UserScript==
// @name         Youtube HD Avatars & Thumbnails
// @version      1.0
// @author       GentlePuppet
// @match        https://www.youtube.com/*
// @icon         https://www.youtube.com/s/desktop/1eca3218/img/favicon_144.png
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

// Hover for Bigger Avatar | Description
GM_addStyle('#avatar.ytd-video-owner-renderer:hover {height: 150px; width: 150px; transition: height 0.5s, width 0.5s;} #avatar.ytd-video-owner-renderer {height: 48px; width: 48px; transition: height 0.5s, width 0.5s;} #avatar.ytd-video-owner-renderer > img {height: 100% !important; width: 100% !important;}');

// Hover for Bigger Avatar | Comments
GM_addStyle('#author-thumbnail.ytd-comment-renderer yt-img-shadow.ytd-comment-renderer:hover {height: 150px; width: 150px; transition: height 0.5s, width 0.5s;} #author-thumbnail.ytd-comment-renderer yt-img-shadow.ytd-comment-renderer {height: 40px; width: 40px; transition: height 0.5s, width 0.5s;}');

// Hover for Bigger Avatar | Comment Replies
GM_addStyle('ytd-comment-renderer:not([comment-style=backstage-comment])[is-reply] #author-thumbnail.ytd-comment-renderer yt-img-shadow.ytd-comment-renderer:hover, ytd-comment-renderer[is-creator-reply] #author-thumbnail.ytd-comment-renderer yt-img-shadow.ytd-comment-renderer:hover {height: 150px; width: 150px; transition: height 0.5s, width 0.5s;} ytd-comment-renderer:not([comment-style=backstage-comment])[is-reply] #author-thumbnail.ytd-comment-renderer yt-img-shadow.ytd-comment-renderer, ytd-comment-renderer[is-creator-reply] #author-thumbnail.ytd-comment-renderer yt-img-shadow.ytd-comment-renderer {height: 24px; width: 24px; transition: height 0.5s, width 0.5s;}');

window.addEventListener("yt-page-data-updated", function(e) {
    // Avatars
    waitForKeyElements ('yt-img-shadow > img[src*="=s176"]', Avatar, 0);
    waitForKeyElements ('yt-img-shadow > img[src*="=s88"]', Avatar, 0);
    waitForKeyElements ('yt-img-shadow > img[src*="=s48"]', Avatar, 0);
    function Avatar (jNode) {
        var oldSrc = jNode.attr ("src");
        let newSrc = oldSrc.replace (/=s\d*.*/gi, "");
        jNode.attr ("src", newSrc);
    };

    // Video Thumbnails
    waitForKeyElements ('ytd-thumbnail #thumbnail.ytd-thumbnail yt-img-shadow.ytd-thumbnail > img[src*="hqdefault.jpg"]', Thumbnail, 0);
    function Thumbnail (jNode) {
        var oldSrc2 = jNode.attr ("src");
        let newSrc2 = oldSrc2.replace ("hqdefault.jpg", "maxresdefault.jpg");
        jNode.attr ("src", newSrc2);
    };
});
