// ==UserScript==
// @name         Steam Group Mass Kicker Script
// @version      4.4.3
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

//----------------------------------
//-- Mark Sussy Profile Pages with specific about me sections that match these filters
//----------------------------------
waitForKeyElements(`.profile_summary`, checkprofile, 0);
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
}
function MarkBotProfile() {
    $('body.profile_page, div.profile_page').attr('style', 'background-image: none; background-color: #460505; --gradient-left: none; --gradient-right: none; --gradient-background: #460505;')
    $('.profile_summary').attr('style', 'height: fit-content; overflow: visible; background: #2A475E; color: white; margin-left: -20px;margin-top: -25px;margin-right: -10px; padding: 10px; border: 5px solid rgba( 0, 0, 0, 0.2 );')
    var MARKPROFILEBOT = $('<div/>').attr('id', 'SUSWARNING').attr('style', 'margin: 9px 0px; font-size: x-large; background-color: #2A475E; border: 5px solid rgba( 0, 0, 0, 0.2 ); color: white; padding: 5px; text-align: center;').html('<span style="color:red; font-weight: 800;">Notice:</span> This profile contains text that is shared with known scammer profiles.<br>Double Check that it is not just satire, mocking said scammers/bots. ');
    $('#global_header').after(MARKPROFILEBOT);
}

//----------------------------------
//-- Hover to See Profile Previews
//----------------------------------
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
     .previewbox {
          display:none;
          border:1px solid black;
          position:fixed;
          width:40%;
          height:98%;
          z-index: 9000;
          top:0;
          right:0;
     }
     .highlighted {
          background-color: rgba( 84, 133, 183, 0.5);
     }
