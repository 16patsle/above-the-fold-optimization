!function(a){"use strict";var e=function(e,n,t){var o,i=a.document,f=i.createElement("link");if(n)o=n;else{var l=(i.body||i.getElementsByTagName("head")[0]).childNodes;o=l[l.length-1]}var r=i.styleSheets;f.rel="stylesheet",f.href=e,f.media="only x",function e(n){if(i.body)return n();setTimeout(function(){e(n)})}(function(){o.parentNode.insertBefore(f,n?o:o.nextSibling)});var d=function(e){for(var n=f.href,t=r.length;t--;)if(r[t].href===n)return e();setTimeout(function(){d(e)})};function s(){f.addEventListener&&f.removeEventListener("load",s),f.media=t||"all"}return f.addEventListener&&f.addEventListener("load",s),(f.onloadcssdefined=d)(s),f};"undefined"!=typeof exports?exports.loadCSS=e:a.loadCSS=e}("undefined"!=typeof global?global:this),Abtf[0](function(i,f){var l,n,r,d=function(e,n,t){if(l)var o=l.nextSibling;else o=document.getElementById("AbtfCSS").nextSibling;l=i.loadCSS(e,o,n,function(){console.info("Abtf.css() ➤ loadCSS() render",f[29](e)),t&&t()})},s=[],a=function(){if(!n){n=!0;for(var e=s.shift();e;)d.apply(i,e),e=s.shift();c=!(n=!1)}},u=0,c=!1;f[19]=void 0!==i.loadCSS?function(e,n,t){console.info("Abtf.css() ➤ loadCSS() async download start",f[29](e)),function(e,n,t){if(c)d(e,n,t);else if(document.getElementById("AbtfCSS"))r&&clearTimeout(r),0<s.length?(s.push([e,n,t]),a()):(d(e,n,t),c=!0);else if(s.push([e,n,t]),!r){var o=function(){100<u?console.error("Abtf.fonts()",'async CSS reference <style id="AbtfCSS"> not found'):(u++,document.getElementById("AbtfCSS")?a():r=setTimeout(o,0))};r=setTimeout(o,0)}}(e,n,t)}:function(){}});