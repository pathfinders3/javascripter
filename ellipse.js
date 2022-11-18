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
let g_angYawOnly = Number(document.getElementById('ang').value);

let g_t1 = Number(document.getElementById('t1').value);
let g_t2 = Number(document.getElementById('t2').value);

// 기본 배열
//let gArrAll = [[2.1213, 2.1213], [1.7981, 2.36], [1.4031, 2.5046], [0.9523, 2.5493], [0.4634, 2.4924], [-0.0439, 2.3362], [-0.5494, 2.0868], [-1.0331, 1.7542], [-1.4756, 1.3517], [-1.8592, 0.8953], [-2.1687, 0.4032], [-2.3918, -0.105], [-2.5195, -0.609], [-2.5468, -1.0887], [-2.4725, -1.525], [-2.2997, -1.9005], [-2.0351, -2.2003], [-1.6895, -2.4123], [-1.2765, -2.5281], [-0.8126, -2.5432], [-0.3163, -2.4569], [0.1926, -2.2726], [0.6938, -1.9977], [1.1674, -1.6432], [1.5944, -1.2232], [1.9579, -0.7544], [2.2433, -0.2555], [2.4392, 0.2535], [2.538, 0.7525], [2.5355, 1.2214], [2.432, 1.6417],];
let gArrAll = [[2.1213, 2.1213, 0], [1.7981, 2.36, 0], [1.4031, 2.5046, 0], [0.9523, 2.5493, 0], [0.4634, 2.4924, 0], [-0.0439, 2.3362, 0], [-0.5494, 2.0868, 0], [-1.0331, 1.7542, 0], [-1.4756, 1.3517, 0], [-1.8592, 0.8953, 0], [-2.1687, 0.4032, 0], [-2.3918, -0.105, 0], [-2.5195, -0.609, 0], [-2.5468, -1.0887, 0], [-2.4725, -1.525, 0], [-2.2997, -1.9005, 0], [-2.0351, -2.2003, 0], [-1.6895, -2.4123, 0], [-1.2765, -2.5281, 0], [-0.8126, -2.5432, 0], [-0.3163, -2.4569, 0], [0.1926, -2.2726, 0], [0.6938, -1.9977, 0], [1.1674, -1.6432, 0], [1.5944, -1.2232, 0], [1.9579, -0.7544, 0], [2.2433, -0.2555, 0], [2.4392, 0.2535, 0], [2.538, 0.7525, 0], [2.5355, 1.2214, 0], [2.432, 1.6417, 0],];
let gArrBk = [[2.1213, 15.1212, 0], [15.981, 15.1212, 0], [1.4031, 2.5046, 0], [0.9523, 2.5493, 0], [0.4634, 2.4924, 0], [-0.0439, 2.3362, 0], [-0.5494, 2.0868, 0], [-1.0331, 1.7542, 0], [-1.4756, 1.3517, 0], [-1.8592, 0.8953, 0], [-2.1687, 0.4032, 0], [-2.3918, -0.105, 0], [-2.5195, -0.609, 0], [-2.5468, -1.0887, 0], [-2.4725, -1.525, 0], [-2.2997, -1.9005, 0], [-2.0351, -2.2003, 0], [-1.6895, -2.4123, 0], [-1.2765, -2.5281, 0], [-0.8126, -2.5432, 0], [-0.3163, -2.4569, 0], [0.1926, -2.2726, 0], [0.6938, -1.9977, 0], [1.1674, -1.6432, 0], [1.5944, -1.2232, 0], [1.9579, -0.7544, 0], [2.2433, -0.2555, 0], [2.4392, 0.2535, 0], [2.538, 0.7525, 0], [2.5355, 1.2214, 0], [2.432, 1.6417, 0],];

// Turn by gAngle...
let gArrAll2 = [[2.1213, 2.1213, 0], [1.7981, 2.36, 0], [1.4031, 2.5046, 0], [0.9523, 2.5493, 0], [0.4634, 2.4924, 0], [-0.0439, 2.3362, 0], [-0.5494, 2.0868, 0], [-1.0331, 1.7542, 0], [-1.4756, 1.3517, 0], [-1.8592, 0.8953, 0], [-2.1687, 0.4032, 0], [-2.3918, -0.105, 0], [-2.5195, -0.609, 0], [-2.5468, -1.0887, 0], [-2.4725, -1.525, 0], [-2.2997, -1.9005, 0], [-2.0351, -2.2003, 0], [-1.6895, -2.4123, 0], [-1.2765, -2.5281, 0], [-0.8126, -2.5432, 0], [-0.3163, -2.4569, 0], [0.1926, -2.2726, 0], [0.6938, -1.9977, 0], [1.1674, -1.6432, 0], [1.5944, -1.2232, 0], [1.9579, -0.7544, 0], [2.2433, -0.2555, 0], [2.4392, 0.2535, 0], [2.538, 0.7525, 0], [2.5355, 1.2214, 0], [2.432, 1.6417, 0],];

