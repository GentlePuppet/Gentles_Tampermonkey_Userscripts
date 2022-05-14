// ==UserScript==
// @name           Better Twitter
// @match          https://twitter.com/*
// @include        *://twitter.com/*
// @run-at         document-start
// @icon           https://abs.twimg.com/favicons/twitter.ico
// @noframes
// @inject-into    content
// @grant          unsafeWindow
// @grant          GM_setClipboard
// @grant          GM_xmlhttpRequest
// @grant          GM_openInTab
// @grant          GM_registerMenuCommand
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_getResourceText
// @grant          GM_info
// @grant          GM_addStyle
// @require        https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js
// @require        https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require        https://raw.githubusercontent.com/carhartl/jquery-cookie/v1.4.1/jquery.cookie.js
// @require        https://greasyfork.org/scripts/396752-hx-lib/code/hx-lib.js
// @resource HxLib https://greasyfork.org/scripts/396752-hx-lib/code/hx-lib.js
//
// @updateURL      https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Better%20Twitter/Better%20Twitter.user.js
// @downloadURL    https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Better%20Twitter/Better%20Twitter.user.js
// @version        0.9.1
// ==/UserScript==

/////////////////////////////////////////////////
// Stuff Created By Gentle
/* Scaling */
GM_addStyle(`header[role="banner"] {max-width: 0px !important;}
             main[role="main"], header[role="banner"] > div > div > div > div, header[role="banner"] > div > div > div > div:nth-child(2) {max-width: 800px;}
             main[role="main"]{max-width: calc(800px + 298px)!important;margin: auto !important;}
             header[role="banner"] > div > div > div {margin: auto;padding-right: 298px;max-width: calc(800px + 298px);}
             main[role="main"] > div {max-width: 800px;}
             div[data-testid="sidebarColumn"] {max-width: 36% !important;}
             div[data-testid="sidebarColumn"] > div > div:nth-child(2), div[data-testid="sidebarColumn"] > div > div:nth-child(2) > div > div > div > div:nth-child(1) {max-width: 100% !important; position: sticky;}
             div[data-testid="sidebarColumn"] > div > div:nth-child(1) {display: none;}

/* Settings */
             section[aria-labelledby="root-header"] {margin-left: -200px; top: 45px; border-top: 1px solid rgb(56, 68, 77);}
             section[aria-labelledby="detail-header"] {top: 45px; border-top: 1px solid rgb(56, 68, 77);}

/* Hide Whats Happening */
             div[data-testid="sidebarColumn"] > div > div:nth-child(2) > div > div > div > div:nth-child(2), div[aria-label="Timeline: Trending now"] {display: none !important;}

/* Wider Posts */
             div[data-testid="primaryColumn"], .r-1ye8kvj {max-width: 800px !important; margin-right: 10px; background-color: #101923 !important;}
             div[data-testid="primaryColumn"] > div > div:nth-child(3) {display: none;}
             div[role="blockquote"] {background-color: #172535 !important; border-color: #253341 !important;}
             section[aria-label="Section navigation"] {margin-right: 0px !important;}
             section[aria-label="Section details"] {margin-right: -100px !important;}

/* Adjusted Left Sidebar */
             main[role="main"] > div > div > div > div > div > div:nth-child(1) {/*padding-top: 40px;*/}
             main[role="main"] > div > div > div > div > div > div > div {border-top: 1px solid rgb(56, 68, 77);}
             header[role="banner"] > div, header[role="banner"] > div > div, header[role="banner"] > div > div > div {width: 100%; overflow: hidden; padding: 0px; height: 40px;}
             header[role="banner"] > div > div > div > div {height: 40px; border-left: 1px solid #101923; border-right: 1px solid #101923; background: #101923;}
             a[href="/home"], a[href="/notifications"],a[aria-label="Direct Messages"],a[aria-label="Bookmarks"],a[aria-label="Lists"],a[aria-label="Profile"],div[aria-label="More menu items"] {width: 40px; height: 40px; padding: 0px;}
             a[aria-label="Twitter"] > div > svg,a[aria-label="Home"] > div > div,a[href="/notifications"] > div > div,a[aria-label="Direct Messages"] > div > div,a[aria-label="Bookmarks"] > div > div,a[aria-label="Lists"] > div > div,a[aria-label="Profile"] > div > div,div[aria-label="More menu items"] > div > div {top: -2px;}
             a[aria-label="Home"] div > div:nth-child(2),a[aria-label="Notifications"] div > div:nth-child(2),a[aria-label="Direct Messages"] div > div:nth-child(2),a[aria-label="Bookmarks"] div > div:nth-child(2),a[aria-label="Lists"] div > div:nth-child(2),a[aria-label="Profile"] div > div:nth-child(2),div[aria-label="More menu items"] div > div:nth-child(2) {display:none; margin: none; padding: none;}
             a[href="/home"] div > div:nth-child(2) {margin: 0px !important;}
             a[href="/notifications"] div > div:nth-child(2) {margin: 0px !important;}
             a[aria-label="Twitter"] {top: 0px !important; left: 0px !important; min-width: 40px; min-height: 40px; width: 40px; height: 40px; padding: 0px;}
             a[href="/home"]                   {top: -45px;  left: 40px}
             a[href="/notifications"]          {top: -85px;  left: 80px}
             a[href="/messages"]               {top: -125px; left: 120px}
             a[aria-label="Bookmarks"]         {top: -165px; left: 160px}
             a[aria-label="Lists"]             {top: -205px; left: 200px}
             a[aria-label="Profile"]           {top: -245px; left: 240px}
             div[aria-label="More menu items"] {top: -285px; left: 280px}
             header[role="banner"] > div > div > div > div:nth-child(2) {top: -40px; margin-top: 0px; margin-bottom: 0px; padding: 0px; left: 575px; width: 220px; height: 40px; border: none;}
             header[role="banner"] > div > div > div > div:nth-child(2) > div > div {margin: 0px; padding: 0px; padding-right: 10px; width: 220px; height: 40px; border: none;}

/* Box Avatars */
             .r-sdzlij {border-radius: 0px !important;}

/* Uncropped Images */
             div[aria-label="Image"] {margin: 0px 0px 0px !important;}
             div[aria-label="Image"] > div {background-size:contain !important; background-position-x: 0 !important;}
             .r-18bvks7 {border-color: transparent; border-radius: 0px !important;}

/* Show Hidden Content */
             .u-hidden {display:inherit !important;}
             .Tombstone {display:none;}

/* Toggle Buttons */
             #ToggleMediaButton {background-color:transparent;height:40px;width:40px;position:absolute;border:none!important;left:-180px;color:white;font-size:20px;padding-top:5px;}
             #ToggleMediaButton:hover {background-color:rgba(121, 75, 196, 0.1)!important;color:rgb(121, 75, 196)!important;cursor: pointer;}
             #ToggleLikeButton {background-color:transparent;height:40px;width:40px;position:absolute;border:none!important;left:-140px;color:white;font-size:20px;padding-top:5px;}
             #ToggleLikeButton:hover {background-color:rgba(121, 75, 196, 0.1)!important;color:rgb(121, 75, 196)!important;cursor: pointer;}
             #ToggleRetweetButton {background-color:transparent;height:40px;width:40px;position:absolute;border:none!important;left:-100px;color:white;font-size:20px;padding-top:5px;}
             #ToggleRetweetButton:hover {background-color:rgba(121, 75, 196, 0.1)!important;color:rgb(121, 75, 196)!important;cursor: pointer;}
             #ToggleSelfRetweetButton {background-color:transparent;height:40px;width:60px;position:absolute;border:none!important;left:-60px;color:white;font-size:20px;padding-top:5px;}
             #ToggleSelfRetweetButton:hover {background-color:rgba(121, 75, 196, 0.1)!important;color:rgb(121, 75, 196)!important;cursor: pointer;}
`);

