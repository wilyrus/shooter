import { Shooter } from './units/Shooter.js';

const Menu = class {
    respawn: Element

    constructor() {
        this.respawn = document.querySelector('#respawn');
    }
}

export { Menu };