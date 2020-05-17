<template>
    <div>
        <svg width="65" height="65" viewPort="0 0 45 45" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle :r="radius" cx="35" cy="35" fill="transparent" stroke-dasharray="565.48" stroke-dashoffset="0"></circle>
            <circle class="bar" :r="radius" cx="35" cy="35" fill="transparent" stroke-dasharray="565.48" :stroke-dashoffset="strokeDashoffset"></circle>
        </svg>
        <span>{{title}}</span>
    </div>
</template>

<script>
export default {
  name: 'CircleStatus',

  props: {
    fillPercent: {
      type: Number,
      default: 100,
      required: true,
      validator(value) {
        return value >=0 && value <= 100;
      }
    },

    title: {
      type: String
    }
  },

  data() {
    return {
      radius: 25
    };
  },

  computed: {
    strokeDashoffset() {
      const c = Math.PI*(this.radius*2);

      return ((100-this.fillPercent)/100)*c;
    }
  }
};
</script>

<style scoped>
    circle {
        stroke-dashoffset: 0;
        transition: stroke-dashoffset 1s linear;
        stroke: #666;
        stroke-width: 0.5em;
    }
    .bar {
        stroke: #FF9F1E;
    }
</style>
