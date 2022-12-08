var canvas1 = document.getElementById('canvas');
var context1 = canvas1.getContext('2d');
var zoomfactor = 5;
var g_screen_width = window.screen.width;//600;
var g_screen_height = window.screen.height;
g_screen_width = document.getElementById("canvas").width;
g_screen_height = document.getElementById("canvas").height;

let	g_aa = Number(document.getElementById('aa').value);
let g_bb = Number(document.getElementById('bb').value);
let g_cc = Number(document.getElementById('cc').value);
//let g_angYawOnly = Number(document.getElementById('ang').value);

let g_t1 = Number(document.getElementById('t1').value);
let g_t2 = Number(document.getElementById('t2').value);


// String 1: 기본 배열
let gArrString1 = [[2.1213, 2.1213, 0], [1.7981, 2.36, 0], [1.4031, 2.5046, 0], [0.9523, 2.5493, 0], [0.4634, 2.4924, 0], [-0.0439, 2.3362, 0], [-0.5494, 2.0868, 0], [-1.0331, 1.7542, 0], [-1.4756, 1.3517, 0], [-1.8592, 0.8953, 0], [-2.1687, 0.4032, 0], [-2.3918, -0.105, 0], [-2.5195, -0.609, 0], [-2.5468, -1.0887, 0], [-2.4725, -1.525, 0], [-2.2997, -1.9005, 0], [-2.0351, -2.2003, 0], [-1.6895, -2.4123, 0], [-1.2765, -2.5281, 0], [-0.8126, -2.5432, 0], [-0.3163, -2.4569, 0], [0.1926, -2.2726, 0], [0.6938, -1.9977, 0], [1.1674, -1.6432, 0], [1.5944, -1.2232, 0], [1.9579, -0.7544, 0], [2.2433, -0.2555, 0], [2.4392, 0.2535, 0], [2.538, 0.7525, 0], [2.5355, 1.2214, 0], [2.432, 1.6417, 0],];
// Turn by gAngle...
let gArrString2 = [[2.1213, 2.1213, 0], [1.7981, 2.36, 0], [1.4031, 2.5046, 0], [0.9523, 2.5493, 0], [0.4634, 2.4924, 0], [-0.0439, 2.3362, 0], [-0.5494, 2.0868, 0], [-1.0331, 1.7542, 0], [-1.4756, 1.3517, 0], [-1.8592, 0.8953, 0], [-2.1687, 0.4032, 0], [-2.3918, -0.105, 0], [-2.5195, -0.609, 0], [-2.5468, -1.0887, 0], [-2.4725, -1.525, 0], [-2.2997, -1.9005, 0], [-2.0351, -2.2003, 0], [-1.6895, -2.4123, 0], [-1.2765, -2.5281, 0], [-0.8126, -2.5432, 0], [-0.3163, -2.4569, 0], [0.1926, -2.2726, 0], [0.6938, -1.9977, 0], [1.1674, -1.6432, 0], [1.5944, -1.2232, 0], [1.9579, -0.7544, 0], [2.2433, -0.2555, 0], [2.4392, 0.2535, 0], [2.538, 0.7525, 0], [2.5355, 1.2214, 0], [2.432, 1.6417, 0],];

