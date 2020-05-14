<template>
    <div class="container">
        <button @click="$emit('startGame')">New Game</button>
        <button>Exit</button>
    </div>
</template>

<script>
    export default {

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
