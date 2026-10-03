// ==UserScript==
// @name         Youtube Gentle's Auto Gain
// @author       GentlePuppet
// @version      4.0.0
// @description  This script automatically boosts quiet YouTube videos or lowers loud videos by automatically adjusting audio gain with smoothing.
// @author       Special Thanks to this old extension I found and adapted some of their javascript: https://github.com/Kelvin-Ng/youtube-volume-normalizer
// @include      https://www.youtube.com/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAYAAADnRuK4AAAACXBIWXMAAAsTAAALEwEAmpwYAAA55mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoTWFjaW50b3NoKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxNy0wNC0xMVQwOTo0MzozMi0wNzowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE3LTA0LTExVDExOjA2OjQwLTA3OjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxNy0wNC0xMVQxMTowNjo0MC0wNzowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDo2YzkxOTM3NC1mODJkLTQwNDctOGFhNy0yODBkODQ5NzljYTg8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPnhtcC5kaWQ6YzRiYTBmMTAtNTZmYi00MjIxLWEyYjAtMTFjYmM5NzM2YzRiPC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6YzRiYTBmMTAtNTZmYi00MjIxLWEyYjAtMTFjYmM5NzM2YzRiPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmM0YmEwZjEwLTU2ZmItNDIyMS1hMmIwLTExY2JjOTczNmM0Yjwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNy0wNC0xMVQwOTo0MzozMi0wNzowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjZjOTE5Mzc0LWY4MmQtNDA0Ny04YWE3LTI4MGQ4NDk3OWNhODwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNy0wNC0xMVQxMTowNjo0MC0wNzowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+NjU1MzU8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjE0NDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4xNDQ8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pkco/OsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAABSdJREFUeNrsnd1x2kwYRp9lcm/cgVNB6CCiA9yBXUGgAscVGCqIOzAdiFQQXIHpIHIF+12smE9DJKTVH/buOTPMeOQbe/fo/VsQxlorgLZMWAJAIEAgQCBAIAAEAgQCBAIEAkAgQCBAIEAgAAQCBAIEAgQCQCBAIEAgQCBAIAAEAgSCT8WXsovGmIv+UVaaSpqdXC67JklXFdeLJBf6V3Y1v99Leq+4np1eM/9eG3dfSj6Eakov9izQiRBJxcYn3M+t5SyKuBtKuFEEsk6ERNI3STcNogMMy17SQdJrLldrsQYTKJfmh6QF+/Up2EramPoUWyuQrLX/vHzEsVJqJcvrU75S61E6lLnSOgJZ6UnSkps5CNZGWo2SwvKC+IWiN8ii/PZcfdRZoFyelMI46IJ7XiVRmSu+g8QX5AmaWb7HjWksUF7zkLbCJ8n3uhGNUlheqaesbVTMT9v8LinsgfWMjkZ7XitQYbIM8aWypLNAchNmiJPava+tgazEc4Dj5vrY1nvXQJazLahJY3UpbMb6Rc+si0DfWb/o+d66BrLSX7njC4iXzEjX3jVQfu6FPDC1ZzyYUP9AlzoIgWAwgUhfUOvCOYG+sW5Q5wIRCDpFoMo2nhYeTlt536OM8OSZcj+MUgPZUCPPnz/SYoEOLahyYhJVC39zI728SGnqfobOrXycT+dIEuntTXp6Iq11ZBJ1B7ZcOpHu7jChQfwmhVUV1r9+ubSWJGjSk0BxprU0dTKR1jqnsHi5u3NpbblkLToIFPcxxnTqCuy3N9JajRNxF9FN2v40da0/bf+UFNaWxcINIX/+pD5CoA5p7eGBaTYprIe0Fuc0u9SJ0tN4GRPmhwntAP/Wei09PkpZFr5C1hoEGoIsk1Yr6fk5OoGogfqqjyKdZhOBhuD52UWk0NIaEWgkIppmE4GGZr930Wi3IwJBC2azoKfZCDQWxWk2AgE4vrAEI7HdulrocEAg8OBwkO7vwyiiSWEjcpxOf/0arDxEoKEIdZBIBBqY3U6az13KiuFwlQjUc7oK/TCVCDQA67WrcyKU51wE2osnlNWnq/v74NryM+x9IlCGIWfa8ttbV+vEI0+lE9RAPnXOZuNSVsb9hUA+BDpFHlIgbrFjugp4itxHCquqgV5py8OfInvySgprQkRT5D5gDlRsyyObIg9ZA+2jS1eRDgJ9KkKfCBTHLRj5FLkPgeKsgeKbIo9eA4WZwuKdIvdBqRPnnlTPl+3C/05UuHKuC6MVgVoXJr4hC0hfRCAYJQK9sm5Q5wIRCKiB4HI10Lk2fir3pXMA10bKvNp448IWaQwy0zKFkcag1oE6gX6zftHzu4tARCA460BlEX2EMzEK6GMN5HsWdmTLGkbL1tQ0Uk0E2rCO0VK797UCGWkn94K42JkG+970TfWPrGd0NNrzRgLlJq5Z02hYm4ZZp7YLK2KlVFLC+gafuual+9+yCytyK2ZDIbPP97gxXgLlLd2cojrMyCNpbjzPP70/mWrc4dqcmii4msdbnlYCFURaEY2CiTqr1h74FNFVWFdY/5C0YE8+BVtJG+N585e60odAJTIlcl9UfyOetfgRCuOD3Puad5L2puX7vEYRqEKqaUGk4xjg6kQuxgP+6acoyfvJ9daifDiBOkSyItOKaHbVIMolH2CTq6LDe8X17KTmvHit2VgggMG7MAAEAgQCBAIEAgQCQCBAIEAgQCAABAIEAgQCBAJAIEAgQCBAIAAEAgQCBAIEAgQCQCC4CP8NALpSx+9Fg594AAAAAElFTkSuQmCC
// @run-at       document-start
// @updateURL    https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Better%20CSS%20Tweaks/Dynamic%20Gain.user.js
// @downloadURL  https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/main/Youtube%20Better%20CSS%20Tweaks/Dynamic%20Gain.user.js
// ==/UserScript==
/* eslint-disable no-lone-blocks, no-multi-spaces */
/* globals $, waitForKeyElements */

