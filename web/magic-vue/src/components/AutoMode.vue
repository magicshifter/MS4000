<script setup lang="ts">
import type { Mode } from '@/types';
import AutoInterfaceView from '../views/AutoInterfaceView.vue'

import {reactive, watchEffect} from "vue"

const props = defineProps<{
    mode: Mode,
    root: any
}>()



const state = reactive({ 
  modes: [],
  typeName: "",
  fieldNames: []
})


watchEffect(() => {

    console.log("a child", props.mode)
    console.log("props.mode?.t?.fields", props.mode?.t?.fields)
    console.log("model?.t.type",  props.mode?.t.type)
    console.log("Object.keys(props.root.lookupType('Bike').fields)", Object.keys(props.root.lookupType("Bike").fields))

    const type = props.mode?.t

    const typeName = type.type

    state.typeName = typeName
    // state.fieldNames = Object.keys(type.lookupType(typeName).fields)
    // state.fieldNames = Object.keys(type.fields)
})

</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ mode.id }}</h1>
    <h3>typeName: {{state.typeName}}</h3>
    <h3>fiedls: {{state.fieldNames}}</h3>

    <!-- TSTR: {{mode?.t.type}} -->

    <!-- TYPTE: {{typeof(mode?.t.type)}} -->

    <!-- {{root.lookupType("MS4").fields}} -->
    <!-- {{root.lookupType(mode?.t.type)}} -->
    <!-- ROOT: {{root.lookupType || "none"}} -->

  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
