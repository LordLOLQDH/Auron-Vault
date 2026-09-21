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
.profile-avatar{width:58px;height:58px;border-radius:17px;overflow:hidden;display:flex;align-items:center;justify-content:center;background:linear-gradient(145deg,var(--accent),var(--violet));color:var(--bg-0);font-weight:800;font-size:20px;box-shadow:0 0 0 1px rgba(255,255,255,.08) inset,0 8px 24px -12px rgba(94,234,212,.55);flex-shrink:0}
.profile-avatar img{width:100%;height:100%;object-fit:cover;display:block}
.profile-panel{display:flex;align-items:center;gap:14px;padding:16px;background:var(--bg-2);border:1px solid var(--line);border-radius:18px}
.profile-panel .profile-info{min-width:0;flex:1}
.profile-panel .profile-info b{display:block;font-size:15px;margin-bottom:3px}
.profile-panel .profile-info span{display:block;font-size:11px;color:var(--text-2);line-height:1.4}
.profile-actions{display:flex;gap:7px;margin-top:12px}
.profile-actions .btn{flex:1}
.file-drop{border:1px dashed var(--line);background:rgba(94,234,212,.025);border-radius:16px;padding:22px 14px;text-align:center;cursor:pointer;transition:.15s}
.file-drop:hover,.file-drop.drag{border-color:var(--accent);background:rgba(94,234,212,.06);box-shadow:0 0 24px rgba(94,234,212,.08)}
.file-list{display:flex;flex-direction:column;gap:8px;margin-top:12px}
.file-row{display:flex;align-items:center;gap:11px;padding:12px;background:var(--bg-2);border:1px solid var(--line);border-radius:14px}
.file-icon{width:38px;height:38px;border-radius:11px;background:var(--bg-3);display:flex;align-items:center;justify-content:center;color:var(--accent);flex-shrink:0}
.file-main{min-width:0;flex:1}
.file-main b{display:block;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.file-main span{display:block;font-size:10.5px;color:var(--text-2);margin-top:3px}
.file-actions{display:flex;gap:4px}
.file-actions button{width:32px!important;height:32px!important;padding:0!important}
.emergency-tab{color:#ff6478!important}
.emergency-tab.active{color:#fff!important;background:linear-gradient(155deg,#ff5c72,#d43a52)!important}
@keyframes avEmergencyPulse{0%,100%{box-shadow:0 0 16px rgba(255,40,65,.22),inset 0 0 20px rgba(255,80,100,.05)}50%{box-shadow:0 0 32px rgba(255,40,65,.45),inset 0 0 25px rgba(255,80,100,.09)}}
@keyframes avEmergencyScan{0%{transform:translateX(0)}55%,100%{transform:translateX(360%)}}
@keyframes avEmergencyBlink{0%,100%{opacity:1;box-shadow:0 0 10px #ff5268}50%{opacity:.3;box-shadow:0 0 2px #ff5268}}
@media(max-width:380px){.emergency-grid{grid-template-columns:1fr}.emergency-card.wide{grid-column:auto}}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

/* ---------- Existing emergency center ---------- */
function emergencyLock(reason='Notfall-Sperre aktiviert'){
  try{navigator.clipboard?.writeText('').catch(()=>{});}catch(e){}
  if(window.AV?.state?.session){
    AV.state.session.unlocked=false; AV.state.session.vaultKey=null;
    AV.state.session.entries=[]; AV.state.session.notes=[]; AV.state.session.folders=[];
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
  try{localStorage.removeItem('auron_profile_v1');}catch(e){}
  try{indexedDB.deleteDatabase('auron_files_v1');}catch(e){}
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
    b.innerHTML='<div class="ec-icon">'+(window.svgIcon?.(icon,18)||'')+'</div><b>'+name+'</b><span>'+desc+'</span>'; b.onclick=fn;grid.appendChild(b);
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

/* ---------- Profile picture ---------- */
const PROFILE_KEY='auron_profile_v1';
async function saveProfileImage(file){
  if(!file||!file.type.startsWith('image/'))throw new Error('Bitte ein Bild auswählen.');
  if(file.size>2*1024*1024)throw new Error('Profilbilder sind auf 2 MB begrenzt.');
  const data=await file.arrayBuffer();
  const key=AV.state.session.vaultKey;
  if(!key)throw new Error('Tresor ist gesperrt.');
  const aesKey=await crypto.subtle.importKey('raw',key,{name:'AES-GCM'},false,['encrypt','decrypt']);
  const iv=crypto.getRandomValues(new Uint8Array(12));
  const ct=await crypto.subtle.encrypt({name:'AES-GCM',iv},aesKey,data);
  localStorage.setItem(PROFILE_KEY,JSON.stringify({name:file.name,type:file.type,size:file.size,iv:AV.crypto.toB64(iv),data:AV.crypto.toB64(ct)}));
}
async function loadProfileImage(){
  try{
    const raw=localStorage.getItem(PROFILE_KEY);if(!raw||!AV.state.session.vaultKey)return null;
    const x=JSON.parse(raw),key=AV.state.session.vaultKey;
    const aesKey=await crypto.subtle.importKey('raw',key,{name:'AES-GCM'},false,['decrypt']);
    const pt=await crypto.subtle.decrypt({name:'AES-GCM',iv:AV.crypto.fromB64(x.iv)},aesKey,AV.crypto.fromB64(x.data));
    return {type:x.type,name:x.name,url:URL.createObjectURL(new Blob([pt],{type:x.type}))};
  }catch(e){return null}
}
async function profileSheet(){
  const o=document.createElement('div');o.className='overlay';const s=document.createElement('div');s.className='sheet';
  s.appendChild(el('h3',{style:'font-size:18px;margin-bottom:14px'},['Profilbild']));
  const preview=el('div',{class:'profile-avatar',style:'width:96px;height:96px;border-radius:24px;margin:0 auto 16px'},['AV']);
  const existing=await loadProfileImage();if(existing)preview.innerHTML='<img src="'+existing.url+'" alt="Profilbild">';
  s.appendChild(preview);
  const input=el('input',{type:'file',accept:'image/*',style:'display:none'});
  const pick=el('button',{class:'btn btn-primary'},['Neues Profilbild auswählen']);
  pick.onclick=()=>input.click();input.onchange=async()=>{try{await saveProfileImage(input.files[0]);const p=await loadProfileImage();preview.innerHTML=p?'<img src="'+p.url+'" alt="Profilbild">':'AV';toast('Profilbild gespeichert','ok');updateProfileAvatar();}catch(e){toast(e.message,'danger')}};
  s.appendChild(input);s.appendChild(pick);
  const del=el('button',{class:'btn btn-danger-outline',style:'margin-top:9px'},['Profilbild entfernen']);
  del.onclick=()=>{localStorage.removeItem(PROFILE_KEY);preview.textContent='AV';updateProfileAvatar();toast('Profilbild entfernt','ok')};s.appendChild(del);
  s.appendChild(el('p',{style:'font-size:11px;color:var(--text-2);line-height:1.5;margin-top:12px'},['Das Bild wird lokal mit dem aktuellen Tresorschlüssel verschlüsselt gespeichert. Maximal 2 MB.']));
  const close=el('button',{class:'btn btn-ghost',style:'margin:10px auto 0;display:flex'},['Schließen']);close.onclick=()=>o.remove();s.appendChild(close);
  o.appendChild(s);o.addEventListener('click',e=>{if(e.target===o)o.remove()});document.body.appendChild(o);
}
function updateProfileAvatar(){
  const targets=[...document.querySelectorAll('[data-profile-avatar]')];
  targets.forEach(async t=>{const p=await loadProfileImage();t.innerHTML=p?'<img src="'+p.url+'" alt="Profilbild">':'AV';});
}
function profileSection(){
  const box=el('div',{class:'profile-panel'});
  const av=el('div',{class:'profile-avatar','data-profile-avatar':'1'},['AV']);
  box.appendChild(av);
  box.appendChild(el('div',{class:'profile-info'},[el('b',{},['Dein Profilbild']),el('span',{},['Lokales Profilbild · verschlüsselt gespeichert'])]));
  const btn=el('button',{class:'btn btn-secondary btn-sm',style:'width:auto'},['Verwalten']);btn.onclick=profileSheet;box.appendChild(btn);
  setTimeout(updateProfileAvatar,0);return box;
}

/* ---------- Emergency tab ---------- */
function emergencyTabView(){
  const c=el('div',{});c.appendChild(el('h2',{style:'font-size:20px;margin:18px 0 6px;color:var(--danger)'},['Notfall']));
  c.appendChild(el('p',{style:'font-size:13px;color:var(--text-2);margin-bottom:14px'},['Alle Sofortmechanismen an einem eigenen Ort. Rot = Aktion kann sofort ausgeführt werden.']));
  const b=el('button',{class:'emergency-open'},['⚠ NOTFALL-ZENTRALE ÖFFNEN']);b.onclick=openEmergencyCenter;c.appendChild(b);
  c.appendChild(el('div',{class:'section-title',style:'color:var(--danger)'},['Direktaktionen']));
  const grid=el('div',{class:'emergency-grid'});
  const add=(icon,name,desc,fn,wide=false)=>{const x=el('button',{class:'emergency-card'+(wide?' wide':'')});x.innerHTML='<div class="ec-icon">'+svgIcon(icon,18)+'</div><b>'+name+'</b><span>'+desc+'</span>';x.onclick=fn;grid.appendChild(x)};
  add('lock','SOFORTSPERRE','Tresor sperren und Schlüssel aus dem Speicher verwerfen',()=>emergencyLock());
  add('zap','PANIKRELOAD','Sperren und Seite neu laden',()=>{emergencyLock('Panik-Sperre aktiviert');setTimeout(()=>location.reload(),180)});
  add('shield','RAM-ABBRUCH','Entschlüsselte Sitzungsdaten verwerfen',()=>emergencyLock('Sitzung sicher beendet'));
  add('copy','CLIPBOARD WIPE','Zwischenablage leeren',()=>navigator.clipboard?.writeText('').then(()=>toast('Zwischenablage geleert','danger')).catch(()=>toast('Zwischenablage konnte nicht geleert werden','danger')));
  add('alertTriangle','SICHERHEITSALARM','Sperren und Systembenachrichtigung auslösen',()=>emergencyLock('Sicherheitsalarm — Sitzung beendet'));
  add('eyeOff','VAULT HIDE','Tresor sofort ausblenden',()=>emergencyLock('Tresor ausgeblendet'));
  add('refresh','RELOAD LOCK','Sperren und Anwendung neu starten',()=>{emergencyLock('Anwendung wird neu gestartet');setTimeout(()=>location.reload(),180)});
  add('trash','LOKALE DATEN LÖSCHEN','Lokalen Tresor unwiderruflich löschen',emergencyWipe,true);
  c.appendChild(grid);c.appendChild(el('div',{class:'emergency-status'},[el('span',{class:'emergency-led'}),el('span',{},['NOTFALLSYSTEM BEREIT · lokale Maßnahmen'])]));return c;
}

/* ---------- Settings injection ---------- */
function inject(){
  const titles=[...document.querySelectorAll('.section-title')];
  const target=titles.find(x=>x.textContent.trim()==='Notfallbereich');
  if(target&&!document.querySelector('.emergency-center')){
    const box=document.createElement('div');box.className='emergency-center';
    box.innerHTML='<div class="emergency-alert"><div class="emergency-title">'+(window.svgIcon?.('alertTriangle',16)||'')+' NOTFALL-KONTROLLZENTRUM</div><div>Mehrere rote Sofortmechanismen für den lokalen Tresor. Sperren und RAM-Abbruch erhalten die verschlüsselten Daten; nur der Datenwipe löscht den lokalen Speicher.</div><button class="emergency-open">⚠ NOTFALL-ZENTRALE ÖFFNEN</button></div>';
    box.querySelector('button').onclick=openEmergencyCenter;target.parentNode.insertBefore(box,target);
  }
  const settingsTitle=[...document.querySelectorAll('.section-title')].find(x=>x.textContent.trim()==='Sicherheitsmodus');
  if(settingsTitle&&!document.querySelector('.profile-center')){
    const p=document.createElement('div');p.className='profile-center';p.innerHTML='<div class="section-title" style="margin-top:0">Profil</div>';
    p.appendChild(profileSection());settingsTitle.parentNode.insertBefore(p,settingsTitle);
  }
}

/* ---------- Enhanced dashboard/navigation ---------- */
const originalDashboard=AV.views.dashboard;
function tabBarEnhanced(){
  const bar=el('div',{class:'tabbar'}),inner=el('div',{class:'tabbar-inner'});
  const items=[['key','Vault','vault'],['edit','Notizen','notes'],['files','Dateien','files'],['alertTriangle','Notfall','emergency'],['settings','Einstellungen','settings']];
  items.forEach(([icon,label,tab])=>{
    const b=el('button',{class:'tab-btn'+(AV.state.ui.activeTab===tab?' active':'')+(tab==='emergency'?' emergency-tab':'')});
    b.appendChild(el('span',{html:svgIcon(icon,19)}));b.appendChild(el('span',{},[label]));
    b.onclick=()=>{if(tab==='files'){window.location.assign('./files.html');return}AV.state.ui.activeTab=tab;goTo('dashboard')};inner.appendChild(b);
  });bar.appendChild(inner);return bar;
}
AV.views.dashboard=function(){
  const tab=AV.state.ui.activeTab;
  if(!AV.state.session.unlocked){AV.state.route='login';return AV.views.login()}
  if(tab==='emergency'){
    const w=el('div',{style:'display:flex;flex-direction:column;flex:1;min-height:100vh'});w.appendChild(topBar());
    const sc=el('div',{class:'main-scroll'});w.appendChild(sc);w.appendChild(tabBarEnhanced());
    sc.appendChild(emergencyTabView());
    return w;
  }
  const w=originalDashboard();
  const old=w.querySelector('.tabbar');if(old)old.replaceWith(tabBarEnhanced());return w;
};

const originalGoTo=window.goTo;
window.goTo=function(route){
  originalGoTo(route);
};

/* Profile appears in settings after every render. */
const observer=new MutationObserver(()=>inject());
observer.observe(document.body,{childList:true,subtree:true});
setTimeout(inject,300);
})();