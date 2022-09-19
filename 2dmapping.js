// function getMonitorXY(mesh) {
//   // 좌표 얻기
//   let screenPosition=mesh.position.clone().project(camera);
//   let x=(screenPosition.x+1)/2*sizes.width;
//   let y=(1-screenPosition.y)/2*sizes.height;

//   console.log('screenPo: ',screenPosition.x, screenPosition.y);

//   return [x,y];
// }

/**
 * get screen xy by Vector3 values (xyz)
 * @param {*} xx 
 * @param {*} yy 
 * @param {*} zz 
 * @returns 
 */
function getMonitorXY_V3(xx, yy, zz) {
  let vector = new THREE.Vector3(xx, yy, zz);

  vector.project(camera);

  vector.x = Math.round((0.5 + vector.x / 2) * (sizes.width / window.devicePixelRatio));
  vector.y = Math.round((0.5 - vector.y / 2) * (sizes.height / window.devicePixelRatio));

  return [vector.x,vector.y];
}

/**
 * screen xy from a mesh, by getting vertices like: cube1.geometry.vertices[3];
 * @param {*} mesh1 
 * @returns array of 2d xy coordinates of vertices in the mesh.
 */
function getMonitorXY_Mesh(mesh1) {
  let vtx = mesh1.geometry.vertices;
  let ret = [];

  // e.g. cube1.geometry.vertices.length : 8
  for (let i=0; i<vtx.length; i++) {
    let xy2d = getMonitorXY_V3(vtx[i].x, vtx[i].y, vtx[i].z);
    ret.push(xy2d);
  }

  return ret;
}


const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry( 32, 32, 32 );
const geometry2 = new THREE.BoxGeometry( 8, 8, 32 );
const material = new THREE.MeshBasicMaterial( {color: 0x007700} );
const material2 = new THREE.MeshBasicMaterial( {color: 0x667700} );

// 크기는 동일 (32/32/32)
// 위치가 cube1(0,0,0)과 cubeRT(32,1,0)
// 좌표계는 수학 좌표
let cube1 = new THREE.Mesh( geometry, material );
cube1.position.set( 0, 0, 0 );

let cubeRT = new THREE.Mesh( geometry2, material2 );
cubeRT.position.set( 16, 16, 0 );



scene.add( cube1 );
scene.add( cubeRT );


const sizes = {
  width: 400,
  height: 300,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
//camera.position.z = 200; (1:1 매치)
camera.position.z = 100; //(약 2:1 매치)
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);

// 좌표 얻기
let screenPosition=cube1.position.clone().project(camera);
let x=(screenPosition.x+1)/2*sizes.width;
let y=(1-screenPosition.y)/2*sizes.height;

let tempVtx = new THREE.Vector3();
// set tempVertex based on information from mesh.geometry.attributes.position
cube1.localToWorld(tempVtx);
// tempVertex is converted from local coordinates into world coordinates,
// which is its "after mesh transformation" position
//https://stackoverflow.com/questions/47316837/best-way-to-get-vertices-of-a-mesh-three-js

// MESH의 모니터상 좌표를 가져온다 (각 꼭지점)
//let RTxy = getMonitorXY(cube1);

let papa = getMonitorXY_V3(0,0,0);
console.log(papa, ' this is papa zero');

let papa2 = getMonitorXY_V3(16, 16, 0);
console.log(papa2, ' this is papa zero 234/114 ');

// 소실점으로 Y값 변화 이상... 
// https://postimg.cc/r0Z8P8mz
let vtx = getMonitorXY_Mesh(cube1);

console.log(vtx);

// 가운데 점의 위치
console.log('큐브 중앙좌표:',x,y);
console.log('큐브 원 좌표(by Vector)',tempVtx.x,tempVtx.y,tempVtx.z);

//console.log('큐 원 좌표 by getMonitorXY: ',parseInt(RTxy[0]), parseInt(RTxy[1]));
//console.log('좌상단 좌표: ',parseInt(LTxy[0]), parseInt(LTxy[1]));

//console.log('좌하단 좌표: ',parseInt(LBxy[0]), parseInt(LBxy[1]));
