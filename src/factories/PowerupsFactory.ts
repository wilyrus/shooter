import PowerUpVue from '../units/PowerUpVue.vue';
import { store } from '../store';

const PowerupsFactory = class {
    intervalId: NodeJS.Timeout;
    physicsEngine: any;

    constructor(physictEngine: any) {
      this.physicsEngine = physictEngine;
      this.startSpawning();
    }

    startSpawning() {
      this.intervalId = setInterval(() => {
        const xPos = window.innerWidth * Math.random();

        store.dispatch('addActor', { type: PowerUpVue, config: { xPos } });
      }, 2000);
    }
};

export { PowerupsFactory };
