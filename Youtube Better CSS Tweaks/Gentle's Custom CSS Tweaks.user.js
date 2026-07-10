// ==UserScript==
// @name         Youtube Gentle's Custom CSS Tweaks
// @author       GentlePuppet
// @description  Gentle's Youtube Script
// @version      0.3.0.1
// @include      https://www.youtube.com/*
// @icon         data:image/png;base64,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
// @updateURL    https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/refs/heads/main/Youtube%20Better%20CSS%20Tweaks/Gentle's%20Custom%20CSS%20Tweaks.user.js
// @downloadURL  https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/refs/heads/main/Youtube%20Better%20CSS%20Tweaks/Gentle's%20Custom%20CSS%20Tweaks.user.js
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require      https://raw.githubusercontent.com/sizzlemctwizzle/GM_config/master/gm_config.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// ==/UserScript==
/* eslint-disable no-lone-blocks, no-multi-spaces */
/* globals $, waitForKeyElements, GM_config*/

// Cleaner wrapper for waitForKeyElements
function Wait(selector, callback, once = 0) {return waitForKeyElements(selector, callback, once);}


// General CSS Overrides
const style = () => {const stylesheet = `
/* Shrink the shit Delhi UI */
    .html5-video-player {--yt-delhi-pill-height: 32px !important;--yt-delhi-pill-top-height: 4px !important;--yt-delhi-bottom-controls-height: 41px !important;--yt-delhi-big-mode-pill-height: 32px !important;--yt-delhi-big-mode-pill-top-height: 4px !important;--yt-delhi-big-mode-bottom-controls-height: 41px !important;}
    .ytp-play-button {width: 36px !important;height: 36px !important;margin-top: 3px !important;margin-left: 12px !important;}
    .ytp-play-button svg {width: 24px !important;height: 24px !important;padding: 6px !important;}
    .ytp-button, .ytp-time-display {font-size: 10pt !important;}
    .ytp-scrubber-button {transform: scale(0.5);}
    .ytp-progress-bar-container:hover .ytp-scrubber-button {transform: scale(0.75) !important;}
    .ytp-scrubber-button-hover {transform: scale(0.75) !important;}
    .ytp-volume-slider {min-height: 32px !important;height: 32px !important;}
    .ytp-chrome-controls .ytp-button, .ytp-time-wrapper, .ytp-volume-area, .ytp-chrome-controls .ytp-right-controls {background: transparent !important;}

/* Better Sub Page */
    [page-subtype="subscriptions"] #avatar-container.ytd-rich-grid-media {margin-right: 0px !important;}
    [page-subtype="subscriptions"] #meta.ytd-rich-grid-media {padding-right: 18px !important;}
    [page-subtype="subscriptions"] #video-title.ytd-rich-grid-media {font-size: 1.3rem !important}
    [page-subtype="subscriptions"] .yt-content-metadata-view-model--medium-text .yt-content-metadata-view-model__metadata-text {font-size: 1.1rem !important;}
    [page-subtype="subscriptions"] .yt-lockup-metadata-view-model--standard.yt-lockup-metadata-view-model--rich-grid-legacy-typography .yt-lockup-metadata-view-model__title {font-size: 1.3rem !important;}
    [page-subtype="subscriptions"] .yt-lockup-metadata-view-model__avatar {display: none !important;}
    [page-subtype="subscriptions"] .yt-spec-avatar-shape--avatar-size-medium {width: 25px !important;height: 25px !important;}
    [page-subtype="subscriptions"] h3.ytd-rich-grid-media {margin: 5px 0 0px 0 !important;}
    [page-subtype="subscriptions"] ytd-rich-item-renderer {margin-left: 0px !important;margin-right: 5px !important;margin-bottom: 5px !important;width: 200px !important;}
    [page-subtype="subscriptions"] ytd-rich-item-renderer[rendered-from-rich-grid] {background: #00000099;border: 2px #0000005c solid;padding: 5px;}
    [page-subtype="subscriptions"] ytd-video-meta-block[rich-meta] #byline-container.ytd-video-meta-block, ytd-video-meta-block[rich-meta] #metadata-line.ytd-video-meta-block {font-size: 1.1rem !important}

 /* - Move avatar down and make title bigger - */
    [page-subtype="subscriptions"] .ytDecoratedAvatarViewModelHost {margin-top: 140%;}
    [page-subtype="subscriptions"] .ytAvatarStackViewModelTappable {margin-top: 160%;}
    [page-subtype="subscriptions"] .ytLockupMetadataViewModelHeadingReset {margin-left: -30%;}
    [page-subtype="subscriptions"] .ytLockupMetadataViewModelMetadata {margin-top: auto;}

/* Better Channel Page */
    [page-subtype="channels"] .style-scope.ytd-browse.grid.grid-6-columns {margin-bottom: 16px; margin: 0px 50px 0px 50px;}
    [page-subtype="channels"] ytd-rich-item-renderer[rendered-from-rich-grid] {margin-left: 0px !important; margin-right: 5px !important; margin-bottom: 5px !important; width: 200px !important; background: #00000099; border: 2px #0000005c solid; padding: 5px;}

/* Wider Video - Smaller Recommended */
    div#primary.ytd-watch-flexy {
        width: 100% !important;
    }
    #secondary.ytd-watch-flexy {
        width: 20% !important;
    }

/* Move Recommended Menu Button to Middle */
    .ytLockupMetadataViewModelMenuButton.ytLockupMetadataViewModelBottomRight {
        position: absolute !important;
        /*top: unset !important;*/
        /*bottom: unset !important;*/
        align-self: center !important;
    }

/* Hover for Full Title */
    .yt-lockup-metadata-view-model-wiz--compact:hover, .yt-lockup-metadata-view-model-wiz__title:hover {overflow: visible; min-height: fit-content; height: fit-content; text-overflow: clip; display: block;}

/* Wider/Bigger Stats for Nerds */
    .html5-video-info-panel{width: 850px !important; font-size: 15px !important; opacity: 75% !important;}
    .ytp-horizonchart, .ytp-horizonchart > canvas{width: 400px !important;}
    .html5-video-info-panel-close{right: 40px !important; height: 50px !important; width: 50px !important; text-align: center !important; font-size: 50px !important; font-family: Consolas !important;}

/* Video Duration Number */
    ytd-thumbnail-overlay-time-status-renderer {top: 0px;}

/* Watched Videos */
    #Watched_Playlist_Video {Opacity: 80%; background: #271b38;}
    #Watched_Playlist_Video > a > div > #thumbnail-container > ytd-thumbnail > #thumbnail > yt-img-shadow > img {Opacity: 40%; }

/* Video Borders */
    ytd-grid-video-renderer {border: 2px solid var(--yt-spec-brand-background-secondary2); padding: 5px;}
    ytd-compact-video-renderer {border: 2px solid var(--yt-spec-brand-background-secondary2); padding: 5px;}
    [class*="ytd-watch-next"] .yt-lockup-view-model--wrapper {background: #00000099; border: 2px #0000005c solid; padding: 5px; margin-bottom: 2px !important;}

/* Comments */
    ytd-comment-thread-renderer:not(:first-child) {margin-bottom: 2px !important;border-top: 1px solid rebeccapurple !important;padding-top: 10px !important;}
    .ytGhostCommentsComments {margin-bottom: -100px;}
    .ytGhostCommentsGhostCard:not(:first-child) {display: none;}

/* Transcript */
    #header.ytd-engagement-panel-title-header-renderer::before {
        content: Transcript;
        font-size: medium;
    }
    #header.ytd-engagement-panel-title-header-renderer, .ytwMacroMarkersPanelItemViewModelHost:hover, #content.ytd-engagement-panel-section-list-renderer {
        background-color: var(--gp-dark-purple) !important;
    }

/* Smaller Sidebar */
   * {--sidebar-width: 160px}
   ytd-app[guide-persistent-and-visible] ytd-page-manager.ytd-app {margin-left: var(--sidebar-width) !important;}
   #contentContainer.tp-yt-app-drawer[swipe-open], #contentContainer.tp-yt-app-drawer[opened], tp-yt-app-drawer[opened], #guide-inner-content.ytd-app, ytd-guide-renderer.ytd-app, ytd-guide-entry-renderer {width: var(--sidebar-width) !important;}
   ytd-guide-section-renderer {width: var(--sidebar-width) !important; padding-left: 0px !important; padding-right: 0px !important;}
   .guide-icon.ytd-guide-entry-renderer {display: inline-flex !important;}
   .title.ytd-guide-entry-renderer {overflow: visible !important;}
   .guide-icon.ytd-guide-entry-renderer {width: fit-content; margin-right: 0px !important;}
   yt-img-shadow.ytd-guide-entry-renderer {margin-right: 0px !important;}
   .title.ytd-guide-entry-renderer {margin-left: 5px !important;}
   ytd-playlist-video-renderer[can-reorder]:hover #reorder.ytd-playlist-video-renderer, ytd-playlist-video-renderer[persistent-drag-handle] #reorder.ytd-playlist-video-renderer {margin: 0px -18px 0px -7px !important;}

   ytd-browse[page-subtype=playlist] ytd-playlist-header-renderer.ytd-browse,
   ytd-browse[page-subtype=playlist] .page-header-sidebar.ytd-browse,
   ytd-browse[has-page-header-sidebar] ytd-playlist-header-renderer.ytd-browse,
   ytd-browse[has-page-header-sidebar] .page-header-sidebar.ytd-browse {margin-left: -60px !important;}

/* Rearranged Things */ /* Good fucking luck, I should have labeled this shit better */
    ytd-compact-autoplay-renderer, #playlist.ytd-watch-flexy {margin-bottom: 15px !important; padding-bottom: 0px !important;}
    #gridtube_title_container {top: 35px !important; height: 25px !important; z-index: 500 !important;}
    #ytpc_ytcontrol_container {margin: auto !important; height: 100% !important; width: 100% !important;}
    #info.ytd-video-primary-info-renderer {margin-top: -10px !important;}
    ytd-menu-renderer.ytd-video-primary-info-renderer {margin-right: 30px !important;}
    ytd-video-primary-info-renderer {padding: 10px 0 8px 0 !important;}
    #items.ytd-grid-renderer > ytd-grid-channel-renderer.ytd-grid-renderer {margin-right: 5px !important; display: inline-block !important; width: 120px !important; margin-bottom: 5px !important;}
    #subscribe.ytd-grid-channel-renderer {display: none !important;}
    ytd-menu-renderer:not([condensed]) .ytd-menu-renderer[button-renderer] + .ytd-menu-renderer[button-renderer], .ytd-menu-renderer[button-renderer] + template.ytd-menu-renderer + #button.ytd-menu-renderer, #top-level-buttons.ytd-menu-renderer:not(:empty) + #button.ytd-menu-renderer {margin-left: 0px !important;}
    ytd-compact-movie-renderer {display: none !important;}
    ytd-continuation-item-renderer.ytd-comment-replies-renderer {padding-bottom: 35px !important;}
    ytd-continuation-item-renderer{margin-top:0px !important;}
    .spinner-layer.tp-yt-paper-spinner{opacity:0 !important;visibility: hidden;}
    .ytp-progress-list {background: rgba(255,255,255,0.4); box-shadow: black 0px 0px 10px 1px !important;}
    .ytp-load-progress {background: rgba(255,255,255,0.6) !important;}
    .ytp-button, .ytp-time-current, .ytp-time-separator, .ytp-time-duration, ytp-chapter-title-prefix, .ytp-chapter-title-content {text-shadow: -1px -1px 2px #000, 1px -1px 2px #000, -1px 1px 2px #000, 1px 1px 2px #000 !important;}
    ytd-watch-flexy[theater] #player-theater-container.ytd-watch-flexy {padding-bottom: 5px !important;}
    #metadata-line.ytd-video-meta-block {max-width: 200px !important; width: 200px !important;}
    .ryd-tooltip-new-design{width: 220px !important;}
    #container.ytd-searchbox{margin-left:0px !important;}
    ytd-item-section-renderer.ytd-watch-next-secondary-results-renderer{margin-bottom: 50px;}
    ytd-video-description-transcript-section-renderer{padding: 0px !important;}

/* - Rearrange Playlist to Make it More Compact - */
 /* - Playlist Header - */
    div#header-contents.ytd-playlist-panel-renderer {grid-template-columns: auto auto;display: grid;}
    div#header-description.ytd-playlist-panel-renderer {max-width: fit-content; order: 2; margin: 0px 5px 0px 5px; color: white !important;}
    div#publisher-container.ytd-playlist-panel-renderer {justify-content: center;}
    div#trailing-button.ytd-playlist-panel-renderer {order: 1}
    div#playlist-actions.ytd-playlist-panel-renderer {justify-content: right; align-items: center;}
    div#start-actions.ytd-playlist-panel-renderer {max-width: fit-content;}
    div#header-description.ytd-playlist-panel-renderer, #next-video-title.ytd-playlist-panel-renderer, .byline-title.ytd-playlist-panel-renderer, .publisher.ytd-playlist-panel-renderer, .index-message-wrapper.ytd-playlist-panel-renderer {color: white !important;}

 /* - All Playlist Listed Items - */
    ytd-playlist-panel-renderer[collapsible] .header.ytd-playlist-panel-renderer {padding: 5px 16px 5px 5px;}
    .playlist-items.ytd-playlist-panel-renderer {overflow-x: hidden; padding: 3px 0px 3px 0px; scrollbar-width: none !important;}

 /* - Individual Playlist Items - */
    ytd-thumbnail-overlay-resume-playback-renderer {border-top: 2px var(--gp-black-purple) solid;}
    ytd-playlist-panel-video-renderer {height: 60px; margin: 1px 0px !important; padding: 0px !important;}
    #container.ytd-playlist-panel-video-renderer, #index-container.ytd-playlist-panel-video-renderer, #thumbnail-container.ytd-playlist-panel-video-renderer, #meta.ytd-playlist-panel-video-renderer {height: 60px; padding: 0px !important;}
    #meta.ytd-playlist-panel-video-renderer {justify-content: center; margin-left: 5px;}
    #video-title.ytd-playlist-panel-video-renderer {margin: 0px; position: relative; z-index: 0;}

 /* - Playlist Items Bigger Brab Area - */
    #index-container.ytd-playlist-panel-video-renderer{padding-right: 100px !important; z-index:1 !important; cursor: grab !important;}
    #thumbnail-container.ytd-playlist-panel-video-renderer{margin-left: -100px !important; z-index:0 !important;}
    #index-container.ytd-playlist-video-renderer{padding-right: 150px !important; z-index:1 !important; cursor: grab !important;}
    #content.ytd-playlist-video-renderer{margin-left: -150px !important; z-index:0 !important;}
    a.yt-simple-endpoint.ytd-playlist-panel-video-renderer{min-width: 100% !important; max-width: 100% !important; z-index: 0;}

 /* - Playlist Items Menu Button - */
    #menu.ytd-playlist-panel-video-renderer {z-index: 999; position: absolute; opacity: 0; right: 25px; align-self: center;}
    #menu.ytd-playlist-panel-video-renderer:hover {opacity: 1; background: var(--gp-lightdark-purple);}

 /* - Smaller Recommended Videos - */
    .ytLockupViewModelHorizontal.ytLockupViewModelCompact .ytLockupViewModelContentImage {
        padding-right: 8px;
        width: 40% !important;
        height: auto;
    }

/* Purple Dark Theme */
 /* - No Rounded Borders. Ever. - */
    * { border-radius: 0px !important;}

 /* - Header Logo - */
    .ytIconWrapperHost.ytd-logo, yt-icon.ytd-logo {
        padding-left: 0px !important;
        padding-right: 0px !important;
    }

 /* - Main site background - */
    ytd-app {
        background: var(--gp-black-purple) !important;
    }

 /* - Watchpage - */
    div#primary.ytd-watch-flexy {
        border-right: 1px solid var(--gp-header-purple-outline);
        margin-right: 15px;
    }

 /* - Menu Buttons Hover - */
    .ytListItemViewModelTappable:hover,
    tp-yt-paper-item.ytd-menu-navigation-item-renderer:hover {
        background-color: var(--gp-lightdark-purple) !important;
    }

 /* - Sidebar Header - */
    #header.ytd-app{
        padding-left: 0px !important;
    }

 /* - Sidebar Active Item - */
    ytd-guide-entry-renderer[active] {
        background-color: var(--gp-lightdark-purple) !important;
    }

 /* - Sidebar Hover Items - */
    #endpoint.yt-simple-endpoint.ytd-guide-entry-renderer:focus,
    #endpoint.yt-simple-endpoint.ytd-guide-entry-renderer:hover {
        background-color: var(--gp-dark-purple) !important;;
    }

 /* - Sidebar Borders - */
    #guide-inner-content.ytd-app {
        border-right: 1px solid var(--gp-header-purple-outline) !important;
    }
    #guide-content #header {
        background: var(--gp-lightdark-purple);
        border-bottom: 1px solid var(--gp-header-purple-outline) !important;
        border-top: 1px solid var(--gp-header-purple-outline) !important;
    }
    #sections.ytd-guide-renderer>.ytd-guide-renderer:first-child {
        padding: 12px;
    }

 /* - Youtube Header Banner - */
    #container.ytd-masthead {
        border-top: 1px solid var(--gp-header-purple-outline) !important;
        border-bottom: 1px solid var(--gp-header-purple-outline) !important;
        background: var(--gp-lightdark-purple) !important;
    }

 /* - Playlist Headers - */
    ytd-playlist-panel-renderer[collapsible] .header.ytd-playlist-panel-renderer,
    .yt-list-item-view-model__container--tappable:hover {
        border-bottom: 1px solid var(--gp-header-purple-outline) !important;
        background: var(--gp-lightdark-purple) !important;
    }

 /* - Playlist Items - */
    ytd-playlist-panel-video-renderer:hover:not(.dragging),
    ytd-playlist-panel-video-renderer[can-reorder].dragging,
    ytd-playlist-panel-video-renderer[can-reorder]:hover.dragging {
        background-color: var(--gp-dark-purple);
    }

 /* - Playlist hover for full title - */
    #meta.ytd-playlist-panel-video-renderer:hover #video-title {overflow: visible !important;max-height: fit-content !important;display: block !important;}
    #meta.ytd-playlist-panel-video-renderer:hover #byline-container {display: none;}

 /* - Reccomended Video hover for full title - */
    .ytLockupMetadataViewModelTextContainer {
        position: relative;
    }
    .ytLockupMetadataViewModelHeadingReset:hover {
        z-index: 1000;
        background: var(--gp-dark-purple);
        overflow: visible !important;
    }
    .ytLockupMetadataViewModelHeadingReset:hover
    .ytLockupMetadataViewModelTitle,
    .ytLockupMetadataViewModelHeadingReset:hover
    .ytAttributedStringHost {
        display: block !important;
        overflow: visible;
        text-overflow: unset;
        white-space: break-spaces;
        -webkit-line-clamp: unset;
        background: var(--gp-dark-purple);
    }

 /* - Menus - */
    tp-yt-paper-listbox#items {
        padding: 0px;
        border: 1px solid var(--gp-dark-purple);
        box-sizing: border-box;
        width: 204px;
        overflow-x: clip;
    }
    ytd-menu-popup-renderer,
    .ytContextualSheetLayoutHost {
        background-color: var(--gp-black-purple) !important;
    }
    tp-yt-paper-item.ytd-menu-service-item-renderer:hover {
        background-color: var(--gp-lightdark-purple) !important;
    }

 /* - Buttons - */
    .ytSpecButtonShapeNextMono.ytSpecButtonShapeNextTonal {
        background: var(--gp-dark-purple);
    }
    .ytLockupMetadataViewModelMenuButton {
        bottom: -10px;
        right: -4px;
        top: unset;
        opacity: 0;
    }
    .ytSpecButtonShapeNextMono.ytSpecButtonShapeNextText:hover:not(.ytSpecButtonShapeNextEnableLightTouchResponse) {
        background-color: var(--gp-lightdark-purple) !important;
    }
    .ytLockupMetadataViewModelMenuButton:hover {
        opacity: 1;
    }

 /* - Anything with borders - */
    ytd-engagement-panel-section-list-renderer,
    #sections.ytd-guide-renderer>.ytd-guide-renderer:not(:last-child),
    #container.ytd-playlist-panel-renderer,
    .continuation.ytd-comment-view-model, .ytSubThreadConnection, .ytSubThreadContinuation {
        border-color: var(--gp-header-purple-outline);
    }
    ytd-comment-view-model[hovered] .continuation.ytd-comment-view-model,
    .ytSubThreadHovered>.ytSubThreadThreadline .ytSubThreadConnection,
    .ytSubThreadHovered>.ytSubThreadThreadline .ytSubThreadContinuation,
    .ytSubThreadHovered>.ytSubThreadThreadline .ytSubThreadConnection {
        border-color: var(--gp-bright-purple) !important;
    }

  /* - Purple Colors - */
    * {
       --gp-header-purple-outline: rebeccapurple;
       --gp-black-purple: #120d17;
       --gp-lightblack-purple: #170d21;
       --gp-lightdark-purple: rgb(70 40 103 / 98%);
       --gp-light-grey: #bbb;
       --gp-dark-grey: #535353;
       --gp-dark-purple: #2c173f;
       --gp-bright-purple: #8f49ff;

       --yt-spec-10-percent-layer: var(--gp-header-purple-outline) !important;
       --yt-spec-brand-background-solid: var(--gp-black-purple) !important;
       --yt-spec-brand-background-primary: var(--gp-lightdark-purple) !important;
       --yt-spec-brand-background-secondary: var(--gp-black-purple) !important;
       --yt-spec-base-background: var(--gp-black-purple) !important;
       --yt-spec-general-background-a: var(--gp-black-purple) !important;
       --yt-spec-general-background-b: var(--gp-black-purple) !important;
       --yt-spec-general-background-c: var(--gp-black-purple) !important;
       --yt-spec-text-secondary: var(--gp-light-grey) !important;
       --yt-spec-text-disabled: var(--gp-dark-grey) !important;
       --yt-spec-badge-chip-background: var(--gp-dark-purple) !important;
       --yt-spec-brand-subscribe-button-background: var(--gp-bright-purple) !important;
       --yt-live-chat-background-color: var(--gp-black-purple) !important;
       --yt-live-chat-action-panel-background-color: var(--gp-black-purple) !important;
       --yt-live-chat-action-panel-background-color-transparent: var(--gp-lightdark-purple) !important;
       --yt-live-chat-secondary-background-color: var(--gp-black-purple) !important;
       --yt-live-chat-toast-text-color: var(--yt-white);
       --yt-live-chat-toast-background-color: var(--gp-dark-purple) !important;
       --yt-live-chat-mode-change-background-color: var(--gp-dark-purple) !important;
       --yt-live-chat-text-input-field-inactive-underline-color: var(--gp-header-purple-outline) !important;
       --yt-live-chat-text-input-field-placeholder-color: var(--gp-header-purple-outline) !important;
       --yt-live-chat-icon-button-color: var(--yt-live-chat-primary-text-color);
       --yt-live-chat-picker-button-color: var(--yt-live-chat-tertiary-text-color);
       --yt-live-chat-picker-button-active-color: var(--yt-white);
       --yt-live-chat-picker-button-disabled-color: var(--yt-live-chat-disabled-icon-button-color);
       --yt-live-chat-disabled-button-background-color: var(--gp-dark-purple) !important;
       --yt-live-chat-disabled-button-text-color: var(--yt-live-chat-secondary-text-color);
       --yt-live-chat-sub-panel-background-color: var(--gp-dark-purple) !important;
       --yt-live-chat-sub-panel-background-color-transparent: var(--gp-lightdark-purple) !important;
       --yt-live-chat-header-background-color: var(--yt-live-chat-action-panel-background-color);
       --yt-live-chat-header-button-color: var(--yt-live-chat-secondary-text-color);
       --yt-live-chat-message-highlight-background-color: var(--gp-black-purple) !important;
       --yt-live-chat-dialog-background-color: var(--gp-dark-purple) !important;
       --yt-live-chat-text-input-field-suggestion-background-color: var(--gp-header-purple-outline) !important;
       --yt-live-chat-text-input-field-suggestion-background-color-hover: var(--gp-dark-purple) !important;
       --yt-emoji-picker-search-background-color: var(--gp-dark-purple) !important;
       --yt-live-chat-slider-container-color: var(--gp-dark-purple) !important;
       --yt-live-chat-banner-gradient-scrim: linear-gradient(var(--gp-lightdark-purple), transparent);
       --yt-live-chat-action-panel-gradient-scrim: linear-gradient(to top, var(--gp-lightdark-purple), transparent);
       --yt-live-chat-shimmer-linear-gradient: linear-gradient(0deg, rgba(0, 0, 0, .1) 40%, var(--gp-dark-purple) 50%, rgba(0, 0, 0, .1) 60%);
       --yt-live-chat-vem-background-color: var(--gp-dark-purple) !important;
       --yt-live-chat-product-picker-hover-color: var(--gp-dark-purple) !important;
       --yt-dialog-background: var(--gp-black-purple) !important;
       --paper-toast-background-color: var(--gp-lightdark-purple) !important;
       --paper-dialog-background-color: var(--gp-lightdark-purple) !important;
       --yt-spec-solid-background-inverse: var(--gp-black-purple) !important;
       --yt-spec-static-black: var(--gp-black-purple) !important;
       --yt-sys-color-baseline--base-background: var(--gp-black-purple) !important;
       --yt-sys-color-baseline--overlay-solid-background-inverse: var(--gp-black-purple) !important;
       --yt-sys-color-baseline--solid-background-inverse: var(--gp-black-purple) !important;
       --yt-sys-color-baseline--static-black: var(--gp-black-purple) !important;
       --yt-sys-color-baseline--static-brand-black: var(--gp-black-purple) !important;
       --yt-spec-outline: var(--gp-header-purple-outline) !important;
       --yt-active-playlist-panel-background-color: var(--gp-dark-purple) !important;

       --yt-spec-raised-background: var(--gp-black-purple) !important;
       --yt-spec-menu-background: var(--gp-black-purple) !important;
       --yt-spec-static-brand-black: var(--gp-black-purple) !important;
       --yt-spec-additive-background: var(--gp-black-purple) !important;

       --yt-spec-10-percent-layer2: var(--gp-header-purple-outline) !important;
       --yt-spec-brand-background-solid2: var(--gp-black-purple) !important;
       --yt-spec-brand-background-primary2: var(--gp-lightdark-purple) !important;
       --yt-spec-text-secondary2: var(--gp-light-grey:) !important;
       --yt-spec-text-disabled2: var(--gp-dark-grey) !important;
       --yt-spec-badge-chip-background2: var(--gp-dark-purple) !important;
       --yt-spec-brand-subscribe-button-background2: var(--gp-bright-purple) !important;

       --Window-Height: 500px;
    }

  /* - Adjusted Ambient Mode - Ambient mode uses more resources (it puts a blurred copy of the video behind the main video to create a glow effect around the video) */
    #cinematics > div > div {
        transform: scale(2) !important;
        opacity: 0.3;
        filter: contrast(1.2) saturate(1.4) !important;
    }

  /* - Other Purple Dark Theme Things | Uncommented - */
    .ytContextualSheetLayoutHost {background-color: var(--gp-black-purple) !important;}
    #container.style-scope.ytd-video-primary-info-renderer {border-top: 1px solid var(--gp-header-purple-outline) !important;}
    #items.ytd-grid-renderer > ytd-grid-channel-renderer.ytd-grid-renderer {border: 1px solid var(--gp-header-purple-outline) !important;}
    paper-toast, ytd-guide-entry-renderer[active] {background-color: var(--gp-lightdark-purple) !important;}
    html[dark] #home-page-skeleton .skeleton-bg-color, html[dark] #guide-skeleton, .yt-spec-button-shape-next--mono.yt-spec-button-shape-next--tonal {background-color: var(--gp-dark-purple) !important;}
    html[dark] #home-container-skeleton, .yt-spec-dialog-layout {background-color: var(--gp-black-purple) !important;}
    ytd-masthead.dark .masthead-skeleton-icon {background-color: var(--gp-header-purple-outline) !important;}
    .sf-quick-dl-btn, #savefrom__yt_btn > button {line-height: 36px !important; height: 36px !important;}
    #replies :has(#expander-contents[hidden]) {border-left: none !important;}
    div#replies {margin-left: -35px !important;}
    ytd-comment-replies-renderer.style-scope.ytd-comment-thread-renderer {border-left: solid 3px var(--gp-dark-purple) !important; padding-left: 35px !important;}
    ytd-flow-step-renderer, ytd-flow-bottom-bar-renderer {background: var(--gp-black-purple);}

  /* Description */
    #description .ytAttributedStringWhiteSpacePreWrap {background: var(--gp-lightblack-purple);}
    #description.ytd-watch-metadata:hover .ytAttributedStringWhiteSpacePreWrap, #description.ytd-watch-metadata:hover {background: var(--gp-dark-purple) !important;}
    #above-the-fold {
        --yt-saturated-base-background: rgb(13 2 28) !important;
        --yt-saturated-raised-background: rgb(33 10 54) !important;
        --yt-saturated-additive-background: rgb(139 69 201 / 17%) !important;
        --yt-saturated-text-primary: rgb(240 224 250) !important;
        --yt-saturated-text-secondary: rgb(202 172 221) !important;
        --yt-saturated-inverted-background: rgb(193 124 227 !important;
        --yt-saturated-overlay-background: rgb(35 10 54 / 80%) !important;
    }
`;
                     const styleTag = document.createElement('style'); styleTag.classList.add("userscriptstyle"); styleTag.id = "Gentles-Custom-YouTube-CSS"; styleTag.textContent = stylesheet; document.body.insertAdjacentElement('afterend', styleTag);
                    }
