// ==UserScript==
// @name         Twitter Remove Self-Retweets
// @author       GentlePuppet
// @version      1.2
// @include      https://twitter.com/*
// @run-at       document-start
// @require      https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

waitForKeyElements(`span[data-testid="socialContext"]:contains('Retweeted')`, CheckForSelfRetweet, 0);
function CheckForSelfRetweet (jnode) {
    var Retweeted = jnode.parent().attr('href');
    var Retweeter = jnode.parents('article[role="article"]').find('div > div:nth-child(1) > div:nth-child(1) > a[role="link"]').attr('href');
    if (Retweeter == Retweeted) {
        jnode.parents('article[role="article"]').parent().parent().parent().hide();
        return;
    }
}
