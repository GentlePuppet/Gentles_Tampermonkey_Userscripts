// ==UserScript==
// @name         Warframe Market Copy to Clipboard
// @version      0.1
// @author       GentlePuppet
// @description  Warframe Market Copy to Clipboard
// @match        https://warframe.market/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        GM_setClipboard
// @icon         https://warframe.market/static/assets/user/default-avatar.png
// ==/UserScript==

$(document).ready(function () {
    $('body').bind('DOMSubtreeModified', 'test', function () {
        if(window.location.href.indexOf("set") !==-1 ) {
            waitForKeyElements('section[class*="order-clipboard"]', CopytoClipboard, 0);
            function CopytoClipboard (jNode) {
                var Username = jNode.find("input").attr("value").replace(/Hi!.*$/g, "")
                var Cost = jNode.find("input").attr("value").replace(/^.*for /g, "").replace(/ platinum.*$/g, "")
                var ItemSet = jNode.find("input").attr("value").replace(/^.*I want to buy: /g, "").replace(/ for.*$/g, ".").replace(/ Set.*$/g, "")

                var NewWhisperItemSet = (Username + "Hello, I'd like to trade " + Cost + ":platinum: for a [" + ItemSet + "] Set. (warframe.market)")

                GM_setClipboard(NewWhisperItemSet, "{ type: 'text', mimetype: 'text/plain'}")
            }
        }
        if(window.location.href.indexOf("set") ==-1 ) {
            waitForKeyElements ('section[class*="order-clipboard"]', CopytoClipboard, 0);
            function CopytoClipboard (jNode) {
                var Username = jNode.find("input").attr("value").replace(/Hi!.*$/g, "")
                var Cost = jNode.find("input").attr("value").replace(/^.*for /g, "").replace(/ platinum.*$/g, "")
                var Item = jNode.find("input").attr("value").replace(/^.*I want to buy: /g, "[").replace(/ for.*$/g, "].");

                var NewWhisperItemSingle = (Username + "Hello, I'd like to trade " + Cost + ":platinum: for " + Item + " (warframe.market)")

                if (NewWhisperItemSingle.includes("Blueprint")) {
                    var BlueprintWhisper = NewWhisperItemSingle.replace(/ Blueprint]/g, "] Blueprint")
                    GM_setClipboard(BlueprintWhisper, "{ type: 'text', mimetype: 'text/plain'}")
                }
                if (NewWhisperItemSingle.includes("rank 5")) {
                    var ArcaneWhisper = NewWhisperItemSingle.replace(' (rank 5)]', "] (Rank 5)")
                    GM_setClipboard(ArcaneWhisper, "{ type: 'text', mimetype: 'text/plain'}")
                }
                else {
                    GM_setClipboard(NewWhisperItemSingle, "{ type: 'text', mimetype: 'text/plain'}")
                }
            }
        }
    });
});
