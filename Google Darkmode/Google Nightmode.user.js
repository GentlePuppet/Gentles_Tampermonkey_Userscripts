// ==UserScript==
// @name         Google Nightmode
// @description  Makes Google DarkThemed
// @version      0.9.8
// @author       Gentle Puppet
// @include      https://www.google.com/*
// @icon         https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png
// @run-at       document-start
// @updateURL    https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Google%20Darkmode/Google%20Nightmode.user.js
// @downloadURL  https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Google%20Darkmode/Google%20Nightmode.user.js
// @grant        GM_addStyle
// ==/UserScript==
GM_addStyle(`
    /* Base Background and Text Colors */
        body, .VHFyob .CvDJxb, .sfbg, #appbar, #before-appbar, #top_nav {
            background: rgb(16, 16, 16) !important;
            color: #bbb !important;
        }

        body {
            max-width: 100% !important;
        }

    /* Transparent Backgrounds with Light Text */
        .zLSRge, .vM0jzc, .ZigeC, .zNsLfb, .in7vHe, .EIJn2, .NQyKp.Hyaw8c, .b0Xfjd.Hyaw8c, .dvfTSb .UmMF3b, .LGwnxb, .R8BTeb,
        .BAkGKd, .qd9Mkf, .KMdzJ, .bclEt, .Ss2Faf, .jKdVlc, .LrzXr, .zqrO0, .NUnG9d, .ABs8Y, .APjcId.APjcId, .usJj9c .zz3gNc,
        .ssJ7i, .CYJS5e, a.CYJS5e, a.CYJS5e:visited, .FoJoyf.w8qArf, .FalWJb, .aKoISd, .KFFQ0c .YfftMc, .KFFQ0c .YfftMc span,
        .KFFQ0c .YfftMc div, .KFFQ0c .YfftMc a, .dfB0uf, .gMZyfc, .ZU8Abc, .wM6W7d, .WzNHm, .aypzV, .CSkcDe,
        .related-question-pair div.iDjcJe, .dg6jd, .VuuXrf, .oST1qe .JCzEY, .RES9jf, .YrbPuc, .cUnQKe .ILfuVd, .cUnQKe .UiGGAb.ILfuVd,
        .w5mTAe .ILfuVd, .ylgVCe, .p4wth em, .p4wth b, .P1usbc, .FoDaAb, .s8GCU, .dXdtIf, .cG5GOd, .IsZvec, .hb8SAc, .YSlUOe, .Xeztj,
        .yg51vc, .Cyt8W, .LMMXP, .JolIg, .mDj5wd, .I6TXqe, .MGqjK, .WpKAof:hover, .kLhEKe, .Ywxp6b, .f, .f a:link, html:not(.zAoYTe) .hide-focus-ring,
        .MXl0lf, .cfBJGe, .BlOseb.eSq3C g-fab, .k2Oeod.eSq3C g-fab, .YbqTTb, .dw-sb-cont .dw-sbi, .dw-sb-cont, .kp-blk, .RNNXgb, .gLFyf, .aajZCb, .Lj9fsd,
        .jZWadf, .sfbgg, #gbwa, .gb_Nc, .B7A8m, .p83fR, g-inner-card, .ZINbbc, .zDBTmf > div, .eUrIee, .ZINbbc, .XO51F, #brs .med, .gG0TJc,
        .m7VU0c, .sect, .rlc__slider, .rlc__slider-page, div.rl_feature {
            background: transparent !important;
            color: #bbb !important;
        }

    /* Light Text on Less Darker Background */
        .ifM9O, .WwiUwd, .Mw2I7, .Mw2I7 span.dtviD, .u80vZ .pLfNuf, .nmca, .nmcw, .rl_item_base .title, .mlo-c,
        .rl_item_base, .jbzYp, .q0OVVc, .lVpIye, .NmQOSc, .Vcnuqf, .HoEOQb, .rl_feature .kxbcl, .H1ccWd, .IiOSLb .rsGxI.Ww4FFb, .Ww4FFb, .vIifob {
            background: rgb(25, 25, 25) !important;
            color: #aaa !important;
        }

        .s, .ELcVZ {
            background: transparent !important;
            color: #aaa !important;
        }

    /* High-Contrast Foreground Elements */
        .MnxrXd, .Fx0PXd, .v5axif, .rbZWke, .klCDjc, .jaf3Yd, .UiRzac, .ZoQ1ac, .Y77G4d, .HtP7nb, .ZEwWe .H3pCR, .ZEwWe .H3pCR b, #foot #navcnt .cur, .MqFglb, .sbl1, .dw-sb-cont .dw-sbs, .p4wth {
            color: white !important;
        }

    /* Gradient and Special Effects */
        .d5wodd:not([expanded]) .AGDyff {
            background: linear-gradient(to left, #1a1a1a 0%, #1a1a1a calc(100% - 55px), transparent) !important;
        }

        .RDmXvc {
            background-image: linear-gradient(transparent 0px, #101010 52px, #101010 80px) !important;
        }

    /* Link Colors */
        .w8qArf .fl, .dyjrff, .K8WCoe, .OZ9ddf .Fzsovc, .mNme1d, a:link, .w, #prs a:visited, #prs a:active, .q:active, .q:visited, .kl:active, .tbotu, .g0F6u, .KwU3F, .xSQxL {
            color: #2c67ef !important;
        }

        a:visited, .mblink:visited {
            color: #aa17f3 !important;
        }

        cite, cite a:link, cite a:visited, .cite, .cite:link, #nygTcd > i, .bc a:link, .QHTnWc, .e8fRJf {
            color: #00ad38 !important;
        }

    /* Tabs and Selections */
        [selected].YmvwI {
            color: #e8e8e8 !important;
            border-bottom: 3px solid #e8e8e8 !important;
        }

        .YmvwI {
            color: #9aa0a6 !important;
        }

    /* Form Elements */
        #searchform {
            color: rgb(16, 16, 16) !important;
        }

        .sbct.sbhl, .gstl_50 .sbsb_d, .fxvkXe, .p8Jhnd {
            background: rgb(32, 32, 32) !important;
        }

        .jhp input[type="submit"], .sbdd_a input, .gbqfba, .RNNXgb, .aajZCb, .gstl_50 .sbsb_a {
            background: rgb(16, 16, 16) !important;
            color: white !important;
            border: 1px solid #444 !important;
        }

    /* Header/Footer */
        #hdtb, #hdtbSum, #fbar {
            background: rgb(16, 16, 16) !important;
            color: #bbb !important;
            border: 1px solid #444 !important;
            border-bottom: 1px solid #444 !important;
        }

    /* Widgets and Results */
        .Z0LcW, .kno-ecr-pt, .IZACzd, .Ndq8Rb, .piVJ4d, .C9iYEe, .N6Sb2c, .i29hTd .kR7nSc, .i29hTd .qLLird, .WKrsIc, .WKrsIc:hover, .aCOpRe em, .st em, .LHJvCe, .mmxugd {
            color: white !important;
        }

    /* Weather and Translation Widgets */
        .wob_ds {
            color: #eee !important;
            background-color: #555 !important;
        }

        .vk_gy, .vk_c, .vk_cxp, .wob_ds, .vk_gy.vk_sh.wob-dtl, .vk_gy.vk_h, .vk_gy.vk_sh, .g9WsWb, #KnM9nf, .tw-text-large, .tw-ta, .tw-bilingual-entry, .SvKTZc, .MaH2Hf, .gt-is, .tw-bilingual-pos, .QXzCSe, .tw-menu-btn {
            color: #eee !important;
            background-color: #333 !important;
        }

        .vk_bk, .vk_bk.sol-tmp, .webanswers-webanswers_table__webanswers-table th, .iAIpCb {
            color: #eee !important;
        }

    /* Buttons */
        .ksb.ksbs, .ksb.ksbs:hover, .ksb {
            color: #eee !important;
            background-image: -webkit-linear-gradient(top, #777, #444) !important;
        }

    /* Hover Effects */
        .BaegVc:hover, a.nPDzT:hover, .dvfTSb.OdANFd:hover, .IiW4yf .dvfTSb.OdANFd, .REySof:hover {
            background-color: #242424 !important;
            color: #bbb !important;
        }

    /* Additional Colors */
        .TXwUJf {
            color: #999da9 !important;
        }

        .ynAwRc {
            color: #4b96f7;
        }
`);
