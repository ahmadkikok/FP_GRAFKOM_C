var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var spaceship;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.campingFactor = 0.25;
controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(0xffffff, 1.0);  
fillLight.position.set(100, 100, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
//scene.add(fillLight);
scene.add(backLight);

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setResourcePath('../assets/');
mtlLoader.setPath('../assets/');
mtlLoader.load('ship.mtl', function(materials) {
    materials.preload();
    
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('../assets/');
    objLoader.load('ship.obj', function(object) {
    //    object.position.y -= 60;
        spaceship = object;
        scene.add(spaceship);
    });
});

var starSphere  = THREEx.Planets.createStarfield()
scene.add(starSphere)

var animate = function () {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
};
animate();

document.addEventListener('keydown', function(event) {
    switch(event.keyCode) {
        case 87: //w
            spaceship.position.y += .1;
            break;
        case 83: //s
            spaceship.position.y -= .1;
            break;
        case 65: //a
            spaceship.position.x -= .1;
            break;
        case 68: //d
            spaceship.position.x += .1;
            break;
        
    }
});