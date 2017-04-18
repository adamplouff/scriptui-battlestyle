/** ====== About Script ===========
	Example and testing of ScriptUI style options used in Battle Axe tools. 

	Copyright 2017 Adam Plouff

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	   http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
**/

//encapsulate the script in a function to avoid global variables
(function (thisObj) {

//================ VARIABLES ======================
var scriptName = 'BattleStyle Tester';
var scriptVersion = '1.0';
var JSON;JSON||(JSON={}); (function(){function k(a){return a<10?"0"+a:a}function o(a){p.lastIndex=0;return p.test(a)?'"'+a.replace(p,function(a){var c=r[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function l(a,j){var c,d,h,m,g=e,f,b=j[a];b&&typeof b==="object"&&typeof b.toJSON==="function"&&(b=b.toJSON(a));typeof i==="function"&&(b=i.call(j,a,b));switch(typeof b){case "string":return o(b);case "number":return isFinite(b)?String(b):"null";case "boolean":case "null":return String(b);case "object":if(!b)return"null"; e+=n;f=[];if(Object.prototype.toString.apply(b)==="[object Array]"){m=b.length;for(c=0;c<m;c+=1)f[c]=l(c,b)||"null";h=f.length===0?"[]":e?"[\n"+e+f.join(",\n"+e)+"\n"+g+"]":"["+f.join(",")+"]";e=g;return h}if(i&&typeof i==="object"){m=i.length;for(c=0;c<m;c+=1)typeof i[c]==="string"&&(d=i[c],(h=l(d,b))&&f.push(o(d)+(e?": ":":")+h))}else for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(h=l(d,b))&&f.push(o(d)+(e?": ":":")+h);h=f.length===0?"{}":e?"{\n"+e+f.join(",\n"+e)+"\n"+g+"}":"{"+f.join(",")+ "}";e=g;return h}}if(typeof Date.prototype.toJSON!=="function")Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+k(this.getUTCMonth()+1)+"-"+k(this.getUTCDate())+"T"+k(this.getUTCHours())+":"+k(this.getUTCMinutes())+":"+k(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()};var q=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, p=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,e,n,r={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},i;if(typeof JSON.stringify!=="function")JSON.stringify=function(a,j,c){var d;n=e="";if(typeof c==="number")for(d=0;d<c;d+=1)n+=" ";else typeof c==="string"&&(n=c);if((i=j)&&typeof j!=="function"&&(typeof j!=="object"||typeof j.length!=="number"))throw Error("JSON.stringify");return l("", {"":a})};if(typeof JSON.parse!=="function")JSON.parse=function(a,e){function c(a,d){var g,f,b=a[d];if(b&&typeof b==="object")for(g in b)Object.prototype.hasOwnProperty.call(b,g)&&(f=c(b,g),f!==void 0?b[g]=f:delete b[g]);return e.call(a,d,b)}var d,a=String(a);q.lastIndex=0;q.test(a)&&(a=a.replace(q,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return d=eval("("+a+")"),typeof e==="function"?c({"":d},""):d;throw new SyntaxError("JSON.parse");}})();


// ================ FUNCTIONS =============

/** draw an icon with a colored background
	@parem {parentObj} - object - ScriptUI 
	@parem {iconVec} - array of strings - SVG coords as string 
	@parem {iconColor} - object - icon color 
	@parem {size} - object - icon size
*/
function buttonColorVector(parentObj, iconVec, iconColor, size) {
	var artSize = size;                                                         // defines the artsize before resizeing the button container
	var btn = parentObj.add('button', [0,0,size[0],size[1], undefined]);				// add a basic button to style
		btn.coord = vecToPoints(iconVec);
		btn.onDraw = vecDraw;

		return btn;

	function vecToPoints(vecCoord) {                                            // func that converts SCG coords to ScriptUI coords
		var points = [];
		var n;

		for(var i = 0; i < vecCoord.length; i++) {                                // loop through paths in a multi path icon
			var eachNum = vecCoord[i].split(/[\s,]/);                               // create an array of all the numbers - split at spaces or commas
			var coordinates = [];
			var sets = [];

			for (var k = 0; k < eachNum.length; k+=2) {                             // AI adds commas between coords, Sketch just spaces
				sets.push(eachNum[k] + ',' + eachNum[k+1]);                           // add pairs of numbers to an array
			}

			for (var j = 0; j < sets.length; j++) {                                 // loop through all sets
				n = sets[j].split(',');                                               // split each set apart
				coordinates[j] = n;
				coordinates[j][0] = (parseFloat(coordinates[j][0]));
				coordinates[j][1] = (parseFloat(coordinates[j][1]));
			}

			points.push(coordinates);                                               // combine each x,y as a 2D array
		}
		return points;                                                            // return the 2D array
	}

	function vecDraw() {                                                        // func that does the drawing
		with ( this ) {
			graphics.drawOSControl();

			// draw background
			graphics.rectPath(0,0,size[0],size[1]);
			graphics.fillPath(graphics.newBrush(graphics.BrushType.SOLID_COLOR, [0,0,0,0.15]));                 // set background color

			// draw shape
			try {
			for (var i = 0; i < coord.length; i++) {
				var line = coord[i];

				graphics.newPath();
				graphics.moveTo(line[0][0] + (size[0]/2 - artSize[0]/2), line[0][1] + (size[1]/2 - artSize[1]/2));
				for (var j = 0; j < line.length; j++) {
					graphics.lineTo(line[j][0] + (size[0]/2 - artSize[0]/2), line[j][1] + (size[1]/2 - artSize[1]/2));
				}
				graphics.fillPath(graphics.newBrush(graphics.BrushType.SOLID_COLOR, hexToArray(iconColor)));      // set icon color
			}
			} catch (e) {}
		}
	}

	function hexToArray(hexString) {                                          // func that converts hex to AE color string
		var hexColor = hexString.replace('#', '');
		var r = parseInt(hexColor.slice(0, 2), 16) / 255,
				g = parseInt(hexColor.slice(2, 4), 16) / 255,
				b = parseInt(hexColor.slice(4, 6), 16) / 255;
		return [r, g, b, 1];
	}
}

/** draw an icon with a colored background
	@parem {parentObj} - object - ScriptUI 
	@parem {accentColor} - string - icon color 
	@parem {buttonText} - string - button text
*/
function buttonColorText(parentObj, accentColor, buttonText) {
	var btn = parentObj.add('button', undefined, '');    // add a basic button to style
			btn.fillBrush = btn.graphics.newBrush( btn.graphics.BrushType.SOLID_COLOR, hexToArray(accentColor) );
			
			btn.text = buttonText.toUpperCase();

			btn.textPen = btn.graphics.newPen( btn.graphics.PenType.SOLID_COLOR, hexToArray('#ffffff'), 1 );
			
			btn.onDraw = gfxDraw;

	return btn;


	function gfxDraw() {                                                        // func that does the drawing
		with ( this ) {
			graphics.drawOSControl();

			// draw background
			graphics.rectPath(0,0,size[0],size[1]);
			graphics.fillPath(fillBrush);                 // set background color

			if (text) {
				graphics.drawString(
					text,
					textPen,
					(size[0]-graphics.measureString(text, graphics.font, size[0])[0])/2,
					(size[1]-graphics.measureString(text, graphics.font, size[0])[1])/1.75,
					graphics.font);
			}
		}
	}

	function hexToArray(hexString) {                                          // func that converts hex to AE color string
		var hexColor = hexString.replace('#', '');
		var r = parseInt(hexColor.slice(0, 2), 16) / 255,
				g = parseInt(hexColor.slice(2, 4), 16) / 255,
				b = parseInt(hexColor.slice(4, 6), 16) / 255;
		return [r, g, b, 1];
	}
}

/** open url in browser
	@parem {url} - string - url 
*/
function visitURL(url) {    // create clickable links
		if ($.os.indexOf("Windows") != -1) {
				system.callSystem('cmd /c "' + Folder.commonFiles.parent.fsName + "\\Internet Explorer\\iexplore.exe" + '" ' + url);
		} else {
				var cmd = 'open "' + url + '"';
				system.callSystem(cmd);
		}
}


// _______ UI SETUP _______
var mainPalette = thisObj instanceof Panel ? thisObj : new Window('palette',scriptName,undefined, {resizeable:true});

//stop if there's no window
if (mainPalette === null) return;

// set margins and alignment
mainPalette.alignChildren = ['fill','fill'];
mainPalette.margins = 5;
mainPalette.spacing = 2;

// ============ ADD UI CONTENT HERE =================
var content = mainPalette.add('group');
content.alignChildren = ['fill','top'];
content.orientation = 'column';
content.margins = 2;
content.spacing = 2;

var icons = {
	rubberhose: ['52.03 16.03 52.03 17.53 50.53 17.53 48.53 17.53 48.53 19.53 50.53 19.53 50.53 17.53 52.03 17.53 52.03 21.03 47.03 21.03 47.03 17.44 32.78 4.158 11.55 8.422 9.57 11.3 5.425 8.57 8.221 4.425 9.465 5.264 8.626 6.507 7.507 8.16 9.16 9.28 10.28 7.626 8.626 6.507 9.465 5.264 11.22 6.44 33.38 1.998 48.45 16.03',
								'31 13 31 10 28 10 28 13 25 13 25 16 28 16 28 19 31 19 31 16 34 16 34 13'],
	rubberrig: ['31.1242 14.5004 18.0002 8.5624 18.9992 3.8114 26.0622 1.0004 35.6882 10.2494 33.8087038 12 31.5624997 12 31.5624997 10 29 10 29 12 33.8087038 12',
				      '31.3191 15.6857 27.6271 14.0157 27.4531 15.3747 30.5621 21.9997 33.5631 22.9997 35.3911 11.8927',
				      '24 14 22 18 26 19 24 17',
				      '39 10 38 15 41 9 35 6'],
  rubberpin: ['9.853 14.9 9.293 9.768 12.29 6.915 29.09 13.18 31.75 13.18 33.38 14.4 47.02 19.91 46.18 22.35 33.96 20.26 30.00 17.05',
              '17 4 19 4 21 2 21 1 24 4 23 4 21 6 21 8 19.36 6.368 17.70 8 17 7.29 18.65 5.65',
              '32.65 9.65 31 8 33 8 35 6 35 5 38 8 37 8 35 10 35 12 33.36 10.36 31.70 12 31 11.29 32.65 9.65',
              '45.65 15.65 44 14 46 14 48 12 48 11 51 14 50 14 48 16 48 18 46.36 16.36 44.7023444 18 44 17.29 45.65 15.65'],
  ai: ['26.5,42.5 84.5,25.5 124.5,54.5 75.5,93.5 88.5,59.5 26.5,63.5']
}
var headerVec = ['24.78 7.64 25.20 6.07 40.03 14.36 39 10.12 59.59 19.72 60.01 18.81 37.53 8.34 38.52 12.37 25.70 5.21 26.79 4.33 21.09 2.99',
								'17.42 21.33 17.57 19.58 36.27 25.24 35.57 20.29 55.77 25.37 56.02 24.40 34.38 18.96 35.06 23.82 18.01 18.67 18.83 17.73 12.99 17.38',
								'33.69 34.92 56.38 33.69 56.32 32.70 31.56 34.04 34.33 37.13 19.65 36.85 20.19 35.56 14.54 37.07 19.98 39.43 19.61 37.85 36.60 38.17',
								'105.45 16.49 107.15 15.03 107.19 16.55 109.57 14.13 105.56 5.44 87.34 5.99 79.43 13.18 81.28 17.38 79.03 20.13 76.70 18.60 74.95 23.43 76.90 24.26 80.90 21.38 83.03 20.01 86.15 16.63 90.53 17.63 96.3716179 19.7442482 103.67 20.12 103.91 11.55',
								'109.57 14.13 107.19 16.55 107.38 24.22 105.53 18.66 103.67 20.12 90.53 17.63 90.78 22.63 84.15 24.13 83.03 20.01 80.90 21.38 80.28 25.51 76.90 24.26 74.95 23.43 72.28 30.82 80.78 35.51 89.90 25.51 95.15 27.63 90.72 27.13 88.65 28.88 93.15 34.38 106.78 34.38 114.17 24.10',
								'116.40 6.05 119.71 13.93 121.24 8.13 121.21 17.51 118.61 30.60 122.49 35.38 125.74 35.72 120.49 39.05 106.49 40.22 72.53 39.88 63.59 35.20 65.97 35.32 68.03 34.51 69.14 31.95 68.22 30.07 64.15 29.13 67.28 31.07 66.09 33.26 60.90 34.01 60.65 37.26 68.65 42.89 97.65 44.52 122.82 43.38 129.07 40.97 130.15 34.88 122.65 28.80 124.90 17.26 125.57 9.47 126.26 14.04 128.40 8.97 127.72 5.95 126.57 6.47 124.90 5.38 127.15 4.88 127.54 5.19 127.28 4.01 121.32 3.72',
								'127.28 4.01 127.50 5.15 128.24 5.72 127.66 5.98 127.96 7.57 132.49 7.38 133.40 5.47',
								'173.80 4 168.10 5.33 169.19 6.21 156.37 13.37 157.36 9.34 134.88 19.81 135.30 20.72 155.89 11.12 154.85 15.36 169.69 7.07 170.11 8.64',
								'137.71 25.90 137.93 26.87 158.60 22.10 156.15 27.35 172.45 22.76 172.49 24.38 177.16 20.72 171.31 20.69 172.16 21.80 157.98 25.80 160.37 20.67',
								'135.55 34.33 158.21 35.18 155.41 39.15 172.23 39.12 171.83 40.70 177.31 38.43 171.68 36.83 172.20 38.12 157.34 38.15 160.09 34.25 135.59 33.33']


var iconList = ['Select a preset', '-'];																	// store icon preset names in an array
for (var key in icons) {
	if (icons.hasOwnProperty(key)) {
		iconList.push(key);
	}
};

var ddl_presets = content.add('dropdownlist', undefined, iconList);
		ddl_presets.selection = 2;

var et_default = 'Paste SVG coordinate shit here';
var et_coords = content.add('edittext', undefined, getCoordString(ddl_presets.selection.text), {multiline:'true'});
		et_coords.minimumSize.height = 90;
		et_coords.maximumSize.height = 90;

var grp_buttons = content.add('group');
		grp_buttons.margins = [0,4,0,10];
var btn_update = buttonColorText(grp_buttons, '#546E7A', 'Refresh');
		btn_update.alignment = ['fill', 'fill'];
var cp = grp_buttons.add('edittext', undefined, '#00BCD4');
		cp.alignment = ['right', ''];
		cp.maximumSize.width = 72;

var btnSettings = grp_buttons.add('button',undefined,'?');
		btnSettings.maximumSize.width = 20;

var grp_output = content.add('group');
		grp_output.alignment = ['fill', 'fill'];
		grp_output.alignChildren = ['fill', 'fill'];


updateButton(grp_output);


// ============ Button Functionality =================

function updateButton(pGrp) {
	if (pGrp.children.length > 0) {
		pGrp.remove(pGrp.children[ pGrp.children.length-1 ]);
	}

	var goodQuotes = et_coords.text
		.replace(/[\u2018\u2019]/g, "'")
		.replace(/[\u201C\u201D]/g, '"');

	var btn_reference = buttonColorVector(pGrp, JSON.parse(goodQuotes), cp.text, [60, 24]);

	mainPalette.layout.layout(true);
	mainPalette.layout.resize()
}

function getCoordString(index) {
	return JSON.stringify(icons[index]);
}

ddl_presets.onChange = function() {
	et_coords.text = getCoordString(ddl_presets.selection.text);
	updateButton(grp_output);
}

et_coords.onChange = function() {
	ddl_presets.selection = 0;
}

btn_update.onClick = function() {
	try {
		updateButton(grp_output);
	} catch(e) { alert('Oops. Got some bad coordinates there. Try again.'); return; }
}

btnSettings.onClick = function() {
  var w = new Window ('dialog', 'About ' + scriptName);
  		w.margins = 0;
  		w.spacing = 0;
	var content = w.add('group');
			content.alignChildren = ['fill', 'fill'];
			content.orientation = 'column';
			content.alignment = ['top', 'left'];
			content.margins = 16;
			content.spacing = 8;

	var btn_url = buttonColorVector(content, headerVec, '#FFA726', [192,48]);
			btn_url.minimumSize.width = 300;
			btn_url.minimumSize.height = 64;

	content.add('statictext', undefined, 'Styling elements in ScriptUI is pretty rough. This is my own effort to standardize my own toolset and make things look a lot less ugly. 😬 \n\nExploiting the ScriptUI moveTo() method, icons may be drawn as long as they have straight lines. Paste an SVG coordinate string as an array using the format:\n\n [\'\'] \n\nFeel free to use in your own tools. \n\n' + scriptName + ' - v' + scriptVersion + '\nCreated by Adam Plouff at Battle Axe.\nbattleaxe.co', {multiline: true});

	buttonColorText(content, '#37474F', 'Close', {name: 'ok'});

	btn_url.onClick = function() {
		visitURL('http://battleaxe.co');
	};

	w.show();
};


//__________ SHOW UI ___________
// Set layout, and resize it on resize of the Panel/Window
mainPalette.onResizing = mainPalette.onResize = function () {mainPalette.layout.resize();};
//if the script is not a Panel (launched from File/Scripts/Run script...) we need to show it
if (!(mainPalette instanceof Panel)) mainPalette.show();

})(this);
