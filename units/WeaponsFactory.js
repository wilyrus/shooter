import { Projectile } from '../projectile.js';

const WeaponsFactory = class {
    static shootSingle(shootPoint, projectileType, config) {
        new Projectile(shootPoint, projectileType, config);
    }

    static shootDouble(shootPoint, projectileType, config) {
        new Projectile({ x: shootPoint.x + 10, y: shootPoint.y }, projectileType, config);
        new Projectile({ x: shootPoint.x - 10, y: shootPoint.y }, projectileType, config);
    }

    static shootSpread(shootPoint, projectileType, config) {
        new Projectile(shootPoint, projectileType, config);
        new Projectile(shootPoint, projectileType, config);
        new Projectile(shootPoint, projectileType, config);
    }
}

export { WeaponsFactory };