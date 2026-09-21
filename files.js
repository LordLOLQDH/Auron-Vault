(()=>{'use strict';
const DB='auron_files_v1',STORE='files',MAX=200*1024*1024,TEXT_MAX=5*1024*1024,GUIDE_ID='auron-guide-v1';
const $=id=>document.getElementById(id),input=$('fileInput'),drop=$('drop'),list=$('list'),search=$('search'),meta=$('meta'),error=$('error');let sortDesc=true,viewerUrl=null;
const GUIDE=`AURON VAULT — KURZANLEITUNG

Willkommen bei Auron Vault.

DATEIEN
• Dateien werden lokal im Browser gespeichert.
• Der Dateiinhalt wird vor dem Speichern mit AES-GCM verschlüsselt.
• Zum Entschlüsseln wird der aktive Vault-Schlüssel benötigt.
• Es gibt keinen zentralen Datei-Server.

DATEIEN ANSEHEN
• Texte und Quellcode können direkt angezeigt werden.
• Bilder werden direkt in einer Vorschau geöffnet.
• HTML/Code wird nur als Text angezeigt und NICHT ausgeführt.
• Mit „Download“ kannst du eine entschlüsselte Kopie speichern.

HINWEIS
Auron Vault befindet sich noch in Entwicklung. Für besonders wichtige Dateien solltest du zusätzlich eine Sicherung aufbewahren.
`;
function b64ToBytes(s){const bin=atob(s),a=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)a[i]=bin.charCodeAt(i);return a}
function bytesToB64(a){const u=new Uint8Array(a),CH=0x8000;let s='';for(let i=0;i<u.length;i+=CH)s+=String.fromCharCode(...u.subarray(i,i+CH));return btoa(s)}
function key(){const raw=sessionStorage.getItem('auron_session_key');if(!raw)throw new Error('Kein aktiver Vault. Öffne zuerst Auron Vault und entsperre den Tresor.');return crypto.subtle.importKey('raw',b64ToBytes(raw),{name:'AES-GCM'},false,['encrypt','decrypt'])}
function db(){return new Promise((res,rej)=>{const r=indexedDB.open(DB,1);r.onupgradeneeded=()=>{const d=r.result;if(!d.objectStoreNames.contains(STORE)){const s=d.createObjectStore(STORE,{keyPath:'id'});s.createIndex('name','name');s.createIndex('updatedAt','updatedAt')}};r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
function tx(mode,fn){return db().then(d=>new Promise((res,rej)=>{const q=d.transaction(STORE,mode).objectStore(STORE),r=fn(q);r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)}))}
function all(){return tx('readonly',s=>s.getAll())}function put(v){return tx('readwrite',s=>s.put(v))}function remove(id){return tx('readwrite',s=>s.delete(id))}
function fmt(n){if(n<1024)return n+' B';if(n<1048576)return(n/1024).toFixed(1)+' KB';if(n<1073741824)return(n/1048576).toFixed(1)+' MB';return(n/1073741824).toFixed(2)+' GB'}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function isText(f){return /^text\//i.test(f.type)||/\.(txt|md|markdown|csv|json|xml|html?|css|js|mjs|cjs|ts|tsx|jsx|py|java|c|h|cpp|hpp|cs|php|sql|sh|bash|bat|ps1|yaml|yml|toml|ini|log|env)$/i.test(f.name)}
function isImage(f){return /^image\//i.test(f.type)||/\.(png|jpe?g|gif|webp|svg|bmp|avif)$/i.test(f.name)}
async function encrypt(file){const k=await key(),iv=crypto.getRandomValues(new Uint8Array(12)),buf=await file.arrayBuffer(),data=await crypto.subtle.encrypt({name:'AES-GCM',iv},k,buf);return{iv:bytesToB64(iv),data,type:file.type||'application/octet-stream',size:file.size}}
async function decrypt(rec){const k=await key(),pt=await crypto.subtle.decrypt({name:'AES-GCM',iv:b64ToBytes(rec.iv)},k,rec.data);return new Blob([pt],{type:rec.type||'application/octet-stream'})}
async function ensureGuide(){if((await all()).some(f=>f.id===GUIDE_ID))return;const blob=new Blob([GUIDE],{type:'text/plain'}),e=await encrypt(blob);await put({id:GUIDE_ID,name:'Auron Vault – Anleitung.txt',type:e.type,size:blob.size,createdAt:Date.now(),updatedAt:Date.now(),iv:e.iv,data:e.data,folder:'root',system:true})}
function icon(f){return isImage(f)?'▧':isText(f)?'</>':'▱'}
function closeViewer(){const v=$('viewer');if(v)v.remove();if(viewerUrl){URL.revokeObjectURL(viewerUrl);viewerUrl=null}}
async function viewFile(f){try{const blob=await decrypt(f);const v=document.createElement('div');v.id='viewer';v.className='viewer';v.innerHTML='<div class="viewerTop"><div class="viewerTitle">'+esc(f.name)+'</div><button class="btn" id="viewerClose">Schließen</button></div><div class="viewerBody" id="viewerBody"></div>';document.body.appendChild(v);$('viewerClose').onclick=closeViewer;v.onclick=e=>{if(e.target===v)closeViewer()};const body=$('viewerBody');if(isImage(f)){viewerUrl=URL.createObjectURL(blob);const img=document.createElement('img');img.src=viewerUrl;img.alt=f.name;body.appendChild(img)}else if(isText(f)&&f.size<=TEXT_MAX){const text=await blob.text(),pre=document.createElement('pre');pre.textContent=text;body.appendChild(pre)}else{body.innerHTML='<div class="empty"><strong>Keine Vorschau verfügbar</strong><span>Diese Datei kann heruntergeladen, aber nicht direkt angezeigt werden.</span></div>'}}catch(e){error.innerHTML='<div class="error">'+esc(e.message||'Datei konnte nicht geöffnet werden.')+'</div>'}}
async function render(){try{if(!sessionStorage.getItem('auron_session_key'))throw new Error('Kein aktiver Vault. Öffne zuerst Auron Vault und entsperre den Tresor.');await ensureGuide();let files=await all(),q=search.value.trim().toLowerCase();files=files.filter(f=>f.name.toLowerCase().includes(q)).sort((a,b)=>sortDesc?b.updatedAt-a.updatedAt:a.name.localeCompare(b.name,'de'));meta.textContent=files.length+' Datei'+(files.length===1?'':'en')+' · lokaler verschlüsselter Speicher';list.innerHTML='';if(!files.length){list.innerHTML='<div class="empty"><strong>Keine Dateien</strong><span>Füge deine erste Datei hinzu.</span></div>';return}for(const f of files){const row=document.createElement('div');row.className='row';row.innerHTML='<div class="icon">'+icon(f)+'</div><div class="main"><div class="name" title="'+esc(f.name)+'">'+esc(f.name)+'</div><div class="info">'+fmt(f.size)+' · '+new Date(f.updatedAt).toLocaleString('de-DE')+(f.system?' · Systemdatei':'')+'</div></div><div class="actions">'+((isImage(f)||isText(f))?'<button class="btn" data-view="'+esc(f.id)+'">◉ <span class="label">Ansehen</span></button>':'')+'<button class="btn" data-dl="'+esc(f.id)+'">↓ <span class="label">Download</span></button><button class="btn danger" data-rm="'+esc(f.id)+'">× <span class="label">Löschen</span></button></div>';list.appendChild(row)}}catch(e){error.innerHTML='<div class="error">'+esc(e.message||'Dateimanager konnte nicht geladen werden.')+'</div>';list.innerHTML='';meta.textContent=''}}
async function add(files){for(const f of files){if(f.size>MAX){error.innerHTML='<div class="error">'+esc(f.name)+': maximal 200 MB.</div>';continue}try{const e=await encrypt(f);await put({id:crypto.randomUUID(),name:f.name,type:e.type,size:f.size,createdAt:Date.now(),updatedAt:Date.now(),iv:e.iv,data:e.data,folder:'root'});error.innerHTML=''}catch(e){error.innerHTML='<div class="error">'+esc(f.name+': '+(e.message||'Speichern fehlgeschlagen'))+'</div>'}}input.value='';render()}
drop.onclick=()=>input.click();input.onchange=()=>add([...input.files]);drop.ondragover=e=>{e.preventDefault();drop.classList.add('drag')};drop.ondragleave=()=>drop.classList.remove('drag');drop.ondrop=e=>{e.preventDefault();drop.classList.remove('drag');add([...e.dataTransfer.files])};search.oninput=render;$('sort').onclick=()=>{sortDesc=!sortDesc;$('sort').textContent=sortDesc?'Zuletzt geändert':'Name A–Z';render()};list.onclick=async e=>{const view=e.target.closest('[data-view]'),dl=e.target.closest('[data-dl]'),rm=e.target.closest('[data-rm]');if(view){const f=(await all()).find(x=>x.id===view.dataset.view);if(f)await viewFile(f);return}if(dl){try{const f=(await all()).find(x=>x.id===dl.dataset.dl);const b=await decrypt(f),u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download=f.name;a.click();setTimeout(()=>URL.revokeObjectURL(u),2000)}catch(x){error.innerHTML='<div class="error">Datei konnte nicht entschlüsselt werden.</div>'}}if(rm){if((await all()).find(x=>x.id===rm.dataset.rm)?.system){if(!confirm('Die Systemdatei wirklich löschen? Sie wird beim nächsten Öffnen wiederhergestellt.'))return}else if(!confirm('Datei endgültig löschen?'))return;await remove(rm.dataset.rm);render()}};$('back').onclick=()=>location.href='./';document.addEventListener('keydown',e=>{if(e.key==='Escape')closeViewer()});render();
})();