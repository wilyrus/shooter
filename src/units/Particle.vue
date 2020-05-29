<template>
  <div :class="['projectile', className]"></div>
</template>

<script>
import { UniteTypes } from './types';
import { uniteBaseMixin } from './mixin/uniteBaseMixin';

export default {
  data() {
    return {
      direction: 1,
      intervalId: '',
      uniteType: UniteTypes.Projectile,
      height: 30,
      width: 8,
      className: 'allyProj',
      xPosition: this.x,
      yPosition: this.y,
      active: true
    };
  },

  props: {
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    type: {
      type: Number,
      default: 0
    },
    moveSize: {
      type: Number,
      default: 2
    },
    animation: {
      type: () => {}
    },
    id: {
      type: String
    }
  },

  mixins: [uniteBaseMixin],

  mounted() {
    this.startMoving();
  },

  methods: {
    startMoving() {
      this.yPosition = this.yPosition + this.moveSize * this.direction * -1;
      this.updatePosition(this.xPosition, this.yPosition);
    }
  }
};
</script>

<style scoped>
  .projectile {
    height: 30px;
    width: 8px;
    position: absolute;
    will-change: transform;
  }

  .projectile.enemyProj {
    background: red;
    border-bottom-right-radius: 40%;
    border-bottom-left-radius: 40%;
  }

  .projectile.allyProj {
    background: blue;
    border-top-right-radius: 40%;
    border-top-left-radius: 40%;
  }
</style>
