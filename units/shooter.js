import { UniteBase } from './UniteBase.js';
import { Gun } from './Gun.js';
import { PROJECTILE_TYPES } from '../constants.js';

const Shooter = class extends UniteBase {
    id = 'shooter'
    gunLevel = 1
    auotshoot = false
    selector = 'shooter'
    template = `<div class="cannon"></div><div class="body"></div>`
    projectileType = PROJECTILE_TYPES.SELF

    constructor() {
        super();

        const newDiv = document.createElement("div");
        newDiv.classList.add(this.selector);
        newDiv.innerHTML = this.template;
        document.body.append(newDiv);
        this.el = newDiv;
        this.gun = new Gun(this.projectileType);

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
            this.gun.startShoot(this);
        } else {
            this.gun.stopShoot();
        }
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

    upgrade(powerUp) {
        this.gun.upgrade(powerUp.type);
    }
}

export { Shooter };