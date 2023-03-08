/*jslint plusplus: true, white: true */
/*global Canvas, Transform,
        console, document, requestAnimationFrame, THREE, window, Stats */

(function() {
  "use strict";

  // Tango colors (en.wikipedia.org/wiki/Tango_Desktop_Project)
  var container, stats, camera, scene, renderer, overRenderer, mesh,
    loader, canvas, context, geometry, group,
    material,
    mouse = {
      x: 0,
      y: 0
    },
    mouseOnDown = {
      x: 0,
      y: 0
    },
    rotation = {
      x: 0,
      y: 0
    },
    target = {
      x: Math.PI * 3 / 2,
      y: Math.PI / 6.0
    },
    targetOnDown = {
      x: 0,
      y: 0
    },
    curZoomSpeed = 0,
    distance = 100000,
    distanceTarget = 100000,
    PI_HALF = Math.PI / 2,
    // windowHalfX = window.innerWidth / 2,
    // windowHalfY = window.innerHeight / 2,
    earth, dir, origin, length, hex,
    headLength, headWidth, chr, mc, mckl, psu, wsu, uo, accra, zoomDamp;

  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

  }


  function zoom(delta) {
    distanceTarget -= delta;
    distanceTarget = distanceTarget > 1000 ? 1000 : distanceTarget;
    distanceTarget = distanceTarget < 350 ? 350 : distanceTarget;
  }


  function onMouseWheel(event) {
    event.preventDefault();
    if (overRenderer) {
      zoom(event.wheelDeltaY * 0.3);
    }
    return false;
  }

  function onDocumentKeyDown(event) {
    switch (event.keyCode) {
      case 38:
        zoom(100);
        event.preventDefault();
        break;
      case 40:
        zoom(-100);
        event.preventDefault();
        break;
    }
  }

  function onMouseMove(event) {

    zoomDamp = distance / 1000;

    mouse.x = -event.clientX;
    mouse.y = event.clientY;

    target.x = targetOnDown.x + (mouse.x - mouseOnDown.x) * 0.005 * zoomDamp;
    target.y = targetOnDown.y + (mouse.y - mouseOnDown.y) * 0.005 * zoomDamp;

    target.y = target.y > PI_HALF ? PI_HALF : target.y;
    target.y = target.y < -PI_HALF ? -PI_HALF : target.y;
  }

  function onMouseOut(event) {
    event.preventDefault();
    container.removeEventListener('mousemove', onMouseMove, false);
    container.removeEventListener('mouseup', onMouseUp, false);
    container.removeEventListener('mouseout', onMouseOut, false);
  }

  function onMouseUp(event) {
    event.preventDefault();
    container.removeEventListener('mousemove', onMouseMove, false);
    container.removeEventListener('mouseup', onMouseUp, false);
    container.removeEventListener('mouseout', onMouseOut, false);
    container.style.cursor = 'auto';
  }



  function onMouseDown(event) {
    event.preventDefault();
    container.addEventListener('mousemove', onMouseMove, false);
    container.addEventListener('mouseup', onMouseUp, false);
    container.addEventListener('mouseout', onMouseOut, false);

    mouseOnDown.x = -event.clientX;
    mouseOnDown.y = event.clientY;

    targetOnDown.x = target.x;
    targetOnDown.y = target.y;

    console.log(mouseOnDown.x);
    console.log(mouseOnDown.y);
    console.log(mouseOnDown.z);


    container.style.cursor = 'move';
  }

  function render() {

    zoom(curZoomSpeed);

    rotation.x += (target.x - rotation.x) * 0.1;
    rotation.y += (target.y - rotation.y) * 0.1;
    distance += (distanceTarget - distance) * 0.3;

    camera.position.x = distance * Math.sin(rotation.x) * Math.cos(rotation.y);
    camera.position.y = distance * Math.sin(rotation.y);
    camera.position.z = distance * Math.cos(rotation.x) * Math.cos(rotation.y);

    camera.lookAt(scene.position);

    renderer.clear();
    renderer.render(scene, camera);

  }

  function animate() {

    requestAnimationFrame(animate);
    render();
    stats.update();

  }

  function init() {

    var texture, mat, sp;

    container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 400;
    scene = new THREE.Scene();
    group = new THREE.Group();
    scene.add(group);

    // earth
    loader = new THREE.TextureLoader();
    loader.load('solarSystem/map33.jpg', function(texture) {
      geometry = new THREE.SphereGeometry(200, 40, 40);
      material = new THREE.MeshBasicMaterial({
        map: texture,
        overdraw: 0.5
      });
      earth = new THREE.Mesh(geometry, material);
      group.add(earth);
    });

    length = 250;
    hex = 0xffff00;
    headLength = 10;
    headWidth = 10;
    dir = new THREE.Vector3(50, 0, -100);
    origin = new THREE.Vector3(0, -48, 0);
    chr = new THREE.ArrowHelper(dir, origin, length, hex, headLength, headWidth);
    scene.add(chr);

    dir = new THREE.Vector3(50, 0, -100);
    origin = new THREE.Vector3(0, -43, 0);
    mckl = new THREE.ArrowHelper(dir, origin, length, hex, headLength, headWidth);
    scene.add(mckl);

    dir = new THREE.Vector3(30, 0, 100);
    origin = new THREE.Vector3(-1, 30, 0);
    mc = new THREE.ArrowHelper(dir, origin, length, hex, headLength, headWidth);
    scene.add(mc);

    dir = new THREE.Vector3(30, 0, 100);
    origin = new THREE.Vector3(-5, 30, 20);
    psu = new THREE.ArrowHelper(dir, origin, length, hex, headLength, headWidth);
    scene.add(psu);

    dir = new THREE.Vector3(30, 0, 100);
    origin = new THREE.Vector3(-20, 30, 20);
    wsu = new THREE.ArrowHelper(dir, origin, length, hex, headLength, headWidth);
    scene.add(wsu);

    dir = new THREE.Vector3(210, 0, 50);
    origin = new THREE.Vector3(0, -40, 0);
    accra = new THREE.ArrowHelper(dir, origin, length, hex, headLength, headWidth);
    scene.add(accra);

    dir = new THREE.Vector3(200, 0, 50);
    origin = new THREE.Vector3(0, 60, 0);
    uo = new THREE.ArrowHelper(dir, origin, length, hex, headLength, headWidth);
    scene.add(uo);

    // shadow
    canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    context = canvas.getContext('2d');
    context.textAlign = 'center';
    context.font = '10px Arial';
    context.fillStyle = '#ffff00';
    context.fillText("PENN STATE UNIVERSITY", 65, 60);
    mat = new THREE.SpriteMaterial({
      transparent: false,
      useScreenCoordinates: false,
      color: 0xffffff
    });
    sp = new THREE.Sprite(mat);
    scene.add(sp);

    //shadow
    texture = new THREE.CanvasTexture(canvas);
    geometry = new THREE.PlaneBufferGeometry(100, 100, 3, 3);
    material = new THREE.MeshBasicMaterial({
      map: texture,
      overdraw: 0.5
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 40;
    mesh.position.x = 60;
    mesh.position.z = 250;
    scene.add(mesh);

    canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    context = canvas.getContext('2d');
    context.textAlign = 'center';
    context.font = '10px Arial';
    context.fillStyle = '#ffff00';
    context.fillText("WASH. U. IN ST.LOUIS", 75, 75);
    mat = new THREE.SpriteMaterial({
      transparent: false,
      useScreenCoordinates: false,
      color: 0xffffff
    });
    sp = new THREE.Sprite(mat);
    scene.add(sp);

    //shadow
    texture = new THREE.CanvasTexture(canvas);
    geometry = new THREE.PlaneBufferGeometry(100, 100, 3, 3);
    material = new THREE.MeshBasicMaterial({
      map: texture,
      overdraw: 0.5
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 28;
    mesh.position.x = 20;
    mesh.position.z = 250;
    scene.add(mesh);

    canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    context = canvas.getContext('2d');
    context.textAlign = 'center';
    context.font = '10px Arial';
    context.fillStyle = '#ffff00';
    context.fillText("MESSIAH COLLEGE", 50, 50);
    mat = new THREE.SpriteMaterial({
      transparent: false,
      useScreenCoordinates: false,
      color: 0xffffff
    });
    sp = new THREE.Sprite(mat);
    scene.add(sp);

    //shadow
    texture = new THREE.CanvasTexture(canvas);
    geometry = new THREE.PlaneBufferGeometry(100, 100, 3, 3);
    material = new THREE.MeshBasicMaterial({
      map: texture,
      overdraw: 0.5
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 22;
    mesh.position.x = 130;
    mesh.position.z = 250;
    scene.add(mesh);

    canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    context = canvas.getContext('2d');
    context.textAlign = 'center';
    context.font = '10px Arial';
    context.fillStyle = '#ffff00';
    context.fillText("OXFORD UNIVERSITY", 60, 60);
    mat = new THREE.SpriteMaterial({
      transparent: false,
      useScreenCoordinates: false,
      color: 0xffffff
    });
    sp = new THREE.Sprite(mat);
    scene.add(sp);

    //shadow
    texture = new THREE.CanvasTexture(canvas);
    geometry = new THREE.PlaneBufferGeometry(100, 100, 3, 3);
    material = new THREE.MeshBasicMaterial({
      map: texture,
      overdraw: 0.5
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 70;
    mesh.position.z = 40;
    mesh.position.x = 250;
    mesh.rotation.y = Math.PI / 2;
    scene.add(mesh);

    canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    context = canvas.getContext('2d');
    context.textAlign = 'center';
    context.font = '10px Arial';
    context.fillStyle = '#ffff00';
    context.fillText("ACCRA", 30, 30);
    mat = new THREE.SpriteMaterial({
      transparent: false,
      useScreenCoordinates: false,
      color: 0xffffff
    });
    sp = new THREE.Sprite(mat);
    scene.add(sp);

    //shadow
    texture = new THREE.CanvasTexture(canvas);
    geometry = new THREE.PlaneBufferGeometry(100, 100, 3, 3);
    material = new THREE.MeshBasicMaterial({
      map: texture,
      overdraw: 0.5
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = -50;
    mesh.position.z = 30;
    mesh.position.x = 250;
    mesh.rotation.y = Math.PI / 2;
    scene.add(mesh);

    canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    context = canvas.getContext('2d');
    context.textAlign = 'center';
    context.font = '10px Arial';
    context.fillStyle = '#ffff00';
    context.fillText("CHERAS", 30, 30);
    mat = new THREE.SpriteMaterial({
      transparent: false,
      useScreenCoordinates: false,
      color: 0xffffff
    });
    sp = new THREE.Sprite(mat);
    scene.add(sp);

    //shadow
    texture = new THREE.CanvasTexture(canvas);
    geometry = new THREE.PlaneBufferGeometry(100, 100, 3, 3);
    material = new THREE.MeshBasicMaterial({
      map: texture,
      overdraw: 0.5
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = -40;
    mesh.position.z = -250;
    mesh.position.x = 80;
    mesh.rotation.y = -2.3 * Math.PI / 2;
    scene.add(mesh);

    canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    context = canvas.getContext('2d');
    context.textAlign = 'center';
    context.font = '10px Arial';
    context.fillStyle = '#ffff00';
    context.fillText("MCKL", 30, 30);
    mat = new THREE.SpriteMaterial({
      transparent: false,
      useScreenCoordinates: false,
      color: 0xffffff
    });
    sp = new THREE.Sprite(mat);
    scene.add(mat);
    //shadow
    texture = new THREE.CanvasTexture(canvas);
    geometry = new THREE.PlaneBufferGeometry(100, 100, 3, 3);
    material = new THREE.MeshBasicMaterial({
      map: texture,
      overdraw: 0.5
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = -90;
    mesh.position.z = -250;
    mesh.position.x = 100;
    mesh.rotation.y = -2.3 * Math.PI / 2;
    scene.add(mesh);

    renderer = new THREE.CanvasRenderer();
    renderer.setClearColor(0xa9b9c1);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(1200, 600);
    container.appendChild(renderer.domElement);

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild(stats.domElement);

    container.appendChild(renderer.domElement);
    container.addEventListener('mousedown', onMouseDown, false);
    container.addEventListener('mousewheel', onMouseWheel, false);
    document.addEventListener('keydown', onDocumentKeyDown, false);
    window.addEventListener('resize', onWindowResize, false);
    container.addEventListener('mouseover', function() {
      overRenderer = true;
    }, false);
    container.addEventListener('mouseout', function() {
      overRenderer = false;
    }, false);
  }

  init();
  animate();

}());
