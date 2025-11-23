// ==UserScript==
// @name         Amazon Darkmode
// @version      1.1.9.6
// @author       GentlePuppet
// @description  Turns Amazon into Darkmode, probably a bit buggy but that's just how it be.
// @match        https://www.amazon.com/*
// @match        *amazon*
// @icon         https://store-images.s-microsoft.com/image/apps.55760.13510798887500513.d2cc5d6f-e9f4-4850-a5d6-bbd7976d6c2d.ed4ef02c-b3d1-497d-8297-1a54e79abfad?mode=scale&q=90&h=200&w=200&background=%230078D7
// @updateURL    https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Amazon%20Darkmode/Amazon%20Darkmode.user.js
// @downloadURL  https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Amazon%20Darkmode/Amazon%20Darkmode.user.js
// @run-at       document-start
// @grant        GM_addStyle
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @require      https://raw.githubusercontent.com/GentlePuppet/waitForElement/refs/heads/main/waitForElement.js
// ==/UserScript==
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js


// Sky Background
GM_addStyle('body, #pageContent {color: #ddd !important; background-color: #222 !important; background: #222 !important; /* background-image: url(https://opengameart.org/sites/default/files/Starbasesnow.png) !important; background-repeat: repeat !important; background-size: fit-width !important; background-position: center !important; */}');

