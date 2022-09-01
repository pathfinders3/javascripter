let g_layer1 = document.getElementById('layer1');
let range1 = document.getElementById('range1');
let rangeYou = document.getElementById('rangeYou');
let g_context = g_layer1.getContext('2d');
let g_img = new Image();
let g_imgsrc = new Image();

let g_dataIMG = new Image();
let g_stores = [];

let selcol1 = document.getElementById('colsel');
let browsers1 = document.getElementById('browsers');

let rect_cx = document.getElementById('rect_cx');	// show the clicked rectangle size
let rect_cy = document.getElementById('rect_cy');
let fourpx = [-1, -1];
let fourpy = [-1, -1];

let upperLine = [-1, -1, -2, -2];
let lowerLine = [-1, -1, -2, -2];
let middleLine = [-1, -1];
let clickedX = -1;
let clickedY = -1;

let paral_a = [-1, -1];

let pxArr = [];
let pyArr = [];

let cutMode = 'none'; // lr , etc.

let colAllias = {
  very_darkgray: [33,33,33],
  gray128: [128,128,128],
  white222: [222, 222, 222],
  book_231: [231, 218, 205]
};

let colNotSelect = [-1, -1, -1];

let g_drawGrid = true;
let g_toll = 20;

const cl = console.log.bind(console);






function storeGuideAsCookie() {	// (cx,cy)
  setCookie('px0', fourpx[0], 7);
  setCookie('py0', fourpy[0], 7); // clicked mouse position.

  setCookie('px1', fourpx[1], 7);
  setCookie('py1', fourpy[1], 7);

  /*
	coommit 커밋토?
  setCookie('px3', fourpx[3], 7);
  setCookie('py3', fourpy[3], 7);*/
}

function getGuideFromCookie() {
  fourpx[0] = getCookie('px0');
  fourpy[0] = getCookie('py0');  

  fourpx[1] = getCookie('px1');
  fourpy[1] = getCookie('py1');

  /*

  fourpx[3x] = getCookie('px3');
  fourpy[3x] = getCookie('py3');  */

  console.log(fourpx, fourpy, " was loaded");  

}

// setCookie('myHobby', 'game', '3');
function setCookie(cookie_name, value, days) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + days);
  // 설정 일수만큼 현재시간에 만료값으로 지정

  var cookie_value = escape(value) + ((days == null) ? '' : '; expires=' + exdate.toUTCString());
  document.cookie = cookie_name + '=' + cookie_value;
}

function getCookie(cookie_name) {
  var x, y;
  var val = document.cookie.split(';');

  for (var i = 0; i < val.length; i++) {
    x = val[i].substr(0, val[i].indexOf('='));
    y = val[i].substr(val[i].indexOf('=') + 1);
    x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
    if (x == cookie_name) {
      return unescape(y); // unescape로 디코딩 후 값 리턴
    }
  }
}


function changeLabelCol() {
  let lblPreset = document.getElementById('presets');
  if (lblPreset.style.backgroundColor == 'darksalmon') {
    lblPreset.style.backgroundColor = 'PaleGoldenrod';
    lblPreset.innerHTML = "Preset Registered- #" + pxArr.length;
    console.log("PALE!");
  } else {
    lblPreset.style.backgroundColor = 'DarkSalmon';
    lblPreset.innerHTML = "Preset Registered(Numkey 1/2/3/4)- #" + pxArr.length;
    console.log("DARK SALMON!");
  }

}

// fourpx, fourpy
function store4points(fpx, fpy) {
  //let tmp1 = [fpx[0], fpx[1], fpx[2], fpx[3]];
  //let tmp2 = [fpy[0], fpy[1], fpy[2], fpy[3]];
  let tmp1 = [fpx[0], fpx[1]];
  let tmp2 = [fpy[0], fpy[1]];

  pxArr.push(tmp1);
  pyArr.push(tmp2);

  if (pxArr.length > 3) {
    pxArr.splice(0, 1);
    pyArr.splice(0, 1);
  }

  //cl('You got great?');
  console.log(pxArr);
  console.log(pyArr);
}
// pull 4 points edges to use for cutting.
function pull4points(nn) {
  fourpx = pxArr[nn]; // e.g. pxArr[nn] == [x1, y1]
  fourpy = pyArr[nn];
}

function ShowTollVal(ev) {
  document.getElementById("lblToll").innerHTML = ev.value;
  g_toll = ev.value;
}


// * width and height. not second pos.
function cropImage(img1, x1, y1, xw, y2) {
  // virtual canvas
  let canvas = document.createElement('canvas');
  console.log('old cropped width', img1.width);

  // RESIZE THE CLONE CANVAS
  canvas.width = xw - x1;
  canvas.height = y2 - y1;

  let ctx = canvas.getContext('2d');
  ctx.drawImage(img1, x1, y1, xw - x1, y2 - y1, 0, 0, xw-x1, y2-y1);
  
  img1.src = canvas.toDataURL();  // restoring virtual canvas to img1 (source)
  img1.width = xw - x1;
  img1.height = y2 - y1;

  console.log('new cropped width',canvas.width);

  return img1;
}

// from stackoverflow
// stackoverflow.com/questions/4773966/drawing-an-image-from-a-data-url-to-a-canvas 
function drawDataURIOnCanvas(strDataURI, canvas) {
  "use strict";
  var img = new window.Image();
  img.addEventListener("load", function () {
    canvas.getContext("2d").drawImage(img, 0, 0);
  });
  img.setAttribute("src", strDataURI);
}

