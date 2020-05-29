<template>
    <button class="button"><slot/></button>
</template>

<script>
export default {
  name: 'uiButton'
};
</script>

<style scoped>
    .button {
        margin: 8px;
        height: 44px;
        font-size: 1.2rem;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        border-radius: 3px;
        border: none;
        cursor: pointer;
        transition: box-shadow 0.1s;
        color: white;
        font-family: Areal;
        background-color: cornflowerblue;
        padding: 12px;
    }

    .button:hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        transition: box-shadow 0.1s;
    }
</style>
