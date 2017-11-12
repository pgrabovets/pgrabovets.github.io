'use strict';

Pomodoro.htmlElementId = {
    CANVAS: 'thecanvas',
    BUTTON: 'control-btn',
    AUDIO: 'sound',
}

Pomodoro.classes = {
    PLAY: 'fa fa-play fa-lg',
    PAUSE: 'fa fa-pause fa-lg',
}

Pomodoro.config = {
    WORK_TIME: 25 * 60,
    BREAK_TIME: 5 * 60,
}

Pomodoro.states = {
    WORK: 'working',
    SHORT_BREAK: 'short break',
}

Pomodoro.circle = {
    RADIUS: 160,

    LINE_WIDTH: 6,

    COLORS: [
        'rgba(0,0,0,.1)', 
        '#fff'
    ],

    START_ANGLE: -0.5 * Math.PI,
}

function Pomodoro() {
    this.canvas = document.getElementById(Pomodoro.htmlElementId.CANVAS);
    this.ctx = this.canvas.getContext('2d');
    this.controlBtn = document.getElementById(Pomodoro.htmlElementId.BUTTON);
    this.sound = document.getElementById(Pomodoro.htmlElementId.AUDIO);
    this.timer = null;
    this.counter = 0;
    this.countDownTime = null;
    this.working = false;
    this.state = null;
    this.circlePos = {};
    this.init();
}

Pomodoro.prototype = {

    init: function() {
        this.ctx.lineWidth = Pomodoro.circle.LINE_WIDTH;
        this.circlePos.x = this.canvas.width / 2;
        this.circlePos.y = this.canvas.height / 2;

        this.startListening();
        this.setState(Pomodoro.states.WORK);
        this.draw();
    },

    statrTimer: function() {
        this.timer = setInterval((function() {
            this.counter -= 1;

            if (this.counter <= 0) {
                this.sound.play();
                this.stopTimer();

                if (this.state == Pomodoro.states.WORK) {
                    this.setState(Pomodoro.states.SHORT_BREAK);
                } else if (this.state == Pomodoro.states.SHORT_BREAK) {
                    this.setState(Pomodoro.states.WORK);
                };
            };

            this.draw();

        }).bind(this), 1000);

        this.working = true;
        this.controlBtn.firstChild.className = Pomodoro.classes.PAUSE;
    },

    stopTimer: function() {
        clearInterval(this.timer);
        this.working = false;
        this.controlBtn.firstChild.className = Pomodoro.classes.PLAY;
    },

    draw: function() {
        var startAngle = Pomodoro.circle.START_ANGLE;
        var endAngle = ( 2 * Math.PI - this.counter / this.countDownTime * 2 * Math.PI) + startAngle;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //sraw fone sircle
        this.ctx.strokeStyle = Pomodoro.circle.COLORS[0];
        this.ctx.beginPath();
        this.ctx.arc(this.circlePos.x, this.circlePos.y, Pomodoro.circle.RADIUS, 
            0, 2 * Math.PI);
        this.ctx.stroke();

        //draw time sircle
        this.ctx.strokeStyle = Pomodoro.circle.COLORS[1];
        this.ctx.beginPath();
        this.ctx.arc(this.circlePos.x, this.circlePos.y, Pomodoro.circle.RADIUS, 
            startAngle, endAngle);
        this.ctx.stroke();

        //draw time
        var min = Math.floor(this.counter / 60);
        var sec = this.counter % 60;

        if (sec >= 60) sec = 0;

        if (min < 10) min = '0' + min;
            else min = min;
        if (sec < 10) sec = '0' + sec;
            else sec = sec;

        this.ctx.fillStyle = '#fff';
        this.ctx.textAlign = "center";
        this.ctx.font = '56px sans';
        this.ctx.fillText(min + ":" + sec, this.circlePos.x, this.circlePos.y);

        this.ctx.font = '20px sans';
        this.ctx.fillText(this.state, this.circlePos.x, this.circlePos.y + 36);
    },

    startListening: function() {
        this.controlBtn.addEventListener('click', (function(e) {
            e.preventDefault();

            if (this.working) {
                //timer is working
                this.stopTimer();
            } else {
                //timer stoped
                this.statrTimer();
            };

        }).bind(this));
    },

    setState: function(state) {
        this.state = state;
        if (this.state == Pomodoro.states.WORK) {
            this.countDownTime = Pomodoro.config.WORK_TIME;
            this.counter = Pomodoro.config.WORK_TIME;
        } else if (this.state == Pomodoro.states.SHORT_BREAK) {
            this.countDownTime = Pomodoro.config.BREAK_TIME;
            this.counter = Pomodoro.config.BREAK_TIME;
        };
    },
}

var pomodoro = new Pomodoro();