// Highlight Liked Posts
waitForKeyElements (`div[role="group"] > div > div[aria-label*="Liked"]`, HighlightLiked, 0);
function HighlightLiked (jnode) {
    $(jnode).parents('article[role="article"]').attr("style", "background-color: #3f0546;border-top: #b809ce 1px solid;border-bottom: #b809ce 1px solid;");
}

// Toggle Hide Tweets with No Image or Video
if($.cookie('TwitterImageOnly') == undefined) {$.cookie('TwitterImageOnly', "0", { domain: '.twitter.com', expires: 128000, path: '/' });}
if($.cookie('TwitterImageOnly') == 0) {$.cookie('TwitterImageOnly', "0", { domain: '.twitter.com', expires: 128000, path: '/' });}
if($.cookie('TwitterImageOnly') == 1) {waitForKeyElements ('article[role="article"]', HideNoImage, 0);function HideNoImage (jnode) {var PostWithVideo = jnode.find('div[aria-label="Embedded video"]');var PostWithImage = jnode.find('div[aria-label="Image"]');if(PostWithVideo.length | PostWithImage.length) {} else {jnode.parent().parent().parent().hide();};};$.cookie('TwitterImageOnly', "1", { domain: '.twitter.com', expires: 128000, path: '/' });}
waitForKeyElements ('div[aria-label="Top Tweets on"]', CreateToggleBlacklistButton, 0);
function CreateToggleBlacklistButton(jnode) {var b1 = $('<input/>').attr({ type: "button", id: "ToggleMediaButton", value: "M"});$(b1).insertBefore(jnode);document.getElementById("ToggleMediaButton").addEventListener("click", ToggleMedia, false);if($.cookie('TwitterImageOnly') == 1) {$('#ToggleMediaButton').attr('style', 'background-color: rgb(60 178 197 / 10%);color: rgb(88 196 75);');}}
function ToggleMedia() {if($.cookie('TwitterImageOnly') == 0) {$('#ToggleMediaButton').attr('style', 'background-color: rgb(60 178 197 / 10%);color: rgb(88 196 75);');}if($.cookie('TwitterImageOnly') == 0) {waitForKeyElements ('article[role="article"]', HideNoImage, 0);function HideNoImage (jnode) {var PostWithVideo = jnode.find('div[aria-label="Embedded video"]');var PostWithImage = jnode.find('div[aria-label="Image"]');if(PostWithVideo.length | PostWithImage.length) {} else {jnode.parent().parent().parent().hide();};};$.cookie('TwitterImageOnly', "1", { domain: '.twitter.com', expires: 128000, path: '/' });return}if($.cookie('TwitterImageOnly') == 1) {$.cookie('TwitterImageOnly', "0", { domain: '.twitter.com', expires: 128000, path: '/' });location.reload();return}}