function restoreImageArrN(nn) {
  let idx = Number(document.getElementById('imgidx').value);
  console.log(idx, "97!", g_stores);

  g_layer1.width = g_stores[nn].width;
  g_layer1.height = g_stores[nn].height;
  drawDataURIOnCanvas(g_stores[nn].src, g_layer1);
  console.log(g_dataIMG.width, "is wid");
}
function restoreImageArr() {
  let idx = Number(document.getElementById('imgidx').value);
  console.log(idx, "97!", g_stores);

  g_layer1.width = g_stores[0].width;
  g_layer1.height = g_stores[0].height;
  drawDataURIOnCanvas(g_stores[0].src, g_layer1);
  console.log(g_dataIMG.width, "is wid");
}
function storeImageArr() {
  let dataIMG = new Image();
  dataIMG.src = g_layer1.toDataURL();
  g_stores.push(dataIMG);
  
  if (g_stores.length > 4) {
	  g_stores.splice(0,1);
  }

  storeGuideAsCookie();
}

/**
 * 마우스 클릭됐던 위치의 CX를 저장해 놓는다.
 * 최상단 평행 사변형의 상변 길이도 알고 있어야함
 * 
 */
function saveCX() {
  //rect_cx.value = fourpx[1] - fourpx[0];
  //rect_cy.value = fourpy[1] - fourpy[0];	
  let txtCX = document.getElementById('saved_cx');	// show the clicked rectangle size
  let txtCY = document.getElementById('saved_cy');

  txtCX.value = fourpx[1] - fourpx[0];
  txtCY.value = fourpy[1] - fourpy[0];
}

function saveUpperLine() {
  let txtUpper = document.getElementById('upper_cx');	// show the clicked rectangle size
  txtUpper.value = fourpx[1] - fourpx[0];
  //upperLine = [fourpx[0], fourpx[1], fourpy[0], fourpy[1]];
  upperLine = [fourpx[0], fourpx[1], clickedY, clickedY];
}

function saveLowerLine() {
  let txtLower = document.getElementById('lower_cx');	// show the clicked rectangle size
  txtLower.value = fourpx[1] - fourpx[0];
  lowerLine = [fourpx[0], fourpx[1], clickedY, clickedY];
}

function saveMiddleLine() {
  let txtMiddle = document.getElementById('middle_cx');	// show the clicked rectangle size
  txtMiddle.value = fourpx[1] - fourpx[0];
  middleLine = [fourpx[0], fourpx[1], clickedY, clickedY];
}

function calcSlope() {
  let txtSlope = document.getElementById('slope');	// show the clicked rectangle size
  let xgo = (lowerLine[1] - lowerLine[0]) - (upperLine[1] - upperLine[0]);
  let ygo = (lowerLine[3] - upperLine[3]);
  txtSlope.value = (ygo / (xgo / 2));
  txtSlope.value += "_Umha";
  //txtSlope.value += ',' + (lowerLine[1] - lowerLine[0]) / (upperLine[1] - upperLine[0])/2;
  cl('가 (2x) 기울기:' + (ygo / xgo));  // xgo;x를 두번 갔으니 하나는 빼어야...
}


function restoreImage() {
  g_layer1.width = g_dataIMG.width;
  g_layer1.height = g_dataIMG.height;
  drawDataURIOnCanvas(g_dataIMG.src, g_layer1);
}


//
//
function copyImage() {
  g_layer1.toBlob(blob => navigator.clipboard.write([new ClipboardItem({'image/png': blob})]));
}

// paint original image and store info
// input; index;nn, actual image;img1
/**
 * 그리드 그리기도 포함하고 있다
 */
function paint0Image(img1, drawGrid) {
  // draw on global context.
  g_context.drawImage(img1, 0, 0, img1.width, img1.height);
  //cl(img1.width, img1.height, ' 가 이미지 사이즈[316] ');

  if (drawGrid) {
    drawMeasure();
    drawTripe();
  }


}

// context is global.
/**
 * using four px [0-1], four py[0-1]
 */
function drawMeasure() {
  g_context.strokeStyle = 'rgb(63,99,0)';

  g_context.beginPath();
  //context.rect(fourpx[0], fourpy[0], fourpx[1] - fourpx[0], fourpy[1] - fourpy[0]);
  // 가로를 알려주는 세로선
  g_context.moveTo(fourpx[0], 0);
  g_context.lineTo(fourpx[0], g_img.height);
  // 가로를 알려주는 세로선
  g_context.moveTo(fourpx[1], 0);
  g_context.lineTo(fourpx[1], g_img.height);  

  // horizontal line for Y1
  g_context.moveTo(0, fourpy[0]);
  g_context.lineTo(g_img.width, fourpy[0]);

  // horizontal line for Y2
  g_context.moveTo(0, fourpy[1]);
  g_context.lineTo(g_img.width, fourpy[1]);

  g_context.stroke();

  let xsize = fourpx[1] - fourpx[0];
  let ysize = fourpy[1] - fourpy[0];
  //console.log("xsize;%d fpx01 ysize;%d fpy01", xsize, ysize);
  cl('녹색가드 좌표 : x1', fourpx[0], 'x2', fourpx[1], 'xsize', xsize, 'y1', fourpy[0]);
}

