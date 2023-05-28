// ==UserScript==
// @name         Steam Group Mass Kicker Script
// @version      5.0
// @author       GentlePuppet
// @description	 Mass Kick Users From Steam Yer Group
// @include      /https://steamcommunity.com/groups/.*/membersManage/
// @include      /https://steamcommunity.com/profiles/.*/
// @include      /https://steamcommunity.com/id/.*/
// @run-at       document-body
// @grant        GM_addStyle
// @grant        unsafeWindow
// @require      https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require      https://raw.githubusercontent.com/carhartl/jquery-cookie/v1.4.1/jquery.cookie.js
// @icon         https://www.google.com/s2/favicons?domain=steamcommunity.com
// @source       https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/tree/main/Steam%20Group%20Mass%20Kicker
// @updateURL    https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Steam%20Group%20Mass%20Kicker/Steam%20Group%20Mass%20Kicker%20Script.user.js
// @downloadURL  https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Steam%20Group%20Mass%20Kicker/Steam%20Group%20Mass%20Kicker%20Script.user.js
// ==/UserScript==

//---------------------------------
//-- Scroll the window down by 205px
//---------------------------------
if(window.location.href.indexOf("membersManage") !==-1 ) {
    window.scrollBy(0,205)
}

//-------------------------------------------------------------------------------------
//-- Mark Sussy Profile Pages with specific about me sections that match these filters
//-------------------------------------------------------------------------------------
// Wait for the users profile about me section to load, then run the profile duplicate filter
waitForKeyElements(`.profile_summary`, checkprofile, 0);
// The filter that is run when the profile about me loads
function checkprofile() {
    if($('*:contains("𝓦𝒆𝓵𝓬𝓸𝓶𝒆 𝓽𝓸 𝓶𝔂 𝓹𝓻𝓸𝒇𝓲𝓵𝒆")').children().length > 0){MarkBotProfile();return;}
    else if($('*:contains("ᗯᕮᒪᑕOᗰᕮ TO ᗰY ᑭᖇOᖴIᒪᕮ ヅ")').children().length > 0){MarkBotProfile();return;}
    else if($('*:contains("website moderator")').children().length > 0){MarkBotProfile();return;}
    else if($('*:contains("lvl. Competitive: Expert Assassin 2")').children().length > 0){MarkBotProfile();return;}
    else if($('*:contains("★·.·´¯`·.·★ Thank you for visiting my profile! ★·.·´¯`·.·★")').children().length > 0){MarkBotProfile();return;}
    else if($('*:contains("[w̲̅][e̲̅][l̲̅][c̲̅][o̲̅][m̲̅][e̲̅] [t̲̅][o̲̅] [m̲̅][y̲̅] [p̲̅][r̲̅][o̲̅][f̲̅][i̲̅][l̲̅]")').children().length > 0){MarkBotProfile();return;}
    else if($('*:contains("•● W E L C O M E- T O -M Y -P R O F I L E ●•")').children().length > 0){MarkBotProfile();return;}
    else if($('*:contains("Whats ups, cutie, im litle absent-minded")').children().length > 0){MarkBotProfile();return;}
    else if($('*:contains("Thank you for visiting my profile.")').children().length > 0){MarkBotProfile();return;}
    else if($('*:contains("░█░█░█░█▀▀▀░█░░░░█▀▀▀░█▀▀█░█▀█▀█░█▀▀▀░")').children().length > 0){MarkBotProfile();return;}
    else if($('*:contains("csgo and tf2 gamer")').children().length > 0){MarkBotProfile();return;}
    else if($('*:contains("tf2 and csgo gamer")').children().length > 0){MarkBotProfile();return;}
    else if($('*:contains("Hello and welcome to my profile")').children().length > 0){MarkBotProfile();return;}
    else if($('*:contains("I\'m a 3d artist (now I\'m developing tf2 maps)")').children().length > 0){MarkBotProfile();return;}
    else if($('*:contains("Rust website manager")').children().length > 0){MarkBotProfile();return;}
    else if($('*:contains("TF2 HL AMATEUR COMPETITIVE PLAYER")').children().length > 0){MarkBotProfile();return;}
}
function MarkBotProfile() {
    $('body.profile_page, div.profile_page').attr('style', 'background-image: none; background-color: #460505; --gradient-left: none; --gradient-right: none; --gradient-background: #460505;')
    $('.profile_summary').attr('style', 'height: fit-content; overflow: visible; background: #2A475E; color: white; margin-left: -20px;margin-top: -25px;margin-right: -10px; padding: 10px; border: 5px solid rgba( 0, 0, 0, 0.2 );')
    var MARKPROFILEBOT = $('<div/>').attr('id', 'SUSWARNING').attr('style', 'margin: 9px 0px; font-size: x-large; background-color: #2A475E; border: 5px solid rgba( 0, 0, 0, 0.2 ); color: white; padding: 5px; text-align: center;').html('<span style="color:red; font-weight: 800;">Notice:</span> There are many profile summaries containing similarly duplicated text as this one.<br>Double Check that it is not just satire, mocking scammers/bots. ');
    $('#global_header').after(MARKPROFILEBOT);
}

