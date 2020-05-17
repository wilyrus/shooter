<template>
    <div>
        <StartScreen
            v-if="showMenu"
            :is-game-initialized="isGameInitialized"
            @startGame="startGame"
            @respawn="respawn"
        />
        <div v-else class="menu">
            <button @click="openMenu" id="respawn">Open menu</button>
        </div>
        <PauseScreen v-if="showPauseScreen"/>
        <HUD v-if="isGameInitialized"/>
    </div>
</template>

<script>
import { Shooter } from './units/Shooter';
import { PowerupsFactory } from './factories/PowerupsFactory';
import { PhysicsEngine } from './engines/PhysicsEngine';
import { LevelsEngine } from './engines/LevelsEngine';
// @ts-ignore
import StartScreen from './screens/startScreen/index.vue';
import PauseScreen from './screens/pauseScreen/index.vue';
import HUD from './screens/hud/index.vue';

export default {
  components: {
    StartScreen,
    PauseScreen,
    HUD
  },

  beforeMount() {
    window.facade = {};
  },

  data() {
    return {
      showMenu: true,
      isGameInitialized: false,
      showPauseScreen: false
    };
  },

  methods: {
    startGame() {
      this.showMenu = false;
      new PhysicsEngine();
      new PowerupsFactory();
      this.LevelsEngine = new LevelsEngine();
      PhysicsEngine.actors.push(new Shooter());
      window.facade.physicsEngine = PhysicsEngine;

      console.log( '%c%s', 'color: green; font: 1.2rem/1 Tahoma;', 'elements ready' );
      this.isGameInitialized = true;
      window.addEventListener('visibilityChange', this.toggleActivness, false);
      window.addEventListener('freeze', this.toggleActivness);

      window.addEventListener('resume', this.toggleActivness);
      window.addEventListener('blur', this.toggleActivness);
      window.addEventListener('focus', this.toggleActivness);

      this.LevelsEngine.startLevel();
    },

    openMenu() {
      this.showMenu = true;
    },

    respawn() {
      PhysicsEngine.actors.push(new Shooter());
    },

    toggleActivness(event) {
      switch (event.type) {
      case 'blur': {
        PhysicsEngine.toggleActivity(false);
        this.showPauseScreen = true;
        break;
      }
      case 'focus' : {
        PhysicsEngine.toggleActivity(true);
        this.showPauseScreen = false;
        break;
      }
      }
    }
  }
};
</script>

<style>
    html, body {
        padding: 0;
        margin: 0;
    }

    .target {
        height: 30px;
        width: 120px;
        background: red;
        position: absolute;
        box-shadow: 0 2px 5px rgba(0,0,0,1);
        will-change: transform;
    }

    .shooter {
        height: 30px;
        width: 150px;
        position: absolute;
        perspective: 700px;
        will-change: transform;
    }

    .shipBody {
        height: 100%;
        width: 100%;
        background: green;
        box-shadow: 0 2px 5px rgba(0,0,0,1);
        transition: transform 0.3s;
        z-index: 1;
    }

    .cannon {
        background-color: greenyellow;
        width: 20px;
        height: 60px;
        position: absolute;
        bottom: 0;
        left: 65px;
    }

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
    }
</style>
