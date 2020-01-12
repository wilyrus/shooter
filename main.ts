import { Shooter } from './units/Shooter';
import { Target } from './units/Target';
import { Menu } from './menu';
import { PowerupsFactory } from './units/PowerupsFactory';

declare global {
    interface Window { 
        facade: any;
        shooter: any;
        target: any;
        powerupsFactory: any;
        menu: any;
    }
}

window.facade = {};

const queryElements = () => {
    window.facade.shooter = new Shooter();
    window.facade.target = new Target();
    window.facade.powerupsFactory = new PowerupsFactory();
    window.facade.menu = new Menu();

    console.log( '%c%s', 'color: green; font: 1.2rem/1 Tahoma;', 'elements ready' );
}

document.addEventListener('DOMContentLoaded', () => {
    queryElements();
});