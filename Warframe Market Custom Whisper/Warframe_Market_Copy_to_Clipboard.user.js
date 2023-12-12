// ==UserScript==
// @name         Warframe Market Copy to Clipboard
// @version      1.1
// @author       GentlePuppet
// @description  Warframe Market Copy to Clipboard
// @match        https://warframe.market/*
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        GM_setClipboard
// @icon         https://warframe.market/static/assets/user/default-avatar.png
// @updateURL    https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Warframe%20Market%20Custom%20Whisper/Warframe_Market_Copy_to_Clipboard.user.js
// @downloadURL  https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Warframe%20Market%20Custom%20Whisper/Warframe_Market_Copy_to_Clipboard.user.js
// ==/UserScript==

$(document).ready(function () {
    $('body').bind('DOMSubtreeModified', 'test', function () {
        waitForKeyElements ('section[class*="order-clipboard"]', CopytoClipboard, 0);
        function CopytoClipboard (jNode) {
            var debug = false

            var buy_or_sell = jNode.find("input").attr("value")
            var Username = jNode.find("input").attr("value").replace(/Hi!.*$/g, '')
            var Cost = jNode.find("input").attr("value").replace(/^.*for /g, '').replace(/ platinum.*$/g, '')
            var Item = jNode.find("input").attr("value").replace(/^.*I want to sell: /g, '[').replace(/^.*I want to buy: /g, '[').replace(/ for.*$/g, ']').replace(/ Set.*$/g, "]").replace(/\"/g, '');

            var Whisper = ""

            if(window.location.href.indexOf("_set") !==-1 ) {
                Whisper = (Username + "Hello, I'd like to trade " + Cost + ":platinum: for a " + Item + " Set. (warframe.market)")
            }

            else if(window.location.href.indexOf("_set") ==-1 ) {
                var NewWhisperItemSingle = (Username + "Hello, I'd like to trade " + Cost + ":platinum: for a " + Item + ". (warframe.market)")
                var SellWhisperItemSingle = (Username + "Hello, I'd like to sell a " + Item + " for " + Cost + ":platinum: (warframe.market)")

                if (buy_or_sell.includes("sell")) {
                    if (SellWhisperItemSingle.includes("Blueprint")) {
                        Whisper = SellWhisperItemSingle.replace(' Blueprint]', "] Blueprint")
                    }
                    else if (SellWhisperItemSingle.includes("rank 5")) {
                        Whisper = SellWhisperItemSingle.replace('for a ["', 'for a [').replace(' (rank 5)"]', '] (Rank 5)')
                    }
                    else if (SellWhisperItemSingle.includes("Helmet")) {
                        Whisper = SellWhisperItemSingle.replace('[', "").replace(']', "")
                    }
                    else {
                        Whisper = SellWhisperItemSingle
                    }
                }
                else if (buy_or_sell.includes("buy")) {
                    if (NewWhisperItemSingle.includes("Blueprint")) {
                        Whisper = NewWhisperItemSingle.replace(' Blueprint]', "] Blueprint")
                    }
                    else if (NewWhisperItemSingle.includes("rank 5")) {
                        Whisper = NewWhisperItemSingle.replace('for a ["', 'for a [').replace(' (rank 5)"]', '] (Rank 5)')
                    }
                    else if (NewWhisperItemSingle.includes("Helmet")) {
                        Whisper = NewWhisperItemSingle.replace('[', "").replace(']', "")
                    }
                    else {
                        Whisper = NewWhisperItemSingle
                    }
                }
            }

            GM_setClipboard(Whisper, "{ type: 'text', mimetype: 'text/plain'}")
            if (debug == true) {console.log(' Username: '+Username+'\n     Cost: '+Cost+'\n     Item: '+Item+'\nClipboard: '+Whisper)}
        }
    });
});
