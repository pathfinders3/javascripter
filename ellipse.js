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
let g_ang = Number(document.getElementById('ang'.value));

let g_t1 = Number(document.getElementById('t1'.value));
let g_t2 = Number(document.getElementById('t2'.value));


context1.clearRect(0, 0, canvas1.width, canvas1.height);

canvas1.addEventListener("mousemove", getMousePosition, false);

// 마우스 기록용 십자선 좌표
let crossCoord = { x: 0, y: 0 };

/**
 * 
 * @param {*} xor_y 0 for x, 1 for y.
 * @param {*} arrSrc new array element
 * @param {*} arrTar 
 */
function insertArrayVal(xor_y, arrSrc, arrTar) {
  for (let i=0; i<10; i++) {
    arrTar[i][xor_y] = arrSrc[i][xor_y];
  }
  //g_arrTotal[i][xor_y]
  console.log(arrTar[i][0], arrSrc[i][0]);

}

function duplicateArray(/*arrTotal*/) {
  g_arrTotal2 = JSON.parse(JSON.stringify(g_arrTotal));
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

  //context1.beginPath();
  drawPoly2(context1, g_arrTotal);
  //context1.stroke();
	//context1.closePath();  

  drawGrid(context1);
  drawText();
  drawCrossCoord(context1);
}

function drawText() {
  let fontStyle = "26px serif";
  
  context1.font = fontStyle;
  context1.strokeStyle = "#212121";
  context1.fillStyle = "#ba3131";  
  context1.strokeText('the text', 11,61);
}

function turnRight() {
	g_arrTotal = [];	//초기화	
	
	let cnt=0;
	
	//debugger;
	
	for (let t=g_t1; t<g_t2; t+=0.2) {
		let ss = getXtYt(g_aa,g_cc,t,g_ang);
		g_arrTotal.push(ss);
		cnt++;
	}

	console.log(cnt,"is count.");
}

/////////////////////////////////
// 주변점들을 CLIPBOARD - COPY하지 않고 변수에 할당
function assignSurrounds() {
	g_arrTotal = [];	//초기화
	
	let cnt=0;
  
  // t 0~4 : half ellipse...
	//for (let t=0; t<6.2; t+=0.2) {
  for (let t=g_t1; t<g_t2; t+=0.2) {
		let ss = getXtYt(g_aa,g_bb,t,g_ang);
    g_arrTotal.push(ss);
    cnt++;
  }

  console.log(cnt,"is count.");
}

// get rotated Parametric X(t) Y(t)
/**
 * XY좌표[Cartoon Roll], XZ좌표 [Bird's Eye], YZ좌표[Forward Roll]
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

function getTypedValue() {
	g_aa = Number(document.getElementById('aa').value);
  g_bb = Number(document.getElementById('bb').value);
  g_cc = Number(document.getElementById('cc').value);
  g_ang = Number(document.getElementById('ang').value);
  
  g_t1 = Number(document.getElementById('t1').value);  
  g_t2 = Number(document.getElementById('t2').value);
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



// 기본 배열
let g_arrTotal = [ [2.1213,2.1213], [1.7981,2.36], [1.4031,2.5046], [0.9523,2.5493], [0.4634,2.4924], [-0.0439,2.3362], [-0.5494,2.0868], [-1.0331,1.7542], [-1.4756,1.3517], [-1.8592,0.8953], [-2.1687,0.4032], [-2.3918,-0.105], [-2.5195,-0.609], [-2.5468,-1.0887], [-2.4725,-1.525], [-2.2997,-1.9005], [-2.0351,-2.2003], [-1.6895,-2.4123], [-1.2765,-2.5281], [-0.8126,-2.5432], [-0.3163,-2.4569], [0.1926,-2.2726], [0.6938,-1.9977], [1.1674,-1.6432], [1.5944,-1.2232], [1.9579,-0.7544], [2.2433,-0.2555], [2.4392,0.2535], [2.538,0.7525], [2.5355,1.2214], [2.432,1.6417], ];
//let g_arrTotal2 = [  ] ;// backup
let g_arrTotal2 = [[2.1213, 15.1212], [15.981, 15.1212], [1.4031, 2.5046], [0.9523, 2.5493], [0.4634, 2.4924], [-0.0439, 2.3362], [-0.5494, 2.0868], [-1.0331, 1.7542], [-1.4756, 1.3517], [-1.8592, 0.8953], [-2.1687, 0.4032], [-2.3918, -0.105], [-2.5195, -0.609], [-2.5468, -1.0887], [-2.4725, -1.525], [-2.2997, -1.9005], [-2.0351, -2.2003], [-1.6895, -2.4123], [-1.2765, -2.5281], [-0.8126, -2.5432], [-0.3163, -2.4569], [0.1926, -2.2726], [0.6938, -1.9977], [1.1674, -1.6432], [1.5944, -1.2232], [1.9579, -0.7544], [2.2433, -0.2555], [2.4392, 0.2535], [2.538, 0.7525], [2.5355, 1.2214], [2.432, 1.6417],];

drawAll();
