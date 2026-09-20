(()=>{
'use strict';
if(window.__AURON_EMERGENCY__)return;
window.__AURON_EMERGENCY__=true;

const css=`
.emergency-center{margin:0 0 18px}
.emergency-alert{padding:14px;border:1px solid rgba(255,70,90,.42);border-radius:15px;background:linear-gradient(135deg,rgba(255,50,75,.12),rgba(40,10,18,.72));box-shadow:0 0 24px rgba(255,30,55,.12),inset 0 0 18px rgba(255,80,100,.04);color:#e9a5af;font-size:12px;line-height:1.55}
.emergency-title{display:flex;align-items:center;gap:9px;color:#ff6478;font-weight:800;letter-spacing:.06em;margin-bottom:6px}
.emergency-title svg{filter:drop-shadow(0 0 8px rgba(255,70,90,.8))}
.emergency-open{position:relative;overflow:hidden;width:100%;margin-top:12px;padding:14px 16px;border:1px solid #ff5268;border-radius:13px;background:linear-gradient(135deg,rgba(255,45,70,.22),rgba(65,10,20,.9));color:#fff;font:800 12px var(--mono);letter-spacing:.08em;cursor:pointer;box-shadow:0 0 16px rgba(255,40,65,.25),inset 0 0 20px rgba(255,80,100,.06);animation:avEmergencyPulse 2s ease-in-out infinite}
.emergency-open:before{content:'';position:absolute;top:0;bottom:0;width:45%;left:-60%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);transform:skewX(-18deg);animation:avEmergencyScan 2.8s linear infinite}
.emergency-open:hover{filter:brightness(1.12);box-shadow:0 0 28px rgba(255,40,65,.45),inset 0 0 24px rgba(255,80,100,.1)}
.emergency-modal{max-width:520px!important;border:1px solid rgba(255,70,90,.5);box-shadow:0 0 45px rgba(255,25,50,.2),0 25px 70px rgba(0,0,0,.55)}
.emergency-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:14px}
.emergency-card{position:relative;overflow:hidden;min-height:92px;padding:14px;border:1px solid rgba(255,82,105,.4);border-radius:15px;background:linear-gradient(145deg,rgba(255,72,95,.13),rgba(48,13,23,.8));color:#ffc1cb;text-align:left;cursor:pointer;box-shadow:0 0 18px rgba(255,30,55,.1),inset 0 0 15px rgba(255,90,110,.03);transition:.16s}
.emergency-card:before{content:'';position:absolute;inset:0;background:linear-gradient(105deg,transparent,rgba(255,100,120,.13),transparent);transform:translateX(-115%);animation:avEmergencyScan 3.3s linear infinite;pointer-events:none}
.emergency-card:hover{transform:translateY(-2px);border-color:#ff6478;box-shadow:0 0 30px rgba(255,30,55,.25),0 10px 25px -15px rgba(255,30,55,.65)}
.emergency-card:active{transform:scale(.98)}
.emergency-card .ec-icon{color:#ff5c72;font-size:18px;margin-bottom:9px;filter:drop-shadow(0 0 7px rgba(255,80,100,.75))}
.emergency-card b{display:block;color:#fff;font-size:12px;margin-bottom:4px}
.emergency-card span{display:block;color:#d69aa4;font-size:10px;line-height:1.4}
.emergency-card.wide{grid-column:1/-1;min-height:74px}
.emergency-status{display:flex;align-items:center;gap:8px;margin-top:12px;padding:9px 11px;border-radius:11px;border:1px solid rgba(255,75,95,.2);background:rgba(255,60,80,.05);color:#d79da6;font:10px var(--mono)}
.emergency-led{width:7px;height:7px;border-radius:50%;background:#ff5268;box-shadow:0 0 10px #ff5268;animation:avEmergencyBlink 1.15s ease-in-out infinite}
@keyframes avEmergencyPulse{0%,100%{box-shadow:0 0 16px rgba(255,40,65,.22),inset 0 0 20px rgba(255,80,100,.05)}50%{box-shadow:0 0 32px rgba(255,40,65,.45),inset 0 0 25px rgba(255,80,100,.09)}}
@keyframes avEmergencyScan{0%{transform:translateX(0)}55%,100%{transform:translateX(360%)}}
@keyframes avEmergencyBlink{0%,100%{opacity:1;box-shadow:0 0 10px #ff5268}50%{opacity:.3;box-shadow:0 0 2px #ff5268}}
@media(max-width:380px){.emergency-grid{grid-template-columns:1fr}.emergency-card.wide{grid-column:auto}}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

function emergencyLock(reason){
  try{navigator.clipboard?.writeText('').catch(()=>{});}catch(e){}
  if(window.AV?.state?.session){
    AV.state.session.unlocked=false;
    AV.state.session.vaultKey=null;
    AV.state.session.entries=[];
    AV.state.session.notes=[];
    AV.state.session.folders=[];
    AV.state.session.trash={notes:[],entries:[]};
  }
  try{window.notify?.('Auron Vault — NOTFALL',reason,'emergency-'+Date.now());}catch(e){}
  try{window.goTo('login');}catch(e){}
  try{window.toast(reason,'danger');}catch(e){}
}
function emergencyWipe(){
  if(!confirm('WARNUNG: ALLE lokalen Auron-Vault-Daten auf diesem Gerät werden gelöscht. Dieser Vorgang kann nicht rückgängig gemacht werden. Fortfahren?'))return;
  try{navigator.clipboard?.writeText('').catch(()=>{});}catch(e){}
  try{AV.store.wipeAll();}catch(e){}
  if(window.AV?.state)AV.state.session={unlocked:false,vaultKey:null,entries:[],notes:[],folders:[],trash:{notes:[],entries:[]},failedAttempts:0,recoveryLockActive:false};
  try{window.notify?.('Auron Vault — NOTFALL','Lokale Vault-Daten wurden gelöscht.','emergency-wipe-'+Date.now());}catch(e){}
  try{window.goTo('welcome');}catch(e){}
  try{window.toast('Lokale Vault-Daten gelöscht','danger');}catch(e){}
}
function openEmergencyCenter(){
  const overlay=document.createElement('div');overlay.className='overlay';
  const sheet=document.createElement('div');sheet.className='sheet emergency-modal';
  const h=document.createElement('div');h.style.cssText='display:flex;align-items:center;justify-content:space-between;margin-bottom:6px';
  const title=document.createElement('h3');title.style.cssText='font-size:18px;color:#ff6478';title.textContent='NOTFALL-KONTROLLZENTRUM';
  const close=document.createElement('button');close.className='btn btn-icon btn-secondary';close.innerHTML=window.svgIcon?.('x',16)||'×';close.onclick=()=>overlay.remove();
  h.append(title,close);sheet.appendChild(h);
  const p=document.createElement('p');p.style.cssText='font-size:11px;color:var(--text-2);line-height:1.5;margin-bottom:12px';p.textContent='Mehrere unabhängige Sofortmaßnahmen. Die meisten verwerfen nur die laufende Sitzung; der Datenwipe löscht den lokalen Tresor.';
  sheet.appendChild(p);
  const grid=document.createElement('div');grid.className='emergency-grid';
  const add=(icon,name,desc,fn,wide=false)=>{
    const b=document.createElement('button');b.className='emergency-card'+(wide?' wide':'');
    b.innerHTML='<div class="ec-icon">'+(window.svgIcon?.(icon,18)||'')+'</div><b>'+name+'</b><span>'+desc+'</span>';
    b.onclick=fn;grid.appendChild(b);
  };
  add('lock','SOFORTSPERRE','Schlüssel verwerfen und Sitzung schließen',()=>emergencyLock('PANIKSPERRE aktiviert — Tresor gesperrt'));
  add('zap','PANIKRELOAD','Sperren und Anwendung sofort neu laden',()=>{emergencyLock('Panik-Sperre aktiviert — Anwendung wird neu geladen');setTimeout(()=>location.reload(),180)});
  add('shield','RAM-ABBRUCH','Entschlüsselte Sitzungsdaten aus dem RAM verwerfen',()=>emergencyLock('Sitzung sicher beendet'));
  add('copy','CLIPBOARD WIPE','Zwischenablage sofort leeren',()=>{try{navigator.clipboard?.writeText('').then(()=>toast('Zwischenablage geleert','danger')).catch(()=>toast('Zwischenablage konnte nicht geleert werden','danger'));}catch(e){toast('Zwischenablage konnte nicht geleert werden','danger')}});
  add('alertTriangle','SICHERHEITSALARM','Sperren und sichtbare Systembenachrichtigung auslösen',()=>emergencyLock('Sicherheitsalarm — Sitzung wurde beendet'));
  add('eyeOff','VAULT HIDE','Tresor ausblenden und zur Sperrseite wechseln',()=>emergencyLock('Tresor ausgeblendet'));
  add('refresh','RELOAD LOCK','Sperren und Anwendung neu starten',()=>{emergencyLock('Anwendung wird neu gestartet');setTimeout(()=>location.reload(),180)});
  add('trash','LOKALE DATEN LÖSCHEN','ALLE lokalen Vault-Daten unwiderruflich löschen',emergencyWipe,true);
  sheet.appendChild(grid);
  const status=document.createElement('div');status.className='emergency-status';status.innerHTML='<span class="emergency-led"></span><span>NOTFALLSYSTEM BEREIT · lokale Maßnahmen · keine Serveraktion</span>';sheet.appendChild(status);
  overlay.appendChild(sheet);overlay.addEventListener('click',e=>{if(e.target===overlay)overlay.remove()});document.body.appendChild(overlay);
}

function inject(){
  const titles=[...document.querySelectorAll('.section-title')];
  const target=titles.find(x=>x.textContent.trim()==='Notfallbereich');
  if(!target||document.querySelector('.emergency-center'))return;
  const box=document.createElement('div');box.className='emergency-center';
  box.innerHTML='<div class="emergency-alert"><div class="emergency-title">'+(window.svgIcon?.('alertTriangle',16)||'')+' NOTFALL-KONTROLLZENTRUM</div><div>Mehrere rote Sofortmechanismen für den lokalen Tresor. Sperren und RAM-Abbruch erhalten die verschlüsselten Daten; nur der Datenwipe löscht den lokalen Speicher.</div><button class="emergency-open">⚠ NOTFALL-ZENTRALE ÖFFNEN</button></div>';
  box.querySelector('button').onclick=openEmergencyCenter;
  target.parentNode.insertBefore(box,target);
}
const observer=new MutationObserver(inject);
observer.observe(document.body,{childList:true,subtree:true});
setTimeout(inject,250);
})();