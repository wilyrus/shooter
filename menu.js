import { Shooter } from './units/Shooter.js';

const Menu = class {
    constructor() {
        this.respawn = document.querySelector('#respawn');
    }

    respawn() {
        facade.target = new Target('.target');
    }
}

export { Menu };