<template>
    <div class="container">
        <div>Game have been paused</div>
    </div>
</template>

<script>
    import Button from '../../ui-kit/button/index.vue';

    export default {
        components: {
            Button
        },

        props: {
            isGameInitialized: {
                type: String,
                default: false
            }
        }
    }
</script>

<style scoped>
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
