/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AIPlayer.ts":
/*!*************************!*\
  !*** ./src/AIPlayer.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.getAIMove = void 0;\r\nconst utils_1 = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\r\nconst board_1 = __webpack_require__(/*! ./board */ \"./src/board.ts\");\r\nfunction predictMove(board, winner) {\r\n    for (let index = 0; index < board.length; index++) {\r\n        const tile = board[index];\r\n        if (tile.value == board_1.TileValue.EMPTY) {\r\n            tile.value = winner;\r\n            if ((0, board_1.getWinner)(board) == winner) {\r\n                tile.value = board_1.TileValue.EMPTY;\r\n                return index;\r\n            }\r\n            tile.value = board_1.TileValue.EMPTY;\r\n        }\r\n    }\r\n    return -1;\r\n}\r\nfunction getRandomMove(board, positions) {\r\n    const empty = positions.filter((index) => {\r\n        return board[index].value == board_1.TileValue.EMPTY;\r\n    });\r\n    if (empty.length > 1) {\r\n        const randomIndex = (0, utils_1.getRandomNum)(0, empty.length - 1);\r\n        return empty[randomIndex];\r\n    }\r\n    if (empty.length == 1) {\r\n        return empty[0];\r\n    }\r\n    return -1;\r\n}\r\nfunction getAIMove(board) {\r\n    let AIMoveIndex;\r\n    // predict AI win move\r\n    AIMoveIndex = predictMove(board, board_1.TileValue.O);\r\n    if (AIMoveIndex != -1)\r\n        return AIMoveIndex;\r\n    // predict Player win move\r\n    AIMoveIndex = predictMove(board, board_1.TileValue.X);\r\n    if (AIMoveIndex != -1)\r\n        return AIMoveIndex;\r\n    // check center tile\r\n    const CENTER_POS = 4;\r\n    if (board[CENTER_POS].value == board_1.TileValue.EMPTY)\r\n        return CENTER_POS;\r\n    // check corners\r\n    const cornersPosition = [0, 2, 6, 8];\r\n    AIMoveIndex = getRandomMove(board, cornersPosition);\r\n    if (AIMoveIndex != -1)\r\n        return AIMoveIndex;\r\n    // check middle\r\n    const middlePosition = [1, 3, 5, 7];\r\n    AIMoveIndex = getRandomMove(board, middlePosition);\r\n    if (AIMoveIndex != -1)\r\n        return AIMoveIndex;\r\n    return -1;\r\n}\r\nexports.getAIMove = getAIMove;\r\n\n\n//# sourceURL=webpack://tic-tac-toe/./src/AIPlayer.ts?");

/***/ }),

/***/ "./src/Button.ts":
/*!***********************!*\
  !*** ./src/Button.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.createButton = void 0;\r\nfunction createButton(opt) {\r\n    const element = document.createElement('button');\r\n    element.className = opt.className;\r\n    element.innerText = opt.innnerText;\r\n    element.addEventListener('click', opt.onClick);\r\n    return element;\r\n}\r\nexports.createButton = createButton;\r\n\n\n//# sourceURL=webpack://tic-tac-toe/./src/Button.ts?");

/***/ }),

