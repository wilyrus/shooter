import { PROJECTILE_TYPES } from './constants.js';
import { UniteBase } from './units/UniteBase.js';

const Projectile = class extends UniteBase {
    selector = 'projectile'
    template =  "<div></div>"
    moveSize = 2
    direction = 1
    intervalId = ''

    constructor(coords, projectileType) {
        super();
        let className = '';
        if (projectileType === PROJECTILE_TYPES.ENEMY) {
            this.direction = -1;
            className = 'enemyProj';
        } else {
            className = 'allyProj';
        }
        const newDiv = document.createElement("div");
        newDiv.classList.add(this.selector);
        newDiv.classList.add(className);
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
        }, 1);
    }

    checkOutOfBoundsExceed() {
        const isExceed = this.getTop() + this.getHeight <= 0 || this.getTop() > window.innerHeight;

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

    checkIntersection(el1, el2) {
        const targetLeft = el1.getLeft();
        const targetWidth = el1.getWidth();
        const el1Bottom = el1.getTop() + el1.getHeight();
        const el2Bottom = el2.getTop() + el2.getHeight();

        const isYIntercest = el1Bottom <= el2.getTop() && el1.getTop() >= el2Bottom 
            || el1Bottom >= el2.getTop() && el1.getTop() <= el2Bottom;
        const isXIntercest = targetLeft >= el2.getLeft() + el2.getWidth() && targetLeft + targetWidth <= el2.getLeft()
            || targetLeft <= el2.getLeft() + el2.getWidth() && targetLeft + targetWidth >= el2.getLeft();

        return isYIntercest && isXIntercest;
    }
}

export { Projectile };