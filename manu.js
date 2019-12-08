const Menu = class {
    constructor(selector) {
        this.el = document.querySelector(selector);
    }

    move(newCoords) {
        if (this.checkOutOfBoundsExceed(newCoords)) {
            this.el.style.left = newCoords;
        }
    }

    speedUpProjectail(newCoords) {
        return newCoords + this.el.getBoundingClientRect().width < window.innerWidth;
    }

    speedDownProjectail() {
        const proj = new Projectile(this.getShootPoint());
    }

    getShootPoint() {
        const leftCenter = this.el.getBoundingClientRect().left + this.el.getBoundingClientRect().width / 2;

        return { x: leftCenter, y: 0 };
    }
}

export { Menu };