//---------------------------------
//-- Hover to See Profile Previews
//---------------------------------
waitForKeyElements(`.playerAvatar > a`, HoverPreview, 0);
function HoverPreview(e) {
    var profilelink = $(e).attr('href');
    var varpreviewbox = $('<iframe/>').attr('data-src',profilelink).attr('class','previewbox');
    var parent = $(e).closest('.playerAvatar')
    $(varpreviewbox).insertBefore(parent);
    const PREVIEWBOX_CLASS = 'previewbox';
    const HIGHLIGHTED_CLASS = 'highlighted';
    var parentblock = $(e).closest('.member_block')
    $(parentblock).mouseover(function() {
        $(this).children(`.${PREVIEWBOX_CLASS}`).show();
        $(this).addClass(HIGHLIGHTED_CLASS);
        const $previewbox = $(this).children(`.${PREVIEWBOX_CLASS}`);
        const previewboxSrc = $previewbox.attr('data-src');
        $previewbox.attr('src', previewboxSrc);
    }).mouseout(function() {
        $(this).children(`.${PREVIEWBOX_CLASS}`).hide();
        $(this).removeClass(HIGHLIGHTED_CLASS);
        $(this).children(`.${PREVIEWBOX_CLASS}`).removeAttr('src');
    });
}
GM_addStyle(`
     .previewbox {display:none;border:1px solid black;position:fixed;width:40%;height:98%;z-index: 9000;top:0;right:0;}
     .highlighted {background-color: rgba( 84, 133, 183, 0.5);}
`);

//----------------------------------------------------------------------------------------
//-- Get the Group Name (Used to restrict the kick list created in a group to that group)
//----------------------------------------------------------------------------------------
const url = window.location.href
const pagepath = url.replace('https://steamcommunity.com','').replace(/membersManage.*$/g,'membersManage')

//---------------------------------------------------------------------------------------------------------------------------------------
//-- Create the empty kick list arrays and check if the kick list cookies exists on page load, if it does turn the cookies into an array
//---------------------------------------------------------------------------------------------------------------------------------------
var tempuserarray = [];
var tempusernames = [];
if($.cookie('KickThesePlayers') == undefined || $.cookie('KickThesePlayers') == ""){
} else {
    tempusernames = $.cookie('KickThesePlayers-Names').replace('%2C', ',').split(',');
    tempuserarray = $.cookie('KickThesePlayers').replace('%2C', ',').split(',');
}

