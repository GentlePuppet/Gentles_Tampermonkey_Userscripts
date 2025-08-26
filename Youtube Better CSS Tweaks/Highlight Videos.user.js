// ==UserScript==
// @name         Youtube Highlight Videos
// @version      2.0.0
// @match        https://www.youtube.com/*
// @icon         https://www.youtube.com/s/desktop/1eca3218/img/favicon_144.png
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require      http://github.com/bartaz/sandbox.js/raw/master/jquery.highlight.js
// @grant        GM_addStyle
// ==/UserScript==
// CSS
GM_addStyle(`
    #favoritesfiltercheckbox {height:20px;width:20px;}
    #favoritesfilterlabel {width:auto;padding: 0px 5px 0px 0px;}
    .Favorite_Video_Type { border:2px #27ff00 solid;background:#192b0d;padding:5px;}
    .FavoriteVideoButton:hover {background: #56ff00 !important;}
    .favoritetext{color: #59d40c;}
    .ytSearchboxComponentInputBox {margin-left: 0px !important; border-radius: 0px 0 0 0px !important;}
    .NewHighlightsButton {color: var(--yt-spec-text-primary) !important;background: #383838 !important;border: black 1px solid;cursor: pointer;text-shadow: 1px 1px 3px black;padding: 8px 12px;border-radius: 5px;}
    .NewHighlightsButton:hover {background: #555 !important;}
    #parent-fcboxes{position:fixed; inset:0;background:rgba(0,0,0,.8);display:flex; align-items:center; justify-content:center;z-index:5000000;}
    #fcboxes-wrapper{display:inline-flex;flex-direction:column;align-items:center;max-width:90vw;}
    #fcboxes{display:inline-flex;flex-wrap:wrap;gap:12px;width:fit-content;max-width:80vw;max-height:60vh;overflow:auto;padding:16px 18px;font-size:18px;background:var(--yt-spec-brand-background-primary);border:2px solid var(--yt-spec-10-percent-layer2);color:white;border-radius:10px;box-shadow:0 6px 24px rgba(0,0,0,.35);}
    #fcboxes2{display:flex; gap:10px;margin-top:14px; justify-content:center;}
    .filter-item{display:inline-flex; align-items:center; gap:6px;background:#222; padding:6px 10px; border-radius:6px;white-space:nowrap;}
`);

