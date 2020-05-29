<template>
    <div class="container">
        <Button v-if="!isGameInitialized" @click="$emit('startGame')">New Game</Button>
        <Button v-else @click="$emit('startGame')">Respawn</Button>
        <Button>Exit</Button>
    </div>
</template>

<script>
import Button from '../../ui-kit/button/index.vue';

export default {
  components: {
    Button
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
