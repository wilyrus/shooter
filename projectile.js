import { PROJECTILE_TYPES } from './constants.js';
import { UniteBase } from './units/UniteBase.js';

const Projectile = class extends UniteBase {
    selector = 'projectile'
    template =  "<div></div>"
    moveSize = 2
    direction = 1
    intervalId = ''

    constructor(coords, projectileType, config = {}) {
        super();
        this.moveSize = config.moveSize || 2;
        this.moveDelay = config.moveDelay || 1;
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
        }, this.moveDelay);
    }

    killTarget() {
        this.direction === -1 ? facade.shooter.kill() : facade.target.kill();
    }
}

export { Projectile };