import { PROJECTILE_TYPES } from './constants.js';
import { UniteBase } from './units/UniteBase.js';

const Projectile = class extends UniteBase {
    selector = 'projectile'
    template =  "<div></div>"
    moveSize = 20
    direction = 1
    intervalId = ''

    constructor(coords, projectileType) {
        super();
        if (projectileType === PROJECTILE_TYPES.ENEMY) {
            this.direction = -1;
        }
        const newDiv = document.createElement("div");
        newDiv.classList.add(this.selector);
        newDiv.innerHTML = this.template;
        newDiv.style.left = coords.x;
        newDiv.style.top = coords.y;
        document.body.append(newDiv);
        this.el = newDiv;
        this.startMoving();
    }

    startMoving() {
        this.intervalId = setInterval(() => {
            if (this.checkOutOfBoundsExceed()) {
                this.yPosition = this.yPosition + this.moveSize * this.direction * -1;
                this.el.style.transform = `translate(0, ${this.yPosition}px)`;

                if (this.checkIntersection(this.direction === -1 ? facade.shooter : facade.target, this)) {
                    this.killTarget();
                }
            }
        }, 15);
    }

    checkOutOfBoundsExceed() {
        const isExceed = this.el.getBoundingClientRect().height + this.el.getBoundingClientRect().top <= 0;

        if (isExceed) {
            this.el.remove();
            clearInterval(this.intervalId);
            return false;
        }
        return true;
    }

    killTarget() {
        this.direction === -1 ? facade.shooter.kill() : facade.target.kill();
    }
}

export { Projectile };