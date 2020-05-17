import { PowerUp } from '../units/PowerUp';

const PowerupsFactory = class {
    intervalId: NodeJS.Timeout;

    constructor() {
      this.startSpawning();
    }

    startSpawning() {
      this.intervalId = setInterval(() => {
        const xPos = window.innerWidth * Math.random();
        window.facade.physicsEngine.actors.push(new PowerUp(xPos));
      }, 2000);
    }
};

export { PowerupsFactory };
