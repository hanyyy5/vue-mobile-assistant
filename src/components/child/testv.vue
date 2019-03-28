<template>
    <div>
        <div v-for="(item,key) of c" :key="key">
            {{key}}: {{item}}
        </div>
        <button v-on:click="clickit">点击向父组件传参</button>
        <span>{{data}}</span>
    </div>
</template>

<script>
export default {
    name: 'child',
    props: {
        c: Array,
        data: String
    },
    methods: {
        clickit: function() {
            this.$emit("listenchild", "here comes message from children")
        }
    }
}
</script>

<style  scoped>
    
</style>