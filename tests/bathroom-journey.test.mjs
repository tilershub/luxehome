import test from 'node:test';
import assert from 'node:assert/strict';
import { Box3, Vector3 } from 'three';
import { cameraPose, chapterAt, CHAPTER_STOPS, scrollProgress, shouldLoadRoom } from '../src/lib/bathroom/camera-path.mjs';
import { createBathroom } from '../src/lib/bathroom/room.mjs';

test('every camera position stays in the clear aisle, above the floor and below the ceiling',()=>{
  for(let step=0;step<=1000;step++){
    const pose=cameraPose(step/1000);
    const [x,y,z]=pose.position;
    assert.ok(Math.abs(x)<.35&&y>1.2&&y<1.75&&z> -1.2&&z<2.8);
    assert.ok([...pose.position,...pose.target,pose.fov].every(Number.isFinite));
  }
});
test('camera and view direction stay continuous at all chapter boundaries',()=>{
  let previous=cameraPose(0);
  for(let step=1;step<=1000;step++){
    const next=cameraPose(step/1000);
    assert.ok(Math.hypot(...next.position.map((v,i)=>v-previous.position[i]))<.04);
    assert.ok(Math.hypot(...next.target.map((v,i)=>v-previous.target[i]))<.05);
    previous=next;
  }
});
test('chapter navigation and camera stops agree; progress is bounded',()=>{
  CHAPTER_STOPS.forEach((p,i)=>assert.equal(chapterAt(p),i));
  assert.deepEqual(cameraPose(-1),cameraPose(0));
  assert.deepEqual(cameraPose(2),cameraPose(1));
  assert.equal(scrollProgress(76,2500,700,76),0);
  assert.equal(scrollProgress(-1724,2500,700,76),1);
  assert.equal(scrollProgress(999,700,700),0);
});
test('portrait framing uses the same physical scene and a wider lens',()=>{
  for(const p of CHAPTER_STOPS){
    const desktop=cameraPose(p),portrait=cameraPose(p,true);
    assert.deepEqual(desktop.position,portrait.position);
    assert.deepEqual(desktop.target,portrait.target);
    assert.ok(portrait.fov>desktop.fov);
  }
});
test('reduced motion, slow connections, data saving and low memory skip the 3D download',()=>{
  assert.equal(shouldLoadRoom(),true);
  for(const options of [{reducedMotion:true},{saveData:true},{effectiveType:'2g'},{effectiveType:'3g'},{effectiveType:'slow-2g'},{deviceMemory:2}])assert.equal(shouldLoadRoom(options),false);
});
test('the shared scene contains the fixtures and the camera never enters their bounds',()=>{
  const model=createBathroom();model.room.updateMatrixWorld(true);
  for(const name of ['ceramic vessel basin','wall mounted basin mixer','vanity mirror','rain shower head','hand shower','linear drain cover','wall hung WC','brush holder','freestanding bathtub'])assert.ok(model.room.getObjectByName(name),name);
  const obstacles=['floating oak vanity','freestanding bathtub','wall hung WC','shower glass','shower glass return'].map(name=>new Box3().setFromObject(model.room.getObjectByName(name)).expandByScalar(.1));
  for(let step=0;step<=500;step++){
    const point=new Vector3(...cameraPose(step/500).position);
    obstacles.forEach(bounds=>assert.equal(bounds.containsPoint(point),false));
  }
  model.dispose();
});
