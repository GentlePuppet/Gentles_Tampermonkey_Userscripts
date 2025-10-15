// ==UserScript==
// @name         Steam Group Mass Kicker Script
// @version      8.2
// @author       GentlePuppet
// @description	 Mass Kick Users From Steam Yer Group
// @match        https://steamcommunity.com/groups/*
// @match        https://steamcommunity.com/profiles/*
// @match        https://steamcommunity.com/id/*
// @run-at       document-body
// @grant        GM_addStyle
// @grant        unsafeWindow
//
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require      https://raw.githubusercontent.com/carhartl/jquery-cookie/v1.4.1/jquery.cookie.js
// @require      http://github.com/bartaz/sandbox.js/raw/master/jquery.highlight.js
//
// @icon         https://store.cloudflare.steamstatic.com/public/images/v6/icon_platform_linux.png
// @source       https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/tree/main/Steam%20Group%20Mass%20Kicker
// @updateURL    https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Steam%20Group%20Mass%20Kicker/Steam%20Group%20Mass%20Kicker%20Script.user.js
// @downloadURL  https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Steam%20Group%20Mass%20Kicker/Steam%20Group%20Mass%20Kicker%20Script.user.js
// ==/UserScript==

//--------------------------
//-- Customizable Settings
//--------------------------
// Keep the hovered profile previews loaded in the background?
const keeploaded = false


//--------------------------------------------------------------
//-- Common phrases found on scammer or bot profiles summaries
//--------------------------------------------------------------
const textChecks = [
    "𝓦𝒆𝓵𝓬𝓸𝓶𝒆 𝓽𝓸 𝓶𝔂 𝓹𝓻𝓸𝒇𝓲𝓵𝒆",
    "ᗯᕮᒪᑕOᗰᕮ TO ᗰY ᑭᖇOᖴIᒪᕮ ヅ",
    "★Welcome to my profile★",
    "💗 Welcome to my profile! 💗",
    "💗 Glad to see you! 💗",
    "website moderator",
    "Wᴏʀᴋᴇʀ / Gᴀᴍᴇʀ / Website moderator",
    "lvl. Competitive: Expert Assassin 2",
    "★·.·´¯`·.·★ Thank you for visiting my profile! ★·.·´¯`·.·★",
    "[w̲̅][e̲̅][l̲̅][c̲̅][o̲̅][m̲̅][e̲̅] [t̲̅][o̲̅] [m̲̅][y̲̅] [p̲̅][r̲̅][o̲̅][f̲̅][i̲̅][l̲̅]",
    "•● W E L C O M E- T O -M Y -P R O F I L E ●•",
    "Whats ups, cutie, im litle absent-minded",
    "Thank you for visiting my profile.",
    "█░█░█░█▀▀▀░█░░░░█▀▀▀░█▀▀█░█▀█▀█░█▀▀▀",
    "█░█░█░█▀▀▀░█░░░░█░░░░█░░█░█░█░█░█▀▀▀",
    "▀▀▀▀▀░▀▀▀▀░▀▀▀▀░▀▀▀▀░▀▀▀▀░▀░▀░▀░▀▀▀▀",
    "●▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬๑۩۞۩๑.▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬●",
    "csgo and tf2 gamer",
    "tf2 and csgo gamer",
    "Hello and welcome to my profile",
    "I'm a 3d artist (now I'm developing tf2 maps)",
    "Rust website manager",
    "TF2 HL AMATEUR COMPETITIVE PLAYER",
    "Creative Graphic Designer, Illustrator, Motion Graphics, and Video Editing",
    "content creator and tf2 lover",
    "Glad to see you! Content creator and tf2 lover",
    "✦ 𝒉𝒂𝒗𝒆 𝒂 𝒈𝒓𝒆𝒂𝒕 𝒅𝒂𝒚 ✦",
    "Welcome to my profile. Add me to friends. Let's play together."
];


//---------------------------
//-- The CSS for everything
//---------------------------
GM_addStyle(`
/* Quick Search Filter Box */
    #FilterQuickBox {position: fixed;top: 20%;width: 300px;background: #1b2838;color: #fff;border: 2px solid #3e6787;z-index: 99999;font-size: 12px;padding: 5px;opacity: 0.8;transition: transform 0.2s ease-in-out, opacity 0.2s;transform: translateX(-315px);}
    #FilterQuickBox:hover {transform: translateX(0);opacity: 1;}
    #FilterQuickBoxDesc {font-size: 11px;color: #ccc;margin-bottom: 5px;line-height: 1.3;text-align: center;padding: 3px;background: #080f18;}
    .filterLink {display: block;padding: 3px;color: #66c0f4;text-decoration: none;word-wrap: break-word;}
    .filterLink:nth-child(odd) {background: #111d2d;}
    .filterLink:hover {background: #2a475e !important;text-decoration: underline;}
    #FilterQuickBoxTab {position: absolute;right: -25px;top: 0;width: 18px;writing-mode: vertical-rl;text-orientation: mixed;text-align: center;background: #0d121a;border: 1px solid #3e6787;padding: 5px 2px;cursor: pointer;font-weight: bold;}

/* Memberblock Profile Preview */
    .previewbox {display:none;border:1px solid black;position:fixed;width:40%;height:98%;z-index:9000;top:0;right:0;}
    .highlighted {background-color:rgba(84,133,183,0.5);}

/* Kickbox */
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

/* Kickbox Mini Profile Previews */
     .minipreview {display:none;border:1px solid black;position:fixed;width:35%;height:90%;z-index: 9000;top:5%;margin-left:-36%}
     .minihighlight {background-color: rgba( 84, 133, 183, 0.5);}

/* Highlighted Text */
     .highlight {background-color: yellow;color: black;font-weight: bold;padding: 0 2px;}

/* Friend Icon */
     .member_block .friend_icon img {filter: drop-shadow(0px 0px 2px black);}
`);


