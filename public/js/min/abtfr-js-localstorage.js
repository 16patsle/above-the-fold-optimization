Abtfr[0](function(i,f){if(i.localStorage&&i.Worker){var u=[],n=function(r){"Promise"in i?new Promise(function(e,t){e(r())}):"undefined"!==i.setImmediate?i.setImmediate(r):setTimeout(r,0)},l={prefix:"abtfr-",default_expire:86400,preloaded:{},now:function(){return+new Date/1e3},execWhenIdle:function(e,t){f[16]?f[16](e,{timeout:t}):e()},saveScript:function(o,a,s){l.execWhenIdle(function(){var e={},t=l.now();if(e.date=t,e.expire=t+(s||l.default_expire),a instanceof Array){e.chunked=!0,e.chunks=a.length;for(var r=[],n=a.length,i=0;i<n;i++)r.push(a[i])}else{r=!1;e.data=a}if(l.add(o,e),r)for(n=r.length,i=0;i<n;i++)l.add("chunk:"+i+":"+o,r[i])},3e3)},getScript:function(e){if(void 0!==l.preloaded[e]&&!1!==l.preloaded[e])return l.preloaded[e];l.preloaded[e]=!1;var t=l.get(e);if(!t||"object"!=typeof t)return!1;if(void 0!==t.expire&&t.expire-l.now()<0)return!1;if(void 0!==t.chunked&&!0===t.chunked){for(var r,n=[],i=0;i<t.chunks;i++){if(!1===(r=l.get("chunk:"+i+":"+e))||void 0===r)return!1;n.push(r)}t.data=n.join("")}else if(!t.data)return!1;var o,a="/* @source "+e+" */\n",s=!1;if(f[16]&&void 0!==f[1][2]&&f[1][2]){var c=f[1][2].length;for(i=0;i<c;i++)if("object"==typeof f[1][2][i]&&-1!==e.indexOf(f[1][2][i][0])){s=!0,f[1][2][i][1]&&(o=f[1][2][i][1]);break}}return s?(a+="window.requestIdleCallback(function(){",a+=t.data,a+=o?"},{timeout:"+o+"});":"});"):a+=t.data,l.preloaded[e]=d(a,"application/javascript"),u.push(l.preloaded[e]),l.preloaded[e]},preloadScript:function(e){void 0===l.preloaded[e]&&l.execWhenIdle(function(){void 0===l.preloaded[e]&&(l.preloaded[e]=l.getScript(e))},100)},add:function(t,r,n){if(!(void 0!==n&&10<parseInt(n))){"object"==typeof r&&(r=JSON.stringify(r));try{return localStorage.setItem(l.prefix+t,r),!0}catch(e){if(0<=e.name.toUpperCase().indexOf("QUOTA")){var i,o,a,s=[];for(i in localStorage)0===i.indexOf(l.prefix)&&-1===i.indexOf("chunk:")&&(a=i.split(l.prefix)[1],(o=l.get(a))&&s.push([a,o]));return s.length?(s.sort(function(e,t){return e[1].date-t[1].date}),l.remove(s[0][0]),void l.execWhenIdle(function(){void 0===n&&(n=0),l.add(t,r,++n)},1e3)):void 0}return void 0}}},remove:function(e){var t=l.get(e);if(t){if(t.chunked)for(var r=parseInt(t.chunks),n=0;n<r;n++)localStorage.removeItem(l.prefix+"chunk:"+n+":"+e);localStorage.removeItem(l.prefix+e)}},get:function(e){var t=localStorage.getItem(l.prefix+e);try{return-1!==e.indexOf("chunk:")?t||!1:JSON.parse(t||"false")}catch(e){return!1}},clear:function(e){var t,r,n,i=this.now();for(t in localStorage)if(r=t.split(l.prefix)[1]){if(-1!==r.indexOf("chunk:"))continue;if(!(n=l.get(r)))continue;(!e||n.expire<=i)&&l.remove(r)}}},d=function(t,r){var n;try{n=new Blob([t],{type:r})}catch(e){i.BlobBuilder=i.BlobBuilder||i.WebKitBlobBuilder||i.MozBlobBuilder,(n=new BlobBuilder).append(t),n=n.getBlob(r)}return URL.createObjectURL(n)},e=function(){self.FETCH=self.fetch||!1,self.DEFAULT_TIMEOUT=5e3,self.MAX_CHUNK_SIZE=1e5,self.CHUNK_DATA=function(e,t){for(var r,n=Math.ceil(e.length/t),i=new Array(n),o=0;o<n;o++)r=o*t,i[o]=e.substring(r,r+t);return i},self.LOAD_RESOURCE=function(r){var n=!1,i=!1,t=function(e,t){if(!n){if(n=!0,i&&(clearTimeout(i),i=!1),!e&&t)t.length>self.MAX_CHUNK_SIZE&&(t=self.CHUNK_DATA(t,self.MAX_CHUNK_SIZE));self.RESOURCE_LOAD_COMPLETED(r,e,t)}};if(self.FETCH){var e=function(e){n||("object"==typeof e&&e.status&&(e=[e.status,e.statusText]),t(e))};self.FETCH(r.url,{method:"GET",mode:"cors",cache:"default"}).then(function(e){n||(e.ok?e.text().then(function(e){t(!1,e)}):t([e.status,e.statusText]))},e).catch(e);var o=r.timeout||self.DEFAULT_TIMEOUT;isNaN(o)&&(o=self.DEFAULT_TIMEOUT),i=setTimeout(function(){n||t("timeout")},o)}else{var a=new XMLHttpRequest;a.open("GET",r.url,!0),a.responseType="text",a.onreadystatechange=function(){n||4===a.readyState&&(200!==a.status?t(a.statusText):t(!1,a.responseText))},a.onerror=function(){n||t(a.statusText)};o=r.timeout||self.DEFAULT_TIMEOUT;isNaN(o)&&(o=self.DEFAULT_TIMEOUT),i=setTimeout(function(){if(!n){try{a.abort()}catch(e){}t("timeout")}},o),a.send(null)}},self.RESOURCE_LOAD_COMPLETED=function(e,t,r){t?(t instanceof Array||"object"!=typeof t||(t=t.toString()),self.postMessage([2,e.i,t])):self.postMessage([1,e.i,r])},self.onmessage=function(e){var t=e.data;if(t instanceof Array)for(var r=t.length,n=0;n<r;n++)"object"==typeof t[n]&&void 0!==t[n].url&&void 0!==t[n].i&&self.LOAD_RESOURCE(t[n]);else{if("object"!=typeof t||void 0===t.url||void 0===t.i)throw new Error("Web Worker Script Loader: Invalid resource object");self.LOAD_RESOURCE(t)}}}.toString().replace(/^function\s*\(\s*\)\s*\{/,"").replace(/\}$/,""),o={workerUri:d(e,"application/javascript"),worker:!1,scriptIndex:0,scriptQueue:[],start:function(){this.worker=new Worker(this.workerUri),this.worker.addEventListener("message",this.handleMessage),this.worker.addEventListener("error",this.handleError)},stop:function(){this.worker&&(this.worker.removeEventListener("message",this.handleMessage),this.worker.removeEventListener("error",this.handleError),this.worker.terminate(),this.worker=!1)},handleMessage:function(e){var t=e.data,r=t[1];void 0!==o.scriptQueue[r]&&(1!==parseInt(t[0])?parseInt(t[0]):o.scriptQueue[r].onData(t[2]))},handleError:function(e){0},loadScript:function(e,t){this.worker||this.start(),e=f[28](e);var r=parseInt(this.scriptIndex);this.scriptIndex++,this.scriptQueue[r]={url:e,onData:t},this.worker.postMessage({url:e,i:r})}};if(o.start(),i.addEventListener("beforeunload",function(e){if(o.stop(),0<u.length)for(var t=u.length,r=0;r<t;r++)try{URL.revokeObjectURL(u[r])}catch(e){0}}),f[16])f[16](function(){l.clear(!0)},{timeout:3e3});else{var t,r=function(){t&&clearTimeout(t),t=setTimeout(function(){l.clear(!0)},2e3)};r(),f[20](r)}f[23]=function(t,r,e){n(function(){var e=l.getScript(t);e?f[21](e,r):f[21](t,function(){r(),o.loadScript(t,function(e){e&&l.saveScript(t,e)})})})},f[25]=function(e){n(function(){l.preloadScript(e)})},f[24]=function(t){var e=l.getScript(t);return e||(o.loadScript(t,function(e){e&&l.saveScript(t,e)}),t)}}});