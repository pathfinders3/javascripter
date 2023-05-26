let g_minutes1 = 100; // to AddSomeMinutes()

let g_start1 = -1;// = Number(ret4[1]);
let g_long1 = -1;// = Number(ret4[2]);
let g_lv1 = -1;

let gfines = "";

//let drop1 = document.getElementById("dropitem1");


let cboItem1 = document.getElementById('dropitem1');
let cboQty1 = document.getElementById('qty1');

let txtResult1 = document.getElementById('result1');
let txtResult2 = document.getElementById('result2');

let g_foundLet;


/**
 * 
 * @returns current time in 'HH:MM' string format.
 */
const getCurrentTimeString = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

/**
 * Good!: time1c= '14:40'; time2 ='15:10'; // expected.
 * Gone~: time1c= '16:40'; time2 ='15:10'; // expected.
 * let diffHours = compareTimes(time1, time2);
 * @param {*} time1c  current
 * @param {*} time2e  expected
 * @returns [+: ok not come,] [-: already skipped]
 */
function compareTimes(time1c, time2e) {
  const [hours1, minutes1] = time1c.split(':');
  const [hours2, minutes2] = time2e.split(':');
  const time1InMinutes = parseInt(hours1) * 60 + parseInt(minutes1);
  const time2InMinutes = parseInt(hours2) * 60 + parseInt(minutes2);
  const timeDiffInMinutes = time2InMinutes - time1InMinutes;
  const timeDiffInHours = timeDiffInMinutes / 60;
  return timeDiffInHours;
}


function trimSemicolon(st1) {
  //"eoisd\r\n; ".replace(/[; \r\n]+$/, '');
  return st1.replace(/[; \r\n]+$/, '');
}

function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}


/** 식에서 괄호 2개 필요 : 좌변과 우변 2개가 없으면 에러 */
function runOneRegex(st1, reg1) {
  let ret0 = reg1.exec(st1);
  if (ret0 == null) {
    return 'null ix;' + ret0.index;	// 이 인덱스가 없음 (ret0)
  } else {
    //return ret0[1]; // 좌변을 내놓는다(e.g. <let a> = <33>)
    if (ret0.length >= 3)
      return [ ret0[1], ret0[2] ];  
      // e.g. let b; 일때는 우변은 undefined로 리턴한다
      // let b= 3; 일때는 우변은 3으로 리턴.
  }
  console.log(ret0);
  return "null by lengh;" + ret0.length + " index;" + ret0.index;
}

/**
 * @returns (3) ['let a= 3;', 'let a', ' 3;', index: 0, input: 'let a= 3;/let b= [1,2,3];/', groups
 */
function runRegex() {
	let txtCode1 = document.getElementById('code1');
  lblCounter1 = document.getElementById('counter1');
  lblCounter2 = document.getElementById('counter2'); // 변수명 등록
  lblCounter3 = document.getElementById('counter3'); // 변수형태/변수값 등록

	let statement1 = txtCode1.value;
	
  let a0 = regLetBig.exec(statement1);
  if (a0 == null) {
    lblCounter1.innerHTML = 'a0 is null (not found or once rotated)';
	lblCounter2.innerHTML = '----?';
	lblCounter3.innerHTML = '----?';	
    return;
  }

  let a2 = a0[1]; // e.g.; a2; 'let a'(좌변)
  g_foundLet = a0;

  lblCounter1.innerHTML = a0.index + ' is index.';
  lblCounter2.innerHTML = '['+ a0[1] + '] ';
  lblCounter3.innerHTML = '[' + a0[2] + '] ';
}



let g_arrCurl1 = []; // Lv1
let g_arrCurl2 = [];  // Lv2
let g_arrCurl3 = [];  // Lv2

/**
 * 117; HTML EVENT.
 * CREATE Level(層) Arrays, 
 * CREATE List Items.
 * 
 * https://docs.google.com/document/d/1nwbA0uVNyHiFzBDAjFbuYI6NUNWmFdzT2qdcJDh7RPk/edit#bookmark=id.nv9dr4l9jfno
 */