/*
Sadarigol Drawing... (BGI)
*/
function drawTripe() {
	  g_context.strokeStyle = 'rgb(242,112,70)';

  g_context.beginPath();
  // 윗변 알려주는 세로선
  g_context.moveTo(upperLine[0], upperLine[2]);
  g_context.lineTo(upperLine[1], upperLine[3]);

  // 밑변 알려주는 세로선
  g_context.moveTo(lowerLine[0], lowerLine[2]);
  g_context.lineTo(lowerLine[1], lowerLine[3]);

  // 중간변 알려주는 세로선
  g_context.moveTo(middleLine[0], middleLine[2]);
  g_context.lineTo(middleLine[1], middleLine[3]);  

  // 사다리 좌측 지선
  g_context.moveTo(upperLine[0], upperLine[2]);
  g_context.lineTo(lowerLine[0], lowerLine[2]);

  g_context.moveTo(upperLine[1], upperLine[2]);
  g_context.lineTo(lowerLine[1], lowerLine[2]);  

  /*
  g_context.moveTo(lowerLine[0], 0);
  g_context.lineTo(lowerLine[1], g_img.height);*/  

  g_context.stroke();


  // 추가된 부분 (클릭된 점 표시용)

  g_context.beginPath();
  g_context.strokeRect(middleLine[0], middleLine[2], 4, 4);

  
  g_context.strokeRect(paral_a[0], paral_a[1], 4, 4);  
}



/**
 * This handler retrieves the images from the clipboard as a blob and returns it in a callback.
 * 
 * @see http://ourcodeworld.com/articles/read/491/how-to-retrieve-images-from-the-clipboard-with-javascript-in-the-browser
 * @param pasteEvent 
 * @param callback 
 */
function retrieveImageFromClipboardAsBlob(pasteEvent, callback) {

  if (pasteEvent.clipboardData == false) {
    if (typeof (callback) == "function") {
      callback(undefined);
    }
  };

  var items = pasteEvent.clipboardData.items;

  if (items == undefined) {
    if (typeof (callback) == "function") {
      callback(undefined);
    }
  };

  for (var i = 0; i < items.length; i++) {
    // Skip content if not image
    if (items[i].type.indexOf("image") == -1) continue;
    // Retrieve image on clipboard as blob
    var blob = items[i].getAsFile();

    if (typeof (callback) == "function") {
      callback(blob);
    }
  }
}


function chkRightBlack(imgd, bg) {
  let pix = makeImageDataFrom(imgd).data;
  let newColor = { r: 0, g: 0, b: 0, a: 0 };
  let ret2 = parseInt(imgd.width / 2);  // The middle position is left max.

  for (let j = 0; j < imgd.height; j++) {
    let yb = (j * imgd.width * 4);  // base row
    let x1 = yb + 0;
    let x2 = yb + imgd.width * 4; // max: 50px
    let ret1 = imgd.width-1;

    // y,{x loop:horizon} needed e.g. x1;0~x2;4 then 0123
    for (let i = x2-4; i >= x1; i -= 4) {
      let r = pix[i];
      let g = pix[i + 1];
      let b = pix[i + 2];

      let de = deltaE([r, g, b], bg); // 3.175
      // If its black, go on
      //if (j == 35)
        //console.log(de, 'RIGHT! Col:', r,g,b, 'yx',j,',',(i-(j*imgd.width*4))/4);
      if (de < 25) {
        //console.log(j, 'this J out', i);
        ret1--;
        continue;
      }
      if (ret2 < ret1) { // if new one is greater, apply it.
        //console.log(j, '} ** New Right:', ret1, '>', ret2, 'total height', imgd.height, 'is height **');
        ret2 = ret1;
        break;
      } else {
        // to stop further progress to left, from right.
        //console.log(j, 'Not greater, skip'); 
        break;
      }

      //ret2 = (ret2 < ret1) ? ret1 : ret2;
    };

  }

  //console.log('right;', ret2);
  return ret2;

}

function getMousePosition(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  console.log("Coordinate x: " + x,
    "Coordinate y: " + y);
} 

//let idata1 = context.getImageData(0, 0, img.width, img.height);
function setPixel(imgData, x1, y1, rr,gg,bb) {
  let index = y1 * imgData.width + x1;
  let i = index * 4, d = imgData.data;

  d[i] = rr;
  d[i + 1] = gg;
  d[i + 2] = bb;
  // d[n] (pixel) 조정. (d = imgData.data)
}

function distortPixels() {
	let idata1 = g_context.getImageData(0, 0, g_img.width, g_img.height);
	//console.log(g_img.width, 'is Width L448;');
  
  let wide1 = idata1.width - (idata1.width % 4);

	for (let i=0; i<idata1.height; i++) {	// UNTIL' CHECK TODO.
		for (let j=0; j<wide1; j+=2) { // UNTIL' CHECK TODO.
			let pix1 = getPixel(idata1, j, i);
      let pix2 = getPixel(idata1, j+1, i);
      let pix3 = getPixel(idata1, j + 2, i);
      let pix4 = getPixel(idata1, j + 3, i);
			let r1 = pix1[0];	let g1 = pix1[1];	let b1 = pix1[2];
      let r2 = pix2[0]; let g2 = pix2[1]; let b2 = pix2[2];
      let r3 = pix3[0]; let g3 = pix3[1]; let b3 = pix3[2];
      let r4 = pix4[0]; let g4 = pix4[1]; let b4 = pix4[2];

      /*if (i==150) {
        console.log(j, "Gold458: ", pix);
        console.log(j, "Gold458: ", r2,g2,b2);
      }*/
      
      setPixel(idata1, j+0, i, r4, g4, b4);
			setPixel(idata1, j+1, i, r3, g3, b3);
      setPixel(idata1, j+2, i, r2, g2, b2);
      setPixel(idata1, j+3, i, r1, g1, b1);
		}
	}

  g_context.putImageData(idata1, 0,0);
	//setPixel(idata1, 10,10, r2,g2,b2);
}

