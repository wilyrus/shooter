<template>
    <div class="container">
        <div class="healthCircle"></div>
        <div class="gunUpgradeCircle"></div>
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
        left: 0;
        bottom: 0;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        z-index: 100;
    }
</style>
