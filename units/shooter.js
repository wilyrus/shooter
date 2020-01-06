import { UniteBase } from './UniteBase.js';
import { PROJECTILE_TYPES } from '../constants.js';

const Shooter = class extends UniteBase {
    id = 'shooter'
    gunLevel = 1
    auotshoot = false
    selector = 'shooter'
    template = `<div class="cannon"></div><div class="body"></div>`

    constructor() {
        super();

        const newDiv = document.createElement("div");
        newDiv.classList.add(this.selector);
        newDiv.innerHTML = this.template;
        document.body.append(newDiv);
        this.el = newDiv;

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
         super.shoot(PROJECTILE_TYPES.SELF, { moveSize: 5, moveDelay: 2, gunLevel: this.gunLevel }), 1000 - this.gunLevel * 50 > 300 ? 1000 - this.gunLevel * 50  : 300);
    }

    startTrackingMouse = () => {
        document.addEventListener('mousemove', this.move.bind(this));
        document.addEventListener('pointerdown', this.shoot.bind(this));
    }

    kill() {
        super.kill();

        document.removeEventListener('mousemove', this.move);
        document.removeEventListener('pointerdown', this.shoot);
    }

    upgrade() {
        this.gunLevel++;
        this.shoot();
        this.shoot();
    }
}

export { Shooter };