// Toggle Hide Liked Tweets
if($.cookie('TwitterHideLiked') == undefined) {$.cookie('TwitterHideLiked', "0", { domain: '.twitter.com', expires: 128000, path: '/' });}
if($.cookie('TwitterHideLiked') == 0) {$.cookie('TwitterHideLiked', "0", { domain: '.twitter.com', expires: 128000, path: '/' });}
if($.cookie('TwitterHideLiked') == 1) {waitForKeyElements (`div[aria-label*="Liked"]`, HideLiked, 0);$.cookie('TwitterHideLiked', "1", { domain: '.twitter.com', expires: 128000, path: '/' });}
waitForKeyElements ('#ToggleMediaButton', CreateToggleLikedButton, 0);
function CreateToggleLikedButton(jnode) {var b2 = $('<input/>').attr({ type: "button", id: "ToggleLikeButton", value: "L"});$(b2).insertAfter(jnode);document.getElementById("ToggleLikeButton").addEventListener("click", ToggleLiked, false);if($.cookie('TwitterHideLiked') == 1) {$('#ToggleLikeButton').attr('style', 'background-color: rgb(60 178 197 / 10%);color: rgb(88 196 75);');}}
function ToggleLiked() {if($.cookie('TwitterHideLiked') == 0) {$('#ToggleLikeButton').attr('style', 'background-color: rgb(60 178 197 / 10%);color: rgb(88 196 75);');}if($.cookie('TwitterHideLiked') == 0) {waitForKeyElements (`div[aria-label*="Liked"]`, HideLiked, 0);$.cookie('TwitterHideLiked', "1", { domain: '.twitter.com', expires: 128000, path: '/' });return}if($.cookie('TwitterHideLiked') == 1) {$.cookie('TwitterHideLiked', "0", { domain: '.twitter.com', expires: 128000, path: '/' });location.reload();return}}
function HideLiked (jnode) {jnode.parents('article[role="article"]').parent().remove();}