style();

// Tampermonkey Settings Thing
const onInit = gmc => new Promise(resolve => {
    const isInit = () => setTimeout(() =>
        gmc.isInit ? resolve() : isInit(), 0);
    isInit();
});
const gmc = new GM_config({
    id: 'GentlesCustomCSSTweaks_config',
    title: 'Gentle Custom Tweaks Settings',
    fields: {
        QUALITY: {
            label: 'Preferred Quality',
            type: 'radio',
            default: '1080p',
            options: [
                '4320p',
                '2160p',
                '1440p',
                '1080p',
                '720p',
                '480p',
                '360p',
                '240p',
                '144p',
                'Auto'
            ],
            title: 'Preferred video quality.'
        },
        FORCEH264: {
            label: 'Force h264 codec',
            type: 'checkbox',
            default: true,
            title: 'Disables VP8, VP9, and AV01 video codecs from use. Forces avc1 (h264).'
        },
        FORCE30FPS: {
            label: 'Force 30FPS',
            type: 'checkbox',
            default: false,
            title: 'Disables 60fps video.'
        },
        AUTOAGREE: {
            label: 'Auto Click "I understand and wish to proceed"',
            type: 'checkbox',
            default: true,
            title: 'Auto Clicks the "I understand and wish to proceed" button for you.'
        },
        ROBOTOCONDENSED: {
            label: 'Roboto Condense Font Override',
            type: 'checkbox',
            default: true,
            title: 'Change the font of everything to Roboto Condense'
        },
        CONVERTNERDS: {
            label: 'Convert Stats for Nerds to KB/s',
            type: 'checkbox',
            default: true,
            title: "Kbps to KB/s in Stat's For Nerds"
        },
        TALLERPLAYLIST: {
            label: 'Taller Playlist',
            type: 'checkbox',
            default: true,
            title: 'Dynamically Taller Playlist that fits the page.'
        },
        TINYPLAYLISTPAGE: {
            label: 'Tiny Playlist Page',
            type: 'checkbox',
            default: true,
            title: 'Make the sorting playlist page super tiny and easier to sort for big lists.'
        },
        HIDENEWTAG: {
            label: 'Hide the [NEW] tag on videos',
            type: 'checkbox',
            default: true,
            title: 'Hides the [NEW] tag on videos in the recommended list.'
        },
        HIDE1000VIDEOS: {
            label: 'Hide videos under 1k views',
            type: 'checkbox',
            default: true,
            title: 'Remove Recommended Videos With Under 1000 Views.'
        },
        REARRANGESIDEBAR: {
            label: 'Move "You" to the top of the sidebar',
            type: 'checkbox',
            default: false,
            title: 'Moves the "You" section in the sidebar to the top, above the subscription list.'
        },
    },
    frameStyle: `
        position: fixed;
        width: 300px;
        height: 460px;
        max-width: 95vw;
        max-height: 95vh;
        overflow: auto;
        z-index: 9999;
    `,
    css: `
/* Scrollbar */
#GentlesCustomCSSTweaks_config * {scrollbar-color: #431d8b transparent; scrollbar-width: thin;}
#GentlesCustomCSSTweaks_config::-webkit-scrollbar {width: 5px; height: 5px;}
#GentlesCustomCSSTweaks_config::-webkit-scrollbar:hover {width: 15px; height: 15px;}
#GentlesCustomCSSTweaks_config::-webkit-scrollbar-thumb:hover {background-color: #fe9a05;}
/* Config Container */
#GentlesCustomCSSTweaks_config,
#GentlesCustomCSSTweaks_config * {font-family: "Segoe UI", Arial, Helvetica, sans-serif; box-sizing: border-box; background: #1b1d22}
#GentlesCustomCSSTweaks_config_wrapper {padding: 18px; border: 1px solid #9c51e7; border-radius: 10px;}
#GentlesCustomCSSTweaks_config {background: transparent; color: #e6e6e6; overflow: hidden;}
/* Headings */
#GentlesCustomCSSTweaks_config .config_header {padding: 0 0 5px 0; font-size: 28px; font-weight: 600; color: #ffffff; background: #6c409b; border: 1px solid #9c51e7; border-radius: 10px;}
#GentlesCustomCSSTweaks_config .config_desc {margin: 6px 0 18px; font-size: 13px; color: #b8bcc5; line-height: 1.5;}
/* Section */
#GentlesCustomCSSTweaks_config .section_header_holder {margin-top: 18px; margin-bottom: 10px; overflow-x: hidden; overflow-y: scroll; height: 250px; border: 1px solid #9c51e7; border-radius: 10px;}
#GentlesCustomCSSTweaks_config .section_header {background: linear-gradient(#3d5d92, #314c78); color: #fff; border: 1px solid #5376af; border-radius: 6px 6px 0 0; padding: 10px 14px; margin: 0; font-size: 17px; font-weight: 600;}
#GentlesCustomCSSTweaks_config .section_desc {background: #272b33; color: #b8bcc5; border: 1px solid #3b414d; border-top: none; border-radius: 0 0 6px 6px; padding: 10px 14px; margin: 0 0 14px; line-height: 1.5; font-size: 13px;}
/* Labels */
#GentlesCustomCSSTweaks_config .field_label {color: #ffffff; font-size: 13px; font-weight: 600; margin-right: 8px; order: 2}
#GentlesCustomCSSTweaks_config .radio_label {color: #d5d8de; font-size: 13px;}
/* Form Controls */
#GentlesCustomCSSTweaks_config input[type="text"],
#GentlesCustomCSSTweaks_config input[type="number"],
#GentlesCustomCSSTweaks_config select,
#GentlesCustomCSSTweaks_config textarea {background: #30343d; color: #f2f2f2; border: 1px solid #4d5361; border-radius: 6px; padding: 6px 8px; transition: .15s ease;}
#GentlesCustomCSSTweaks_config input:focus,
#GentlesCustomCSSTweaks_config select:focus,
#GentlesCustomCSSTweaks_config textarea:focus {outline: none; border-color: #6aa0ff; box-shadow: 0 0 0 3px rgba(106,160,255,.18);}
/* Radio Buttons */
#GentlesCustomCSSTweaks_config input[type="radio"] {accent-color: #6aa0ff; margin-right: 8px;}
/* Buttons */
#GentlesCustomCSSTweaks_config button,
#GentlesCustomCSSTweaks_config input[type="button"],
#GentlesCustomCSSTweaks_config input[type="submit"] {background: #6c409b; color: white; border: 1px solid #9c51e7; padding: 8px 16px; cursor: pointer; transition: .15s ease; font-weight: 600;}
#GentlesCustomCSSTweaks_config button:hover,
#GentlesCustomCSSTweaks_config input[type="button"]:hover,
#GentlesCustomCSSTweaks_config input[type="submit"]:hover {filter: brightness(1.08);}
#GentlesCustomCSSTweaks_config button:active,
#GentlesCustomCSSTweaks_config input[type="button"]:active,
#GentlesCustomCSSTweaks_config input[type="submit"]:active {transform: translateY(1px);}
/* Save/Close */
#GentlesCustomCSSTweaks_config .saveclose_buttons {margin: 5px 0 5px 3px; padding: 5px;}
/* Reset */
#GentlesCustomCSSTweaks_config .reset,
#GentlesCustomCSSTweaks_config .reset a,
#GentlesCustomCSSTweaks_config_buttons_holder {color: #9bbcff; text-align: center; font-size: 12px;}
#GentlesCustomCSSTweaks_config .reset a {text-decoration: none;}
#GentlesCustomCSSTweaks_config .reset a:hover {text-decoration: underline;}
/* Misc */
#GentlesCustomCSSTweaks_config .config_var {margin: 6px 5px; display: flex; align-items: center;}
#GentlesCustomCSSTweaks_config input:not([type="radio"]),
#GentlesCustomCSSTweaks_config select {order: -1; accent-color: #6c409b !important;}
#GentlesCustomCSSTweaks_config input[type="radio"] {accent-color: #6c409b !important;}
#GentlesCustomCSSTweaks_config select {margin-right: auto; min-width: 110px;}
#GentlesCustomCSSTweaks_config .block {display: block;}
#GentlesCustomCSSTweaks_config .center {text-align: center;}
#GentlesCustomCSSTweaks_config .indent40 {margin-left: 40%;}
#GentlesCustomCSSTweaks_config hr {border: none; border-top: 1px solid #3d424d; margin: 18px 0;}
#GentlesCustomCSSTweaks_config_field_QUALITY {display: grid; grid-template-columns: auto auto auto auto; border: 1px solid #9c51e7; border-radius: 1px; padding: 5px; margin-right: 10px;}
    `
});
onInit(gmc).then(() => {
    const QUALITY = gmc.get("QUALITY");
    const FORCEH264 = gmc.get("FORCEH264");
    const FORCE30FPS = gmc.get("FORCE30FPS");
    const AUTOAGREE = gmc.get("AUTOAGREE");
    const ROBOTOCONDENSED = gmc.get("ROBOTOCONDENSED");
    const CONVERTNERDS = gmc.get("CONVERTNERDS");
    const TALLERPLAYLIST = gmc.get("TALLERPLAYLIST");
    const TINYPLAYLISTPAGE = gmc.get("TINYPLAYLISTPAGE");
    const HIDENEWTAG = gmc.get("HIDENEWTAG");
    const HIDE1000VIDEOS = gmc.get("HIDE1000VIDEOS");
    const REARRANGESIDEBAR = gmc.get("REARRANGESIDEBAR");
    GM_registerMenuCommand('Settings', () => {
        gmc.open()
    })
})