/***/ "./src/board.ts":
/*!**********************!*\
  !*** ./src/board.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.createBoard = exports.clearBoard = exports.getWinner = exports.TileValue = void 0;\r\nconst AIPlayer_1 = __webpack_require__(/*! ./AIPlayer */ \"./src/AIPlayer.ts\");\r\n// CSS class names\r\nconst classes = {\r\n    TILE_ITEM: 'tile'\r\n};\r\nvar TileValue;\r\n(function (TileValue) {\r\n    TileValue[\"X\"] = \"x\";\r\n    TileValue[\"O\"] = \"o\";\r\n    TileValue[\"EMPTY\"] = \"\";\r\n})(TileValue = exports.TileValue || (exports.TileValue = {}));\r\nvar GameState;\r\n(function (GameState) {\r\n    GameState[GameState[\"playing\"] = 0] = \"playing\";\r\n    GameState[GameState[\"wonPlayer\"] = 1] = \"wonPlayer\";\r\n    GameState[GameState[\"wonAI\"] = 2] = \"wonAI\";\r\n    GameState[GameState[\"gameTie\"] = 3] = \"gameTie\";\r\n})(GameState || (GameState = {}));\r\nlet state = GameState.playing;\r\nfunction getWinner(board) {\r\n    const winnigCombo = [\r\n        [0, 1, 2],\r\n        [3, 4, 5],\r\n        [6, 7, 8],\r\n        [0, 3, 6],\r\n        [1, 4, 7],\r\n        [2, 5, 8],\r\n        [0, 4, 8],\r\n        [2, 4, 6]\r\n    ];\r\n    let winner = TileValue.EMPTY;\r\n    winnigCombo.forEach((line) => {\r\n        let result = line.reduce((prev, index) => {\r\n            return prev + board[index].value;\r\n        }, TileValue.EMPTY);\r\n        if (result == 'xxx')\r\n            winner = TileValue.X;\r\n        if (result === 'ooo')\r\n            winner = TileValue.O;\r\n    });\r\n    return winner;\r\n}\r\nexports.getWinner = getWinner;\r\nfunction checkTie(board) {\r\n    let isTied = true;\r\n    const emptyTile = board.find((tile) => {\r\n        return tile.value == TileValue.EMPTY;\r\n    });\r\n    if (emptyTile)\r\n        isTied = false;\r\n    return isTied;\r\n}\r\nfunction update(board, playerMoveIndex, opt) {\r\n    const playerTile = board[playerMoveIndex];\r\n    if (playerTile.value != TileValue.EMPTY)\r\n        return;\r\n    if (state != GameState.playing)\r\n        return;\r\n    playerTile.value = TileValue.X;\r\n    playerTile.element.innerText = playerTile.value;\r\n    if (getWinner(board) == TileValue.X) {\r\n        state = GameState.wonPlayer;\r\n        opt.onPlayerWon();\r\n        return;\r\n    }\r\n    const aiMoveIndex = (0, AIPlayer_1.getAIMove)(board);\r\n    const aiTile = board[aiMoveIndex];\r\n    if (aiMoveIndex != -1) {\r\n        aiTile.value = TileValue.O;\r\n        aiTile.element.innerText = aiTile.value;\r\n    }\r\n    if (getWinner(board) == TileValue.O) {\r\n        state = GameState.wonAI;\r\n        opt.onIAWon();\r\n        return;\r\n    }\r\n    if (checkTie(board)) {\r\n        state = GameState.gameTie;\r\n        opt.onTie();\r\n        return;\r\n    }\r\n}\r\nfunction createTileElement(id, className, content, onClick) {\r\n    const tileEl = document.createElement('div');\r\n    tileEl.addEventListener('click', () => onClick(id));\r\n    tileEl.className = className;\r\n    tileEl.id = `tile-${id}`;\r\n    tileEl.textContent = content;\r\n    return tileEl;\r\n}\r\nfunction clearBoard(board) {\r\n    board.forEach((tile) => {\r\n        tile.value = TileValue.EMPTY;\r\n        tile.element.innerText = TileValue.EMPTY;\r\n    });\r\n    state = GameState.playing;\r\n}\r\nexports.clearBoard = clearBoard;\r\nfunction createBoard(opt) {\r\n    let board = [];\r\n    const handleClick = (id) => {\r\n        update(board, id, opt);\r\n    };\r\n    for (let index = 0; index < 9; index++) {\r\n        const value = TileValue.EMPTY;\r\n        const tileEl = createTileElement(index, classes.TILE_ITEM, value, handleClick);\r\n        const tile = {\r\n            id: index,\r\n            value,\r\n            element: tileEl\r\n        };\r\n        board.push(tile);\r\n    }\r\n    return board;\r\n}\r\nexports.createBoard = createBoard;\r\n\n\n//# sourceURL=webpack://tic-tac-toe/./src/board.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst board_1 = __webpack_require__(/*! ./board */ \"./src/board.ts\");\r\nconst message_1 = __webpack_require__(/*! ./message */ \"./src/message.ts\");\r\nconst Button_1 = __webpack_require__(/*! ./Button */ \"./src/Button.ts\");\r\n// CSS class names\r\nconst classes = {\r\n    BUTTON_CONTAINER: 'btn-container',\r\n    BOARD_CONTAINER: 'board',\r\n    START_GAME_BUTTON: 'btn start-game-btn',\r\n};\r\nconst board = (0, board_1.createBoard)({\r\n    onPlayerWon() {\r\n        (0, message_1.showMessage)('\"X\" won the game!');\r\n    },\r\n    onIAWon() {\r\n        (0, message_1.showMessage)('\"O\" won the game!');\r\n    },\r\n    onTie() {\r\n        (0, message_1.showMessage)('Tie!');\r\n    }\r\n});\r\nfunction render(board, placeEl) {\r\n    board.forEach((tile) => {\r\n        placeEl.appendChild(tile.element);\r\n    });\r\n}\r\nconst startNewGameBtn = (0, Button_1.createButton)({\r\n    innnerText: 'Start New Game',\r\n    className: classes.START_GAME_BUTTON,\r\n    onClick() {\r\n        (0, message_1.hideMessage)();\r\n        (0, board_1.clearBoard)(board);\r\n    }\r\n});\r\nconst btnContainer = document.querySelector('.' + classes.BUTTON_CONTAINER);\r\nbtnContainer.appendChild(startNewGameBtn);\r\nrender(board, document.querySelector('.' + classes.BOARD_CONTAINER));\r\n\n\n//# sourceURL=webpack://tic-tac-toe/./src/index.ts?");

/***/ }),

/***/ "./src/message.ts":
/*!************************!*\
  !*** ./src/message.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.hideMessage = exports.showMessage = void 0;\r\n// CSS class names\r\nconst classes = {\r\n    MESSAGE: 'message',\r\n    MESSAGE_CONTAINER: 'message-container',\r\n    HIDDEN: 'hidden',\r\n};\r\nfunction showMessage(msg) {\r\n    const msgContainer = document.querySelector('.' + classes.MESSAGE_CONTAINER);\r\n    const divEl = document.querySelector('.' + classes.MESSAGE);\r\n    msgContainer.classList.remove(classes.HIDDEN);\r\n    divEl.innerText = msg;\r\n}\r\nexports.showMessage = showMessage;\r\nfunction hideMessage() {\r\n    const msgContainer = document.querySelector('.' + classes.MESSAGE_CONTAINER);\r\n    msgContainer.classList.add(classes.HIDDEN);\r\n}\r\nexports.hideMessage = hideMessage;\r\n\n\n//# sourceURL=webpack://tic-tac-toe/./src/message.ts?");

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.getRandomNum = void 0;\r\nfunction getRandomNum(min, max) {\r\n    return Math.floor(Math.random() * (max - min + 1)) + min;\r\n}\r\nexports.getRandomNum = getRandomNum;\r\n\n\n//# sourceURL=webpack://tic-tac-toe/./src/utils.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;