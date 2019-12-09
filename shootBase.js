import { Projectile } from './projectile.js';

const ShootBase = class {
    shoot(projectileType) {
        new Projectile(this.getShootPoint(), projectileType);
    }

    getShootPoint() {
        const leftCenter = this.el.getBoundingClientRect().left + this.el.getBoundingClientRect().width / 2;

        return { x: leftCenter, y: this.el.getBoundingClientRect().top };
    }

    kill() {
        this.el.remove();
    }
}

export { ShootBase };