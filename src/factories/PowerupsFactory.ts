import PowerUpVue from '../units/PowerUp.vue';
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

        store.commit('addActor', { type: PowerUpVue, config: { xPos } });
      }, 2000);
    }
};

export { PowerupsFactory };
