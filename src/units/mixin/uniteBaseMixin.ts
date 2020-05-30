// @ts-nocheck
import { ParticleEmitter } from '../../services/ParticleEmitter';
import {store} from '../../store';

const uniteBaseMixin: any = {
  data() {
    return {
      isActive: true,
      actionsIntervals: [] as Array<NodeJS.Timeout>,
      health: 100
    };
  },

  mounted() {
    // todo wtf
    //store.commit('setInstance', { id: this.id, el: this });
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
      clearTimeout(this.moveTimeout);
      if (this.gun) {
        this.gun.destroy();
      }

      store.commit('removeActor', this);
    },

    checkOutOfBoundsExceed(xPosition: number = this.xPosition, yPosition: number = this.yPosition) {
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
