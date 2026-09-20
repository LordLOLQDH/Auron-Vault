const CACHE='auron-vault-v4';
const ASSETS=['./','./index.html','./manifest.json','./icon.svg','./emergency.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('message',e=>{if(e.data?.type==='SHOW_NOTIFICATION'){const n=e.data.notification||{};self.registration.showNotification(n.title||'Auron Vault',{body:n.body||'',icon:'./icon.svg',badge:'./icon.svg',tag:n.tag||'auron-vault',data:{url:'./'}})}});

async function pageResponse(req){
  let r=await caches.match(req);
  if(!r) r=await fetch(req);
  try{
    const html=await r.clone().text();
    if(html.includes('emergency.js')) return r;
    const injected=html.replace('</body>','<script src="./emergency.js"></script></body>');
    const headers=new Headers(r.headers);
    headers.set('content-type','text/html; charset=UTF-8');
    return new Response(injected,{status:r.status,statusText:r.statusText,headers});
  }catch(e){return r}
}
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  const isPage=u.pathname.endsWith('/index.html')||u.pathname.endsWith('/');
  if(isPage){e.respondWith(pageResponse(e.request));return}
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(x=>{const copy=x.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return x}).catch(()=>caches.match('./'))));
});