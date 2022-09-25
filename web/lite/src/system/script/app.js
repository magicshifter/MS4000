'use strict';

var matrix = document.getElementById('container');
var colorField = document.getElementById('colors');
var paletteIcon = document.getElementById('palette');
colorField.style.visibility = "hidden";

var r,
    g,
    b = 0;
var currentColor = "100,0,0";
paletteIcon.addEventListener("click", function () {
	if (colorField.style.visibility == "hidden") colorField.style.visibility = "visible";else colorField.style.visibility = "hidden";
});

function buildMatrix() {
	for (var i = 0; i < 16; i++) {
		for (var ii = 0; ii < 16; ii++) {
			var pixel = document.createElement("img");
			pixel.src = '../../img/1px.png';
			pixel.classList.add('pixel');
			pixel.setAttribute('data-src', i + "-" + ii);
			pixel.setAttribute('id', i + "-" + ii);
			matrix.appendChild(pixel);
			pixel.addEventListener('click', setColor);
		}
	}
}
function setColor() {
	if (this.getAttribute('style')) this.removeAttribute('style');else this.setAttribute('style', "background-color:rgb(" + currentColor + ")");
}
function pickColor() {
	currentColor = this.getAttribute('data-src');
	colorField.style.visibility = "hidden";
}

function colorMatrix() {
	var f = 0;
	for (var i = 0; i < 16; i++) {
		for (var ii = 0; ii < 16; ii++) {
			var color = document.createElement("img");
			color.src = '../../img/1px.png';
			color.classList.add('pixel');
			var colorString = wheel(300 / (16 * 16) * f);
			color.setAttribute('style', "background-color:rgb(" + colorString + ")");
			color.setAttribute('data-src', colorString);
			color.setAttribute('id', i + "-" + ii);
			colorField.appendChild(color);
			color.addEventListener('click', pickColor);
			f++;
		}
	}
}
function wheel(WheelPos) {
	var factor = 255 / 50;
	if (WheelPos < 50) {
		r = 255;
		g = 0;
		b = WheelPos * factor;
	} else if (WheelPos < 100) {
		r = 255 - (WheelPos - 50) * factor;
		g = 0;
		b = 255;
	} else if (WheelPos < 150) {
		r = 0;
		g = (WheelPos - 100) * factor;
		b = 255;
	} else if (WheelPos < 200) {
		r = 0;
		g = 255;
		b = 255 - (WheelPos - 150) * factor;
	} else if (WheelPos < 250) {
		r = 255;
		g = 255 - (WheelPos - 200) * factor;
		b = 0;
	} else {
		r = (WheelPos - 250) * factor * 2;
		g = (WheelPos - 250) * factor * 2;
		b = (WheelPos - 250) * factor * 2;
	}
	return Math.floor(r) + "," + Math.floor(g) + "," + Math.floor(b);
}
colorMatrix();
buildMatrix();