// Toggle ReTweets
if($.cookie('TwitterHideRetweet') == undefined) {$.cookie('TwitterHideRetweet', "0", { domain: '.twitter.com', expires: 128000, path: '/' });}
if($.cookie('TwitterHideRetweet') == 0) {$.cookie('TwitterHideRetweet', "0", { domain: '.twitter.com', expires: 128000, path: '/' });}
if($.cookie('TwitterHideRetweet') == 1) {waitForKeyElements (`span[data-testid="socialContext"]:contains('Retweeted')`, HideRetweeted, 0);$.cookie('TwitterHideRetweet', "1", { domain: '.twitter.com', expires: 128000, path: '/' });}
waitForKeyElements ('#ToggleLikeButton', CreateToggleRetweetButton, 0);
function CreateToggleRetweetButton(jnode) {var b3 = $('<input/>').attr({ type: "button", id: "ToggleRetweetButton", value: "R"});$(b3).insertAfter(jnode);document.getElementById("ToggleRetweetButton").addEventListener("click", ToggleRetweeted, false);if($.cookie('TwitterHideRetweet') == 1) {$('#ToggleRetweetButton').attr('style', 'background-color: rgb(60 178 197 / 10%);color: rgb(88 196 75);');}}
function ToggleRetweeted() {if($.cookie('TwitterHideRetweet') == 0) {$('#ToggleRetweetButton').attr('style', 'background-color: rgb(60 178 197 / 10%);color: rgb(88 196 75);');}if($.cookie('TwitterHideRetweet') == 0) {waitForKeyElements (`span[data-testid="socialContext"]:contains('Retweeted')`, HideRetweeted, 0);$.cookie('TwitterHideRetweet', "1", { domain: '.twitter.com', expires: 128000, path: '/' });return}if($.cookie('TwitterHideRetweet') == 1) {$.cookie('TwitterHideRetweet', "0", { domain: '.twitter.com', expires: 128000, path: '/' });location.reload();return}}
function HideRetweeted (jnode) {jnode.parents('article[role="article"]').parent().remove();}

