/* Intervention TIIN — fonctionnement hors connexion.
   Ne pas modifier CACHE à la main : lancer « python tools/version.py » avant chaque publication. */
const CACHE='intervention-tiin-3b757d097b';
const ASSETS=['./','./index.html','./style.css','./icon.svg','./manifest.webmanifest',
 './assets/fonts/lexend.css','./assets/fonts/lexend-0.ttf','./assets/fonts/lexend-1.ttf','./assets/fonts/lexend-2.ttf','./assets/fonts/lexend-3.ttf','./assets/fonts/lexend-4.ttf',
 './assets/logo-tocqueville.png','./assets/logo-bac-pro-tiin.svg',
 './icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./icons/apple-touch-icon.png',
 './js/rubriques.js','./js/accueil.js','./js/sas-dessin.js','./js/sas-complet.js','./js/sas-confinement.js','./js/sas-defi.js','./js/app.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS.map(u=>new Request(u,{cache:'reload'}))))));
self.addEventListener('message',e=>{if(e.data&&e.data.type==='ACTIVATE_UPDATE')self.skipWaiting();});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('intervention-tiin-')&&x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);
  if(url.origin!==self.location.origin)return;
  e.respondWith(caches.open(CACHE).then(async c=>{
    const hit=await c.match(e.request,{ignoreSearch:true});if(hit)return hit;
    try{return await fetch(e.request);}catch(err){if(e.request.mode==='navigate')return c.match('./index.html');throw err;}
  }));
});
