import { UniteBase } from './UniteBase';
import { Gun } from './Gun';
import {ProjectileTypes, UniteTypes} from './types';

const Shooter = class extends UniteBase {
    gunLevel = 1
    auotshoot = false
    selector = 'shooter'
    template = `<div class="cannon"></div><div class="body"></div>`
    type = ProjectileTypes.Self
    gun: any //todo fix
    uniteType = UniteTypes.Player
    width = 150
    height = 30

    constructor() {
        super();

        const newDiv = document.createElement("div");
        newDiv.classList.add(this.selector);
        newDiv.innerHTML = this.template;
        document.body.append(newDiv);
        this.el = newDiv;
        this.gun = new Gun(this.type);

        this.startTrackingMouse();
    }

    move(event: PointerEvent) {
        const xPosition = event.clientX;
        const yPosition = event.clientY;

        if (this.checkOutOfBoundsExceed(xPosition, yPosition)) {
            this.xPosition = xPosition;
            this.yPosition = yPosition;

            this.el.style.transform = `translate(${this.xPosition}px, ${this.yPosition}px)`;
            this.eventEmitter.emit('move', this);
        }
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
        this.gun.destroy();
        this.gun = null;

        document.removeEventListener('mousemove', this.move);
        document.removeEventListener('pointerdown', this.shoot);

        super.kill();
    }

    upgrade(powerUp: any) { //todo fix
        this.gun.upgrade(powerUp.type);
    }
}

export { Shooter };