// Toggle Self-ReTweets
if($.cookie('TwitterHideSelfRetweet') == undefined) {$.cookie('TwitterHideSelfRetweet', "0", { domain: '.twitter.com', expires: 128000, path: '/' });}
if($.cookie('TwitterHideSelfRetweet') == 0) {$.cookie('TwitterHideSelfRetweet', "0", { domain: '.twitter.com', expires: 128000, path: '/' });}
if($.cookie('TwitterHideSelfRetweet') == 1) {waitForKeyElements(`span[data-testid="socialContext"]:contains('Retweeted')`, CheckForSelfRetweet, 0);$.cookie('TwitterHideSelfRetweet', "1", { domain: '.twitter.com', expires: 128000, path: '/' });}
waitForKeyElements ('#ToggleRetweetButton', CreateToggleSelfRetweetButton, 0);
function CreateToggleSelfRetweetButton(jnode) {var b3 = $('<input/>').attr({ type: "button", id: "ToggleSelfRetweetButton", value: "SR"});$(b3).insertAfter(jnode);document.getElementById("ToggleSelfRetweetButton").addEventListener("click", ToggleSelfRetweeted, false);if($.cookie('TwitterHideSelfRetweet') == 1) {$('#ToggleSelfRetweetButton').attr('style', 'background-color: rgb(60 178 197 / 10%);color: rgb(88 196 75);');}}
function ToggleSelfRetweeted() {if($.cookie('TwitterHideSelfRetweet') == 0) {$('#ToggleSelfRetweetButton').attr('style', 'background-color: rgb(60 178 197 / 10%);color: rgb(88 196 75);');}if($.cookie('TwitterHideSelfRetweet') == 0) {waitForKeyElements(`span[data-testid="socialContext"]:contains('Retweeted')`, CheckForSelfRetweet, 0);$.cookie('TwitterHideSelfRetweet', "1", { domain: '.twitter.com', expires: 128000, path: '/' });return}if($.cookie('TwitterHideSelfRetweet') == 1) {$.cookie('TwitterHideSelfRetweet', "0", { domain: '.twitter.com', expires: 128000, path: '/' });location.reload();return}}
function CheckForSelfRetweet (jnode) {
    var Retweeted = jnode.parent().attr('href');
    var Retweeter = jnode.parents('article[role="article"]').find('div > div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div > div > div:nth-child(1) > div:nth-child(1) > a[role="link"]').attr('href');
    if (Retweeter == Retweeted) {
        //console.log("Retweeted: " + Retweeted + " | Retweeter: " + Retweeter)
        jnode.parents('article[role="article"]').parent().remove();
    } else {
        //console.log("Retweeted: " + Retweeted + " | Retweeter: " + Retweeter)
        return;
    }
}

/////////////////////////////////////////////////
//           Stuff Created by Others           //
/////////////////////////////////////////////////

/////////////////////////////////////////////////
// Hide Promoted Tweets
// Source: https://greasyfork.org/en/scripts/396474-ad-free-twitter/code
// Author: https://greasyfork.org/en/users/445494-keith-boudreau
function hidePromotedTweets(){
    const posts = document.getElementsByTagName("article");
    if (posts)
    {
        for (const p of posts)
        {
            const text = p.textContent;
            if (text)
            {
                const words = text.match(/\S+\s*/g).map(w=>w.trim()).slice(-6);
                if (words.filter(w=>w.includes('Promoted')).length > 0)
                {
                    let el = p;
                    while (el.className)
                    {
                        el = el.parentElement;
                    }

                    el.style.display="none";
                }
            }
        }
    }
}

hidePromotedTweets();
setInterval(function(){
    hidePromotedTweets();
},1000);

/////////////////////////////////////////////////
// Twitter Middle Click Open in New-Tab
// Source: https://greasyfork.org/en/scripts/392927-twitter-middle-clicks/code
// Author: https://greasyfork.org/en/users/137-100%E3%81%AE%E4%BA%BA
addEventListener('auxclick', function (event) {
	if (event.button !== 1 || event.detail !== 1 || event.target.closest('a')) {
		// 中クリックでない、ダブルクリック、またはリンクのクリックなら
		return;
	}

	if (event.target.dataset.text) {
		if (event.target.parentElement.parentElement.style.color !== 'rgb(27, 149, 224)') {
			return true;
		}

		// ツイート入力欄のリンク
		let url;
		const content = event.target.textContent;
		if (content.startsWith('@')) {
			url = '/' + content.replace('@', '');
		} else if (content.startsWith('#')) {
			// ハッシュタグ
			url = '/hashtag/' + encodeURIComponent(content.replace('#', ''));
		} else if (content.startsWith('$')) {
			// キャッシュタグ
			url = '/search?q=' + encodeURIComponent(content);
		} else {
			try {
				new URL(content);
			} catch (exception) {
				if (exception.name !== 'TypeError') {
					throw exception;
				}
				// ドメイン
				url = 'http://' + content;
			}

			if (!url) {
				// URL
				url = content;
			}
		}
		open(url);
		return;
	}

	const option = event.target.closest('[role="option"]');
	if (option) {
		// ツイート入力欄、または検索窓の入力補完
		let url;
		if (option.firstElementChild.dataset.testid === 'TypeaheadUser') {
			// ユーザー
			url = '/' + option.querySelector('[aria-haspopup] + div').textContent.replace('@', '');
		} else {
			const content = event.target.textContent;
			url = content.startsWith('#')
				? '/hashtag/' + encodeURIComponent(content.replace('#', '')) // ハッシュタグ
				: '/search?q=' + encodeURIComponent(content); // Twitterの検索窓では空白が「+」ではなく「%20」に置き換わる
		}
		open(url);
		return;
	}

	// Ctrl + 主クリック
	const init = {};
	for (const key in event) {
		init[key] = event[key];
	}
	init.button = 0;
	init.ctrlKey = true;
	if (!event.target.dispatchEvent(new MouseEvent('click', init))) {
		event.preventDefault();
		event.stopImmediatePropagation();
	}
}, true);

