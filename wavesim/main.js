class Canvas {
    constructor(id, w, h) {
        this.htmlElementId = id;
        this.width = w;
        this.height = h;
        this.el = document.getElementById(this.htmlElementId);
        this.ctx = this.el.getContext("2d");
        this.el.width = this.width;
        this.el.height = this.height;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Wave {
	constructor(oscilParam, waveConfig) {
		this.oscilParam = oscilParam;
		this.dx = waveConfig.dx;
		this.dp = waveConfig.dp;
		this.phase = 0;
		this.minWidth = waveConfig.minWidth;
		this.maxWidth = waveConfig.maxWidth;
		this.points = [];

		this.initPoints();
	}

	initPoints() {
		for (let x = this.minWidth; x < this.maxWidth; x+= this.dx) {
			let sumY = this.oscilParam.reduce((sum, item) => {
				const y = item.amplitude * Math.sin(-x/item.period + item.phase);
				return sum + y;
			}, 0);
			this.points.push(new Point(x, sumY));
		}
	}

	update() {
		this.phase += this.dp;
		this.points = this.points.map(item => {
			let x = item.x;
			let sumY = this.oscilParam.reduce((sum, item) => {
				const y = item.amplitude * Math.sin(-x/item.period + item.phase + this.phase);
				return sum + y;
			}, 0);
			return new Point(x, sumY);
		});
	}

	draw(canvas, x, y, color) {
		canvas.ctx.strokeStyle = color;
		canvas.ctx.lineWidth = 2;
		canvas.ctx.beginPath();
		this.points.forEach(point => {
			canvas.ctx.lineTo(x + point.x, y + point.y);
			canvas.ctx.moveTo(x + point.x, y + point.y);
		});
		canvas.ctx.closePath();
		canvas.ctx.stroke();
	}
}

const width = window.innerWidth;
const height = window.innerHeight;
const canvas = new Canvas('thecanvas', width, height);

const oscillationParam = [
	{amplitude: 10, period: 110, phase: 2},
	{amplitude: 24, period: 68, phase: 0},
	{amplitude: 3, period: 38, phase: 3.14},
	{amplitude: 1, period: 20, phase: 0},
]

const waveConfig = {
	dx: 8,
	dp: 0.04,
	maxWidth: width,
	minWidth: 0
}

const wave = new Wave(oscillationParam, waveConfig);
wave.draw(canvas, 0, height/2, '#fff');

const fps = 30;
const msPerFrame = 1000 / fps;

function animate() {
	setTimeout(() => {
	    requestAnimationFrame(animate.bind(this));

	    canvas.clear();
		wave.update();
		wave.draw(canvas, 0, height/2, '#fff');

	}, msPerFrame);
}

animate();
