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

const state = reactive({ 
  type: undefined, 
  root: undefined,
  name: undefined,
  typeLookup: undefined,
  values: undefined,
  lookup: undefined,
  valueIndex: undefined,
  isEnum: undefined,
  isType: undefined,
  isNativeType: undefined,
})

watchEffect(() => {

  const {field} = props 
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

  console.log("AutoField", props['modelValue'], typeLookup == lookup, lookup, name)
  const isEnum = lookup instanceof protobuf.Enum
  const isType = lookup instanceof protobuf.Type

  values = lookup?.values
  const valueIndex = values ? Object.keys(values) : []

  let isNativeType = false
  if (!isEnum && !isType) {
      isNativeType = true
      console.log("not an enum not a type what is it??", name, field)
  }

  const llll = props?.['modelValue'] ? 
  JSON.stringify(props?.['modelValue'])?.length : 0

  state.type = type
  state.root = root
  state.name = name
  state.typeLookup = typeLookup
  state.values = values
  state.lookup = lookup
  state.valueIndex = valueIndex
  state.isEnum = isEnum
  state.isType = isType
  state.isNativeType = isNativeType
  state.llll = llll
})

watchEffect(() => {
    state.modelValueClone = props["modelValue"]
    state.txtxtx = JSON.stringify(props['modelValue'])
})


function onChangeValue(evt) {
  const txt = evt.target.value;

// function onChangeValue(txt) {

  console.log("got new field value (str):", txt)
  // props["update:modelValue"] = txt

  try {
    const obj = JSON.parse(txt)
    console.log("got new field value (obj):", obj)
    emit('update:modelValue', obj)
  }
  catch (ex) {
      console.error("error parsing json in Field onChangeValue", ex)
  }
  
}


function onTypeChanged(x) {
  console.log("got new type value (obj):", x)
  emit('update:modelValue', x)
}



</script>

<template>
  <div>
    <h3>field: {{state.name}} {{state.isEnum ? " | isEnum" : ""}} {{state.isType ? " | isType" : ""}} | typeof({{state.type}}) | native?{{state.isNativeType}}</h3>
    <!-- <div>{{JSON.stringify(props['modelValue'])}}</div> -->
    <div v-if="true || !state.typeLookup || state.isNativeType">
      <textarea @change="onChangeValue" :value="state.txtxtx"
      :class="state.llll > 150 ? 'myTextareaMedium' : state.llll < 20 ? 'myTextareaVerySmall' : 'myTextareaSmall'"/>
    </div>
    <div v-if="state.lookup != undefined" class="type">
        <div v-for="valueName in state.valueIndex">{{valueName}} : {{state.values[valueName]}}</div>
        <AutoType  v-if="state.typeLookup != undefined"  :type="state.typeLookup" :modelValue="props['modelValue']" @update:modelValue="onTypeChanged"/>
    </div>
  </div>
</template>


<style scoped>
.type {
  padding: 1em;
}
</style>