// CSS
const style = () => {const stylesheet = `
    .boost-close {
        cursor: pointer;
        margin-left: 10px;
        user-select: none;
        top: 4px;
        right: 6px;
        position: absolute;
    }
    .boost-switch {
        position: relative;
        display: inline-block;
        width: 46px;
        height: 24px;
        vertical-align: middle;
    }
    .boost-switch input {
        display: none;
    }
    .boost-slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #777;
        transition: 0.3s;
        border-radius: 24px;
    }
    .boost-slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: 0.3s;
        border-radius: 50%;
    }
    .boost-switch input:checked + .boost-slider {
        background-color: #3fa34d;
    }
    .boost-switch input:checked + .boost-slider:before {
        transform: translateX(22px);
    }
    .disable-gain {
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        opacity: 0.8
        cursor: pointer;
        border: 1px outset #000
    }
    .disable-gain:hover {
        opacity: 1 !important;
    }
    .boost-config {
        position: absolute;
        background: rgb(from var(--yt-spec-brand-background-solid) r g b / 0.9);
        text-shadow: 0 0 2px rgba(0, 0, 0, .5);
        transition: opacity .1s cubic-bezier(0,0,.2,1);
        color: white;
        padding: 10px;
        border-radius: 6px;
        z-index: 9999;
        font-size: 13px;
        display: none;
        flex-direction:
        column; gap: 8px;
        max-width: 260px;
        border: 1px outset black;
    }
    .boost-container {
        display: inline-block;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        cursor: pointer;
        min-width: 0;
        line-height: var(--yt-delhi-pill-height, 48px);
        padding: var(--yt-delhi-pill-top-height, 12px) 8px 8px 0px;
        margin-left: -10px;
    }
    .boost-overlay {
        background-color: transparent;
        height: var(--yt-delhi-pill-height, 48px);
        width: fit-content;
        display: inline-block;
        position: relative;
        z-index: 999;
        pointer-events: auto;
        cursor: pointer;
        text-shadow: rgb(0, 0, 0) -1px -1px 2px, rgb(0, 0, 0) 1px -1px 2px, rgb(0, 0, 0) -1px 1px 2px, rgb(0, 0, 0) 1px 1px 2px;
        padding: 0px 8px;
        border-radius: 28px;
    }
    .boost-overlay:hover {
        background-color: var(--yt-spec-overlay-button-secondary,rgba(255,255,255,.1));
    }
`;
const styleTag = document.createElement('style'); styleTag.classList.add("userscriptstyle"); styleTag.id = "Gentles-Auto-Gain-CSS"; styleTag.textContent = stylesheet; document.body.insertAdjacentElement('afterend', styleTag);
}
style()

