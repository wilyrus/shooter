<template>
    <div :class="['powerUp', type]">{{getInnerHTML(type)}}</div>
</template>

<script>
import { PowerUpTypes } from './types';
import { UniteTypes } from './types';
import { uniteBaseMixin } from './mixin/uniteBaseMixin';

export default {
  mixins: [uniteBaseMixin],

  data() {
    return {
      moveSize: 2,
      direction: 1,
      xPosition: this.xPos,
      yPosition: 0,
      uniteType: UniteTypes.PowerUp,
      height: 50,
      width: 50,
      type: this.getRandomType()
    };
  },

  props: {
    xPos: {
      type: Number,
      default: 0
    },
    id: {
      type: String
    }
  },

  mounted() {
    this.startMoving();
  },

  methods: {
    startMoving() {
      this.actionsIntervals.push( setInterval(() => {
        if (this.isActive) {
          if (this.checkOutOfBoundsExceed()) {
            this.dispose();
          } else {
            this.yPosition = this.yPosition + this.moveSize;
            this.$el.style.transform = `translate(${this.xPosition}px, ${this.yPosition}px)`;

            this.$emit('move', this);
          }
        }
      }, 10));
    },

    getRandomType() {
      let min = 0;
      let max = 3;

      const randomTypeIndex = Math.floor(Math.random() * (max - min + 1) + min);

      switch (randomTypeIndex) {
      case 0: {
        return PowerUpTypes.FlySpeed;
      }
      case 1: {
        return PowerUpTypes.Power;
      }
      case 2: {
        return PowerUpTypes.ShootSpeed;
      }
      case 3: {
        return PowerUpTypes.WeaponUpgrade;
      }
      }
    },

    getInnerHTML(type) {
      switch (type) {
      case PowerUpTypes.FlySpeed: {
        return 'FS';
      }
      case PowerUpTypes.Power: {
        return 'PW';
      }
      case PowerUpTypes.ShootSpeed: {
        return 'SS';
      }
      case PowerUpTypes.WeaponUpgrade: {
        return 'WU';
      }
      }
    }
  }
};
</script>

<style>
    .powerUp {
        background-color: bisque;
        height: 50px;
        width: 50px;
        border-radius: 50%;
        position: absolute;
        will-change: transform;
        vertical-align: middle;
        text-align: center;
        line-height: 50px;
        animation: powerUp 1s infinite;
    }

    @keyframes powerUp {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
</style>