function changeLines() {
  let idata1 = g_context.getImageData(0, 0, g_img.width, g_img.height);

  for (let i = 0; i < idata1.height; i++) {	// UNTIL' CHECK TODO.
    for (let j = 0; j < idata1.width; j++) { // UNTIL' CHECK TODO.
      let add1 = 99 + ((j*10) % 100);
      let pix = getPixel(idata1, j, i);
      let r2 = (pix[0] + add1) % 256;
      let g2 = (pix[1] + add1) % 256;
      let b2 = (pix[2] + add1) % 256; // MOD PROC TODO.

      if (i == 150 && j<30) {
        console.log(j, "Gold48: ", pix);
        console.log(j, "Gold48: ", r2, g2, b2);
      }

      setPixel(idata1, j, i, r2, g2, b2);
    }
  }

  g_context.putImageData(idata1, 0, 0);
}


function changeBackLines() {
  let idata1 = g_context.getImageData(0, 0, g_img.width, g_img.height);

  for (let i = 0; i < idata1.height; i++) {	// UNTIL' CHECK TODO.
    for (let j = 0; j < idata1.width; j++) { // UNTIL' CHECK TODO.
      let add1 = 99 + ((j * 10) % 100);
      let pix = getPixel(idata1, j, i);
      let r2 = (256 + (pix[0] - add1)) % 256;
      let g2 = (256 + (pix[1] - add1)) % 256;
      let b2 = (256 + (pix[2] - add1)) % 256; // MOD PROC TODO.


      if (i == 150 && j < 30) {
        console.log(j, "Gold48: ", pix);
        console.log(j, "Gold48: ", r2, g2, b2);
      }

      setPixel(idata1, j, i, r2, g2, b2);
    }
  }

  g_context.putImageData(idata1, 0, 0);
}

function changeCols() {
  let idata1 = g_context.getImageData(0, 0, g_img.width, g_img.height);

  for (let i = 0; i < idata1.height; i++) {	// UNTIL' CHECK TODO.
    for (let j = 0; j < idata1.width; j++) { // UNTIL' CHECK TODO.
      let add1 = 99 + ((i * 10) % 100);
      let pix = getPixel(idata1, j, i);
      let r2 = (pix[0] + add1) % 256;
      let g2 = (pix[1] + add1) % 256;
      let b2 = (pix[2] + add1) % 256; // MOD PROC TODO.

      if (i == 150 && j < 30) {
        console.log(j, "Gold48: ", pix);
        console.log(j, "Gold48: ", r2, g2, b2);
      }

      setPixel(idata1, j, i, r2, g2, b2);
    }
  }

  g_context.putImageData(idata1, 0, 0);
}


function changeBackCols() {
  let idata1 = g_context.getImageData(0, 0, g_img.width, g_img.height);

  for (let i = 0; i < idata1.height; i++) {	// UNTIL' CHECK TODO.
    for (let j = 0; j < idata1.width; j++) { // UNTIL' CHECK TODO.
      let add1 = 99 + ((i * 10) % 100);
      let pix = getPixel(idata1, j, i);
      let r2 = (256 + (pix[0] - add1)) % 256;
      let g2 = (256 + (pix[1] - add1)) % 256;
      let b2 = (256 + (pix[2] - add1)) % 256; // MOD PROC TODO.


      if (i == 150 && j < 30) {
        console.log(j, "Gold48: ", pix);
        console.log(j, "Gold48: ", r2, g2, b2);
      }

      setPixel(idata1, j, i, r2, g2, b2);
    }
  }

  g_context.putImageData(idata1, 0, 0);
}


function changePixels2(r11, g11, b11) {
  let idata1 = g_context.getImageData(0, 0, g_img.width, g_img.height);
  //console.log(g_img.width, 'is Width L448;');

  for (let i = 0; i < idata1.height; i++) {	// UNTIL' CHECK TODO.
    for (let j = 0; j < idata1.width; j++) { // UNTIL' CHECK TODO.
      let pix = getPixel(idata1, j, i);
      let r2 = (pix[0] + r11) % 256;
      let g2 = (pix[1] + g11) % 256;
      let b2 = (pix[2] + b11) % 256; // MOD PROC TODO.

      /*if (i == 150) {
        console.log(j, "Gold48: ", pix);
        console.log(j, "Gold48: ", r2, g2, b2);
      }*/

      setPixel(idata1, j, i, r2, g2, b2);
    }
  }

  g_context.putImageData(idata1, 0, 0);
 }

function changeBackPixels2(r11, g11, b11) {
  let idata1 = g_context.getImageData(0, 0, g_img.width, g_img.height);

  for (let i = 0; i < idata1.height; i++) {	// UNTIL' CHECK TODO.
    for (let j = 0; j < idata1.width; j++) { // UNTIL' CHECK TODO.
      let pix = getPixel(idata1, j, i);
      let r2 = (256 + (pix[0] - r11)) % 256;
      let g2 = (256 + (pix[1] - g11)) % 256;
      let b2 = (256 + (pix[2] - b11)) % 256; // MOD PROC TODO.

      /*if (i == 150) {
        console.log(j, "Gold48: ", pix);
        console.log(j, "Gold48: ", r2, g2, b2);
      }*/
      
      //setPixel(idata1, j, i, r2, g2, b2);
      setPixel(idata1, j, i, r2, g2, b2);
    }
  }

  g_context.putImageData(idata1, 0, 0);
}


// REMOVE? stackover-function. { data: [r,g,b,a,r,g,b,a,r,g,..], ... }
function getPixelByIndex(imgData, index) {
  let i = index * 4, d = imgData.data;
  return [d[i], d[i + 1], d[i + 2], d[i + 3]] // Returns array [R,G,B,A]
}
function getPixel(imgData, x, y) {
  return getPixelByIndex(imgData, y * imgData.width + x);
}