// String 2: 기본 배열
let gArrString3 = [[2.1213, 2.1213, 0], [1.7981, 2.36, 0], [1.4031, 2.5046, 0], [0.9523, 2.5493, 0], [0.4634, 2.4924, 0], [-0.0439, 2.3362, 0], [-0.5494, 2.0868, 0], [-1.0331, 1.7542, 0], [-1.4756, 1.3517, 0], [-1.8592, 0.8953, 0], [-2.1687, 0.4032, 0], [-2.3918, -0.105, 0], [-2.5195, -0.609, 0], [-2.5468, -1.0887, 0], [-2.4725, -1.525, 0], [-2.2997, -1.9005, 0], [-2.0351, -2.2003, 0], [-1.6895, -2.4123, 0], [-1.2765, -2.5281, 0], [-0.8126, -2.5432, 0], [-0.3163, -2.4569, 0], [0.1926, -2.2726, 0], [0.6938, -1.9977, 0], [1.1674, -1.6432, 0], [1.5944, -1.2232, 0], [1.9579, -0.7544, 0], [2.2433, -0.2555, 0], [2.4392, 0.2535, 0], [2.538, 0.7525, 0], [2.5355, 1.2214, 0], [2.432, 1.6417, 0],];
// Turn by gAngle...
let gArrString4 = [[2.1213, 2.1213, 0], [1.7981, 2.36, 0], [1.4031, 2.5046, 0], [0.9523, 2.5493, 0], [0.4634, 2.4924, 0], [-0.0439, 2.3362, 0], [-0.5494, 2.0868, 0], [-1.0331, 1.7542, 0], [-1.4756, 1.3517, 0], [-1.8592, 0.8953, 0], [-2.1687, 0.4032, 0], [-2.3918, -0.105, 0], [-2.5195, -0.609, 0], [-2.5468, -1.0887, 0], [-2.4725, -1.525, 0], [-2.2997, -1.9005, 0], [-2.0351, -2.2003, 0], [-1.6895, -2.4123, 0], [-1.2765, -2.5281, 0], [-0.8126, -2.5432, 0], [-0.3163, -2.4569, 0], [0.1926, -2.2726, 0], [0.6938, -1.9977, 0], [1.1674, -1.6432, 0], [1.5944, -1.2232, 0], [1.9579, -0.7544, 0], [2.2433, -0.2555, 0], [2.4392, 0.2535, 0], [2.538, 0.7525, 0], [2.5355, 1.2214, 0], [2.432, 1.6417, 0],];



/**
 * Vertices Set of Ellipses 소스
 * (together: gArm and gTiltArm)
 * e.g. gArm[0] : The first String.
 */
let gArm = [gArrString1, gArrString3 ];
/**
 * Tiled Vertices of Ellipses 회전된.
 * (together: gArm and gTiltArm) 
 */
let gTiltArm = [gArrString2, gArrString4];

// 누적 각 기록자
let gAngleXZ = 0;
let gAngleXY = 0;

let gAngleZY = 0;


context1.clearRect(0, 0, canvas1.width, canvas1.height);

canvas1.addEventListener("mousemove", getMousePosition, false);

// 마우스 기록용 십자선 좌표
let crossCoord = { x: 0, y: 0 };


const compareArray = function(a, b) {
    if (JSON.stringify(a) == JSON.stringify(b)) {
    	return true;
    } else {
    	return false;
    }
}

/**
 * insertArrayVal(0, g_arrTotal, g_arrTotal2)
  insertArrayVal(0, g_arrTotal2, g_arrTotal)
 * @param {*} xyz 0;x, 1;y, 2;z
 * @param {*} arrSrc new array element
 * @param {*} arrTar 
 */
function insertArrayVal(xyz, arrTar, arrSrc) {
  //console.log('x_or_y: ', xor_y);
  //console.log('tar길이=src길이 ', arrTar.length, arrSrc.length);
  for (let i = 0; i < arrSrc.length; i++) {
    // 잠시멈춤 [gLog보기위해] console.log('Target : Src = ', arrTar[i][xor_y], arrSrc[i][xor_y]);
    arrTar[i][xyz] = arrSrc[i][xyz];
  }
  //g_arrTotal[i][xor_y]


}

/**
 * pick one pixel [ [x1,y1,z1], ...]
 * @param {*} xyz wanted x/y/z
 * @param {*} arrSrc [ [x1,y1,z1], ...]
 * @param {*} i index
 * @returns [x1,y1,z1]
 */
function pickArrayVal(xyz, arrSrc,i) {
  return arrSrc[i][xyz];
}

var gtest1 = 0;

/**
 * save one pixel's x/y or z. (so 3 calls required for 1 pixel)
 * @param {*} xyz indicator (x/y/z)
 * @param {*} arrTar 
 * @param {*} xyz1v the value (x/y/z)
 * @param {*} i 
 * @returns the pixel info.(data)
 */
function saveArrayVal(xyz, arrTar, xyz1v,i) {
  //arrTar[i][xyz] = [x1, y1];
  // console.log(i, ' of arrTar');  // 0.2?
  arrTar[i][xyz] = xyz1v;
  
  return arrTar[i][xyz];
}

/**
 * 미사용 중. duplication of Array 
 */
function duplicateArray1to2(/*arrTotal*/) {
  gArrString2 = JSON.parse(JSON.stringify(gArrString1));
}

