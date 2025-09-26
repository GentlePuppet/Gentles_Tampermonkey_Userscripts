// ==UserScript==
// @name         Youtube Hide Watched Videos
// @author       GentlePuppet
// @version      1.8
// @match        https://www.youtube.com/*
// @icon         https://www.youtube.com/s/desktop/1eca3218/img/favicon_144.png
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        GM_addStyle
// @updateURL    https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Hide%20Watched%20Videos/Youtube%20Hide%20Watched%20Videos.user.js
// @downloadURL  https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Hide%20Watched%20Videos/Youtube%20Hide%20Watched%20Videos.user.js
// ==/UserScript==
// Watched Video Show/Hide Button Stylings and Dim Watched Videos
GM_addStyle(`
    .WatchedVideoButton {height: 30px;margin: auto;align-self: normal !important;color: var(--yt-spec-text-primary) !important;overflow: hidden !important;font-family: "Roboto","Arial",sans-serif !important;font-size: 1.4rem !important;line-height: 2rem !important;font-weight: 400 !important;background: #383838 !important;border: black 1px solid;cursor: pointer;text-shadow: 1px 1px 3px black;}
    .WatchedVideoButton:hover {background: #595959 !important;}
    .WatchedVideosNumberlabel {padding: 0px 5px 0px 5px;color: var(--yt-spec-text-primary) !important; background: #720586 !important; border: black 1px solid; height: 28px;margin: auto;align-self: normal; text-shadow: 1px 1px 3px black;font-family: "Roboto","Arial",sans-serif !important;font-size: 1.4rem !important; line-height: 28px !important;letter-spacing: var(--ytd-subheadline-link_-_letter-spacing) !important;}
    .Watched_Video_Shown {Opacity: 80%; background: #271b38; border: 2px #004eff solid; padding: 5px; }
    .Watched_Video_Shown > div > ytd-thumbnail {Opacity: 40%; }
    .Watched_Video_Hidden {Opacity: 80%; background: #271b38; border: 2px #004eff solid; padding: 5px; }
    .Watched_Video_Hidden > div > ytd-thumbnail {Opacity: 40%; }
    ytd-continuation-item-renderer {height: 0px !important;}
    paper-spinner.ytd-continuation-item-renderer {display: none !important; margin: 0px !important;}
    .ytp-spinner {display: none !important;}
    #columns.ytd-watch-flexy {overflow: hidden !important;}
    ytd-rich-item-renderer {background: #00000000; border: 2px #00000000 solid; padding: 5px;}
`);

window.addEventListener("yt-page-data-updated", function(e) {
    // Check Cookie
    function getHideWatchedPref() {
        const cookies = document.cookie.split('; ');
        const cookie = cookies.find(row => row.startsWith('hidewatchedvideos='));

        if (!cookie) {
            setHideWatchedPref('1'); // Default to hiding watched videos
            return '1';
        }

        return cookie.split('=')[1];
    }

    // Set Cookie
    function setHideWatchedPref(value) {document.cookie = `hidewatchedvideos=${value}; path=/; domain=.youtube.com; max-age=604800`;}

    // Hide Watched Videos
    function handleNewVideos() {
        if(window.location.href.indexOf("playlist") !== -1 || window.location.href.indexOf("history") !== -1) {return;}
        else {
            const selectorMap = [
                ".ytd-rich-grid-renderer",   // Subs page, Channels page, and Home page
                ".ytd-item-section-renderer" // Recommended sidebar list
            ];
            const shouldHide = getHideWatchedPref() === '1';

            let hiddenCount = 0;
            let shownCount = 0;

            // Helper to mark videos as watched
            function markWatched(selector) {
                $(selector).each(function () {
                    const video = $(this).parents(selectorMap.join(',')).first();

                    // Find the page container that this video belongs to
                    const pageContainer = video.closest('ytd-browse[page-subtype]');

                    // Skip if the page container is hidden (not the active page)
                    if (pageContainer.length && pageContainer.attr('hidden') !== undefined) {
                        return;
                    }

                    if (video.length > 0) {
                        video.addClass('Watched_Video');
                    }
                });
            }

            // Mark watched videos using both types of progress bars
            markWatched('div[id="progress"][style*="width: 100%"]');
            markWatched('div[class*="WatchedProgressBar"][style*="width: 100%"]');

            // Hide or show based on current toggle state
            $('.Watched_Video').each(function() {
                const pageContainer = $(this).closest('ytd-browse[page-subtype]');
                if (pageContainer.length && pageContainer.attr('hidden') !== undefined) {
                    return; // Ignore videos from hidden pages
                }

                if (shouldHide) {
                    $(this).removeClass('Watched_Video_Shown');
                    $(this).addClass('Watched_Video_Hidden');
                    $(this).hide();
                    hiddenCount++;
                } else {
                    $(this).removeClass('Watched_Video_Hidden');
                    $(this).addClass('Watched_Video_Shown');
                    $(this).show();
                    shownCount++;
                }
            });

            $("#WatchedVideosNumber").text(hiddenCount + shownCount);
        }
    }

    // Create Watched Videos Number Counter
    waitForKeyElements('#start.ytd-masthead', CreateHiddenVideosCounter, 0);
    function CreateHiddenVideosCounter () {
        getHideWatchedPref()
        if (!document.querySelector("#WatchedVideosNumber")) {
            var ra123 = $('<div/>').attr({type: "div",id: "WatchedVideosNumber",class: "WatchedVideosNumberlabel"});
            $('#start.ytd-masthead').append(ra123);
            $("#WatchedVideosNumber").text("0");
        }
    }

    // Create Toggle Button
    waitForKeyElements('#WatchedVideosNumber', CreateToggleButton, 0);
    function CreateToggleButton () {
        var r2 = $('<input/>').attr({type: "button",id: "HideWatchedVideosButton",value: "Toggle Watched Videos",class: "WatchedVideoButton"});
        $(r2).insertBefore('#WatchedVideosNumber');
        document.getElementById("HideWatchedVideosButton").addEventListener("click", ToggleClickAction, false);
        if(getHideWatchedPref() === '1') {$('.WatchedVideoButton').attr('value', 'Show Watched Videos').attr('style', 'width: 175px;');}
        else if(getHideWatchedPref() === '0') {$('.WatchedVideoButton').attr('value', 'Hide Watched Videos').attr('style', 'width: 168px;');}
    }
    // Toggle Action
    function ToggleClickAction() {
        if(getHideWatchedPref() === '0') {
            setHideWatchedPref('1');
            $('.WatchedVideoButton').attr('value', 'Show Watched Videos').attr('style', 'width: 175px;');
        }
        else if(getHideWatchedPref() === '1') {
            setHideWatchedPref('0');
            $('.WatchedVideoButton').attr('value', 'Hide Watched Videos').attr('style', 'width: 168px;');
        }
        handleNewVideos();
    }

    waitForKeyElements('div[id="progress"][style*="width: 100%"]', handleNewVideos, 0);
    waitForKeyElements('div[class*="WatchedProgressBar"][style*="width: 100%"]', handleNewVideos, 0);
});