// get sequential index of xx, yy
function getIndex(xx, yy, imgd) {
  let idx = yy * imgd.width*4;
  idx += xx*4;
  return idx;
}

function getYFromIndex(idx, imgd) {
  let row1 = 4 * imgd.width;
  let yy = parseInt(idx / row1);
  return yy;
}

function getXFromIndex(idx, imgd) {
  let row1 = 4*imgd.width;
  let xx = parseInt(idx % row1) / 4;
  return xx;
}

function chkTopBlack(imgd, bg) {
  let pix = makeImageDataFrom(imgd).data;
  let newColor = { r: 0, g: 0, b: 0, a: 0 };
  let row1 = 4 * imgd.width;
  let ret2 = imgd.height-1;
  // horizontal first.
  for (let j = 0; j < imgd.width; j++) {
    //let y2old = getIndex(j, imgd.height, imgd) - row1; // max-bottom
    let y2 = getIndex(j, imgd.height - 1, imgd); // max-bottom
    let y1 = getIndex(j, 0, imgd);

    let ret1 = 0 - 1; // The first number to be tested is 0, so, do -1.

    for (let i = y1; i < y2; i += row1) {
      let r = pix[i];
      let g = pix[i + 1];
      let b = pix[i + 2];

      ret1++; // stepping down.

      let de = deltaE([r, g, b], bg); // [36, 36, 36]
      if (de < 25) {
        continue;
      }
      //console.log(de, ret1, '(', getXFromIndex(i, imgd), getYFromIndex(i, imgd), 'is xy value');
      if (ret2 > ret1) {
        ret2 = ret1;
        //console.log(ret2, "Tret2 changed ");
        break;
      }
    };  // i
  }   // j
  //console.log(ret2, "Tret2 returning ");
  return ret2;
}


// y:160 ~ 966
function chkBottomBlack(imgd, bg) {
  let pix = makeImageDataFrom(imgd).data;
  let newColor = { r: 0, g: 0, b: 0, a: 0 };
  let row1 = 4*imgd.width;
  let ret2 = 0;
    // horizontal first.
  for (let j = 0; j < imgd.width; j++) {
    //let y2old = getIndex(j, imgd.height, imgd) - row1; // max-bottom
    let y2 = getIndex(j, imgd.height - 1, imgd); // max-bottom
    let y1 = getIndex(j, 0, imgd);
    //console.log('y1-y2', y1, y2);
    let ret1 = imgd.height;// - 1;
    for (let i = y2; i >= y1; i -= row1) {
      let r = pix[i];
      let g = pix[i + 1];
      let b = pix[i + 2];

      ret1--; // stepping up.

      let de = deltaE([r, g, b], bg); // [36, 36, 36]
      if (de < 25) {
        continue;
      }
      //console.log(de, ret1, '(',getXFromIndex(i,imgd), getYFromIndex(i,imgd), 'is xy value');
      if (ret2 < ret1) {
        ret2 = ret1;
        //console.log(ret2, "Bottom Y Changing");
        break;
      }
    };  // i
  }   // j
  //console.log(ret2, "Bottom Y Decided");
  return ret2;
}



// make ImageData from Image (for transparent)
function makeImageDataFrom(img) {
  let can2 = document.createElement('canvas');
  can2.width = img.width;
  can2.height = img.height;

  //console.log(img.width, 'w', img.height, 'h');
  let ctx2 = can2.getContext('2d');

  ctx2.drawImage(img, 0, 0, img.width, img.height);

  let imgd = ctx2.getImageData(0, 0, img.width, img.height);
  let imgdsdata = setTransparent(imgd);
  imgd.data = imgdsdata;

  return imgd;
}

// return; Image.data(with applied transparent)
function setTransparent(imgd) {
  //let imgd = ctx2.getImageData(0, 0, 1280, 720);
  let pix = imgd.data;
  let newColor = { r: 0, g: 0, b: 0, a: 0 };

  for (let i = 0, n = pix.length; i < n; i += 4) {
    let r = pix[i];
    let g = pix[i + 1];
    let b = pix[i + 2];

    // If its white then change it
    if (r == 128 && g == 128 && b == 128) {
      //console.log(pix[i + 3],'is alpha for white');
      // Change the white to whatever.
      pix[i] = newColor.r;
      pix[i + 1] = newColor.g;
      pix[i + 2] = newColor.b;
      pix[i + 3] = newColor.a;
    }
  };

  return pix;
}

function imageData2Image(imagedata) {
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  canvas.width = imagedata.width;
  canvas.height = imagedata.height;
  ctx.putImageData(imagedata, 0, 0);

  let image = new Image();
  image.src = canvas.toDataURL();
  return image;
}

// get four points' indice.
function getFourIndex(x1, y1, width, height) {
  let dist1 = x1;
  let dist2 = width-x1;
  let dist3 = y1;
  let dist4 = height-y1;

  let min1 = Math.min(dist1, dist2, dist3, dist4);
  switch (min1) {
    case dist1: return 0;
    case dist2: return 1;
    case dist3: return 2;
    case dist4: return 3;
  }
  return -1;
}

// get four points' indice.
function getLRIndex(x1, iwidth) {
  let dist1 = x1;
  let dist2 = iwidth - x1;

  let min1 = Math.min(dist1, dist2);
  switch (min1) {
    case dist1: return 0;
    case dist2: return 1;
  }
  return -1;
}
// determine clicked position is near top or bottom
/**
 * top 0, bottom 1 (previously; top 2, bottom 3! [what a errorful!])
 */