function runRegCurlys2() {
  //regCurly.lastIndex = 0; // START REMOVING THE PREVIOUS INDEX QUEUE
  g_arrCurl1 = [];
  g_arrCurl2 = [];  // Lv2
  g_arrCurl3 = [];  // Lv2

  let txtCode1 = document.getElementById('code1');  // Re-Assign as 전역 무효
  let statement1 = txtCode1.value;  // actually whole source codes.

  // statement1는 All contents.
  let lv1 = getLevel(statement1);
  statement1 = lv1.statement1;
  g_arrCurl1 = lv1.arrCurl9;
  console.log(g_arrCurl1);  // Lv1; First 꺽쇠s

  let lv2 = getLevel(statement1);
  statement1 = lv2.statement1;
  g_arrCurl2 = lv2.arrCurl9;
  console.log(g_arrCurl2);  // Lv2; Second 꺽쇠s

  let lv3 = getLevel(statement1);
  statement1 = lv3.statement1;
  g_arrCurl3 = lv3.arrCurl9;  

  //moveCaret2(g_arrCurl2[0]);  // 이것은 리스트박스의 선택자로 (item 0, of level 0)

  // ADDING LIST ITEMS ON THE COMPONENT.
  clearSelectList(lstVarsDesc);  

  for (let i = 0; i < g_arrCurl1.length; i++) {
    setSelectTag(g_arrCurl1[i], 1);
  }

  for (let i = 0; i < g_arrCurl2.length; i++) {
    setSelectTag(g_arrCurl2[i], 2);
  }
}




function usgsChanged(el) {
  let x = el.options[el.selectedIndex].value;
  console.log("196:"+x);
}

/**
 * Create list items and add them.
 * goCurlyPosition() is related.
 * @param {*} arr5 [startpos, endpos], level: for just printing.
 */
function setSelectTag(arr5, level) {
  let lstVarsDesc = document.getElementById('lstVarsDesc');
  let opt1 = document.createElement('option');

  opt1.innerHTML = arr5[0] + "-" + arr5[1] + ":Lv" + level;
  opt1.value = arr5[0] + "-" + arr5[1] + ":Lv" + level;
  opt1.title = arr5[1];

  lstVarsDesc.appendChild(opt1);
}



function goTextPosition(el) {
  let txtCode1 = document.getElementById('code1');
  let x = Number(el.options[el.selectedIndex].value);
  txtCode1.setSelectionRange(x, x+1); // e.g. 8,9
  txtCode1.focus();
  // this is same as moveCaret(x);
}




window.addEventListener("keydown", (e) => {
  //const key = document.getElementById(e.key);
  if (e.key === "F2") {
    alert("reset regs");
    resetRegs();
  }
  
});


// 예제 코드 https://codepen.io/shawn2023/pen/vYzjQPp
let inputValue;
function getInputValue() {
  inputValue = document.getElementById('mytimebox').value;
}
/* function getInputValueLong() {
  inputValue = document.getElementById('code1').value;
}
 */


/**
 * 2nd found HHMM should be changed.
 * @param {*} text 
 * @returns 
 */
function replaceSecondTime(text /*replacement*/) {
  const timePattern = /\b\d{1,2}:\d{2}\b/g;
  // matches HH:MM pattern with word boundary
  let count = 0;
  const newText = text.replace(timePattern, match => {
    count++;
    if (count === 2) {
      //let replacement1 = addTwoHours(match);
      //let replacement1 = addSomeMinutes(match, Number(g_minutes1.value));
      let replacement1 = addSomeMinutes(match, 100);
      let revised1 = match + "(" + replacement1 + ")";

      //console.log(match, replacement1, " asdf229 ", g_minutes1.value);
      return revised1;      
      //return replacement;
    } else {
      return match;
    }
  });
  return newText;
}

//const timePattern = /\b\d{1,2}:\d{2}\b/g;

/**
 * takes a regular expression and a string as input, and returns the nth match found in the string.
 * const inputString = 'I lik 13:33, 15:11 e apples, but I prefer oranges. Apples are good too.';
 * @param {*} regex regular expression. 여기선 timePatern으로 고정
 * @param {*} str 
 * @param {*} n 
 * @returns n th found string.
 */
function findNthMatch(str, n) {
  const timePattern = /\b\d{1,2}:\d{2}\b/g;  
  let match;
  for (let i = 0; i < n; i++) {
    match = timePattern.exec(str);
    if (!match) {
      return null;
    }
  }
  return match[0];
}



