Abtf[0](function(n,e){if(e.offline=function(){return{then:function(){}}},"serviceWorker"in n.navigator&&e[8]&&e[8][0]){var o=n.document,t=e[8];if(t[3]){var r,i=function(){e[15](function(){if(r!==navigator.onLine&&o.body){if(navigator.onLine){if(void 0===r)return;console.info("Abtf.offline() ➤ connection restored"),o.body.classList.remove("offline")}else console.warn("Abtf.offline() ➤ connection offline"),o.body.classList.add("offline");r=!!navigator.onLine}})};n.addEventListener("online",i),n.addEventListener("offline",i),i()}var a=function(){navigator.serviceWorker.controller.postMessage([1,t[2],t[4],t[5]])};navigator.serviceWorker.ready.then(function(){navigator.serviceWorker.controller?a():navigator.serviceWorker.addEventListener("controllerchange",function(){a()}),console.info("Abtf.pwa() ➤ service worker ready")}),t[6]&&navigator.serviceWorker.register(t[0],{scope:t[1]}).then(function(n){return new Promise(function(e,o){n.installing?n.installing.addEventListener("statechange",function(n){"installed"==n.target.state?(console.info("Abtf.pwa() ➤ service worker loaded"),e()):(console.warn("Abtf.pwa() ➤ service worker",n.target.state),"redundant"==n.target.state&&o())}):(console.info("Abtf.pwa() ➤ service worker loaded"),e())})}).catch(function(n){throw n}),navigator.serviceWorker.addEventListener("message",function(e){if(e&&e.data&&e.data instanceof Array&&2===e.data[0]){if(!o.body)return;e=new CustomEvent("sw-update",{detail:{url:e.data[1]}});n.dispatchEvent(e)}});var f=function(e,o){navigator.serviceWorker.controller?e.apply(n,o):navigator.serviceWorker.ready.then(function(){e.apply(n,o)})},c=function(n,e){return new Promise(function(o,t){var r=new MessageChannel;r.port1.onmessage=function(e){e.data&&e.data.error?console.info("Abtf."+n+"() ➤ error",e.data.error):o(e.data)},navigator.serviceWorker.controller.postMessage(e,[r.port2])})},s=function(n,e){f(function(n){c("offline",[2,n]).then(function(n){e(n.status)})},[n,e])};if(e.offline=function(n){return new Promise(function(e){s(n,e)}).catch(function(e){console.info("Abtf.offline() ➤ error",e,n)})},e.push=function(n,e){return new Promise(function(o){var t;t=o,f(function(n,e){c("push",[3,n,e]).then(function(n){t(n.status)})},[n,e])}).catch(function(o){console.info("Abtf.push() ➤ error",o,n,e)})},t[7]){var u=function(){var n=this.getAttribute("href");n&&s(n,function(){})};e[14](function(){if(n.jQuery)n.jQuery(function(n){n("body").on("mousedown","a",u)});else for(var e=Array.prototype.slice.call(o.getElementsByTagName("a")),t=e.length,r=0;r<t;r++)e[r].onmousedown=u})}}});