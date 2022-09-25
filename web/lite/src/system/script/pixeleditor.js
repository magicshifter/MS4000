'use strict';

var matrix = document.getElementById('container');
var colorField = document.getElementById('colors');
var paletteIcon = document.getElementById('palette');
var uploadBtn = document.getElementById('upload');
var pixels = new Array;
const height = 16;
const width = 16;
const totalWidth = 16;
for(var x = 0; x < width; x++){
    pixels[x] = [];    
    for(var y = 0; y < height; y++){ 
        pixels[x][y] = new Object
        pixels[x][y]["color"] = new Array;
		pixels[x][y]["color"]["r"],pixels[x][y]["color"]["g"],pixels[x][y]["color"]["b"] = new Number;    
    }    
}

var currentR,currentG,currentB;
colorField.style.visibility = "hidden";


var r,
    g,
    b = 0;
var currentColor = "100,0,0";

paletteIcon.addEventListener("click", function () {
	if (colorField.style.visibility == "hidden") colorField.style.visibility = "visible";else colorField.style.visibility = "hidden";
});
uploadBtn.addEventListener("click",upLoad);

function buildMatrix(xDim,yDim) {
	for (var i = 0; i < yDim; i++) {
		for (var ii = 0; ii < xDim; ii++) {
			var pixel = document.createElement("img");
			pixel.src = '../system/img/1px.png';
			pixel.classList.add('pixel');
			pixel.setAttribute('data-src', i + "-" + ii);
			pixel.setAttribute('id', i + "-" + ii);
			matrix.appendChild(pixel);
			pixel.addEventListener('mousedown', setColor);
		}
	}
	var clear = document.createElement("div");
	clear.classList.add('clear');
	matrix.appendChild(clear);
}
function setColor() {
	if (this.getAttribute('style')){
		this.removeAttribute('style');
	} else 
	{
		this.setAttribute('style', "background-color:rgb(" + currentColor + ")");
		var cell = this.getAttribute('data-src');
		var style = this.getAttribute('style');
		var index = cell.split("-");
		console.log(index[0],index[1]);
     	console.log(currentColor);
		 var m = currentColor.split(",")
	      if (m != null)
	      {
	        pixels[index[0]][index[1]].color.r = m[0];
			pixels[index[0]][index[1]].color.g = m[1];			
			pixels[index[0]][index[1]].color.b = m[2];
	      }
			
		}
}
function pickColor() {
	currentColor = this.getAttribute('data-src');
	colorField.style.visibility = "hidden";
	// Command Seperated Values 1

}

function colorMatrix() {
	var f = 0;
	for (var i = 0; i < 16; i++) {
		for (var ii = 0; ii < 16; ii++) {
			var color = document.createElement("img");
			color.src = '../system/img/1px.png';
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
function getBlob(){

  const subType = 'bitmap';
  const headerSize = 16;
  const bitPerPixel = 24;
  const delayMs = 500;
  const fileSize = CalcBufferSize(bitPerPixel, width, height) + headerSize;
  const frames = 1;
  const firstChar = 0;

	const fileData = new Uint8Array(fileSize);

	// write header
	fileData[0] = 0x23;
	fileData[1] = (fileSize & 0xFF0000) >> 16;
	fileData[2] = (fileSize & 0xFF00) >> 8;
	fileData[3] = (fileSize & 0xFF) >> 0;

	fileData[4] = bitPerPixel;
	fileData[5] = (frames - 1); // 0 for static images larger for animations and fonts
	fileData[6] = width;
	fileData[7] = height;

	fileData[8] = subType === 'font' ? 0xF0 : subType === 'bitmap' ? 0xBA : 0x00;
	fileData[9] = firstChar; // >= 1 for fonts/ 0 for animations
	fileData[10] = (delayMs & 0xFF00) >> 8; // 0 for fonts
	fileData[11] = (delayMs & 0xFF) >> 0;

	for (let x = 0; x < height; x++) {
	  for (let y = 0; y < width; y++) {
	    const fileDataIdx = headerSize + 3 * (y + x * height);
	    	const tx = y;
	    	const ty = x;
	    	fileData[fileDataIdx + 0] = pixels[tx][ty].color.r ? pixels[tx][ty].color.r : 0
	     	fileData[fileDataIdx + 1] = pixels[tx][ty].color.g ? pixels[tx][ty].color.g : 0
	     	fileData[fileDataIdx + 2] = pixels[tx][ty].color.b ? pixels[tx][ty].color.b : 0 
	  }
	}

	const blob = new window.Blob([fileData]);
	return blob;
}	 
function CalcBufferSize(bitPerPixel, w, h){
	if (bitPerPixel === 24) {
	  return w * h * 3;
	}

	if (bitPerPixel === 8) {
	  return w * h;
	} else if (bitPerPixel === 1) {
	  if ((w * h) % 8) {
	    window.alert('CalcBufferSize: Ugly 1bit BufferSize: ' + (w * h / 8));
	    return Math.ceil(w * h / 8);
	  }
	  return w * h / 8;
	} else {
	  window.alert('CalcBufferSize: Unknown bitPerPixel Value: ' + (w * h / 8));
	}
} 
function upLoad(){
	console.log(pixels);	
	const blob = getBlob();
    const fileName = "TestSwitch6.magicBitmap";

      // console.log({url});

    const formData = new window.FormData();
    formData.append('uploadFile', blob, fileName);

    const request = new window.XMLHttpRequest();
    request.onload =
        () =>
        	request.status === 200
        	? console.log('Uploaded!')
        	: console.warn('ErrorStutus 200 occurred when trying to upload your file.');

    	request.timeout = 30000;
    	request.ontimeout =
        () =>
        	console.warn('Connection to' + ipHost() + 'timed out!!!');

    request.open('POST', 'http://' + ipHost() + '/upload');
    request.send(formData);
}
function ipHost()
{
  return location.host ? location.host : '192.168.4.1' ;  
}

 
colorMatrix();
buildMatrix(height,width);
