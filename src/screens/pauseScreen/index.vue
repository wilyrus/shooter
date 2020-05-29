<template>
    <div class="container">
        <div>Game have been paused</div>
    </div>
</template>

<script>
export default {
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
        backdrop-filter: blur(5px);
    }
</style>
