class VideoPlayer {
    constructor(htmlIdElement) {
        this.elem = document.getElementById(htmlIdElement);
        this.elem.autoplay = false;
        this.elem.controls = true;
        this.elem.width = 960;
        this.startListening();
    }

    playToggle() {
        if (this.elem.paused) {
            this.elem.play();
        } else {
            this.elem.pause();
        };
    }

    setSrc(src) {
        this.elem.src = src;
    }

    show() {
        this.elem.style = "display: block";
    }

    handleKeyDown(e) {
        switch(e.code) {
            case 'Space':
                this.playToggle();
                break;
            case 'ArrowLeft':
                this.elem.currentTime -= 4;
                break;
            case 'ArrowRight':
                this.elem.currentTime += 4;
                break;
            case 'ArrowUp':
                this.elem.width += 8;
                break;
            case 'ArrowDown':
                this.elem.width -= 8;
                break;
        }
    }

    startListening() {
        this.elem.addEventListener('click', this.playToggle.bind(this));
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }
}

class SourceForm {
    constructor(htmlIdElement) {
        this.elem = document.getElementById(htmlIdElement);
        this.btn = document.getElementById("src-btn");
        this.input = document.getElementById("src-input");
        this.startListening();
    }

    handleClick() {
        const src = this.input.value;
        if (src) {
            this.elem.style = "display: none";
            document.body.style = "background-color: #000;";
            var vplayer = new VideoPlayer("video-player");
            vplayer.setSrc(src);
            vplayer.show();
        }
    }

    startListening() {
        this.btn.addEventListener('click', this.handleClick.bind(this));
    }
}

var form = new SourceForm('src-form');
