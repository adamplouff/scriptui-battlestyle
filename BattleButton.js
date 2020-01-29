function BattleButton(parentGroup, coordinates, colors) {
	var button, eventTypes;

	button = parentGroup.add('button');
	colors = colors || {};
	coordinates = coordinates || [];
	eventTypes = ['mouseout', 'mouseover', 'mousedown', 'mouseup'];


	button.artColor = extend({}, [{
		mouseout: 'E0E0E0'
	}, colors.artColor]);

	button.backgroundColor = extend({}, [{
		mouseout: '202020'
	}, colors.backgroundColor]);

	button.textColor = extend({}, [{
		mouseout: 'E0E0E0'
	}, colors.textColor]);


	button.artCoordinates = parseCoordinates(coordinates);
	button.artSize = getArtSize(button.artCoordinates);


	button.onClick = onClick;
	button.onDraw = onDraw;


	addEventListeners(button);
	dispatchMouseEvent(button, 'mouseout');

	return button;



	function addEventListeners(element) {
		for (var i = 0, il = eventTypes.length; i < il; i++) {
			element.addEventListener(eventTypes[i], setColors);
		}
	}

	function dispatchMouseEvent(element, type) {
		var mouseEvent = ScriptUI.events.createEvent('MouseEvent');
		mouseEvent.initMouseEvent(type);
		element.dispatchEvent(mouseEvent);
	}

	function extend(target, sources) {
		target = target || {};
		for (var i = 0, il = sources.length; i < il; i++) {
			var source = sources[i];
			if (source) {
				for (var key in source) {
					if (source.hasOwnProperty(key)) {
						if (Object.prototype.toString.call(source[key]) === '[object Object]') {
							target[key] = extend(target[key], [source[key]]);
							continue;
						}

						target[key] = source[key];
					}
				}
			}
		}

		return target;
	}

	function getArtSize(coord) {
		var artSize = {
			xMin: Number.POSITIVE_INFINITY,
			yMin: Number.POSITIVE_INFINITY,
			xMax: Number.NEGATIVE_INFINITY,
			yMax: Number.NEGATIVE_INFINITY,
		};

		for (var i = 0, il = coord.length; i < il; i++) {
			var line = coord[i];
			for (var j = 0, jl = line.length; j < jl; j++) {
				var point = line[j];
				artSize.xMin = Math.min(artSize.xMin, point[0]);
				artSize.xMax = Math.max(artSize.xMax, point[0]);
				artSize.yMin = Math.min(artSize.yMin, point[1]);
				artSize.yMax = Math.max(artSize.yMax, point[1]);
			}
		}
		artSize.width = artSize.xMax - artSize.xMin;
		artSize.height = artSize.yMax - artSize.yMin;

		return artSize;
	}

	function hexToAdobeRGB(hexColor) {
		hexColor = hexColor.replace('#', '');

		var r = parseInt(hexColor.slice(0, 2), 16);
		var g = parseInt(hexColor.slice(2, 4), 16);
		var b = parseInt(hexColor.slice(4, 6), 16);

		return [r, g, b] / 255;
	}

	function onClick() {
		dispatchMouseEvent(this, 'mouseup');

		if (this.click && typeof this.click === 'function') {
			this.click();
		}
	}

	function onDraw() {
		var graphics, height, line, point, stringSize, width, x, y;

		width = this.size[0];
		height = this.size[1];
		graphics = this.graphics;

		if (this.backgroundBrush) {
			graphics.rectPath(0, 0, width, height);
			graphics.fillPath(this.backgroundBrush);
		}

		if (this.artBrush) {
			x = (width - this.artSize.width) / 2 - this.artSize.xMin;
			y = (height - this.artSize.height) / 2 - this.artSize.yMin;
			for (var i = 0, il = this.artCoordinates.length; i < il; i++) {
				line = this.artCoordinates[i];

				graphics.newPath();
				graphics.moveTo(line[0][0] + x, line[0][1] + y);
				for (var j = 1, jl = line.length; j < jl; j++) {
					point = line[j];
					graphics.lineTo(point[0] + x, point[1] + y);
				}

				graphics.fillPath(this.artBrush);
			}
		}

		if (this.textPen) {
			stringSize = graphics.measureString(this.text, graphics.font);
			x = (width - stringSize[0]) / 2;
			y = (height - stringSize[1]) / 2;

			graphics.drawString(this.text, this.textPen, x, y, graphics.font);
		}
	}

	function parseCoordinates(lines) {
		var coordinates, numbers, points, x, y;

		coordinates = [];
		for (var i = 0, il = lines.length; i < il; i++) {
			points = [];
			numbers = lines[i].split(/[\s,]/);
			for (var j = 0, jl = numbers.length; j < jl; j += 2) {
				x = parseFloat(numbers[j]);
				y = parseFloat(numbers[j + 1]);

				points.push([x, y]);
			}

			coordinates.push(points);
		}

		return coordinates;
	}

	function setColors(mouseEvent) {
		var artColor, backgroundColor, textColor, type;

		type = mouseEvent.type;

		artColor = this.artColor[type] || this.artColor.mouseout;
		this.artBrush = getNewBrush(this, hexToAdobeRGB(artColor));

		backgroundColor = this.backgroundColor[type] || this.backgroundColor.mouseout;
		this.backgroundBrush = getNewBrush(this, hexToAdobeRGB(backgroundColor));

		textColor = this.textColor[type] || this.textColor.mouseout;
		this.textPen = getNewPen(this, hexToAdobeRGB(textColor), 2);


		function getNewBrush(element, color) {
			return element.graphics.newBrush(element.graphics.BrushType.SOLID_COLOR, color);
		}

		function getNewPen(element, color, lineWidth) {
			return element.graphics.newPen(element.graphics.PenType.SOLID_COLOR, color, lineWidth);
		}
	}
}