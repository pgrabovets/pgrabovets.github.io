(function(){
class Animation {
    /**
     * @param {function} callback wll be run for every update event
     */
    constructor(callback) {
        this.running = false;
        this.callback = callback;
        this.currentTime = 0;
        this.now = 0;
        this.delta = 0;
    }

    updateDeltaTime() {
        this.now = Date.now();
        this.delta = this.now - this.currentTime;
        this.currentTime = this.now;
    }

    update() {
        this.updateDeltaTime();
        if (this.running == true) {
            this.callback();
            requestAnimationFrame(this.update.bind(this));
        }
    }

    start() {
        this.currentTime = Date.now();
        this.running = true;
        this.update();
    }

    stop() {
        this.running = false;
    }
}


class Collapser {
    /**
     * @param {string} html id
     * @param {boolean} colapse html section
     * @param {number} duration in ms
     */
    constructor(htmlElementId, collapsed, duration) {
        this.id = htmlElementId;
        this.el = document.getElementById(this.id);
        if (this.el == null) {
            console.log('Error element did not found');
            return;
        };
        this.el.style.overflow = 'hidden'; 
        this.animation = new Animation(this.update.bind(this));
        this.collapsed = false;

        if (collapsed) {
            this.el.style.height = '0px';
            this.collapsed = true;
        }

        this.duration = duration || 200;

        this.height = 0;
        this.maxH = 0;

    }

    getMaxHeight() {
        let h = this.el.style.height;
        this.el.style.height = null;
        let maxH = this.el.clientHeight;
        this.el.style.height = h;
        return maxH;
    }

    update() {
        if (this.collapsed == false) {
            this.height -= this.maxH / this.duration * this.animation.delta;
            if (this.height <= 0) {
                this.animation.stop();
                this.collapsed = true;
                this.el.style.height = '0px';
            } else {
                this.el.style.height = this.height + 'px';
            }
        } else {
            this.height += this.maxH / this.duration * this.animation.delta;
            if (this.height >= this.maxH) {
                this.animation.stop();
                this.collapsed = false;
                this.el.style.height = null;
            } else {
                this.el.style.height = this.height + 'px';
            }
        }
    }

    show() {
        this.el.style.height = '0px';
        this.maxH = this.getMaxHeight();
        this.animation.start();
    }

    hide() {
        this.height = this.getMaxHeight();
        this.maxH = this.getMaxHeight();
        this.animation.start();
    }

    toggle() {
        if(this.collapsed) {
            this.show();
        } else {
            this.hide();
        };
    }
}

//export class
window['Collapser'] = Collapser;
})();