function duplicateArray2to1(/*arrTotal*/) {
  gArrString1 = JSON.parse(JSON.stringify(gArrString2));
}

// 마우스 포지션용
function getMousePosition(event) {
    let x = new Number();
    let y = new Number();
    
    if(event.x != undefined && event.y != undefined){
        x = event.x;
        y = event.y;
    }
    else // Firefox method to get the position
    {
          x = event.clientX + document.body.scrollLeft +
              document.documentElement.scrollLeft;
          y = event.clientY + document.body.scrollTop +
              document.documentElement.scrollTop;
    }
    
    x -= canvas1.offsetLeft;
    y -= canvas1.offsetTop;
    document.getElementById("position").innerHTML = "X = " + x.toString() + " , Y = " + y.toString();
  
    crossCoord.x = x;
    crossCoord.y = y;
}

// Key Event: 화살표 키로 마우스 커서 이동
document.addEventListener("keydown", function (e) {

  switch (e.key) {
    case "i": crossCoord.y -= 1; break;
    case "l": crossCoord.x += 1; break;
    case "k": crossCoord.y += 1; break;
    case "j": crossCoord.x -= 1; break;
  }

  drawAll();
});

// var gItems;
// window.addEventListener("paste", function (thePasteEvent) {
//   gItems = thePasteEvent.clipboardData.items;

//   console.log('are you pasting', gItems);
// }, false);



/**
 * Cartesian to screen
 * convCoord(0,0)
  {screenX: 250, screenY: 200}
 */
function convCoord(cartx, carty, zoom) {

  let scrX = cartx*zoom + g_screen_width/2;
	let scrY = g_screen_height/2 - carty*zoom;
  
  return {scrX, scrY};
}

// 마우스 십자선 그리기
function drawCrossCoord(ctx) {
  ctx.rect(crossCoord.x-3, crossCoord.y-3, 3,3);
  ctx.stroke();
  // HTML에서와 동일수치 표시: http://prntscr.com/OxL-NtKUHD2x
  //console.log("Mouse Position: ", crossCoord.x, crossCoord.y);
}

// 5 Grid Points. (5성 지점 포인트 그리기)
function drawGrid(ctx) {
	let arrg = [[0,0], [5,5], [-5,-5], [5,-5], [-5,5]];
	ctx.fillStyle = "#505050";
  ctx.strokeStyle = "#601010";
  
  for (let i=0; i<arrg.length; i++) {
  	let ret0 = convCoord(arrg[i][0],arrg[i][1], zoomfactor);  
	  ctx.rect(ret0.scrX, ret0.scrY, zoomfactor, zoomfactor);
  }
 	//ctx.stroke();
  ctx.fill();
}

/**
 * 주어진 배열(대개 gArrAll2)에 따른 Polygon 그리기
 * arrT: [ [x1,y1,z1], ...] e.g. gArrAll2
 */
function drawPoly2(ctx, arrT) {
  // console.log("@@[drawPoly2]");
	let ret0 = convCoord(arrT[0][0], arrT[0][1], zoomfactor);
  let ret3 = null;
  let retLast = null;

  ctx.beginPath();
  ctx.moveTo(ret0.scrX, ret0.scrY);
  
  for (let i=1; i<arrT.length; i++) {
  	let ret = convCoord(arrT[i][0], arrT[i][1], zoomfactor);
		ctx.lineTo(ret.scrX, ret.scrY);

    if (i == arrT.length - 2) ret3 = ret;
    if (i == arrT.length - 1) retLast = ret;
  }

  ctx.closePath();  
  ctx.stroke();  

  ctx.strokeStyle = "#6a3a55"; // Start 빨간 사각.
  ctx.lineWidth = 3;
  ctx.strokeRect(ret0.scrX-5, ret0.scrY-5, 10, 10);

  ctx.strokeStyle = "#337655"; // 녹색 사각.
  ctx.strokeRect(ret3.scrX - 5, ret3.scrY - 5, 10, 10);  

  ctx.strokeStyle = "#339955"; // End 사각.
  ctx.strokeRect(retLast.scrX - 5, retLast.scrY - 5, 10, 10);  
  
  ctx.lineTo(ret0.scrX, ret0.scrY);
  ctx.stroke();  

}

