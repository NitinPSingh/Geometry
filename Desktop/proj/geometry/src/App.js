import './App.css';
import React,{ Component } from "react";

import * as THREE from "three";


class App extends Component {
    componentDidMount() {
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 38, 500/250,0.1,1000);
        var renderer = new THREE.WebGLRenderer( {antialias: true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.mount.appendChild( renderer.domElement );
     
// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.

// const texture = new THREE.TextureLoader()
// const normal = texture.load("./im.jpg")
// const material = new THREE.MeshStandardMaterial()
// material.metalness = 0.7
// material.roughness = 0.2
// material.normalMap=normal
// const gerometr = new THREE.IcosahedronGeometry(20,4)
// // itemSize = 3 because there are 3 values (components) per vertex

// // geometry.faces[ faceIndex ].vertexColors[ vertexIndex ] = new THREE.Color( 0xff0000 );
// const sphere = new THREE.Mesh(gerometr,material)
// scene.add(sphere)

// var L1 = new THREE.PointLight( 0xFFFFFF, 1);
// L1.position.z = 200;
// L1.position.y = -1000;
// L1.position.x = -1000;
// scene.add(L1);

// var L2 = new THREE.PointLight( 0xFFFFFF, 1);
// L2.position.z = 200;
// L2.position.y = 1000;
// L2.position.x = 1000;
// scene.add(L2);
// var L3 = new THREE.PointLight( 0xFFFFFF, 1);
// L3.position.z = 200;
// L3.position.y = -1000;
// L3.position.x = 1000;
// scene.add(L3);
// var L4 = new THREE.PointLight( 0xFFFFFF, 1);
// L4.position.z = 200;
// L4.position.y = 1000;
// L4.position.x = -1000;
// scene.add(L4);
let light = new THREE.DirectionalLight(0xffffff, 1);
light.position.setScalar(1);
scene.add(light, new THREE.AmbientLight(0xffffff, 0.5));
// var L3 = new THREE.PointLight( 0xFFFFFF, 1);
// L3.position.z = 200;
// L3.position.y = +1000;
// L3.position.x = -1000;
// scene.add(L3);

// var Icosah = new THREE.Mesh(new IcosahedronGeometry(20,1), pinkMat);
// scene.add(Icosah);

// var Icod = new THREE.Mesh(new THREE.IcosahedronGeometry(1,4), pinkMat);
// let light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.setScalar(1);
// scene.add(light, new THREE.AmbientLight(0xffffff, 0.5));
THREE.BufferGeometry.prototype.tripleFace = tripleFace;
let g = new THREE.IcosahedronGeometry(8, 3).tripleFace()

const count = g.attributes.position.count;
  

				
  g.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array( count * 3 ), 3 ) );
  const color = new THREE.Color();
  const colors1 = g.attributes.color;
		
  for ( let i = 0; i < count/9; i ++ ) {
          
          
    color.setHex( Math.random() * 0xffffff );
    
   
    colors1.setXYZ( i*9, color.r, color.g, color.b);
    colors1.setXYZ( i*9+1, color.r, color.g, color.b);
colors1.setXYZ( i*9+2, color.r, color.g, color.b);
colors1.setXYZ( i*9+3, color.r, color.g, color.b);
    colors1.setXYZ( i*9+4, color.r, color.g, color.b);
colors1.setXYZ( i*9+5, color.r, color.g, color.b);colors1.setXYZ( i*9+6, color.r, color.g, color.b);
    colors1.setXYZ( i*9+7, color.r, color.g, color.b);
colors1.setXYZ( i*9+8, color.r, color.g, color.b);

    
  }
      console.log(g)  
let m =  new THREE.MeshLambertMaterial( {

  vertexColors: true,
 

} );
let o = new THREE.Mesh(g, m);
scene.add(o);
console.log(o);

// scene.add(o1);
let l = new THREE.Mesh(g, new THREE.MeshBasicMaterial({color:"black",wireframe: true}));
l.scale.setScalar(1.002);
scene.add(l);


renderer.setAnimationLoop(()=>{
  renderer.render(scene, camera);
});

function tripleFace(){
  let geometry = this;
  let pos = geometry.attributes.position;
  
  if (geometry.index != null) {
    console.log("Works for non-indexed geometries!");
    return;
  }
  
  let facesCount = pos.count / 3;
  
  let pts = [];
  let triangle = new THREE.Triangle();
  let a = new THREE.Vector3(), b = new THREE.Vector3, c = new THREE.Vector3();
  for(let i = 0; i < facesCount; i++){
    a.fromBufferAttribute(pos, i * 3 + 0);
    b.fromBufferAttribute(pos, i * 3 + 1);
    c.fromBufferAttribute(pos, i * 3 + 2);
    triangle.set(a, b, c);
    let o = new THREE.Vector3();
    triangle.getMidpoint(o);
    
    // make it tetrahedron-like
    let l = a.distanceTo(b);
    let h = Math.sqrt(3) / 2 * l * 0.15;// scale it at your will
                                        // remove 0.125 to get tetrahedrons
    let d = o.clone().normalize().setLength(h); 
    o.add(d);
    
    pts.push(
      o.clone(), a.clone(), b.clone(),
      o.clone(), b.clone(), c.clone(),
      o.clone(), c.clone(), a.clone()
    );
  }
  
  let g = new THREE.BufferGeometry().setFromPoints(pts);
  g.computeVertexNormals()
  
  return g;
}



var clock = new THREE.Clock( );
var t1 = 0;
var t2;
// scene.add(new THREE.AmbientLight(0xFFFFF))
camera.position.z = 32
// camera.position.x = -20
// camera.position.y = -5
var clock = new THREE.Clock( );
 var t1 = 0;
var t2;
renderer.setAnimationLoop(_ => {
  o.rotation.x += 0.0025
  o.rotation.y += 0.0025
  l.rotation.x += 0.0025
  l.rotation.y += 0.0025
  t2 = clock.getElapsedTime ( );
  renderer.render(scene, camera);
  if ( t2 - t1 > 1) {
    for ( let i = 0; i < count/9; i ++ ) {
          
          
      color.setHex( Math.random() * 0xffffff );
      
     
      colors1.setXYZ( i*9, color.r, color.g, color.b);
      colors1.setXYZ( i*9+1, color.r, color.g, color.b);
  colors1.setXYZ( i*9+2, color.r, color.g, color.b);
  colors1.setXYZ( i*9+3, color.r, color.g, color.b);
      colors1.setXYZ( i*9+4, color.r, color.g, color.b);
  colors1.setXYZ( i*9+5, color.r, color.g, color.b);colors1.setXYZ( i*9+6, color.r, color.g, color.b);
      colors1.setXYZ( i*9+7, color.r, color.g, color.b);
  colors1.setXYZ( i*9+8, color.r, color.g, color.b);
  
      
    }
  t1=t2;}
  
  g.attributes.color.needsUpdate = true;
})

    }
    render() {
        return (
            <div style={{display:"grid"}}>

            <div ref={ref => (this.mount = ref)}>
           
            </div>
            </div>
        )
    }
}

export default App;