const debug = false

const config = {
    targetLoudnessDb: -3,         // Desired loudness level in dB (higher = louder)
    maxGain: 2,                   // Maximum gain multiplier allowed
    gainSmoothingTime: 0.5,       // Seconds for smoothing gain changes
    compressorEnabled: false,     // Choose whether to enable/disable the compressor (true/false)
    ignoreDRC: false,             // Choose whether to ignore youtube's DRC (Dynamic Range Compression)
    compressorThreshold: 0,       // Threshold where compression begins
    compressorKnee: 0,            // Softness of transition into compression
    compressorRatio: 20,          // Compression ratio. Larger = stronger compression
    compressorAttack: 0.003,      // How quickly the compressor reacts
    compressorRelease: 0.25,      // How quickly the compressor stops compressing
    attemptsongCheck: false,      // Experimental feature to disable autogain on songs
};

const audioCtx = new AudioContext();
const gainNode = audioCtx.createGain();
const compressor = audioCtx.createDynamicsCompressor();

let video = null;
let ytdapp = null;
let currentSource = null;
let currentVideo = null;
let gainDisabled = false;
let musicDetected = false;
let checkMusic = true;
let container = null;
let overlay = null;

//==================================================
// --------------- HELPER FUNCTIONS ---------------
//==================================================

// Sets the compressor settings from the config
function applyCompressorConfig() {
    compressor.threshold.value = config.compressorThreshold;
    compressor.knee.value = config.compressorKnee;
    compressor.ratio.value = config.compressorRatio;
    compressor.attack.value = config.compressorAttack;
    compressor.release.value = config.compressorRelease;
}

// Get the volume from the stats for nerds
async function fastLoudnessRead() {
    if (debug) console.log("AutoGain: OpenStatsPanel")
    const player = document.querySelector("#movie_player");

    if (!player || typeof player.getStatsForNerds !== "function") {
        return null;
    }

    const stats = player.getStatsForNerds();
    if (!stats) return null;

    const vol = stats.volume ?? "";
    const match = vol.match(
        /(?:content loudness\s*|cont\.?)(-?\d+(?:\.\d+)?)\s*dB/i
    );

    if (!match) return null;

    const dB = parseFloat(match[1]);

    // Respect your DRC setting
    const hasDRC = vol.includes("DRC");
    if (hasDRC && !config.ignoreDRC) {
        gainNode.gain.value = 1;
        return null;
    }
    if (debug) console.log("AutoGain: Return DB: " + dB)

    return dB;
}

// Wait for the video to exist before continuing
async function waitForElement(selector) {
    if (debug) console.log("AutoGain: Wait for '" + selector + "'")
    for (let i = 0; i < 40; i++) { // ~1 second max
        const v = document.querySelector(selector)
        if (v) return v;
        await new Promise(r => setTimeout(r, 25));
    }
    return null;
}

