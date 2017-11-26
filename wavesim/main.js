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

    drawWave(wave, x, y) {
        const ctx = this.ctx;
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        wave.points.forEach(point => {
            ctx.lineTo(x + point.x, y + point.y);
            ctx.moveTo(x + point.x, y + point.y);
        });
        ctx.closePath();
        ctx.stroke();
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
        this.color = waveConfig.color;
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
}

const width = window.innerWidth;
const height = window.innerHeight;
const canvas = new Canvas('thecanvas', width, height);

const oscillationParam = [
    {amplitude: 12, period: 110, phase: 2},
    {amplitude: 14, period: 68, phase: 0},
    {amplitude: 4, period: 36, phase: 3.14},
    {amplitude: 1, period: 18, phase: 0},
]

const waveConfig = {
    dx: 8,
    dp: 0.04,
    maxWidth: width,
    minWidth: 0,
    color: '#FFF'
}

const wave = new Wave(oscillationParam, waveConfig);
canvas.drawWave(wave, 0, height/2);

const fps = 30;
const msPerFrame = 1000 / fps;

function animate() {
    setTimeout(() => {
        requestAnimationFrame(animate.bind(this));

        wave.update();
        canvas.clear();
        canvas.drawWave(wave, 0, height/2);

    }, msPerFrame);
}

animate();