function getTBIndex(y1, iheight) {
  let dist3 = y1;
  let dist4 = iheight - y1;

  let min1 = Math.min(dist3, dist4);
  switch (min1) {
    //case dist3: return 2;
    //case dist4: return 3;
    case dist3: return 0;
    case dist4: return 1;
  }
  return -1;
}

function copyCanvasContentsToClipboard(canvas, onDone, onError) {
  canvas.toBlob(function (blob) {
    let data = [new ClipboardItem({ [blob.type]: blob })];

    navigator.clipboard.write(data).then(function () {
      onDone();
    }, function (err) {
      onError(err);
    })
  });
}

// 난수발생
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}



// 한쪽 면만 고려한 Min Max.
// let xxx = getXMinLeftSide(6,5, 5,8, 7);
//let xxx = getXMinLeftSide(6, 5, 5,8, 8.0); =>expect ret=5.
//let xxx = getXMinLeftSide(6, 5, 5,8, 7.0); => exp 5.32;
//let xxx = getXMinLeftSide(6, 5, 5,8, 6.0); => exp 5.68;
function getXMinLeftSide(x1up, x1dn, y1,y2, yclick) {
  //let xlong_left = x1up - x1dn; //1
  let xlong_left = x1dn - x1up; //1
  let ylong_whole = y2 - y1;

  let mm = (ylong_whole / xlong_left);

  console.log(mm, "is mm");

  // y눌린좌표 실 적용 y=mx 에서 x값 유도
  // x= y/m
  // x= y/m + 시작점.
  let xstart = x1up + ((yclick - y1) / (mm));
  
  // for debug.
  //dbg1 = [xstart, yclick, y1, mm];
  //console.log(dbg1);

  return xstart;  
}

function getXMaxRightSide(x2up, x2dn, y1, y2, yclick) {
  let xlong_right = x2dn - x2up; //1
  let ylong_whole = y2 - y1;
  let mm = (ylong_whole / xlong_right);

  let xend = x2up + ((yclick - y1) / (mm));

  return xend;
}


// different version of getRatio()
// calcAvg(200,300,210) return : 10%
function calcAvg(x1, x2, xc) {
  let xrange = x2 -x1;
  let xpos = xc - x1;
  let avg = xpos/xrange*100;

  return avg;
}


// xup_cx, xup_n, mid_cx, mid_n
/**
 * using with parr line.
 * @param {*} xup_cx 
 * @param {*} xup_n 
 * @param {*} mid_cx 
 * @returns 
 */
function getRatio(xup_cx, xup_n, mid_cx) {
  let ret = xup_n * mid_cx / xup_cx;

  return ret;
}


// get left TILT
function getm1() {
  let ygo = (lowerLine[3] - upperLine[3]);
  let m1 = ygo / (upperLine[0] - lowerLine[0]);

  return m1;
}

// get left TILT
function getm2() {
  let ygo = (lowerLine[3] - upperLine[3]);
  let m2 = ygo / (lowerLine[1] - upperLine[1]);

  return m2;
}

function calcRatioStep2(clickY1) {
  ///* // 매우 잘 잡힘. (Xmin ~ XMax 2개 값)
    let ret_left = getXMinLeftSide(upperLine[0], lowerLine[0], upperLine[2], lowerLine[2], clickY1);
    cl("ret_left[좌시작점], upperLine", ret_left, upperLine);	// 좌측시작점
    let ret_right = getXMaxRightSide(upperLine[1], lowerLine[1], upperLine[2], lowerLine[2], clickY1);
    cl("ret_right[우끝점]", ret_right);	// 좌측시작점
  //*/
  
  //upperLine = [fourpx[0], fourpx[1], clickedY, clickedY];

  let clickedY2 = (clickY1 - upperLine[2]);

  let m1 = getm1();
  let m2 = getm2();

  // clickedY : NOT-0-BASE ! ! !!! 0 베이스가 아님!
  let xmin = upperLine[0] - (clickedY2 / m1);
  let xmax = upperLine[1] + (clickedY2 / m2);

  let xtotal = (xmax - xmin);
  let x_percent = (clickedX - xmin) / xtotal * 100;
  //cl("[calc] X-Percent:", x_percent);

  // 사다리꼴 좌우 끝값과 퍼센티지 리턴.
  let perc = calcAvg(ret_left, ret_right, (clickedY2/m1));
  //return [xmin, x_percent, xmax, ret_left, -1, ret_right];
  return [ret_left, perc, ret_right];
}

let ret1;

/**
 * calculate X step regarding Ratio.
 * / .... 30% xgo ...... /
 */
function calcRatioStep(clickY1) {
  ret1 = calcRatioStep2(clickY1);


  /* // 매우 잘 잡힘. (Xmin ~ XMax 2개 값)
    let ret_left = getXMinLeftSide(upperLine[0], lowerLine[0], upperLine[2], lowerLine[2], clickY1);
    cl("ret_left[좌시작점], upperLine", ret_left, upperLine);	// 좌측시작점
    let ret_right = getXMaxRightSide(upperLine[1], lowerLine[1], upperLine[2], lowerLine[2], clickY1);
    cl("ret_right[우끝점]", ret_right);	// 좌측시작점
  //*/

  /*
  let clickedY2 = (clickY1 - upperLine[2]);
  let ygo = (lowerLine[3] - upperLine[3]);
  let m1 = ygo / (upperLine[0] - lowerLine[0]);
  let m2 = ygo / (lowerLine[1] - upperLine[1]);
  // clickedY : NOT-0-BASE ! ! !!! 0 베이스가 아님!
  let xmin = upperLine[0] - (clickedY2 / m1);
  let xmax = upperLine[1] + (clickedY2 / m2);

  let xtotal = (xmax - xmin);
  let x_percent = (clickedX - xmin) / xtotal * 100;
  //cl("[calc] X-Percent:", x_percent);

  // 사다리꼴 좌우 끝값과 퍼센티지 리턴.
  return [xmin, x_percent, xmax];
  */

  return ret1;
}

