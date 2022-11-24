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

// 湲곕낯 諛곗뿴
let gArrAll = [[2.1213, 2.1213, 0], [1.7981, 2.36, 0], [1.4031, 2.5046, 0], [0.9523, 2.5493, 0], [0.4634, 2.4924, 0], [-0.0439, 2.3362, 0], [-0.5494, 2.0868, 0], [-1.0331, 1.7542, 0], [-1.4756, 1.3517, 0], [-1.8592, 0.8953, 0], [-2.1687, 0.4032, 0], [-2.3918, -0.105, 0], [-2.5195, -0.609, 0], [-2.5468, -1.0887, 0], [-2.4725, -1.525, 0], [-2.2997, -1.9005, 0], [-2.0351, -2.2003, 0], [-1.6895, -2.4123, 0], [-1.2765, -2.5281, 0], [-0.8126, -2.5432, 0], [-0.3163, -2.4569, 0], [0.1926, -2.2726, 0], [0.6938, -1.9977, 0], [1.1674, -1.6432, 0], [1.5944, -1.2232, 0], [1.9579, -0.7544, 0], [2.2433, -0.2555, 0], [2.4392, 0.2535, 0], [2.538, 0.7525, 0], [2.5355, 1.2214, 0], [2.432, 1.6417, 0],];

// Turn by gAngle...
let gArrAll2 = [[2.1213, 2.1213, 0], [1.7981, 2.36, 0], [1.4031, 2.5046, 0], [0.9523, 2.5493, 0], [0.4634, 2.4924, 0], [-0.0439, 2.3362, 0], [-0.5494, 2.0868, 0], [-1.0331, 1.7542, 0], [-1.4756, 1.3517, 0], [-1.8592, 0.8953, 0], [-2.1687, 0.4032, 0], [-2.3918, -0.105, 0], [-2.5195, -0.609, 0], [-2.5468, -1.0887, 0], [-2.4725, -1.525, 0], [-2.2997, -1.9005, 0], [-2.0351, -2.2003, 0], [-1.6895, -2.4123, 0], [-1.2765, -2.5281, 0], [-0.8126, -2.5432, 0], [-0.3163, -2.4569, 0], [0.1926, -2.2726, 0], [0.6938, -1.9977, 0], [1.1674, -1.6432, 0], [1.5944, -1.2232, 0], [1.9579, -0.7544, 0], [2.2433, -0.2555, 0], [2.4392, 0.2535, 0], [2.538, 0.7525, 0], [2.5355, 1.2214, 0], [2.432, 1.6417, 0],];

// ?꾩쟻 媛?湲곕줉??
let gAngleXZ = 0;
let gAngleXY = 0;


context1.clearRect(0, 0, canvas1.width, canvas1.height);

canvas1.addEventListener("mousemove", getMousePosition, false);

