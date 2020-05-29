<template>
    <div class="mainContainer">
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
        <component
          v-for="actor in actors"
          :key="actor.id"
          :is="actor.type"
          v-bind="actor.config"
          @move="handleMove"
        />
    </div>
</template>

<script>
import Shooter from './units/Shooter.vue';
import { PowerupsFactory } from './factories/PowerupsFactory';
import { PhysicsEngine } from './engines/PhysicsEngine';
import { LevelsEngine } from './engines/LevelsEngine';
import StartScreen from './screens/startScreen/index.vue';
import PauseScreen from './screens/pauseScreen/index.vue';
import HUD from './screens/hud/index.vue';
import { mapState } from 'vuex';

export default {
  components: {
    StartScreen,
    PauseScreen,
    HUD
  },

  data() {
    return {
      showMenu: true,
      isGameInitialized: false,
      showPauseScreen: false
    };
  },

  computed: {
    ...mapState({
      actors: state => state.actors
    })
  },

  methods: {
    startGame() {
      this.showMenu = false;
      this.PhysicsEngine = new PhysicsEngine();
      const LE = new LevelsEngine();

      new PowerupsFactory(this.PhysicsEngine);

      this.$store.commit('addActor', { type: Shooter });

      console.log( '%c%s', 'color: green; font: 1.2rem/1 Tahoma;', 'elements ready' );
      this.isGameInitialized = true;
      window.addEventListener('visibilityChange', this.toggleActivness, false);
      window.addEventListener('freeze', this.toggleActivness);

      window.addEventListener('resume', this.toggleActivness);
      window.addEventListener('blur', this.toggleActivness);
      window.addEventListener('focus', this.toggleActivness);

      LE.startLevel();
    },

    openMenu() {
      this.showMenu = true;
    },

    respawn() {
      this.PhysicsEngine.actors.push(new Shooter());
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
    },

    handleMove(el) {
      this.PhysicsEngine.calculateCollisions(el);
    }
  }
};
</script>

<style>
    html, body {
        padding: 0;
        margin: 0;
    }
</style>

<style scoped>
    #vueScene, .mainContainer {
        overflow: hidden;
        height: 100%;
    }
    .menu {
        position: fixed;
        z-index: 100;
    }
</style>