/**
 * // 두시간(120min) 더하는 예제 함수
 * const timeString = '12:30';
const newTimeString = addTwoHours(timeString);
console.log(newTimeString);  // Output: "14:30"
 * @param {*} timeString 
 * @returns 
 */
function addTwoHours(timeString) {
  const [hours, minutes] = timeString.split(':');
  const totalMinutes = parseInt(hours) * 60 + parseInt(minutes) + 120; // add 2 hours (120 minutes)
  const newHours = Math.floor(totalMinutes / 60).toString().padStart(2, '0');
  const newMinutes = (totalMinutes % 60).toString().padStart(2, '0');
  return `${newHours}:${newMinutes}`;
}

function addSomeMinutes(timeString, mins1) {
  const [hours, minutes] = timeString.split(':');
  const totalMinutes = parseInt(hours) * 60 + parseInt(minutes) + mins1; // add 2 hours (120 minutes)
  const newHours = Math.floor(totalMinutes / 60).toString().padStart(2, '0');
  const newMinutes = (totalMinutes % 60).toString().padStart(2, '0');
  return `${newHours}:${newMinutes}`;
}


// // 결과 ["11:12","10:10"] 결과길이 2 "{match}" 주어진문자열 "oiosd 11:12 ij 10:10"
// function getTimeFromInput() {
//   const timeValue = inputValue; // Get the value of the input element
//   const timeRegex = /[0-2][0-9]:[0-5][0-9]/g;
//   //const timeRegex = /^([0-9]{1,2}):([0-9]{2})$/;
//   let matches = timeValue.match(timeRegex); // Use the match method to check if the time format is correct
//   //console.log(matches, matches.length, "{match}", timeValue);
//   console.log(matches, matches.length, "{match}");
// }

/**
 * used by: SplitAndGo
 */
function getTimeFromText(timeValue) {
  //const timeValue = inputValue; // Get the value of the input element
  const timeRegex = /[0-2][0-9]:[0-5][0-9]/g;
  let matches = timeValue.match(timeRegex); // Use the match method to check if the time format is correct
  //console.log(matches, matches.length, "{match}", timeValue);
  //matches = (matches==null) ? "" : matches;
  return matches;
}

function getSplittedRowsFromInput() {
  areaValue = document.getElementById('code1').value;
  
  //console.log(areaValue, "is Area", areaValue.length);
  console.log("316: the len of Area", areaValue.length);
  
  let timeValue = areaValue; // Get the value of the input element
  const timeRegex = /\r\n/g;
  
  let lines = timeValue.split(/\r?\n/);
  //console.log(lines);

  return lines;
}

let g_wantedAirlines = ['대한항', '아시아나', 'LJ', '제주항','티웨이', '에어서울'];
//let g_unwantedAirlines = ['천진에어라인'];

// air dic.
const dictionary = {
  "수카르노": "인니",	
  "덴파사": "인니",
  "국제공항": "",
  "칭기즈 칸": "울",
  "수안나폼": "",
  "노이바이": "",
  "하노이": "하노",
  "ke": "KK", // lowerCase 컨버터를 없애면...
  "여객": "Gu",
  "화물": "Hwamul",
  "대한": "KOK",
  "아시아나": "ASA",  
  "진에어": "Jin",  
  "제주": "JJu",
  "티웨이": "TWA",
  "에어서울": "aSE",
  "항공": "",
  "\t": ""
}

/**
 * 한 줄 받아서 원치않는 텍스트를 치환함.
 * e.g. 려 => GUEST, KORAI => KK
 * @param {*} line1 
 */
function ReplaceLine(line1) {
  const regex = new RegExp(Object.keys(dictionary).join("|"), "gi");

  const newString = line1.replace(regex, match => dictionary[match.toLowerCase()]);

  return newString;
}

/**
 * const str = "This (string) has (some) parentheses.";
const newStr = replaceParenthesesWithUnderscores(str);
console.log(newStr); // Output: "This _string_ has _some_ parentheses."
 * @param {*} str 
 * @returns 
 */
