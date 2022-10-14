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

//let upperLine = [-1, -1, -2, -2];
//let lowerLine = [-1, -1, -2, -2];
let middleLine = [-1, -1];
let g_clickedX = -1;
let g_clickedY = -1;

let x1up, x1dn, y1up, y1dn;
let x2up, x2dn;

let paral_a = [-1, -1];

let pxArr = [];
let pyArr = [];

let cutMode = 'none'; // lr , etc.

let colAllias = {
  very_darkgray: [33, 33, 33],
  gray128: [128, 128, 128],
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
  ctx.drawImage(img1, x1, y1, xw - x1, y2 - y1, 0, 0, xw - x1, y2 - y1);

  img1.src = canvas.toDataURL();  // restoring virtual canvas to img1 (source)
  img1.width = xw - x1;
  img1.height = y2 - y1;

  console.log('new cropped width', canvas.width);

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
  //upperLine = [fourpx[0], fourpx[1], clickedY, clickedY];
  x1up = fourpx[0];
  x2up = fourpx[1];
  y1up = g_clickedY;
}

function saveLowerLine() {
  let txtLower = document.getElementById('lower_cx');	// show the clicked rectangle size
  txtLower.value = fourpx[1] - fourpx[0];
  //lowerLine = [fourpx[0], fourpx[1], clickedY, clickedY];
  x1dn = fourpx[0];
  x2dn = fourpx[1];
  y1dn = g_clickedY;
}

/*
function saveMiddleLine() {
  let txtMiddle = document.getElementById('middle_cx');	// show the clicked rectangle size
  txtMiddle.value = fourpx[1] - fourpx[0];
  middleLine = [fourpx[0], fourpx[1], g_clickedY, g_clickedY];
}*/


// HTML INPUT사용
/*
function calcSlope() {
  let txtSlope = document.getElementById('slope');	// show the clicked rectangle size
  let xgo = (lowerLine[1] - lowerLine[0]) - (upperLine[1] - upperLine[0]);
  let ygo = (lowerLine[3] - upperLine[3]);
  txtSlope.value = (ygo / (xgo / 2));
  txtSlope.value += "_Umha";
  //txtSlope.value += ',' + (lowerLine[1] - lowerLine[0]) / (upperLine[1] - upperLine[0])/2;
  cl('가 (2x) 기울기:' + (ygo / xgo));  // xgo;x를 두번 갔으니 하나는 빼어야...
}*/


function restoreImage() {
  g_layer1.width = g_dataIMG.width;
  g_layer1.height = g_dataIMG.height;
  drawDataURIOnCanvas(g_dataIMG.src, g_layer1);
}


//
//
function copyImage() {
  g_layer1.toBlob(blob => navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]));
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

  // NEW HORIZON
  g_context.strokeStyle = 'rgb(93,59,0)';
  g_context.moveTo(x1up, g_img.height/2);
  g_context.lineTo(x1dn, g_img.height/2);  

  // NEW YLONG
  g_context.moveTo(g_img.width / 2, y1up);
  g_context.lineTo(g_img.width / 2, y1dn);

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
  g_context.moveTo(x1up, y1up);
  g_context.lineTo(x2up, y1up);

  // 밑변 알려주는 세로선
  g_context.moveTo(x1dn, y1dn);
  g_context.lineTo(x2dn, y1dn);

  // 사다리 좌측 지선
  g_context.moveTo(x1up, y1up);
  g_context.lineTo(x1dn, y1dn);

  g_context.moveTo(x2up, y1up);
  g_context.lineTo(x2dn, y1dn);

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



function getMousePosition(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  console.log("Coordinate x: " + x,
    "Coordinate y: " + y);
}

//let idata1 = context.getImageData(0, 0, img.width, img.height);
function setPixel(imgData, x1, y1, rr, gg, bb) {
  let index = y1 * imgData.width + x1;
  let i = index * 4, d = imgData.data;

  d[i] = rr;
  d[i + 1] = gg;
  d[i + 2] = bb;
  // d[n] (pixel) 조정. (d = imgData.data)
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
  let idx = yy * imgd.width * 4;
  idx += xx * 4;
  return idx;
}

function getYFromIndex(idx, imgd) {
  let row1 = 4 * imgd.width;
  let yy = parseInt(idx / row1);
  return yy;
}

