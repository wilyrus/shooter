<template>
    <div class="container">
        <button v-if="!isGameInitialized" @click="$emit('startGame')">New Game</button>
        <button v-else @click="$emit('startGame')">Respawn</button>
        <button>Exit</button>
    </div>
</template>

<script>
    export default {
        props: {
            isGameInitialized: {
                type: String,
                default: false
            }
        }
    }
</script>

<style module>
    .container {
        background-color: rgba(0,0,0,0.5);
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>
