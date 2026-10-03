const V='jarvis-v3',SDK='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js',SHELL=['/','/index.html','/manifest.webmanifest','/icon-192.png','/icon-512.png','/apple-touch-icon.png','/favicon-48.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(async c=>{await c.addAll(SHELL);try{await c.add(SDK)}catch(x){}}).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=='GET')return;
  if(r.mode==='navigate'){
    e.respondWith(caches.match('/index.html').then(m=>{
      const n=fetch(r).then(x=>{const c=x.clone();caches.open(V).then(h=>h.put('/index.html',c));return x});
      if(m){e.waitUntil(n.catch(()=>{}));return m}
      return n;
    }));
    return;
  }
  if(u.origin===location.origin||u.hostname==='cdn.jsdelivr.net'||u.hostname==='fonts.gstatic.com'||u.hostname==='fonts.googleapis.com'){
    e.respondWith(caches.match(r).then(m=>{const n=fetch(r).then(x=>{if(x.ok||x.type==='opaque'){const c=x.clone();caches.open(V).then(h=>h.put(r,c))}return x}).catch(()=>m);return m||n}));
  }
});