//------------------------------------------------------------------------------------------
//-- Get the Group Name (Used to restrict the kick list created in a group to that group)
//------------------------------------------------------------------------------------------
const url = window.location.href
const pagepath = url.replace('https://steamcommunity.com','').replace(/membersManage.*$/g,'membersManage')


//--------------------------------------------------------------------------------------
//-- Mark Sussy Profile Pages with specific about me sections that match these filters
//--------------------------------------------------------------------------------------
// Wait for the users profile about me section to load, then run the profile duplicate filter
waitForKeyElements('.profile_summary', checkProfile, 0);
// Wait for the users [Custom Info Box] section to load, then run the profile duplicate filter
waitForKeyElements('.showcase_notes', checkProfile, 0);
function checkProfile(node) {
    const aboutSection = $(node);
    const aboutText = aboutSection.text();
    let found = false;

    for (const text of textChecks) {
        if (aboutText.includes(text)) {
            aboutSection.highlight(text);
            found = true;
        }
    }

    if (found) {
        MarkBotProfile();

        // Find the nearest [Custom Info Box] parent and move it to the top of the profile for easy viewing
        const customization = aboutSection.closest('.profile_customization');
        const area = customization.closest('.profile_customization_area');

        if (area.length && customization.length) {
            area.prepend(customization);
        }
    }
}

function MarkBotProfile() {
    // If SUSWARNING already exists, do nothing
    if ($('#SUSWARNING').length) return;

    $('body.profile_page, div.profile_page').attr('style', 'background-image: none; background-color: #460505; --gradient-left: none; --gradient-right: none; --gradient-background: #460505;')
    $('.profile_header_summary').attr('style', 'height: fit-content; overflow: visible; background: #2A475E; color: white; margin-left: -20px;margin-top: -25px;margin-right: -10px; padding: 10px; border: 5px solid rgba( 0, 0, 0, 0.2 );')

    var MARKPROFILEBOT = $('<div/>')
        .attr('id', 'SUSWARNING')
        .attr('style', 'margin: 9px 0px; font-size: x-large; background-color: #2A475E; border: 5px solid rgba( 0, 0, 0, 0.2 ); color: white; padding: 5px; text-align: center;')
        .html('<span style="color:red; font-weight: 800;">Notice:</span> There are many profile summaries containing similarly duplicated text as this one.<br>Verify that it is not just satire or mocking scammers/bots.');

    $('#global_header').after(MARKPROFILEBOT);
}


//-----------------------------
// Mark profiles in the group
//-----------------------------
waitForKeyElements('.friendSmallText:contains("You!"), .friendSmallText:contains("Owner - no managing!"), .member_block .rank_icon img[src*="rankIconOfficer.gif"], .member_block .rank_icon img[src*="rankIconModerator.gif"]', HighlightBlock, 0);
function HighlightBlock(node) {
    let $node = $(node);
    let $block = $node.closest('.member_block');
    let html = $node.html();

    if (html.includes('Owner - no managing!') || $node.is('img[src*="rankIconOfficer"]')) {
        $node.html(html.replace(/Owner - no managing!<br>/, ''));
        $block.css({
            'background': 'linear-gradient(90deg, rgb(113 55 55), rgb(113 55 55))',
            'box-shadow': 'rgb(255 0 0) 0px 0px 5px'
        });
    }

    if ($node.is('img[src*="rankIconModerator"]')) {
        let $officerBlock = $node.closest('.member_block');
        $officerBlock.css({
            'background': 'linear-gradient(90deg, rgb(35 116 187), rgb(77 112 179))',
            'box-shadow': 'rgb(0 142 247) 0px 0px 5px'
        });
    }

    if (html.includes('You!')) {
        $node.html(html.replace(/You!<br>/, ''));
        $block.css({
            'background': 'linear-gradient(90deg, rgb(16 107 23), rgb(9 89 23))',
            'box-shadow': 'rgb(20 253 104) 0px 0px 5px'
        });
    }
}


