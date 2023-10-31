	// ==UserScript==
// @name         Youtube Hide Blacklisted Videos
// @author       GentlePuppet
// @version      1.8.3
// @match        https://www.youtube.com/*
// @icon         https://www.youtube.com/s/desktop/1eca3218/img/favicon_144.png
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require      https://raw.githubusercontent.com/carhartl/jquery-cookie/v1.4.1/jquery.cookie.js
// @require      https://github.com/pieroxy/lz-string/raw/master/libs/lz-string.min.js
// @require      http://github.com/bartaz/sandbox.js/raw/master/jquery.highlight.js
// @grant        GM_addStyle
// @run-at       document-start
// @updateURL    https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Hide%20Blacklisted%20Videos/Youtube%20Hide%20Blacklisted%20Videos.user.js
// @downloadURL  https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Hide%20Blacklisted%20Videos/Youtube%20Hide%20Blacklisted%20Videos.user.js
// ==/UserScript==
// Blacklisted Toggle Button Stlye
GM_addStyle(`
    .BlacklistedVideoButton {align-self: normal !important; color: var(--yt-spec-text-primary) !important; overflow: hidden !important; font-size: var(--ytd-subheadline-link_-_font-size) !important; font-weight: var(--ytd-subheadline-link_-_font-weight) !important; line-height: var(--ytd-subheadline-link_-_line-height) !important; letter-spacing: var(--ytd-subheadline-link_-_letter-spacing) !important; background: #383838 !important; border: black 1px solid; cursor: pointer; text-shadow: 1px 1px 3px black;}
    .BlacklistedVideoButton:hover {background: #595959 !important;}
    .Blacklisted_Video_Shown {Opacity: 80%; background: #381b1b; border: 2px red solid; padding: 5px; }
    .Blacklisted_Video_Shown > div > ytd-thumbnail {Opacity: 40%; }
    ytd-continuation-item-renderer {height: 0px !important;}
    paper-spinner.ytd-continuation-item-renderer {display: none !important; margin: 0px !important;}
    .ytp-spinner {display: none !important;}
    #blacklistfiltercheckbox {height:20px;width:20px;}
    #blacklistfilterlabel {width:auto;padding: 0px 5px 0px 0px;}
    .NewFiltersButton {align-self: normal !important; color: var(--yt-spec-text-primary) !important; overflow: hidden !important; font-size: var(--ytd-subheadline-link_-_font-size) !important; font-weight: var(--ytd-subheadline-link_-_font-weight) !important; line-height: var(--ytd-subheadline-link_-_line-height) !important; letter-spacing: var(--ytd-subheadline-link_-_letter-spacing) !important; background: #383838 !important; border: black 1px solid; cursor: pointer; text-shadow: 1px 1px 3px black;} .BlacklistedVideoButton:hover {background: #595959 !important;}
    #parent-bcboxes {position:absolute;height:100%;width:100%;z-index:5000000;display:block;margin:auto;background:#000000d4;}
    #bcboxes {height:fit-content;width:fit-content;margin:auto;display:grid;font-size:20px;border:2px solid var(--yt-spec-10-percent-layer2);background:var(--yt-spec-brand-background-primary);color:white;grid-template-columns: auto auto auto auto auto auto auto auto;}
    #bcboxes2 {height:fit-content;width:fit-content;margin:auto;display:grid;font-size:20px;background:var(--yt-spec-brand-background-primary);color:white;}
    .blacklistedtext{color: #ff472a;}
    #video-title:hover{overflow: visible !important;max-height: fit-content !important;display: block !important;}
`);
window.addEventListener("yt-page-data-updated", function(e) {
    // Reset Blacklisted Video Counter Number
    var bvh = null;
    var bvs = null;
    delete bvh
    delete bvs
    $("#BlacklistedVideosNumber").text("0");
    // Check If Blacklist Cookie Exists, If Not Create It
    if($.cookie('BlacklistedVideos') == undefined) {$.cookie('BlacklistedVideos', "NOBLACKLISTFOUND", { domain: '.youtube.com', expires: 128000, path: '/' });}
    // Get Blacklist Filter and Apply it
    var getblacklistcookie = $.cookie('BlacklistedVideos');
    var getblacklist = getblacklistcookie.replace(/(&#(\d+);)/g, function(match, capture, charCode) {return String.fromCharCode(charCode);});
    var blacklist = getblacklist.split(',');
    blacklist.forEach((video) => {waitForKeyElements ('#video-title[aria-label*=' + video + ' i]', REMOVEVIDEO, 0)})
    // Remove Blacklisted Video Action
    function REMOVEVIDEO (jNode) {
        if($.cookie('hideblacklistedvideos') == undefined) {
            $.cookie('hideblacklistedvideos', '1', { domain: '.youtube.com', expires: 7, path: '/' });
        }
        if($.cookie('hideblacklistedvideos', Number) == 1) {
            $.cookie('hideblacklistedvideos', '1', { domain: '.youtube.com', expires: 7, path: '/' });
            jNode.parents("ytd-grid-video-renderer").hide();jNode.parents("ytd-grid-video-renderer").attr("class", "Blacklisted_Video_Hidden");
            jNode.parents("ytd-compact-video-renderer").hide();jNode.parents("ytd-compact-video-renderer").attr("class", "Blacklisted_Video_Hidden");
            jNode.parents("ytd-rich-item-renderer").hide();jNode.parents("ytd-rich-item-renderer").attr("class", "Blacklisted_Video_Hidden");
        }
        if($.cookie('hideblacklistedvideos', Number) == 0) {
            $.cookie('hideblacklistedvideos', '0', { domain: '.youtube.com', expires: 7, path: '/' });
            jNode.parents("ytd-grid-video-renderer").attr("class", "Blacklisted_Video_Shown");
            jNode.parents("ytd-compact-video-renderer").attr("class", "Blacklisted_Video_Shown");
            jNode.parents("ytd-rich-item-renderer").attr("class", "Blacklisted_Video_Shown");
        }
    }
    // Mark Blacklisted Words
    var markedblacklist = getblacklist.replaceAll('"', '').replaceAll(', ', ',').replaceAll('" ', '"').split(',');
    setInterval(function() {
        $('.Blacklisted_Video_Hidden').find('#video-title').highlight(markedblacklist, { className: 'blacklistedtext' });
        $('.Blacklisted_Video_Shown').find('#video-title').highlight(markedblacklist, { className: 'blacklistedtext' });
    },2500);
    // Check for Blacklisted Videos and Update Counter Every 2.5 Seconds
    setInterval(function() {
        var bvh = $(".Blacklisted_Video_Hidden").length;
        var bvs = $(".Blacklisted_Video_Shown").length;
        $("#BlacklistedVideosNumber").text(bvh + bvs);
    },2500);
    // Create Blacklisted Videos Number Counter
    waitForKeyElements ('#start.ytd-masthead', CreateBlacklistedVideosCounter, 0);
    function CreateBlacklistedVideosCounter () {
        var BlacklistedVideosCounterCheck = document.querySelector("#BlacklistedVideosNumber");
        if (!BlacklistedVideosCounterCheck) {
            var ba = $('<div/>').attr({type: "div",id: "BlacklistedVideosNumber",style: 'color: var(--yt-spec-text-primary) !important; font-size: var(--ytd-subheadline-link_-_font-size) !important; background: #861705 !important; padding: 9px; border: black 1px solid; height: 19px; text-shadow: 1px black; text-shadow: 1px 1px 3px black;'});
            $('#start.ytd-masthead').append(ba);
            $("#BlacklistedVideosNumber").text("0");
        }
    }
    // Create Add New Blacklist Button
    waitForKeyElements ('#BlacklistedVideosNumber', CreateAddBlacklistButton, 0);
    function CreateAddBlacklistButton () {
        var AddBlacklistCheck = document.querySelector("#AddBlacklist");
        if (!AddBlacklistCheck) {var ablklst = $('<button/>').attr({type: "button", id: "AddBlacklist", class: "BlacklistedVideoButton", style: ""});
            $(ablklst).insertBefore('#BlacklistedVideosNumber');
            $("#AddBlacklist").text("+");
            document.getElementById ("AddBlacklist").addEventListener ("click", AddNewBlacklistAction, false);
            document.getElementById ("AddBlacklist").addEventListener ("click", DisplayFilters, true);
        }
    }
    // Add New Blacklist Action
    function AddNewBlacklistAction () {if(event.shiftKey){return;}
        var NewBlacklist = window.prompt('Enter Text You Want Add To The Blacklist,\n(Is Not Case Sensitive),\nShift+Click the Button to Display/Remove Filters');
        var FixNewBlacklist = NewBlacklist.toLowerCase();
        if(NewBlacklist == null || NewBlacklist == undefined || NewBlacklist == '') {return;}
        if($.cookie('BlacklistedVideos') == "NOBLACKLISTFOUND") {$.cookie('BlacklistedVideos', '"' + FixNewBlacklist + '"', { domain: '.youtube.com', expires: 128000, path: '/' });}
        if($.cookie('BlacklistedVideos') !== -1) {$.cookie('BlacklistedVideos', getblacklistcookie + ', "' + FixNewBlacklist + '"', { domain: '.youtube.com', expires: 128000, path: '/' });}
        let Updateblacklist = $.cookie('BlacklistedVideos').replace(/(&#(\d+);)/g, function(match, capture, charCode) {return String.fromCharCode(charCode);}).split(',');
        Updateblacklist.forEach((video) => {waitForKeyElements ('#video-title[aria-label*=' + video + ' i]', REMOVEVIDEO, 0)})
    }
    // Display Menu to Remove Filters
    function DisplayFilters(){if(event.shiftKey){
        var CBBLAP = $('<div/>').attr({type: "div",id: "parent-bcboxes"});
        var CBBLA = $('<div/>').attr({type: "div",id: "bcboxes"});
        var CBBLA2 = $('<div/>').attr({type: "div",id: "bcboxes2"});
        $(CBBLAP).insertBefore('#content');
        $('#parent-bcboxes').append(CBBLA);
        $('#parent-bcboxes').append(CBBLA2);
        var myDiv = document.getElementById("bcboxes");
        let blacklist = $.cookie('BlacklistedVideos').replace(/(&#(\d+);)/g, function(match, capture, charCode) {return String.fromCharCode(charCode);}).split(',').sort();
        for (var i = 0; i < blacklist.length; i++) {var checkBox = document.createElement("input");var label = document.createElement("label");checkBox.type = "checkbox";checkBox.value = blacklist[i];checkBox.id = "blacklistfiltercheckbox";label.id = "blacklistfilterlabel";myDiv.appendChild(checkBox);myDiv.appendChild(label);label.appendChild(document.createTextNode(blacklist[i]));checkBox.checked = true}
        var ACBL = $('<button/>').attr({type: "button",id: "applyfiltersbutton",class: "BlacklistedVideoButton"});
        var CNBL = $('<button/>').attr({type: "button",id: "cancelfiltersbutton",class: "BlacklistedVideoButton"});
        $('#bcboxes2').append(ACBL);
        $(CNBL).insertAfter("#applyfiltersbutton");
        $("#applyfiltersbutton").text("Keep Checked Filters & Reload Page");
        $("#cancelfiltersbutton").text("Cancel");
        document.getElementById ("applyfiltersbutton").addEventListener ("click", ApplyCheckedFilters, false);
        document.getElementById ("cancelfiltersbutton").addEventListener ("click", CancelCheckedFilters, false);
    }}
    // Remove Filters Add Reload Page
    function ApplyCheckedFilters () {
        var NewFilter = [];
        $("#blacklistfiltercheckbox:checked").each(function() {NewFilter.push($(this).val().toLowerCase());});
        $.cookie('BlacklistedVideos', NewFilter, { domain: '.youtube.com', expires: 128000, path: '/' });
        $("#parent-bcboxes").remove();
        location.reload();
    }
    // Keep Filters
    function CancelCheckedFilters () {$("#parent-bcboxes").remove();}
    // Create Toggle Button
    waitForKeyElements ('#AddBlacklist', CreateToggleBlacklistButton, 0);
    function CreateToggleBlacklistButton() {
        var b2 = $('<input/>').attr({ type: "button", id: "ToggleBlacklistedVideosButton", value: "Toggle Blacklisted Videos", class: "BlacklistedVideoButton"});
        $(b2).insertBefore('#AddBlacklist');
        document.getElementById("ToggleBlacklistedVideosButton").addEventListener("click", ToggleBlacklisted, false);
        if($.cookie('hideblacklistedvideos', Number) == 1) {$('.BlacklistedVideoButton').attr('value', 'Show Blacklisted Videos');}
        if($.cookie('hideblacklistedvideos', Number) == 0) {$('.BlacklistedVideoButton').attr('value', 'Hide Blacklisted Videos');}
    }
	// Toggle Button Click Action
	function ToggleBlacklisted() {
        if($.cookie('hideblacklistedvideos', Number) == 0) {
			$.cookie('hideblacklistedvideos', '1', { domain: '.youtube.com', expires: 7, path: '/' });
			$(".Blacklisted_Video_Shown").each(function() {$(this).hide()});
			$(".Blacklisted_Video_Shown").each(function() {$(this).attr("class", "Blacklisted_Video_Hidden")});
			$('.BlacklistedVideoButton').attr('value', 'Show Blacklisted Videos');
            return
        }
        if($.cookie('hideblacklistedvideos', Number) == 1) {
			$.cookie('hideblacklistedvideos', '0', { domain: '.youtube.com', expires: 7, path: '/' });
			$(".Blacklisted_Video_Hidden").each(function() {$(this).show()});
			$(".Blacklisted_Video_Hidden").each(function() {$(this).attr("class", "Blacklisted_Video_Shown")});
			$('.BlacklistedVideoButton').attr('value', 'Hide Blacklisted Videos');
            return
		}
	}
});
