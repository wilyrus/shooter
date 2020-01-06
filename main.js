import { Shooter } from './units/Shooter.js';
import { Target } from './units/Target.js';
import { Menu } from './menu.js';
import { PowerupsFactory } from './units/PowerupsFactory.js';

window.facade = {};

const queryElements = () => {
    facade.shooter = new Shooter('.shooter');
    facade.target = new Target();
    facade.powerupsFactory = new PowerupsFactory();

    if (facade.shooter && facade.target) {
        console.log( '%c%s', 'color: green; font: 1.2rem/1 Tahoma;', 'elements ready' );
    }
}

document.addEventListener('DOMContentLoaded', () => {
    queryElements();
    facade.menu = new Menu();
});