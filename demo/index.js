(function(thisObj) {
	// @include '../BattleButton.js'
	// @include 'json2.js'

	var scriptName = 'BattleStyle Tester';
	var scriptVersion = '1.1';

	buildUI(thisObj);

	function buildUI(thisObj) {
		var win = (thisObj instanceof Panel) ? thisObj : new Window('palette', scriptName, undefined, {
			resizeable: true
		});

		win.alignChildren = ['fill', 'top'];
		win.margins = 5;
		win.spacing = 2;

		var icons = {
			rubberhose: ['52.03 16.03 52.03 17.53 50.53 17.53 48.53 17.53 48.53 19.53 50.53 19.53 50.53 17.53 52.03 17.53 52.03 21.03 47.03 21.03 47.03 17.44 32.78 4.158 11.55 8.422 9.57 11.3 5.425 8.57 8.221 4.425 9.465 5.264 8.626 6.507 7.507 8.16 9.16 9.28 10.28 7.626 8.626 6.507 9.465 5.264 11.22 6.44 33.38 1.998 48.45 16.03',
				'31 13 31 10 28 10 28 13 25 13 25 16 28 16 28 19 31 19 31 16 34 16 34 13'
			],
			rubberrig: ['31.1242 14.5004 18.0002 8.5624 18.9992 3.8114 26.0622 1.0004 35.6882 10.2494 33.8087038 12 31.5624997 12 31.5624997 10 29 10 29 12 33.8087038 12',
				'31.3191 15.6857 27.6271 14.0157 27.4531 15.3747 30.5621 21.9997 33.5631 22.9997 35.3911 11.8927',
				'24 14 22 18 26 19 24 17',
				'39 10 38 15 41 9 35 6'
			],
			rubberpin: ['9.853 14.9 9.293 9.768 12.29 6.915 29.09 13.18 31.75 13.18 33.38 14.4 47.02 19.91 46.18 22.35 33.96 20.26 30.00 17.05',
				'17 4 19 4 21 2 21 1 24 4 23 4 21 6 21 8 19.36 6.368 17.70 8 17 7.29 18.65 5.65',
				'32.65 9.65 31 8 33 8 35 6 35 5 38 8 37 8 35 10 35 12 33.36 10.36 31.70 12 31 11.29 32.65 9.65',
				'45.65 15.65 44 14 46 14 48 12 48 11 51 14 50 14 48 16 48 18 46.36 16.36 44.7023444 18 44 17.29 45.65 15.65'
			],
			upgrade: ['60.78 2.49 61.38 2.82 57.63 3.78 57.38 2.81 61.14 1.85 61.59 1.74 61.74 2.18 66.18 16.21 65.23 16.51 63.98 12.56 62.73 13.49 61.66 15.55 61.78 18.17 62.76 19.54 64.19 20.24 66.34 20.13 68.72 18.51 69.77 16.55 69.66 13.78 68.70 12.46 67.17 11.73 64.69 12.02 64.27 10.40 67.76 10 69.91 11.02 71.26 12.88 71.41 16.77 69.94 19.53 66.59 21.81 63.56 21.97 61.55 20.98 60.18 19.06 60.00 15.37 61.51 12.46 63.48 10.99',
				'43.24 15.08 47.55 15.43 49 19.15 57.22 18.53 59.37 10.27 60.69 10.38 61.59 7.95 58.00 5.99 44.87 9.10 58.36 10.19 57.11 14.91 55.65 14.78 54.87 12 40.89 10.00 41.85 14.35 39.91 14.74 39.84 12.88 38.49 11.02 37.93 10.75 36.94 12.30 37.28 12.46 38.24 13.78 38.29 15.07 34.96 15.74 39.52 8.64 53.99 9.84 51.16 8.22 41.05 7.43 39.28 4.99 31.20 7.95 38.39 8.55 33.49 16.20 34.01 16.96 38.33 16.08 38.35 16.55 37.30 18.51 34.92 20.13 32.77 20.24 31.34 19.54 30.36 18.17 30.24 15.55 31.32 13.49 33.28 12.02 35.76 11.73 36.40 12.04 37.45 10.52 36.35 10 32.85 10.40 30.10 12.46 28.58 15.37 28.76 19.06 30.13 20.98 32.14 21.97 35.17 21.81 38.52 19.53 40 16.77 39.95 15.75',
				'12.55 22 30.82 22 27.47 21.25 24.17 19.63 21.37 21.25 18.95 20.36 14.03 21.47 15.19 20.52 15.03 18.55 13.36 17.69 12.15 18.13 11.81 18.75 11.30 16.80 9.73 16.39 10.91 16.28 12.36 15.30 13.55 13.70 13.99 11.72 12.28 8.83 10.21 7.69 6.03 8.14 3.31 11.12 4.23 13.64 5.91 14.67 8.24 14.33 9.10 15.09 8.24 14.89 6.64 15.02 4.96 17.76 5.94 19.76 7.23 20.73 10.04 20.27 10.96 19.44 10.46 20.49 9.55 20.68 11.04 22 12.55 22'
			],
			visibility: ['21.32 9.44 26.33 8.84 22.26 11.25 24.93 16.40 33.72 16.40 38.68 11.99 34 10.06 33.59 12.99 30 11.25 32.02 8.82 36.36 8.84 47 13 36 21 21 21 13 13 20 4 38 2 47 13 44.10 12.62 37.13 4.10 21.04 5.92 16.91 11.32'],
			braindump: ['26 15 27 22 25 23 23 19 24 17 23 18 19 20 15 18 16 15 18 13 24 11 19 12 16 13 14 16 10 15 9 9 12 4 17 2 20 3 16 5 20 4 25 3 30 4 28 5 33 5 35 9 34 10 32 9 35 12 34 14 33 15 33 16 31 18 28 19 27 16 30 14',
				'2 2 5 7 5 5 8 7 5 2 5 4', '4 22 7 17 7 19 10 17 7 22 7 20', '37 8 42 5 40 5 42 2 37 5 39 5', '35 17 38 22 38 20 41 22 38 17 38 19'
			],
		};

		var iconNames = ['Select a preset', '-'];
		for (var key in icons) {
			if (icons.hasOwnProperty(key)) {
				iconNames.push(key);
			}
		}

		var ddIcons = win.add('dropdownlist', undefined, iconNames);
		ddIcons.selection = 2;
		ddIcons.onChange = function() {
			etCoordinates.text = icons[this.selection.text].toSource();
			addButton(grpOutput, etCoordinates.text, etColor.text);
		};

		var etCoordinates = win.add('edittext', undefined, undefined, {
			multiline: true,
		});
		etCoordinates.preferredSize = [250, 90];
		etCoordinates.onChange = function() {
			ddIcons.selection = 0;
		};

		var grpButtons = win.add('group');
		grpButtons.alignChildren = ['right', 'center'];
		grpButtons.margins = [0, 4, 0, 10];

		var btnRefresh = new BattleButton(grpButtons, undefined, {
			backgroundColor: {
				mouseout: '#546E7A',
				mouseover: '#55869d',
				mousedown: '#3F5059',
				mouseup: '#00AEFF',
			}
		});
		btnRefresh.text = 'REFRESH';
		btnRefresh.alignment = ['fill', 'center'];
		btnRefresh.click = function() {
			addButton(grpOutput, etCoordinates.text, etColor.text);
		};

		var etColor = grpButtons.add('edittext', undefined, '#00BCD4');
		etColor.preferredSize.width = 72;

		var btnHelp = grpButtons.add('button', undefined, '?');
		btnHelp.preferredSize.width = 20;
		btnHelp.onClick = buildAboutUI;



		var grpOutput = win.add('group');
		grpOutput.alignment = ['fill', 'fill'];
		grpOutput.alignChildren = ['fill', 'fill'];
		grpOutput.orientation = 'column';



		ddIcons.onChange();



		win.onResizing = win.onResize = function() {
			this.layout.resize();
		};

		if (win instanceof Window) {
			win.center();
			win.show();
		} else {
			win.layout.layout(true);
			win.layout.resize();
		}
	}

	function buildAboutUI() {
		var win = new Window('dialog', 'About ' + scriptName);
		win.alignment = ['top', 'left'];
		win.alignChildren = ['fill', 'fill'];
		win.margins = 16;
		win.spacing = 8;

		var headerVec = ['24.78 7.64 25.20 6.07 40.03 14.36 39 10.12 59.59 19.72 60.01 18.81 37.53 8.34 38.52 12.37 25.70 5.21 26.79 4.33 21.09 2.99',
			'17.42 21.33 17.57 19.58 36.27 25.24 35.57 20.29 55.77 25.37 56.02 24.40 34.38 18.96 35.06 23.82 18.01 18.67 18.83 17.73 12.99 17.38',
			'33.69 34.92 56.38 33.69 56.32 32.70 31.56 34.04 34.33 37.13 19.65 36.85 20.19 35.56 14.54 37.07 19.98 39.43 19.61 37.85 36.60 38.17',
			'105.45 16.49 107.15 15.03 107.19 16.55 109.57 14.13 105.56 5.44 87.34 5.99 79.43 13.18 81.28 17.38 79.03 20.13 76.70 18.60 74.95 23.43 76.90 24.26 80.90 21.38 83.03 20.01 86.15 16.63 90.53 17.63 96.3716179 19.7442482 103.67 20.12 103.91 11.55',
			'109.57 14.13 107.19 16.55 107.38 24.22 105.53 18.66 103.67 20.12 90.53 17.63 90.78 22.63 84.15 24.13 83.03 20.01 80.90 21.38 80.28 25.51 76.90 24.26 74.95 23.43 72.28 30.82 80.78 35.51 89.90 25.51 95.15 27.63 90.72 27.13 88.65 28.88 93.15 34.38 106.78 34.38 114.17 24.10',
			'116.40 6.05 119.71 13.93 121.24 8.13 121.21 17.51 118.61 30.60 122.49 35.38 125.74 35.72 120.49 39.05 106.49 40.22 72.53 39.88 63.59 35.20 65.97 35.32 68.03 34.51 69.14 31.95 68.22 30.07 64.15 29.13 67.28 31.07 66.09 33.26 60.90 34.01 60.65 37.26 68.65 42.89 97.65 44.52 122.82 43.38 129.07 40.97 130.15 34.88 122.65 28.80 124.90 17.26 125.57 9.47 126.26 14.04 128.40 8.97 127.72 5.95 126.57 6.47 124.90 5.38 127.15 4.88 127.54 5.19 127.28 4.01 121.32 3.72',
			'127.28 4.01 127.50 5.15 128.24 5.72 127.66 5.98 127.96 7.57 132.49 7.38 133.40 5.47',
			'173.80 4 168.10 5.33 169.19 6.21 156.37 13.37 157.36 9.34 134.88 19.81 135.30 20.72 155.89 11.12 154.85 15.36 169.69 7.07 170.11 8.64',
			'137.71 25.90 137.93 26.87 158.60 22.10 156.15 27.35 172.45 22.76 172.49 24.38 177.16 20.72 171.31 20.69 172.16 21.80 157.98 25.80 160.37 20.67',
			'135.55 34.33 158.21 35.18 155.41 39.15 172.23 39.12 171.83 40.70 177.31 38.43 171.68 36.83 172.20 38.12 157.34 38.15 160.09 34.25 135.59 33.33'
		];

		var btnURL = new BattleButton(win, headerVec, {
			artColor: {
				mouseout: '#FFA726',
				mouseover: '#FFB74D'
			},
		});
		btnURL.preferredSize = [320, 64];
		btnURL.click = function() {
			openURL('http://battleaxe.co');
		};

		var text = 'Styling elements in ScriptUI is pretty rough. This is an effort to standardize my own toolset ' +
			'and reduce the amount of vomit in my mouth from staring garbage UI. 😬 \n\nExploiting the ScriptUI ' +
			'moveTo() method, icons may be drawn as long as they have straight lines. Curves are strictly forbidden. ' +
			'Paste an SVG coordinate string as an array using the format:\n\n' +
			'["' + headerVec[0] + '", "' + headerVec[1] + '"]' +
			'\n\nExport an SVG and locate the raw coordinates. Single and multiple path icons are supported. ' +
			'Coordinate strings can be with commas (from AI) or with just spaces.\n\nFeel free to use in your own tools.\n\n' +
			scriptName + ' - v' + scriptVersion +
			'\nCreated by Adam Plouff at Battle Axe\nbattleaxe.co';

		var etInfo = win.add('statictext', undefined, undefined, {
			multiline: true
		});

		etInfo.text = text;
		etInfo.preferredSize = [360, 320];


		var btnClose = new BattleButton(win, undefined, {
			backgroundColor: {
				mouseout: '#546E7A',
				mouseover: '#55869d',
			}
		});
		btnClose.text = 'CLOSE';
		btnClose.click = function() {
			win.close();
		};


		win.show();


		function openURL(url) {
			var cmd, isWindows;

			if (!url.match(/^https?:\/\//)) {
				url = url.replace(/^(http)?s?:?\/?\/?/, '');
				url = 'http://' + url;
			}

			cmd = 'open "' + url + '"';

			isWindows = $.os.indexOf('Windows') !== -1;
			if (isWindows) {
				url = url.replace(/&/g, '^&');
				cmd = 'cmd /c "start ' + url + '"';
			}

			system.callSystem(cmd);
		}
	}

	function addButton(parentGroup, coordinatesAsText, mouseout) {
		try {
			while (parentGroup.children.length > 0) {
				parentGroup.remove(parentGroup.children[0]);
			}

			var coordinates = JSON.parse(coordinatesAsText);
			var btnDemo = new BattleButton(parentGroup, coordinates, {
				artColor: {
					mouseout: mouseout,
					mouseover: '#BAEFF6',
				},
			});
			btnDemo.click = function() {
				alert('clicked');
			};
			btnDemo.preferredSize.height = 40;

			var btnRandom = new BattleButton(parentGroup, undefined, {
				artColor: {
					mouseover: randomHex(),
					mousedown: randomHex(),
					mouseout: randomHex(),
					mouseup: randomHex()
				},
				backgroundColor: {
					mouseover: randomHex(),
					mousedown: randomHex(),
					mouseout: randomHex(),
					mouseup: randomHex()
				},
				textColor: {
					mouseover: randomHex(),
					mousedown: randomHex(),
					mouseout: randomHex(),
					mouseup: randomHex()
				}
			});
			btnRandom.text = 'RANDOM COLORS';
			btnRandom.click = function() {
				addButton(parentGroup, coordinatesAsText, mouseout);
			};

			parentGroup.window.layout.layout(true);
			parentGroup.window.layout.resize();

		} catch (error) {
			var message = error.toString();
			if (error instanceof Error) {
				message += '\nScript File: ' + File(error.fileName).displayName +
					'\nFunction: ' + arguments.callee.name +
					'\nError on Line: ' + error.line.toString();
			}
			alert(message);
		}
	}

	function randomHex() {
		return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
	}
})(this);