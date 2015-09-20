var container, stats;
var camera, scene, renderer, particles, geometry, materials = [], parameters, i, h, color, size, sprite;
var mouseX = 0, mouseY = 0;
var emojiSprites = [];

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {

  container = document.createElement( 'div' );
  document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 3000 );
  camera.position.z = 1200;

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0x000000, 0.0007 );

  geometry = new THREE.Geometry();

  for (var i = 0; i < 16; i++ ) {
    emojiSprites[i] = THREE.ImageUtils.loadTexture( 'images/emoji/emoji-' + i + '.png' );
  }

  for ( i = 0; i < 200; i ++ ) {

    var vertex = new THREE.Vector3();

    var phi = Math.acos( -1 + ( 2 * i ) / 200 );
    var theta = Math.sqrt( 200 * Math.PI ) * phi;

    vertex.x = 600 * Math.cos( theta ) * Math.sin( phi );
    vertex.y = 600 * Math.sin( theta ) * Math.sin( phi );
    vertex.z = 600 * Math.cos( phi );

    // vertex.x = Math.random() * 2000 - 1000;
    // vertex.y = Math.random() * 2000 - 1000;
    // vertex.z = Math.random() * 2000 - 1000;

    geometry.vertices.push( vertex );

  }

  for ( i = 0; i < 16; i ++ ) {
    size  = Math.floor(Math.random() * 16 + 16);
    sprite = emojiSprites[i];

    materials[i] = new THREE.PointsMaterial( { size: size, map: sprite, transparent: true } );
    particles = new THREE.Points( geometry, materials[i] );

    particles.rotation.x = Math.random() * 6;
    particles.rotation.y = Math.random() * 6;
    particles.rotation.z = Math.random() * 6;

    scene.add( particles );

  }

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  container.appendChild( stats.domElement );

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  document.addEventListener( 'touchmove', onDocumentTouchMove, false );

  //

  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;

}

function onDocumentTouchStart( event ) {

  if ( event.touches.length === 1 ) {

    event.preventDefault();

    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;

  }

}

function onDocumentTouchMove( event ) {

  if ( event.touches.length === 1 ) {

    event.preventDefault();

    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;

  }

}

//

function animate() {

  requestAnimationFrame( animate );

  render();
  stats.update();

}

function render() {

  var time = Date.now() * 0.00008;

  // camera.position.x += ( mouseX - camera.position.x ) * 0.05;
  // camera.position.y += ( - mouseY - camera.position.y ) * 0.05;

  camera.position.x = Math.sin(time) * 1200;
  camera.position.z = Math.cos(time) * 1200;

  camera.lookAt( scene.position );

  for ( i = 0; i < scene.children.length; i ++ ) {

    var object = scene.children[ i ];

    if ( object instanceof THREE.Points ) {

      // object.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );

    }

  }

  renderer.render( scene, camera );

}