function getXFromIndex(idx, imgd) {
  let row1 = 4 * imgd.width;
  let xx = parseInt(idx % row1) / 4;
  return xx;
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
  let dist2 = width - x1;
  let dist3 = y1;
  let dist4 = height - y1;

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


/**
 * get Slope.
 */
function getMM(x1up, x1dn, y1, y2) {
  let xlong_left = x1dn - x1up; // xlong/ylong 이 기울기
  let ylong_whole = y2 - y1;

  let mm = (ylong_whole / xlong_left);
  
  return mm;
}


/**
 *  get X on a Sea-Line(HorizonLine).
 *      ###############
        #             ##
       ##               #
 x1(min)#◄◄►X              # x2(max)
      #    ▲              #
     ##    ▼               #
     x1dn ####################### x2dn
 * @param {*} m1 
 * @param {*} x1dn 
 * @param {*} yy clicked y(z)
 * @returns x go from x1min
 */
function getX_Horizon(m1, x1dn, yy) {
  let xx = -(1 / m1) * yy + x1dn;
  return xx;
}


// https://postimg.cc/PC8fqfs1
// 한쪽 면만 고려한 Min Max.
// let xxx = getXMinLeftSide(6,5, 5,8, 7);
//let xxx = getXMinLeftSide(6, 5, 5,8, 8.0); =>expect ret=5.
//let xxx = getXMinLeftSide(6, 5, 5,8, 7.0); => exp 5.32;
//let xxx = getXMinLeftSide(6, 5, 5,8, 6.0); => exp 5.68;
function getXMinLeftSide(x1up, x1dn, y1, y2, yclick) {
  //let xlong_left = x1up - x1dn; //1
  let xlong_left = x1dn - x1up; // xlong/ylong 이 기울기
  let ylong_whole = y2 - y1;

  let mm = (ylong_whole / xlong_left);

  // y눌린좌표 실 적용 y=mx 에서 x값 유도
  // x= y/m
  // x= y/m + 시작점.
  let x_Min = x1up + ((yclick - y1) / (mm));

  // for debug.
  //dbg1 = [xstart, yclick, y1, mm];
  //console.log(dbg1);

  return x_Min;
}

// https://postimg.cc/PC8fqfs1
// https://imgpile.com/i/Ttyy9L
function getXMaxRightSide(x2up, x2dn, y1_edge, y2_edge, yclick) {
  let xlong_right = x2dn - x2up; // xlong/ylong 이 기울기
  let ylong_whole = y2_edge - y1_edge;
  let mm = (ylong_whole / xlong_right);

  let x_Max = x2up + ((yclick - y1_edge) / (mm));

  return x_Max;
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

/**
 * calculate X step regarding Ratio.
 * / .... 30% xgo ...... /
 * 전역변수 1개 사용: clickedX.
 */
function calcRatioStep3(clickY1) {
  ///* // 매우 잘 잡힘. (Xmin ~ XMax 2개 값)
  let Xmin = getXMinLeftSide(x1up, x1dn, y1up, y1dn, clickY1);
  let Xmax = getXMaxRightSide(x2up, x2dn, y1up, y1dn, clickY1);

  let clickedY2 = (clickY1 - y1up); // 아래로 이동한 거리

  getMM(x1up, x1dn, clickY1, clickY1);
  
  // 사다리꼴 좌우 끝값과 퍼센티지 리턴.
  let XPercent = convCoord2Pct(ret_left_min, ret_right_max, g_clickedX);

  //debugger;

  //return [ret_left_min, perc, ret_right_max];
  return {Xmin, XPercent, Xmax};
}


function calcRatioStep2(clickY1) {
  ///* // 매우 잘 잡힘. (Xmin ~ XMax 2개 값)
  let ret_left_min = getXMinLeftSide(upperLine[0], lowerLine[0], upperLine[2], lowerLine[2], clickY1);
  //cl("ret_left[좌시작점]", ret_left_min);	// 좌측시작점
  let ret_right_max = getXMaxRightSide(upperLine[1], lowerLine[1], upperLine[2], lowerLine[2], clickY1);
  //cl("ret_right[우끝점]", ret_right_max);	// 좌측시작점
  //*/

  let clickedY2 = (clickY1 - upperLine[2]);

  // clickedY : NOT-0-BASE ! ! !!! 0 베이스가 아님!
  //let xmin = upperLine[0] - (clickedY2 / m1);
  //let xmax = upperLine[1] + (clickedY2 / m2);
  //let x_percent = (clickedX - xmin) / xtotal * 100;

  // 사다리꼴 좌우 끝값과 퍼센티지 리턴.
  let perc = convCoord2Pct(ret_left_min, ret_right_max, g_clickedX);

  //cl("[calc] X-Percent & perc:", x_percent, perc);  

  //debugger;

  return [ret_left_min, perc, ret_right_max];
}

let ret1;

/**
 * calculate X step regarding Ratio.
 * / .... 30% xgo ...... /
 */
function calcRatioStep(clickY1) {
  //ret1 = calcRatioStep2(clickY1);
  ret1 = calcRatioStep3(clickY1);

  return ret1;
}

// percentage에 대한 실제 X(or Y)좌표 리턴.
/**
    ┌──┬┬────────┐
    └──┴┴────────┘
 * getXCoord(25, 100)
25
 */
function convPct2Coord(x_percent, xtotal) {
  let x_or_y = (x_percent / 100) * xtotal;

  return x_or_y;
}

// different version of getRatio()
// calcAvg(200,300,210) return : 10%
function convCoord2Pct(x1, x2, xc) {
  let xrange = x2 - x1;
  let xpos = xc - x1;
  let avg = xpos / xrange * 100;

  return avg;
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

  cl("clicked:",x1,y1);

  // 클릭된 값을 넣는다
  let ix4 = -1;
  if (cutMode == 'cut2lr') {
    ix4 = getLRIndex(x1, g_img.width);
    fourpx[ix4] = x1;
    g_clickedX = x1;
    g_clickedY = y1;
  } else {
    ix4 = getTBIndex(y1, g_img.height);
    fourpy[ix4] = y1;
    g_clickedX = x1;
    g_clickedY = y1;

    // 미들라인은 모든 클릭 라인(Y 좌표 지정용 클릭 시 매번 ASSIGN)
    //middleLine = [clickedX, clickedX, clickedY, clickedY];
    // 사다리꼴 안그려지면 복귀(Above)

    // X Coord Show, by step regarding x ratio.
    //xper2 = calcRatioStep(clickedY)[1];	// 함수내서 2번함수 테스트중.
    g_tmp1 = calcRatioStep3(g_clickedY);
    //xper2 = g_tmp1[1];
    xper2 = g_tmp1.XPercent;

    // 아래 부분은 함수로 하여 여러 곳에 찍게 해야 하지 않나?
    // 여러 Y값을 주어...
    // 리턴을 퍼센테이지로 하므로 어긋난다 (5,10,15아래 위치가...)
    let xmin = calcRatioStep(g_clickedY + 15)[0];
    let xmax = calcRatioStep(g_clickedY + 15)[2];

    let xcoord = convPct2Coord(xper2, xmax - xmin);

    paral_a = [xmin + xcoord, g_clickedY + 15];

    cl('__START_____________');
    //cl('paral_a (xmin+이동거리, clickedY지점)', paral_a);

    cl('xcoord', toRound(xcoord)); //19  현시점이 아닌 y+15시점의 xmin 으로부터의 거리
    cl('xper2', toRound(xper2), "%");  //11 15
    cl('현위치서 15 down된 xmin', parseInt(xmin), 'xmax', parseInt(xmax)); //165 136
  }

  rect_cx.value = fourpx[1] - fourpx[0];
  rect_cy.value = fourpy[1] - fourpy[0];

  paint0Image(g_img, true); // to draw Measure.

  // SELECTED COLOR PRINT (from global_context) 
  let pix1 = getPixel(imgData, x1, y1);
  //console.log('찍은 픽셀 색깔 :', pix1[0], pix1[1], pix1[2]);

  colNotSelect = [pix1[0], pix1[1], pix1[2]]; // ACTUALLY SELECTED BY MOUSE
});

function toRound(num) {
  return Math.round(num * 10) / 10;  
}

document.addEventListener('keydown', function (event) {
  let keycode = event.keyCode;
  let altkey = event.altKey;

  if (altkey) {
    if (54 == keycode) {//alt-6
    } else if (55 == keycode) {//alt-7
    } else if (75 == keycode) {//alt-K.
    } else if (48 == keycode) {//alt-0
      // alt6~9 restoring images, 0: different feature.
      let rectCut = [0, 0, 600, 400]; // coord base. (not width,height)
      rectCut[0] = Math.min(...fourpx);
      rectCut[1] = Math.max(...fourpx);
      rectCut[2] = Math.min(...fourpy);
      rectCut[3] = Math.max(...fourpy);

      console.log(rectCut, 'is rect for cutting 443');
    } else if (49 == keycode) {//alt_1 // NOT LIKE'D', REMOVE BG BY COLOR
    } else if (50 == keycode) {// ALT_2
    }
  } else {  // if NOT ALT.
    if (82 == keycode) { //'R'
      cutMode = (cutMode == 'cut2lr' ? cutMode = 'cut2tb' : cutMode = 'cut2lr');

    } else if (68 == keycode) { //'D' ; Cut the Manual Region
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
    } else if (37 == keycode) { // Keys.Left
      fourpx[0]--;
      paint0Image(g_img, g_drawGrid);
    } else if (39 == keycode) { // Keys.Right
      fourpx[0]++;
      paint0Image(g_img, g_drawGrid);
    } else if (113 == keycode) { // F2: left  
      fourpx[1]--;
      paint0Image(g_img, g_drawGrid);
    } else if (115 == keycode) { // F4: Right
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