/////////////////////////////////////////////////
// Twitter Improvements
// Source: https://greasyfork.org/en/scripts/387641-new-twitter-improvements/code
// Author: https://greasyfork.org/en/users/318922-mikhaildyd
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

(function() {

  var re = /^\/.*\/status\/\d*\/photo\/\d$/;
  var img_re = /\?.*/;
  //var img_repl = '.jpg:orig';
  var img_repl = '.jpg';

  //useless shit to remove
  var remove_elements = [
    'a[role="button"][data-testid="SideNav_NewTweet_Button"]',
    'a[role="link"][href="/explore"]',
    'a[role="link"][href*="ads.twitter.com"]',
    'a[role="link"][href*="analytics.twitter.com"]',
    'a[role="link"][href$="/topics"]'
  ]

  let ob = new window.MutationObserver(function() {

    //remove useless elements
    remove_elements.forEach(function(sel) {
      let el = document.querySelector(sel);
      if (el) {
        el.remove();
      }
    })

    //trends are more complicated
    if (!window.location.pathname.startsWith("/settings")) {
      let sections = document.querySelectorAll('section[role="region"]');
      sections.forEach(function(s) {
        if (s.querySelector('a[href="/settings/trends"]')) {
          s.parentElement.parentElement.parentElement.remove();
        }
      });
    }

    //put direct links to images
    let links = document.querySelectorAll('a');
    links.forEach(function(a) {
      if (re.test(a.getAttribute('href'))) {
        let img = a.querySelector('img');
        if (img) {
          let src = img.getAttribute('src').replace(img_re, img_repl);
          a.setAttribute('href', src);
          a.setAttribute('x-image', 'true');
        }
      }
    });

  });

  ob.observe(document, {
    childList: true,
    subtree: true,
  });
})();

/////////////////////////////////////////////////
// Download Twitter Videos
// Source: https://greasyfork.org/en/scripts/390723-twitter-download-gif-video
// Author: https://greasyfork.org/en/users/33102-trixile
/////////////////////////////////////////////////
// @match        https://twitter.com/*
// @match        https://giphy.com/upload*
// @match        https://ezgif.com/video-to-gif/*
// ==/UserScript==

if(document.domain == "twitter.com" ){
var css = 'div[data-testid="primaryColumn"] article div.download-panel{display:none;position:absolute;z-index:60000;' +
          'right:0px;background-color:rgba(0,0,0,0.5);font-size:12px;}' +
          'div[data-testid="primaryColumn"] article div.css-1dbjc4n.r-1p0dtai.r-1loqt21.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af:hover div.download-panel{ display:block;}' +
          'div[data-testid="primaryColumn"] article div.download-panel > button.download {cursor:pointer;' +
          'background-color:rgba(0,0,0,0.0);color:white;border:1px solid black;font-size:10px;width:100%;}' +
    'div.download-panel div.download-links button {cursor:pointer;background-color:transparent;width:100%;text-align:center;display:block;' +
    'color:white;font-size:10px;border:1px solid rgba(255,255,255,0.5);padding:1px;margin-top:1px;text-decoration:none;}' +
    'div.download-panel div.download-links button:hover {color:red;border-color:red;}'
;
var style = document.createElement('style');
    style.setAttribute('type','text/css');
    style.innerHTML = css;
    document.head.appendChild(style);

    document.addEventListener('mouseover',mouseOver,false);
}

