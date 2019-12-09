import { PROJECTILE_TYPES } from './constants.js';

const Projectile = class {
    selector = 'projectile'
    template =  "<div></div>"
    moveSize = 20
    direction = 1
    intervalId = ''
    xPosition = 0

    constructor(coords, projectileType) {
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
                this.xPosition = this.xPosition + this.moveSize * this.direction * -1;
                this.el.style.transform = `translate(0, ${this.xPosition}px)`;

                if (this.checkIntersection()) {
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

    checkIntersection() {
        let target = this.direction === -1 ? facade.shooter : facade.target;
        const targetLeft = target.el.getBoundingClientRect().left;
        const targetWidth = target.el.getBoundingClientRect().width;
        const isYIntercest = target.el.getBoundingClientRect().top + target.el.getBoundingClientRect().height >= this.xPosition;
        const isXIntercest = targetLeft <= this.el.getBoundingClientRect().left && targetLeft + targetWidth > this.el.getBoundingClientRect().left;

        return isYIntercest && isXIntercest;
    }
}

export { Projectile };