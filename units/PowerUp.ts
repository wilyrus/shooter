import { UniteBase } from './UniteBase';
import { PowerUpTypes } from './types';
import { UniteTypes } from './types';

const PowerUp = class extends UniteBase {
    moveSize = 2
    direction = 1
    xPosition = 0
    type: PowerUpTypes
    uniteType = UniteTypes.PowerUp
    height = 50
    width = 50

    constructor(xPos: number) {
      super();
      this.el = document.createElement('div');
      this.type = this.getRandomType();
      this.el.classList.add('powerUp');
      this.el.classList.add(this.type);
      this.el.innerHTML = this.getInnerHTML(this.type);
      this.xPosition = xPos;

      document.querySelector('body').appendChild(this.el);
      this.startMoving();
    }

    startMoving() {
      this.actionsIntervals.push( setInterval(() => {
        if (this.isActive) {
          if (this.checkOutOfBoundsExceed()) {
            this.yPosition = this.yPosition + this.moveSize;
            this.el.style.transform = `translate(${this.xPosition}px, ${this.yPosition}px)`;

            this.eventEmitter.emit('move', this);
          }
        }
      }, 10));
    }

    getRandomType() {
      let min = 0;
      let max = 3;

      const randomTypeIndex = Math.floor(Math.random() * (max - min + 1) + min);

      switch (randomTypeIndex) {
      case 0: {
        return PowerUpTypes.FlySpeed;
      }
      case 1: {
        return PowerUpTypes.Power;
      }
      case 2: {
        return PowerUpTypes.ShootSpeed;
      }
      case 3: {
        return PowerUpTypes.WeaponUpgrade;
      }
      }
    }

    getInnerHTML(type: PowerUpTypes) {
      switch (type) {
      case PowerUpTypes.FlySpeed: {
        return 'FS';
      }
      case PowerUpTypes.Power: {
        return 'PW';
      }
      case PowerUpTypes.ShootSpeed: {
        return 'SS';
      }
      case PowerUpTypes.WeaponUpgrade: {
        return 'WU';
      }
      }
    }
};

export { PowerUp };
