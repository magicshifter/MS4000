
<script setup lang="ts">
import {reactive, watchEffect, ref} from "vue"
import AutoControll from "../components/AutoControll.vue"

const props = defineProps<{
    field: any,
    value: any,
    onChange: any,
}>()

// const state = reactive({ 
//   modes: []
// })

const { type, root, name } = props.field

const rootType = props.field


const fields = rootType?.fields
// const modes = Object.keys(rootType.fields).map((name) => ({
//     id: name,
//     t: rootType.fields[name],
//   }))

</script>

<template>
  <div>
    <h1>MS4 Container</h1>
    <div>{{fields ?  fields : "no fields"}}</div>
    <!-- <div v-for="mode in modes">
      <AutoMode :mode="mode" :root="root"/>
    </div> -->
  </div>
</template>
