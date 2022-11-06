
<script setup lang="ts">
import {reactive, watchEffect, ref} from "vue"
import AutoControll from "../components/AutoControll.vue"
import AutoField from "./AutoField.vue"

const props = defineProps<{
    type: any,
    "modelValue": any,
}>()

// const state = reactive({ 
//   modes: []
// })

const emit = defineEmits(['update:modelValue'])

console.log("AutoType :)", props, props?.modelValue)

const { type, value, onChange } = props
const name = type?.name

const root = type?.root


const fields = type?.fields
const fieldIndex = fields ? Object.keys(fields).map((name) => fields[name]) : []


function createUpdateFieldValue(f) {
    console.log("creating the fn with: f=", f)
    return ((update) => {
        console.log("onUpdateFieldValue", f, update)
        const newValue = {...props.modelValue}
        newValue[f] = update
        emit("update:modelValue", newValue)
    })
}

const iter = fields ? Object.keys(fields).map((name) => ({
    name,
    field: fields[name],
    value: props?.modelValue?.[name], 
    handler: createUpdateFieldValue(name)
})) : []



</script>

<template>
    <div>
    <div v-if="root" class="type">
        <h2>type: {{name}}</h2>
        <div>
            <div v-for="iii in iter" class="field">
                <p>::{{iii.name}}::</p>
                <AutoField :field="iii.field" :modelValue="iii.value" @update:modelValue="iii.handler"/>
            </div>
        </div>
    </div>
    <div v-if="!root">NO ROOT!!!!!!!!11</div>
    </div>
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
