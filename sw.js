// Permet d'ouvrir l'application même sans internet
const C='bpci-v2',CDN='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(['./','index.html','manifest.json','icon-192.png','icon-512.png'].map(u=>c.add(u).catch(()=>{})).concat(fetch(CDN,{mode:'no-cors'}).then(r=>c.put(CDN,r)).catch(()=>{})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!='GET'||u.hostname.endsWith('supabase.co'))return;
e.respondWith(fetch(r).then(res=>{if(res&&(res.ok||res.type=='opaque')){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r).then(m=>m||(r.mode=='navigate'?caches.match('index.html'):Response.error()))))});
