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
/* unused harmony export checkCollision */
/* harmony export (immutable) */ __webpack_exports__["a"] = clamp;
/**
 * @param {rectangle} rect1
 * @param {rectangle} rect2
 * @return {boolean} result collision
 */
function checkCollision(rect1, rect2) {
  let collided = false;

  if (rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y) {
    collided = true;
  };

  return collided;
}


/**
 * @param {number} value
 * @param {number} min value
 * @param {number} max value
 * @return {number} clamped value
 */
function clamp(val, min, max) {
  let clamped = val;
  if (val < min) {
    clamped = min;
  } else if (val > max) {
    clamped = max;
  }
  return clamped;
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Game__ = __webpack_require__(2);


const DEFAULT_WIDTH = 512;
const DEFAULT_HEIGHT = 512;

const containerEl = document.getElementById('game-container');
const clientWidth = document.body.clientWidth;
const clientHeight = document.body.clientHeight;

let width = DEFAULT_WIDTH;
let height = DEFAULT_HEIGHT;

if (clientWidth < DEFAULT_WIDTH) {
  width = clientWidth;
} 

if (clientHeight < DEFAULT_HEIGHT) {
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tilemap__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Camera__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Input__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Player__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Physics__ = __webpack_require__(8);








class Game extends PIXI.Application {
  constructor(width, height) {
    super({
      width: width,
      height: height,
      backgroundColor : 0xC9DDA0,
    });
    this.game = this;
    this.camera =new __WEBPACK_IMPORTED_MODULE_1__Camera__["a" /* default */](this.game);
    this.input = new __WEBPACK_IMPORTED_MODULE_2__Input__["a" /* default */]();
    this.tilemap = null;
    this.physics = new __WEBPACK_IMPORTED_MODULE_5__Physics__["a" /* default */](this.game);
    this.update = this.update.bind(this);

    this.preload();
  }

  preload() {
    this.loader.add('submarine', 'assets/submarine_x2.png');
    this.loader.add('map', 'assets/map_32x32.json');
    this.loader.add('tileset', 'assets/tileset_x2.png');

    this.loader.load((loader, resources) => {
      this.init();
    });
  }

  init() {
    this.tilemap = new __WEBPACK_IMPORTED_MODULE_0__Tilemap__["a" /* default */](this.game, 'map', 'tileset');
    this.tilemap.addLayerToStage('background');
    this.tilemap.addLayerToStage('collision');
    this.tilemap.addLayerToStage('coins');

    this.camera.setBounds(0, 0, 512, 512);

    this.player = new __WEBPACK_IMPORTED_MODULE_3__Player__["a" /* default */](this.game, 'submarine');
    this.player.setPosition(20, 56);
    this.player.setBounds(0, 56, 512, 456);

    this.stage.addChild(this.player.sprite);
    this.camera.follow(this.player.sprite);

    //Register a handler for tick events
    this.ticker.add(this.update);
  }

  update() {
    const key = this.input.key;

    //save player position
    const playerPosX = this.player.x;
    const playerPosY = this.player.y;

    if (key.left.isDown) {
      this.player.moveLeft();
    } else if (key.right.isDown) {
      this.player.moveRight();
    }

    this.physics.collidePlayerToLayer(
      this.player, 
      this.tilemap.layers['collision'],
      () => {
        this.player.x = playerPosX;
        this.player.y = playerPosY;
      }
    );

    if (key.up.isDown) {
      this.player.moveUp();
    } else if (key.down.isDown) {
      this.player.moveDown();
    }

    this.physics.collidePlayerToLayer(
      this.player, 
      this.tilemap.layers['collision'],
      () => {
        this.player.y = playerPosY;
      }
    );

    this.physics.collidePlayerToLayer(
      this.player,
      this.tilemap.layers['coins'],
      (coin) => {
        this.tilemap.layers['coins'].removeChild(coin);
      }
    );

    this.camera.update();
    this.player.update();
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Game);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Tilemap {
  constructor(game, mapName, tilesetName) {
    this.game = game;
    this.mapName = mapName;
    this.tilesetName = tilesetName;
    this.tilemap = this;

    // tiled editor data
    this.data = this.game.loader.resources[this.mapName].data;

    this.tileset = this.game.loader.resources[this.tilesetName];

    this.tilewidth = this.data.tilewidth;
    this.tileheight = this.data.tileheight;

    //tileset textures
    this.textures = [];

    this.layers = {};

    this.createTilesetTextures();
  }

  createTilesetTextures() {
    const rows = this.tileset.texture.orig.height / this.tileheight;
    const columns = this.tileset.texture.orig.width / this.tilewidth;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const sourceX = j * this.tilewidth;
        const sourceY = i * this.tileheight;

        const frame = new PIXI.Rectangle(
          sourceX, sourceY, 
          this.tilewidth, this.tileheight
        );

        const texture = new PIXI.Texture(this.tileset.texture, frame);
        this.textures.push(texture);
      }
    }
  }

  addLayerToStage(layerName) {
    const layer = new PIXI.particles.ParticleContainer();
    const layerData = this.getLayerData(layerName);

    for (let i = 0; i < this.data.height; i++) {
      for (let j = 0; j < this.data.width; j++) {
        //get tile index
        const index = j + i * this.data.width;

        const tile = layerData[index];

        if (tile != 0) {
          const texture = this.textures[tile - 1];
          const sprite = new PIXI.Sprite(texture);
          sprite.x = j * this.tilewidth;
          sprite.y = i * this.tileheight;
          layer.addChild(sprite);
        }
      }
    };

    this.layers[layerName] = layer;
    this.game.stage.addChild(layer);
  }

  getLayerData(layerName) {
    let data = null;
    this.data.layers.forEach((item, i) => {
      if (item.name == layerName) {
        data = item.data;
      };
    });
    return data;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Tilemap);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);


class Camera {
  constructor(game) {
    this.game = game;
    this.screen = game.screen;
    this.offset = new PIXI.Point(0, 0);
    this.bounds = null;
    this.target = null;
    this.x = 0;
    this.y = 0;

  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setBounds(x, y, width, height) {
    this.bounds = new PIXI.Rectangle(x, y, width, height);
  }

  follow(target) {
    this.target = target;
    const offsetX = this.screen.width / 2 - this.target.width / 2;
    const offsetY = this.screen.height / 2 - this.target.height / 2;
    this.offset.set(offsetX, offsetY);
  }

  update() {
    if (this.target !== null) {
      this.x = this.target.x - this.offset.x;
      this.y = this.target.y - this.offset.y;
    };
    
    if (this.bounds !== null) {
      const minX = this.bounds.x;
      const minY = this.bounds.y;
      const maxX = this.bounds.x + this.bounds.width - this.screen.width;
      const maxY = this.bounds.y + this.bounds.height - this.screen.height;
      this.x = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* clamp */])(this.x, minX, maxX);
      this.y = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* clamp */])(this.y, minY, maxY);
    }

    this.game.stage.x = -this.x;
    this.game.stage.y = -this.y;
  }

}