// 누적 각 기록자
let gAngle = 0;


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
 * @param {*} xyz 0 for x, 1 for y, 2 for z
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
 * [ [x1,y1,z1], ...]
 * @param {*} xyz 
 * @param {*} arrSrc 
 * @param {*} i 
 * @returns 
 */
function pickArrayVal(xyz, arrSrc,i) {
  return arrSrc[i][xyz];
}

function saveArrayVal(xyz, arrTar, xyz1v,i) {
  //arrTar[i][xyz] = [x1, y1];
  arrTar[i][xyz] = xyz1v;
  
  return arrTar[i][xyz];
}

/**
 * arrTotal => arrTotal2
 */
function duplicateArray(/*arrTotal*/) {
  gArrAll2 = JSON.parse(JSON.stringify(gArrAll));
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

// 화살표 키로 마우스 커서 이동
document.addEventListener("keydown", function (e) {

  switch (e.key) {
    case "i": crossCoord.y -= 1; break;
    case "l": crossCoord.x += 1; break;
    case "k": crossCoord.y += 1; break;
    case "j": crossCoord.x -= 1; break;
  }

  drawAll();
});



// Cartesian to screen
/*
convCoord(0,0)
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

  console.log(crossCoord.x, crossCoord.y);
}

// 5 Grid Points. (별 포인트 그리기)
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
 * 주어진 배열에 따른 Polygon 그리기
 */
function drawPoly2(ctx, arrT) {
	let ret0 = convCoord(arrT[0][0], arrT[0][1], zoomfactor);
  
  ctx.beginPath();
  ctx.moveTo(ret0.scrX, ret0.scrY);
  
  for (let i=1; i<arrT.length; i++) {
  	let ret = convCoord(arrT[i][0], arrT[i][1], zoomfactor);
		ctx.lineTo(ret.scrX, ret.scrY);
  }

  ctx.closePath();  
  ctx.stroke();  

  ctx.strokeStyle = "#6a3a55";
  ctx.lineWidth = 3;
  ctx.strokeRect(ret0.scrX-5, ret0.scrY-5, 10, 10);
  
  //ctx.beginPath();
  ctx.lineTo(ret0.scrX, ret0.scrY);
  ctx.stroke();  
  //ctx.closePath();  

}

function zoomOut() {
	zoomfactor /= 2;
  drawAll();
}
function zoomIn() {
	zoomfactor *= 2;
  drawAll();
}

function drawAll() {
  context1.clearRect(0, 0, canvas1.width, canvas1.height);
  context1.strokeStyle = "#bada55";
  context1.fillStyle = "#bada55";  
  context1.lineWidth = 2;

  // gArrAll2 변수를 가지고 그린다.
  // gArrAll2 변수를 가지고 그리므로 , gArrAll 변수를 그려야 함
  drawPoly2(context1, gArrAll2);

  drawGrid(context1);
  drawText();
  drawCrossCoord(context1);

  //console.log('g_ang:',g_angYawOnly);
}

function drawText() {
  let fontStyle = "26px serif";
  
  context1.font = fontStyle;
  context1.strokeStyle = "#212121";
  context1.fillStyle = "#ba3131";  
  context1.strokeText('the text', 11,61);
}

/*
function updateAngleTextBox(nn) {
  //g_ang = document.getElementById('ang').value;
  document.getElementById('ang').value = nn;
  g_ang += nn;  // e.g. nn=10
}*/

function updateAngleTextBox2(nn) {
  gAngle += nn;
  document.getElementById('ang').value = gAngle;
}

var gLog = [];
let gCnt = 0;
//var gInterval1;

/**
 * with a new XZ2Real Function
 * 이거로 할 거임 a,b 안씀.
 */
function turnRight2() {
  duplicateArray(); // just call it.

  gArrBk = [];	//초기화	

  let cnt = 0;

  //g_ang += 25;  // 텍스트 박스도 나중에 업데이트 해야...
  updateAngleTextBox2(10);

  //잠시 console.log(cnt, "is count. and ", gArrAll.length);

  for (let i=0; i<gArrAll.length; i++) {
    let x1 = gArrAll[i][0];
    let z1 = gArrAll[i][2];
    let ss = getXZtReal(x1, z1, gAngle);  // 이것으로 BAT 회전.

    saveArrayVal(0, gArrAll2, ss[0], i);
    saveArrayVal(2, gArrAll2, ss[1], i);
    //gArrBk.push(ss); // RETURNING [X,Z]
    
    //gArrAll2.push(ss);
    //insertArrayVal(0, gArrAll2, gArrAll);

    cnt++;
  }
  gLog.push(gArrAll2[0][0]); // 오로지 X값만.  (브라우저용 변수 glog)


  // 골라넣기. arg1 = 0, x값만 지향. x값만 넣는 것.
  //insertArrayVal(0, gArrAll, gArrBk); // copy x(arg1=0) only
  // insert 안 해도 된다. saveArrayVal이 함.

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
 * 25도 스윙 테스트
 */
/*
function turnRight() {
  duplicateArray(); // just call it.

	gArrBk = [];	//초기화	
	
	let cnt=0;
	
  //g_ang += 25;  // 텍스트 박스도 나중에 업데이트 해야...
  updateAngleTextBox(10);

  //잠시 console.log(cnt, "is count. and ", gArrAll.length);

	for (let t=g_t1; t<g_t2; t+=0.2) {
		//let ss = getXZt(g_aa,g_cc,t,g_ang);  // 이것은 회전시키는 함수 아님
    let ss = getXtYt(x1, y1, g_ang);  // 이것은 회전시키는 함수 아님
		gArrBk.push(ss); // RETURNING [X,Z]
		cnt++;
	}
  gLog.push(gArrBk[0][0]); // 오로지 X값만.  

	//잠시 console.log(cnt,"is count. and ",gArrBk[0]);//

  // arg1 = 0, x값만 지향. x값만 넣는 것.
  insertArrayVal(0, gArrAll, gArrBk); // copy x(arg1=0) only
  drawAll();

  gCnt++;  
  if (gCnt > 37) {
    clearInterval(gInterval1);

    for (let i=1; i<gLog.length; i++) {
      if (gLog[i] == gLog[0]) {
        console.log("[회전 동일값] ",i,gLog[i]);
      };
    }
  }
}
*/

/**
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
// 주변점들을 CLIPBOARD - COPY하지 않고 변수에 할당
function assignSurrounds() {
	gArrAll = [];	//초기화
	
	let cnt=0;
  
  // t 0~4 : half ellipse...
	//for (let t=0; t<6.2; t+=0.2) {
  for (let t=g_t1; t<g_t2; t+=0.2) {
		let ss = getXtYt(g_aa,g_bb,t,g_ang);
    gArrAll.push([ss[0], ss[1], 0]);
    cnt++;
  }

  duplicateArray();
  console.log(cnt,"is count.");
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
 * @param {*} psi 회전 각
 * @returns 
 */
// function getXZtReal(a, b, t, psi) {
//   let x3 = a * Math.cos(t) * cos(psi) - b * Math.sin(t) * sin(psi);
//   let z3 = b * cos(psi) * Math.sin(t) + a * Math.cos(t) * sin(psi);

//   return [Number(x3.toFixed(4)), Number(z3.toFixed(4))];
// }

function getXZtReal(x1, z1, psi) {
  let x3 = x1 * cos(psi);
  let z3 = z1 * sin(psi);

  return [Number(x3.toFixed(4)), Number(z3.toFixed(4))];
}



function getTypedValue() {
	g_aa = Number(document.getElementById('aa').value);
  g_bb = Number(document.getElementById('bb').value);
  g_cc = Number(document.getElementById('cc').value);
  g_ang = Number(document.getElementById('ang').value);
  
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


function rad(degrees) {
  var pi = Math.PI;
  return degrees * (pi/180);
}

function sin(deg) {
	return Math.sin(rad(deg));
}
function cos(deg) {
	return Math.cos(rad(deg));
}




drawAll();

console.log("THISLEN",gArrAll.length, gArrBk.length);


