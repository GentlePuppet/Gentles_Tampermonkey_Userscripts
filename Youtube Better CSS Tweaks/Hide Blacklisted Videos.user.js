// ==UserScript==
// @name         Youtube Hide Blacklisted Videos
// @author       GentlePuppet
// @version      2.0.5
// @match        https://www.youtube.com/*
// @icon         https://www.youtube.com/s/desktop/1eca3218/img/favicon_144.png
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require      https://raw.githubusercontent.com/carhartl/jquery-cookie/v1.4.1/jquery.cookie.js
// @require      https://github.com/pieroxy/lz-string/raw/master/libs/lz-string.min.js
// @require      http://github.com/bartaz/sandbox.js/raw/master/jquery.highlight.js
// @grant        GM_addStyle
// @run-at       document-start
// @updateURL    https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Better%20CSS%20Tweaks/Youtube%20Hide%20Blacklisted%20Videos.user.js
// @downloadURL  https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Better%20CSS%20Tweaks/Youtube%20Hide%20Blacklisted%20Videos.user.js
// ==/UserScript==
/* globals $, waitForKeyElements */

// Blacklisted Toggle Button Stlye
GM_addStyle(`
    .BlacklistedVideoButton {height: 30px;margin: auto;align-self: normal !important;color: var(--yt-spec-text-primary) !important;overflow: hidden !important;font-family: "Roboto","Arial",sans-serif !important;font-size: 1.4rem !important;line-height: 2rem !important;font-weight: 400 !important;background: #383838 !important;border: black 1px solid;cursor: pointer;text-shadow: 1px 1px 3px black;}
    .BlacklistedVideoButton:hover {background: #595959 !important;}
    .BlacklistedVideosNumberlabel {padding: 0px 5px 0px 5px;color: var(--yt-spec-text-primary) !important; background: #860510 !important; border: black 1px solid; height: 28px;margin: auto;align-self: normal; text-shadow: 1px 1px 3px black;font-family: "Roboto","Arial",sans-serif !important;font-size: 1.4rem !important; line-height: 28px !important;letter-spacing: var(--ytd-subheadline-link_-_letter-spacing) !important;}
    .Blacklisted_Video_Shown {Opacity: 80%; background: #381b1b !important; border: 2px red solid !important; padding: 5px; }
    .Blacklisted_Video_Shown > div > ytd-thumbnail {Opacity: 40%; }
    ytd-continuation-item-renderer:not(.ytd-comment-replies-renderer) {height: 0px !important;}
    paper-spinner.ytd-continuation-item-renderer {display: none !important; margin: 0px !important;}
    .ytp-spinner {display: none !important;}
    #blacklistfiltercheckbox {height:20px;width:20px;}
    #blacklistfilterlabel {width:auto;padding: 0px 5px 0px 0px;}
    .NewFiltersButton {align-self: normal !important; color: var(--yt-spec-text-primary) !important; overflow: hidden !important; font-size: var(--ytd-subheadline-link_-_font-size) !important; font-weight: var(--ytd-subheadline-link_-_font-weight) !important; line-height: var(--ytd-subheadline-link_-_line-height) !important; letter-spacing: var(--ytd-subheadline-link_-_letter-spacing) !important; background: #383838 !important; border: black 1px solid; cursor: pointer; text-shadow: 1px 1px 3px black;} .BlacklistedVideoButton:hover {background: #595959 !important;}
    .blacklistedtext{color: #ff472a;}
    #video-title:hover{overflow: visible !important;max-height: fit-content !important;display: block !important;}
    #parent-bcboxes {position: fixed;inset: 0;background: rgba(0, 0, 0, 0.8);display: flex;align-items: center;justify-content: center;z-index: 5000000;}
    #bcboxes-wrapper {display: inline-flex;flex-direction: column;align-items: center;max-width: 90vw;}
    #bcboxes {display: inline-flex;flex-wrap: wrap;gap: 12px;width: fit-content;max-width: 80vw;max-height: 60vh;overflow: auto;padding: 16px 18px;font-size: 18px;background: var(--yt-spec-brand-background-primary);border: 2px solid var(--yt-spec-10-percent-layer2);color: white;border-radius: 10px;box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35);}
    #bcboxes2 {display: flex;gap: 10px;margin-top: 14px;justify-content: center;}
    .filter-item {display: inline-flex;align-items: center;gap: 6px;background: #222;padding: 6px 10px;border-radius: 6px;white-space: nowrap;}
`);
const DEBUG = false; // Set to false to disable debug logs
function debugLog(...args) {if (DEBUG) console.log('[DEBUG]', ...args);}