function replaceParenthesesWithUnderscores(str) {
  let ret1 = str.replace(/[(]/g, "_");
  let ret2 = ret1.replace(/[)]/g, ";");
  return ret2;
}
/**
 * 
 * @param {*} str 
 * @param {*} oldString this should be reduced to 3 chars.
 * @returns 
 */
function replaceUnderscoreSemicolonString(str, oldString) {
  const regex = new RegExp(`_${oldString};`, 'g');
  const oldVarName = `${oldString}Var`;

  return str.replace(regex, `_${newString};`);
}

/**
 * const str = "foo _bar; baz _qux; quux";
const result = getUnderscoreSemicolonString(str);
console.log(result); // Output: "bar"
 * @param {*} str 
 * @returns 
 */
function getUnderscoreSemicolonString(str) {
  const regex = /_([^;]+);/;
  const match = str.match(regex);
  if (match) {
    return match[1];
  }
  return null;
}



/**
 * const str = "((This is) a (long) (string (with) several) (parenthesized (strings)))";
const matches = extractOutermostParentheses(str);
console.log(matches); // Output: ["This is", "long", "with", "strings"]
 * @param {*} str 
 * @returns 
 */
function extractOutermostParentheses(str) {
  const regex = /\(([^()]*)\)/g;
  const matches = [];
  let match;

  while ((match = regex.exec(str)) !== null) {
    const innerStr = match[1];
    const innerMatches = extractOutermostParentheses(innerStr);
    if (innerMatches.length > 0) {
      matches.push(innerMatches[0]);
    } else {
      matches.push(innerStr);
    }
  }

  return matches;
}




//if (false == lines[i].includes("화물")) {

/**
 * has wanted airlines.
 * (used in SplitAndGo)
 * @param {*} str 
 * @param {*} arr 
 * @returns 
 */
function hasWantedWord(str, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (str.includes(arr[i])) {
      return true;
    }
  }
  return false;
}



/**
 * 🗲
 */
function SplitAndGo(bWantedTimeOnly) {
	gfines = "";	
	
  g_minutes1 = document.getElementById('minutes2add');


  let lines = getSplittedRowsFromInput();

  // wanted lines should be included only.
  for (let i = lines.length-1; i>= 0; i--) {
    if (false == hasWantedWord(lines[i], g_wantedAirlines)) {
      lines.splice(i, 1);
    }
  }
  // now we have wanted lines with wanted keyword.

  for (let i = 0; i < lines.length; i++) {
    let matches = getTimeFromText(lines[i]);

    if (matches != null) {
      if (false == lines[i].includes("화물")) {
        // fine: 계속 업데이트되는 최종 결과물 스트링.
        let fine1 = ReplaceLine(lines[i]);  // 일반 치환 (다음은 괄호집중치환)
        console.log(" 482: the line of 1st fine1", fine1.length)
        let fine2 = replaceParenthesesWithUnderscores(fine1); // 괄호 다 치환
        let kwd1 = getUnderscoreSemicolonString(fine2); // from a row(fine2)
        kwd2 = kwd1.slice(0, 3);
        kwd2 += "\t";
        let fine3 = fine2.replace(kwd1, kwd2);

        let fine4 = replaceSecondTime(fine3);  // 최종 ARRIV 시각 1개 추가

  
        let time1 = getCurrentTimeString();
        let time2 = findNthMatch(fine4, 3);
        if (time2 == null) 
          time2 = findNthMatch(fine4, 2);
        if (time2 == null) 
          time2 = findNthMatch(fine4, 1);

        if (bWantedTimeOnly) {
          // Arriv할 시간이 남아 있어야만, 그 줄을 더한다          
          if (compareTimes(time1, time2) > 0) {
            gfines += fine4 + "\r\n";
           // console.log(gfines.length, "HAHA GFINES!");
          } else { // 아니면 안 더하는 것.(Do nothing)
            console.log("🤯 Not the Time Needed!", fine4);
          }
        } else {  // 시간을 고르지 않고 ALL-TIME 에 대하여 다 적용.
          gfines += fine4 + "\r\n";
        }

      } else {
        //console.log(lines[i], "화무르 있음");
      }


    } else {
      console.log(" 512: this match nul sir",  i)   
    }
  }

  let code2 = document.getElementById('code2');
  code2.value = gfines;

  //debugger;
}

