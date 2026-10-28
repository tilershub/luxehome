import { CHAPTER_STOPS, chapterAt, clamp01, scrollProgress, shouldLoadRoom } from './camera-path.mjs';

type RoomRenderer = {render:(progress:number)=>void;resize:()=>void;dispose:()=>void};
type Connection = EventTarget & {saveData?:boolean;effectiveType?:string};
export function initBathroomJourney(tour: HTMLElement) {
  const stage=tour.querySelector<HTMLElement>('.tour-stage')!;
  const roomHost=tour.querySelector<HTMLElement>('[data-room]')!;
  const scenes=[...tour.querySelectorAll<HTMLElement>('[data-scene]')];
  const buttons=[...tour.querySelectorAll<HTMLButtonElement>('[data-scene-button]')];
  const motion=tour.querySelector<HTMLButtonElement>('[data-motion]')!;
  const roomToggle=tour.querySelector<HTMLButtonElement>('[data-room-toggle]')!;
  const status=tour.querySelector<HTMLElement>('[data-tour-status]')!;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const connection=(navigator as Navigator & {connection?:Connection}).connection;
  const memory=(navigator as Navigator & {deviceMemory?:number}).deviceMemory;
  const listeners=new AbortController();
  let room:RoomRenderer|null=null, roomLoading=false, roomFailed=false, stills=false;
  let paused=reduced.matches, active=0, frame=0, target=0, current=0, lastTime=0;
  let visible=true, destroyed=false, stickyTop=76, loadTimer=0;
  let lastRendered=-1;
  const allowRoom=()=>shouldLoadRoom({reducedMotion:reduced.matches,saveData:connection?.saveData,effectiveType:connection?.effectiveType,deviceMemory:memory});
  const poster=(index:number)=>{
    const img=scenes[index]?.querySelector<HTMLImageElement>('[data-poster]');
    if(img&&!img.hasAttribute('src')){img.srcset=img.dataset.srcset!;img.src=img.dataset.src!;}
    return img;
  };
  const show=(index:number)=>{
    // Fetch the requested still even if WebGL has failed or is intentionally off.
    poster(index);
    active=index;
    tour.dataset.chapter=String(index);
    scenes.forEach((scene,i)=>{
      scene.classList.toggle('is-active',i===index);
      scene.setAttribute('aria-hidden',String(i!==index));scene.inert=i!==index;
      if(i!==index)scene.querySelector('details')!.open=false;
    });
    // Only prepare the next still on an unconstrained connection. The entrance
    // stays the only initial image request; data-saving users load on demand.
    if(!connection?.saveData && !['slow-2g','2g','3g'].includes(connection?.effectiveType||'') && index+1<scenes.length){
      const next=index+1;
      const image=poster(index);
      void image?.decode().then(()=>{if(!destroyed&&active===index&&!room)poster(next);}).catch(()=>{});
    }
    buttons.forEach((button,i)=>i===index?button.setAttribute('aria-current','step'):button.removeAttribute('aria-current'));
  };
  function releaseRoom(){room?.dispose();room=null;lastRendered=-1;tour.classList.remove('has-room');}
  function failRoom(){
    roomFailed=true;releaseRoom();poster(active);
    roomToggle.hidden=true;
    status.textContent='Showing still views of the bathroom.';
  }
  async function loadRoom(explicit=false){
    if(room||roomLoading||roomFailed||destroyed||!visible||(!explicit&&(stills||paused||!allowRoom())))return;
    roomLoading=true;
    try{
      const {createRoomRenderer}=await import('./renderer.mjs');
      if(destroyed||(!explicit&&(paused||stills||!allowRoom())))return;
      const loaded:RoomRenderer=await createRoomRenderer(roomHost,{onFailure:()=>queueMicrotask(failRoom)});
      if(destroyed||roomFailed||(!explicit&&(paused||stills||!allowRoom()))){loaded.dispose();return;}
      room=loaded;room.render(current);lastRendered=current;
      tour.classList.add('has-room');roomToggle.hidden=false;roomToggle.textContent='Use still views';
    }catch{failRoom();}finally{roomLoading=false;}
  }
  function readProgress(){
    return scrollProgress(tour.getBoundingClientRect().top,tour.offsetHeight,stage.offsetHeight,paused?0:stickyTop);
  }
  const reading=()=>scenes[active].querySelector('details[open]')||scenes[active].contains(document.activeElement);
  function tick(time:number){
    frame=0;
    if(destroyed||!visible||document.hidden)return;
    const dt=Math.min(50,time-lastTime||16);lastTime=time;
    if(!paused&&!reading()){
      current+= (target-current)*(1-Math.exp(-dt/100));
      if(Math.abs(target-current)<.0004)current=target;
      const next=chapterAt(current);if(next!==active)show(next);
    }
    if(room&&!stills&&lastRendered!==current){room.render(current);lastRendered=current;}
    if(!paused&&!reading()&&Math.abs(target-current)>.0004)requestFrame();
  }
  function requestFrame(){if(!frame&&visible&&!document.hidden)frame=requestAnimationFrame(tick);}
  function onScroll(){if(!paused){target=readProgress();requestFrame();}}
  function resize(){
    const nav=document.querySelector<HTMLElement>('.lx-nav');
    stickyTop=nav?.getBoundingClientRect().height||0;
    tour.style.setProperty('--nav-height',`${stickyTop}px`);
    room?.resize();lastRendered=-1;onScroll();requestFrame();
  }
  function setPaused(value:boolean){
    const before=tour.getBoundingClientRect().top;
    paused=value;tour.classList.toggle('is-paused',paused);
    motion.textContent=paused?'Enable motion':'Pause motion';motion.setAttribute('aria-pressed',String(paused));
    // Preserve the visible stage when its long scroll track collapses/expands.
    if(visible&&before<=stickyTop){
      const start=window.scrollY+tour.getBoundingClientRect().top-stickyTop;
      const distance=Math.max(1,tour.offsetHeight-stage.offsetHeight);
      window.scrollTo({top:Math.max(0,start+(paused?0:current*distance)),behavior:'instant'});
    }
    if(paused){target=current;if(frame){cancelAnimationFrame(frame);frame=0;}}
    else{onScroll();void loadRoom();}
  }
  buttons.forEach((button,i)=>button.addEventListener('click',()=>{
    scenes.forEach(scene=>scene.querySelector('details')!.open=false);
    show(i);target=CHAPTER_STOPS[i];
    if(paused){current=target;lastRendered=-1;requestFrame();}
    else{
      const start=window.scrollY+tour.getBoundingClientRect().top-stickyTop;
      window.scrollTo({top:Math.max(0,start+target*Math.max(1,tour.offsetHeight-stage.offsetHeight)),behavior:'instant'});
      requestFrame();
    }
  },{signal:listeners.signal}));
  scenes.forEach(scene=>scene.querySelector('details')!.addEventListener('toggle',()=>{
    if(!scene.querySelector('details')!.open)onScroll();
  },{signal:listeners.signal}));
  motion.addEventListener('click',()=>setPaused(!paused),{signal:listeners.signal});
  roomToggle.addEventListener('click',()=>{
    stills=!stills;
    if(stills){tour.classList.remove('has-room');poster(active);roomToggle.textContent='Explore the room';}
    else if(room){tour.classList.add('has-room');roomToggle.textContent='Use still views';lastRendered=-1;requestFrame();}
    else{void loadRoom(true);}
  },{signal:listeners.signal});
  const preferencesChanged=()=>{
    if(!allowRoom()){releaseRoom();roomToggle.hidden=true;}
    if(reduced.matches)setPaused(true);
    else if(!paused)void loadRoom();
  };
  reduced.addEventListener('change',preferencesChanged,{signal:listeners.signal});
  connection?.addEventListener('change',preferencesChanged,{signal:listeners.signal});
  window.addEventListener('scroll',onScroll,{passive:true,signal:listeners.signal});
  window.addEventListener('resize',resize,{passive:true,signal:listeners.signal});
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){cancelAnimationFrame(frame);frame=0;}else{lastTime=0;onScroll();}
  },{signal:listeners.signal});
  tour.querySelector('[data-skip-tour]')?.addEventListener('click',()=>{
    const destination=document.getElementById('home-projects');
    destination?.focus({preventScroll:true});
  },{signal:listeners.signal});
  const visibility=new IntersectionObserver(entries=>{
    visible=entries[0].isIntersecting;
    if(visible){onScroll();if(!loadTimer)void loadRoom();}
    else{cancelAnimationFrame(frame);frame=0;}
  });
  // Keep the first paint cheap; defer the shared room until the entrance is decoded.
  loadTimer=window.setTimeout(async()=>{
    try{await poster(0)?.decode();}catch{/* The still can fail independently of WebGL. */}
    loadTimer=0;void loadRoom();
  },900);
  tour.classList.add('is-enhanced');show(0);resize();
  if(paused)setPaused(true);
  visibility.observe(tour);
  const observer=new ResizeObserver(resize);observer.observe(stage);
  const nav=document.querySelector('.lx-nav');if(nav)observer.observe(nav);
  function cleanup(){
    if(destroyed)return;destroyed=true;listeners.abort();cancelAnimationFrame(frame);clearTimeout(loadTimer);
    visibility.disconnect();observer.disconnect();releaseRoom();
  }
  document.addEventListener('astro:before-swap',cleanup,{once:true});
  // Persisted pages retain a paused renderer; full navigation releases GPU resources.
  window.addEventListener('pagehide',event=>{if(!event.persisted)cleanup();else{cancelAnimationFrame(frame);frame=0;}},{signal:listeners.signal});
  window.addEventListener('pageshow',()=>{lastTime=0;onScroll();},{signal:listeners.signal});
}
