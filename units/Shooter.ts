import { UniteBase } from './UniteBase';
import { Gun } from './Gun';
import { ProjectileTypes } from './types';

const Shooter = class extends UniteBase {
    id = 'shooter'
    gunLevel = 1
    auotshoot = false
    selector = 'shooter'
    template = `<div class="cannon"></div><div class="body"></div>`
    type = ProjectileTypes.Self
    gun: any //todo fix

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
        super.kill();

        document.removeEventListener('mousemove', this.move);
        document.removeEventListener('pointerdown', this.shoot);
    }

    intersectedBy(target: any) {
        switch (target.type) {
            case 'PowerUp': this.upgrade(target);
            case 'EnemyProjectail': this.kill;
        }
    }

    upgrade(powerUp: any) { //todo fix
        this.gun.upgrade(powerUp.type);
    }
}

export { Shooter };