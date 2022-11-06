<script lang="ts">
  import protobuf from 'protobufjs'
</script>


<script setup lang="ts">
import {reactive, watchEffect, ref} from "vue"
import AutoControll from "../components/AutoControll.vue"
import AutoType from "./AutoType.vue"

const emit = defineEmits(['update:modelValue'])

const props = defineProps<{
    field: any,
    modelValue: any
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

console.log("AutoField", props['modelValue'], typeLookup == lookup, lookup)
const isEnum = lookup instanceof protobuf.Enum
const isType = lookup instanceof protobuf.Type

values = lookup?.values
const valueIndex = values ? Object.keys(values) : []

let isNativeType = false
if (!isEnum && !isType) {
    isNativeType = true
    console.log("not an enum not a type what is it??", name, field)
}


function onChangeValue(evt) {
  const txt = evt.target.value;
  console.log("got new field value (str):", txt)
  // props["update:modelValue"] = txt

  emit('update:modelValue', txt)
}


function onTypeChanged(x) {
  console.log("got new type value (obj):", x)
  emit('update:modelValue', x)
}

</script>

<template>
  <div>
    <h3>field: {{name}} {{isEnum ? " | isEnum" : ""}} {{isType ? " | isType" : ""}} | typeof({{type}}) | native?{{isNativeType}}</h3>
    <div>{{JSON.stringify(props['modelValue'])}}</div>
    <div v-if="!typeLookup || isNativeType">{{name}}: <input type="text" :value="props?.['modelValue']" @change="onChangeValue"/></div>
    <div v-if="lookup != undefined" class="type">
        <div v-for="valueName in valueIndex">{{valueName}} : {{values[valueName]}}</div>
        <AutoType  v-if="typeLookup != undefined"  :type="typeLookup" :modelValue="props?.['modelValue']?.[name]" @update:modelValue="onTypeChanged"/>
    </div>
  </div>
</template>


<style scoped>
.type {
  padding: 1em;
}
</style>
