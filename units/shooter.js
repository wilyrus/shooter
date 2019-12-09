import { UniteBase } from './UniteBase.js';
import { PROJECTILE_TYPES } from '../constants.js';

const Shooter = class extends UniteBase {
    constructor(selector) {
        super();
        this.el = document.querySelector(selector);
    }

    move(newCoords) {
        if (this.checkOutOfBoundsExceed(newCoords)) {
            this.el.style.left = newCoords;
        }
    }

    checkOutOfBoundsExceed(newCoords) {
        return newCoords + this.el.getBoundingClientRect().width < window.innerWidth;
    }

    shoot() {
        super.shoot(PROJECTILE_TYPES.SELF);
    }
}

export { Shooter };