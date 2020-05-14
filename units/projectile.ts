import {ProjectileTypes, PlanePoint, MotionConfig, UniteTypes} from './types';
import { UniteBase } from './UniteBase';

const Projectile = class extends UniteBase {
    selector = 'projectile'
    template =  "<div></div>"
    moveSize = 2
    direction = 1
    intervalId = ''
    moveDelay = 1
    type: ProjectileTypes
    uniteType: UniteTypes.Projectile

    constructor(coords: PlanePoint, projectileType: ProjectileTypes, config: MotionConfig) {
        super();
        this.moveSize = config.moveSize || 2;
        this.moveDelay = config.moveDelay || 1;
        let className = '';
        this.type = projectileType;

        if (projectileType === ProjectileTypes.Enemy) {
            this.direction = -1;
            className = 'enemyProj';
        } else {
            className = 'allyProj';
        }

        const newDiv = document.createElement("div");
        newDiv.classList.add(this.selector);
        newDiv.classList.add(className);
        newDiv.innerHTML = this.template;
        newDiv.style.left = `${coords.x}`;
        newDiv.style.top = `${coords.y}`;
        document.body.append(newDiv);
        this.el = newDiv;
        this.startMoving();
    }

    startMoving() {
        const intervalId = setInterval(() => {
            if (this.checkOutOfBoundsExceed()) {
                this.yPosition = this.yPosition + this.moveSize * this.direction * -1;
                this.el.style.transform = `translate(0, ${this.yPosition}px)`;

                this.eventEmitter.emit('move', this);
            }
        }, this.moveDelay);

        this.actionsIntervals.push(intervalId);
    }

    intersectedBy(target: any) {
        if (this.type !== target.type && target.uniteType !== UniteTypes.PowerUp) {
            target.kill();
        }
    }
}

export { Projectile };