// percentage에 대한 실제 X좌표 리턴.
/**
 * getXCoord(25, 100)
25
 */
function getXCoord(x_percent, xtotal) {
  let ret = (x_percent/100) * xtotal;

  return ret;
}

window.addEventListener("paste", function (e) {
  // Handle the event
  retrieveImageFromClipboardAsBlob(e, function (imageBlob) {
    // If there's an image, display it in the canvas
    if (imageBlob) {
      g_img = new Image();

      // Once the image loads, render the img on the canvas
      g_img.onload = function () {
        // Update dimensions of the canvas with the dimensions of the image
        // Draw the image
        // The Canvas2 for Rectangle.
        // Create 2nd Context as well (Here Restrict Image size Actual)
        g_layer1.width = this.width;
        g_layer1.height = this.height;

       
        paint0Image(g_img, g_drawGrid);
        console.log("img ONLOAD Called", this.width);
      };


      // Crossbrowser support for URL
      let URLObj = window.URL || window.webkitURL;

      // Creates a DOMString containing a URL representing the object given in the parameter
      // namely the original Blob
      g_img.src = URLObj.createObjectURL(imageBlob);
    }
  });
}, false);


g_layer1.addEventListener('mousedown', function (ev) {
  let imgData = g_context.getImageData(0, 0, g_layer1.width, g_layer1.height);

  //if (1 != event.which)
  if (1 != ev.which)
    return;

    // 마우스 클릭된 좌표
  let x1 = ev.offsetX;
  let y1 = ev.offsetY;

/*
  let ix4 = getFourIndex(x1, y1, img.width, img.height);
  fourpx[ix4] = x1;
  fourpy[ix4] = y1;*/

  // 클릭된 값을 넣는다
  let ix4 = -1;
  if (cutMode == 'cut2lr') {
    ix4 = getLRIndex(x1, g_img.width);
    fourpx[ix4] = x1;
    clickedX = x1;
    clickedY = y1;
  } else {
    ix4 = getTBIndex(y1, g_img.height);
    fourpy[ix4] = y1;  
    clickedX = x1;
    clickedY = y1; 
    
    //cl(/ix4 is for y now/, clickedY);// 조건문 들어오는 것 체크용
    // 미들라인은 모든 클릭 라인(Y 좌표 지정용 클릭 시 매번 ASSIGN)
    middleLine = [clickedX, clickedX */fourpx[1]*/, clickedY, clickedY];

    // X Coord Show, by step regarding x ratio.
    // xper1 = calcRatioStep(clickedY);
    xper2 = calcRatioStep(clickedY)[1];	// 함수내서 2번함수 테스트중.
	//let xper3 = calcRatioStep2(clickedY)[1];
	

    // 리턴을 퍼센테이지로 하므로 어긋난다 (5,10,15아래 위치가...)
    let xmin = calcRatioStep(clickedY + 15)[0];
    let xmax = calcRatioStep(clickedY + 15)[2];

    let xcoord = getXCoord(xper2, xmax - xmin);

    paral_a = [xmin + xcoord, clickedY + 15];
    //paral_a = [xmin + xcoord, clickedY];

    cl('__START_____________');
    cl('paral_a (xmin+이동거리, clickedY지점)',paral_a);

    cl('xcoord',xcoord); //19  현시점이 아닌 y+15시점의 xmin 으로부터의 거리
    cl('xper2', xper2);  //11 15
    cl('현위치서 15 down된 xmin', parseInt(xmin), 'xmax', parseInt(xmax)); //165 136
  }

  rect_cx.value = fourpx[1] - fourpx[0];
  rect_cy.value = fourpy[1] - fourpy[0];
  
  paint0Image(g_img, true); // to draw Measure.

  // SELECTED COLOR PRINT (from global_context) 
  let pix1 = getPixel(imgData, x1, y1);
  //console.log('찍은 픽셀 색깔 :', pix1[0], pix1[1], pix1[2]);

  colNotSelect = [pix1[0], pix1[1], pix1[2]]; // ACTUALLY SELECTED BY MOUSE
  /*if (x1 >= 0 && y1 >= 0 && x1 < layer1.width && y1 < layer1.height) {
    let pix = makeImageDataFrom(img).data;
    let ii = getIndex(x1, y1, img);
    let r = pix[ii];
    let g = pix[ii + 1];
    let b = pix[ii + 2];
    colNotSelect = [r, g, b];

    console.log('Normal_CutMode',x1, y1, colNotSelect);
  }*/
 
});

