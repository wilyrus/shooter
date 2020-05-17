import { WeaponsFactory } from '../factories/WeaponsFactory';
import { PowerUpTypes, ProjectileTypes, MotionConfig } from './types';

const Gun = class {
    type = 'single'
    shootSpeed = 50
    projectailSpeed = 1
    power = 1
    projectileType: ProjectileTypes
    autoShootInterval: NodeJS.Timeout

    constructor(projectileType: ProjectileTypes) {
      this.projectileType = projectileType;
    }

    upgrade(upgradeType: PowerUpTypes) {
      switch (upgradeType) {
      case PowerUpTypes.FlySpeed: {
        return this.projectailSpeed + 1;
      }
      case PowerUpTypes.Power: {
        return 'PW';
      }
      case PowerUpTypes.ShootSpeed: {
        return this.shootSpeed + 50;
      }
      }
    }

    startShoot(shooter: any) { //todo fix
      this.autoShootInterval = setInterval(() =>
        this.shoot(this.projectileType, { moveSize: 5 + this.projectailSpeed, moveDelay: 2 }, shooter),
      1000 - this.shootSpeed > 300 ? 1000 - this.shootSpeed : 300);
    }

    stopShoot() {
      clearInterval(this.autoShootInterval);
    }

    shoot(projectileType: ProjectileTypes, config: MotionConfig, shooter: any) { //todo fix
      WeaponsFactory.shootDouble(shooter.getShootPoint(), projectileType, config);
    }

    destroy() {
      this.stopShoot();
    }
};

export { Gun };