var i;

if(window.name.indexOf("TWITTER_GIF_DOWNLOAD")>-1){
    if(document.domain =="ezgif.com"){
        setTimeout(formSubmit,50);
    }
    else if(window.location.origin == 'https://giphy.com' && window.location.pathname == '/upload' ){
        var url  = new URL( window.location );
        var input = document.querySelector( 'input[type="url"]' );
        input.value = url.searchParams.get('url');
        triggerChange();
    }
}

function triggerChange() {
        var event = new Event('change', { bubbles: true });
        document.querySelector( 'input[type="url"]' )._valueTracker.setValue('' );
        document.querySelector( 'input[type="url"]' ).dispatchEvent( event );
}


function formSubmit(){
    document.querySelector('select#fps').value = 25;
    document.getElementById('tool-submit-button').firstElementChild.click();
    /*i = setInterval(waitImage,200);*/
}

/*
function waitImage(){
    var img = document.querySelector('#output img');
    if(img && img.src.indexOf('/tmp/')>-1) {
        clearTimeout(i);
        var newImg = document.createElement('img');
        newImg.src = img.src;
        newImg.id = "get-gif";
        newImg.style.zIndex = '6000';
        document.body.appendChild(newImg);
        document.getElementById('convert_video').parentElement.insertBefore(newImg,document.getElementById('convert_video'));
        document.getElementById('convert_video').style.display='none';
    }
}*/

function mouseOver(e){
    if(e.target.classList == "css-1dbjc4n r-1p0dtai r-1loqt21 r-1d2f490 r-u8s1d r-zchlnj r-ipm5af"){
            var video = e.target.parentElement.parentElement.parentElement.querySelector('video');
            if( video && !e.target.firstChild ){
                var panel = document.createElement('div');
                panel.setAttribute('class','download-panel');
                var button = document.createElement('button');
                button.setAttribute('class','download');
                button.innerText = "Download";
                panel.appendChild(button);
                e.target.appendChild(panel);
                panel.addEventListener('click',panelClick,false);
            }
    }
}

function panelClick(e){
    e.preventDefault();
    if( e.target.className === 'download' && !e.target.parentElement.dataset.done ){
        buttonClick(e);
    }
    else if( e.target.className === 'download-mp4' ){
        getBlob( e.target.dataset.videoUrl );
    }
    else if( e.target.className === 'upload-ezgif' ){
        requestGif( e.target.dataset.videoUrl );
    }
    else if( e.target.className === 'upload-giphy' ){
        giphyUpload( e.target.dataset.videoUrl );
    }
    e.stopPropagation();
}

function getBlob(url){
  var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.onload = function() {
        var blob = this.response.slice(0, this.response.size, "application/octet-stream");
        var u = URL.createObjectURL( blob );
        var fileName = prompt("Please enter file name", "video");
         if (fileName != null) {
              createDownloadLink(u, fileName);
         }
    };
    xhr.send();
}

function createDownloadLink(url, fileName) {
    if(fileName.length < 1) fileName = 'video';
    var a = document.getElementById('download-video');
    if( !a ){
        a = document.createElement( 'a' );
        a.setAttribute('download' , fileName + '.mp4' );
        a.setAttribute('id' , 'download-video' );
        a.setAttribute('target' , '_blank' );
        document.body.appendChild( a );
    }
    a.setAttribute('href' , url );
    a.click();
}

function buttonClick(e){
    var video = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('video');
    if(video.src.indexOf('.mp4')  > -1) {
         gifPanel( video , e.target.parentElement );
    }
    else if(video.src.indexOf('blob:')  > -1 ) {
        var id = getTweetId( video );
        getTweetInfo( id , e.target.parentElement );
    }
}

