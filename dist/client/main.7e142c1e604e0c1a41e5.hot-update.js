"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatereactapp"]("main",{

/***/ "./src/store/listTaskStore.ts":
/*!************************************!*\
  !*** ./src/store/listTaskStore.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.$listTaskStore = exports.calculateTotalReducer = exports.calculateTotalTime = exports.decreasePomodoroItem = exports.increasePomodoroItem = exports.updateItemTask = exports.removeItemTask = exports.addItemTask = void 0;\nvar effector_1 = __webpack_require__(/*! effector */ \"./node_modules/effector/effector.cjs.js\");\nvar local_1 = __webpack_require__(/*! effector-storage/local */ \"./node_modules/effector-storage/local/index.cjs\");\nexports.addItemTask = (0, effector_1.createEvent)();\nexports.removeItemTask = (0, effector_1.createEvent)();\nexports.updateItemTask = (0, effector_1.createEvent)();\nexports.increasePomodoroItem = (0, effector_1.createEvent)();\nexports.decreasePomodoroItem = (0, effector_1.createEvent)();\nexports.calculateTotalTime = (0, effector_1.createEvent)();\nfunction limitedPomodoroCount(value) {\n    return Math.max(1, value);\n}\nfunction calculateTotalReducer(tasks) {\n    return tasks.reduce(function (totalTime, task) { return totalTime + task.time; }, 0);\n}\nexports.calculateTotalReducer = calculateTotalReducer;\nexports.$listTaskStore = (0, effector_1.createStore)([]);\n(0, local_1.persist)({\n    store: exports.$listTaskStore,\n    key: 'list'\n});\nexports.$listTaskStore.on(exports.addItemTask, function (state, item) { return __spreadArray(__spreadArray([], state, true), [item], false); })\n    .on(exports.removeItemTask, function (state, id) { return state.filter(function (item) { return item.id !== id; }); })\n    .on(exports.updateItemTask, function (state, updateItem) { return state.map(function (item) { return item.id === updateItem.id ? updateItem : item; }); })\n    .on(exports.increasePomodoroItem, function (state, id) { return state.map(function (item) { return item.id === id ? __assign(__assign({}, item), { pomodoro_count: limitedPomodoroCount(item.pomodoro_count + 1), time: 25 * limitedPomodoroCount(item.pomodoro_count + 1) }) : item; }); })\n    .on(exports.decreasePomodoroItem, function (state, id) { return state.map(function (item) { return item.id === id ? __assign(__assign({}, item), { pomodoro_count: limitedPomodoroCount(item.pomodoro_count - 1), time: 25 * limitedPomodoroCount(item.pomodoro_count - 1) }) : item; }); })\n    .on(exports.calculateTotalTime, function (state) {\n    var totalTime = calculateTotalReducer(state);\n    return state.map(function (item) { return (__assign(__assign({}, item), { totalTime: totalTime })); });\n});\n\n\n//# sourceURL=webpack://reactapp/./src/store/listTaskStore.ts?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("a0ff286ea6354499b14d")
/******/ })();
/******/ 
/******/ }
);