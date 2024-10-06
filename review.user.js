// ==UserScript==
// @name         Ingress 一键审PO
// @namespace    http://tampermonkey.net/
// @version      2024-10-06
// @description  在页面最顶端增加了一个按钮 一键勾选所有对话框 减少重复操作
// @author       PT & ionull
// @license      MIT
// @match        https://wayfarer.nianticlabs.com/new/review
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nianticlabs.com
// @grant        none
// @downloadURL https://github.com/ionull/nia/raw/refs/heads/main/review.user.js
// @updateURL https://github.com/ionull/nia/raw/refs/heads/main/review.meta.js
// ==/UserScript==

(function() {
  "use strict";

  // 添加一个新按钮到页面
  function addFloatingButton() {
    // 确保不重复添加按钮
    if (!document.querySelector(".custom-floating-button")) {
      var button = document.createElement("button");
      button.innerText = "一键操作";
      button.className = "wf-button wf-button--primary custom-floating-button"; // 添加自定义类名
      button.style.position = "fixed"; // 固定定位
      button.style.right = "50%"; // 垂直居中
      button.style.top = "10px"; // 右侧距离
      button.style.zIndex = "1000"; // 确保按钮在最上层
      button.addEventListener('click', clickOtherButtons);
      document.body.appendChild(button);
    }
  }

  // 选择器的基础部分
  var bases = [
    "#appropriate-card",
    "#safe-card",
    "#exercise-card",
    "#explore-card",
    "#socialize-card",
    "#permanent-location-card",
    "#accurate-and-high-quality-card"
  ];

  // 通用选择器部分
  var commonPart = "> div > div.action-buttons-row > button:nth-child(1)";

  // 根据基础部分创建完整选择器的函数
  function createSelector(base) {
    return base + commonPart;
  }

  // 点击其他按钮的函数
  function clickOtherButtons() {
    bases.forEach(function(base) {
      var selector = createSelector(base);
      var button = document.querySelector(selector);
      if (button) {
        button.click();
      } else {
        console.log("未找到按钮: " + selector);
      }
    });

    const buttons = Array.from(document.querySelectorAll('button[id^="mat-button-toggle-"]'))
    .filter((button, index) => index % 2 == 0); // Filter to get only odd-indexed buttons
    buttons.forEach(
        function(btn) {
            btn.click();
            console.log("已点击toggle: " + btn.id);
        });
  }

  // 文档加载完成后添加按钮
  window.addEventListener("DOMContentLoaded", function() {
    addFloatingButton();
  }, false);
  // // Wait for the DOM to be fully loaded
  window.addEventListener("load", function() {
     setTimeout(addFloatingButton, 1000);
  }, false);
})();
