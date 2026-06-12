// ==UserScript==
// @name         小红书直播间精简 - 隐藏顶部叠加层与返回按钮
// @namespace    http://tampermonkey.net/
// @version      2026-06-12
// @description  隐藏小红书直播间的顶部主播信息叠加层和返回图标
// @author       Tsung Wu
// @match        *://www.xiaohongshu.com/livestream/*
// @grant        none
// @downloadURL https://github.com/ionull/nia/raw/refs/heads/main/xhs.user.js
// @updateURL https://github.com/ionull/nia/raw/refs/heads/main/xhs.meta.js
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 定义需要隐藏的 CSS 选择器
    // 1. .main-player-top-overlay 是整个顶部信息容器
    // 2. .back-icon 是返回按钮
    const css = `
        .main-player-top-overlay,
        .back-icon {
            display: none !important;
        }
    `;

    // 将样式注入到页面
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;

    // 尽早挂载样式
    const root = document.head || document.documentElement;
    root.appendChild(style);

})();