// Primary Dark Background With Light Text
GM_addStyle(`
    .a-color-base, .checkout-card-color, .ya-card__heading--rich, .displayAddressDiv .displayAddressUL li, .category-section, #hmenu-container #hmenu-canvas #hmenu-content .hmenu .hmenu-item.hmenu-title,
    .StrikeThroughPrice__strikePrice__2eZBe,.StrikeThroughPrice__percentageOff__17rrs, .ProductGridItem__reviewCount__2hIGr,
    .EditorialTile__tile__3UtFX, .ProductShowcase__showcase__c0Nex, .EditorialTileProduct__productTile__1BayO.EditorialTileProduct__fixedHeight__3drS4.EditorialTileProduct__small__lJFF2 .EditorialTileProduct__text__23PVP,
    .EditorialTileProduct__productTile__1BayO.EditorialTileProduct__fixedHeight__3drS4.EditorialTileProduct__small__lJFF2 .EditorialTileProduct__title__3MhlR,
    .ProductShowcase__itemInfo__3bkIC .ProductShowcase__featureBullets__33fvB ul>li>span,.ProductShowcase__itemInfo__3bkIC .ProductShowcase__delivery__2VBJo .ProductShowcase__deliveryPromise__3J-mQ,
    .ProductShowcase__itemInfo__3bkIC .ProductShowcase__price__2tkra .ProductShowcase__percentageOff__2Gkl5, .ProductShowcase__itemInfo__3bkIC .ProductShowcase__price__2tkra .ProductShowcase__pricePerUnit__3oZgv,
    .ProductShowcase__itemInfo__3bkIC .ProductShowcase__price__2tkra .ProductShowcase__strikePrice__1rmzj, .Header__left__3CRg_ .Header__navArea__2dJRo, #a-page, .GridFilters-module__gridFilterSection_36xNFAVppWfx4i4otzVc2Y,
    .a-alert-inline-info .a-alert-container, a.a-link-section-expander, .a-ordered-list li, .a-unordered-list li, ol li, ul li, .a-unordered-list li, ul li, #text, #attach-desktop-sideSheet div.attach-sidesheet-card,
    #first-pipeline-load-page-spinner-blocker, #promise-background-container.background-normal, .huc-v2-pinned-order-row-with-divider, #huc-v2-order-row-items, #huc-v2-order-row-messages, tr, .informationrow,
    .a-popover-wrapper, #iv-tab-view-container .iv-box, #iv-tab-view-container #ivTitle, #iv-tab-view-container #ivTitle360, div[class="imageInformation"], .FS-CLP-desktop-page-container,
    .style__itemInfo__2OAi_ .style__price__t2tde .style__buyPrice__huLLk, .style__buyPrice__61xrU, .style__productTile__bsdg9.style__fixedHeight__gPGi3.style__small__2OLB6 .style__text__3tb3I,
    .style__productTile__bsdg9.style__fixedHeight__gPGi3.style__small__2OLB6 .style__title__vZv_h, .style__itemInfo__2OAi_ .style__featureBullets__1BoLb>ul>li>span, .style__itemOuter__2dxew, .style__showcase__1__I9,
    .style__navBar__2NVns>.style__navList__Igck2 .style__subnav__2KYpr, .style__navigation__FMWJE .style__navItem__3rEc7 button, .style__navBar__2NVns>.style__navList__Igck2>.style__navItem__3rEc7, .style__tile__OEwwB, .stores-page, .style__row__3wS8d,
    .style__left__cCjn1 .style__navArea__jlY6Q, .nav-timeline-item, #nav-timeline.nav-timeline-asin-title-enabled .nav-timeline-img-holder, .nav-timeline-asin-title, .bap-yourorders-container, .a-alert-success .a-alert-container, .a-alert-warning .a-alert-container,
    ._buy-again-grid-desktop_desktopGridAsinInfoStyle_gridElement__GVqDw, ._buy-again-carousel-desktop_style_almCarouselDesktop__3p6hO, .a-form-actions, #dp, .a-cardui, ol .a-list-item, ul .a-list-item, .notouch ul.order-level-item-summary-list li div,
    div[role="main"], .a-container, .a-box-group>.a-box, .a-box .a-divider.a-divider-section .a-divider-inner:after, .a-color-base-background .a-divider.a-divider-section .a-divider-inner:after, .a-divider.a-divider-section .a-divider-inner:after,
    #navbar #nav-flyout-ewc .nav-flyout-body, .a-expander-partial-collapse-header, #ewc-compact-body, .ewc-compact-head, .a-popover-header, .w-popover-header, .w-success-msg span, .merchbarW .shoveler-title .span, .merchbarW .shovHeader, .w-uwl span,
    .w-box, .a-popover-inner, .a-box .a-divider.a-divider-section .a-divider-inner, .a-color-base-background .a-divider.a-divider-section .a-divider-inner, .a-divider.a-divider-section .a-divider-inner, .a-alert-info .a-alert-container,
    .aplus-v2 th.apm-tablemodule-keyhead, .aplus-v2 .apm-tablemodule-valuecell.selected, .a-section, #prodDetails #SalesRank ul li span.zg_hrsr_ladder, #prodDetails #SalesRank ul li span.zg_hrsr_rank, #prodDetails .wrapper, #prodDetails td,
    .gw-card-layout .a-cardui, .gw-card-layout .desktop-row>div, #rhf .rhf-border, .a-ordered-list .a-list-item, .nav-tpl-discoveryPanelList .nav-text, .nav-tpl-discoveryPanelSummary .nav-text, .nav-tpl-itemList .nav-text, #navFooter.navLeftFooter,
    .a-unordered-list .a-list-item, ol .a-list-item, .aplus-v2 .apm-sidemodule, #productDescription, .a-box, #nav-subnav.spacious, #nav-subnav.spacious .nav-a.nav-active .nav-a-content, .vse-related-videos-container .vse-video-title,
    table.a-keyvalue th, #nav-subnav.spacious .nav-a:hover .nav-a-content, .a-accordion .a-accordion-active .a-accordion-inner, #nav-subnav .nav-a, #quickPromoBucketContent .content ul li, .a-profile-name, #rhf #rhf-shoveler, .a-unordered-list, ul,
    .s-desktop-content, #nav-subnav, .s-desktop-toolbar, .a-button, .a-button .a-button-text, .a-box .a-divider.a-divider-break h5, .a-color-base-background .a-divider.a-divider-break h5, .a-divider.a-divider-break h5, #navbar.nav-bluebeacon #nav-hamburger-menu .hm-icon-label,
    .nav-coreFlyout, .needs-based-layout-main-box, .flyout-ai-ingress-header-text, textarea, .a-row .a-span12, .a-ws .a-row .a-ws-span12
    {background-color: #222 !important; background: #222 !important; color: #ddd !important;}
`);


// Black Text
GM_addStyle('th {color: black !important;}');

