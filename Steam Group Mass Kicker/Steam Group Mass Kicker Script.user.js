// ==UserScript==
// @name         Steam Group Mass Kicker Script
// @version      1.0.5
// @author       GentlePuppet
// @include      https://steamcommunity.com/groups/*
// @run-at       document-body
// @grant        GM_addStyle
// @require      https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require      https://raw.githubusercontent.com/carhartl/jquery-cookie/v1.4.1/jquery.cookie.js
// @icon         https://www.google.com/s2/favicons?domain=steamcommunity.com
// @updateURL    https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Steam%20Group%20Mass%20Kicker/Steam%20Group%20Mass%20Kicker%20Script.user.js
// @downloadURL  https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Steam%20Group%20Mass%20Kicker/Steam%20Group%20Mass%20Kicker%20Script.user.js
// ==/UserScript==
//console.log('SGMKS Debug: Steam Group Mass Kicker Script Loaded');
GM_addStyle(`
    #kicklistlabel {border: solid #3e6787 2px; padding: 0px 5px;}
    #popuphome{margin: 0 auto;position: sticky;top: 30%;height: 0px;width: fit-content;z-index: 50000;}
    #popup{display: grid;color: #ddebde;background: #0d121a;grid-template-columns: auto auto auto;border: solid 5px #3e6786;box-shadow: 0px -15px 60px 30px black;grid-gap: 2px;}
    #popupwarn{display: grid;position: relative;color: #e9684c;background: #0d121a;border: solid 5px #3e6786;border-bottom: none;grid-gap: 2px;z-index: 50000;padding: 5px;font-size: 16px;}
    .popupKickButton {height: 40px;width: 60px;color: white;background: #7a1717;border: black 1px solid;cursor: pointer;text-shadow: 1px 1px 3px black;margin-left: 40%;}
    .popupKickButton:hover {height: 40px;width: 60px;color: white;background: #d51717;border: black 1px solid;cursor: pointer;text-shadow: 1px 1px 3px black;margin-left: 40%;}
    .popupCancelButton {height: 40px;color: white;background: #383838;border: black 1px solid;cursor: pointer;text-shadow: 1px 1px 3px black;}
    .popupCancelButton:hover {height: 40px;color: white;background: #7d6f6f;border: black 1px solid;cursor: pointer;text-shadow: 1px 1px 3px black;}
`);
waitForKeyElements (`.groupadmin_header_location`, CreateCheckboxes, 0);
function CreateCheckboxes() {
    //console.log('SGMKS Debug: Checkboxes Created');
    var checkbox = $('<input/>').attr({type: "checkbox",id: "KickUserCheckbox",style: "margin-left: 5px"});
    $('img[data-tooltip-text="Kick this member from the group"]').after(checkbox);
    $("input[id=KickUserCheckbox]").click(function() {
        if (!$(this).prop("checked")) {
            $("#CheckAllBox").prop("checked", false);
        }
    });
    var verifybox = $('<input/>').attr({type: "button",id: "VerifyUser",value: "Verify"});
    $('.search_controls').after(verifybox);
    document.getElementById("VerifyUser").addEventListener("click", GetCheckedBoxes, false);
    var checkallboxs = $('<input/>').attr({type: "checkbox",id: "CheckAllBox",style: "margin-left: 5px"});
    $(verifybox).after(checkallboxs);
    $("#CheckAllBox").click(function() {
        $("input[id=KickUserCheckbox]").prop("checked", $(this).prop("checked"));
    });
}
function GetCheckedBoxes() {
    //console.log('SGMKS Debug: Verify Users Popup Created');
    var userarray = [];
    var usernames = [];
    var useravatar = [];
    $('#KickUserCheckbox:checked').each(function(index) {
        var profile_url = $(this).parents('.member_block').find('img.manageMemberAction').attr('onclick').replace("ManageMembers_Kick( '", '').replace(/', '.*' \);/, "");
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
    //console.log('SGMKS Debug: Kick Canceled Deleting Kick List');
}
waitForKeyElements (`#memberManageList`, startkick, 0);
function startkick() {
    //console.log('SGMKS Debug: function startkick');
    if($.cookie('KickThesePlayers') == undefined) {
        //console.log('SGMKS Debug: No Kick List Created');
        return;
    }
    if($.cookie('KickThesePlayers') == "" ){
        $.removeCookie('KickThesePlayers', {domain: '.steamcommunity.com', path: '/'});
        $.removeCookie('KickThesePlayers-Names', {domain: '.steamcommunity.com', path: '/'});
        alert('Kick Script Finished')
        //console.log('SGMKS Debug: Kick list Finished');
    }
    if($.cookie('KickThesePlayers') !== "" ) {
        var usernames = $.cookie('KickThesePlayers-Names').replace('%2C', ',').split(',');
        var shiftednamelist = usernames.shift();
        var userarray = $.cookie('KickThesePlayers').replace('%2C', ',').split(',');
        var shiftedkicklist = userarray.shift();
        if($(".manageMemberAction[onclick*=" + shiftedkicklist + "]").length ) {
            var form = document.forms['kick_form'];
            form.elements['memberId'].value = shiftedkicklist;
            form.submit();
            $.cookie('KickThesePlayers', userarray, { domain: '.steamcommunity.com', path: '/' });
            $.cookie('KickThesePlayers-Names', usernames, { domain: '.steamcommunity.com', path: '/' });
            console.log('SGMKS Debug: Kicking User ' + shiftednamelist);
        }
    }
}