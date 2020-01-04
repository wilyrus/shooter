import { UniteBase } from './UniteBase.js';
import { PROJECTILE_TYPES } from '../constants.js';

const Shooter = class extends UniteBase {
    id = 'shooter'

    constructor(selector) {
        super();
        this.el = document.querySelector(selector);
        this.startTrackingMouse();
    }

    move(event) {
        const xPosition = event.clientX;
        const yPosition = event.clientY;

        if (this.checkOutOfBoundsExceed(xPosition, yPosition)) {
            this.xPosition = xPosition;
            this.yPosition = yPosition;

            this.el.style.transform = `translate(${this.xPosition}px, ${this.yPosition}px)`;
        }
    }

    checkOutOfBoundsExceed(newCoords) {
        return newCoords + this.el.getBoundingClientRect().width < window.innerWidth;
    }

    shoot() {
        this.auotshoot = !this.auotshoot;
        if (this.auotshoot) {
            this.toggleAutoShoot();
        } else {
            clearInterval(this.auotshootInterval)
        }
    }

    toggleAutoShoot() {
        this.auotshootInterval = setInterval(() =>
         super.shoot(PROJECTILE_TYPES.SELF, { moveSize: 5, moveDelay: 2 }), 1000);
    }

    startTrackingMouse = () => {
        document.addEventListener('mousemove', this.move.bind(this));
        document.addEventListener('pointerdown', this.shoot.bind(this));
    }

    kill() {
        super.kill();

        document.addEventListener('mousemove', this.move);
        document.addEventListener('pointerdown', this.shoot);
    }
}

export { Shooter };