// Invert Filter
GM_addStyle(`
    .awl-ul-share-icon, .lists-desktop-rio-icons, .awl-ul-item-grab, .switch-list, .switch-grid, #navbar.layout2 #nav-xshop-container #nav-xshop .nav-ul .nav-li .nav-div .nav-flyout-button,
    .s-result-list-placeholder .a-spinner, img[id="itemDragIcon_IPNG8TIQX8O45"], img[alt="Place Your Order - Amazon.com Checkout"], .a-accordion .a-accordion-row,
    .a-checkbox label, .a-radio label, .a-price, .g-transparent, img[alt="Select a Shipping Address - Amazon.com Checkout"], .s-suggestion-container .s-suggestion,
    div[alt="Select Shipping Options - Amazon.com Checkout"], img[src="https://images-na.ssl-images-amazon.com/images/G/01/checkout/payselect/progressbar-payments._CB485941318_.gif"]
    {filter: invert(1) !important;}
/* ---- Small Invert ---- */
    .a-search input, #navbar.nav-flex #nav-belt #nav-search .nav-searchbar, #navbar.nav-flex #nav-belt #nav-search .nav-searchbar .nav-fill, .a-icon-close
    #navbar.nav-flex #nav-belt #nav-search .nav-searchbar .nav-search-field, #nav-flyout-iss-anchor .nav-issFlyout, .cards_carousel_widget-sug-image
    {filter: invert(0.9) !important;}
`);

// Misc Special Case
GM_addStyle(`
    .FS-CLP-desktop-page-container, div[id="content"], #yourOrdersContent {margin: -10px !important; border: 10px solid #222 !important;}

    .a-price[data-a-size=m] .a-price-symbol, .a-price[data-a-color=base] {color: #d81cc9 !important;}

    #navbar-main #navbar #nav-belt, #navbar[data-template=layoutSwapToolBar].layout2 #nav-belt {background: #1b1321 !important;}

    .list-address-selected, #navbar.nav-bluebeacon #nav-main, #navFooter.navLeftFooter .navFooterDescLine, #navFooter.navLeftFooter .navFooterCopyright {background: #32233e !important;}

    table.a-bordered tr:nth-child(even), .wl-list.selected, ul.a-tabs .a-tab-heading.a-active a, ul.a-tabs li.a-active a, .g-item-sort-action {background: #333 !important; color: #ddd !important;}

    table.a-bordered tr:nth-child(odd) {background: #222 !important; color: #ddd !important;}

    .comparison_table tr:nth-child(even) td.comparison_baseitem_column {background: #2b2339 !important; color: #ddd !important;}

    .comparison_table tr:nth-child(odd) td.comparison_baseitem_column {background: #2c1d47 !important; color: #ddd !important;}

    a, a:active, a:link, a:visited, .ProductShowcase__itemInfo__3bkIC .ProductShowcase__price__2tkra .ProductShowcase__buyPrice__1BCIh,.ProductGridItem__buyPrice__6DIeT {color: #2bceff !important;}

    #squished-desktop-row .desktop-row, .gw-card-layout .desktop-row>div {border-right: none !important; width: 100% !important;}');

    #navbar.layout2.bold-focus-hover.nav-bluebeacon #nav-search .nav-searchbar:hover {-webkit-box-shadow: 0 2px 6px 0 #ffffff !important;-moz-box-shadow: 0 2px 6px 0 #fff !important;box-shadow: 0 2px 6px 0 #ffffff !important;}

    .order-card .delivery-box__secondary-text, .order-card .delivery-box__primary-text,#deliveredAddress-container .lastReached .milestone-primaryMessage,
    #progressTracker-container .lastReached .milestone-primaryMessage, #deliveredAddress-container .reached .milestone-primaryMessage, #progressTracker-container .reached .milestone-primaryMessage {color: #009cb3 !important;}
`);

// Forced Overrides
waitForKeyElements('.a-color-alternate-background', OverrideBackground, 0);
waitForKeyElements('.a-color-base-background', OverrideBackground, 0);
waitForKeyElements('.a-color-base', OverrideBackground, 0);
waitForKeyElements('.a-color-secondary, .a-color-tertiary', OverrideBackground, 0);
waitForKeyElements('.a-box.a-color-alternate-background, .a-box.a-color-offset-background, .sc-background-dark', OverrideBackground, 0);
waitForKeyElements('.checkout-card-color', OverrideBackground, 0);
waitForKeyElements('#nav-holiday', OverrideBackground, 0);
waitForKeyElements('#security-blurb', OverrideBackground, 0);
function OverrideBackground (jnode) {
    jnode.attr("style", "background-color: #222222 !important; color: #ddd !important");
}