//--------------------------------------
//-- Flush and recreate kick list array
//--------------------------------------
function createArrays() {
    tempuserarray = [];
    tempusernames = [];
    if($.cookie('KickThesePlayers') == undefined || $.cookie('KickThesePlayers') == ""){
    } else {
        tempusernames = $.cookie('KickThesePlayers-Names').replace('%2C', ',').split(',');
        tempuserarray = $.cookie('KickThesePlayers').replace('%2C', ',').split(',');
    }
}
//---------------------
//-- The Kick Menu CSS
//---------------------
GM_addStyle(`
    #KickUserCheckbox {margin-left: 5px;height: 25px;width: 25px;position: absolute;top: 10px;accent-color: #c30000;}
    #KickUserCheckbox:Hover {cursor: pointer;}
    #KickUserCheckbox:disabled {filter: invert(1);cursor: not-allowed;}
    .rank_icon {padding-right: 35px !important;}
    #kicklistlabel {border: solid #3e6787 2px; padding: 0px 5px;}
    #popuphome{margin: 0 auto;position: sticky;top: 30%;height: 0px;width: 20%;z-index: 50000;}
    #popup{display: grid;color: #ddebde;background: #0d121a;grid-template-columns: auto auto auto;border: solid 5px #3e6786;box-shadow: 0px -15px 60px 30px black;grid-gap: 2px;}
    #popupwarn{display: grid;position: relative;color: #e9684c;background: #0d121a;border: solid 5px #3e6786;border-bottom: none;grid-gap: 2px;z-index: 50000;padding: 5px;font-size: 16px;}
    .popupKickButton {height: 40px;width: 60px;color: white;background: #7a1717;border: black 1px solid;cursor: pointer;text-shadow: 1px 1px 3px black;margin-left: 30%;}
    .popupKickButton:hover {background: #d51717}
    .popupSaveButton {height: 40px;width: 60px;color: white;background: #3d7a17;border: black 1px solid;cursor: pointer;text-shadow: 1px 1px 3px black;}
    .popupSaveButton:hover {background: #3c9107}
    .popupCancelButton {height: 40px;color: white;background: #383838;border: black 1px solid;cursor: pointer;text-shadow: 1px 1px 3px black;}
    .popupCancelButton:hover {background: #7d6f6f;}
`);

