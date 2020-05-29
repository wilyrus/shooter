import {EventEmitter} from '../services/EventEmiter';
import { store } from '../store';
import Target from '../units/Target.vue';
// @ts-ignore
import * as lvl1 from '../levels/lvl_1.json';

const LevelsEngine = class {
    currentLevel: any = null
    currentIteration = 0
    eventEmitter: any
    elementsEngine: any;

    constructor(elementsEngine: any) {
      this.eventEmitter = new EventEmitter();
      this.loadLevel();
      this.elementsEngine = elementsEngine;
    }

    loadLevel() {
      this.currentLevel = lvl1;
    }

    startLevel() {
      this.currentIteration = 0;
      this.spawnActors(this.currentLevel[this.currentIteration].enemies);
    }

    nextPart() {
      this.currentIteration++;
      if (this.currentLevel[this.currentIteration]) {
        this.spawnActors(this.currentLevel[this.currentIteration].enemies);
      } else {
        this.eventEmitter.emit('levelEnded', this);
      }
    }

    spawnActors(enemies: any) {
      enemies.forEach(() => store.commit('addActor', { type: Target }));
    }

    executeTrigger() {
      this.nextPart();
    }
};

export { LevelsEngine };
