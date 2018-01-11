/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const DEFAULT_WIDTH = 640;
/* harmony export (immutable) */ __webpack_exports__["b"] = DEFAULT_WIDTH;

const DEFAULT_HEIGHT = 480;
/* harmony export (immutable) */ __webpack_exports__["a"] = DEFAULT_HEIGHT;


const GAME_CONTAINER_ID = 'gameContainer';
/* harmony export (immutable) */ __webpack_exports__["c"] = GAME_CONTAINER_ID;


const gameLevel = {
    WIDTH: 640,
    HEIGHT: 480
}
/* harmony export (immutable) */ __webpack_exports__["d"] = gameLevel;


const keycodes = {
    LEFT: 37, // arrow left
    RIGHT: 39, // arrow right
    UP: 38, // arrow up
    DOWN:40 // arrow down
}
/* harmony export (immutable) */ __webpack_exports__["f"] = keycodes;


const imageSources = [
  { url: 'assets/background.png', name: 'background'},  
  { url: 'assets/level.png', name: 'level'},
  { url: 'assets/submarine.png', name: 'submarine'},
]
/* harmony export (immutable) */ __webpack_exports__["e"] = imageSources;




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Game__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(0);



const containerEl = document.getElementById(__WEBPACK_IMPORTED_MODULE_1__config__["c" /* GAME_CONTAINER_ID */]);
const clientWidth = document.body.clientWidth;
const clientHeight = document.body.clientHeight;

let width = __WEBPACK_IMPORTED_MODULE_1__config__["b" /* DEFAULT_WIDTH */];
let height = __WEBPACK_IMPORTED_MODULE_1__config__["a" /* DEFAULT_HEIGHT */];

if (clientWidth < __WEBPACK_IMPORTED_MODULE_1__config__["b" /* DEFAULT_WIDTH */]) {
  width = clientWidth;
} 

if (clientHeight < __WEBPACK_IMPORTED_MODULE_1__config__["a" /* DEFAULT_HEIGHT */]) {
  height = clientHeight;
}

const game = new __WEBPACK_IMPORTED_MODULE_0__Game__["a" /* default */](width, height);
containerEl.appendChild(game.view);

containerEl.style.width = width + 'px';
containerEl.style.height = height + 'px';


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Input__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PlayState__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(0);




class Game {
  constructor(width, height) {
    this.app = new PIXI.Application({
      width: width,
      height: height,
      backgroundColor : 0x9BBC0F,
    });

    this.view = this.app.view;
    this.stage = this.app.stage;
    this.ticker = this.app.ticker;
    this.screen = this.app.screen;
    this.renderer = this.app.renderer;
    this.loader = this.app.loader;

    this.state = null;
    this.update = this.update.bind(this);

    this.input = new __WEBPACK_IMPORTED_MODULE_0__Input__["a" /* default */]();
    this.loadImages();
  }

  loadImages() {
    __WEBPACK_IMPORTED_MODULE_2__config__["e" /* imageSources */].forEach( image => {
      this.loader.add(image.name, image.url);
    });

    this.loader.load((loader, resources) => {
      this.state = new __WEBPACK_IMPORTED_MODULE_1__PlayState__["a" /* default */](this);
      this.ticker.add(this.update);
    })
  }

  update(delta) {
    this.state.update(delta);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Game);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Key__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Touch__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(0);




class Input {
  constructor() {
    this.key = {
      left: new __WEBPACK_IMPORTED_MODULE_0__Key__["a" /* default */](__WEBPACK_IMPORTED_MODULE_2__config__["f" /* keycodes */].LEFT),
      right: new __WEBPACK_IMPORTED_MODULE_0__Key__["a" /* default */](__WEBPACK_IMPORTED_MODULE_2__config__["f" /* keycodes */].RIGHT),
      up: new __WEBPACK_IMPORTED_MODULE_0__Key__["a" /* default */](__WEBPACK_IMPORTED_MODULE_2__config__["f" /* keycodes */].UP),
      down: new __WEBPACK_IMPORTED_MODULE_0__Key__["a" /* default */](__WEBPACK_IMPORTED_MODULE_2__config__["f" /* keycodes */].DOWN)
    }

    this.touch = {
        left: new __WEBPACK_IMPORTED_MODULE_1__Touch__["a" /* default */]('left'),
        right: new __WEBPACK_IMPORTED_MODULE_1__Touch__["a" /* default */]('right'),
        up: new __WEBPACK_IMPORTED_MODULE_1__Touch__["a" /* default */]('up'),
        down: new __WEBPACK_IMPORTED_MODULE_1__Touch__["a" /* default */]('down')
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Input);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Key {
  constructor(code) {
    this.code = code;
    this.isDown = false;
    this.isUp = true;
    this.press = null;
    this.release = null;

    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));  
  }

  handleKeyDown(e) {
    e.preventDefault();
    if (this.code == e.keyCode) {
      if (this.isUp && this.press) {
        this.press();
      }

      this.isDown = true;
      this.isUp = false;
    }
  }