function zoomOut() {
	zoomfactor /= 2;
  drawAll();
}
function zoomIn() {
	zoomfactor *= 2;
  drawAll();
}

/**
 * drawpoly2, drawgrid, drawtext, drawcrosscoord 함수들을 포함한다.
 */
function drawAll() {
  //console.log("@@[drawAll]");

  context1.clearRect(0, 0, canvas1.width, canvas1.height);
  context1.strokeStyle = "#bada55";
  context1.fillStyle = "#bada55";  
  context1.lineWidth = 2;


  drawText(301, 321);
  
  // gArrAll2 변수를 가지고 그린다.
  drawPoly2(context1, gArrString2);
  
/*   
	for (let i=0; i<some_length; i++) {
		drawPoly2(context1, gArrContainer[i][1]) // e.g.gArrAll2;
	}
 */
  drawGrid(context1);
  drawText(11, 61);
  drawCrossCoord(context1);

}

function drawText(x1, y1) {
  let fontStyle = "26px serif";
  
  context1.font = fontStyle;
  context1.strokeStyle = "#212121";
  context1.fillStyle = "#ba3131";  
  context1.strokeText('the texH■ ◈  ', x1,y1);
}

/**
 * 
 * @returns textbox value of XY Angle.
 */
function updateXYangle() {
  let angxy = Number(document.getElementById('angXY').value);
  console.log(angxy, "angxy updated");
  
  return angxy;
}

function updateXYAngleTextBox(nn) {
  gAngleXY += nn;
  document.getElementById('angXY').value = gAngleXY;
}

function updateXZAngleTextBox(nn) {
  gAngleXZ += nn;
  document.getElementById('angXZ').value = gAngleXZ;
}

function updateZYAngleTextBox(nn) {
  gAngleZY += nn;
  document.getElementById('angZY').value = gAngleZY;
}

var gLog = [];
let gCnt = 0;

/**
 * with a new XZ2Real Function
 * 이거로 할 거임 a,b 안씀.
 * 새 이름: turnRight2 => turnBat()임.
 */
function turnRight2() {
  let cnt = 0;

  updateXZAngleTextBox(10);

  //잠시 console.log(cnt, "is count. and ", gArrAll.length);

  for (let i=0; i<gArrString1.length; i++) {
    let x1 = gArrString1[i][0];
    let z1 = gArrString1[i][2];
    //let ss = getXZtReal(x1, z1, gAngleXZ);  // 이것으로 BAT 회전.
    let ss2 = getZYtRotate(x1, z1, gAngleXZ);  // 이것으로 BAT 회전.
	
    if (i==0) {
	  let ss = getXZtReal(x1, z1, gAngleXZ);  // 이것으로 BAT 회전.
	  
      console.log(i, x1,z1, " are i/x1/z1 and after batting:(", ss[0],ss[1], ") °", gAngleXZ);
	  // already let ss2 = getZYtRotate(x1, z1, gAngleXZ);  // 이것으로 BAT 회전.
	  console.log(i, x1,z1, " are i/x1/z1 and after batting:(", ss2[0],ss2[1], ") °", gAngleXZ);
    }

    // 소스 배열을 고치지 않는다면, XY 먼저 돌린 후 XZ로 순서를 따라야 한다.
    //saveArrayVal(0, gArrAll, ss[0], cnt);  // use cnt instead of t(0, 0.2,...)
    //saveArrayVal(1, gArrAll, ss[1], cnt);

    saveArrayVal(0, gArrString2, ss2[0], i);
    saveArrayVal(2, gArrString2, ss2[1], i);
    
    cnt++;
  }
  gLog.push(gArrString2[0][0]); // 오로지 X값만.  (브라우저용 변수 glog)

  drawAll();

  /* 회전 동일 체크 [t 첫번째 점에 대하여...]
  gCnt++;
  if (gCnt > 37) {
    clearInterval(gInterval1);

    for (let i = 1; i < gLog.length; i++) {
      if (gLog[i] == gLog[0]) {
        console.log("[회전 동일값] ", i, gLog[i]);
      };
    }
  }
  */
}


/**
 * 이거로 할 거임 a,b 안씀.
 * 새 이름: turnRight2 => turnBat()임.
 * @param {*} arsrc e.g. gArm.gArrString1 
 * @param {*} artar e.g. gArm.gArrString2
 */
