//移动端页面适配，PC请移除
// var docElement = document.documentElement,
// metaElement = document.querySelector('meta[name="viewport"]'),
// styleElement = document.createElement("style"),
// version,
// screenScale = 1,
// originScreenW = 750,
// originScreenH = 1333,
// screenW = window.screen.width,
// screenH = window.screen.height;
// screenScale = parseInt(screenW) / 750;
// if (/Android (\d+\.\d+)/.test(navigator.userAgent)) {
//     version = parseFloat(RegExp.$1);
//     if (version > 2.3) {
//         metaElement.setAttribute("content", "width=750,minimum-scale=" + screenScale + ",maximum-scale=" + screenScale + ",target-densitydpi=device-dpi")
//     } else {
//         metaElement.setAttribute("content", "width=750,target-densitydpi=device-dpi")
//     }
// } else {
//     metaElement.setAttribute("content", "width=750,user-scalable=no,target-densitydpi=device-dpi")
// }
"use strict";