/* harmony default export */ __webpack_exports__["a"] = (Camera);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Key__ = __webpack_require__(6);


const keycodes = {
  LEFT: 37, // arrow left
  RIGHT: 39, // arrow right
  UP: 38, // arrow up
  DOWN:40 // arrow down
}

class Input {
  constructor() {
    this.key = {
      left: new __WEBPACK_IMPORTED_MODULE_0__Key__["a" /* default */](keycodes.LEFT),
      right: new __WEBPACK_IMPORTED_MODULE_0__Key__["a" /* default */](keycodes.RIGHT),
      up: new __WEBPACK_IMPORTED_MODULE_0__Key__["a" /* default */](keycodes.UP),
      down: new __WEBPACK_IMPORTED_MODULE_0__Key__["a" /* default */](keycodes.DOWN)
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Input);

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);



class Player {
  constructor(game, imageName) {
    this.game = game;
    this.baseTexture = this.game.loader.resources[imageName].texture;

    this.x = 0;
    this.y = 0;
    this.width = 32;
    this.height = 22;

    this.bounds = null;

    //source frames
    this.frames = [
      new PIXI.Rectangle(0, 0, 32, 22),
      new PIXI.Rectangle(34, 0, 32, 22)
    ];

    this.textures = [
      new PIXI.Texture(this.baseTexture, this.frames[0]),
      new PIXI.Texture(this.baseTexture, this.frames[1])
    ]

    this.frame = 0;
    this.sprite = new PIXI.Sprite(this.textures[this.frame]);

    this.collisionRectangles = {
      LEFT_SIDE: [
        new PIXI.Rectangle (0, 4, 26, 18),
        new PIXI.Rectangle (26, 8, 6, 10),
        new PIXI.Rectangle (10, 0, 6, 4)
      ],
      RIGHT_SIDE: [
        new PIXI.Rectangle (6, 4, 26, 18),
        new PIXI.Rectangle (0, 8, 6, 10),
        new PIXI.Rectangle (16, 0, 6, 4)
      ]
    }

    this.vel = 1.6;

    this.body = this.collisionRectangles.RIGHT_SIDE;

    this.status = null;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setBounds(x, y, width, height) {
    this.bounds = new PIXI.Rectangle(x, y, width, height);
  }

  moveLeft() {
    this.x -= this.vel;
    this.frame = 1;
    this.body = this.collisionRectangles.LEFT_SIDE;
  }

  moveRight() {
    this.x += this.vel;
    this.frame = 0;
    this.body = this.collisionRectangles.RIGHT_SIDE;
  }

  moveUp() {
    this.y -= this.vel;
  }

  moveDown() {
    this.y += this.vel;
  }

  update() {
    if (this.bounds !== null) {
      const minX = this.bounds.x;
      const minY = this.bounds.y;
      const maxX = this.bounds.x + this.bounds.width - this.width;
      const maxY = this.bounds.y + this.bounds.height - this.height;
      this.x = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* clamp */])(this.x, minX, maxX);
      this.y = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* clamp */])(this.y, minY, maxY);
    }

    this.sprite.texture = this.textures[this.frame];
    this.sprite.x = this.x;
    this.sprite.y = this.y;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Player);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Physics {
  constructor(game) {
    this.game = game;
  }

  /**
   * @param {rectangle} rect1
   * @param {rectangle} rect2
   * @return {boolean} result collision
   */
  checkCollision(rect1, rect2) {
    let collided = false;
    if (rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y) {
      collided = true;
    };
    return collided;
  }

  /**
   * @param {Array} rectArray1
   * @param {Array} rectArray2
   * @return {boolean} result collision
   */
  checkForCollision(rectArray1, rectArray2) {
    for (let i = 0; i < rectArray1.length; i++) {
      for (let j = 0; j < rectArray2.length; j++) {
        const rect1 = rectArray1[i];
        const rect2 = rectArray2[j];
        if (this.checkCollision(rect1, rect2)) {
          return true;
        }
      }
    }
  }

  /**
   * @param {player obj} player
   * @param {layer container} layer
   * @param {function} callback
   */
  collidePlayerToLayer(player, layer, callback) {
    const playerBody = player.body;
    const layerTiles = layer.children;

    playerBody.forEach(playerRectangle => {
      layerTiles.forEach(layerTile => {
        const rect1 = new PIXI.Rectangle(
          player.x + playerRectangle.x,
          player.y + playerRectangle.y,
          playerRectangle.width,
          playerRectangle.height
        );
        const rect2 = layerTile;

        if (this.checkCollision(rect1, rect2)) {
          callback(layerTile);
        };
      });
    })
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Physics);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map