`);

//----------------------------------
//-- The Checkboxes and Kicking part of the script
//----------------------------------
GM_addStyle(`
    #KickUserCheckbox {margin-left: 5px;height: 25px;width: 25px;position: absolute;top: 10px;}
    #KickUserCheckbox:Hover {cursor: pointer;}
    .rank_icon {padding-right: 35px !important;}
    #kicklistlabel {border: solid #3e6787 2px; padding: 0px 5px;}
    #popuphome{margin: 0 auto;position: sticky;top: 30%;height: 0px;width: fit-content;z-index: 50000;}
    #popup{display: grid;color: #ddebde;background: #0d121a;grid-template-columns: auto auto auto;border: solid 5px #3e6786;box-shadow: 0px -15px 60px 30px black;grid-gap: 2px;}
    #popupwarn{display: grid;position: relative;color: #e9684c;background: #0d121a;border: solid 5px #3e6786;border-bottom: none;grid-gap: 2px;z-index: 50000;padding: 5px;font-size: 16px;}
    .popupKickButton {height: 40px;width: 60px;color: white;background: #7a1717;border: black 1px solid;cursor: pointer;text-shadow: 1px 1px 3px black;margin-left: 40%;}
    .popupKickButton:hover {background: #d51717}
    .popupCancelButton {height: 40px;color: white;background: #383838;border: black 1px solid;cursor: pointer;text-shadow: 1px 1px 3px black;}
    .popupCancelButton:hover {background: #7d6f6f;}
`);
waitForKeyElements(`.groupadmin_header_location`, CreateCheckboxes, 0);
function CreateCheckboxes() {
    window.scrollBy(0,205)
    var checkbox = $('<input/>').attr({type: "checkbox",id: "KickUserCheckbox"});
    $('img[data-tooltip-text="Kick this member from the group"]').after(checkbox);
    $("input[id=KickUserCheckbox]").click(function() {if (!$(this).prop("checked")) {$("#CheckAllBox").prop("checked", false);}});
    var verifybox = $('<input/>').attr({type: "button",id: "VerifyUser",value: "Kick Marked Users"});
    $('.search_controls').after(verifybox);
    document.getElementById("VerifyUser").addEventListener("click", GetCheckedBoxes, false);
    var checkallboxs = $('<input/>').attr({type: "checkbox",id: "CheckAllBox",style: "margin-left: 5px"});
    $(verifybox).after(checkallboxs);
    $("#CheckAllBox").click(function() {$("input[id=KickUserCheckbox]").prop("checked", $(this).prop("checked"));});
}
function GetCheckedBoxes() {
    var userarray = [];
    var usernames = [];
    $('#KickUserCheckbox:checked').each(function(index) {
        var profile_url = $(this).parents('.member_block').find('img[onclick*=ManageMembers_Kick]').attr('onclick').replace("ManageMembers_Kick( '", '').replace(/', '.*' \);/, "");
        var profile_name = $(this).parents('.member_block').find('a.linkFriend').text();
        userarray.push(profile_url);
        usernames.push(profile_name);
        $.cookie('KickThesePlayers', userarray, { domain: '.steamcommunity.com', path: '/' });
        $.cookie('KickThesePlayers-Names', usernames, { domain: '.steamcommunity.com', path: '/' });
    });
    var CBBLA1 = $('<div/>').attr({type: "div",id: "popuphome"});
    var CBBLA = $('<div/>').attr({type: "div",id: "popup"});
    var CBBLA2 = $('<div/>').attr({type: "div",id: "popupwarn"});
    $(CBBLA1).insertBefore('div#global_header');
    $(CBBLA1).append(CBBLA);
    $(CBBLA).before(CBBLA2);
    var myDiv = document.getElementById("popup");
    for (var i = 0; i < usernames.length; i++) {var label = document.createElement("label");label.id = "kicklistlabel";myDiv.appendChild(label);label.appendChild(document.createTextNode(usernames[i]));}
    var ACBL = $('<button/>').attr({type: "button",id: "applyfiltersbutton",class: "popupKickButton"});
    var CNBL = $('<button/>').attr({type: "button",id: "cancelfiltersbutton",class: "popupCancelButton"});
    $('#popuphome').append(ACBL);
    $(CNBL).insertAfter("#applyfiltersbutton");
    $("#applyfiltersbutton").text("Kick");
    $("#cancelfiltersbutton").text("Cancel");
    $("#popupwarn").html("Make sure you want to kick these users. <br> If you made a mistake click cancel and change the check boxes and click verify again.");
    document.getElementById ("applyfiltersbutton").addEventListener ("click", startkick, false);
    document.getElementById ("cancelfiltersbutton").addEventListener ("click", CancelKick, false);
}
function CancelKick(){
    $('#popuphome').remove();
    $.removeCookie('KickThesePlayers', {domain: '.steamcommunity.com', path: '/'});
    $.removeCookie('KickThesePlayers-Names', {domain: '.steamcommunity.com', path: '/'});
}
function startkick() {
    if($.cookie('KickThesePlayers') == undefined) {return;}
    if($.cookie('KickThesePlayers') == "" ){
        $.removeCookie('KickThesePlayers', {domain: '.steamcommunity.com', path: '/'});
        $.removeCookie('KickThesePlayers-Names', {domain: '.steamcommunity.com', path: '/'});
        ShowBlockingWaitDialog("Players Kicked", '<span style="font-size: large;">' + 'Waiting for Steam To Process...');
        setTimeout(() => {location.reload();}, 2000);
    }
    if($.cookie('KickThesePlayers') !== "" ) {
        $('#popuphome').remove();
        var usernames = $.cookie('KickThesePlayers-Names').replace('%2C', ',').split(',');
        var shiftednamelist = usernames.shift();
        var userarray = $.cookie('KickThesePlayers').replace('%2C', ',').split(',');
        var shiftedkicklist = userarray.shift();
        if($(".manageMemberAction[onclick*=" + shiftedkicklist + "]").length ) {
            $.post( g_strProcessURL, {"xml": 1, "action": "kick", "memberId": shiftedkicklist, "sessionID": g_sessionID} );
            $.cookie('KickThesePlayers', userarray, { domain: '.steamcommunity.com', path: '/' });
            $.cookie('KickThesePlayers-Names', usernames, { domain: '.steamcommunity.com', path: '/' });
            ShowBlockingWaitDialog("Kicking Players...", '<span style="font-size: large; text-align: center;">Kicking user: <span style="text-decoration: underline;text-underline-offset: 3px;">' + shiftednamelist + '</span><br>&emsp;&ensp;&nbsp; Steam ID: <span style="text-decoration: underline;text-underline-offset: 3px;">' + shiftedkicklist);
            setTimeout(() => {startkick()}, 250);
        }
    }
}
