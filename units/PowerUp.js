import { UniteBase } from './UniteBase.js';

const PowerUp = class extends UniteBase {
    moveSize = 2
    direction = 1
    xPosition = 0
    id = 'target'

    constructor(xPos) {
        super();
        this.el = document.createElement('div');
        this.type = this.getRandomType();
        this.el.classList.add('powerUp');
        this.el.classList.add(this.type);
        this.el.innerHTML = this.getInnerHTML(this.type);
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

    getRandomType() {
        let min = 0;
        let max = 2;

        const randomTypeIndex = Math.floor(Math.random() * (max - min + 1) + min);

        switch (randomTypeIndex) {
            case 0: {
                return 'flySpeed';
            }
            case 1: {
                return 'power';
            }
            case 2: {
                return 'shootSpeed';
            }
        }
    }

    getInnerHTML(type) {
        switch (type) {
            case 'flySpeed': {
                return 'FS';
            }
            case 'power': {
                return 'PW';
            }
            case 'shootSpeed': {
                return 'SS';
            }
        }
    }
}

export { PowerUp };