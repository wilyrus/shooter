<template>
    <div class="hudContainer">
        <CircleStatus :fillPercent="health" class="healthCircle" title="Health"></CircleStatus>
        <CircleStatus :fillPercent="gunUpgrade" class="gunUpgradeCircle" title="Upgrade"></CircleStatus>
    </div>
</template>

<script>
import CircleStatus from '../../ui-kit/circleStatus/index.vue';

export default {
  components: {
    CircleStatus
  },

  props: {
    isGameInitialized: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      health: 100,
      gunUpgrade: 100
    };
  }
};
</script>

<style scoped>
    .hudContainer {
        position: fixed;
        background-color: rgba(0,0,0,0.5);
        left: 0;
        bottom: 0;
        height: 100px;
        width: 150px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        z-index: 100;
        border-top-right-radius: 25px;
    }
</style>
