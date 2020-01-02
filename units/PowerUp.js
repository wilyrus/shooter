import { UniteBase } from './UniteBase.js';

const PowerUp = class extends UniteBase {
    moveSize = 2
    direction = 1
    xPosition = 0
    id = 'target'

    constructor(xPos) {
        super();
        this.el = document.createElement('div');
        this.el.classList.add('powerUp');
        this.el.style.left = xPos;

        document.querySelector('body').appendChild(this.el);
        this.startMoving();
    }

    startMoving() {
        this.intervalId = setInterval(() => {
            if (this.checkOutOfBoundsExceed()) {
                this.yPosition = this.yPosition + this.moveSize;
                this.el.style.transform = `translate(0, ${this.yPosition}px)`;

                if (this.checkIntersection(this.direction === -1 ? facade.shooter : facade.target, this)) {
                    //this.killTarget();
                }
            }
        }, 10);
    }

    checkOutOfBoundsExceed() {
        const isExceed = this.getTop() + this.getHeight() <= 0 || this.getTop() > window.innerHeight;

        if (isExceed) {
            this.el.remove();
            clearInterval(this.intervalId);
            return false;
        }
        return true;
    }
}

export { PowerUp };