  handleKeyUp(e) {
    e.preventDefault();
    if (this.code == e.keyCode) {
      if (this.isDown && this.release) {
        this.release();
      }

      this.isDown = false;
      this.isUp = true;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Key);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Touch {
  constructor(elementId) {
    this.el = document.getElementById(elementId);
    this.isDown = false;
    this.isUp = true;
    this.press = null;
    this.release = null;

    this.el.addEventListener('touchstart', this.handleTouchStart.bind(this));
    this.el.addEventListener('touchend', this.handleTouchEnd.bind(this)); 
  }

  handleTouchStart(e) {
    e.preventDefault();
    this.isUp = false;
    this.isDown = true;
    if (this.press) {
      this.press();
    }
    
  }

  handleTouchEnd(e) {
    e.preventDefault();
    this.isUp = true;
    this.isDown = false;
    if (this.release) {
      this.release();
    }
    
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Touch);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Submarine__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__GameLevel__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Camera__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(11);






class PlayState {
  constructor(game) {
    this.game = game;
    this.key = this.game.input.key;
    this.touch = this.game.input.touch;
    this.camera = new __WEBPACK_IMPORTED_MODULE_2__Camera__["a" /* default */](this.game);
    this.gameLevel = new __WEBPACK_IMPORTED_MODULE_1__GameLevel__["a" /* default */](this.game.loader.resources);
    this.submarine = new __WEBPACK_IMPORTED_MODULE_0__Submarine__["a" /* default */](this.game.loader.resources['submarine'].texture);

    this.addSpritesToStage(this.gameLevel.sprites);
    this.game.stage.addChild(this.submarine.sprite);
    this.camera.folow(this.submarine.sprite);
    this.initKeysControl();
    this.initTouchControl();
  }

  initTouchControl() {
    this.touch['left'].press = () => {
      this.submarine.moveLeft();
    }

    this.touch['left'].release = () => {
      this.submarine.vx = 0;
    }

    this.touch['right'].press = () => {
      this.submarine.moveRight();
    }

    this.touch['right'].release = () => {
      this.submarine.vx = 0;
    }

    this.touch['up'].press = () => {
      this.submarine.moveUp();
    }

    this.touch['up'].release = () => {
      this.submarine.vy = 0;
    }

    this.touch['down'].press = () => {
      this.submarine.moveDown();
    }

    this.touch['down'].release = () => {
      this.submarine.vy = 0;
    }
  }

  initKeysControl() {
    this.key['left'].press = () => {
      if (this.key['right'].isUp) {
        this.submarine.moveLeft();
      }
    }

    this.key['left'].release = () => {
      if (this.key['right'].isUp) {
        this.submarine.vx = 0;
      } else {
        this.submarine.moveRight();
      }
    }

    this.key['right'].press = () => {
      if (this.key['left'].isUp) {
        this.submarine.moveRight();
      }
    }

    this.key['right'].release = () => {
      if (this.key['left'].isUp) {
        this.submarine.vx = 0;
      } else {
        this.submarine.moveLeft();
      }
    }

    this.key['up'].press = () => {
      if (this.key['down'].isUp) {
        this.submarine.moveUp();
      }
    }

    this.key['up'].release = () => {
      if (this.key['down'].isUp) {
        this.submarine.vy = 0;
      } else {
        this.submarine.moveDown();
      }
    }

    this.key['down'].press = () => {
      if (this.key['up'].isUp) {
        this.submarine.moveDown();
      }
    }

    this.key['down'].release = () => {
      if (this.key['up'].isUp) {
        this.submarine.vy = 0;
      } else {
        this.submarine.moveUp();
      }
    }
  }

  addSpritesToStage(sprites) {
    sprites.forEach(sprite => {
      this.game.stage.addChild(sprite);
    });
  }

  update(delta) {
    this.submarine.update();
    this.camera.update();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (PlayState);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(0);


class Submarine {
  constructor(texture) {
    this.config = {
      SPEED: 2,
      X_POS: 200,
      Y_POS: 200, 
    }

    this.frames = [
        new PIXI.Rectangle(0, 0, 32, 22),
        new PIXI.Rectangle(32, 0, 32, 22)
    ];

    this.leftSide = new PIXI.Texture(texture, this.frames[1]); 
    this.rightSide = new PIXI.Texture(texture, this.frames[0]);

    this.sprite = new PIXI.Sprite(this.leftSide);
    this.sprite.x = this.config.X_POS;
    this.sprite.y = this.config.Y_POS;

    this.minPos = new PIXI.Point(0, 0);
    this.maxPos = new PIXI.Point(
      __WEBPACK_IMPORTED_MODULE_0__config__["d" /* gameLevel */].WIDTH - this.sprite.width, 
      __WEBPACK_IMPORTED_MODULE_0__config__["d" /* gameLevel */].HEIGHT - this.sprite.height
    );

    this.vx = 0;
    this.vy = 0;
  }

  setPosition(x, y) {
    this.sprite.position.set(x, y);
  }

  update() {
    this.sprite.x += this.vx;
    this.sprite.y += this.vy;
    if (this.sprite.x < this.minPos.x) this.sprite.x = this.minPos.x; 
    if (this.sprite.y < this.minPos.y) this.sprite.y = this.minPos.y;
    if (this.sprite.x > this.maxPos.x) this.sprite.x = this.maxPos.x;
    if (this.sprite.y > this.maxPos.y) this.sprite.y = this.maxPos.y;
  }

  moveRight() {
    this.vx = this.config.SPEED;
    this.sprite.texture = this.rightSide;
  }

  moveLeft() {
    this.vx = -this.config.SPEED;
    this.sprite.texture = this.leftSide;
  }

  moveUp() {
    this.vy = -this.config.SPEED;
  }

  moveDown() {
    this.vy = this.config.SPEED;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Submarine);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprites__ = __webpack_require__(9);


class GameLevel {
  constructor(resources) {
    this.resources = resources;

    this.sprites = __WEBPACK_IMPORTED_MODULE_0__sprites__["a" /* SPRITES */].map(item => {
      const baseTexture = this.resources[item.name].texture;

      const frame = new PIXI.Rectangle(
        item.x,
        item.y,
        item.width,
        item.height
      );
      
      const texture = new PIXI.Texture(baseTexture, frame);
      const sprite = new PIXI.Sprite(texture);
      sprite.x = item.x;
      sprite.y = item.y;

      return sprite;
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (GameLevel);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const SPRITES = [
  //background
  {
    name: 'background',
    x: 0,
    y: 0,
    width: 640, 
    height: 480, 
  },

  //bricks
  {
    name: 'level',
    x: 0,
    y: 464,
    width: 640, 
    height: 16, 
  },

  {
    name: 'level',
    x: 0,
    y: 448,
    width: 16, 
    height: 16, 
  },

  {
    name: 'level',
    x: 192,
    y: 448,
    width: 80, 
    height: 16, 
  },

  {
    name: 'level',
    x: 608,
    y: 448,
    width: 32, 
    height: 16, 
  },

  {
    name: 'level',
    x: 32,
    y: 256,
    width: 80, 
    height: 16, 
  },

  {
    name: 'level',
    x: 224,
    y: 320,
    width: 112, 
    height: 16, 
  },

  {
    name: 'level',
    x: 496,
    y: 384,
    width: 80, 
    height: 16, 
  },

  //mines
  {
    name: 'level',
    x: 16,
    y: 416,
    width: 16, 
    height: 64, 
  },
  {
    name: 'level',
    x: 288,
    y: 288,
    width: 16, 
    height: 32, 
  },
  {
    name: 'level',
    x: 320,
    y: 304,
    width: 16, 
    height: 16, 
  },
  {
    name: 'level',
    x: 560,
    y: 320,
    width: 16, 
    height: 64, 
  },

  //coins
  {
    name: 'level',
    x: 48,
    y: 448,
    width: 14, 
    height: 16, 
  },
  {
    name: 'level',
    x: 207,
    y: 432,
    width: 14, 
    height: 16, 
  },
  {
    name: 'level',
    x: 224,
    y: 432,
    width: 14, 
    height: 16, 
  },

  //harts
  {
    name: 'level',
    x: 64,
    y: 242,
    width: 14, 
    height: 14, 
  },
  {
    name: 'level',
    x: 256,
    y: 306,
    width: 14, 
    height: 14, 
  },

  //oxygen
  {
    name: 'level',
    x: 416,
    y: 400,
    width: 32, 
    height: 64, 
  },

  //diver
  {
    name: 'level',
    x: 512,
    y: 320,
    width: 32, 
    height: 64, 
  },

]
/* harmony export (immutable) */ __webpack_exports__["a"] = SPRITES;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(0);


class Camera {
  constructor(game) {
    this.stage = game.stage;
    this.screen = game.screen;
    this.offset = new PIXI.Point(0, 0);
    this.sprite = null;

    this.minPos = new PIXI.Point(0, 0);
    this.maxPos = new PIXI.Point(
      __WEBPACK_IMPORTED_MODULE_0__config__["d" /* gameLevel */].WIDTH - this.screen.width, 
      __WEBPACK_IMPORTED_MODULE_0__config__["d" /* gameLevel */].HEIGHT - this.screen.height
    );
  }

  folow(sprite) {
    this.sprite = sprite;
    const offsetX = this.screen.width / 2 - this.sprite.width / 2;
    const offsetY = this.screen.height / 2 - this.sprite.height / 2;
    this.offset.set(offsetX, offsetY);
  }

  update() {
    this.stage.x = -this.sprite.x + this.offset.x;
    this.stage.y = -this.sprite.y + this.offset.y;
    if (this.stage.x > this.minPos.x) this.stage.x = this.minPos.x; 
    if (this.stage.y > this.minPos.y) this.stage.y = this.minPos.y;
    if (this.stage.x < -this.maxPos.x) this.stage.x = -this.maxPos.x;
    if (this.stage.y < -this.maxPos.y) this.stage.y = -this.maxPos.y;
  }

}


/* harmony default export */ __webpack_exports__["a"] = (Camera);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export hitTestRect */
function hitTestRect(rect1, rect2) {
  let collided = false;

    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y) {
        collided = true;
    };

  return collided;
}

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map