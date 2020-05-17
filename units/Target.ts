import { UniteBase } from './UniteBase';
import {ProjectileTypes, UniteTypes} from './types';
import { Gun } from './Gun';

const Target = class extends UniteBase {
    moveSize = 5
    direction = 1
    xPosition = 0
    selector= 'target'
    template = ''
    type = ProjectileTypes.Enemy
    gun: any //todo fix
    uniteType = UniteTypes.Enemy
    width =  120
    height = 30

    // eslint-disable-next-line no-unused-vars
    constructor(config: any = {}) {
      super();
      const newDiv = document.createElement('div');
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
        if (this.isActive) {
          this.direction = Math.floor(Math.random() * 10) % 2 === 0 ? this.direction : this.direction * -1;
        }
      }, 800);

      const shootInterval = setInterval(() => {
        if (this.isActive) {
          if (this.checkOutOfBoundsExceed()) {
            this.xPosition = this.xPosition + this.moveSize * this.direction;
            this.el.style.transform = `translate(${this.xPosition}px, 0)`;
            this.eventEmitter.emit('move', this);
          } else {
            this.direction *= -1;
          }
        }
      }, 1);

      this.actionsIntervals.push(moveInterval, shootInterval);
    }

    checkOutOfBoundsExceed() {
      if (this.direction === 1) {
        return this.moveSize + this.width + this.xPosition < window.innerWidth;
      }
      return this.width + this.xPosition - this.moveSize > 0;
    }

    kill() {
      this.gun.destroy();
      this.gun = null;

      super.kill();
    }
};

export { Target };
