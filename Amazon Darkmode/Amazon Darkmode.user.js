// ==UserScript==
// @name         Amazon Darkmode
// @version      1.1.8
// @author       GentlePuppet
// @match        https://www.amazon.com/*
// @icon         https://store-images.s-microsoft.com/image/apps.55760.13510798887500513.d2cc5d6f-e9f4-4850-a5d6-bbd7976d6c2d.ed4ef02c-b3d1-497d-8297-1a54e79abfad?mode=scale&q=90&h=200&w=200&background=%230078D7
// @updateURL    https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/tree/main/Amazon%20Darkmode/AmazonDarkmode.js
// @downloadURL  https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/tree/main/Amazon%20Darkmode/AmazonDarkmode.js
// @run-at       document-start
// @match        *amazon*
// @grant        GM_addStyle
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

// Sky Background
GM_addStyle('body, #pageContent {color: #ddd !important; background-color: #222 !important; background: #222 !important; /* background-image: url(https://opengameart.org/sites/default/files/Starbasesnow.png) !important; background-repeat: repeat !important; background-size: fit-width !important; background-position: center !important; */}');

// Dark Background With Light Text
GM_addStyle('.a-alert-inline-info .a-alert-container, a.a-link-section-expander, .a-ordered-list li, .a-unordered-list li, ol li, ul li, .a-unordered-list li, ul li, #text, #attach-desktop-sideSheet div.attach-sidesheet-card, #first-pipeline-load-page-spinner-blocker, #promise-background-container.background-normal, .huc-v2-pinned-order-row-with-divider, #huc-v2-order-row-items, #huc-v2-order-row-messages, tr, .informationrow, .a-popover-wrapper, #iv-tab-view-container .iv-box, #iv-tab-view-container #ivTitle, #iv-tab-view-container #ivTitle360, div[class="imageInformation"], .FS-CLP-desktop-page-container, .style__itemInfo__2OAi_ .style__price__t2tde .style__buyPrice__huLLk, .style__buyPrice__61xrU, .style__productTile__bsdg9.style__fixedHeight__gPGi3.style__small__2OLB6 .style__text__3tb3I, .style__productTile__bsdg9.style__fixedHeight__gPGi3.style__small__2OLB6 .style__title__vZv_h, .style__itemInfo__2OAi_ .style__featureBullets__1BoLb>ul>li>span, .style__itemOuter__2dxew, .style__showcase__1__I9, .style__navBar__2NVns>.style__navList__Igck2 .style__subnav__2KYpr, .style__navigation__FMWJE .style__navItem__3rEc7 button, .style__navBar__2NVns>.style__navList__Igck2>.style__navItem__3rEc7, .style__tile__OEwwB, .stores-page, .style__row__3wS8d, .style__left__cCjn1 .style__navArea__jlY6Q, .nav-timeline-item, #nav-timeline.nav-timeline-asin-title-enabled .nav-timeline-img-holder, .nav-timeline-asin-title, .bap-yourorders-container, .a-alert-success .a-alert-container, .a-alert-warning .a-alert-container, ._buy-again-grid-desktop_desktopGridAsinInfoStyle_gridElement__GVqDw, ._buy-again-carousel-desktop_style_almCarouselDesktop__3p6hO, .a-form-actions, #dp, .a-cardui, ol .a-list-item, ul .a-list-item, .notouch ul.order-level-item-summary-list li div, div[role="main"], .a-container, .a-box-group>.a-box, .a-box .a-divider.a-divider-section .a-divider-inner:after, .a-color-base-background .a-divider.a-divider-section .a-divider-inner:after, .a-divider.a-divider-section .a-divider-inner:after, #navbar #nav-flyout-ewc .nav-flyout-body, .a-expander-partial-collapse-header, #ewc-compact-body, .ewc-compact-head, .a-popover-header, .w-popover-header, .w-success-msg span, .merchbarW .shoveler-title .span, .merchbarW .shovHeader, .w-uwl span, .w-box, .a-popover-inner, .a-box .a-divider.a-divider-section .a-divider-inner, .a-color-base-background .a-divider.a-divider-section .a-divider-inner, .a-divider.a-divider-section .a-divider-inner, .a-alert-info .a-alert-container, .aplus-v2 th.apm-tablemodule-keyhead, .aplus-v2 .apm-tablemodule-valuecell.selected, .a-section, #prodDetails #SalesRank ul li span.zg_hrsr_ladder, #prodDetails #SalesRank ul li span.zg_hrsr_rank, #prodDetails .wrapper, #prodDetails td, .gw-card-layout .a-cardui, .gw-card-layout .desktop-row>div, #rhf .rhf-border, .a-ordered-list .a-list-item, .nav-tpl-discoveryPanelList .nav-text, .nav-tpl-discoveryPanelSummary .nav-text, .nav-tpl-itemList .nav-text, #navFooter.navLeftFooter, .a-unordered-list .a-list-item, ol .a-list-item, .aplus-v2 .apm-sidemodule, .nav-flyout, #productDescription, .a-box, #nav-subnav.spacious, #nav-subnav.spacious .nav-a.nav-active .nav-a-content, .vse-related-videos-container .vse-video-title, table.a-keyvalue th, #nav-subnav.spacious .nav-a:hover .nav-a-content, .a-accordion .a-accordion-active .a-accordion-inner, #nav-subnav .nav-a, #quickPromoBucketContent .content ul li, .a-profile-name, #rhf #rhf-shoveler, .a-unordered-list, ul, .s-desktop-content, #nav-subnav, .s-desktop-toolbar {background-color: #222 !important; background: #222 !important; color: #ddd !important;}');
GM_addStyle('th {color: black !important;}');

