
<script setup lang="ts">
import {reactive, watchEffect, ref, watch} from "vue"
import AutoControll from "../components/AutoControll.vue"
import AutoField from "./AutoField.vue"

const props = defineProps<{
    type: any,
    modelValue: any,
}>()

const state = reactive({ 
  iter: [],
  type: undefined,
  name: undefined,
  root: undefined,
  fields: undefined,
  fieldIndex: undefined,

  modelValueClone: undefined
})

watchEffect(() => {
    state.modelValueClone = props["modelValue"]
})

const emit = defineEmits(['update:modelValue'])

console.log("AutoType :)", props?.["modelValue"])


watchEffect(() => {
    console.log("In Autotype watch rerun", props.type)
    const { type } = props
    const name = type?.name

    const root = type?.root


    const fields = type?.fields
    const fieldIndex = fields ? Object.keys(fields).map((name) => fields[name]) : []

    state.type = type
    state.name = name
    state.root = root
    state.fields = fields
    state.fieldIndex = fieldIndex
})


function createUpdateFieldValue(f) {
    console.log("creating the fn with: f=", f)
    return ((update) => {
        console.log("onUpdateFieldValue", f, update)

        // const newValue = {...props?.["modelValue"]}\

        let newValue = {}
        try {
            newValue = JSON.parse(JSON.stringify(props["modelValue"]))
            if (newValue === undefined || newValue === null) {
                newValue = {}
            }
        }
        catch (ex) {
            console.warn("exception in cloning undefiend?")
        }
        

        newValue[f] = update
        emit("update:modelValue", newValue)
    })
}

watchEffect(() => {
    console.log("In Autotype watch 2")
    state.iter = state.fields ? Object.keys(state.fields).map((name) => {
        const vStr = JSON.stringify(props['modelValue']?.[name])
        console.log("the iter", name, props['modelValue']?.[name], JSON.stringify(props['modelValue']?.[name]))
        return {
            name,
            field: state.fields[name],
            // value: vStr ? JSON.parse(vStr) : undefined, // props['modelValue']?.[name], 
            value: props['modelValue']?.[name], 
            handler: createUpdateFieldValue(name)
        }
    }) : []
})


let rendered = 1
</script>

<template>
    <div>
        <div v-if="state.root" class="type">
            <h2>{{rendered++}} type: {{state.name}}</h2>
            <!-- <div>{{JSON.stringify(props?.['modelValue'])}}</div> -->
            <div>
                <div v-for="iii in state.iter" class="field">
                    <p>::{{iii.name}}::</p>
                    <AutoField :field="iii.field" :modelValue="iii.value" @update:modelValue="iii.handler"/>
                </div>
            </div>
        </div>
        <div v-if="!state.root">NO ROOT!!!!!!!!11</div>
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
