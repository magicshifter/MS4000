
<script setup lang="ts">
import {reactive, watchEffect, ref} from "vue"
import AutoControll from "../components/AutoControll.vue"
import AutoField from "./AutoField.vue"

const props = defineProps<{
    type: any,
    value: any,
    onChange: any,
}>()

// const state = reactive({ 
//   modes: []
// })

console.log("AutoType :)")

const { type, value, onChange } = props
const name = type?.name

const root = type?.root


const fields = type?.fields
const fieldIndex = fields ? Object.keys(fields).map((name) => fields[name]) : []

</script>

<template>
    <div v-if="root" class="type">
        <h2>type: {{name}}</h2>
        <div>
            <div v-for="f in fieldIndex" class="field">
                <AutoField :field="f" />
            </div>
        </div>
    </div>
    <div v-if="!root">NO ROOT!!!!!!!!11</div>
</template>

<style scoped>
.field {
  padding: 1em;
}

.type {
    border: 2px solid gray;
    padding: 1em;
}
</style>