function turnRightPack(arSrc1, arTar2) {
  let cnt = 0;

  updateXZAngleTextBox(10);

  if (null == arSrc1) {
    arSrc1 = gArrString2;
    arTar2 = gArrString2;
  }  

  for (let i = 0; i < gArrString1.length; i++) {
    let x1 = arSrc1[i][0];
    let z1 = arSrc1[i][2];
    //let ss2 = getZYtRotate(x1, z1, gAngleXZ);  // 이것으로 BAT 회전.
    let ss2 = getZYtRotate(x1, z1, 10);  // 이것으로 BAT 회전.

    // 다른 방법으로도 회전을 해 보는 것
    if (i == 0) {
      let ss = getXZtReal(x1, z1, gAngleXZ);  // 이것으로 BAT 회전.

      console.log(i, x1, z1, " are i/x1/z1 and after batting:(", ss[0], ss[1], ") °", gAngleXZ);
      // already let ss2 = getZYtRotate(x1, z1, gAngleXZ);  // 이것으로 BAT 회전.
      console.log(i, x1, z1, " are i/x1/z1 and after batting:(", ss2[0], ss2[1], ") °", gAngleXZ);
    }

    saveArrayVal(0, arTar2, ss2[0], i);
    saveArrayVal(2, arTar2, ss2[1], i);

    cnt++;
  }

  drawAll();

}



/**
 * // 주변점들을 CLIPBOARD - COPY하지 않고 변수에 할당
 * XY축 의 회전도 담당
// TurnRight2 와 유사 역할. 좌표평면은 XY에 대해...
 */
function turnCartoon() {
  //gArrAll = [];	//초기화

  let cnt = 0;

  updateXYAngleTextBox(10); // getElement

  // t 0~4 : half ellipse...
  //for (let i = 0; i < gArrAll.length; i++) {
  for (let t=g_t1; t<g_t2; t+=0.2) {  // t: 0~6.2    
    let x1 = gArrString1[cnt][0];
    let y1 = gArrString1[cnt][1];

    // 텍스트 박스 내용 기준으로 그냥 구함(t의 범위만큼 점을 찍음)
    //let ss = getXYtReal(x1, y1, gAngleXY);
    let ss = getXtYt(g_aa, g_bb, t, gAngleXY);

    // 그러면, gArrAll 에도 넣어야 하지 않겠나 (XZ 회전의 소스니까)
    // 밑 단락의 saveArray호출은 디스플레이용 이고...
    saveArrayVal(0, gArrString1, ss[0], cnt);  // use cnt instead of t(0, 0.2,...)
    saveArrayVal(1, gArrString1, ss[1], cnt);

    // to gArrAll2.
    saveArrayVal(0, gArrString2, ss[0], cnt);  // use cnt instead of t(0, 0.2,...)
    saveArrayVal(1, gArrString2, ss[1], cnt);
    cnt++;
  } // endfor

  //console.log(gArrAll2);

  console.log(cnt, "and", gArrString1.length, " i is count.");

  drawAll();
}

// rotate without t value.
function turnSoleCartoon() {
  updateXYAngleTextBox(10); // getElement

  for (let i = 0; i < gArrAll.length; i++) {
    let x1 = gArrAll[i][0];
    let y1 = gArrAll[i][1];

    let zy = getZYtRotate(x1, y1, gAngleXY);

    saveArrayVal(0, gArrString2, zy[0], i);
    saveArrayVal(1, gArrString2, zy[1], i);

    //cnt++;
  }

  drawAll();	
}

/**
 * turn Roll Gradually
 */
function turnRoll() {

  for (let i = 0; i < gArrString1.length; i++) {
    let z1 = gArrString2[i][2];
    let y1 = gArrString2[i][1];

    // if (i == 0) {
    //   console.log("turn Rolla] ", y1, "==?", gArrAll2[i][1]);
    // }

    //let zy = getZYtRotate(z1, y1, gAngleZY);
    let zy = getZYtRotate(z1, y1, 10);

    saveArrayVal(2, gArrString2, zy[0], i);
    saveArrayVal(1, gArrString2, zy[1], i);
  }

  //duplicateArray2to1();

  drawAll();
}

/**
 * turn Roll Gradually (Pack:getting source and target parameters)
 */
