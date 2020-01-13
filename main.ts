import { Shooter } from './units/Shooter';
import { Target } from './units/Target';
import { Menu } from './menu';
import { PowerupsFactory } from './factories/PowerupsFactory';
import { PhysicsEngine } from './engines/PhysicsEngine';

declare global {
    interface Window { 
        facade: any;
        shooter: any;
        phisicsEngine: any;
        powerupsFactory: any;
        menu: any;
    }
}

window.facade = {};

const queryElements = () => {
    new PhysicsEngine();
    PhysicsEngine.actors.push(new Target(), new Target(), new Shooter());
    window.facade.physicsEngine = PhysicsEngine;
    window.facade.powerupsFactory = new PowerupsFactory();
    window.facade.menu = new Menu();

    console.log( '%c%s', 'color: green; font: 1.2rem/1 Tahoma;', 'elements ready' );
}

document.addEventListener('DOMContentLoaded', () => {
    queryElements();
});