import { PROJECTILE_TYPES } from '../constants.js';
import { WeaponsFactory } from './WeaponsFactory.js';

const Gun = class {
    type = 'single'
    shootSpeed = 50
    projectailSpeed = 1
    power = 1

    constructor(projectileType) {
        this.projectileType = projectileType;
    }

    upgrade(upgradeType) {
        switch (upgradeType) {
            case 'flySpeed': {
                return this.projectailSpeed + 1;
            }
            case 'power': {
                return 'PW';
            }
            case 'shootSpeed': {
                return this.shootSpeed + 50;
            }
        }
    }

    startShoot(shooter) {
        this.auotshootInterval = setInterval(() =>
         this.shoot(this.projectileType, { moveSize: 5 + this.projectailSpeed, moveDelay: 2 }, shooter),
          1000 - this.shootSpeed > 300 ? 1000 - this.shootSpeed : 300);
    }

    stopShoot() {
        clearInterval(this.auotshootInterval);
    }

    shoot(projectileType, config, shooter) {
        WeaponsFactory.shootDouble(shooter.getShootPoint(), projectileType, config);
    }
}

export { Gun };