<script lang="ts">
  import protobuf from 'protobufjs'
</script>


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


let typeLookup: any = undefined
let values = []
try {
    typeLookup = root.lookupType(type)
    values = typeLookup.values
}
catch (ex) {
    console.warn("could not lookup Type " + type + " in:", field)
}




const lookup = root.lookup(type) //field.type)

console.log("AutoField", typeLookup == lookup, lookup)
const isEnum = lookup instanceof protobuf.Enum
const isType = lookup instanceof protobuf.Type

values = lookup?.values
const valueIndex = values ? Object.keys(values) : []

if (!isEnum && !isType) {
    console.log("not an enum not a type what is it??", name, field)
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
    <h3>field: {{name}} {{isEnum ? " | isEnum" : ""}} {{isType ? " | isType" : ""}}</h3>
    <!-- <div>field: {{field}}</div>
    <div>type: {{type}}</div> -->
    
    <div v-if="lookup != undefined" class="type">
        <div v-for="valueName in valueIndex">{{valueName}} : {{values[valueName]}}</div>
        <AutoType  v-if="typeLookup != undefined"  :type="typeLookup" />
    </div>
  </div>
</template>


<style scoped>
.type {
  padding: 1em;
}
</style>
