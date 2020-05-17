import { Projectile } from '../units/Projectile';
import { ProjectileTypes, PlanePoint, MotionConfig } from '../units/types';

const WeaponsFactory = class {
  static shootSingle(shootPoint: PlanePoint, projectileType: ProjectileTypes, config: MotionConfig) {
    window.facade.physicsEngine.actors.push(new Projectile(shootPoint, projectileType, config));
  }

  static shootDouble(shootPoint: PlanePoint, projectileType: ProjectileTypes, config: MotionConfig) {
    window.facade.physicsEngine.actors.push(new Projectile({ x: shootPoint.x + 10, y: shootPoint.y }, projectileType, config));
    window.facade.physicsEngine.actors.push(new Projectile({ x: shootPoint.x - 10, y: shootPoint.y }, projectileType, config));
  }

  static shootSpread(shootPoint: PlanePoint, projectileType: ProjectileTypes, config: MotionConfig) {
    window.facade.physicsEngine.actors.push(new Projectile({ x: shootPoint.x + 20, y: shootPoint.y }, projectileType, config));
    window.facade.physicsEngine.actors.push(new Projectile({ x: shootPoint.x, y: shootPoint.y }, projectileType, config));
    window.facade.physicsEngine.actors.push(new Projectile({ x: shootPoint.x - 20, y: shootPoint.y }, projectileType, config));
  }
};

export { WeaponsFactory };
