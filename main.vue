<template>
    <StartScreen
            v-if="showMenu"
            :is-game-initialized="isGameInitialized"
            @startGame="startGame"
            @respawn="respawn"
    />
    <div v-else class="menu">
        <button @click="openMenu" id="respawn">Open menu</button>
    </div>
</template>

<script>
import { Shooter } from './units/Shooter';
import { Target } from './units/Target';
import { PowerupsFactory } from './factories/PowerupsFactory';
import { PhysicsEngine } from './engines/PhysicsEngine';
// @ts-ignore
import StartScreen from './screens/startScreen/index.vue';

export default {
    components: {
        StartScreen
    },

    beforeMount() {
        window.facade = {};
    },

    data() {
        return {
            showMenu: true,
            isGameInitialized: false
        }
    },

    methods: {
        startGame() {
            this.showMenu = false;
            new PhysicsEngine();
            new PowerupsFactory();
            PhysicsEngine.actors.push(new Target(), new Target(), new Shooter());
            window.facade.physicsEngine = PhysicsEngine;

            console.log( '%c%s', 'color: green; font: 1.2rem/1 Tahoma;', 'elements ready' );
            this.isGameInitialized = true;
        },

        openMenu() {
            this.showMenu = true;
        },

        respawn() {
            PhysicsEngine.actors.push(new Shooter());
        }
    }
}
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
        background: green;
        position: absolute;
        box-shadow: 0 2px 5px rgba(0,0,0,1);
        will-change: transform;
    }

    .projectile {
        height: 40px;
        width: 10px;
        border-radius: 25%;
        position: absolute;
        will-change: transform;
    }

    .projectile.enemyProj {
        background: red;
    }

    .projectile.allyProj {
        background: blue;
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