//----------------------------------------------
//-- Creates the checkboxes to select users for kicking
//----------------------------------------------
waitForKeyElements(`.groupadmin_header_location`, CreateCheckboxes, 0);
function CreateCheckboxes() {
    $('.profilelink').each(function(index) {
        var ID = $(this).parents('.member_block').find('img[onclick*=ManageMembers_Kick]').attr('onclick').replace("ManageMembers_Kick( '", '').replace(/', '.*' \);/, "");
        $(this).attr('href', 'https://steamcommunity.com/profiles/' + ID)
        $(this).text(ID)
    })
    var checkbox = $('<input/>').attr({type: "checkbox",id: "KickUserCheckbox"});
    $('img[data-tooltip-text="Kick this member from the group"]').after(checkbox);
    $("input[id=KickUserCheckbox]").click(function() {if (!$(this).prop("checked")) {$("#CheckAllBox").prop("checked", false);}});
    var verifybox = $('<input/>').attr({type: "button",id: "VerifyUser",value: "Open Kick Menu"});
    $('.search_controls').after(verifybox);
    document.getElementById("VerifyUser").addEventListener("click", GetCheckedBoxes, false);
    var checkallboxs = $('<input/>').attr({type: "checkbox",id: "CheckAllBox",style: "margin-left: 5px"});
    $(verifybox).after(checkallboxs);
    $("#CheckAllBox").click(function() {$('input[id=KickUserCheckbox]:not([disabled="disabled"])').prop("checked", $(this).prop("checked"));});
    LoadSavedFilters()
}
//-------------------------
//-- Creates the kick menu
//-------------------------
function GetCheckedBoxes() {
    $('#KickUserCheckbox:checked:not([style="accent-color: green;"])').each(function(index) {
        var profile_url = $(this).parents('.member_block').find('img[onclick*=ManageMembers_Kick]').attr('onclick').replace("ManageMembers_Kick( '", '').replace(/', '.*' \);/, "");
        var profile_name = $(this).parents('.member_block').find('a.linkFriend').text();
        tempuserarray.push(profile_url);
        tempusernames.push(profile_name);
    });
    var CBBLA1 = $('<div/>').attr({type: "div",id: "popuphome"});var CBBLA = $('<div/>').attr({type: "div",id: "popup"});var CBBLA2 = $('<div/>').attr({type: "div",id: "popupwarn"});
    $(CBBLA1).insertBefore('div#global_header');$(CBBLA1).append(CBBLA);$(CBBLA).before(CBBLA2);
    var myDiv = document.getElementById("popup");
    for (var i = 0; i < tempuserarray.length; i++) {
        var label = document.createElement("label");
        label.id = "kicklistlabel";myDiv.appendChild(label);
        label.appendChild(document.createTextNode(tempuserarray[i]));
        label.setAttribute('profilelink','https://steamcommunity.com/profiles/' + tempuserarray[i] );
        MiniPreview(label, tempuserarray[i]);
    }
    // Define the kick menu buttons
    var ACBL = $('<button/>').attr({type: "button",id: "applyfiltersbutton",class: "popupKickButton"});var SFBL = $('<button/>').attr({type: "button",id: "savefiltersbutton",class: "popupSaveButton"});var CNBL = $('<button/>').attr({type: "button",id: "cancelfiltersbutton",class: "popupCancelButton"});var CLBL = $('<button/>').attr({type: "button",id: "clearfiltersbutton",class: "popupCancelButton"});
    // Create kick menu buttons
    $('#popuphome').append(ACBL);$(SFBL).insertAfter("#applyfiltersbutton");$(CNBL).insertAfter("#savefiltersbutton");$(CLBL).insertAfter("#cancelfiltersbutton");
    // Kick menu button text
    $("#applyfiltersbutton").text("Kick");$("#savefiltersbutton").text("Save");$("#cancelfiltersbutton").text("Cancel");$("#clearfiltersbutton").text("Clear");
    // Kick menu warning text
    $("#popupwarn").html("Ensure you didn't select anyone you don't want to kick. <br> Clicking save will save the currently selected users to the kick list, allowing you to select multiple users across multiple pages. <br><br> Hover over users in this list to preview them.<br>Click on their ID to remove them from the list.");
    // Kick menu button actions
    document.getElementById ("applyfiltersbutton").addEventListener ("click", savestartKick, false);document.getElementById ("savefiltersbutton").addEventListener ("click", SaveFilters, false);document.getElementById ("cancelfiltersbutton").addEventListener ("click", CancelKick, false);document.getElementById ("clearfiltersbutton").addEventListener ("click", ClearKick, false);
}


function MiniPreview(e, i) {
    var minilink = $(e).attr('profilelink');
    var minipreview = $('<iframe/>').attr('data-src',minilink).attr('class','minipreview').attr('id', i);
    $(minipreview).insertBefore(e);
    const MINIPREVIEWBOX_CLASS = 'minipreview';
    const MINIHIGHLIGHTED_CLASS = 'minihighlight';
    $(e).click(function() {
        RemoveSelectedUser(i)
        $(e).remove()
        $('#' + i).remove()
    })
    $(e).mouseover(function() {
        $(this).parents().find('#'+ i).show();
        $(this).addClass(MINIHIGHLIGHTED_CLASS);
        const $minipreviewbox = $(this).parents().find('#'+ i);
        const minipreviewboxSrc = $minipreviewbox.attr('data-src');
        $minipreviewbox.attr('src', minipreviewboxSrc);
    }).mouseout(function() {
        $(this).parents().find('#'+ i).hide();
        $(this).removeClass(MINIHIGHLIGHTED_CLASS);
        $(this).parents().find('#'+ i).removeAttr('src');
    });
}
GM_addStyle(`
     .minipreview {display:none;border:1px solid black;position:fixed;width:35%;height:90%;z-index: 9000;top:5%;margin-left:-36%}
     .minihighlight {background-color: rgba( 84, 133, 183, 0.5);}
`);

//-----------------------------------------------------------------------
//-- The action to remove users when clicked in the kick menu
//-----------------------------------------------------------------------
function RemoveSelectedUser(i) {
    var profile_url = $('img[onclick*=ManageMembers_Kick]:contains(' + i +')').parents('.member_block')
    var userID = tempuserarray.indexOf(i)
    tempuserarray.splice(userID, 1);
    tempusernames.splice(userID, 1);
}

//-----------------------------------------------------------------------
//-- Save the red checked users to the kick list and close the kick menu
//-----------------------------------------------------------------------
function SaveFilters() {
    $('#popuphome').remove();
    $.cookie('KickThesePlayers', tempuserarray, { domain: 'steamcommunity.com', path: pagepath });
    $.cookie('KickThesePlayers-Names', tempusernames, { domain: 'steamcommunity.com', path: pagepath });
    LoadSavedFilters()
}

//-----------------------------------------------------------------------------
//-- Close the kick menu without saving the red checked users to the kick list
//-----------------------------------------------------------------------------
function CancelKick() {
    createArrays()
    $('#popuphome').remove();
}

//----------------------------------------------------------
//-- Completely erase the kick list and close the kick menu
//----------------------------------------------------------
function ClearKick() {
    $('#popuphome').remove();
    $.removeCookie('KickThesePlayers', {domain: 'steamcommunity.com', path: pagepath });
    $.removeCookie('KickThesePlayers-Names', {domain: 'steamcommunity.com', path: pagepath });
    $('#KickUserCheckbox[style="accent-color: green;"]').removeAttr('style').removeAttr('disabled');
    $('#KickUserCheckbox:checked').click();
    createArrays()
}

//-----------------------------------------------------------------------------
//-- Save the current selected user kick list and start the startkick function
//-----------------------------------------------------------------------------
function savestartKick() {
    SaveFilters()
    startkick()
}

//----------------------------------------------------------------------------
//-- The function that goes through the list and kicks all the selected users
//----------------------------------------------------------------------------
function startkick() {
    if($.cookie('KickThesePlayers') == undefined) {return;}
    if($.cookie('KickThesePlayers') == "" ){
        $.removeCookie('KickThesePlayers', {domain: 'steamcommunity.com', path: pagepath });
        $.removeCookie('KickThesePlayers-Names', {domain: 'steamcommunity.com', path: pagepath });
        ShowBlockingWaitDialog("Players Kicked", '<span style="font-size: large;">' + 'Waiting for Steam To Process...');
        setTimeout(() => {location.reload();}, 2000);
    }
    if($.cookie('KickThesePlayers') !== "" ) {
        $('#popuphome').remove();
        var usernames = $.cookie('KickThesePlayers-Names').replace('%2C', ',').split(',');
        var shiftednamelist = usernames.shift();
        var userarray = $.cookie('KickThesePlayers').replace('%2C', ',').split(',');
        var shiftedkicklist = userarray.shift();
        console.log(shiftedkicklist);
        if($(".manageMemberAction[onclick*=" + shiftedkicklist + "]").length ) {
            $.post( g_strProcessURL, {"xml": 1, "action": "kick", "memberId": shiftedkicklist, "sessionID": g_sessionID} );
            $.cookie('KickThesePlayers', userarray, { domain: 'steamcommunity.com', path: pagepath });
            $.cookie('KickThesePlayers-Names', usernames, { domain: 'steamcommunity.com', path: pagepath });
            ShowBlockingWaitDialog("Kicking Players...", '<span style="font-size: large; text-align: center;">Kicking user: <span style="text-decoration: underline;text-underline-offset: 3px;">' + shiftednamelist + '</span><br>&emsp;&ensp;&nbsp; Steam ID: <span style="text-decoration: underline;text-underline-offset: 3px;">' + shiftedkicklist);
            setTimeout(() => {startkick()}, 250);
        }
    }
}

//----------------------------------------------------------------------------------
//-- Load the saved kick list and check if any users on the current page are marked
//----------------------------------------------------------------------------------
function LoadSavedFilters() {
    $('#KickUserCheckbox[style="accent-color: green;"]').removeAttr('style').removeAttr('disabled');
    $('#KickUserCheckbox:checked').click();
    if($.cookie('KickThesePlayers') == undefined || $.cookie('KickThesePlayers') == "") {return;}
    if($.cookie('KickThesePlayers') !== "" ) {
        $('.profilelink').each(function(index) {
            var savedarray = $.cookie('KickThesePlayers').replace('%2C', ',').split(',');
            var profileid = $(this).attr('href').replace('https://steamcommunity.com/profiles/', '')
            if (savedarray.includes(profileid)) {
                $(this).parents('.member_block').find('#KickUserCheckbox:not(:checked)').click();
                $(this).parents('.member_block').find('#KickUserCheckbox').attr({style: "accent-color: green;",disabled: "disabled"});
            }
        }
    )}
}
