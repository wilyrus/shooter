<template>
  <div class="target"></div>
</template>

<script>
import { uniteBaseMixin } from './mixin/uniteBaseMixin';
import {ProjectileTypes, UniteTypes} from './types';
import { Gun } from './Gun';

export default {
  data() {
    return {
      moveSize: 5,
      direction: 1,
      xPosition: 0,
      yPosition: 0,
      type: ProjectileTypes.Enemy,
      uniteType: UniteTypes.Enemy,
      width: 120,
      height: 30
    };
  },

  props: {
    id: {
      type: String
    }
  },

  mixins: [uniteBaseMixin],

  mounted() {
    this.gun = new Gun(this.type);

    this.startMoving();
    this.gun.startShoot(this);
  },

  methods: {
    startMoving() {
      const moveInterval = setInterval(() => {
        if (this.isActive) {
          this.direction = Math.floor(Math.random() * 10) % 2 === 0 ? this.direction : this.direction * -1;
        }
      }, 800);

      const shootInterval = setInterval(() => {
        if (this.isActive) {
          if (this.checkOutOfBoundsExceed(this.xPosition + this.moveSize * this.direction, this.yPosition)) {
            this.direction *= -1;
          } else {
            this.xPosition = this.xPosition + this.moveSize * this.direction;
            this.updatePosition(this.xPosition, this.yPosition);
          }
        }
      }, 1);

      this.actionsIntervals.push(moveInterval, shootInterval);
    }
  }
};
</script>

<style scoped>
  .target {
      height: 30px;
      width: 120px;
      background: red;
      position: absolute;
      box-shadow: 0 2px 5px rgba(0,0,0,1);
      will-change: transform;
  }
</style>
