
import { PowerUp } from './PowerUp.js';

const PowerupsFactory = class {
    constructor() {
        this.startSpawning();
    }

    startSpawning() {
        this.intervalId = setInterval(() => {
            const xPos = window.innerWidth * Math.random();
            new PowerUp(xPos);
        }, 2000);
    }
}

export { PowerupsFactory };