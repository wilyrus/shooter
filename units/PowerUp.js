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

                if (this.checkIntersection(facade.shooter, this)) {
                    this.kill();
                    facade.shooter.upgrade(this);
                }
            }
        }, 10);
        this.actionsIntervals.push(this.intervalId);
    }
}

export { PowerUp };