<template>
    <div id="cont" data-pct="100">
        <svg id="svg" width="200" height="200" viewPort="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle r="90" cx="100" cy="100" fill="transparent" stroke-dasharray="565.48" stroke-dashoffset="0"></circle>
            <circle id="bar" :r="radius" cx="100" cy="100" fill="transparent" stroke-dasharray="565.48" :stroke-dashoffset="strokeDashoffset"></circle>
        </svg>
    </div>
</template>

<script>
    export default {
        name: "CircleStatus",

        props: {
            fillPercent: {
                type: Number,
                default: 100,
                required: true,
                validator(value) {
                    return value >=0 && value <= 100;
                }
            }
        },

        data() {
            return {
                radius: 90
            }
        },

        computed: {
            strokeDashoffset() {
                const c = Math.PI*(this.radius*2);

                return ((100-this.fillPercent)/100)*c;
            }
        }
    }
</script>

<style scoped>
    .button {
        margin: 8px;
        height: 40px;
        font-size: 1.2rem;
        background-color: white;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        border-radius: 3px;
        border: none;
        cursor: pointer;
        transition: box-shadow 0.1s;
    }

    .button:hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        transition: box-shadow 0.1s;
    }
</style>