//---------------------------------
// Create the floating filter box
//---------------------------------
waitForKeyElements('[onsubmit*=validateSearchManageMembers]', CreateQuickSearch, 0);
function CreateQuickSearch() {
    if ($('#FilterQuickBox').length) return;

    var filterBox = $('<div/>').attr('id', 'FilterQuickBox');

    // Small tab for hovering
    var headerTab = $('<div/>')
        .attr('id', 'FilterQuickBoxTab')
        .text('Quick Search Filters');

    var description = $('<div/>')
        .attr('id', 'FilterQuickBoxDesc')
        .html('These are common phrases found on suspicious profiles.<br>Click one to search the group for them.');

    filterBox.append(headerTab);
    filterBox.append(description);

    textChecks.forEach(function (txt) {
        var searchUrl = pagepath + '?searchKey=' + encodeURIComponent(txt);
        var link = $('<a/>')
            .attr('href', searchUrl)
            .attr('target', '_self')
            .addClass('filterLink')
            .text(txt);

        filterBox.append(link);
    });

    $('body').append(filterBox);
}


//----------------------------------
//-- Hover to See Profile Previews
//----------------------------------
waitForKeyElements(`.playerAvatar > a`, HoverPreview, 0);
function HoverPreview(e) {
    const HOVER_DELAY = 1000;
    const PREVIEWBOX_CLASS = 'previewbox';
    const HIGHLIGHTED_CLASS = 'highlighted';
    const LOADED_CLASS = 'loaded';

    let profilelink = $(e).attr('href');
    let varpreviewbox = $('<iframe/>')
        .attr('data-src', profilelink)
        .attr('class', PREVIEWBOX_CLASS);

    let parent = $(e).closest('.playerAvatar');
    $(varpreviewbox).insertBefore(parent);

    let parentblock = $(e).closest('.member_block');
    let hoverTimer = null;

    $(parentblock).on('mouseenter', function () {
        const $block = $(this);
        hoverTimer = setTimeout(() => {
            $block.children(`.${PREVIEWBOX_CLASS}`).show();
            $block.addClass(HIGHLIGHTED_CLASS);

            const $previewbox = $block.children(`.${PREVIEWBOX_CLASS}`);
            const previewboxSrc = $previewbox.attr('data-src');

            if (!$block.hasClass(LOADED_CLASS)) {
                $previewbox.attr('src', previewboxSrc);
                if (keeploaded === true) {
                    $block.addClass(LOADED_CLASS);
                }
            }
        }, HOVER_DELAY);
    }).on('mouseleave', function () {
        clearTimeout(hoverTimer); // Cancel load if user leaves early
        $(this).children(`.${PREVIEWBOX_CLASS}`).hide();
        $(this).removeClass(HIGHLIGHTED_CLASS);

        if (keeploaded === false) {
            $(this).children(`.${PREVIEWBOX_CLASS}`).removeAttr('src');
        }
    });
}


//----------------------------------------------------------------------------------------------------------------------------------------
//-- Create the empty kick list arrays and check if the kick list cookies exists on page load, if it does turn the cookies into an array
//----------------------------------------------------------------------------------------------------------------------------------------
var tempuserarray = [];
var tempusernames = [];
if($.cookie('KickThesePlayers') == undefined || $.cookie('KickThesePlayers') == ""){
} else {
    tempusernames = $.cookie('KickThesePlayers-Names').replace('%2C', ',').split(',');
    tempuserarray = $.cookie('KickThesePlayers').replace('%2C', ',').split(',');
}


//---------------------------------------
//-- Flush and recreate kick list array
//---------------------------------------
function createArrays() {
    tempuserarray = [];
    tempusernames = [];
    if($.cookie('KickThesePlayers') == undefined || $.cookie('KickThesePlayers') == ""){
    } else {
        tempusernames = $.cookie('KickThesePlayers-Names').replace('%2C', ',').split(',');
        tempuserarray = $.cookie('KickThesePlayers').replace('%2C', ',').split(',');
    }
}


