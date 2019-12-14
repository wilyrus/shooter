import { UniteBase } from './UniteBase.js';
import { PROJECTILE_TYPES } from '../constants.js';
import { Projectile } from '../projectile.js';

const Shooter = class extends UniteBase {
    constructor(selector) {
        super();
        this.el = document.querySelector(selector);
    }

    move(xPosition, yPosition) {
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
        super.shoot(Projectile, PROJECTILE_TYPES.SELF);
    }
}

export { Shooter };