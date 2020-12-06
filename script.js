///////////////////////////////////////////////////////
// Option 1: Import the entire three.js core library.
import * as THREE from './node_modules/three/src/Three.js';
import { TrackballControls } from './node_modules/three/examples/jsm/controls/TrackballControls.js';
// import * as dat from './node_modules/dat.gui/build/dat.gui.min.js';

const scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 10, 1000);
// const helper = new THREE.CameraHelper(camera);
// scene.add(helper);

var renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setClearColor(0xEEEEEE, 1.0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// var axes = new THREE.AxesHelper(100);
// scene.add(axes);

var planeGeometry = new THREE.PlaneGeometry(100, 100);
var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
planeMaterial.side = THREE.DoubleSide;
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;

plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 0
plane.position.y = 0
plane.position.z = 0

scene.add(plane);

camera.position.x = 40;
camera.position.y = 40;
camera.position.z = 40;
camera.lookAt(scene.position);

var spotLight = new THREE.SpotLight(0xffffff, 1);
// spotLight.angle = Math.PI / 2 * 0.83;
spotLight.position.set(0, 50, 0);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 2048; // default is 512
spotLight.shadow.mapSize.height = 2048; // default is 512
scene.add(spotLight);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

const light = new THREE.AmbientLight(0x404040, 1);
scene.add(light);

const geometry = new THREE.BoxGeometry(20, 20, 20);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

$("#WebGL-output").append(renderer.domElement);
var trackballControls = new TrackballControls(camera, renderer.domElement);

var controls = new function() {
	this.stepsNumber = 10;
	this.rotationAngle = 150;
	this.axisX = 30;
	this.axisZ = 30;
	this.radius = 20;

	this.asGeom = function() {
		var options = {
			stepsNumber: controls.stepsNumber,
			rotationAngle: controls.rotationAngle,
			axisX: controls.axisX,
			axisZ: controls.axisZ,
			radius: controls.radius
		};
	};


}

var gui = new dat.GUI();
gui.add(controls, 'stepsNumber', 6, 20).step(1).onChange(controls.asGeom);
gui.add(controls, 'rotationAngle', 66, 360).onChange(controls.asGeom);
gui.add(controls, 'axisX', -100, 100).onChange(controls.asGeom);
gui.add(controls, 'axisZ', -100, 100).onChange(controls.asGeom);
gui.add(controls, 'radius', 0, 50).onChange(controls.asGeom);

controls.asGeom();
render();

function render() {
	renderer.render(scene, camera);
	requestAnimationFrame(render);
	trackballControls.update();
}


const goldenRatio = (1 + Math.sqrt(5)) / 2;



///////////////////////////////////////////////////////
// Option 2: Import just the parts you need.
// import { Scene } from 'three';

// const scene = new Scene();