function turnRollPack(arSrc1, arTar2) {

	if (null == arSrc1) {
		arSrc1 = gArrString2;
    arTar2 = gArrString2;
	}
	
  for (let i = 0; i < arSrc1.length; i++) {
    let z1 = arSrc1[i][2];
    let y1 = arSrc1[i][1];

    let zy = getZYtRotate(z1, y1, 10);

    saveArrayVal(2, arTar2, zy[0], i);
    saveArrayVal(1, arTar2, zy[1], i);
  }


  drawAll();
}


/**
 * Old turn (Accumulated...)
 */
function OldturnRollAccumulate() {
	
	updateZYAngleTextBox(10);
	
  for (let i=0; i<gArrString1.length; i++) {
    let z1 = gArrString1[i][2];
    let y1 = gArrString1[i][1];	

    if (i==0) {
      console.log("turn Roll] ", y1, "==?",gArrString2[i][1]);
    }

    let zy = getZYtRotate(z1, y1, gAngleZY);
    
    saveArrayVal(2, gArrString2, zy[0], i);
    saveArrayVal(1, gArrString2, zy[1], i);
    
    //cnt++;
  }
  gLog.push(gArrString2[0][0]); // 오로지 X값만.  (브라우저용 변수 glog)

  //duplicateArray2to1();

  drawAll();	
}


/**
 * 블렌더용
 * getting console.log value to use in Blender.
 */
function vector2FromElem(el) {

  let st1 = 'mesh.vertices[';// + i;
  let stx = '].co.x = ';
  let sty = '].co.y = ';
  let stz = '].co.z = ';

  let ret2 = "";
  let ret3 = "";
  let ret4 = "";
  for (let i = 0; i < el.length; i++) {
    // el[i][0], el[i][1]
    let retx = st1 + i + stx + el[i][0];
    let rety = st1 + i + sty + el[i][1];
    let retz = st1 + i + stz + "0.00";
    ret2 += retx + "\n";
    ret3 += rety + "\n";
    ret4 += retz + "\n";
  }
  //console.log(ret2);
  //console.log(ret3);

  textToClipboard(ret2 + "\n" + ret3 + "\n" + ret4);
}


/////////////////////////////////

/**
 * // 주변점들을 CLIPBOARD - COPY하지 않고 변수에 할당
 * XY축 의 회전도 담당
// TurnRight2 와 유사 역할. 좌표평면은 XY에 대해...
 */
function assignSurroundsInXY() {
	//gArrAll = [];	//초기화
	
	let cnt=0;

  gAngleXY = updateXYangle(); // getElement

  // t 0~4 : half ellipse...
  for (let t=g_t1; t<g_t2; t+=0.2) {  // t: 0~6.2

    // 텍스트 박스 내용 기준으로 그냥 구함(t의 범위만큼 점을 찍음)
		let ss = getXtYt(g_aa,g_bb,t,gAngleXY);

    // 그러면, gArrAll 에도 넣어야 하지 않겠나 (XZ 회전의 소스니까)
    // 밑 단락의 saveArray호출은 디스플레이용 이고...
    saveArrayVal(0, gArrString1, ss[0], cnt);  // use cnt instead of t(0, 0.2,...)
    saveArrayVal(1, gArrString1, ss[1], cnt);

    // to gArrAll2.
    saveArrayVal(0, gArrString2, ss[0], cnt);  // use cnt instead of t(0, 0.2,...)
    saveArrayVal(1, gArrString2, ss[1], cnt);
    cnt++;
  } // endfor

  console.log(gArrString2);

  console.log(cnt,"is count.");

  drawAll();
}

// get rotated Parametric X(t) Y(t)
/**
 * XY좌표[Cartoon Roll], XZ좌표 [Bird's Eye], YZ좌표[Forward Roll]
 * called by assignSurronds()👍
 * @param {*} a 
 * @param {*} b 
 * @param {*} t -2pi to 2pi?
 * @param {*} psi 각도
 * @returns 
 */
function getXtYt(a, b, t, psi) {
	let x3 = a*Math.cos(t)*cos(psi) - b*Math.sin(t)*sin(psi);
	let y3 = b*cos(psi)*Math.sin(t) + a*Math.cos(t)*sin(psi);
  
  return [Number(x3.toFixed(4)),Number(y3.toFixed(4))]; // XY (Z값[깊이] 불변) | XZ (Y값[so Bat] 불변) | YZ (X값[so Roll] 불변)
}

