import { PowerUpTypes, ProjectileTypes, MotionConfig, IUnite } from './types';
import ProjectileVue from './Projectile.vue';
import { store } from '../store';
import {ParticleEmitter} from '../services/ParticleEmitter';

const Gun = class {
    type = 'single'
    shootSpeed = 50
    projectailSpeed = 1
    power = 1
    projectileType: ProjectileTypes
    autoShootInterval: NodeJS.Timeout
    weaponType = 0;

    constructor(projectileType: ProjectileTypes, weaponType: number = 0) {
      this.projectileType = projectileType;
      this.weaponType = weaponType;
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
      case PowerUpTypes.WeaponUpgrade: {
        if (this.weaponType < 2) {
          this.weaponType++;
        }
      }
      }
    }

    startShoot(shooter: IUnite) {
      this.autoShootInterval = setInterval(() =>
        this.shoot(this.projectileType, {
          moveSize: 5 + this.projectailSpeed,
          moveDelay: 2 },
        shooter),
      1000 - this.shootSpeed > 300 ? 1000 - this.shootSpeed : 300);
    }

    stopShoot() {
      clearInterval(this.autoShootInterval);
    }

    shoot(projectileType: ProjectileTypes, config: MotionConfig, shooter: IUnite) {
      //todo add spread to points
      for (let i = 0; i <= this.weaponType; i ++) {
        const point = shooter.getShootPoint();

        store.commit('addActor', {
          type: ProjectileVue,
          config: {
            x: point.x + 20,
            y: point.y,
            type: projectileType,
            ...config
          }
        });
        ParticleEmitter.generateParticlesFromObject({
          x: point.x,
          y: point.y
        }, {
          width: 20,
          height: 20
        },
        {
          backgroundColor: 'green'
        });
      }
    }

    destroy() {
      this.stopShoot();
    }
};

export { Gun };
