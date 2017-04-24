# BattleStyle
This is the internal styling toolkit for Battle Axe tools to get around the standard ScriptUI grossness. It's kinda hacky and utilizes a weird ScriptUI `moveTo()` method to draw single-color, resolution independent icons buttons without the need for local files. If that's your scene then go crazy with it.

This is also my ScriptUI template to speed up the AE script setup process.

![battlestyle_tester](https://cloud.githubusercontent.com/assets/8580225/25320319/f90e1806-2873-11e7-8fc9-3408a0ae6e04.gif)


## Installation
Download and drop it into AE's `Scripts/ScriptUI Panels` folder to test out the system with your own coordinates.

## Usage
Copy and tweak `buttonColorVector()` in your own project. Arguments:
- _parent object_ - ScriptUI panel or group
- _vector string_ - SVG coordinates as string(s) in an array
- _hex color string_ - #039BE5
- _size - size array_ with the art dimensions

## Coordinates
Copy the raw coordinates from an SVG file into an array of text strings. Feed this string into the `buttonColorVector()`. I like to store a bunch of icons in an object for added clarity.

![coords](https://cloud.githubusercontent.com/assets/8580225/25320447/27efbc8c-2875-11e7-8719-184651ce4033.png)

`var icons = {
    visibility: ['21. 9.44 26.3 8.84 22.2 11.2 24.9 16.4 33.7 16.4 38.6 11.9 10.0 33.5 12. 30 11.2 32.0 8.82 36.3 8.84 47 13 36 21 21 21 13 13 20 4 38 2 47 13 44.1 12.6 37.1 4.10 21. 5.92 16.9 11.3']
}`

## Issues
As far as I know, roll-over states are not possible. If you can figure it out then let me know. 

## Credits
Originally based on a super old post for drawing colored text buttons.
[[JS CS3/4] ScriptUI How to color a button ?][799ff023]

  [799ff023]: https://forums.adobe.com/thread/509131 "[JS CS3/4] ScriptUI How to color a button ?"

## License
Apache 2.0
