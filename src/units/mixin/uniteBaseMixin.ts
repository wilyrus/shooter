import { ParticleEmitter } from '../../services/ParticleEmitter';
import {store} from '../../store';

const uniteBaseMixin: any = {
  data() {
    return {
      isActive: true,
      // @ts-ignore
      actionsIntervals: [],
      health: 100
    };
  },

  methods: {
    getShootPoint() {
      const leftCenter = this.xPosition + this.width / 2;

      return { x: leftCenter, y: this.yPosition };
    },

    dispose() {
      ParticleEmitter.generateParticlesFromObject({
        x: this.xPosition,
        y: this.yPosition
      }, {
        width: this.width,
        height: this.height
      },
      {
        backgroundColor: 'green'
      });
      this.actionsIntervals.forEach((int: NodeJS.Timeout) => clearInterval(int));
      if (this.gun) {
        this.gun.destroy();
      }

      store.dispatch('removeActor', this);
    },

    checkOutOfBoundsExceed(xPosition: number = this.xPosition, yPosition: number = this.yPosition) { //todo unify
      const isYPositionExceed = yPosition + this.height <= 0 || yPosition > window.innerHeight;
      const isXPositionExceed = xPosition + this.width >= window.innerWidth || xPosition <= 0;

      return isYPositionExceed || isXPositionExceed;
    },

    updatePosition(x: number, y: number) {
      this.$el.style.transform = `translate(${x}px, ${y}px)`;
      this.$emit('move', this);
    }
  },

  beforeDestroy() {
    this.dispose();
  }
};

export { uniteBaseMixin };