GM_addStyle('.FS-CLP-desktop-page-container, div[id="content"], #yourOrdersContent {margin: -10px !important; border: 10px solid #222 !important;}');
GM_addStyle('.a-price[data-a-size=m] .a-price-symbol, .a-price[data-a-color=base] {color: #d81cc9 !important;}');

// Invert Filter
GM_addStyle('.s-result-list-placeholder .a-spinner, img[id="itemDragIcon_IPNG8TIQX8O45"], img[alt="Place Your Order - Amazon.com Checkout"], .a-checkbox label, .a-radio label, .a-color-tertiary, .a-price, .g-transparent, .displayAddressLI, img[alt="Select a Shipping Address - Amazon.com Checkout"], div[alt="Select Shipping Options - Amazon.com Checkout"], img[src="https://images-na.ssl-images-amazon.com/images/G/01/checkout/payselect/progressbar-payments._CB485941318_.gif"] {filter: invert(1) !important;}');

//GM_addStyle('.a-color-base, .a-color-tertiary{filter: drop-shadow(0px 0px 0px white) brightness(100) !important;}');

GM_addStyle('#navbar[data-template=layoutSwapToolBar].layout2 #nav-belt {background: #1b1321 !important;}');
GM_addStyle('#navbar.nav-bluebeacon #nav-main, #navFooter.navLeftFooter .navFooterDescLine, #navFooter.navLeftFooter .navFooterCopyright {background: #32233e !important;}');

GM_addStyle('table.a-bordered tr:nth-child(even), .wl-list.selected, ul.a-tabs .a-tab-heading.a-active a, ul.a-tabs li.a-active a, .g-item-sort-action {background: #333 !important; color: #ddd !important;}');
GM_addStyle('table.a-bordered tr:nth-child(odd) {background: #222 !important; color: #ddd !important;}');
GM_addStyle('.comparison_table tr:nth-child(even) td.comparison_baseitem_column {background: #2b2339 !important; color: #ddd !important;}');
GM_addStyle('.comparison_table tr:nth-child(odd) td.comparison_baseitem_column {background: #2c1d47 !important; color: #ddd !important;}');

GM_addStyle('a, a:active, a:link, a:visited {color: #2bceff !important;}');

GM_addStyle('#squished-desktop-row .desktop-row, .gw-card-layout .desktop-row>div {border-right: none !important; width: 100% !important;}');

GM_addStyle('#deliveredAddress-container .lastReached .milestone-primaryMessage, #progressTracker-container .lastReached .milestone-primaryMessage, #deliveredAddress-container .reached .milestone-primaryMessage, #progressTracker-container .reached .milestone-primaryMessage {color: #009cb3 !important;}');

waitForKeyElements ('.a-color-alternate-background', OverrideBackground, 0);
waitForKeyElements ('.a-color-base-background', OverrideBackground, 0);
waitForKeyElements ('.a-color-base', OverrideBackground, 0);
waitForKeyElements ('.a-color-secondary, .a-color-tertiary', OverrideBackground, 0);
    function OverrideBackground (jnode) {
        jnode.attr("style", "background-color: #222222 !important; color: #ddd !important");
    }