/**
 * BAT 회전 함수 →→
 * called by turnRight()
 * @param {*} a 장축
 * @param {*} b 단축
 * @param {*} t 둘러처진 점선 중 구성 요소(각 점, 한바퀴 0~2𝜋 도는 동안...)
 * @param {*} psi 회전 각 (-180 ~ +180 degree, not Radian)
 * @returns 
 */
function getXZtReal(x1, z1, psi) {
  let x3 = x1 * cos(psi);
  let z3 = z1 * sin(psi);

  return [Number(x3.toFixed(4)), Number(z3.toFixed(4))];
}

/*
* getZYtRotate(6, 0, 30);
*/
function getZYtRotate(z1, y1, psi) {
  let z2 = z1*cos(psi) - y1*sin(psi);
  let y2 = z1*sin(psi) + y1*cos(psi);
  
  return [Number(z2.toFixed(4)), Number(y2.toFixed(4))];
}

/*
*
//getDegAlpha(3,3); // [3,3] => 45°
*/
function getDegAlpha(z1, y1) {
	let alpha = Math.atan(z1/y1);	// 몇도였다는 정보.
	console.log(alpha, 'alpha radina');

  let alphaDeg = makeDeg(alpha);
  
  console.log(alphaDeg, 'alpha degree');
  
  return alphaDeg;
}




/*
* getYZtReal(6, 0, 30);
*/
function getZYtReal(z1, y1, psi) {
  let z0 = y1 * sin(0);	// 이게 몇도(알파{a}값)였다는 정보가 있는가? 없다. 0 이 되면서 소멸된다. 이게 문제. psi는 몇도 더, 회전하느냐를 알려주는 매개변수일 뿐.
  // z1에서 알파° 값을 알 수도 있을 것 같다.
	let y0 = y1 * cos(0);

  let alphaDeg = getDegAlpha(z0,y0); // e.g.3,3 => 45°

	// a+b 각도를 구하는 절차
	//Math.asin(1/2)//0.5235987755982989
	//let alpha = Math.asin(-z1/y1);	// 몇도였다는 정보.

	let psi2 = psi + alphaDeg;
  
  // y1*sin(a+b) ==> z2
  let z2 = y1 * sin(psi2);
  let y2 = y1 * cos(psi2);
  
  return [Number(z2.toFixed(4)), Number(y2.toFixed(4))];
}





function getTypedValue() {
	g_aa = Number(document.getElementById('aa').value);
  g_bb = Number(document.getElementById('bb').value);
  g_cc = Number(document.getElementById('cc').value);
  
  g_t1 = Number(document.getElementById('t1').value);  
  g_t2 = Number(document.getElementById('t2').value);
}

function textToClipboard(text) {
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

/*
* convert radian to degree
*/
function makeDeg(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}

function rad(degrees) {
  var pi = Math.PI;
  return degrees * (pi/180);
}

/**
 * degree xx°
 */
function sin(deg) {
	return Math.sin(rad(deg));
}
/**
 * degree xx°
 */
function cos(deg) {
	return Math.cos(rad(deg));
}


//duplicateArray(); // just call it.
//drawAll();

/**
 * 클립보드 이미지 가져오기용 이벤트
 */
window.addEventListener("paste", function (e) {

  // Handle the event
  retrieveImageFromClipboardAsBlob(e, function (imageBlob) {
    // If there's an image, display it in the canvas
    if (imageBlob) {
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext('2d');
      // Create an image to render the blob on the canvas
      var img = new Image();
      // Once the image loads, render the img on the canvas
      img.onload = function () {
        // Update dimensions of the canvas with the dimensions of the image
        canvas.width = this.width;
        canvas.height = this.height;

        // Draw the image
        ctx.drawImage(img, 0, 0);
      };

      // Crossbrowser support for URL
      var URLObj = window.URL || window.webkitURL;

      // Creates a DOMString containing a URL representing the object given in the parameter
      // namely the original Blob
      img.src = URLObj.createObjectURL(imageBlob);
    }
  });
}, false);


/**
 * 클립보드 이미지 가져오기용 함수
 * @param {*} pasteEvent 
 * @param {*} callback 
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