function gifPanel( video , panel ){
    if(panel.dataset.done) return;
    var div = document.createElement('div');
    div.setAttribute('class','download-links');
    btn( 'download-mp4' , 'as MP4' , div ).dataset['videoUrl'] = video.src;
    btn( 'upload-ezgif' , 'EzGIF' , div  ).dataset['videoUrl'] = video.src;
    btn( 'upload-giphy' , 'GIPHY' , div  ).dataset['videoUrl'] = video.src;
    panel.dataset.done = true;
    panel.appendChild( div );
}

function btn( cls , text , parent ){
    var btn = document.createElement('button');
    if(cls) btn.setAttribute('class', cls);
    if(text)btn.innerText = text;
    if(parent)parent.appendChild( btn );
    return btn;
}

function requestGif(videoSrc){
    var base = 'https://ezgif.com/video-to-gif?url=';
    var src = videoSrc;
    var url = base+src;
    window.open( url , "TWITTER_GIF_DOWNLOAD"+guidGenerator());
}

function giphyUpload(videoSrc){
    var url = 'https://giphy.com/upload?url=';
    url = url + videoSrc;
    window.open( url , "TWITTER_GIF_DOWNLOAD"+guidGenerator());
}

function getTweetId( elem ){
   var article_href =  elem.closest('article').querySelector('a[href*="/status/"]').href;
   var regexp = /\/status\/(\d+)/;
    return article_href.match(regexp)[1];
}

function getTweetInfo( tweetId , panel ) {
    panel.dataset.done = true;

var url = "https://api.twitter.com/1.1/statuses/show.json?include_profile_interstitial_type=1&include_blocking=1&" +
    "include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&skip_status=1" +
    "&cards_platform=Web-12&include_cards=1&include_ext_alt_text=true&include_reply_count=1" +
    "&tweet_mode=extended&trim_user=false&include_ext_media_color=true&id=" + tweetId ;

    var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.withCredentials = true;
        xhr.responseType = 'json';
        xhr.setRequestHeader("Accept", '*/*');
        xhr.setRequestHeader("authorization", "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA");
        xhr.setRequestHeader("x-csrf-token", getCookie("ct0"));
        xhr.onload = function() {
            var video_variants = getMediaSources(this.response);
            createLinks( video_variants , panel );
            panel.dataset['done'] = true;
        };
        xhr.send(null);
 }

function getMediaSources(tweet) {
    var video_variants;
       if(tweet.is_quote_status === false ){
           console.log( tweet );
          video_variants = tweet.extended_entities.media[0].video_info.variants;
       }
       else if(tweet.is_quote_status === true ){
           video_variants = tweet.quoted_status.extended_entities.media[0].video_info.variants;
       }
    video_variants = video_variants.sort(sortByBitrate);
    return video_variants;
}

function createLinks(vids , panel){
    var regexp = /\/vid\/([\dx]+)\//;
    var div = document.createElement('div');
    div.setAttribute('class','download-links');
    var last_video_src = null;
     for( var i=0; i< vids.length; i++ ){
         if( vids[i].content_type === "video/mp4" ){
             var resolution = vids[i].url.match( regexp );
             if(resolution) {
                  btn( 'download-mp4' , resolution[1] + ' MP4' , div  ).dataset['videoUrl'] = vids[i].url;
                  last_video_src = vids[i].url;
             }
         }
     }
    btn( 'upload-ezgif' , 'EzGIF' , div  ).dataset['videoUrl'] = last_video_src;
    btn( 'upload-giphy' , 'GIPHY' , div  ).dataset['videoUrl'] = last_video_src;
    panel.dataset['done'] = true;
    panel.appendChild( div );
}

function sortByBitrate(x, y) {
  if (x.bitrate < y.bitrate) {
    return -1;
  }
  if (x.bitrate > y.bitrate) {
    return 1;
  }
  return 0;
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

