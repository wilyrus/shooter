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
      active: true
    };
  },

  props: {
    animation: {
      type: Object
    },
    id: {
      type: String
    }
  },

  mounted() {
    this.startAnimation();
  },

  methods: {
    startAnimation() {
      const ani = this.$el.animate(this.animation.animation, this.animation.time);
      ani.onfinish = this.animation.callback;
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
