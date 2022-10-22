
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

const { type, value, onChange } = props

const root = type.root


const fields = type?.fields
const fieldIndex = fields ? Object.keys(fields).map((name) => fields[name]) : []

</script>

<template>
  <div>
    <h1>Auto Type</h1>
    <div>Type: {{type}}</div>
    <div>Fields: {{fields ?  fields : "none"}}</div>
    <div>
        <div v-for="f in fieldIndex">
            field: {{f}}
            <AutoField :field="f" />
        </div>
    </div>
    <!-- <div v-for="mode in modes">
      <AutoMode :mode="mode" :root="root"/>
    </div> -->
  </div>
</template>