// Cookie Functions
function getCookie(name) {return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1] || null;}
function setCookie(name, value) {const expires = new Date(Date.now() + 31536000000).toUTCString(); document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; domain=.youtube.com;`;}
function getFavorites() {const val = getCookie('FavoriteVideos'); return val ? decodeURIComponent(val).split(',').map(v => v.trim().toLowerCase()) : [];}
function saveFavorites(favorites) {setCookie('FavoriteVideos', favorites.join(','));}

// Main Logic
window.addEventListener("yt-page-data-updated", () => {
    let favorites = getFavorites();

    // If no favorites found, initialize
    if (!favorites.length) {
        saveFavorites(['NOFAVORITESFOUND']);
        favorites = ['NOFAVORITESFOUND'];
    } else {
        saveFavorites(favorites);
    }

    // Highlight Videos
    favorites.forEach((filter) => {
        if (filter.startsWith('by ')) {
            // Channel filter
            const channelName = filter.slice(3).trim();
            waitForKeyElements(`yt-formatted-string[title*='${channelName}' i]`, HighlightChannel, 0);
        } else {
            // Video title filter
            waitForKeyElements(`#video-title-link[title*='${filter}' i]`, HighlightVideo, 0);
        }
    });
    function HighlightVideo(e) {e.closest("ytd-grid-video-renderer, ytd-rich-item-renderer")?.attr("class", "Favorite_Video_Type");}
    function HighlightChannel(e) {e.closest("ytd-grid-video-renderer, ytd-rich-item-renderer")?.attr("class", "Favorite_Video_Type");}

    // Periodically highlight matching text inside video titles
    setInterval(() => {$('.Favorite_Video_Type #video-title').highlight(favorites, { className: 'favoritetext' })}, 2500);

    // Add "+ Favorite" button to YouTube search bar
    waitForKeyElements ('.ytSearchboxComponentInputBox', CreateAddFavoriteButton, 0);
    function CreateAddFavoriteButton (e) {
        var AddFavoriteCheck = document.querySelector("#AddFavorite");
        if (!AddFavoriteCheck) {
            const AFB = $('<button/>').attr({type: "button",id: "AddFavorite",class: "FavoriteVideoButton",style: 'align-self: normal !important; color: var(--yt-spec-text-primary) !important; overflow: hidden !important; font-size: var(--ytd-subheadline-link_-_font-size) !important; font-weight: var(--ytd-subheadline-link_-_font-weight) !important; line-height: var(--ytd-subheadline-link_-_line-height) !important; letter-spacing: var(--ytd-subheadline-link_-_letter-spacing) !important; background: #2b6705 !important; border: #032702 1px solid; cursor: pointer; text-shadow: 1px 1px 3px black;',});
            $(AFB).insertBefore(e);
            $("#AddFavorite").text("+");
            AFB.on('click', (e) => e.shiftKey ? displayFilters() : addNewFavorite());
        }
    }

    // Add New Favorite
    function addNewFavorite() {
        const input = prompt('Enter Text You Want Add To Your Favorites (Not Case Sensitive)\nShift+Click the Button to Display/Remove Filters\nTo highlight channels do "by channelname"\nYou can add multiple filters separated by commas.\nExample: minecraft, by vanoss, speed run');
        if (!input) return;

        const newFilters = input.split(',').map(f => f.trim().toLowerCase()).filter(f => f.length > 0);

        if (!newFilters.length) return;

        // Merge with existing filters (remove placeholder)
        const favs = getFavorites().filter(f => f !== 'NOFAVORITESFOUND');
        newFilters.forEach(f => { if (!favs.includes(f)) favs.push(f); });

        saveFavorites(favs);
        location.reload();
    }

    // Display & Manage Filters
    function displayFilters() {
        const container = $('<div/>', { id: "parent-fcboxes" }).appendTo('body');
        const wrapper = $('<div/>', { id: "fcboxes-wrapper" }).appendTo(container);
        const listBox = $('<div/>', { id: "fcboxes" }).appendTo(wrapper);
        const btnBox = $('<div/>', { id: "fcboxes2" }).appendTo(wrapper);

        const favs = getFavorites().filter(f => f !== 'NOFAVORITESFOUND').sort();

        favs.forEach((fav, i) => {
            const item = $('<div/>', { class: "filter-item" }).appendTo(listBox);
            const id   = `favfilter-${i}`;
            $('<input/>', { type: "checkbox", id, value: fav, class: "favoritesfiltercheckbox", checked: true }).appendTo(item);
            $('<label/>', { for: id, text: fav }).appendTo(item);
        });

        $('<button/>', { id: "applyfiltersbutton", class: "NewHighlightsButton", text: "Keep Checked Filters & Reload Page" })
            .appendTo(btnBox)
            .on('click', () => {
            const newFavs = $(".favoritesfiltercheckbox:checked").map((_, el) => el.value.toLowerCase()).get();
            saveFavorites(newFavs);
            container.remove();
            location.reload();
        });

        $('<button/>', { id: "cancelfiltersbutton", class: "NewHighlightsButton", text: "Cancel" })
            .appendTo(btnBox)
            .on('click', () => container.remove());

        // Optional UX niceties: click backdrop or press ESC to close
        container.on('click', (e) => { if (e.target === container[0]) container.remove(); });
        $(document).on('keydown.modalEsc', (e) => { if (e.key === 'Escape') { container.remove(); $(document).off('keydown.modalEsc'); } });
    }
});
