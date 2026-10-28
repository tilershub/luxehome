import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { Reflector } from 'three/addons/objects/Reflector.js';

/** Procedural interpretation of the existing warm limestone/oak bathroom.
 * All close-ups use this scene. No independent generated views or remote assets.
 */
export function createBathroom({mobile=false}={}) {
  const room = new THREE.Group();
  room.name = 'BathSpace shared bathroom';
  const textures = [];
  const customDisposers = [];
  function texture(kind) {
    const size=128, data=new Uint8Array(size*size*4);
    for(let y=0;y<size;y++) for(let x=0;x<size;x++) {
      // Periodic detail so repeated surfaces have no hard texture seams.
      const wave = Math.sin(x*.049*Math.PI*2)+Math.sin(y*.025*Math.PI*2+x*.09);
      const grain=kind==='oak' ? Math.sin(x*.45+Math.sin(y*.1)*.8)*8 + wave*3 : wave*2;
      const color=kind==='oak' ? [172,137,95] : [216,207,187];
      for(let c=0;c<3;c++)data[(y*size+x)*4+c]=color[c]+grain;
      data[(y*size+x)*4+3]=255;
    }
    const map=new THREE.DataTexture(data,size,size);map.colorSpace=THREE.SRGBColorSpace;
    map.wrapS=map.wrapT=THREE.RepeatWrapping;map.repeat.set(kind==='oak'?2:3,kind==='oak'?1:3);
    map.needsUpdate=true;textures.push(map);return map;
  }
  const stone=new THREE.MeshStandardMaterial({map:texture('stone'),roughness:.82});
  const oak=new THREE.MeshStandardMaterial({map:texture('oak'),roughness:.66});
  const ceramic=new THREE.MeshPhysicalMaterial({color:0xf5f3e9,roughness:.19,clearcoat:.7,clearcoatRoughness:.2});
  const chrome=new THREE.MeshStandardMaterial({color:0xd9dcda,metalness:1,roughness:.18});
  const dark=new THREE.MeshStandardMaterial({color:0x333730,roughness:.7});
  const grout=new THREE.MeshStandardMaterial({color:0xafa995,roughness:1});
  const ceiling=new THREE.MeshStandardMaterial({color:0xeae4d6,roughness:1});
  const led=new THREE.MeshBasicMaterial({color:0xffe2ab});
  const glass=new THREE.MeshPhysicalMaterial({color:0xd4e1da,metalness:0,roughness:.08,transparent:true,opacity:.12,depthWrite:false,side:THREE.DoubleSide});
  const green=new THREE.MeshStandardMaterial({color:0x576e48,roughness:.85,side:THREE.DoubleSide});
  function mesh(geometry,material,name,x,y,z,parent=room) {
    const object=new THREE.Mesh(geometry,material);object.name=name;object.position.set(x,y,z);
    object.castShadow=material!==led&&material!==glass;object.receiveShadow=true;parent.add(object);return object;
  }
  function box(name,x,y,z,w,h,d,material,r=0) {
    return mesh(r?new RoundedBoxGeometry(w,h,d,2,r):new THREE.BoxGeometry(w,h,d),material,name,x,y,z);
  }
  function cylinder(name,x,y,z,rt,rb,h,material=chrome){return mesh(new THREE.CylinderGeometry(rt,rb,h,24),material,name,x,y,z);}
  function pipe(name,points,r=.012,material=chrome){return mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))),32,r,8,false),material,name,0,0,0);}
  function bowl(name,x,y,z,rx,rz,height) {
    // Closed ceramic shell with a genuine hollow interior, not a solid cylinder.
    const points=[[.05,0],[.6,0],[.88,.1],[1,.82],[1,1],[.95,1],[.88,.24],[.56,.13],[.05,.13],[.05,0]];
    const g=new THREE.LatheGeometry(points.map(([r,h])=>new THREE.Vector2(r,h)),48);
    const object=mesh(g,ceramic,name,x,y,z);object.scale.set(rx,height,rz);return object;
  }
  box('floor',0,-.08,-1,4.2,.16,6,stone);
  box('left limestone wall',-2.08,1.4,-1,.16,2.8,6,stone);
  box('right limestone wall',2.08,1.4,-1,.16,2.8,6,stone);
  box('back limestone wall',0,1.4,-4.06,4.2,2.8,.12,stone);
  box('ceiling',0,2.86,-1,4.2,.12,6,ceiling);
  // Fine joints and narrow perimeter shadow gaps.
  for(let z=-4;z<=2;z+=1){box('floor tile joint',0,.002,z,4,.002,.006,grout);box('wall tile joint',2.001,1.4,z,.002,2.8,.005,grout);}
  for(let x=-1;x<=1;x++){box('floor tile joint',x,.002,-1,.006,.002,6,grout);box('back wall joint',x,1.4,-3.996,.005,2.8,.002,grout);}
  box('ceiling cove',0,2.68,-3.94,3.9,.018,.025,led);
  box('left ceiling cove',-1.96,2.68,-1,.025,.018,5.7,led);
  box('right ceiling cove',1.96,2.68,-1,.025,.018,5.7,led);
  for(const x of [-1.2,1.2])for(const z of [.7,-1,-2.8]){
    cylinder('ceiling downlight',x,2.785,z,.075,.075,.016,chrome);
    cylinder('downlight diffuser',x,2.773,z,.058,.058,.006,led);
  }
  // Open doorway frames the arrival without blocking the camera path.
  box('oak door frame left',-1.9,1.4,1.95,.18,2.8,.2,oak);
  box('oak door frame right',1.9,1.4,1.95,.18,2.8,.2,oak);
  box('oak door frame lintel',0,2.7,1.95,3.8,.2,.2,oak);
  // Floating double vanity along the left wall.
  box('floating oak vanity',-1.62,.58,-.85,.7,.48,2.75,oak,.025);
  box('limestone vanity top',-1.59,.85,-.85,.84,.11,2.85,stone,.025);
  for(const z of [-1.53,-.16]){
    box('drawer reveal',-1.263,.56,z,.007,.006,1.33,dark);
    bowl('ceramic vessel basin',-1.56,.91,z,.28,.37,.16);
    cylinder('basin waste',-1.56,.936,z,.034,.034,.012,chrome);
    pipe('wall mounted basin mixer',[[-1.99,1.18,z],[-1.79,1.18,z],[-1.57,1.18,z],[-1.55,1.14,z]],.018);
    const control=cylinder('mixer control',-1.975,1.18,z+.23,.038,.038,.04);control.rotation.z=Math.PI/2;
  }
  box('vanity underside light',-1.6,.331,-.85,.62,.012,2.6,led);
  box('mirror backlight surround',-1.994,1.76,-.85,.01,1.27,2.85,led,.004);
  const mirror=new Reflector(new THREE.PlaneGeometry(2.74,1.16),{color:0xc9c4b6,textureWidth:mobile?256:512,textureHeight:mobile?256:512,clipBias:.003});
  mirror.name='vanity mirror';mirror.position.set(-1.976,1.76,-.85);mirror.rotation.y=Math.PI/2;room.add(mirror);
  customDisposers.push(()=>mirror.getRenderTarget().dispose());
  // Freestanding tub, behind the clear aisle.
  bowl('freestanding bathtub',-.35,.08,-3.35,.91,.43,.59);
  cylinder('tub waste',-.35,.17,-3.35,.035,.035,.01);
  pipe('tub spout',[[-.35,1.02,-3.97],[-.35,1.02,-3.72],[-.35,.98,-3.67]],.022);
  const tubControl=cylinder('bath mixer',-.05,1.02,-3.976,.045,.045,.035);tubControl.rotation.x=Math.PI/2;
  // Recessed back-wall shelf with warm light and bottles.
  box('niche recess',-.35,1.35,-3.985,1.85,.35,.025,dark,.01);
  box('niche back',-.35,1.35,-3.97,1.81,.31,.012,stone);
  box('niche shelf',-.35,1.18,-3.86,1.86,.025,.24,stone);
  box('niche light',-.35,1.514,-3.9,1.8,.012,.1,led);
  // Shower, adjacent to the bath, with consistent fittings and linear drain.
  box('shower glass',.8,1.15,-2.83,.014,2.3,2.05,glass);
  box('glass channel',.8,.018,-2.83,.025,.036,2.05,chrome);
  box('shower glass return',1.39,1.15,-1.8,1.18,2.3,.012,glass);
  pipe('shower handle',[[1.68,1.05,-1.77],[1.68,1.3,-1.77]],.014);
  pipe('rain shower arm',[[1.97,2.18,-2.95],[1.65,2.18,-2.95],[1.37,2.18,-2.95]],.021);
  cylinder('rain shower head',1.37,2.15,-2.95,.19,.19,.025);
  cylinder('rain shower face',1.37,2.132,-2.95,.175,.175,.006,dark);
  for(let x=-2;x<=2;x++)for(let z=-2;z<=2;z++)if(x*x+z*z<7)cylinder('shower nozzle',1.37+x*.05,2.127,-2.95+z*.05,.004,.004,.006,ceramic);
  const showerMixer=cylinder('shower mixer',1.974,1.08,-2.75,.07,.07,.03);showerMixer.rotation.z=Math.PI/2;
  pipe('hand shower rail',[[1.94,1.28,-2.4],[1.94,1.88,-2.4]],.013);
  pipe('hand shower hose',[[1.96,1.05,-2.7],[1.86,.7,-2.56],[1.83,.8,-2.38],[1.9,1.65,-2.4]],.008);
  const hand=cylinder('hand shower',1.9,1.7,-2.4,.045,.045,.018);hand.rotation.z=Math.PI/2;
  box('linear drain cover',1.39,.012,-3.68,1.02,.016,.08,chrome);
  for(let i=0;i<12;i++)box('drain slot',.95+i*.08,.022,-3.68,.04,.002,.008,dark);
  // WC and accessory zone, right of entrance. Oriented towards the aisle.
  const wc=box('wall hung WC',1.68,.37,.12,.64,.4,.43,ceramic,.13);
  box('WC seat',1.64,.587,.12,.62,.045,.45,ceramic,.02);
  box('flush plate',1.993,1.05,.12,.015,.16,.25,chrome,.005);
  box('flush button',1.98,1.06,.06,.018,.08,.09,chrome,.004);
  pipe('hand spray hose',[[1.98,.72,.54],[1.85,.25,.55],[1.9,.3,.8],[1.94,.85,.76]],.007);
  pipe('hand spray',[[1.93,.8,.76],[1.93,.94,.76],[1.88,.96,.76]],.012);
  cylinder('brush holder',1.83,.16,.99,.065,.065,.3,chrome);
  pipe('brush handle',[[1.83,.27,.99],[1.83,.49,.99]],.008);
  pipe('towel bar',[[1.96,1.12,1.15],[1.85,1.12,1.15],[1.85,1.12,1.65],[1.96,1.12,1.65]],.012);
  box('folded hand towel',1.84,.98,1.4,.025,.3,.25,new THREE.MeshStandardMaterial({color:0xe8e2d1,roughness:1}),.01);
  // Quiet styling accents, all geometry and consistent across viewpoints.
  const bottle=new THREE.MeshStandardMaterial({color:0x7b653d,roughness:.3});
  for(const x of [.2,.39]){cylinder('bath bottle',x,1.28,-3.84,.045,.045,.18,bottle);cylinder('bottle pump',x,1.39,-3.84,.018,.018,.04,chrome);}
  cylinder('soap dispenser',-1.63,1.01,-.83,.04,.05,.2,bottle);
  cylinder('soap pump',-1.63,1.13,-.83,.015,.015,.05,chrome);
  cylinder('plant pot',-1.65,1.02,-2.04,.09,.065,.23,ceramic);
  for(let i=0;i<7;i++){
    const angle=i*2.4,x=-1.65+Math.cos(angle)*.12,z=-2.04+Math.sin(angle)*.12;
    pipe('plant stem',[[-1.65,1.12,-2.04],[x,1.35+i*.014,z]],.004,green);
    const leaf=mesh(new THREE.SphereGeometry(1,8,6),green,'plant leaf',x,1.35+i*.014,z);leaf.scale.set(.055,.015,.13);leaf.rotation.set(.5,angle,.3);
  }
  function dispose(){
    const geometries=new Set(),materials=new Set();
    room.traverse(object=>{if(object.isMesh){geometries.add(object.geometry);for(const m of Array.isArray(object.material)?object.material:[object.material])materials.add(m);}});
    geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());customDisposers.forEach(fn=>fn());
  }
  return {room,dispose};
}