document.addEventListener('keydown', function (event) {
  let keycode = event.keyCode;
  let altkey = event.altKey;
  //let ctrlkey = event.ctrlKey;
  if (altkey) {
    if (54 == keycode) {//alt-6
    } else if (55 == keycode) {//alt-7
    } else if (56 == keycode) {//alt-8 
    } else if (57 == keycode) {//alt-9        
  	} else if (75 == keycode) {//alt-K.
    } else if (48 == keycode) {//alt-0
      // alt6~9 restoring images, 0: different feature.
      let rectCut = [0,0,600,400]; // coord base. (not width,height)
      rectCut[0] = Math.min(...fourpx);
      rectCut[1] = Math.max(...fourpx);
      rectCut[2] = Math.min(...fourpy);
      rectCut[3] = Math.max(...fourpy);

      console.log(rectCut, 'is rect for cutting 443');
    } else if (49 == keycode) {//alt_1 // NOT LIKE'D', REMOVE BG BY COLOR
      let bg = [36, 36, 36];
      bg = colAllias[selcol1.value];
      bg = (bg == null) ? colNotSelect : bg;
      console.log(bg, 'its bg');

      g_context.clearRect(0, 0, g_img.width, g_img.height);
      let x1 = chkLeftBlack(g_img, bg); //absolute poses.
      let x2 = chkRightBlack(g_img, bg);  // 이제, 중간부터 하면 안됨
      let y1 = chkTopBlack(g_img, bg);
      let y2 = chkBottomBlack(g_img, bg); // Search Not Only Center

      // CROP WITH +-10 MARGIN
      //cropImage(img, x1-10, y1-10, x2+10, y2+10); // 10x20
      let mg = Number(range1.value);  // margin value from original image
      //console.log('mg',mg);      //mg = 0;
      cropImage(g_img, x1-mg, y1-mg, x2+mg, y2+mg); // 10x20

      // ACTUAL VIEWPORT RESIZING
      g_layer1.width = g_img.width;
      g_layer1.height = g_img.height;
      console.log(x1,x2,y1,y2,'x1x2 y1y2');
    } else if (50 == keycode) {// ALT_2
      let bg = [37, 37, 37];
      bg = colAllias[selcol1.value];
      bg = (bg == null) ? colNotSelect : bg;

      g_context.clearRect(0, 0, g_img.width, g_img.height);
      let x1 = chkGoLeftBG(g_img, bg, g_toll); //absolute poses.
      let x2 = chkGoRightBG(g_img, bg, g_toll);  
      let y1 = chkGoUpBG(g_img, bg, g_toll);
      let y2 = chkGoDownBG(g_img, bg, g_toll); // Search Not Only Center

      //x1 = 0;
      //x2 = img.width-1;
      //y1 = 0;
      //y2 = img.height-1;

      // CROP WITH +-10 MARGIN
      let mg = Number(range1.value);  // margin value from original image
      cropImage(g_img, x1 - mg, y1 - mg, x2 + mg, y2 + mg); // 10x20

      // ACTUAL VIEWPORT RESIZING
      g_layer1.width = g_img.width;
      g_layer1.height = g_img.height;
      console.log('ALT2 Result x1x2 y1y2',x1, x2, y1, y2);
    }
  } else {  // if NOT ALT.
    if (82 == keycode) { //'R'
      cutMode = (cutMode == 'cut2lr' ? cutMode = 'cut2tb' : cutMode = 'cut2lr');
      
    } else if (68 == keycode) { //'D' ; Cut the Manual Region
      console.log(cutMode);

      cropImage(g_img, fourpx[0], fourpy[0], fourpx[1], fourpy[1]); // 10x20
      
      g_layer1.width = g_img.width;
      g_layer1.height = g_img.height;
      g_drawGrid = false;

      // SAVE AS ONE PRESET.
      cutMode = 'none';
      store4points(fourpx, fourpy);
      changeLabelCol();
    } else if (69 == keycode) { //'E'
      cutMode = 'cutlr';
      console.log(cutMode);
    } else if (71 == keycode) { //'G' ; On/Off Grid
      g_drawGrid = !g_drawGrid;
      paint0Image(g_img, g_drawGrid);
    } else if (49 == keycode) { //'1' (PULL)
      pull4points(0);
      g_drawGrid = true;
      paint0Image(g_img, g_drawGrid);
    } else if (50 == keycode) { //'2' (PULL)
      pull4points(1);
      g_drawGrid = true;
      paint0Image(g_img, g_drawGrid);
    } else if (51 == keycode) { //'3' (PULL)
      pull4points(2);
      g_drawGrid = true;
      paint0Image(g_img, g_drawGrid);      
    } else if (52 == keycode) { //'4' (PULL)
      pull4points(3);
      g_drawGrid = true;
      paint0Image(g_img, g_drawGrid);      
    } else if (192 == keycode) { //'`' to SAVE

      // SAVE AS ONE PRESET.
      cutMode = 'none';
      console.log(cutMode);

      console.log(fourpx, "fourpx");
      console.log(fourpy, "fourpy");
      store4points(fourpx, fourpy);

      changeLabelCol();
    } else if (37 == keycode) { // Keys.Left
      fourpx[0]--;
      paint0Image(g_img, g_drawGrid);
    } else if (39 == keycode) { // Keys.Right
      fourpx[0]++;
      paint0Image(g_img, g_drawGrid);
    } else if (113 == keycode) { // Keys.Right  
      fourpx[1]--;
      paint0Image(g_img, g_drawGrid);      
    } else if (115 == keycode) { // Keys.Right        
      fourpx[1]++;
      paint0Image(g_img, g_drawGrid);   
    } else if (38 == keycode) { // Keys.Up
      fourpy[0]--;
      paint0Image(g_img, g_drawGrid);
    } else if (40 == keycode) { // Keys.Dn
      fourpy[0]++;
      paint0Image(g_img, g_drawGrid);
    } else if (119 == keycode) { // Keys.Dn
      fourpy[1]--;
      paint0Image(g_img, g_drawGrid);
    } else if (120 == keycode) { // Keys.Dn
      fourpy[1]++;
      paint0Image(g_img, g_drawGrid);
    }
  }
});

