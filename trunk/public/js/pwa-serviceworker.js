!function(q,u){function R(a,b,g){return caches.open(r).then(function(e){var c={};return b.headers.forEach(function(a,b){c[b]=a}),c["x-abtf-sw"]=p(),g&&g.max_age&&(c["x-abtf-sw-expire"]=g.max_age),b.blob().then(function(d){d=new Response(d,{status:b.status,statusText:b.statusText,headers:c});return e.put(a,d)})})}function G(a){if(a)return"string"==typeof a&&(a=new Request(a,{mode:"no-cors"})),y(a).then(function(b){return b?b:(a.url,v(a,{conditions:null},!1,!0))})}function y(a){var b=m.start(1E3);return caches.open(r).then(function(g){return g.match(a).then(function(a){if(a){var c=
a.headers.get("x-abtf-sw-expire");if(c)var d=a.headers.get("x-abtf-sw");var f=a.headers.get("expire");f&&(f=A(f));c&&d<p()-c?a=!1:f&&f<p()&&(a=!1)}return m.complete(b),a})})}function H(a,b){return a=new Request(a),y(a).then(function(a){return a?a.blob().then(function(b){return new Response(b,{status:503,statusText:"Offline",headers:a.headers})}):u(b)["catch"](function(a){setTimeout(function(){throw a;})})})}function v(a,b,g,e){var c,d=m.start(1E3);return(c=a.headers.get("accept"),c&&c.includes("text/html")?
new Promise(function(a){caches.open(r+":push").then(function(b){b.keys().then(function(b){if(0===b.length)return a(null);var c=[];b.forEach(function(a){c.push(y(a))});Promise.all(c).then(function(c){var d=[];b.forEach(function(a,b){"undefined"!==c[b]&&c[b]&&d.push(a.url)});0===d.length?a(null):S(d,Math.pow(2,7)).then(function(b){a(b)})})})})}):Promise.resolve(null)).then(function(c){function h(a){a in l&&(l[a]&&l[a][2]&&clearTimeout(l[a][2]),l[a]=!1,delete l[a])}var f=a;c&&(f=new Request(f)).headers.set("cache-digest",
c);var k=f.url;if(!e&&l&&k in l&&l[k]&&l[k][0]>p()-5)return l[k][1];c=u(f).then(function(a){h(k);var c=!1;if(a.ok&&400>a.status){var e=a.headers.get("link");e&&(e instanceof Array||(e=[e]),m.f(function(){caches.open(r+":push").then(function(a){e.forEach(function(c){c.split(",").forEach(function(c){if(/rel=preload/.test(c)){var b=c.match(/<([^>]+)>/);b&&b[1]&&a.match(b[1]).then(function(c){c||a.put(b[1],new Response(null,{status:204}))})}})})})},1E3));b&&(c=!0,b.conditions&&b.conditions.forEach(function(b){if(c)switch(b.type){case "url":b.regex?
(d=B(b.pattern))?(d=d.test(f.url),b.not?d&&(c=!1):d||(c=!1)):c=!1:(d=-1!==f.url.indexOf(b.pattern),b.not?d&&(c=!1):d||(c=!1));break;case "header":var d,h=a.headers.get(b.name);if(h)if(b.regex)(d=B(b.pattern))?(d=d.test(h),b.not?d&&(c=!1):d||(c=!1)):c=!1;else if("object"==typeof b.pattern)if(b.pattern.operator){var h=parseFloat(h),e=parseFloat(b.pattern.value);if(isNaN(h)||isNaN(e))c=!1;else{switch(b.pattern.operator){case "<":d=h<e;break;case ">":d=h>e;break;case "=":d=h===e;break;default:c=!1}c&&
(b.not?d&&(c=!1):d||(c=!1))}}else c=!1;else-1===h.indexOf(b.pattern)&&(c=!1);else c=!1}}),c&&R(f,a.clone(),b).then(function(){m.complete(d)}))}return c||m.complete(d),a})["catch"](function(a){return h(k),m.complete(d),g?g(f,null,a):null});return e&&(l[k]=[p(),c],l[k][2]=setTimeout(function(){l[k]=!1;delete l[k]},5E3)),c})}function N(){J||(!K||K<p()-10)&&(J=!0,K=p(),caches.keys().then(function(a){return a&&0!==a.length?Promise.all(a.map(function(a){if(0!==a.indexOf(r))return caches["delete"](a);caches.open(a).then(function(a){a.keys().then(function(b){if(!(b.length<
C)){var c=[],d=[],f=[];return b.forEach(function(c){d.push(c);f.push(a.match(c))}),Promise.all(f).then(function(b){var f=p();(b.forEach(function(b,h){if(b&&b.headers){var e=b.headers.get("x-abtf-sw");if(e){var k=b.headers.get("x-abtf-sw-expire");if(k&&e&&e<p()-k)return void a["delete"](d[h])}else e=f;!1!==c&&c.push({t:e,r:d[h]})}}),c&&c.length>C)&&(c.sort(function(a,b){return a.t>b.t?-1:a.t<b.t?1:0}),c.slice(C).forEach(function(b){a["delete"](b.r)}))})}})})})).then(function(){J=!1}):Promise.resolve()}))}
function B(a){if(a=a.match(T)){try{var b=new RegExp(a[1],a[2])}catch(g){}return b||!1}}function A(a){if(a)return isNaN(parseInt(a))?(a=Date.parse(a),isNaN(a)?void 0:Math.round(a/1E3)):a}function p(){return Math.round(Date.now()/1E3)}function D(){return w?Promise.resolve():(O(),w=!0,u(E+"?"+Math.round(Date.now()/1E3),{mode:"no-cors"}).then(function(a){if(w=!1,a&&a.ok&&400>a.status)return a.json().then(function(a){if(a){a instanceof Array&&(a={policy:a});r="abtf";a.cache_version&&(r=r+":"+a.cache_version);
a.policy&&(t=a.policy,z=p());var b=[],e=[];return a.start_url&&e.push(G(a.start_url)),a.policy&&a.policy.forEach(function(a){a.offline&&-1===b.indexOf(a.offline)&&b.push(a.offline)}),a.preload&&a.preload.forEach(function(a){-1===b.indexOf(a)&&b.push(a)}),preloadPromises=[],b.forEach(function(a){preloadPromises.push(G(a))}),Promise.all(e)}});throw t=!1,Error("service worker config not found: "+E);})["catch"](function(a){t=w=!1;setTimeout(function(){throw a;})}))}function P(a){(new Promise(function(b){if(!t||
!z||a&&a>z){var g=!t;D().then(function(){g&&b(t||!1)})["catch"](function(){g&&b(!1)})}else if(!w&&z<p()-300){O();w=!0;var e=new Request(E+"?"+Math.round(Date.now()/1E3),{method:"HEAD",mode:"no-cors"});u(e).then(function(a){w=!1;var b=!0;a&&a.ok&&(a=A(a.headers.get("last-modified")))&&a<=z&&(b=!1);b&&D()})["catch"](function(){w=!1;D()})}else b(t)}))["catch"](function(a){setTimeout(function(){throw a;})})}function O(){var a=new URL(location);(L=a.searchParams.get("path"))||(L="/");(a=a.searchParams.get("config"))||
(a="abtf-pwa-config.json");E=L+a}var L,E,r,t=!1,z=!1,C=1E3,l={};q.addEventListener("install",function(a){a.waitUntil(D().then(function(){q.skipWaiting()})["catch"](function(){q.skipWaiting()}))});q.addEventListener("activate",function(){q.clients.claim()});CacheStorage.prototype.match||(CacheStorage.prototype.match=function(a,b){var g=this;return this.keys().then(function(e){var c;return e.reduce(function(d,f){return d.then(function(){return c||g.open(f).then(function(c){return c.match(a,b)}).then(function(a){return c=
a})})},Promise.resolve())})});var x,Q,n,M,w,S=function(){function a(){this.value=[];this.a=0}function b(a,b){return a-b}function g(c,d){if(d>=Math.pow(2,32))throw Error('Invalid probability: "${p}" must be smaller than 2**32');if(!(0<(f=d)&&(f&1+~f)===f))throw Error('Invalid probability: "${p}" must be a power of 2');var f,h,I=Math.min(Math.pow(2,Math.round(Math.log2(c.length))),Math.pow(2,31)),k=[];return new Promise(function(f){Promise.all(c.map(function(a){return b=a,c=I,f=d,new Promise(function(a){var d=
b.replace(/[!'()*]/g,function(a){return"%"+a.charCodeAt(0).toString(16)});crypto.subtle.digest("SHA-256",e.encode(d)).then(function(b){b=(new DataView(b)).getUint32(0);var d=Math.log2(c*f);if(31<d)throw Error("This implementation only supports up to 31 bit hash values");a(b>>32-d&(1<<d)-1)})});var b,c,f})).then(function(){k=k.concat().sort(b);h=Uint8Array.from((new a).c(Math.log2(I),5).c(Math.log2(d),5).g(k,Math.log2(d)).value);var c;c="";for(var e=h.byteLength,g=0;g<e;g++)c+=String.fromCharCode(h[g]);
c=btoa(c).replace(/=+$/,"");f(c)})})}a.prototype.b=function(a){0==this.a&&(this.value.push(0),this.a=8);--this.a;a&&(this.value[this.value.length-1]|=1<<this.a)};a.prototype.c=function(a,b){if(0!=b){do--b,this.b(a&1<<b);while(0!=b)}return this};a.prototype.g=function(a,b){for(var c=-1,d=0;d!=a.length;++d)if(c!=a[d]){for(var c=a[d]-c-1,e=c>>b;0!=e;--e)this.b(0);this.b(1);this.c(c,b);c=a[d]}return this};var e=new TextEncoder("utf-8");return function(a,b){return g(a,b)}}(),m=(x={},Q=0,n=[],{start:function(a){var b=
++Q;return x[b]=[Date.now(),a],b},complete:function(a){try{delete x[a]}catch(b){}0<n.length&&M(null,0)},f:M=function(a,b,g){var e=!1,c=Object.keys(x);if(0<c.length){var d=Date.now();c.forEach(function(a){if(!e)if(x[a][0]<d-x[a][1])try{delete x[a]}catch(k){}else e=!0})}if(e){if(0!==b){var f;if(g){var h=!1;n.forEach(function(a,b){h||a[2]==g&&(h=b)});h&&(n[h][1]&&clearTimeout(n[h][1]),f=h)}f||(f=n.push([])-1);n[f]=[a,setTimeout(function(a,b){delete n[a];b();0<n.length&&M(null,0)},b,f,a),g]}}else if(a&&
n.push([a]),0<n.length)for(a=n.shift();a;){if(a instanceof Array){a[1]&&clearTimeout(a[1]);try{a[0]()}catch(I){}}a=n.shift()}}}),T=/^\/(.*)\/([gimuy]+)?$/,K=!1,J=!1,F=!1;q.addEventListener("fetch",function(a){if("GET"===a.request.method){var b=!1;if(["wp-admin/","wp-login.php"].forEach(function(e){b||(e=new RegExp("^([^/]+)?//"+q.location.host+"(:[0-9]+)?/"+e),(e.test(a.request.url)||a.request.referrer&&e.test(a.request.referrer))&&(b=!0))}),!(b||a.request.url.match(/\&preview=true/)||a.request.url.match(/\&preview_nonce=/))&&
(P(),t&&r)){var g=function(a,b){if(!b||0===b.length)return!1;var c=!1;if(b.forEach(function(b){if(!c&&b.match&&0!==b.match.length){var d=!0;b.match.forEach(function(b){if(d)switch(b.type){case "url":if(b.regex)if(h=B(b.pattern)){var c=h.test(a.request.url);b.not?c&&(d=!1):c||(d=!1)}else d=!1;else if(b.pattern instanceof Array){var f=!1;b.pattern.forEach(function(b){f||-1!==a.request.url.indexOf(b)&&(f=!0)});b.not?f&&(d=!1):f||(d=!1)}else c=-1!==a.request.url.indexOf(b.pattern),b.not?c&&(d=!1):c||
(d=!1);break;case "header":switch(b.name.toLowerCase()){case "referer":case "referrer":var e=a.request.referrer;break;default:e=a.request.headers.get(b.name)}if(e)if(b.regex){var h;(h=B(b.pattern))?(c=h.test(e),b.not?c&&(d=!1):c||(d=!1)):d=!1}else c=-1!==e.indexOf(b.pattern),b.not?c&&(d=!1):c||(d=!1);else b.not||(d=!1)}});d&&(c=b)}}),!c)return!1;switch(F&&clearTimeout(F),F=setTimeout(function(){m.f(N,1E4,"clean-cache");F=!1},100),c.strategy){case "never":return!1;case "cache":return y(a.request).then(function(b){if(b){var d=
!0,f=c.cache.update_interval?!isNaN(parseInt(c.cache.update_interval))&&parseInt(c.cache.update_interval):!1;if(f){var e=b.headers.get("x-abtf-sw");e&&parseInt(e)>p()-f&&(d=!1)}return d&&(g=a.request.clone(),l=b.clone(),setTimeout(function(){var a;if(c.cache.h&&(a=function(){clients.matchAll().then(function(a){a.forEach(function(a){a.postMessage([2,g.url])})})}),c.cache.head_update)!function(a,b,c,d){var f=c.headers.get("etag"),e=A(c.headers.get("last-modified"));if(!f&&!e)return c=v(a,b),d&&(c=c.then(d)),
c;var h=m.start(1E3);c=new Request(a.url,{method:"HEAD",headers:a.headers,mode:"no-cors"});u(c).then(function(c){var g=!1,k=c.headers.get("etag");c=A(c.headers.get("last-modified"));return(k&&k!==f?g=!0:c&&c!==e&&(g=!0),g)?(g=v(a,b),g=g.then(function(a){return m.complete(h),a}),d&&(g=g.then(d)),g):(m.complete(h),null)})["catch"](function(){var c=v(a,b);return c=c.then(function(a){return m.complete(h),a}),d&&(c=c.then(d)),c})}(g,c.cache,l,a);else{var b=v(g,c.cache);a&&b.then(a)}},10)),b}return v(a.request,
c.cache,function(b,d){return c.offline?H(c.offline,b.clone()):d||u(a.request.clone())["catch"](function(a){setTimeout(function(){throw a;})})});var g,l});case "event":return y(a.request).then(function(b){return b||v(a.request,null,function(b,d){return c.offline?H(c.offline,b.clone()):d||u(a.request)["catch"](function(a){setTimeout(function(){throw a;})})})});default:return v(a.request,c.cache,function(b,d){return y(b).then(function(e){return e||(c.offline?H(c.offline,b.clone()):d||u(a.request)["catch"](function(a){setTimeout(function(){throw a;
})}))})})}}(a,t);if(!1!==g)return a.respondWith(g)}}});q.addEventListener("message",function(a){if(a&&a.data&&a.data instanceof Array){if(1===a.data[0]&&(a.data[1]&&!isNaN(parseInt(a.data[1]))&&P(parseInt(a.data[1])),a.data[3]&&!isNaN(parseInt(a.data[3]))&&(C=parseInt(a.data[3])),m.f(N,1E4,"clean-cache")),2===a.data[0]||3===a.data[0])var b=a.ports[0]?function(b,d){a.ports[0].postMessage({error:b,status:d})}:!1;var g;if(2===a.data[0])if(a.data[1])if("string"==typeof a.data[1]||a.data[1]instanceof Request?
g=[a.data[1]]:a.data[1]instanceof Array&&(g=a.data[1]),g){var e=[];g.forEach(function(a){e.push(G(a))});b&&Promise.all(e).then(function(a){var c=[];a.forEach(function(a){var b={url:a.url,status:a.status,statusText:a.statusText};a=a.headers.get("content-length");b.size=isNaN(parseInt(a))?-1:parseInt(a);c.push(b)});b(null,c)})["catch"](function(){0})}else b&&b("invalid-data");else b&&b("no-urls");3===a.data[0]&&(q.registration.showNotification(a.data[1],a.data[2]),b&&b(null,"sent"))}})}(self,self.fetch,
Cache);
