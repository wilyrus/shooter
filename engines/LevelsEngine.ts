import {PhysicsEngine} from './PhysicsEngine';
import {Target} from '../units/Target';
import {EventEmitter} from '../services/EventEmiter';
// @ts-ignore
import * as lvl1 from '../levels/lvl_1.json';

const LevelsEngine = class {
    currentLevel: any = null
    currentIteration = 0
    eventEmitter: any

    constructor() {
      this.eventEmitter = new EventEmitter();
      this.loadLevel();
    }

    loadLevel() {
      this.currentLevel = lvl1;
    }

    startLevel() {
      this.currentIteration = 0;
      this.spawnEnemies(this.currentLevel[this.currentIteration].enemies);
    }

    nextPart() {
      this.currentIteration++;
      if (this.currentLevel[this.currentIteration]) {
        this.spawnEnemies(this.currentLevel[this.currentIteration].enemies);
      } else {
        this.eventEmitter.emit('levelEnded', this);
      }
    }

    spawnEnemies(enemies: any) {
      PhysicsEngine.actors.push(...enemies.map((ememyConfig: any) => new Target(ememyConfig)));
    }

    executeTrigger() {
      this.nextPart();
    }
};

export { LevelsEngine };