// 留덉슦??湲곕줉????옄??醫뚰몴
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
  //console.log('tar湲몄씠=src湲몄씠 ', arrTar.length, arrSrc.length);
  for (let i = 0; i < arrSrc.length; i++) {
    // ?좎떆硫덉땄 [gLog蹂닿린?꾪빐] console.log('Target : Src = ', arrTar[i][xor_y], arrSrc[i][xor_y]);
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
 * arrTotal => gArrAll2
 */
function duplicateArray(/*arrTotal*/) {
  gArrAll2 = JSON.parse(JSON.stringify(gArrAll));
}

// 留덉슦???ъ??섏슜
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

// Key Event: ?붿궡???ㅻ줈 留덉슦??而ㅼ꽌 ?대룞
document.addEventListener("keydown", function (e) {

  switch (e.key) {
    case "i": crossCoord.y -= 1; break;
    case "l": crossCoord.x += 1; break;
    case "k": crossCoord.y += 1; break;
    case "j": crossCoord.x -= 1; break;
  }

  drawAll();
});




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

// 留덉슦????옄??洹몃━湲?
function drawCrossCoord(ctx) {
  ctx.rect(crossCoord.x-3, crossCoord.y-3, 3,3);
  ctx.stroke();

  console.log("Mouse Position: ", crossCoord.x, crossCoord.y);
}

// 5 Grid Points. (5??吏???ъ씤??洹몃━湲?
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
 * 二쇱뼱吏?諛곗뿴(?媛?gArrAll2)???곕Ⅸ Polygon 洹몃━湲?
 * arrT: [ [x1,y1,z1], ...] e.g. gArrAll2
 */
function drawPoly2(ctx, arrT) {
  //console.log(arrT[0][0], " of error 177");
  console.log("@@[drawPoly2]");
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

  ctx.strokeStyle = "#6a3a55"; // Start 鍮④컙 ?ш컖.
  ctx.lineWidth = 3;
  ctx.strokeRect(ret0.scrX-5, ret0.scrY-5, 10, 10);

  ctx.strokeStyle = "#337655"; // ?뱀깋 ?ш컖.
  ctx.strokeRect(ret3.scrX - 5, ret3.scrY - 5, 10, 10);  

  ctx.strokeStyle = "#339955"; // End ?ш컖.
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
 * drawpoly2, drawgrid, drawtext, drawcrosscoord ?⑥닔?ㅼ쓣 ?ы븿?쒕떎.
 */
function drawAll() {
  console.log("@@[drawAll]");

  context1.clearRect(0, 0, canvas1.width, canvas1.height);
  context1.strokeStyle = "#bada55";
  context1.fillStyle = "#bada55";  
  context1.lineWidth = 2;

  // gArrAll2 蹂?섎? 媛吏怨?洹몃┛??
  drawPoly2(context1, gArrAll2);

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

var gLog = [];
let gCnt = 0;

/**
 * with a new XZ2Real Function
 * ?닿굅濡???嫄곗엫 a,b ?덉?.
 */
function turnRight2() {
  let cnt = 0;

  updateXZAngleTextBox(10);

  //?좎떆 console.log(cnt, "is count. and ", gArrAll.length);

  for (let i=0; i<gArrAll.length; i++) {
    let x1 = gArrAll[i][0];
    let z1 = gArrAll[i][2];
    let ss = getXZtReal(x1, z1, gAngleXZ);  // ?닿쾬?쇰줈 BAT ?뚯쟾.
    
    if (i==0) {
      //console.log(i, x1, "==> ", ss[0], "??醫뚯륫?먯꽌遺???꾨뒗媛",gAngleXZ);
      //console.log(i, gArrAll[i][1], "==>same " , "??醫뚯륫?먯꽌遺???꾨뒗媛");
    }

    // ?뚯뒪 諛곗뿴??怨좎튂吏 ?딅뒗?ㅻ㈃, XY 癒쇱? ?뚮┛ ??XZ濡??쒖꽌瑜??곕씪???쒕떎.
    //saveArrayVal(0, gArrAll, ss[0], cnt);  // use cnt instead of t(0, 0.2,...)
    //saveArrayVal(1, gArrAll, ss[1], cnt);

    saveArrayVal(0, gArrAll2, ss[0], i);
    saveArrayVal(2, gArrAll2, ss[1], i);
    
    cnt++;
  }
  gLog.push(gArrAll2[0][0]); // ?ㅻ줈吏 X媛믩쭔.  (釉뚮씪?곗???蹂??glog)

  drawAll();

  /* ?뚯쟾 ?숈씪 泥댄겕 [t 泥ル쾲吏??먯뿉 ??섏뿬...]
  gCnt++;
  if (gCnt > 37) {
    clearInterval(gInterval1);

    for (let i = 1; i < gLog.length; i++) {
      if (gLog[i] == gLog[0]) {
        console.log("[?뚯쟾 ?숈씪媛? ", i, gLog[i]);
      };
    }
  }
  */
}


/**
 * // 二쇰??먮뱾??CLIPBOARD - COPY?섏? ?딄퀬 蹂?섏뿉 ?좊떦
 * XY異????뚯쟾???대떦
// TurnRight2 ? ?좎궗 ??븷. 醫뚰몴?됰㈃? XY?????..
 */
function turnCartoon() {
  //gArrAll = [];	//珥덇린??

  let cnt = 0;

  updateXYAngleTextBox(10); // getElement

  // t 0~4 : half ellipse...
  //for (let i = 0; i < gArrAll.length; i++) {
  for (let t=g_t1; t<g_t2; t+=0.2) {  // t: 0~6.2    
    let x1 = gArrAll[cnt][0];
    let y1 = gArrAll[cnt][1];

    // ?띿뒪??諛뺤뒪 ?댁슜 湲곗??쇰줈 洹몃깷 援ы븿(t??踰붿쐞留뚰겮 ?먯쓣 李띿쓬)
    //let ss = getXYtReal(x1, y1, gAngleXY);
    let ss = getXtYt(g_aa, g_bb, t, gAngleXY);

    // 洹몃윭硫? gArrAll ?먮룄 ?ｌ뼱???섏? ?딄쿋??(XZ ?뚯쟾???뚯뒪?덇퉴)
    // 諛??⑤씫??saveArray?몄텧? ?붿뒪?뚮젅?댁슜 ?닿퀬...
    saveArrayVal(0, gArrAll, ss[0], cnt);  // use cnt instead of t(0, 0.2,...)
    saveArrayVal(1, gArrAll, ss[1], cnt);

    // to gArrAll2.
    saveArrayVal(0, gArrAll2, ss[0], cnt);  // use cnt instead of t(0, 0.2,...)
    saveArrayVal(1, gArrAll2, ss[1], cnt);
    cnt++;
  } // endfor

  //console.log(gArrAll2);

  console.log(cnt, "and", gArrAll.length, " i is count.");

  drawAll();
}


/**
 * // 二쇰??먮뱾??CLIPBOARD - COPY?섏? ?딄퀬 蹂?섏뿉 ?좊떦
 * XY異????뚯쟾???대떦
// TurnRight2 ? ?좎궗 ??븷. 醫뚰몴?됰㈃? XY?????..
 */
function assignSurroundsInXY() {
  //gArrAll = [];	//珥덇린??

  let cnt = 0;

  gAngleXY = updateXYangle(); // getElement

  // t 0~4 : half ellipse...
  for (let t = g_t1; t < g_t2; t += 0.2) {  // t: 0~6.2

    // ?띿뒪??諛뺤뒪 ?댁슜 湲곗??쇰줈 洹몃깷 援ы븿(t??踰붿쐞留뚰겮 ?먯쓣 李띿쓬)
    let ss = getXtYt(g_aa, g_bb, t, gAngleXY);

    // 洹몃윭硫? gArrAll ?먮룄 ?ｌ뼱???섏? ?딄쿋??(XZ ?뚯쟾???뚯뒪?덇퉴)
    // 諛??⑤씫??saveArray?몄텧? ?붿뒪?뚮젅?댁슜 ?닿퀬...
    saveArrayVal(0, gArrAll, ss[0], cnt);  // use cnt instead of t(0, 0.2,...)
    saveArrayVal(1, gArrAll, ss[1], cnt);

    // to gArrAll2.
    saveArrayVal(0, gArrAll2, ss[0], cnt);  // use cnt instead of t(0, 0.2,...)
    saveArrayVal(1, gArrAll2, ss[1], cnt);
    cnt++;
  } // endfor

  console.log(gArrAll2);

  console.log(cnt, "is count.");

  drawAll();
}



/**
 * 釉붾젋?붿슜
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
 * // 二쇰??먮뱾??CLIPBOARD - COPY?섏? ?딄퀬 蹂?섏뿉 ?좊떦
 * XY異????뚯쟾???대떦
// TurnRight2 ? ?좎궗 ??븷. 醫뚰몴?됰㈃? XY?????..
 */
function assignSurroundsInXY() {
	//gArrAll = [];	//珥덇린??
	
	let cnt=0;

  gAngleXY = updateXYangle(); // getElement

  // t 0~4 : half ellipse...
  for (let t=g_t1; t<g_t2; t+=0.2) {  // t: 0~6.2

    // ?띿뒪??諛뺤뒪 ?댁슜 湲곗??쇰줈 洹몃깷 援ы븿(t??踰붿쐞留뚰겮 ?먯쓣 李띿쓬)
		let ss = getXtYt(g_aa,g_bb,t,gAngleXY);

    // 洹몃윭硫? gArrAll ?먮룄 ?ｌ뼱???섏? ?딄쿋??(XZ ?뚯쟾???뚯뒪?덇퉴)
    // 諛??⑤씫??saveArray?몄텧? ?붿뒪?뚮젅?댁슜 ?닿퀬...
    saveArrayVal(0, gArrAll, ss[0], cnt);  // use cnt instead of t(0, 0.2,...)
    saveArrayVal(1, gArrAll, ss[1], cnt);

    // to gArrAll2.
    saveArrayVal(0, gArrAll2, ss[0], cnt);  // use cnt instead of t(0, 0.2,...)
    saveArrayVal(1, gArrAll2, ss[1], cnt);
    cnt++;
  } // endfor

  console.log(gArrAll2);

  console.log(cnt,"is count.");

  drawAll();
}

// get rotated Parametric X(t) Y(t)
/**
 * XY醫뚰몴[Cartoon Roll], XZ醫뚰몴 [Bird's Eye], YZ醫뚰몴[Forward Roll]
 * called by assignSurronds()?몟
 * @param {*} a 
 * @param {*} b 
 * @param {*} t -2pi to 2pi?
 * @param {*} psi 媛곷룄
 * @returns 
 */
function getXtYt(a, b, t, psi) {
	let x3 = a*Math.cos(t)*cos(psi) - b*Math.sin(t)*sin(psi);
	let y3 = b*cos(psi)*Math.sin(t) + a*Math.cos(t)*sin(psi);
  
  return [Number(x3.toFixed(4)),Number(y3.toFixed(4))]; // XY (Z媛?源딆씠] 遺덈?) | XZ (Y媛?so Bat] 遺덈?) | YZ (X媛?so Roll] 遺덈?)
}

/**
 * BAT ?뚯쟾 ?⑥닔 ?믠넂
 * called by turnRight()
 * @param {*} a ?μ텞
 * @param {*} b ?⑥텞
 * @param {*} t ?섎윭泥섏쭊 ?먯꽑 以?援ъ꽦 ?붿냼(媛??? ?쒕컮??0~2?쐦 ?꾨뒗 ?숈븞...)
 * @param {*} psi ?뚯쟾 媛?(-180 ~ +180 degree, not Radian)
 * @returns 
 */
function getXZtReal(x1, z1, psi) {
  let x3 = x1 * cos(psi);
  let z3 = z1 * sin(psi);

  return [Number(x3.toFixed(4)), Number(z3.toFixed(4))];
}

/**
 * Cartoon Rotation. (almost same as getxztreal() )
 */
/*
function getXYtReal(x1, y1, psi) {
  let x3 = x1 * cos(psi);
  let y3 = y1 * sin(psi);

  return [Number(x3.toFixed(4)), Number(y3.toFixed(4))];
}
*/


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


duplicateArray(); // just call it.

drawAll();
