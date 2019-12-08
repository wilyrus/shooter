import { Shooter } from './shooter.js';
import { Target } from './target.js';

window.facade = {};

const queryElements = () => {
    facade.shooter = new Shooter('.shooter');
    facade.target = new Target('.target');

    if (facade.shooter && facade.target) {
        console.log( '%c%s', 'color: green; font: 1.2rem/1 Tahoma;', 'elements ready' );
    }
}

const startTrackingMouse = () => {
    document.addEventListener('mousemove', event => {
        facade.shooter.move(event.clientX);
    });
    document.addEventListener('pointerdown', () => {
        facade.shooter.shoot();
    });
}

document.addEventListener('readystatechange', ()=>{
    queryElements();
    startTrackingMouse();
});