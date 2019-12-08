import { Projectile } from './projectile.js';

const Shooter = class {
    constructor(selector) {
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
        const proj = new Projectile(this.getShootPoint());
    }

    getShootPoint() {
        const leftCenter = this.el.getBoundingClientRect().left + this.el.getBoundingClientRect().width / 2;

        return { x: leftCenter, y: 0 };
    }
}

export { Shooter };