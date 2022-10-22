
<script setup lang="ts">
import {reactive, watchEffect, ref} from "vue"
import AutoControll from "../components/AutoControll.vue"
import AutoType from "./AutoType.vue"

const props = defineProps<{
    field: any,
    value: any,
    onChange: any,
}>()

// const state = reactive({ 
//   modes: []
// })

const {field, value} = props 
const {type, root, name } = field


let t = undefined
try {
    t = root.lookupType(type)
}
catch (ex) {
    console.warn("could not lookup Type " + type + " in:", field)
}
// const rootType = props.field


// const fields = rootType?.fields
// // const modes = Object.keys(rootType.fields).map((name) => ({
// //     id: name,
// //     t: rootType.fields[name],
// //   }))

</script>

<template>
  <div>
    <h2>Auto Field</h2>
    <div>field: {{field}}</div>
    <div>type: {{type}}</div>
    <!-- rio {{root}}ot: -->
    <AutoType :type="t" v-if="t != undefined"/>
  </div>
</template>