//-------------------------------------------------------
//-- Creates the checkboxes to select users for kicking
//-------------------------------------------------------
waitForKeyElements('.group_admin_header', CreateCheckboxes, 0);
function CreateCheckboxes() {
    $('.profilelink').each(function(index) {
        var block = $(this).parents('.member_block').find('img[onclick*=ManageMembers_Kick]').attr('onclick')
        if (block == undefined) {return};
        var ID = block.replace("ManageMembers_Kick( '", '').replace(/', '.*' \);/, "");
        $(this).attr('href', 'https://steamcommunity.com/profiles/' + ID)
        $(this).text(ID)
    })

    var checkbox = $('<input/>').attr({type: "checkbox",id: "KickUserCheckbox"});
    $('img[data-tooltip-text="Kick this member from the group"]').after(checkbox);
    $("input[id=KickUserCheckbox]").click(function() {if (!$(this).prop("checked")) {$("#CheckAllBox").prop("checked", false);}});

    var verifybox = $('<input/>').attr({type: "button", id: "VerifyUser", value: "Open Kick Menu"});
    $('.search_controls').after(verifybox);
    document.getElementById("VerifyUser").addEventListener("click", GetCheckedBoxes, false);

    var checkallboxs = $('<input/>').attr({type: "checkbox",id: "CheckAllBox",style: "margin-left: 5px"});
    $(verifybox).after(checkallboxs);
    $("#CheckAllBox").click(function() {$('input[id=KickUserCheckbox]:not([disabled="disabled"])').prop("checked", $(this).prop("checked"));});
    LoadSavedFilters()
}


//--------------------------
//-- Creates the kick menu
//--------------------------
function GetCheckedBoxes() {
    // Avoid opening the menu more than once
    if ($('#popuphome').length) {
        $('#popuphome').fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        try {
            // Converted sound: https://www.myinstants.com/en/instant/windows-10-error-97483
            // To base64 with:  https://base64.guru/converter/encode/audio
            const beep = new Audio("data:audio/wav;base64,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A2AG4QE1N///ku3//6FOf////8ioyHMT//9CAAu1tgBPSuKtxvYydVNjtZYjNJkQQQGnXIvKZi/YNFs0//uSRA+AAwphVWnoa9xfbFqtPNKTjCGHOU0+bxGAMWi1l6nyxxQsDKYaE4jDp5ViuCgWrXx/Ul3/X/iZiwCKDDD1C5j4Sg9y6f//6mSrW///7Or///2T+nJMvAMwAGhFQQ///UiX73aAJdMcJBJqqdSVl47TqRJKcHaERX3Ids/UpA8axC4MvJLbCd/JjhJ59NEpdJ/+5QLpqyv//QY+DWg8Jwrz1v//WjSWm/////////LheGdCVgjA4VTMtf/+syMhxnzxOgBHKAsRf/MtwS7DBYs7TcQvkOyZXU9IoQNsVaw1IJb14ChxfO90sw4/UxSmUllfHaZDmpEcLmW3+ofmWklV//rpCgmt///+XEv//////7/qSOEVCVgpAgSi8k///zpCu7FQAnJ9mqFP5OTksY099xubBK6WgSzAl90QcxRIw4VTutyQT4m81dFutXSJLmytt8armz5zQAdsbf/krA3DTFrYhZ/7frwYGn///+hZ/////////xHEwXTW//+pGDcTsgogAAEqIQwB3Wdlx0Ly1xcGGmHICTEKYOykkP/7kmQNgQNdYctrj1PEU+w5/WXqeI69hyNO4m5JGyrpNPS2SnCJE0CkIzqbVBmEEWQ5xtDDT3FpmPJKOt7R+KSl3qAR7Qm807nfdBbOMAWC/JpALb/Vuu+ocBJk///+glCLL////////64IgxFCGv//+VQcWJWwAi33WIAf/Gcl5Z1blvGH5gZDPUR+7EWBX0LN88X1cbOLesX19m9v4JCb8Fx2T2NPLwnlvzHxbBRo36//ChL////51v////////lCB1P///qhcIQABzD3nNw2zBMBgb4NbMBAGMQT9O8yUMRwJMEACMKSFNzSuMMQNAIxcCOEbmGiiBG6po8W17CPhUEDYiZPmSKthCB00VdZkyxQo310jZ/ovq+mYgL0Elq/7//6RBH////////0lmQigeiMicJg///+WSIF1ILnAA7p9QgEv8QYqdWYzCfuBTQ0K4TLJ9p1YzAKkNyK+nsRolh7AMK5o6CX0w8v/4+nv///Pm3/////////////nCYkr/rGVQgABPeQQA7z6Wu4hMAVrK5L2iMRCLjmtIgBA2D/+5JkDgADxWLI05hrwEHMOl0J6izQJY0a73ItQQiVqTQHtDpQYYeSZ8JYBwlZEPdL0y6q8BsDYt18L/bjTsN1kTVdxjB5Zdvn3MgToKRaKLVplE8sRkJadOFlVszVVdfUwHiGQ3/9X/+mZt////////tWCWE3HIpNL//9AYEjn1C24AR1t8OhPQSoRQtShNXsIbusLmv7Ys28iAo6u+fyRv/d/+g4M6j4t//9AFS////+Rmf////////kSH3///yxKwQAUMAAC/21Mxx2UPU7lFQEAaGAnGFIHmawANxMIqYFYDZjqQH9smYeFRgwGEyKGhm0yC1lDRbebuN2/3cO2c6VD5JpoMkeLmH12WUwyceFeaJHzORhWrLhqv6zNTetJRDgP4F5////rMG////////r0wwgF6xzVEQt//6zIxKTnWEuhATt+8UBdM3XQxzwjSddK3foFxqjyvnAnbqZd1jgfC/jo6JfN6+4fSG/nHfFwpVmLfr/9RSP//xL////xS7/sPoIBLqBoGvwxxd8WA9pj5ofCMITEBmjjpDTB4GC//uSZA4AA3RhyDurbMJIrDo9Be0ejtmHIU7uTElKMOh0DEA6qApgqOhwGGIcKyZa406nZrNHT2rxEVvv7OmXDa+Kx9A4Hlb/0mVYVDBNQ1Nb1aJTXr17hfAlUE/+v//QTb9lVbbf/t///2sFuEBHht//+VG5YlEsyALl9wdBeWGwHnZIoZYYBCPkjAmtKOc/23kGzU7MsRtPBYi+yQ2n3vrCSEk//Ih////xBRu////1If////////qVpf//5ukOAAIyqCAH55VnbZMHAM0FdRf4EAuYhtAcjm2YVgYHAAYXMnL2wCD2RhxSixL3WFNPLepNAoHnUKDI8nUi0taSVRHCQkjp6zhOoLHLGIssFMwQ0aB1S1+vOgJ4YlT/6f/+cLjf///////74tArc1l1///qTJ4rtCyUAJye6SBOCpvr4qjpHdrZpKDyaLcPDd5PE5+mxSUDk0dNT5BD9YfMV1qFzIPVoDnq+vUocsl9/8/+vOicht////6l/////////lA5W3//+boVDjYATs8sUCX/l7ztVbgwN6G+nEiwPyaHSP/7kmQMiAMJVc7rTFWkUGq6HWFtlIrdhzusvU2RTDDoNZW2LqKkUGQQJUf3KvBTP7VmvZpqnqN28aiCgORlICJ8w2hfQliWbzuU+7GbVTtJbvP62e03NC9DT////KFf///////+2MhXLK/6ywllAAcnurgT/7F+WLTV87KVSHKqOgBy8sE70J1PnRXv5Hl12m8uvM44ErlzpSdhvWfGN/6hCjrr/rL3/WDdGX////0v////////zhJJCn/WgBGvStMJf+rFdpKMDO4q3GSEtplmSXRdALNLGkq6eU8tuGVPB+TM/uP9YzOdWs/eLKUeia1KW5AQqceGA7Vk/p/0DINf///90/////////Fw/Mr///ViwttQDcdeZAB/5dGq8hLkLZeJK6QgFMj3g/3ZKSJxeEcf3Jtgtdtzvp1qjvGVPfz3ysaf/8oU42uobN6tX/qJgpf////////////+PxSXT///rPJqEbgAajzrBAH/rPsRaD7os5rECx+E702HXbKLWfBJJq2ca9D3m3QvCF3a0LaN1bDZQLsfN0Q8x4PDtUb/+5JkHYAChVXQaw9TXFJqqf1lZ3mKLVdJp5mysUqq6HQMtDrndv/IS3///+q/////////kAN5v/zAlTABVVdgAA/7F+LOw5lHFXhoB2EzxqfFFwRA3DgyI9XAeaPO44LbrD4DE04/ehaEa7OtD2lA6hpN1Qi8wv5ypoBou/////////////8UAOf/6BvuAY9NdUgT/pVEJHmHSdw4iC9Egiac+Cx9KHWtU8hf/esHZyV+yZzyFq70qXA6EmdLqmQommUj9Gn0c43az8SYof///9X////////5kSbf/SJYwA1n58oEsb8NRFK1h0OtZphgUHuRXUaKIqN05mNVajKzKY/JbjWXTIwIhvQVuTEVu1cmHzrjqK1zIkOqmTGv6fNj/////T/////////Ubf/oDiYAKj1jTCP/PUc21qG4hQu5bCxQNwt5aSXCDUblRrhukMsU9bw5q9G63o7K0XCF41qtO7HGpbvpJvPaoV2/8p/TUHX////0f////////8gE//6Q7aAAUtIxAR0S0BtMZRD0sZ26AJJzpzRC+EiEKNRL//uSRDkAApxVTutPU9RR6rldD2oeCdVVQaytT7FSKuk0bDR2XHm2ryLeqqs38tQKI7PCwYaP3qPldQwMPtZtkUm6fsd/4VA0////0Nb////////8Y//iylTACVeeRAA/nz0VvPfYnnioSpAAiaTNnqEHFCwt+QYpdjnU0avsFzJhUHyqLe2yHIjnyFOrMNgOjLeVvv6N2/AMf/////////////yYTptaAnJNs0wjkiaja/YFblHWs6eFJDHSf5tFF3feyc9jgJ63esf2yKPVSZwp1tJQnBQIGZuZIn1poMdROKmbfqb/xqFr////qSb////////6hdNf/ooS1gCTTTAoAf/NVIuLWeWmdqqSoBw7m6QmrODYRzHJ0wRW7bmzJKeGPofCOeyMEb9z92oylD7X/l1h5CKilNzf//+QBwz////O3////////6CaCWQAx2aZEAH/zyhlt1LnBgZp2KDROfPcbEj/lDLEpPZ7HGQ4TML20krcgsMXJAlzWgmhA6xBHbj4U2sFhH+Hf7f+B4z/////////////7Dav/0C2VP/7kmRTgBKRVdDrDyvsUoq6HWVnmYvRV0GsrnDxJCroNPodfgNWbZogH/lc7AatzIFUWRIpOqBghveRVWNJV5Qcoy51m5L/rbWNbN4ZkRF5qZRRSRpQFpAXqJ8HUUiwgmsmzQunhThiWQ9LUh/1D4GB/9f/1//////////J//8BCW4AFSW1f3jIkRUcgc4jha0EXAahF+cG4i57uLE7bJqfNw1HoJ0jykDQToOWRRI2ahZJgRG6J+re9OOAn/////////////6iU9UtgBlZGQCP+nnnTQEJwP/IVD1DDBaM91ICANYhcM4USSvct8sN6g2AMd452P+Q97g7V25K2j3sZbVw0mgLArfzty7KsomCnAeBGbRasyKNwl/HNQdgi3/r///////////8H//5gW2AluvWggEPKzi6kQ5wU7gQckUHCQJzSMr59TQUMxvlGsJWeKg9eLmUnCcYeytMvium7f//kY2/////////////+KzhAACIYAABrtf4U8gsAWJMhLYgUMGLLufgeRiYKgUCGADWamMwQDXGJgKs2fq8QG7/+5JkbAADJFXK02g+hEPquj0B6g+LiK8fTi2zAQGqqLQXtH4VEv9KNwD0/EFi8XFUTwFjroZcQe6gkr9Qdv62f/TCaGr/d+v/0f/+MOGP/IB1QARx20EADRvDRccPTR2O0Dhq1hr7Y4UmMQGHrpc7pEW7IN8oBJhwGp1POKbGl9f//6kSn/////////////8wICqUQQB/16955FtrYjq9QcDZjYQB8UJYCKwHBOYMBgaCDKAgoL+IxO/UziZWBd/D+fl2mqfVT2MMWEJxmb7Y9ArSezMdS0nKy3QbU+pD/XDsNn/3//1t/////////GtT///864l2QLdu2ZAI1TQpBPSQH+sLoBxaTQqDIEE8paiFXTacE8SUwVh+oz/cMwXFqJZ8odBxITfZv5f/MLf//////UOFBAAA+7qWSxbxEEacCTQNAQUDMGTwZqNGBAwIARBo6GiovrqWiVgGrFZp31AwUSG8k83q201YZadsmEnrEdR71Zpf2zrOLqedLXqV+pv7qWO8Gpp/+/////8kGDX/lilAD/4AMjQUB4xTTUrJ//uSZIiEAyFhxzusbZBAJXpNNYXBi9ivGG69ssDqKqVkfJTgcBGq8EBqzHki2kOQPP8RgJJM2B2uE2/40OnuTf1/+n/1//////////////EFJAAe+6QQj88ux13lrRF4mtFyTFaGPtjcSIyjAVBJkEUKDknNVotSEEPxf+fM6shVegmD7iQr21nV56ISj4+ab6Bi2NY32OJv9X9Nai+TQ89X9//////7/////6itv/kHdmwJddK4AR8RsRFosTH7PQziL3+a+2NPQtYYlLo029RJeQCiUM/KDR990R0V+36f7UwYxO8l//////zRggAAG68tlUGvaWsVvdVYMCBIYwvCfHq4Yig+YBAMSBOaFA8RASnU3rsxqo1URgVn6Xia0zRIlxroGJ1M3fMO0GCO5q3rOMZY5MUXJ9+PCdz/RP+eCwY6///00f///6f////jwCR/5cfwA1HEQCMSi0boInjDNQlCBtS+4omBDVzxgty9DD7zuJ23+eeDs05V6mMxTof+n/2Gf/////////////lFUDZAA3rC5FlMRYIVGU6QYP/7kmSogAL8VclTj2vQPCV6TTztm4z1UxZuvPMA9SqmaBwcag5gCFBhpEZzUmBiIEYYBwEbGWxp/LsQuZtZv2AMhnD7qeYhUWQMgJE+ayga1GS0kA6mdFa5uugmopGKF21MoY5i/9OBTCh1f///t//+k3///1f6lCNm7///9M+wLkACTUbKAA53G7zrDqJu+RIEahZ6+gKzLI839PyYKnT2xUsoxbmoSAEBadLzVXKPof+j/zjSgnAeI2kwIgBO8AG8MPmlb0/V4NzStHgbMeAAPuCfMWAABwJpEGVYIF8lN4FfC9lcIganjjFXVAZMiQDu3mvcv6PAeIe2unXg2fmi6rZOb+PTevqbBLr17f/Xr7//6////v/WULE3/wUCbgALm9gABH2ssKZNh5ZRqwB4WQTb9AsG3xc0tfoB/G/vs74aF3e4y+XH0BaoNHjuRm/+H///////lAAkIAH/YqwKw8oCSuGdIIiAUg3tGjKKKBx0xHqaCyMMWcVs1mWNVVJVS6rChVkBtSe9Wc5FCYPPQ5D3RGNevWpQxu3qLY9bds7/+5JkxwADXWJFm7prIDwFqa0HCh2MVVcXLq1TAOsMpXS9JRDv/s27zuvT/9/////+UBvLt/9k1fyJgXGABNu40ARyy1heMR0vSgsqQBlOrRKeStS+29lF2zH2lfqtvDnxDPLjMRe6iprm8ie9Wb99f6//AiG///////w6SFirbnnJbGX+mWXAUAAMCJjOoh+GKoKKYmAwYBMxSA9mgXBcjRfPF0F7jEtI2rpyNrJpPLQ1zG1u+ZzsHXTF4s8J0c5SipUvocjub8yaqg5Fhm1PtT/RP6ey/2RT7p/tdbf/OXoQJu3ruy+79ZNm/zJQDCAD6WdqQaziihxf7dkTTAqeNTkdKplYsEDlw1CAoshj8dwjvUfdZ713WdvmW2eATqctvAgIyrT6Pr0K8717c4gA9p////6P////////QVDf/kkAJgoBhlPVKVmKkHDbxR0AAwxXAT/rqMIgcuwIQODgy3RrvJ/Gcvp5W1SWhx61AGl3goH21VDiCYUs3dpXBF/Pv1HGqX1ujCuFahr0/1N/s1LZS36H6+vvWprW//+jVUOM//uSZOONAvphxTOZUyBBpXlNLydMDiGJEE6870FPquLZwSrYtf26/X/NT3W6gYIgIQADydI4Uv7GHlTQgaCx1UBkQWWiISgaFNaN19Fpf0trVRoBdnOZkOcBTFkWiESRvZ5pMKjGm/5Qtr/Vv9zAeDr0H5m3//9G//////T//0Gxb/6Q8IQxP5W5gja1lrzdWkhUBGCHmc8MwGHqRw6CwUW4YGa48LKFICDHd7Inpo8XbzZaIjhQvXfFvlz0aUz1vTod6TXRgrhC63Rd2Q3du/tqln8x+36dEu313/b++SDvT+ooruSg5QAu/KP06D/Pfgz1FQwq2TjZCMAgVYQEhE2SXEB6RaMNJXoKQaCF6nscc4TWlAEH0rJ3PKg2HqbxDoXCQ66n0dEYN9vMHw3X/9Dt/5/////0///9Q4Co/8iqBYAKSJokDedy3DTM5fAT+qwpDGGjqceCg0GWTFQQmUAwvxeQCBthTCF0+8T6hme1xoA61WgUvrJAsIAERcXfkba22M4mB+93Gw+NH7riQfJiplibDO+Sh1//R//1g84AAP/7kmTvgUNUYUSziGzAVyrItxuKLAxFVxTOLU9BZariicQWWArlUDXZ2rPMTv4yeIJ2gSKNidUiGwrxJqZocthim3jK0uLNbBndATPy94y275naOgQaJo3O3VsqXop9/sm2qzxBgkh09O/dl3tRWbMZ8z9f/60T+v//1jdf+iHAAqFIkAb3jZlD70METc4scwoTjswVGg4vcwEGDOgRQocB7pHzdCvLPUsytA7z4MuygGhaSkLKCCp/fkS3K51CntfGmO4x3ZXNDBRp2fv377faT//65Nuv/0//1EG+t3cuiQoApKladkMdCSghEoKYZNBz0OhAWZqIguZSHDisdXo/PbNtkeU9XVgb2c4Gl6i91R6uI4yol66qi1PsvctUxsqXQ0QIKWsSNRv/+ivQ/Rteqf9D179//7/apITL99Vws9GuAEAZQhIgDJhyIy1MujTgg3EAubzSkkZBRuwyQrjef8qdVvDqGPMisxgLORQVYfv7gc3H/P/X98pVTKNMQuvUCwIi4REILwJcP04wAOs3u/9bn+x739Xrv6KHoBIARS3/+5JE74CC+CrGU49DsF2KuLltKpYMIVUW7iSywYkrIojOKSBuMgDqCEFOfAunKY2MOxwxumBK1pC0lIoFqP9unpEwb1qJq8CDWtwLzEBmbxx64bnH1u9v9LxpLfB6vn2M/5oPwBCpyc/u4b/ss//5L//rAABn5oA6iwcE1NUeEdMCuBauykeBhuLQvafH4C/OuknmY5p2SNOACk+FE1z1QqFGPTz26oeiFr2simspqI11VWNCWFk81ld5Krqd/en/dddren/p1/dU+r7M0gLybYulUZZUaq1gBcRAKk9Wi8uh51nBcZ3gsBTBrYOZmEBAaEjKoMmfV+WavblVvpdZ9jIaRBbw4D/YNBarT1AVN7tpom/gfFsbqDA1liyQ8moF2PZnf5Ht+mR/ps6FIe13xQhRempMQQFAMciSIAaSr328krsU7wA0NDwZq7MCQ3HTiA+Lhcy/KHpUS3U/472zi5ytAuig850biMRHSzjQ7dC0atfa/LH8VM1N3hisG0puK2PR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L/1JZfKJZWPxlRf9KKb/RTHOymK7ymK7+7ct/7KS/spJbUpJaz2Fiv80Vd+irAcophUU0rCf5NgdMjFXuyay//uSRKoBAloXPwhhGhCnzRepJMnQSgQA4QEMYAk2gl9AEIgJKs8niDcfiC5ayxOs1/28q53dbEgpz4T/s19yIJ/qu+qFeE8kms03Nx6wTMaE8m/E3/6y6yVm2n/42XXPnUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUACQAAEBQESCusYkkFQEBSQVd0MCQCJB0JP9gwCkQmCwFIu60EQkBQSIhJ/S0eBSJ0Ku9o8BEgoDICJP9JIKgICkgq7oYMARIKhJ/sGAURE0xBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7kkRoj/AAAGkAAAAIUAAXGAQjAAAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5JkQI/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//uSZECP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7kmRAj/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=");
            beep.volume = 1;
            beep.play().catch(()=>{});
        } catch (e) {
            console.error("Audio play failed:", e);
        }
        return;
    }
    // Create the menu
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


//---------------------------------------------------------
//-- Creates the mini profile previews inside the kickbox
//---------------------------------------------------------
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


//-------------------------------------------------------------
//-- The action to remove users when clicked in the kick menu
//-------------------------------------------------------------
function RemoveSelectedUser(i) {
    var profile_url = $('img[onclick*=ManageMembers_Kick]:contains(' + i +')').parents('.member_block')
    var userID = tempuserarray.indexOf(i)
    tempuserarray.splice(userID, 1);
    tempusernames.splice(userID, 1);
}


//------------------------------------------------------------------------
//-- Save the red checked users to the kick list and close the kick menu
//------------------------------------------------------------------------
function SaveFilters() {
    $('#popuphome').remove();
    $.cookie('KickThesePlayers', tempuserarray, { domain: 'steamcommunity.com', path: pagepath });
    $.cookie('KickThesePlayers-Names', tempusernames, { domain: 'steamcommunity.com', path: pagepath });
    LoadSavedFilters()
}


//------------------------------------------------------------------------------
//-- Close the kick menu without saving the red checked users to the kick list
//------------------------------------------------------------------------------
function CancelKick() {
    createArrays()
    $('#popuphome').remove();
}


//-----------------------------------------------------------
//-- Completely erase the kick list and close the kick menu
//-----------------------------------------------------------
function ClearKick() {
    $('#popuphome').remove();
    $.removeCookie('KickThesePlayers', {domain: 'steamcommunity.com', path: pagepath });
    $.removeCookie('KickThesePlayers-Names', {domain: 'steamcommunity.com', path: pagepath });
    $('#KickUserCheckbox[style="accent-color: green;"]').removeAttr('style').removeAttr('disabled');
    $('#KickUserCheckbox:checked').click();
    createArrays()
}


//------------------------------------------------------------------------------
//-- Save the current selected user kick list and start the startkick function
//------------------------------------------------------------------------------
function savestartKick() {
    SaveFilters()
    startkick()
}


//-----------------------------------------------------------------------------
//-- The function that goes through the list and kicks all the selected users
//-----------------------------------------------------------------------------
function startkick() {
    // Safely read cookies
    const kickListRaw = $.cookie('KickThesePlayers');
    const nameListRaw = $.cookie('KickThesePlayers-Names');

    // If cookie missing entirely, stop
    if (!kickListRaw) return;

    // Decode and clean up
    const kickList = decodeURIComponent(kickListRaw).split(',').filter(Boolean);
    const nameList = decodeURIComponent(nameListRaw || '').split(',').filter(Boolean);

    // Check if list is truly empty (no valid IDs left)
    if (kickList.length === 0 || !kickList[0]) {
        $.removeCookie('KickThesePlayers', { domain: 'steamcommunity.com', path: pagepath });
        $.removeCookie('KickThesePlayers-Names', { domain: 'steamcommunity.com', path: pagepath });
        ShowBlockingWaitDialog("Players Kicked", '<span style="font-size: large;">Waiting for Steam To Process...</span>');
        setTimeout(() => location.reload(), 2000);
        return;
    }

    // Pull next ID and name
    const currentID = kickList.shift();
    const currentName = nameList.shift() || "Unknown";

    console.log("Kicking:", currentID, currentName);

    $.post(g_strProcessURL, {
        xml: 1,
        action: "kick",
        memberId: currentID,
        sessionID: g_sessionID
    })
    .always(() => {
        // Rewrite cookies cleanly (or blank if done)
        if (kickList.length === 0) {
            $.removeCookie('KickThesePlayers', { domain: 'steamcommunity.com', path: pagepath });
            $.removeCookie('KickThesePlayers-Names', { domain: 'steamcommunity.com', path: pagepath });
            ShowBlockingWaitDialog("Players Kicked", '<span style="font-size: large;">Waiting for Steam To Process...</span>');
            setTimeout(() => location.reload(), 2000);
            return;
        }

        $.cookie('KickThesePlayers', encodeURIComponent(kickList.join(',')), { domain: 'steamcommunity.com', path: pagepath });
        $.cookie('KickThesePlayers-Names', encodeURIComponent(nameList.join(',')), { domain: 'steamcommunity.com', path: pagepath });

        ShowBlockingWaitDialog(
            "Kicking Players...",
            `<span style="font-size: large; text-align: center;">
                Kicking user: <span style="text-decoration: underline; text-underline-offset: 3px;">${currentName}</span><br>
                &emsp;&ensp;&nbsp;Steam ID: <span style="text-decoration: underline; text-underline-offset: 3px;">${currentID}</span>
             </span>`
        );

        setTimeout(startkick, 400);
    });
}



//-----------------------------------------------------------------------------------
//-- Load the saved kick list and check if any users on the current page are marked
//-----------------------------------------------------------------------------------
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