// Utility to prevent multiple events firing close together
function debounce(fn, delay) {
    let timer = null;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

// Cookie utilities for saving/loading config settings
function saveConfigToCookie() {
    document.cookie = `gainConfig=${encodeURIComponent(JSON.stringify(config))}; path=/; max-age=31536000`;
}
function loadConfigFromCookie() {
    if (debug) console.log("AutoGain: Load config from cookie (2)")
    const match = document.cookie.match(/(?:^|; )gainConfig=([^;]*)/);
    if (match) {
        try {
            const saved = JSON.parse(decodeURIComponent(match[1]));
            Object.assign(config, saved); // Merge saved values into config
        } catch (e) {
            console.warn('Failed to load config from cookie:', e);
        }
    }
}

let gainUpdateTimeout;
function debounceGainUpdate(a = 0) {
    clearTimeout(gainUpdateTimeout);
    gainUpdateTimeout = setTimeout(() => {updateGainFromStats(true, null, null, a)}, 5000);
}

//==================================================
// --------------- HELPER FUNCTIONS ---------------
//==================================================

// Listen for dynamic navigation changes (SPA routing)
window.addEventListener("yt-page-data-updated", initOnWatchPage);

// Also run on initial load in case it's already on a video
initOnWatchPage();

async function initOnWatchPage() {
    if (!location.pathname.startsWith("/watch")) return;

    if (window.hasRunGainScript) {return;} // Prevent duplicate runs
    if (debug) console.log("AutoGain: Begin Init (1)")
    window.hasRunGainScript = true;

    loadConfigFromCookie();
    createOverlay();
    await boostAudio();
    updateGainFromStats(null, null, null, "initOnWatchPage");

    // Add an eventlister to the page so the final step is re-run everytime the page changes (new video loads) so the gain can be adjusted (for the new video)
    window.addEventListener("yt-page-data-updated", debounceGainUpdate("yt-page-data-updated"));
}

// Create the gain overlay
function createOverlay() {
    let container = document.querySelector('.boost-container');
    let overlay = document.querySelector('.boost-overlay');

    if (debug) console.log("AutoGain: Begin createOverlay (3)")
    if (!overlay) {
        if (container) container.remove()
        container = document.createElement("div");
        container.className = "boost-container";
        overlay = document.createElement("div");
        overlay.className = "boost-overlay";
        document.querySelector('.ytp-left-controls')?.appendChild(container);
        document.querySelector('.boost-container')?.appendChild(overlay);
    }

    // Create text update function for the overlay
    overlay.setOverlayText = (function() {
        let lastText = '';
        return function(text) {
            if (text === lastText) return;
            lastText = text;
            requestAnimationFrame(() => {
                this.textContent = text;
            });
        };
    })();

    // Create the hidden config panel
    if (debug) console.log("AutoGain: Begin configbox (4)")
    let configBox = document.createElement("div");
    configBox.className = "boost-config";
    configBox.style.cssText = 'display: none;';
    document.body.appendChild(configBox);


    // Hidden container for compressor tuning
    let compressorSettingsBox = document.createElement("div");
    compressorSettingsBox.style.display = "none";
    compressorSettingsBox.style.marginLeft = "20px";
    compressorSettingsBox.style.padding = "6px 0 0 0";
    compressorSettingsBox.style.borderLeft = "1px solid #555";
    compressorSettingsBox.style.paddingLeft = "10px";
    compressorSettingsBox.style.display = config.compressorEnabled ? "block" : "none";

    let headerRow = document.createElement('div'); headerRow.style.display = 'flex'; headerRow.style.justifyContent = 'space-between'; headerRow.style.alignItems = 'center';
    let headerTitle = document.createElement('div'); headerTitle.textContent = 'Gain Settings'; headerTitle.style.fontWeight = 'bold';
    let closeButton = document.createElement('div'); closeButton.className = "boost-close"; closeButton.title = "Close settings and Update gain"; closeButton.textContent = '[✕]'; closeButton.style.cursor = 'pointer'; closeButton.style.marginLeft = '10px'; closeButton.style.userSelect = 'none'; closeButton.addEventListener('click', () => {configBox.style.display = 'none';});

    headerRow.appendChild(headerTitle); headerRow.appendChild(closeButton); configBox.appendChild(headerRow);

    closeButton.addEventListener("click", () => {configBox.style.display = "none"; debounce(updateGainFromStats, 250);}); configBox.addEventListener("click", e => {e.stopPropagation();});

    // Utility: Create labeled input row
    function createInput(labelText, key, type = 'number', step = 'any', tooltip = '', onChange = null) {
        let container = document.createElement('div');
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'space-between';

        let label = document.createElement('label');
        label.textContent = labelText;
        label.style.marginRight = "10px";
        label.style.flex = "1";
        label.title = tooltip;

        if (type === 'checkbox') {
            // Create toggle switch
            let toggleContainer = document.createElement('label');
            toggleContainer.className = 'boost-switch';
            toggleContainer.title = tooltip;

            let input = document.createElement('input');
            input.type = 'checkbox';
            input.checked = config[key];

            let slider = document.createElement('span');
            slider.className = 'boost-slider';

            input.addEventListener('change', () => {
                config[key] = input.checked;
                if (onChange) onChange(input.checked);
                saveConfigToCookie();
                console.log(`Config updated: ${key} = ${input.checked}`);
            });

            toggleContainer.appendChild(input);
            toggleContainer.appendChild(slider);
            container.appendChild(label);
            container.appendChild(toggleContainer);

        } else {
            // Regular number input
            let input = document.createElement('input');
            input.type = type;
            input.value = config[key];
            input.step = step;
            input.style.width = "80px";
            input.style.color = "#fff";
            input.style.backgroundColor = "var(--yt-spec-brand-background-primary)";
            input.style.borderRadius = "5px";
            input.style.border = "1px inset #000";
            input.style.padding = "3px";
            input.title = tooltip;

            input.addEventListener('change', () => {
                let value = parseFloat(input.value);
                if (!isNaN(value)) {
                    config[key] = value;
                    if (onChange) onChange(value);
                    saveConfigToCookie();
                } else {
                    input.value = config[key];
                }
            });

            container.appendChild(label);
            container.appendChild(input);
        }

        return container;
    }

    // Add input fields to the config box
    configBox.appendChild(createInput("Target Loudness (dB):", "targetLoudnessDb", 'number', 'any',
                                      "Target loudness level (in decibels) you'd like videos normalized to."))

    configBox.appendChild(createInput("Max Gain:", "maxGain", 'number', 'any',
                                      "Maximum allowed volume boost multiplier.\nPrevents very quiet videos from becoming excessively loud."))

    configBox.appendChild(createInput("Smoothing Time (s):", "gainSmoothingTime", 'number', 'any',
                                      "Time in seconds to smoothly transition gain changes.\nAvoids sudden volume jumps when adjusting the gain."))

    configBox.appendChild(createInput("Ignore Stable Volume", "ignoreDRC", "checkbox", '',
                                      "Ignore YouTube's built-in Dynamic Range Compression when available.\nIgnoring tends to make videos louder than expected when Stable Volume is enabled.\nRecommend just turning Stable Volume off instead of using this, but it's your choice."))

    configBox.appendChild(createInput("Disable for Music", "attemptsongCheck", "checkbox", '',
                                      "Attempts to check if the current video is music and disables the autogain.\nAutogain is funky on music videos and doesn't work too well, so this is an attempt disabling it automatically for music.",
                                        () => {
                                            musicDetected = !musicDetected
                                            if (gainDisabled) {
                                                overlay.setOverlayText("🔇 Gain Disabled");
                                                disableGainBtn.textContent = "Enable Gain (Current Video)";
                                                disableGainBtn.style.backgroundColor = "#008b0c";
                                                disableGainBtn.style.borderStyle = "inset";
                                            } else if (musicDetected) {
                                                overlay.setOverlayText("🔇 Music Detected");
                                                disableGainBtn.textContent = "Disable Music Check to Enable Gain";
                                                disableGainBtn.style.backgroundColor = "#008b0c";
                                                disableGainBtn.style.borderStyle = "inset";
                                            } else {
                                                disableGainBtn.textContent = "Disable Gain (Current Video)";
                                                disableGainBtn.style.backgroundColor = "#8b0000";
                                                disableGainBtn.style.borderStyle = "outset";
                                            }
                                            updateGainFromStats(false, true)
                                        }))

    configBox.appendChild(createInput("Enable Compressor", "compressorEnabled", "checkbox", '',
                                      "Enable a dynamic range compressor to even out loud and soft parts.\nUseful for videos with inconsistent audio.\nEnable to tweak the compressor settings.",
                                         () => {
                                            // Enable the compressor settings box
                                            compressorSettingsBox.style.display = config.compressorEnabled ? "block" : "none";

                                            // Reposition the config box so it's not jutting out weirdly
                                            let rect = overlay.getBoundingClientRect();
                                            let left = rect.left + (rect.width - configBox.offsetWidth) / 2
                                            configBox.style.left = `${left}px`;
                                            configBox.style.top = `${window.scrollY + rect.top - configBox.offsetHeight - 20}px`;

                                            // Enable and update the compressor
                                            applyCompressorConfig()
                                        }));

    configBox.appendChild(compressorSettingsBox);
    compressorSettingsBox.appendChild(createInput("Threshold (dB):", "compressorThreshold", 'number', 'any', "Threshold where compression begins."),               () => applyCompressorConfig());
    compressorSettingsBox.appendChild(createInput("Knee (dB):",      "compressorKnee",      'number', 'any', "Softness of transition into compression."),          () => applyCompressorConfig());
    compressorSettingsBox.appendChild(createInput("Ratio:",          "compressorRatio",     'number', 'any', "Compression ratio. Larger = stronger compression."), () => applyCompressorConfig());
    compressorSettingsBox.appendChild(createInput("Attack (s):",     "compressorAttack",    'number', 'any', "How quickly the compressor reacts."),                () => applyCompressorConfig());
    compressorSettingsBox.appendChild(createInput("Release (s):",    "compressorRelease",   'number', 'any', "How quickly the compressor stops compressing."),     () => applyCompressorConfig());


    // Toggle to Disable Gain for the current video
    let disableGainBtn = document.createElement('button');
    disableGainBtn.className = "disable-gain";
    disableGainBtn.textContent = "Disable Gain (Current Video)";
    disableGainBtn.style.backgroundColor = "#8b0000";

    disableGainBtn.addEventListener('click', () => {
        gainDisabled = !gainDisabled;
        if (gainDisabled) {
            gainNode.gain.value = 1;
            overlay.setOverlayText("🔇 Gain Disabled");
            disableGainBtn.textContent = "Enable Gain (Current Video)";
            disableGainBtn.style.backgroundColor = "#008b0c";
            disableGainBtn.style.borderStyle = "inset";
        } else {
            updateGainFromStats(false, true, true)
            disableGainBtn.textContent = "Disable Gain (Current Video)";
            disableGainBtn.style.backgroundColor = "#8b0000";
            disableGainBtn.style.borderStyle = "outset";
        }
    });
    configBox.appendChild(disableGainBtn);


    // Toggle box visibility when clicking the overlay
    overlay.addEventListener("click", () => {
        if (configBox.style.display === "none") {
            // Show the box
            configBox.style.display = "flex";

            // Get the overlay position and dimensions
            let rect = overlay.getBoundingClientRect();
            let left = rect.left + (rect.width - configBox.offsetWidth) / 2

            // Position the configBox centered above the overlay
            configBox.style.left = `${left}px`;

            // Put the box just above the overlay with some spacing
            configBox.style.top = `${window.scrollY + rect.top - configBox.offsetHeight - 20}px`;

            if (gainDisabled) {
                overlay.setOverlayText("🔇 Gain Disabled");
                disableGainBtn.textContent = "Enable Gain (Current Video)";
                disableGainBtn.style.backgroundColor = "#008b0c";
                disableGainBtn.style.borderStyle = "inset";
            } else if (musicDetected) {
                overlay.setOverlayText("🔇 Music Detected");
                disableGainBtn.textContent = "Disable Music Check to Enable Gain";
                disableGainBtn.style.backgroundColor = "#008b0c";
                disableGainBtn.style.borderStyle = "inset";
            } else {
                disableGainBtn.textContent = "Disable Gain (Current Video)";
                disableGainBtn.style.backgroundColor = "#8b0000";
                disableGainBtn.style.borderStyle = "outset";
            }
        } else {
            // Hide the box
            configBox.style.display = "none";
            updateGainFromStats(false, true)
        }
    });

    // Set the overlay text
    overlay.setOverlayText(`🔊 Gain: Initialized...`);
}

// Main logic to hook into the video and apply audio gain dynamically
async function boostAudio() {
    if (debug) console.log("AutoGain: Begin boostAudio")

    // A short break to check for the video element
    video = await waitForElement('#movie_player video');

    video.addEventListener("loadeddata", () => debounceGainUpdate("loadeddata"));
    video.addEventListener("canplay", () => debounceGainUpdate("canplay"));

    // Save the found video as the current video to adjust the gain for
    currentVideo = video;
    gainDisabled = false;

    // Wait for video to play or be ready to play
    if (video.readyState < 1) {
        await new Promise(resolve => video.addEventListener("loadeddata", resolve, { once: true }));
    }

    await setupAudioGraph(currentVideo)
}

// Create the audio Nodes
async function setupAudioGraph(video) {
    if (debug) console.log("AutoGain: Begin setupAudioGraph (6)")
    // Reset gain
    gainNode.gain.value = 1;

    // Disconnect existing source if any
    if (currentSource) {
        currentSource.disconnect();
        if (debug) console.log("AutoGain: Disconnected Source")

    }

    // Create new source
    const source = audioCtx.createMediaElementSource(video);
    currentSource = source;

    // If the compressor is enabled create and connect it, otherwise just connect the gain to the audio
    if (config.compressorEnabled) {
        source.connect(compressor);
        compressor.connect(gainNode);
        applyCompressorConfig()
        if (debug) console.log("AutoGain: Connected Compressor")

    } else {
        source.connect(gainNode);
        if (debug) console.log("AutoGain: Connected Gain")
    }

    // Plug the gained audio back into the audio output
    gainNode.connect(audioCtx.destination);
}

// Experimental Song Check Function
async function attemptSongCheck() {
    if (debug) console.log("AutoGain: Checking for Song")
    const details = document.getElementById('movie_player')?.getPlayerResponse()?.videoDetails;
    const title = (details.title || '').toLowerCase();
    const description = (details.shortDescription || '').toLowerCase();
    const keywords = details.keywords || [];

    let matches = 0;
    let matchDetails = [];

    // Check description.
    if (debug) console.log("AutoGain Songcheck: Checking Description")
    const descriptionTerms = ['vocals', 'soundcloud', 'spotify', 'song', 'music'];
    const descriptionMatches = descriptionTerms.filter(term => description.includes(term));
    if (descriptionMatches.length > 0) {
        matches += descriptionMatches.length;
        descriptionMatches.forEach(term => {matchDetails.push(`Description: "${term}"`)});
    }

    // Check title.
    if (debug) console.log("AutoGain Songcheck: Checking Title")
    const titleTerms = ['song', 'music'];
    const titleMatches = titleTerms.filter(term => title.includes(term));
    if (titleMatches.length > 0) {
        matches += titleMatches.length;
        titleMatches.forEach(term => {matchDetails.push(`Title: "${term}"`)});
    }

    // Check keywords.
    if (debug) console.log("AutoGain Songcheck: Checking Keywords")
    const keywordMatches = keywords.filter(keyword =>keyword.toLowerCase().includes('song') || keyword.toLowerCase().includes('music'));
    if (keywordMatches.length > 0) {
        matches += keywordMatches.length;
        keywordMatches.forEach(keyword => {matchDetails.push(`Keyword: "${keyword}"`)});
    }

    if (debug) {console.log("AutoGain: Song detected"); console.log(`AutoGain: Song check [${matches} matches] ${matchDetails.length ? matchDetails.join(', ') : 'No matches'}`);}

    if (matches >= 2) {
        gainDisabled = false
        gainNode.gain.value = 1;
    }

    return matches >= 3;
}

// Updates the gain
async function updateGainFromStats(resetgain = false, smoothing = false, skipsongcheck = false, caller = null) {
    if (debug) console.log("AutoGain: Begin updateGain", {resetgain, smoothing, skipsongcheck, caller})

    let container = document.querySelector('.boost-container');
    let overlay = document.querySelector('.boost-overlay');

    if (resetgain) {gainDisabled = false}
    if (skipsongcheck) {checkMusic = false; musicDetected = false} else {checkMusic = true}
    if (debug) console.log("AutoGain:", {gainDisabled, checkMusic})

    if (checkMusic && config.attemptsongCheck && await attemptSongCheck()) {
        musicDetected = true
        overlay.setOverlayText("🔇 Music Detected");
        return;
    }

    if (gainDisabled) {
        overlay.setOverlayText("🔇 Gain Disabled");
        return;
    }

    // Reset the overlay text
    overlay.setOverlayText(`🔊 Gain: Loading...`);
    if (debug) console.log("AutoGain: Gain Loading")

    // Open the stats for nerds and get the content loudness dB level
    if (debug) console.log("AutoGain: Await DB")

    // Get DB level from Stats For Nerds
    const dB = await fastLoudnessRead();
    if (debug) console.log("AutoGain: Got dB: " + dB)
    //const dB = await openStatsPanelAndGetDb();

    // If the previous function returns null, then stop
    if (dB == null) {overlay.setOverlayText(`🔊 Gain: Stable Volume Active`);return;}

    // Display the raw loudness on the overlay (This all happens so fast that you'll likely never see this)
    overlay.setOverlayText(`🔊 Gain: Content Loudness: ${dB} dB`);

    // Do the adjustment math
    let gainTarget = Math.pow(10, (config.targetLoudnessDb - dB) / 20);
    gainTarget = Math.min(gainTarget, config.maxGain);
    if (debug) console.log("AutoGain: Target Gain: " + gainTarget)

    // Apply the new adjusted gain smoothly over time
    if (smoothing) {
        gainNode.gain.setTargetAtTime(gainTarget, audioCtx.currentTime, config.gainSmoothingTime);
    } else {
        gainNode.gain.setTargetAtTime(gainTarget, audioCtx.currentTime, 0);
    }

    // Check if the adjusted gain to show if gain is being increased or decreased
    const gainDiffDb = config.targetLoudnessDb - dB;
    const sign = gainDiffDb > 0 ? '+' : '';
    if (debug) console.log("AutoGain: Gain " + sign)

    // Update the overlay text with the adjusted gain
    if (dB != config.targetLoudnessDb) {
        overlay.setOverlayText(`🔊 Gain: ${sign}${gainDiffDb.toFixed(2)} dB`);
    } else {
        overlay.setOverlayText(`🔊 Gain: No Gain`);
    }
}
