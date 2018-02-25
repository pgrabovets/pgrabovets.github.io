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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Tilemap {
  constructor(game, mapName, tilesetName) {
    this.game = game;
    this.mapName = mapName;
    this.tilesetName = tilesetName;

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
/* 1 */
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Game__ = __webpack_require__(3);


const DEFAULT_WIDTH = 512;
const DEFAULT_HEIGHT = 512;

const containerEl = document.getElementById('game-container');

let width = DEFAULT_WIDTH;
let height = DEFAULT_HEIGHT;

const game = new __WEBPACK_IMPORTED_MODULE_0__Game__["a" /* default */](width, height);
containerEl.appendChild(game.view);

containerEl.style.width = width + 'px';
containerEl.style.height = height + 'px';


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Input__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__StateManager__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PlayState__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__GameOverState__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__GameWaitState__ = __webpack_require__(14);







class Game extends PIXI.Application {
  constructor(width, height) {
    super({
      width: width,
      height: height,
      backgroundColor : 0xC9DDA0,
    });
    this.game = this;
    this.input = new __WEBPACK_IMPORTED_MODULE_0__Input__["a" /* default */]();
    this.stateManager = new __WEBPACK_IMPORTED_MODULE_1__StateManager__["a" /* default */](this.game);

    this.update = this.update.bind(this);
    this.preload();
  }

  preload() {
    this.loader.add('submarine', 'assets/submarine_x2.png');
    this.loader.add('gameover', 'assets/gameover_x2.png');
    this.loader.add('gamewait', 'assets/gamewait_x2.png');
    this.loader.add('mine', 'assets/mine_x2.png');
    this.loader.add('oxygen', 'assets/oxygen_x2.png');

    this.loader.add('map1', 'assets/map1.json');
    this.loader.add('map2', 'assets/map2.json');
    
    this.loader.add('tileset', 'assets/tileset_x2.png');

    this.loader.add('level1', 'assets/level1.json');
    this.loader.add('level2', 'assets/level2.json');

    this.loader.load((loader, resources) => {
      this.init();
    });
  }

  init() {
    //Register a handler for tick events
    this.ticker.add(this.update);
    
    this.stateManager.add('play', new __WEBPACK_IMPORTED_MODULE_2__PlayState__["a" /* default */](this.game));
    this.stateManager.add('gameover', new __WEBPACK_IMPORTED_MODULE_3__GameOverState__["a" /* default */](this.game));
    this.stateManager.add('gamewait', new __WEBPACK_IMPORTED_MODULE_4__GameWaitState__["a" /* default */](this.game));
    this.stateManager.start('gamewait');
  }

  update() {
    this.stateManager.current.update();
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Game);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Key__ = __webpack_require__(5);


const keycodes = {
  LEFT: 37, // arrow left
  RIGHT: 39, // arrow right
  UP: 38, // arrow up
  DOWN: 40, // arrow down
  ENTER: 13
}

class Input {
  constructor() {
    this.key = {
      left: new __WEBPACK_IMPORTED_MODULE_0__Key__["a" /* default */](keycodes.LEFT),
      right: new __WEBPACK_IMPORTED_MODULE_0__Key__["a" /* default */](keycodes.RIGHT),
      up: new __WEBPACK_IMPORTED_MODULE_0__Key__["a" /* default */](keycodes.UP),
      down: new __WEBPACK_IMPORTED_MODULE_0__Key__["a" /* default */](keycodes.DOWN),
      enter: new __WEBPACK_IMPORTED_MODULE_0__Key__["a" /* default */](keycodes.ENTER)
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Input);

/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class StateManager {
  constructor(game) {
    this.game = game;
    this.current = null;
    this.states = {};
  }

  add(key, state) {
    this.states[key] = state;
  }

  remove(key) {
    delete this.states[key];
  }

  start(key) {
    this.current = this.states[key];
    this.current.init();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (StateManager);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tilemap__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Camera__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Physics__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Player__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Mine__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__OxygenPanel__ = __webpack_require__(12);








class PlayState {
  constructor(game) {
    this.game = game;
    this.camera = new __WEBPACK_IMPORTED_MODULE_1__Camera__["a" /* default */](this.game);
    this.camera.setBounds(0, 0, 512, 512);
    this.physics = new __WEBPACK_IMPORTED_MODULE_2__Physics__["a" /* default */](this.game);
    this.tilemap = null;
    this.player = null;
    this.entity = null;
    this.level = 'level1';
    this.levelData = null;

    this.crashed = false;
  }

  init() {
    this.levelData = this.getLevelData(this.level);
    this.crashed = false;
    this.entity = [];
    this.createTilemap();
    this.createMines();
    this.createPlayer();

    this.oxygenPanel = new __WEBPACK_IMPORTED_MODULE_5__OxygenPanel__["a" /* default */](this.game);
  }

  getLevelData(levelName) {
    const loader = this.game.loader;
    const data = loader.resources[levelName].data;
    return data;
  }

  createPlayer() {
    const player = this.levelData.entity.player;

    this.player = new __WEBPACK_IMPORTED_MODULE_3__Player__["a" /* default */](this.game, 'submarine');
    this.player.setPosition(player.x, player.y);
    this.player.setBounds(
      player.bounds.x, 
      player.bounds.y, 
      player.bounds.width, 
      player.bounds.height
    );
    this.game.stage.addChild(this.player.sprite);
    this.camera.follow(this.player.sprite);
  }

  createTilemap() {
    const mapName = this.levelData.map.name;
    const tilesetName = this.levelData.map.tileset;
    this.tilemap = new __WEBPACK_IMPORTED_MODULE_0__Tilemap__["a" /* default */](this.game, mapName, tilesetName);

    this.tilemap.data.layers.forEach((layer) => {
      if (layer.visible == true) {
        this.tilemap.addLayerToStage(layer.name);
      }
    });
  }

  createMines() {
    // create mines
    this.levelData.entity.mines.forEach((item) => {
      const mine = new __WEBPACK_IMPORTED_MODULE_4__Mine__["a" /* default */](this.game, item.name);
      mine.setPosition(item.x, item.y);
      mine.setBounds(
        item.bounds.x, 
        item.bounds.y, 
        item.bounds.width, 
        item.bounds.height
      );
      mine.direction.x = item.direction.x;
      mine.direction.y = item.direction.y;

      mine.vel.x = item.vel.x;
      mine.vel.y = item.vel.y;
      mine.moving = item.moving;

      this.entity.push(mine);
    });

    //add all entuty to the game stage
    this.entity.forEach((item) => {
      this.game.stage.addChild(item.sprite);
    });

  }

  nextLevel() {
    if (this.levelData.next_level) {
      this.level = this.levelData.next_level;
      this.game.stage.destroy();
      this.game.stage = new PIXI.Container();
      this.init();
    }
  }

  gameOver() {
    this.crashed = true;
    this.game.stateManager.start('gameover');
  }

  update() {
    const key = this.game.input.key;

    if (key.left.isDown) {
      this.player.moveLeft();
    } else if (key.right.isDown) {
      this.player.moveRight();
    }

    this.physics.collidePlayerToLayer(
      this.player, 
      this.tilemap.layers['collision'],
      () => {
        this.player.x = this.player.previousPos.x;
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
        this.player.y = this.player.previousPos.y;
      }
    );

    this.physics.collidePlayerToLayer(
      this.player,
      this.tilemap.layers['coins'],
      (coin) => {
        this.tilemap.layers['coins'].removeChild(coin);
        const coins = this.tilemap.layers['coins'].children;
        if (coins.length == 0) {
          this.nextLevel();
        }
      }
    );

    this.physics.collidePlayerToArray(
      this.player, 
      this.entity, 
      (entity) => {
        this.gameOver();
      }
    );


    if (this.player.y > 60) {
      this.oxygenPanel.value -= 0.1;
    } else if (this.player.y <= 60) {
      this.oxygenPanel.value += 0.666;
    }
    

    if (!this.crashed) {
      this.camera.update();
      this.player.update();

      this.entity.forEach((item) => {
        item.update();
      });

      this.oxygenPanel.update();
    }

  }
}

/* harmony default export */ __webpack_exports__["a"] = (PlayState);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);


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
/* 9 */
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
   * @param {player obj} rectArray1
   * @param {Array} entityArray
   * @param {function} callback
   */
  collidePlayerToArray(player, entityArray, callback) {
    player.body.forEach(playerRectangle => {
      entityArray.forEach(entity => {
        const rect1 = new PIXI.Rectangle(
          player.x + playerRectangle.x,
          player.y + playerRectangle.y,
          playerRectangle.width,
          playerRectangle.height
        );
        const rect2 = new PIXI.Rectangle(
          entity.x + entity.body.x,
          entity.y + entity.body.y,
          entity.body.width,
          entity.body.height
        );

        if (this.checkCollision(rect1, rect2)) {
          callback(entity);
        };
      });
    })
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

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);



class Player {
  constructor(game, imageName) {
    this.game = game;
    this.baseTexture = this.game.loader.resources[imageName].texture;

    this.x = 0;
    this.y = 0;
    this.width = 32;
    this.height = 22;

    this.previousPos = null;

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

    this.vel = new PIXI.Point(0, 0);
    this.maxVel = 0.6
    this.accel = 0.04;
    this.friction = 0.01;
    this.direction = new PIXI.Point(0, 0);

    this.body = [
      new PIXI.Rectangle(0, 4, 32, 18),
      new PIXI.Rectangle(10, 0, 12, 4)
    ];

    this.status = null;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    this.sprite.x = x;
    this.sprite.y = y;
  }

  setBounds(x, y, width, height) {
    this.bounds = new PIXI.Rectangle(x, y, width, height);
  }

  updateXPos() {
    if (Math.abs(this.vel.x) < this.maxVel) {
      this.vel.x += this.accel * this.direction.x;
    }
    this.x += this.vel.x;
  }

  updateYPos() {
    if (Math.abs(this.vel.y) < this.maxVel) {
      this.vel.y += this.accel * this.direction.y;
    }
    this.y += this.vel.y;
  }

  moveLeft() {
    this.frame = 1;
    this.direction.x = -1;
    this.updateXPos();
  }

  moveRight() {
    this.frame = 0;
    this.direction.x = 1;
    this.updateXPos();
  }

  moveUp() {
    this.direction.y = -1;
    this.updateYPos();
  }

  moveDown() {
    this.direction.y = 1;
    this.updateYPos();
  }

  decelerate() {
    if (this.vel.x > 0) {
      this.vel.x -= this.friction;
      if (this.vel.x < 0) {
        this.vel.x = 0;
      }
    } else if (this.vel.x < 0) {
      this.vel.x += this.friction;
      if (this.vel.x > 0) {
        this.vel.x = 0;
      }
    }

    if (this.vel.y > 0) {
      this.vel.y -= this.friction;
      if (this.vel.y < 0) {
        this.vel.y = 0;
      }
    } else if (this.vel.y < 0) {
      this.vel.y += this.friction;
      if (this.vel.y > 0) {
        this.vel.y = 0;
      }
    }
  }

  update() {
    this.decelerate();
    this.x += this.vel.x;
    this.y += this.vel.y;
    

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

    this.previousPos = {
      x: this.x,
      y: this.y
    }

  }
}

/* harmony default export */ __webpack_exports__["a"] = (Player);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Mine {
  constructor(game, imageName) {
    this.game = game;
    this.baseTexture = this.game.loader.resources[imageName].texture;
    this.sprite = new PIXI.Sprite(this.baseTexture);
    this.x = 0;
    this.y = 0;
    this.width = 16;
    this.height = 16;
    this.moving = false;
    this.bounds = null;
    this.direction = new PIXI.Point(0, 0);
    this.vel = new PIXI.Point(0, 0);
    this.body = new PIXI.Rectangle(1, 1, 15, 15);
  }

  setBounds(x, y, width, height) {
    this.bounds = new PIXI.Rectangle(x, y, width, height);
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    this.sprite.x = x;
    this.sprite.y = y;
  }

  update() {
    if (this.moving) {
      if (this.bounds !== null) {
        const minX = this.bounds.x;
        const minY = this.bounds.y;
        const maxX = this.bounds.x + this.bounds.width - this.width;
        const maxY = this.bounds.y + this.bounds.height - this.height;

        if (this.x <= minX) {
          this.direction.x = 1;
        } else if (this.x >= maxX) {
          this.direction.x = -1;
        }

        if (this.y <= minY) {
          this.direction.y = 1;
        } else if (this.y >= maxY) {
          this.direction.y = -1;
        }
      }

      this.x += this.vel.x * this.direction.x;
      this.y += this.vel.y * this.direction.y;
      this.sprite.x = this.x;
      this.sprite.y = this.y;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Mine);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class OxygenPanel {
  constructor(game) {
    this.game = game;
    this.elements = new PIXI.Container();
    this.elements.x = 4;
    this.elements.y = 4;

    this.barPos = new PIXI.Point(50, 0);
    this.barHeight = 10;
    this.barWidth = 200;

    this.value = this.barWidth;

    this.color = 0x306230;
    this.color2 = 0x7d9e03

    this.createText();
    this.createBarBackground();
    this.createBar();

    this.game.stage.addChild(this.elements);
    
  }

  createText() {
    this.oxygenText = new PIXI.Sprite.fromImage('oxygen');
    this.oxygenText.x = 0;
    this.oxygenText.y = 0;
    this.elements.addChild(this.oxygenText);
  }

  createBarBackground() {
    this.barBackground = new PIXI.Graphics();
    this.barBackground.x = this.barPos.x;
    this.barBackground.y = this.barPos.y;
    this.barBackground.beginFill(this.color2);
    this.barBackground.drawRect(0, 0, this.barWidth, this.barHeight);
    this.barBackground.endFill();
    this.elements.addChild(this.barBackground);
  }

  createBar() {
    this.bar = new PIXI.Graphics();
    this.bar.x = this.barPos.x;
    this.bar.y = this.barPos.y;
    this.bar.beginFill(this.color);
    this.bar.drawRect(0, 0, this.value, this.barHeight);
    this.bar.endFill();
    this.elements.addChild(this.bar);
  }

  update() {
    if (this.value > this.barWidth) {
      this.value = this.barWidth;
    }

    if (this.value < 0) {
      this.value = 0;
    }

    this.barBackground.clear();
    this.barBackground.beginFill(this.color2);
    this.barBackground.drawRect(0, 0, this.barWidth, this.barHeight);
    this.barBackground.endFill();

    this.bar.clear();
    this.bar.beginFill(this.color);
    this.bar.drawRect(0, 0, this.value, this.barHeight);
    this.bar.endFill();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (OxygenPanel);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GameOverState {
  constructor(game) {
    this.game = game;
    this.texture = this.game.loader.resources['gameover'].texture;
    this.gameover = new PIXI.Sprite(this.texture);
  }

  init() {
    const halfScreenWidth = this.game.screen.width / 2;
    const halfScreenHeight = this.game.screen.height / 2;
    const halfTextureWidht = this.texture.width / 2;
    const halfTextureHeight = this.texture.height / 2;
    this.gameover.x = halfScreenWidth - halfTextureWidht;
    this.gameover.y = halfScreenHeight - halfTextureHeight;
    this.game.stage.addChild(this.gameover);
  }

  update() {
    const key = this.game.input.key;

    if (key.enter.isDown) {
      this.game.stage.destroy();
      this.game.stage = new PIXI.Container();
      this.game.stateManager.start('play');
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (GameOverState);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tilemap__ = __webpack_require__(0);



class GameWaitState {
  constructor(game) {
    this.game = game;
    this.texture = this.game.loader.resources['gamewait'].texture;
    this.sprite = new PIXI.Sprite(this.texture);
    this.tilemap = null;
    this.level = 'level1';
    this.levelData = null;
  }

  init() {
    this.levelData = this.getLevelData(this.level);
    this.createTilemap();
    this.createText();
  }

  getLevelData(levelName) {
    const loader = this.game.loader;
    const data = loader.resources[levelName].data;
    return data;
  }

  createTilemap() {
    const mapName = this.levelData.map.name;
    const tilesetName = this.levelData.map.tileset;
    this.tilemap = new __WEBPACK_IMPORTED_MODULE_0__Tilemap__["a" /* default */](this.game, mapName, tilesetName);

    this.tilemap.data.layers.forEach((layer) => {
      if (layer.visible == true) {
        this.tilemap.addLayerToStage(layer.name);
      }
    });
  }

  createText() {
    const halfScreenWidth = this.game.screen.width / 2;
    const halfScreenHeight = this.game.screen.height / 2;
    const halfTextureWidht = this.texture.width / 2;
    const halfTextureHeight = this.texture.height / 2;

    this.sprite.x = halfScreenWidth - halfTextureWidht;
    this.sprite.y = halfScreenHeight - halfTextureHeight;

    this.game.stage.addChild(this.sprite);
  }

  update() {
    const key = this.game.input.key;

    if (key.enter.isDown) {
      this.game.stage.destroy();
      this.game.stage = new PIXI.Container();
      this.game.stateManager.start('play');
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (GameWaitState);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map