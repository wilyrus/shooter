<template>
    <div class="container">
        <UIButton v-if="!isGameInitialized" @click="$emit('startGame')">New Game</UIButton>
        <UIButton v-else @click="$emit('startGame')">Respawn</UIButton>
        <UIButton>Exit</UIButton>
    </div>
</template>

<script>
import UIButton from '../../ui-kit/button/index.vue';

export default {
  components: {
    UIButton
  },

  props: {
    isGameInitialized: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
    .container {
        position: fixed;
        background-color: rgba(0,0,0,0.5);
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        z-index: 100;
        backdrop-filter: blur(5px)
    }
</style>
