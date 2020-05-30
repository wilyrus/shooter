<template>
<div class="shooter">
  <div class="cannon"></div>
  <div ref="shipBody" class="hull">
    <div class="shipBody"></div>
    <div class="leftWing"></div>
    <div class="rightWing"></div>
  </div>
</div>
</template>

<script>
import { uniteBaseMixin } from './mixin/uniteBaseMixin';
import { Gun } from './Gun';
import {ProjectileTypes, UniteTypes} from './types';

export default {
  data() {
    return {
      gunLevel: 1,
      auotshoot: false,
      type: ProjectileTypes.Self,
      uniteType: UniteTypes.Player,
      width: 150,
      height: 30
    };
  },

  mixins: [uniteBaseMixin],

  mounted() {
    this.gun = new Gun(this.type);

    this.move = this.move.bind(this);
    this.shoot = this.shoot.bind(this);
    this.startTrackingMouse();
  },

  props: {
    id: {
      type: String
    }
  },

  methods: {
    move(event) {
      const xPosition = event.clientX;
      const yPosition = event.clientY;

      if (!this.checkOutOfBoundsExceed(xPosition, yPosition)) {
        clearTimeout(this.cleatTransformTimeout);
        const rotateDeg = this.xPosition - xPosition > 0 ? -50 : 50;
        this.xPosition = xPosition;
        this.yPosition = yPosition;

        this.updatePosition(this.xPosition, this.yPosition);
        this.$refs.shipBody.style.transform = `rotateY(${rotateDeg}deg)`;

        this.cleatTransformTimeout = setTimeout(() => {
          this.$refs.shipBody.style.transform = '';
        }, 100);
      }
    },

    shoot() {
      this.auotshoot = !this.auotshoot;
      if (this.auotshoot) {
        this.gun.startShoot(this);
      } else {
        this.gun.stopShoot();
      }
    },

    startTrackingMouse() {
      document.addEventListener('mousemove', this.move);
      document.addEventListener('pointerdown', this.shoot);
    },

    beforeDestroy() {
      document.removeEventListener('mousemove', this.move);
      document.removeEventListener('pointerdown', this.shoot);
    },

    upgrade(powerUp) { //todo fix
      this.gun.upgrade(powerUp.type);
    }
  }
};
</script>

<style scoped>
    .shooter {
        height: 30px;
        width: 150px;
        position: absolute;
        perspective: 700px;
        will-change: transform;
      z-index: -1;
    }

    .hull {
      transition: transform 0.2s ease-in;
    }

    .shipBody {
        height: 100px;
        width: 40px;
        position: absolute;
      left: calc(50% - 20px);
        background: green;
        box-shadow: 0 2px 5px rgba(0,0,0,1);
        z-index: 1;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
    }
    .leftWing, .rightWing {
      position: absolute;
      z-index: -1;
      background-color: green;
      width: 115px;
      height: 40px;
      top: 30px;
    }

    .leftWing {
      transform: rotate(-40deg);
      border-top-left-radius: 50px;
      right: 50px;
    }

    .rightWing {
      transform: rotate(40deg);
      border-top-right-radius: 50px;
      left: 50px;
    }

    .cannon {
        background-color: greenyellow;
        width: 20px;
        height: 60px;
        position: absolute;
        bottom: 0;
        left: calc(50% - 10px);
    }
</style>
