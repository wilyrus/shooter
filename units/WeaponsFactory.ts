import { Projectile } from './projectile';
import { ProjectileTypes, PlanePoint, MotionConfig } from './types';

const WeaponsFactory = class {
    static shootSingle(shootPoint: PlanePoint, projectileType: ProjectileTypes, config: MotionConfig) {
        new Projectile(shootPoint, projectileType, config);
    }

    static shootDouble(shootPoint: PlanePoint, projectileType: ProjectileTypes, config: MotionConfig) {
        new Projectile({ x: shootPoint.x + 10, y: shootPoint.y }, projectileType, config);
        new Projectile({ x: shootPoint.x - 10, y: shootPoint.y }, projectileType, config);
    }

    static shootSpread(shootPoint: PlanePoint, projectileType: ProjectileTypes, config: MotionConfig) {
        new Projectile(shootPoint, projectileType, config);
        new Projectile(shootPoint, projectileType, config);
        new Projectile(shootPoint, projectileType, config);
    }
}

export { WeaponsFactory };