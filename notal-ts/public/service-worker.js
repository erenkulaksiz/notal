if(!self.define){let e,i={};const s=(s,c)=>(s=new URL(s+".js",c).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(c,n)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(i[a])return;let o={};const r=e=>s(e,a),d={module:{uri:a},exports:o,require:r};i[a]=Promise.all(c.map((e=>d[e]||r(e)))).then((e=>(n(...e),o)))}}define(["./workbox-5f5b08d6"],(function(e){"use strict";importScripts("worker-ecGQfB5ew4QiavPLW2FU_.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/framework-4556c45dd113b893.js",revision:"4556c45dd113b893"},{url:"/_next/static/chunks/main-2727f92b6a285a16.js",revision:"2727f92b6a285a16"},{url:"/_next/static/chunks/pages/404-c713b26481e63512.js",revision:"c713b26481e63512"},{url:"/_next/static/chunks/pages/_app-6ff45ad14c09b4a7.js",revision:"6ff45ad14c09b4a7"},{url:"/_next/static/chunks/pages/_error-0a004b8b8498208d.js",revision:"0a004b8b8498208d"},{url:"/_next/static/chunks/pages/index-2645991090198d3c.js",revision:"2645991090198d3c"},{url:"/_next/static/chunks/pages/privacy-policy-bcd1423fc1c0184e.js",revision:"bcd1423fc1c0184e"},{url:"/_next/static/chunks/pages/workspace/%5Bid%5D-822d82e58741e101.js",revision:"822d82e58741e101"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"99442aec5788bccac9b2f0ead2afdd6b"},{url:"/_next/static/chunks/webpack-5752944655d749a0.js",revision:"5752944655d749a0"},{url:"/_next/static/css/de621cca363e07d8.css",revision:"de621cca363e07d8"},{url:"/_next/static/ecGQfB5ew4QiavPLW2FU_/_buildManifest.js",revision:"8eb6c796a3e96a0ab6425f3e55895561"},{url:"/_next/static/ecGQfB5ew4QiavPLW2FU_/_middlewareManifest.js",revision:"fb2823d66b3e778e04a3f681d0d2fb19"},{url:"/_next/static/ecGQfB5ew4QiavPLW2FU_/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/addfieldbanner.664d0e26.png",revision:"a6bcd6f290a2e4ec682d201b4be92ea3"},{url:"/_next/static/media/icon_galactic.e17c4559.webp",revision:"8b3d4ef9077115688e4d27cddd852d19"},{url:"/_next/static/media/icon_white.7fb47efe.webp",revision:"02d867694b6d0e76135a77e9a9690b95"},{url:"/_next/static/media/landing_bg_2.69ff52c1.png",revision:"69ff52c1"},{url:"/_next/static/media/landing_bg_3.26e3d844.png",revision:"26e3d844"},{url:"/_next/static/media/landing_bg_banner_1.eb6a8567.webp",revision:"5816b99ad18dd2c8f53756725670aa17"},{url:"/_next/static/media/logo_galactic_mobile.71da654e.webp",revision:"097d51271ea89d08599486ba971b3a47"},{url:"/_next/static/media/logo_white_mobile.4069676a.webp",revision:"cfbb50157715386ad88eb809c19c596c"},{url:"/addfieldbanner.png",revision:"a6bcd6f290a2e4ec682d201b4be92ea3"},{url:"/apple-touch-icon.png",revision:"139f019ed980982c571fbb81d1aabe6b"},{url:"/favicon-16x16.png",revision:"0fba74a746c54330d4fe087e8983b2f6"},{url:"/favicon-32x32.png",revision:"52fd0c7d64cc03b17eb2bd637f0f697e"},{url:"/favicon.ico",revision:"8f256580d8f12dd5460e913d70b7e67d"},{url:"/helios_logo.png",revision:"8ccccf07490a688ef3804df875f4f2df"},{url:"/icon-192x192.png",revision:"7146cf668a1cec126f2b90222f16bd4e"},{url:"/icon-512x512.png",revision:"e1eef76bd9de0c5e364a262966c9ad9c"},{url:"/icon_big.png",revision:"f2fb7639cbc0c1c20fd07044e8b4032e"},{url:"/icon_galactic.png",revision:"e666d9648f2d3136a372b469d4791b59"},{url:"/icon_galactic.webp",revision:"8b3d4ef9077115688e4d27cddd852d19"},{url:"/icon_white.png",revision:"f0e2eac42eb65ca2c5626f9992b40191"},{url:"/icon_white.webp",revision:"02d867694b6d0e76135a77e9a9690b95"},{url:"/icons/add.svg",revision:"dee1622a7a444224b02d8cb73cda6d6c"},{url:"/icons/arrow_down.svg",revision:"2cc14b92cec6e812062e1099e3ffb43e"},{url:"/icons/arrow_up.svg",revision:"c47457392826abc38ea140aa91e8ed24"},{url:"/icons/at.svg",revision:"3326e3d16c5bd09c967088e5893a13ba"},{url:"/icons/back.svg",revision:"9b1948b48a35bc7142c76651be1f614d"},{url:"/icons/bookmark_filled.svg",revision:"8d253b1be2ae1daf41445e6100c005c0"},{url:"/icons/bookmark_outline.svg",revision:"4d5dcc6c77ded4584dcea1ec5a4ce74d"},{url:"/icons/cake.svg",revision:"8aec572bb4328b879fd0d8885e9e4e52"},{url:"/icons/check.svg",revision:"15dfe709557ac71d1d96f4f54b6fe98f"},{url:"/icons/check_outline.svg",revision:"538b65eb72b3bc7ec117d75c593853a1"},{url:"/icons/chevron-right.svg",revision:"6daaaf08e8fc3998c7d50baf79b258b1"},{url:"/icons/cloud-upload.svg",revision:"44b80a1fd7d26bc989065ff1edb24576"},{url:"/icons/code.svg",revision:"9fb6bc3cbb6fb8d82d3d1e72fa1971f4"},{url:"/icons/cookie.svg",revision:"01e1343af3c74a4aabc179afbb12c752"},{url:"/icons/cross.svg",revision:"dd4f8c6a1296d9c635c7dfbba6b928d0"},{url:"/icons/cross2.svg",revision:"ee829fbf4575f51c5e17644c0498e0f0"},{url:"/icons/dark.svg",revision:"399b1420858b9b19d9046a66f05227a8"},{url:"/icons/dashboard_filled.svg",revision:"873af0825e3b63cd462e68286f89e8db"},{url:"/icons/dashboard_outline.svg",revision:"d664d1384597a6d4bc05083ecf1ec1bb"},{url:"/icons/delete.svg",revision:"ee46ca53f7fd77b32d4294985f1bd1be"},{url:"/icons/down.svg",revision:"2cc14b92cec6e812062e1099e3ffb43e"},{url:"/icons/drag.svg",revision:"b6d28000d4f7c3a2018790f3811b39c5"},{url:"/icons/edit.svg",revision:"94d12096eb02e69054ff51359dcbff25"},{url:"/icons/email.svg",revision:"1b791f54bb45dfe702aeb7707e4a11cd"},{url:"/icons/filter.svg",revision:"8adb55a26112ab38e25d14fcf979408b"},{url:"/icons/fold.svg",revision:"bdd8a620314ba770dc24046216ac7709"},{url:"/icons/github.svg",revision:"96f4c70dbba91447363cab560a33762c"},{url:"/icons/github_2.svg",revision:"ec5bc1b3148ca464a3a3e17af89c3ead"},{url:"/icons/google.svg",revision:"da3a9ed4399e0dc38e09a9d494a62f28"},{url:"/icons/groups.svg",revision:"670420c75f27ca1750e0f4a27096019a"},{url:"/icons/groups_outline.svg",revision:"559b99d3ef86c2fb498aaa92deacf093"},{url:"/icons/heart.svg",revision:"3e9b4bc4e266d5a5d4982770103724de"},{url:"/icons/home_filled.svg",revision:"66a7ed638c113b8b4321ae9077d7e812"},{url:"/icons/home_outline.svg",revision:"e23ac331fdb005ca578d072974378bea"},{url:"/icons/info.svg",revision:"2226ccece85a1cc8f03883a9c05ae3e6"},{url:"/icons/instagram.svg",revision:"e75317fafc5e835195adf92be513d35b"},{url:"/icons/invisible.svg",revision:"7f0a7450fe514e4284bf33f3a819acb0"},{url:"/icons/layers.svg",revision:"b1ed20c7e793d41a0e14c195e2abbcbb"},{url:"/icons/layers_outline.svg",revision:"9cce4d0093e1dda6ff1a86744bb70a84"},{url:"/icons/light.svg",revision:"aa59b8a4563d9e4bab5397881af52dcd"},{url:"/icons/link.svg",revision:"572cbc131e904e180558a3d6c8f0c3af"},{url:"/icons/lock.svg",revision:"3cd9658aadab561d6b939cb69b910533"},{url:"/icons/lock_outline.svg",revision:"f302c288e6bd14243ec194546643b0ef"},{url:"/icons/login.svg",revision:"98bd024c3405dfeb1a85f978419d28cd"},{url:"/icons/logout.svg",revision:"2fce85e323a656805134b424a8a910c3"},{url:"/icons/more.svg",revision:"a23fc87a9d1b129a59016fd5a30c1cbd"},{url:"/icons/password.svg",revision:"a8ef0c254e4d4ebfa28a60267a7748c6"},{url:"/icons/people.svg",revision:"7dab3b33b8c272eeb8ac49a7a310c355"},{url:"/icons/question.svg",revision:"d130bb6e3c8ee830df018c98984ae605"},{url:"/icons/refresh.svg",revision:"cedb06c845bde04af630244912fb6a35"},{url:"/icons/road.svg",revision:"c51bb65d9010bc3edd2712e9a14940dd"},{url:"/icons/scroll.svg",revision:"c4732f0ed735a2ff5d4b17a7dddb72fd"},{url:"/icons/secure.svg",revision:"a4f6413801284b3c831b75592c48e97b"},{url:"/icons/send.svg",revision:"457ea286b1d9bc29fd7118ddb40a2889"},{url:"/icons/settings.svg",revision:"d5b3bfbb9dcb6eb099983522d0188542"},{url:"/icons/share.svg",revision:"c9fbf7cb00dea1aca7b5e5521c2953c9"},{url:"/icons/signup.svg",revision:"52f78ce9c9e16182fdd763dd881efa65"},{url:"/icons/sliders-h.svg",revision:"89b1718ed9280d2c17100398b02c87f2"},{url:"/icons/speed.svg",revision:"f72eb340e7c2bf58326fb633a4bd0345"},{url:"/icons/star_filled.svg",revision:"df3b396092c83f6d19dc5cf4da26b009"},{url:"/icons/star_outline.svg",revision:"26c04f15ebeac3dbf740958ef5034e9a"},{url:"/icons/sync.svg",revision:"f0e13159b8046b5952f3be172bb3268c"},{url:"/icons/time.svg",revision:"32d4d23ab3227ea12ad3dbc4d692de06"},{url:"/icons/twitter.svg",revision:"6620c8ae2cac90067a9aa78339bb808d"},{url:"/icons/unfold.svg",revision:"b70df79d93bd4c921bf785e419433027"},{url:"/icons/up.svg",revision:"81b1ee809c276db25fea03a24b283628"},{url:"/icons/user.svg",revision:"54320b60382e9c3cea337fea09d82b52"},{url:"/icons/visible.svg",revision:"9031ec881f8382180ee5f9a06d2f243c"},{url:"/icons/visible_off.svg",revision:"fde986e6f4874c1b44ccc54b6ad53c60"},{url:"/icons/warning.svg",revision:"c6111ef6a4167151c949098342d08b52"},{url:"/icons/website.svg",revision:"5200623bc17e4ad0a6b983bcbaace0f5"},{url:"/landing_bg_1.png",revision:"e28d88915d963300339cf0326371ef98"},{url:"/landing_bg_2.png",revision:"e33ec2fe9689085334db28c6b58bf57a"},{url:"/landing_bg_3.png",revision:"ccccdbc2955322a43940e62b493705f4"},{url:"/landing_bg_4.png",revision:"551ca4556b27081bf40de1a651d5c1c7"},{url:"/landing_bg_5.svg",revision:"ec9c0a924d92a4d673ab7794f8d34dfd"},{url:"/landing_bg_6.svg",revision:"995e4c83b6d1e420815c3d8848794992"},{url:"/landing_bg_banner_1.png",revision:"eaf05879a1539e1a8a2a9a072add903a"},{url:"/landing_bg_banner_1.webp",revision:"5816b99ad18dd2c8f53756725670aa17"},{url:"/landing_img_right_1.svg",revision:"8a736a9bdad30127ff56d53783e43d0b"},{url:"/logo_galactic_mobile.png",revision:"13fb598672ae4800bbf28d8528da2d5c"},{url:"/logo_galactic_mobile.webp",revision:"097d51271ea89d08599486ba971b3a47"},{url:"/logo_white_mobile.png",revision:"e9c3cb96e23095ef8f1e898d4d3a8b67"},{url:"/logo_white_mobile.webp",revision:"cfbb50157715386ad88eb809c19c596c"},{url:"/manifest.json",revision:"b0872b286b2b835e5f1141ed2b50f7f6"},{url:"/no-image.png",revision:"dbb9fb2429394e4fdf60c5fdb8e3ca22"},{url:"/sw.js",revision:"1b72f4ea0d4b21de7501699b8b5d2f72"},{url:"/sw.js.map",revision:"71a055e224488f8f3fa922562f48ece0"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:i,event:s,state:c})=>i&&"opaqueredirect"===i.type?new Response(i.body,{status:200,statusText:"OK",headers:i.headers}):i}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const i=e.pathname;return!i.startsWith("/api/auth/")&&!!i.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
