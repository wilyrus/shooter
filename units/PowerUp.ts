import { UniteBase } from './UniteBase';
import { PowerUpTypes } from './types';

const PowerUp = class extends UniteBase {
    moveSize = 2
    direction = 1
    xPosition = 0
    id = 'target'
    type: PowerUpTypes

    constructor(xPos: number) {
        super();
        this.el = document.createElement('div');
        this.type = this.getRandomType();
        this.el.classList.add('powerUp');
        this.el.classList.add(this.type);
        this.el.innerHTML = this.getInnerHTML(this.type);
        this.el.style.left = `${xPos}px`;

        document.querySelector('body').appendChild(this.el);
        this.startMoving();
    }

    startMoving() {
        this.actionsIntervals.push( setInterval(() => {
            if (this.checkOutOfBoundsExceed()) {
                this.yPosition = this.yPosition + this.moveSize;
                this.el.style.transform = `translate(0, ${this.yPosition}px)`;

                this.eventEmitter.emit('move', this);
            }
        }, 10));
    }

    getRandomType() {
        let min = 0;
        let max = 2;

        const randomTypeIndex = Math.floor(Math.random() * (max - min + 1) + min);

        switch (randomTypeIndex) {
            case 0: {
                return PowerUpTypes.FlySpeed;
            }
            case 1: {
                return PowerUpTypes.Power;
            }
            case 2: {
                return PowerUpTypes.ShootSpeed;
            }
        }
    }

    getInnerHTML(type: PowerUpTypes) {
        switch (type) {
            case PowerUpTypes.FlySpeed: {
                return 'FS';
            }
            case PowerUpTypes.Power: {
                return 'PW';
            }
            case PowerUpTypes.ShootSpeed: {
                return 'SS';
            }
        }
    }

    intersectedBy() {
        this.kill();
    }
}

export { PowerUp };