window.addEventListener("yt-page-data-updated", function(e) {

    // Disable Webm, VP8, VP9, and AV1 Codecs
    if (gmc.get('FORCEH264')) {
        const DISALLOWED_TYPES_REGEX = /webm|vp8|vp9|av01/i;
        const isBlocked = (type) => {
            if (typeof type !== 'string') return true;
            if (DISALLOWED_TYPES_REGEX.test(type)) {return true;}
            const frameRateMatch = /framerate=(\d+)/i.exec(type);
            if (gmc.get('FORCE30FPS') && frameRateMatch && Number(frameRateMatch[1]) > 30) {return true;}
            return false;
        };
        // Override HTMLVideoElement.canPlayType()
        const video = document.createElement('video');
        const originalCanPlayType = video.canPlayType.bind(video);
        HTMLVideoElement.prototype.canPlayType = function(type) {
            if (isBlocked(type)) {return '';}
            return originalCanPlayType(type);
        };
        // Override MediaSource.isTypeSupported()
        const mediaSource = window.MediaSource;
        if (!mediaSource) return;
        const originalIsTypeSupported = mediaSource.isTypeSupported.bind(mediaSource);
        mediaSource.isTypeSupported = function(type) {
            if (isBlocked(type)) {return false;}
            return originalIsTypeSupported(type);
        };
    }

    // Gentle's Purple Theme: Make the sorting playlist page super tiny and easy to sort for big lists.
    if (gmc.get('TINYPLAYLISTPAGE')) {
        const height = "50px"
        const width = "90px"
        const styles = [
            {selector: "ytd-thumbnail-overlay-time-status-renderer", styles: { height: height }},
            {selector: "#index-container.ytd-playlist-video-renderer", styles: { height: height, width: width }, importantStyles: { "padding-right": "40px" }},
            {selector: "#index-container.ytd-playlist-video-renderer", styles: { height: height, width: width }},
            {selector: "#thumbnail", styles: { height: height, width: width }},
            {selector: "#content.ytd-playlist-video-renderer", styles: { height: height }, importantStyles: { "margin-left": "-90px" }},
            {selector: "ytd-playlist-video-renderer[can-reorder][persistent-drag-handle]", styles: { height: height, padding: "5px 0px 5px 0px" }},
            {selector: ".yt-core-image--fill-parent-height", styles: { height: height, width: "auto" }},
            {selector: "#menu.ytd-playlist-video-renderer", styles: { position: "absolute", "margin-left": "130px" }},
            {selector: "#meta.ytd-playlist-video-renderer", styles: { "margin-left": "30px" }}
        ];
        function OverrideStyle() {
            styles.forEach(({ selector: styles, styles: t = {}, importantStyles: r = {} }) => {
                document.querySelectorAll(styles).forEach(e => {
                    Object.entries(t).forEach(([t, r]) => { e.style[t] = r })
                    Object.entries(r).forEach(([t, r]) => { e.style.setProperty(t, r, "important") })
                })
            })
        };
        if(window.location.href.indexOf("playlist?list=")!==-1){
            $(document).ready(function() {OverrideStyle()})
        }
        const playlistInterval = setInterval(() => {
            if(window.location.href.indexOf("playlist?list=")!==-1){OverrideStyle()}
            else{clearInterval(playlistInterval)}
        }, 250);
    }

    // Gentle's Purple Theme: Change the font of everything to Roboto Condense (I like it)
    if (gmc.get('ROBOTOCONDENSED')) {
        if ($('#FontOverride').length === 0) {
            var fontoverride = $('<style id="FontOverride" class="fontfamily">* {font-family: "Roboto Condensed" !important;}</style>');
            var fontlink = $('<link id="FontOverride" class="fontlink" rel="stylesheet" href="//fonts.googleapis.com/css2?family=Roboto+Condensed">');
            $("html").append(fontoverride);
            $("html").append(fontlink);
        }
    }

    // Gentle's Purple Theme: Dynamically Taller Playlist
    if (gmc.get('TALLERPLAYLIST')) {
        function playlistHeight () {
            var WindowHeightCalc = (((Math.floor(($(window).height()-87)/64))*64)+38);
            var WindowHeight = (WindowHeightCalc + "px !important;");
            $("#container.ytd-playlist-panel-renderer, ytd-playlist-panel-renderer[js-panel-height_]").attr('style', 'max-height: ' + WindowHeight);
            $("ytd-watch-flexy[flexy_][js-panel-height_] #panels.ytd-watch-flexy ytd-engagement-panel-section-list-renderer.ytd-watch-flexy").attr('style', 'max-height: ' + WindowHeight);
            $("#secondary-inner > ytd-playlist-panel-renderer").attr('style', 'max-height: ' + WindowHeight);
        }
        Wait('#container.ytd-playlist-panel-renderer, ytd-playlist-panel-renderer[js-panel-height_], ytd-watch-flexy[flexy_][js-panel-height_] #panels.ytd-watch-flexy ytd-engagement-panel-section-list-renderer.ytd-watch-flexy', playlistHeight);
        $(window).resize(playlistHeight);
    }

    // Auto Click "I understand and wish to proceed"
    if(gmc.get('AUTOAGREE')){
        Wait('tp-yt-paper-button[aria-label="I understand and wish to proceed"]', (e) => {$(e).click()[0];});
    }

    // Remove Recommended Videos With Under 1000 Views
    if (gmc.get('HIDE1000VIDEOS')) {
        Wait('.ytAttributedStringHost.ytContentMetadataViewModelMetadataText:contains("views")', (e) => {
            const text = $(e).text();
            const match = text.match(/([\d,.]+)\s*([KMB])?/i);
            if (!match) return;
            let value = parseFloat(match[1].replace(/,/g, ''));
            const suffix = (match[2] || '').toUpperCase();
            if (suffix === 'K') value *= 1_000;
            if (suffix === 'M') value *= 1_000_000;
            if (suffix === 'B') value *= 1_000_000_000;
            if (value < 1000) $(e).parents('.lockup.ytd-item-section-renderer').remove();
            if (text.toLowerCase() == "no views") $(e).parents('.lockup.ytd-item-section-renderer').remove();
        });
    }

    // Remove "New" tag from videos
    if (gmc.get('HIDENEWTAG')) {
        Wait('.ytBadgeShapeText:contains(New)', (e) => {$(e).parents('.ytContentMetadataViewModelMetadataRow').remove();});
    }

    // Kbps to KB/s in Stat's For Nerds
    if (gmc.get('CONVERTNERDS')) {
        Wait('.html5-video-info-panel-content > div:nth-child(9) > span > span:nth-child(2)', function() {
            var CTKB = $('<span/>').attr({id: "CTKB", value: " • 0 KB/s"});
            var CTMB = $('<span/>').attr({id: "CTMB", value: " • 0 MB/s"});
            $(CTKB).insertAfter('.html5-video-info-panel-content > div:nth-child(9) > span > span:nth-child(2)');
            $(CTMB).insertAfter(CTKB);
            var ConvertkbpsFunc = setInterval(function() {
                var conspd = document.querySelector(".html5-video-info-panel-content > div:nth-child(9) > span > span:nth-child(2)");
                if (!conspd) {return;}
                var convertedspeed = $('.html5-video-info-panel-content > div:nth-child(9) > span > span:nth-child(2)').text().replace(' Kbps', '');
                $('#CTKB').text(" • " + (Math.round(convertedspeed/8)) + " KB/s")
                $('#CTMB').text(" • " + (Math.round(convertedspeed/8000)) + " MB/s")
            }, 1000);
        }, 1);
    }

    // Rearrage Left Sidebar
    if (gmc.get('REARRANGESIDEBAR')) {
        Wait('#sections.ytd-guide-renderer', (e) => {
            var SECOND = $('ytd-guide-section-renderer:has([href="/feed/subscriptions"][title="Subscriptions"])')
            var THIRD = $('ytd-guide-section-renderer:has([href="/feed/you"][title="You"])')
            THIRD.insertBefore(SECOND);
        }, 1)
    }

    // Constant Preferred Quality
    {
        const qualityMap = {'4320p': 'highres','2160p': 'hd2160','1440p': 'hd1440','1080p': 'hd1080','720p': 'hd720','480p': 'large','360p': 'medium','240p': 'small','144p': 'tiny','Auto': 'auto'};
        const preferredQuality = qualityMap[gmc.get('QUALITY')];
        if (preferredQuality) {
            const qualityOrder = ['highres','hd2160','hd1440','hd1080','hd720','large','medium','small','tiny'];
            function applyQuality() {
                const player = document.querySelector('#movie_player');
                if (!player || !player.getAvailableQualityLevels) return;
                if (preferredQuality === 'auto') return;
                const levels = player.getAvailableQualityLevels();
                const current = player.getPlaybackQuality();
                const startIndex = qualityOrder.indexOf(preferredQuality);
                if (startIndex === -1) return;
                const targetQuality = qualityOrder.slice(startIndex).find(q => levels.includes(q));
                if (targetQuality && current !== targetQuality) {
                    player.setPlaybackQualityRange(targetQuality);
                    player.setPlaybackQuality(targetQuality);
                }
            }
            function waitForPlayer() {
                const player = document.querySelector('#movie_player');
                if (player) applyQuality();
                setTimeout(waitForPlayer, 2000);
            }
            waitForPlayer();
        }
    }

    // Gentle's Purple Theme: Replaces the X in the playlist header with a ⋀ (X doesn't close it, it just collapses it so this change reduces confusion)
    Wait('#header-top-row.ytd-playlist-panel-renderer [d*="M17.293 5.293 12 10.586"]', (e) => {$(e).attr('d', 'M12 7.5 10.586 9l-5.293 5.293a1 1 0 001.414 1.414L12 10.414l5.293 5.293a1 1 0 001.414-1.414L13.414 9Z')});

    // Gentle's Purple Theme: Description Background Override
    Wait('#description.ytd-watch-metadata', (e) => {$(e).attr('style', 'background: var(--gp-lightblack-purple)')})

    // Replace the shitty new views metadata info with the old one
    Wait('.ytContentMetadataViewModelMetadataText[aria-label*="views"]', (e) => {
        if (!$(e).text().includes(' views')) {
            $(e).text($(e).text() + ' views')

            const f = $(e).next('.ytContentMetadataViewModelDelimiter');
            if (f.length) f.remove();
            $(e).after('<span aria-hidden="true" class="ytContentMetadataViewModelDelimiter"> • </span>')

            const d = $(e).prev('.ytContentMetadataViewModelLeadingIcon');
            if (d.length) d.remove();
        }
    })

    // Gentle's Purple Theme: Fade out Watched Videos from Playlists
    Wait('ytd-playlist-panel-video-renderer > a > div > div > ytd-thumbnail > a > div > ytd-thumbnail-overlay-resume-playback-renderer > #progress[style="width: 100%;"]', (e) => {$(e).parents("ytd-playlist-panel-video-renderer").attr("id", "Watched_Playlist_Video"); $(e).parent().remove();});

    // Gentle's Purple Theme: Wide about
    Wait('#below', (e) => {$(e).attr({style: 'margin-left: 0px !important; margin-right: 0px !important; max-width: none !important;'})});

    // Gentle's Purple Theme: Remove Tooltip from Video Titles
    Wait('#video-title, .ytLockupMetadataViewModelHeadingReset', (e) => {var titleattr = e.attr('title');e.attr('data-title', titleattr);e.removeAttr('title');});

    // Gentle's Purple Theme: Video Title Hover Background Override
    Wait('.ytSpecTouchFeedbackShapeHoverEffect, .ytSpecTouchFeedbackShapeStroke, .ytSpecTouchFeedbackShapeFill', (e) => {$(e).attr('style', 'background: var(--gp-dark-purple)')})

    // Remove Bits from the Left Sidebar
    {
        Wait('a[title="YouTube Premium"]', function(e) {e.parents('ytd-guide-section-renderer').remove();});
        Wait('a[title="Trending"]', REMOVEGUIDEENTRY);
        Wait('a[title="Shorts"]', REMOVEGUIDEENTRY);
        Wait('a[title="Liked videos"]', REMOVEGUIDEENTRY);
        Wait('a[title="Help"]', REMOVEGUIDEENTRY);
        Wait('a[title="Send feedback"]', REMOVEGUIDEENTRY);
        Wait('a[title="YouTube Music"]', REMOVEGUIDEENTRY);
        Wait('a[title="Your videos"]', REMOVEGUIDEENTRY);
        function REMOVEGUIDEENTRY(e) {$(e).parents('ytd-guide-entry-renderer').remove()}
    }

    // Remove The Explore and More from Youtube Sections
    {
        Wait('.ytd-guide-section-renderer:contains(Explore)', REMOVEGUIDESECTION);
        Wait('.ytd-guide-section-renderer:contains(More from YouTube)', REMOVEGUIDESECTION);
        Wait('a.ytd-guide-entry-renderer[title="Settings"]', REMOVEGUIDESECTION);
        function REMOVEGUIDESECTION(e) {$(e).parents('ytd-guide-section-renderer').remove()}
    }

    // Remove A Bunch Of Things
    {
        Wait('yt-lockup-view-model:has(.ytDismissibleItemReplacedContent)', REMOVETHING);                                            // Removes the "We won't recommed this anymore" message when you mark a video as not interested
        Wait('ytd-channel-renderer.ytd-item-section-renderer', REMOVETHING);                                                         // Removes channels from the recommeded videos list
        Wait('.ytp-gradient-bottom', REMOVETHING);                                                                                   // Removes the black shadow from the player when you pause a video
        Wait('button[title="Miniplayer (i)"]', REMOVETHING);                                                                         // Removes the Mini-player button from the player controls
        Wait('button[title="Picture in Picture"]', REMOVETHING);                                                                     // Removes the Picture-in-Picture popout button from the player controls
        Wait('button[aria-label="Theater mode (t)"]', REMOVETHING);                                                                  // Removes the Theater mode button from the player controls
        Wait('yt-related-chip-cloud-renderer', REMOVETHING);                                                                         // I don't remember what this removes
        Wait('ytd-video-quality-promo-renderer', REMOVETHING);                                                                       // I don't remember what this removes
        Wait('ytd-rich-shelf-renderer', REMOVETHING);                                                                                // Removes the Theater mode button
        Wait('ytd-reel-shelf-renderer', REMOVETHING);                                                                                // Removes the Theater mode button
        Wait('ytd-guide-downloads-entry-renderer', REMOVETHING);                                                                     // Removes the Download Video button from the menu list
        Wait('ytd-menu-service-item-download-renderer.ytd-menu-popup-renderer[role="menuitem"]', REMOVETHING);                       // Removes the Download Video button from the menu list
        Wait('yt-download-list-item-view-model [role="menuitem"]', REMOVETHING);                                                     // Removes the Download Video button from the menu list
        Wait('yt-button-view-model:has(path[d*="M480-80q0-83-31.5-156T363-363q-54-54-127-85.5T80-480q83"])', REMOVETHING);           // Removes the Ask AI button from the player controls
        Wait('[aria-label="Ask about this video"]', REMOVETHING);                                                                    // Removes the Ask AI button under the video
        Wait('#footer.ytd-guide-renderer', REMOVETHING);                                                                             // Removes the page footer

        // Removes Things from the description to clean it up and reduce clutter
        Wait('how-this-was-made-section-view-model', REMOVETHING);
        Wait('ytd-video-description-infocards-section-renderer[show-creator-custom-url-buttons]', REMOVETHING);
        Wait('yt-video-attributes-section-view-model:has(.videoAttributesSectionViewModelTitleContainer .videoAttributesSectionViewModelTitle:contains("Games"))', REMOVETHING);
        Wait('yt-video-attributes-section-view-model:has(.videoAttributesSectionViewModelHeader .videoAttributesSectionViewModelTitleContainer h3.videoAttributesSectionViewModelTitle)', REMOVETHING);
        Wait('#clarify-box', REMOVETHING);
        Wait('#donation-shelf', REMOVETHING);
        Wait('#offer-module', REMOVETHING);
        Wait('#video-summary', REMOVETHING);
        Wait('#merch-shelf', REMOVETHING);
        Wait('#ticket-shelf', REMOVETHING);
        Wait('#header #title:contains("Transcript")', REMOVETHING);
        Wait('#sub-header #sub-header-text:contains("Follow along using the transcript.")', REMOVETHING);
        Wait('#teaser-carousel', REMOVETHING);
        function REMOVETHING(e) {$(e).remove()};
    }

    // Remove Different types of Videos
    {
        Wait('yt-formatted-string.ytd-thumbnail-overlay-side-panel-renderer:contains("Mix")', RemoveSelectors);           // Removes Mix playlists
        Wait('#video-title.style-scope.ytd-compact-radio-renderer[title*="Mix - "]', RemoveSelectors);                    // Removes Mix playlists
        Wait('ytd-toggle-button-renderer #button.ytd-toggle-button-renderer:contains("Set reminder")', RemoveSelectors);  // Removes Premier videos
        Wait('.yt-core-attributed-string--white-space-no-wrap:contains("Notify me")', RemoveSelectors);                   // Removes Premier videos
        Wait('[class*="Button"]:contains("Notify me")', RemoveSelectors);                                                 // Removes Premier videos
        Wait('#metadata > div > span:contains("Premieres")', RemoveSelectors);                                            // Removes Premier videos
        Wait('ytd-channel-name > div > div > yt-formatted-string:contains("Youtube")', RemoveSelectors);                  // Removes Videos uploaded by Youtube
        Wait('h3[aria-label*="by YouTube Movies"]', RemoveSelectors);                                                     // Removes Movies
        Wait('span:contains("LIVE NOW")', RemoveSelectors);                                                               // Removes Live Videos
        Wait('.ytd-badge-supported-renderer:contains("LIVE")', RemoveSelectors);                                          // Removes Live Videos
        Wait('ytd-compact-video-renderer > #dismissible', RemoveSelectors);                                               // I don't remember what this removes
        Wait('[overlay-style=SHORTS]', RemoveSelectors);                                                                  // Removes Shorts
        Wait('.ytAttributedStringHost:contains("Get answers, explore topics, and more")', RemoveSelectors);               // Removes AI search (I think, I don't rmemeber)
        //Wait('.ytBadgeShapeText:contains("Members only")', RemoveSelectors);                                              // Removes Members only videos
        //Wait('[class*="yt-badge"]:contains("Members only")', RemoveSelectors);                                            // Removes Members only videos
        Wait('.ytBadgeShapeText:contains("Buy or rent")', RemoveSelectors);                                               // Removes Buy/Rent/Try Videos
        Wait('.ytBadgeShapeText:contains("Buy")', RemoveSelectors);                                                       // Removes Buy/Rent/Try Videos
        Wait('.ytBadgeShapeText:contains("Try now")', RemoveSelectors);                                                   // Removes Buy/Rent/Try Videos
        function RemoveSelectors(e) {
            const selectors = [
                "ytd-grid-video-renderer",
                "ytd-compact-radio-renderer",
                "ytd-compact-playlist-renderer",
                "ytd-rich-item-renderer",
                "yt-lockup-view-model",
                "ytd-compact-video-renderer",
                "yt-video-description-youchat-section-view-model",
                "yt-video-attributes-section-view-mode"
            ];

            selectors.forEach(sel => {
                $(e).parents(sel).remove();
            });
        };
    }

})
