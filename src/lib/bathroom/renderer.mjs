import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createBathroom } from './room.mjs';
import { cameraPose } from './camera-path.mjs';

/** Loaded only after the entrance image. No permanent animation loop. */
export async function createRoomRenderer(container, {onFailure=()=>{}}={}) {
  const mobile=container.clientWidth<760;
  const renderer=new THREE.WebGLRenderer({antialias:!mobile,alpha:false,powerPreference:'low-power'});
  renderer.domElement.setAttribute('aria-hidden','true');
  renderer.domElement.style.cssText='display:block;width:100%;height:100%';
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,mobile?1.25:1.5));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.18;
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate=false;
  const scene=new THREE.Scene();scene.background=new THREE.Color(0xe4ddcb);
  const camera=new THREE.PerspectiveCamera(63,1,.04,25);
  const model=createBathroom({mobile});scene.add(model.room);
  const environment=new RoomEnvironment();
  const pmrem=new THREE.PMREMGenerator(renderer);
  const envTarget=pmrem.fromScene(environment,.04);
  scene.environment=envTarget.texture;scene.environmentIntensity=.65;
  environment.dispose();pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xfff4dd,0x8d806b,1.35));
  const light=new THREE.DirectionalLight(0xfff4dc,2.4);light.position.set(-.4,2.65,1);
  light.target.position.set(.2,0,-2);scene.add(light,light.target);
  light.castShadow=true;light.shadow.mapSize.set(mobile?512:1024,mobile?512:1024);
  Object.assign(light.shadow.camera,{left:-3,right:3,top:5,bottom:-3,near:.1,far:12});
  light.shadow.camera.updateProjectionMatrix();
  light.shadow.bias=-.0005;light.shadow.normalBias=.025;
  const warm=new THREE.PointLight(0xffdb9d,5,6,2);warm.position.set(-1.3,2.3,-1);scene.add(warm);
  const back=new THREE.PointLight(0xffe7c2,4,5,2);back.position.set(.2,2.4,-3);scene.add(back);
  let disposed=false,frames=0,slowFrames=0,qualityReduced=false;
  const lost=event=>{event.preventDefault();onFailure();};
  renderer.domElement.addEventListener('webglcontextlost',lost);
  function resize(){
    if(disposed)return;
    const w=Math.max(1,container.clientWidth),h=Math.max(1,container.clientHeight);
    renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();
  }
  function render(progress){
    if(disposed)return;
    const pose=cameraPose(progress,camera.aspect<.85);
    camera.position.fromArray(pose.position);camera.lookAt(...pose.target);camera.fov=pose.fov;camera.updateProjectionMatrix();
    const started=performance.now();renderer.render(scene,camera);
    if(++frames>8&&performance.now()-started>45)slowFrames++;
    if(slowFrames>8&&!qualityReduced){qualityReduced=true;slowFrames=0;renderer.setPixelRatio(1);resize();}
    else if(qualityReduced&&slowFrames>16)onFailure();
  }
  function dispose(){
    if(disposed)return;disposed=true;
    renderer.domElement.removeEventListener('webglcontextlost',lost);
    model.dispose();envTarget.dispose();light.shadow.map?.dispose();renderer.dispose();renderer.domElement.remove();
  }
  try {
    resize();const pose=cameraPose(0,camera.aspect<.85);camera.position.fromArray(pose.position);camera.lookAt(...pose.target);
    await renderer.compileAsync(scene,camera);
    renderer.shadowMap.needsUpdate=true;
    render(0);container.append(renderer.domElement);
    return {render,resize,dispose};
  } catch(error){dispose();throw error;}
}
