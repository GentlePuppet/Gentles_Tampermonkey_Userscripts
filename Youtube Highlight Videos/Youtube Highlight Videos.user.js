// ==UserScript==
// @name         Youtube Highlight Videos
// @author       GentlePuppet
// @version      1.5.1
// @match        https://www.youtube.com/*
// @icon         https://www.youtube.com/s/desktop/1eca3218/img/favicon_144.png
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require      https://raw.githubusercontent.com/carhartl/jquery-cookie/v1.4.1/jquery.cookie.js
// @require      http://github.com/bartaz/sandbox.js/raw/master/jquery.highlight.js
// @grant        GM_addStyle
// @run-at       document-start
// @updateURL    https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Highlight%20Videos/Youtube%20Highlight%20Videos.user.js
// @downloadURL  https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Highlight%20Videos/Youtube%20Highlight%20Videos.user.js
// ==/UserScript==
// Blocking Specific Types of Videos
GM_addStyle(`
    #favoritesfiltercheckbox {height:20px;width:20px;} #favoritesfilterlabel {width:auto;padding: 0px 5px 0px 0px;}
    #parent-fcboxes {position:absolute;height:100%;width:100%;z-index:5000000;display:block;margin:auto;background:#000000d4;}
    #fcboxes {height:fit-content;width:fit-content;margin:auto;display:grid;font-size:20px;border:2px solid var(--yt-spec-10-percent-layer2);background:var(--yt-spec-brand-background-primary);color:white;grid-template-columns: auto auto auto auto auto auto auto auto;}
    #fcboxes2 {height:fit-content;width:fit-content;margin:auto;display:grid;font-size:20px;background:var(--yt-spec-brand-background-primary);color:white;}
    .NewFiltersButton {align-self: normal !important; color: var(--yt-spec-text-primary) !important; overflow: hidden !important; font-size: var(--ytd-subheadline-link_-_font-size) !important; font-weight: var(--ytd-subheadline-link_-_font-weight) !important; line-height: var(--ytd-subheadline-link_-_line-height) !important; letter-spacing: var(--ytd-subheadline-link_-_letter-spacing) !important; background: #383838 !important; border: black 1px solid; cursor: pointer; text-shadow: 1px 1px 3px black;} .BlacklistedVideoButton:hover {background: #595959 !important;}
    .Favorite_Video_Type { border:2px #27ff00 solid;background:#192b0d;padding:5px;}
    .FavoriteVideoButton:hover {background: #56ff00 !important;}
`);
window.addEventListener("yt-page-data-updated", function(e) {
    // Highlight Favorite Videos
    if($.cookie('FavoriteVideos') == undefined) {$.cookie('FavoriteVideos', "NOFAVORITESFOUND", { domain: '.youtube.com', expires: 128000, path: '/' });}
    let getfavorites = $.cookie('FavoriteVideos').replace(/(&#(\d+);)/g, function(match, capture, charCode) {return String.fromCharCode(charCode);});
    let favorites = getfavorites.split(',');
    favorites.forEach((video) => {waitForKeyElements ('#video-title[aria-label*=' + video + ' i]', HighlightVideo, 0)})
    // Highlight Favorite Videos Action
    function HighlightVideo (jNode) {
        jNode.parents("ytd-grid-video-renderer").attr("class", "Favorite_Video_Type");
        //jNode.parents("ytd-compact-video-renderer").attr("class", "Favorite_Video_Type");
    }
    // Mark Highlighted Titles
    var markedfavorites = getfavorites.replaceAll('"', '').replaceAll(', ', ',').replaceAll('" ', '"').split(',');
    setInterval(function() {
        $('a#video-title').highlight(markedfavorites);
    },5000);
    // Create Add New Favorite Button
    waitForKeyElements ('#search-form > #container', CreateAddFavoriteButton, 0);
    function CreateAddFavoriteButton () {
        var AddFavoriteCheck = document.querySelector("#AddFavorite");
        if (!AddFavoriteCheck) {
            var AFB = $('<button/>').attr({type: "button",id: "AddFavorite",class: "FavoriteVideoButton",style: 'align-self: normal !important; color: var(--yt-spec-text-primary) !important; overflow: hidden !important; font-size: var(--ytd-subheadline-link_-_font-size) !important; font-weight: var(--ytd-subheadline-link_-_font-weight) !important; line-height: var(--ytd-subheadline-link_-_line-height) !important; letter-spacing: var(--ytd-subheadline-link_-_letter-spacing) !important; background: #2b6705 !important; border: #032702 1px solid; cursor: pointer; text-shadow: 1px 1px 3px black;',});
            $(AFB).insertBefore('#search-form > #container');
            $("#AddFavorite").text("+");
            document.getElementById ("AddFavorite").addEventListener ("click", AddNewFavoriteAction, false);
            document.getElementById ("AddFavorite").addEventListener ("click", DisplayFilters, true);
        }
    }
    // Add New Favorite Action
    function AddNewFavoriteAction () {if(event.shiftKey){return;}
        var NewFavorite = window.prompt('Enter Text You Want Add To Your Favorites,\n(Is Not Case Sensitive),\nShift+Click the Button to Display/Remove Filters');
        var FixNewFavorite = NewFavorite.toLowerCase();
        if(NewFavorite == null || NewFavorite == undefined || NewFavorite == '') {return;}
        if($.cookie('FavoriteVideos') == "NOFAVORITESFOUND") {$.cookie('FavoriteVideos', '"' + NewFavorite + '"', { domain: '.youtube.com', expires: 128000, path: '/' });}
        if($.cookie('FavoriteVideos') !== -1) {var CurrentFavorites = $.cookie('FavoriteVideos'); $.cookie('FavoriteVideos', CurrentFavorites + ', "' + FixNewFavorite + '"', { domain: '.youtube.com', expires: 128000, path: '/' });}
        let getfavorites = $.cookie('FavoriteVideos').replace(/(&#(\d+);)/g, function(match, capture, charCode) {return String.fromCharCode(charCode);});
        let favorites = getfavorites.split(',');
        favorites.forEach((video) => {waitForKeyElements ('#video-title[aria-label*=' + video + ' i]', HighlightVideo, 0)})
    }
    // Display Menu to Remove Filters
    function DisplayFilters(){if(event.shiftKey){
        var CFFLAP = $('<div/>').attr({type: "div",id: "parent-fcboxes"});
        var CFFLA = $('<div/>').attr({type: "div",id: "fcboxes"});
        var CFFLA2 = $('<div/>').attr({type: "div",id: "fcboxes2"});
        $(CFFLAP).insertBefore('#content');
        $('#parent-fcboxes').append(CFFLA);
        $('#parent-fcboxes').append(CFFLA2);
        var myDiv = document.getElementById("fcboxes");
        let favorites = $.cookie('FavoriteVideos').replace(/(&#(\d+);)/g, function(match, capture, charCode) {return String.fromCharCode(charCode);}).split(',').sort();
        for (var i = 0; i < favorites.length; i++) {
            var checkBox = document.createElement("input");
            var label = document.createElement("label");
            checkBox.type = "checkbox";
            checkBox.value = favorites[i];
            checkBox.id = "favoritesfiltercheckbox";
            label.id = "favoritesfilterlabel";
            myDiv.appendChild(checkBox);
            myDiv.appendChild(label);
            label.appendChild(document.createTextNode(favorites[i]));
            checkBox.checked = true
        }
        var ACFL = $('<button/>').attr({type: "button",id: "applyfiltersbutton",class: "NewFiltersButton"});
        var CNFL = $('<button/>').attr({type: "button",id: "cancelfiltersbutton",class: "NewFiltersButton"});
        $('#fcboxes2').append(ACFL);
        $(CNFL).insertAfter("#applyfiltersbutton");
        $("#applyfiltersbutton").text("Keep Checked Filters & Reload Page");
        $("#cancelfiltersbutton").text("Cancel");
        document.getElementById ("applyfiltersbutton").addEventListener ("click", ApplyCheckedFilters, false);
        document.getElementById ("cancelfiltersbutton").addEventListener ("click", CancelCheckedFilters, false);
    }}
    // Remove Filters Add Reload Page
    function ApplyCheckedFilters () {
        var NewFilter = [];
        $("#favoritesfiltercheckbox:checked").each(function() {
            NewFilter.push($(this).val().toLowerCase());
        });
        $.cookie('FavoriteVideos', NewFilter, { domain: '.youtube.com', expires: 128000, path: '/' });
        $("#parent-fcboxes").remove();
        location.reload();
    }
    // Keep Filters
    function CancelCheckedFilters () {
        $("#parent-fcboxes").remove();
        }
});