// Cookie Functions
function getCookie(name) {return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1] || null;}
function setCookie(name, value) {const expires = new Date(Date.now() + 31536000000).toUTCString(); document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; domain=.youtube.com;`;}
function getBlacklist() {const val = getCookie('BlacklistedVideos'); return val ? decodeURIComponent(val).split(',').map(v => v.trim().toLowerCase()) : [];}
function saveBlacklist(blacklist) {setCookie('BlacklistedVideos', blacklist.join(','));}

window.addEventListener("yt-page-data-updated", function(e) {
    debugLog('yt-page-data-updated event fired');

    // Initialize Blacklist Cookie if it doesn't exist
    if (!getCookie('BlacklistedVideos')) {setCookie('BlacklistedVideos', 'NOBLACKLISTFOUND');}

    // Get Blacklist Filter
    let blacklist = getCookie('BlacklistedVideos') || 'NOBLACKLISTFOUND';
    blacklist = decodeURIComponent(blacklist).split(',');
    debugLog('Blacklist loaded:', blacklist);

    // Mark Blacklisted Words
    setInterval(() => {$('.Blacklisted_Video').highlight(blacklist, { className: 'blacklistedtext' })}, 2500);

    // Blacklist Video
    function Blacklist(video) {
        try {
            debugLog('Blacklist called for video:', video);
            if (window.location.href.includes("playlist") || window.location.href.includes("history")) return;

            const selectorMap = [
                ".ytd-rich-grid-renderer",
                ".ytd-item-section-renderer",
                "yt-lockup-view-model.ytd-watch-next-secondary-results-renderer"
            ];

            const hidePref = $.cookie('hideblacklistedvideos') === '1';
            let hiddenCount = 0;
            let shownCount = 0;
            function markBlacklisted(input) {
                $(input).each(function () {
                    const video = $(this).parents(selectorMap.join(',')).first();

                    // Find the page container that this video belongs to
                    const pageContainer = video.closest('ytd-browse[page-subtype]');

                    // Skip if the page container is hidden (not the active page)
                    if (pageContainer.length && pageContainer.attr('hidden') !== undefined) {
                        return;
                    }

                    // Skip the #contents container
                    if (video.is('#contents') || video.is('ytd-shelf-renderer')) {
                        return;
                    }

                    if (video.length > 0) {
                        video.addClass('Blacklisted_Video');
                    }
                });
            }

            markBlacklisted(video);

            $('.Blacklisted_Video').each(function() {
                try {
                    const pageContainer = $(this).closest('ytd-browse[page-subtype]');
                    if (pageContainer.length && pageContainer.attr('hidden') !== undefined) return;

                    if (hidePref) {
                        $(this).removeClass('Blacklisted_Video_Shown').addClass('Blacklisted_Video_Hidden').hide();
                        hiddenCount++;
                    } else {
                        $(this).removeClass('Blacklisted_Video_Hidden').addClass('Blacklisted_Video_Shown').show();
                        shownCount++;
                    }
                } catch (e) {
                    console.error('Error processing Blacklisted_Video:', e);
                }
            });

            $.cookie('hideblacklistedvideos', hidePref ? '1' : '0', { domain: '.youtube.com', expires: 7, path: '/' });
            $("#BlacklistedVideosNumber").text(hiddenCount + shownCount);
            debugLog('Blacklist applied. Hidden:', hiddenCount, 'Shown:', shownCount);
        } catch (e) {
            console.error('Error in Blacklist function:', e);
        }
    }

    // Blacklists Input Text
    function applyBlacklist(filters) {
        if (!filters) return;
        // Ensure we have an array
        const filterArray = Array.isArray(filters) ? filters : [filters];
        filterArray.forEach((filter) => {
            try {
                if (!filter || filter === 'NOBLACKLISTFOUND') return;
                if (filter.startsWith('by ')) {
                    // Channel filter
                    const channelName = filter.slice(3).trim();
                    debugLog('Applying channel filter:', channelName);
                    waitForKeyElements(".yt-lockup-metadata-view-model__metadata a.yt-core-attributed-string__link",function(jNode) {if (jNode.text().trim().toLowerCase() === channelName.toLowerCase()) {Blacklist(jNode);}},0);
                } else {
                    // Video title filter
                    debugLog('Applying video title filter:', filter);
                    waitForKeyElements(`.yt-lockup-metadata-view-model__heading-reset[title*='${filter}' i]`,Blacklist,0); // Recommened and Subs Page Videos
                    waitForKeyElements(`#video-title-link[title*='${filter}' i]`,Blacklist,0);                             // Channel Page Videos
                }
            } catch (e) {
                console.error('Error applying blacklist filter:', filter, e);
            }
        });
    }

    // Apply Saved Blacklist Filter
    applyBlacklist(blacklist);

    // Create Blacklisted Videos Number Counter
    waitForKeyElements('#start.ytd-masthead', CreateBlacklistedVideosCounter, 0);
    function CreateBlacklistedVideosCounter() {
        var BlacklistedVideosCounterCheck = document.querySelector("#BlacklistedVideosNumber");
        if (!BlacklistedVideosCounterCheck) {
            var ba = $('<div/>').attr({type: "div",id: "BlacklistedVideosNumber",class: "BlacklistedVideosNumberlabel"});
            $('#start.ytd-masthead').append(ba);
            $("#BlacklistedVideosNumber").text("0");
        }
    }

    // Create Add New Blacklist Button
    waitForKeyElements('#BlacklistedVideosNumber', CreateAddBlacklistButton, 0);
    function CreateAddBlacklistButton() {
        var AddBlacklistCheck = document.querySelector("#AddBlacklist");
        if (!AddBlacklistCheck) {
            var ablklst = $('<button/>').attr({type: "button", id: "AddBlacklist", class: "BlacklistedVideoButton", style: ""});
            $(ablklst).insertBefore('#BlacklistedVideosNumber');
            $("#AddBlacklist").text("+");
            ablklst.on('click', (e) => e.shiftKey ? DisplayFilters() : addNewBlacklist());
        }
    }

    // Add New Blacklist Action
    function addNewBlacklist(event) {
        if (event?.shiftKey) return;

        const input = prompt(
            'Enter Text You Want Add To The Blacklist (Not Case Sensitive)\n' +
            'Shift+Click the Button to Display/Remove Filters\n' +
            'You can add multiple filters separated by commas.\n' +
            'Example: minecraft, speed run'
        );
        if (!input) return;

        const newFilters = input.split(',').map(f => f.trim().toLowerCase()).filter(f => f.length > 0);
        if (!newFilters.length) return;

        // Merge with existing blacklist
        const currentBlacklist = getBlacklist();
        const filteredBlacklist = currentBlacklist.filter(f => f !== 'NOBLACKLISTFOUND');

        newFilters.forEach(f => {
            if (!filteredBlacklist.includes(f)) filteredBlacklist.push(f);
        });

        saveBlacklist(filteredBlacklist);
        applyBlacklist(filteredBlacklist);
    }

    // Display Menu to Remove Filters
    function DisplayFilters() {
        if (!event.shiftKey) return;

        const container = $('<div/>', { id: "parent-bcboxes" }).insertBefore('#content');
        const wrapper = $('<div/>', { id: "bcboxes-wrapper" }).appendTo(container);
        const listBox = $('<div/>', { id: "bcboxes" }).appendTo(wrapper);
        const btnBox = $('<div/>', { id: "bcboxes2" }).appendTo(wrapper);

        let blacklist = getCookie('BlacklistedVideos') || 'NOBLACKLISTFOUND';
        blacklist = decodeURIComponent(blacklist).split(',').filter(f => f !== 'NOBLACKLISTFOUND').sort();

        blacklist.forEach((video, i) => {
            const item = $('<div/>', { class: "filter-item" }).appendTo(listBox);
            const id = `blacklistfilter-${i}`;
            $('<input/>', { type: "checkbox", id, value: video, class: "blacklistfiltercheckbox", checked: true }).appendTo(item);
            $('<label/>', { for: id, text: video }).appendTo(item);
        });

        $('<button/>', { id: "applyfiltersbutton", class: "BlacklistedVideoButton", text: "Keep Checked Filters & Reload Page" })
            .appendTo(btnBox)
            .on('click', () => {
            const newBlacklist = $(".blacklistfiltercheckbox:checked").map((_, el) => el.value.toLowerCase()).get();
            setCookie('BlacklistedVideos', newBlacklist.join(','));
            container.remove();
            location.reload();
        });

        $('<button/>', { id: "cancelfiltersbutton", class: "BlacklistedVideoButton", text: "Cancel" })
            .appendTo(btnBox)
            .on('click', () => container.remove());

        // Optional UX: click backdrop or press ESC to close
        container.on('click', (e) => { if (e.target === container[0]) container.remove(); });
        $(document).on('keydown.modalEsc', (e) => { if (e.key === 'Escape') { container.remove(); $(document).off('keydown.modalEsc'); } });
    }

    // Remove Filters Add Reload Page
    function ApplyCheckedFilters() {
        var NewFilter = [];
        $("#blacklistfiltercheckbox:checked").each(function() {NewFilter.push($(this).val().toLowerCase());});
        $.cookie('BlacklistedVideos', NewFilter, { domain: '.youtube.com', expires: 128000, path: '/' });
        $("#parent-bcboxes").remove();
        location.reload();
    }

    // Keep Filters
    function CancelCheckedFilters() {$("#parent-bcboxes").remove();}

    // Create Toggle Button
    waitForKeyElements('#AddBlacklist', CreateToggleBlacklistButton, 0);
    function CreateToggleBlacklistButton() {
        var b2 = $('<input/>').attr({ type: "button", id: "ToggleBlacklistedVideosButton", value: "Toggle Blacklisted Videos", class: "BlacklistedVideoButton"});
        $(b2).insertBefore('#AddBlacklist');
        document.getElementById("ToggleBlacklistedVideosButton").addEventListener("click", ToggleBlacklisted, false);
        if($.cookie('hideblacklistedvideos', Number) == 1) {$('.BlacklistedVideoButton').attr('value', 'Show Blacklisted Videos');}
        if($.cookie('hideblacklistedvideos', Number) == 0) {$('.BlacklistedVideoButton').attr('value', 'Hide Blacklisted Videos');}
    }

    // Toggle Button Action
    function ToggleBlacklisted() {
        const hidePref = $.cookie('hideblacklistedvideos') === '1' ? '0' : '1';
        $.cookie('hideblacklistedvideos', hidePref, { domain: '.youtube.com', expires: 7, path: '/' });

        if (hidePref === '1') {
            $('.BlacklistedVideoButton').attr('value', 'Show Blacklisted Videos');
        } else {
            $('.BlacklistedVideoButton').attr('value', 'Hide Blacklisted Videos');
        }

        Blacklist()
    }
});
