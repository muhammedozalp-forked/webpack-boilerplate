if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise((async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()}))),r.then((()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]}))},r=(r,s)=>{Promise.all(r.map(e)).then((e=>s(1===e.length?e[0]:e)))},s={require:Promise.resolve(r)};self.define=(r,i,n)=>{s[r]||(s[r]=Promise.resolve().then((()=>{let s={};const a={uri:location.origin+r.slice(1)};return Promise.all(i.map((r=>{switch(r){case"exports":return s;case"module":return a;default:return e(r)}}))).then((e=>{const r=n(...e);return s.default||(s.default=r),s}))})))}}define("./service-worker.js",["./workbox-5888e8f6"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"./about.html",revision:"2c725478d32c12cf83fd0cff478bf6df"},{url:"./assets/.htaccess",revision:"f1d9e82fd9425adb24017b5e3b47f3aa"},{url:"./assets/manifest.json",revision:"9563a1ddd515f7f76a5cd0396af9f15f"},{url:"./contact.html",revision:"1afd21970eb2aa5de70e3dda06283063"},{url:"./images/about.jpg",revision:"09c860439e8df87b3b12b1946d0883cb"},{url:"./images/contact.jpg",revision:"24e7c3718888514c4c75ef92cc498c69"},{url:"./images/index.jpg",revision:"3411f1a849a69ca19ba713a498dbc29a"},{url:"./images/static/app_192x192.png",revision:"11418d2656ffb7e35bdd36a76df5dbae"},{url:"./images/static/app_512x512.png",revision:"b3a3368e2e9041af0ae6e54d1de6541e"},{url:"./index.html",revision:"49a8f7c2ece204babafbfcc9b9f66591"},{url:"./vendor/css/about.bc2fa4358ed625b6231a.css",revision:null},{url:"./vendor/css/contact.bc2fa4358ed625b6231a.css",revision:null},{url:"./vendor/css/index.bc2fa4358ed625b6231a.css",revision:null},{url:"./vendor/js/about.bc2fa4358ed625b6231a.js",revision:null},{url:"./vendor/js/contact.bc2fa4358ed625b6231a.js",revision:null},{url:"./vendor/js/index.bc2fa4358ed625b6231a.js",revision:null},{url:"./vendor/js/share.bc2fa4358ed625b6231a.js",revision:null}],{directoryIndex:"index.html"}),e.initialize({})}));