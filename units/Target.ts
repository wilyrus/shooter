import { UniteBase } from './UniteBase';
import { ProjectileTypes } from './types';
import { Gun } from './Gun';

const Target = class extends UniteBase {
    moveSize = 5
    direction = 1
    xPosition = 0
    id = 'target'
    selector= 'target'
    template = ''
    type = ProjectileTypes.Enemy
    gun: any //todo fix

    constructor() {
        super();
        const newDiv = document.createElement("div");
        newDiv.classList.add(this.selector);
        newDiv.innerHTML = this.template;
        document.body.append(newDiv);
        this.el = newDiv;
        this.gun = new Gun(this.type);

        this.startMoving();
        this.gun.startShoot(this);
    }

    startMoving() {
        const moveInterval = setInterval(() => {
            this.direction = Math.floor(Math.random() * 10) % 2 === 0 ? this.direction * 1 : this.direction * -1;
        }, 800);

        const shootInterval = setInterval(() => {
            if (this.checkOutOfBoundsExceed()) {
                this.xPosition = this.xPosition + this.moveSize * this.direction;
                this.el.style.transform = `translate(${this.xPosition}px, 0)`;
                this.eventEmitter.emit('move', this);
            } else {
                this.direction *= -1;
            }
        }, 1);

        this.actionsIntervals.push(moveInterval, shootInterval);
    }

    intersectedBy(target: any) {
        switch (target.type) {
            case 'SelfProjectail': this.kill;
        }
    }

    checkOutOfBoundsExceed() {
        if (this.direction === 1) {
            return this.moveSize + this.el.getBoundingClientRect().width + this.xPosition < window.innerWidth;
        }
        return this.el.getBoundingClientRect().width + this.xPosition - this.moveSize > 0;
    }
}

export { Target };