/* GOODTAB isolated hero study — original Three.js geometry and scene authored for this prototype.
 * Three.js r160 is bundled locally in prototype/vendor/three.min.js (MIT license notice in bundle).
 */
(() => {
  const canvas = document.querySelector("#scene");
  const loading = document.querySelector("#loading");
  const error = document.querySelector("#scene-error");
  const replay = document.querySelector(".replay");
  if (!canvas || !window.THREE) { if (error) error.hidden = false; if (loading) loading.hidden = true; return; }

  const THREE = window.THREE;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 100);
  camera.position.set(0, 7.8, 22.5);
  camera.lookAt(0, 0.15, 0);

  const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true, powerPreference:"high-performance"});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.13;

  scene.add(new THREE.HemisphereLight(0xfaf6e8, 0x69685a, 2.0));
  const keyLight = new THREE.DirectionalLight(0xfff7dc, 3.2);
  keyLight.position.set(-5, 12, 10); keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1536,1536);
  keyLight.shadow.camera.left=-11; keyLight.shadow.camera.right=11; keyLight.shadow.camera.top=11; keyLight.shadow.camera.bottom=-11;
  keyLight.shadow.bias=-0.00035;
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(0xc9ff32, 2.6); rimLight.position.set(7,4,-8); scene.add(rimLight);
  const fillLight = new THREE.PointLight(0xdce2ff, 30, 18); fillLight.position.set(-7,3,5); scene.add(fillLight);

  const silver = new THREE.MeshStandardMaterial({color:0xb9bdba,metalness:.88,roughness:.24});
  const silverLight = new THREE.MeshStandardMaterial({color:0xe0e1dc,metalness:.78,roughness:.2});
  const dark = new THREE.MeshStandardMaterial({color:0x080a0b,metalness:.45,roughness:.27});
  const keyMat = new THREE.MeshStandardMaterial({color:0x202322,metalness:.25,roughness:.42});
  const glass = new THREE.MeshPhysicalMaterial({color:0x111315,metalness:.24,roughness:.09,clearcoat:1,clearcoatRoughness:.07});
  const lime = 0xc9ff32;

  function roundedShape(w,h,r) {
    const s = new THREE.Shape();
    const x=-w/2,y=-h/2;
    s.moveTo(x+r,y); s.lineTo(x+w-r,y); s.quadraticCurveTo(x+w,y,x+w,y+r);
    s.lineTo(x+w,y+h-r); s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
    s.lineTo(x+r,y+h); s.quadraticCurveTo(x,y+h,x,y+h-r);
    s.lineTo(x,y+r); s.quadraticCurveTo(x,y,x+r,y); return s;
  }
  function roundedPlate(w,h,d,r,material,bevel=.035) {
    const g=new THREE.ExtrudeGeometry(roundedShape(w,h,r),{depth:d,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:bevel,bevelThickness:bevel,curveSegments:8});
    g.translate(0,0,-d/2);
    const m=new THREE.Mesh(g,material); m.castShadow=true; m.receiveShadow=true; return m;
  }
  function makeCanvasTexture(draw,w=1280,h=800) {
    const c=document.createElement("canvas"); c.width=w;c.height=h;
    const ctx=c.getContext("2d"); draw(ctx,w,h);
    const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=renderer.capabilities.getMaxAnisotropy();return t;
  }
  function screenArt(ctx,w,h) {
    ctx.fillStyle="#f7f5ec";ctx.fillRect(0,0,w,h);
    ctx.fillStyle="#131513";ctx.fillRect(0,0,w,75);
    ctx.fillStyle="#f7f5ec";ctx.font="800 28px Manrope,Arial";ctx.fillText("GOODTAB",45,48);
    ctx.font="500 17px Manrope,Arial";ctx.fillText("Work      Services      About      Contact",w*.47,46);
    ctx.fillStyle="#c9ff32";ctx.beginPath();ctx.roundRect(w-175,18,130,38,20);ctx.fill();
    ctx.fillStyle="#111";ctx.font="700 16px Manrope,Arial";ctx.fillText("LET’S TALK  ↗",w-155,43);
    ctx.fillStyle="#151716";ctx.font="800 70px Manrope,Arial";ctx.fillText("Websites",48,190);ctx.fillText("that get your",48,270);
    ctx.fillStyle="#9ed900";ctx.fillText("business.",48,350);
    ctx.fillStyle="#4c4e48";ctx.font="20px Manrope,Arial";ctx.fillText("Distinctive digital experiences, built",50,408);ctx.fillText("for ambitious businesses.",50,438);
    ctx.fillStyle="#111";ctx.beginPath();ctx.roundRect(48,486,170,48,24);ctx.fill();ctx.fillStyle="#f8f7ef";ctx.font="600 15px Manrope,Arial";ctx.fillText("Explore our work  →",68,516);
    const gx=470,gy=112,gw=w-520,gh=560;
    const sky=ctx.createLinearGradient(gx,gy,gx,gy+gh);sky.addColorStop(0,"#b9c7c4");sky.addColorStop(.48,"#e4c5a0");sky.addColorStop(1,"#36463d");
    ctx.fillStyle=sky;ctx.beginPath();ctx.roundRect(gx,gy,gw,gh,8);ctx.fill();
    ctx.fillStyle="#f3d7a4";ctx.beginPath();ctx.arc(gx+gw*.74,gy+gh*.28,70,0,Math.PI*2);ctx.fill();
    ctx.fillStyle="#252c25";ctx.beginPath();ctx.moveTo(gx,gy+gh*.72);ctx.quadraticCurveTo(gx+gw*.18,gy+gh*.5,gx+gw*.38,gy+gh*.72);ctx.lineTo(gx+gw*.42,gy+gh);ctx.lineTo(gx,gy+gh);ctx.fill();
    ctx.fillStyle="#202822";ctx.beginPath();ctx.moveTo(gx+gw*.55,gy+gh*.63);ctx.quadraticCurveTo(gx+gw*.72,gy+gh*.38,gx+gw,gy+gh*.62);ctx.lineTo(gx+gw,gy+gh);ctx.lineTo(gx+gw*.5,gy+gh);ctx.fill();
    // Palm silhouette for a composed editorial image, generated locally (no remote asset dependency).
    ctx.strokeStyle="#25251e";ctx.lineWidth=13;ctx.beginPath();ctx.moveTo(gx+gw*.73,gy+gh*.69);ctx.quadraticCurveTo(gx+gw*.71,gy+gh*.46,gx+gw*.69,gy+gh*.23);ctx.stroke();
    ctx.lineWidth=7;for(let a=0;a<8;a++){const ang=-Math.PI+(a/7)*Math.PI;ctx.beginPath();ctx.moveTo(gx+gw*.69,gy+gh*.25);ctx.quadraticCurveTo(gx+gw*(.69+Math.cos(ang)*.11),gy+gh*(.16+Math.sin(ang)*.04),gx+gw*(.69+Math.cos(ang)*.21),gy+gh*(.22+Math.sin(ang)*.13));ctx.stroke();}
    ctx.fillStyle="rgba(0,0,0,.15)";ctx.fillRect(gx,gy+gh*.82,gw,gh*.18);
    ctx.fillStyle="#fff";ctx.font="600 21px Manrope,Arial";ctx.fillText("Modern websites for",gx+26,gy+gh-56);ctx.fillText("ambitious businesses.",gx+26,gy+gh-27);
    ctx.fillStyle="#111";ctx.font="500 14px 'DM Mono',monospace";ctx.fillText("01 / 04",50,h-38);
    ctx.fillStyle="#c9ff32";ctx.fillRect(48,h-21,115,5);
  }
  const websiteTexture=makeCanvasTexture(screenArt,1600,900);

  const device=new THREE.Group();device.position.set(1.7,-.1,0);device.rotation.y=-.13;device.rotation.z=-.018;scene.add(device);
  // Cast shadow on a physically present studio floor.
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(60,60),new THREE.MeshStandardMaterial({color:0xe7e4d8,roughness:.94,metalness:0}));
  floor.rotation.x=-Math.PI/2;floor.position.y=-2.08;floor.receiveShadow=true;scene.add(floor);
  const shadowCanvas=document.createElement("canvas");shadowCanvas.width=512;shadowCanvas.height=512;
  const sh=shadowCanvas.getContext("2d"),grad=sh.createRadialGradient(256,256,20,256,256,250);
  grad.addColorStop(0,"rgba(18,19,16,.54)");grad.addColorStop(.38,"rgba(18,19,16,.28)");grad.addColorStop(1,"rgba(18,19,16,0)");
  sh.fillStyle=grad;sh.fillRect(0,0,512,512);
  const shadowMap=new THREE.CanvasTexture(shadowCanvas);
  const contact=new THREE.Mesh(new THREE.PlaneGeometry(12,7),new THREE.MeshBasicMaterial({map:shadowMap,transparent:true,depthWrite:false,opacity:.7}));
  contact.rotation.x=-Math.PI/2;contact.position.set(1.7,-2.045,.5);scene.add(contact);

  // Metallic unibody deck with softened bevels.
  const deck=roundedPlate(8.9,5.15,.25,.2,silver,.07);deck.rotation.x=-Math.PI/2;deck.position.set(0,-1.56,0.2);device.add(deck);
  const deckTop=new THREE.Mesh(new THREE.PlaneGeometry(8.57,4.92),silverLight);
  deckTop.rotation.x=-Math.PI/2;deckTop.position.set(0,-1.425,.2);deckTop.receiveShadow=true;device.add(deckTop);
  // Keyboard well and subtle inset border.
  const well=new THREE.Mesh(new THREE.BoxGeometry(7.55,.025,2.78),new THREE.MeshStandardMaterial({color:0x777d79,metalness:.72,roughness:.34}));
  well.position.set(0,-1.397,-.48);device.add(well);
  const keyTop=new THREE.MeshStandardMaterial({color:0x343837,metalness:.25,roughness:.36});
  const keyInset=new THREE.MeshStandardMaterial({color:0x141716,metalness:.18,roughness:.32});
  for(let row=0;row<5;row++){
    const count=row===4?13:14;const kw=row===4?.39:.43;const gap=.075;
    const total=count*kw+(count-1)*gap;
    for(let col=0;col<count;col++){
      const x=-total/2+kw/2+col*(kw+gap),z=-1.69+row*.49;
      const key=new THREE.Mesh(new THREE.BoxGeometry(kw,.095,.39),keyTop);key.position.set(x,-1.315,z);key.castShadow=true;device.add(key);
      const cap=new THREE.Mesh(new THREE.BoxGeometry(kw-.06,.025,.32),keyInset);cap.position.set(x,-1.26,z);device.add(cap);
    }
  }
  // Palm-rest / oversized precision trackpad with fine outline.
  const padBorder=new THREE.Mesh(new THREE.BoxGeometry(2.4,.018,1.25),new THREE.MeshStandardMaterial({color:0x9da19c,metalness:.58,roughness:.36}));
  padBorder.position.set(0,-1.388,1.72);device.add(padBorder);
  const pad=new THREE.Mesh(new THREE.BoxGeometry(2.28,.014,1.13),new THREE.MeshStandardMaterial({color:0xc9cbc5,metalness:.5,roughness:.3}));
  pad.position.set(0,-1.376,1.72);device.add(pad);
  // Speaker perforations and visible side ports.
  const holeMat=new THREE.MeshStandardMaterial({color:0x525754,metalness:.45,roughness:.5});
  for(const side of [-1,1]) for(let i=0;i<28;i++){
    const dot=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,.018,8),holeMat);dot.rotation.x=Math.PI/2;dot.position.set(side*3.92,-1.37,-.43+i*.075);device.add(dot);
  }
  for(let i=0;i<3;i++){
    const port=new THREE.Mesh(new THREE.BoxGeometry(.33,.085,.025),dark);port.position.set(-3.2+i*.42,-1.49,2.76);device.add(port);
  }
  const hinge=new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,7.2,32),silver);hinge.rotation.z=Math.PI/2;hinge.position.set(0,-1.35,-2.32);device.add(hinge);

  // Lid rises from the real hinge: alloy rear shell, black glass bezel, screen.
  const lid=new THREE.Group();lid.position.set(0,-1.34,-2.34);device.add(lid);
  const lidBack=roundedPlate(8.55,5.35,.22,.21,silver,.055);lidBack.position.set(0,2.6,-.105);lid.add(lidBack);
  const bezel=roundedPlate(8.25,5.06,.11,.16,dark,.028);bezel.position.set(0,2.63,.055);lid.add(bezel);
  const displayGlass=new THREE.Mesh(new THREE.MeshPhysicalMaterial({color:0x080a0a,metalness:.16,roughness:.12,clearcoat:1}),new THREE.PlaneGeometry(7.88,4.63));
  displayGlass.position.set(0,2.62,.12);lid.add(displayGlass);
  const display=new THREE.Mesh(new THREE.PlaneGeometry(7.82,4.57),new THREE.MeshBasicMaterial({map:websiteTexture,transparent:true,opacity:0,toneMapped:false}));
  display.position.set(0,2.62,.126);lid.add(display);
  // Tiny camera lens and status light.
  const cam=new THREE.Mesh(new THREE.SphereGeometry(.045,16,12),new THREE.MeshPhysicalMaterial({color:0x111923,metalness:.2,roughness:.13,clearcoat:1}));
  cam.position.set(0,5.11,.15);lid.add(cam);

  // Canvas-driven artwork gives each floating panel crisp, locally rendered lettering.
  function panelTexture(kind,w=760,h=500){
    return makeCanvasTexture((ctx,W,H)=>{
      const darkPanel=["STRATEGY","UI COMPONENTS","DEVELOPMENT"].includes(kind);
      const bg=darkPanel?ctx.createLinearGradient(0,0,W,H):ctx.createLinearGradient(0,0,W,H);
      if(darkPanel){bg.addColorStop(0,"#30332f");bg.addColorStop(1,"#111412");}
      else {bg.addColorStop(0,"#fbfaf4");bg.addColorStop(1,"#e9e8de");}
      ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
      const fg=darkPanel?"#f5f3e9":"#181a18",soft=darkPanel?"#c2c4bb":"#65675f";
      ctx.fillStyle="#c9ff32";ctx.font="700 20px 'DM Mono',monospace";ctx.fillText(kind==="UI COMPONENTS"?"":kind.slice(0,2),28,38);
      ctx.fillStyle=fg;ctx.font="700 29px Manrope,Arial";ctx.fillText(kind,kind==="UI COMPONENTS"?26:70,42);
      ctx.strokeStyle=darkPanel?"rgba(255,255,255,.16)":"rgba(15,16,14,.15)";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(25,60);ctx.lineTo(W-25,60);ctx.stroke();
      if(kind==="STRATEGY"){["Research","Positioning","Structure","User flow"].forEach((t,i)=>{ctx.fillStyle="#c9ff32";ctx.beginPath();ctx.arc(42,112+i*74,7,0,7);ctx.fill();ctx.fillStyle=fg;ctx.font="500 24px Manrope,Arial";ctx.fillText(t,66,120+i*74);ctx.strokeStyle="rgba(160,160,150,.27)";ctx.beginPath();ctx.moveTo(65,136+i*74);ctx.lineTo(W-30,136+i*74);ctx.stroke();});}
      else if(kind==="DESIGN"){const g=ctx.createLinearGradient(45,90,W-40,H-50);g.addColorStop(0,"#becbc0");g.addColorStop(.45,"#d7bd9b");g.addColorStop(1,"#444b3e");ctx.fillStyle=g;ctx.fillRect(30,80,W-60,H-110);ctx.fillStyle="#1f2822";ctx.fillRect(W*.52,H*.43,W*.36,H*.35);ctx.fillStyle="rgba(246,229,196,.83)";ctx.beginPath();ctx.arc(W*.76,H*.3,45,0,7);ctx.fill();}
      else if(kind==="DEVELOPMENT"){ctx.fillStyle="#202321";ctx.fillRect(26,82,W-52,H-105);const lines=["<section class='hero'>","  <h1>Websites that get</h1>","  <p>Your business.</p>","  <button>Let's Talk</button>","</section>"];lines.forEach((t,i)=>{ctx.fillStyle=i%2?"#c9ff32":"#e6e8df";ctx.font="20px monospace";ctx.fillText(t,48,128+i*52);});}
      else if(kind==="LAUNCH"){ctx.strokeStyle="#b9ed22";ctx.lineWidth=13;ctx.beginPath();ctx.arc(W*.5,H*.58,82,-Math.PI/2,Math.PI*.98);ctx.stroke();ctx.fillStyle=fg;ctx.font="700 28px Manrope,Arial";ctx.fillText("Launching…",W*.33,H*.87);}
      else if(kind==="UI COMPONENTS"){["Navbar","Hero Section","Image Gallery","Buttons","Cards"].forEach((t,i)=>{ctx.strokeStyle="rgba(245,245,235,.24)";ctx.strokeRect(28,83+i*69,W-56,54);ctx.fillStyle="#c9ff32";ctx.beginPath();ctx.arc(55,110+i*69,10,0,7);ctx.fill();ctx.fillStyle=fg;ctx.font="20px Manrope,Arial";ctx.fillText(t,83,117+i*69);});}
      else if(kind==="IMAGE CARD"){const g=ctx.createLinearGradient(0,85,W,H);g.addColorStop(0,"#9aafa7");g.addColorStop(.5,"#e1c69f");g.addColorStop(1,"#3c4e42");ctx.fillStyle=g;ctx.fillRect(25,84,W-50,H-110);ctx.fillStyle="#252a22";ctx.beginPath();ctx.moveTo(25,H*.72);ctx.quadraticCurveTo(W*.45,H*.4,W-25,H*.72);ctx.lineTo(W-25,H-25);ctx.lineTo(25,H-25);ctx.fill();}
      ctx.fillStyle=soft;ctx.font="500 16px 'DM Mono',monospace";ctx.fillText("GOODTAB / DIGITAL STUDIO",28,H-17);
    },w,h);
  }
  const panelDefs=[
    {kind:"STRATEGY",w:2.35,h:1.7,start:[-4.6,3.6,-.5],rot:[-.08,.14,-.12],target:[-2.15,3.28],delay:.55},
    {kind:"DESIGN",w:2.75,h:1.8,start:[-.6,5.2,-1.2],rot:[-.08,-.12,.08],target:[1.5,3.4],delay:1.05},
    {kind:"DEVELOPMENT",w:2.7,h:1.8,start:[5.65,3.4,-.3],rot:[.06,-.15,.09],target:[2.45,2.7],delay:1.55},
    {kind:"LAUNCH",w:1.65,h:2.2,start:[6.25,.35,.4],rot:[-.04,.12,-.08],target:[2.55,1.15],delay:2.05},
    {kind:"UI COMPONENTS",w:2.25,h:1.9,start:[-5.0,.6,1.1],rot:[.04,.13,.1],target:[-2.5,1.15],delay:2.55},
    {kind:"IMAGE CARD",w:1.45,h:1.75,start:[-3.8,-2.2,2.5],rot:[-.1,.08,-.1],target:[-.15,2.0],delay:3.05}
  ];
  const panels=[];
  panelDefs.forEach((d,index)=>{
    const root=new THREE.Group();
    const plate=roundedPlate(d.w,d.h,.1,.1,new THREE.MeshStandardMaterial({color:0xffffff,metalness:.22,roughness:.31,transparent:true,opacity:.99}),.025);
    root.add(plate);
    const tex=panelTexture(d.kind);
    const face=new THREE.Mesh(new THREE.PlaneGeometry(d.w-.1,d.h-.1),new THREE.MeshBasicMaterial({map:tex,transparent:true,toneMapped:false,side:THREE.DoubleSide}));
    face.position.z=.058;root.add(face);
    const rim=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(d.w,d.h,.11)),new THREE.LineBasicMaterial({color:0x96988e,transparent:true,opacity:.48}));
    root.add(rim);
    root.position.set(...d.start);root.rotation.set(...d.rot);scene.add(root);
    panels.push({root,face,plate,rim,def:d,index,from:new THREE.Vector3(...d.start),fromRot:new THREE.Euler(...d.rot),target:new THREE.Vector3(...d.target,0.19),done:false});
  });

  // Luminous curved paths anchor each floating module to its exact screen destination.
  const trails=[];
  panels.forEach((p,i)=>{
    const destLocal=new THREE.Vector3(p.def.target[0],p.def.target[1],.18);
    const dest=lid.localToWorld(destLocal.clone());
    const from=p.from.clone();from.x+=device.position.x;
    const mid1=from.clone().lerp(dest,.35);mid1.y+=.9+(i%2)*.35;mid1.z+=.35;
    const mid2=from.clone().lerp(dest,.72);mid2.y+=.3;mid2.z+=.8;
    const curve=new THREE.CatmullRomCurve3([from,mid1,mid2,dest]);
    const halo=new THREE.Mesh(new THREE.TubeGeometry(curve,64,.027,8,false),new THREE.MeshBasicMaterial({color:lime,transparent:true,opacity:.15,blending:THREE.AdditiveBlending,depthWrite:false}));
    const core=new THREE.Mesh(new THREE.TubeGeometry(curve,64,.009,6,false),new THREE.MeshBasicMaterial({color:0xf0ff9a,transparent:true,opacity:.73,blending:THREE.AdditiveBlending,depthWrite:false}));
    scene.add(halo,core);
    const bead=new THREE.Mesh(new THREE.SphereGeometry(.075,12,10),new THREE.MeshBasicMaterial({color:0xf5ffbf,blending:THREE.AdditiveBlending}));
    scene.add(bead);trails.push({curve,halo,core,bead,index:i});
  });

  // Tiny luminous flecks add volume without competing with the panels.
  const dust=new THREE.Group();scene.add(dust);
  for(let i=0;i<42;i++){
    const dot=new THREE.Mesh(new THREE.SphereGeometry(.018+(i%3)*.009,8,6),new THREE.MeshBasicMaterial({color:i%4===0?lime:0xffffff,transparent:true,opacity:.48}));
    dot.position.set(-5+Math.random()*12,-1.8+Math.random()*7,-2+Math.random()*4);dust.add(dot);
  }

  let started=performance.now(),last=started,elapsed=0,frameCount=0;
  const duration=6.1;
  const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
  const smooth=(a,b,t)=>{const x=THREE.MathUtils.clamp((t-a)/(b-a),0,1);return x*x*(3-2*x);};
  function fit(){
    const rect=canvas.getBoundingClientRect();if(!rect.width||!rect.height)return;
    renderer.setSize(rect.width,rect.height,false);
    camera.aspect=rect.width/rect.height;
    if(window.matchMedia("(max-width:700px)").matches){camera.position.set(0,7.2,23.5);camera.lookAt(1.4,1.0,0);device.position.set(.65,-.35,0);}
    else {camera.position.set(0,7.8,22.5);camera.lookAt(0,.15,0);device.position.set(1.7,-.1,0);}
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(fit).observe(canvas);window.addEventListener("orientationchange",fit);fit();

  function frame(now){
    requestAnimationFrame(frame);
    const dt=Math.min(.05,(now-last)/1000);last=now;elapsed=(now-started)/1000;
    const mobile=window.matchMedia("(max-width:700px)").matches;
    device.rotation.y=-.13+Math.sin(now*.00032)*.018;device.rotation.z=-.018+Math.sin(now*.00025)*.008;
    lid.rotation.x=.015+Math.sin(now*.0003)*.008;
    const travelDuration=1.55;
    panels.forEach((p,i)=>{
      const d=p.def,localT=THREE.MathUtils.clamp((elapsed-d.delay)/travelDuration,0,1),e=ease(localT);
      const targetWorld=lid.localToWorld(new THREE.Vector3(d.target[0],d.target[1],.22));
      const startWorld=p.from.clone();startWorld.x+=device.position.x;
      p.root.position.copy(startWorld).lerp(targetWorld,e);
      const aligned=lid.rotation.clone();aligned.z+=((i%2)?-.03:.03)*(1-e);
      p.root.rotation.set(p.fromRot.x*(1-e),p.fromRot.y*(1-e),aligned.z);
      const scale=1-e*.55;p.root.scale.setScalar(scale);
      const fade=smooth(d.delay+travelDuration-.12,d.delay+travelDuration+.3,elapsed);
      p.root.visible=fade<.999;
      p.plate.material.opacity=1-fade;
      p.face.material.opacity=1-fade;
      p.rim.material.opacity=.48*(1-fade);
    });
    const assembled=smooth(4.6,5.65,elapsed);
    display.material.opacity=assembled;
    display.visible=assembled>0;
    trails.forEach(t=>{
      const pass=(elapsed*.2+t.index*.17)%1;
      const pt=t.curve.getPointAt(pass);t.bead.position.copy(pt);
      const active=elapsed>panelDefs[t.index].delay?1:.38;
      t.core.material.opacity=active*(.42+.3*Math.sin(now*.004+t.index));
      t.halo.material.opacity=active*.14;
    });
    dust.rotation.y+=dt*.015;
    if(elapsed>duration+1.3 && frameCount>1){/* settle into the completed device; no looping restart */}
    frameCount++;
    if(loading && frameCount>3)loading.hidden=true;
    renderer.render(scene,camera);
  }
  function restart(){started=performance.now();elapsed=0;panels.forEach(p=>p.root.visible=true);}
  replay?.addEventListener("click",restart);
  requestAnimationFrame(frame);
  window.addEventListener("error",event=>{if(event.target===canvas||/THREE|WebGL/i.test(event.message||"")){error.hidden=false;}},true);
  if(!renderer.capabilities.isWebGL2 && !renderer.capabilities.isWebGL1){error.hidden=false;}
})();
