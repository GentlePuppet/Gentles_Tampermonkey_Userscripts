

# Gentle's Youtube Tweaks
This is a collection of userscripts that tweak and add a few things to Youtube.

### Don't have a userscript extension?
* [Get Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)
* [Get Tampermonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
* [Get Tampermonkey for Opera](https://addons.opera.com/en/extensions/details/tampermonkey-beta/)
* [Get Tampermonkey for Safari](https://apps.apple.com/us/app/tampermonkey/id1482490089?mt=12)

If you do have a userscript extension then clicking on any of the "Install Userscript" links below will prompt you with the install confirmation.
  
<br><br>

## [Install Userscript: Dynamic Gain](https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/refs/heads/main/Youtube%20Better%20CSS%20Tweaks/Dynamic%20Gain.user.js)
Are you tired of some youtube videos being way too quiet, even at 100% volume?
* This script automatically boosts quiet YouTube videos or lowers loud videos by getting the content loudness and adjusting the gain to match the target volume in the config.
  - When a video loads it opens the "stats for nerds" panel for a second to collect the current content loudness for adjustment. (The panel is temporarily hidden when it is accessed so it doesn't flash everytime)
  - Displays the adjusted gain next to the current time on the playback overlay.
  - Includes an option to enable a compressor to avoid clipping. (Disabled by default in the config)
  - Includes an option to ignore youtube's Stable Volume (DRC) when avalible. (Disabled by default since it makes videos unexpectidly louder than wanted)
      - (Hover over options in the panel to view a description of each.)
  - Clicking the overlay opens and closes the config panel.
  - Closing the config panel updates the gain automatically.

![image](https://github.com/user-attachments/assets/4050ac57-4a23-494d-9b80-61f3785966b9)
![image](https://github.com/user-attachments/assets/434b55aa-98ba-45f1-b439-70120c5859ff)




<br><br>
  
## [Install Userscript: Video Progress Trackers](https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Better%20CSS%20Tweaks/Video%20Progress%20Trackers.user.js)
* It adds a little progress bar under videos to let you know how far you watched a video.
  - Visible at the bottom of the video while fullscreen.
* It adds a simple countdown timer to let you know how much of a video is left.
  - Does account for playback speed.

![image](https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/assets/43224790/7b210d39-66f2-4b93-aecb-cef0144a38e5)
![image](https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/assets/43224790/47f5feef-6f1d-4c37-a55c-b60075cfdff7)

<br><br>

## [Install Userscript: HD Avatars & Thumbnails](https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Better%20CSS%20Tweaks/HD%20Avatars%20&%20Thumbnails.user.js)
* This is a simple Userscript that forces all avatars and thumbnails to be load their max quality version. 
** (Not recommended for people with slow internet.)
* You can also hover over avatars to make them bigger.

<br><br>

## [Install Userscript: Hide Blacklisted Videos](https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Better%20CSS%20Tweaks/Youtube%20Hide%20Blacklisted%20Videos.user.js)
* Adds a toggle to hide/show blacklisted videos. 
* Click the + button that lets you add text the filter list. (No regrex and isn't case sensative)
* To blacklist channels add "by CHANNELNAME" to the filter. 
* To remove filters hold shift and click on the + button.
  
![Off](https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/assets/43224790/827aadcf-3330-4319-b100-c0dd1bfe76db)
![On](https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/assets/43224790/eb28d38f-f3f1-4ee7-b780-f769b078a10b)

<br><br>

## [Install Userscript: Hide Watched Videos](https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Better%20CSS%20Tweaks/Hide%20Watched%20Videos.user.js)
* Adds a toggle to hide/show watched videos.
  
![image](https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/assets/43224790/fa545e09-7fe1-416d-b8c9-584d705eede3)
![image](https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/assets/43224790/ea40c2e0-2d36-45af-8e44-3cf087be55a9)

<br><br>

## [Install Userscript: Highlight Videos](https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Better%20CSS%20Tweaks/Highlight%20Videos.user.js)
* Adds a filter button to highlight videos.
* Click the + button that lets you add text the filter list. (No regrex and isn't case sensative)
* To hightlight channels add "by CHANNELNAME" to the filter.
* To remove filters hold shift and click on the + button.
  
![image](https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/assets/43224790/42b2822e-7e27-4500-89cc-7172dbfac618)
