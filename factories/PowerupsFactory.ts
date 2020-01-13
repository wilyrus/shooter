import { PowerUp } from '../units/PowerUp';

const PowerupsFactory = class {
    intervalId: NodeJS.Timeout;

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