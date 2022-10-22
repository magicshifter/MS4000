
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
const { name } = type

const root = type.root


const fields = type?.fields
const fieldIndex = fields ? Object.keys(fields).map((name) => fields[name]) : []

</script>

<template>
  <div class="type">
    <h2>type: {{name}}</h2>
    <div>
        <div v-for="f in fieldIndex" class="field">
            <AutoField :field="f" />
        </div>
    </div>
    

    <!-- <div>Type: {{type}}</div>
    <div>Fields: {{fields ?  fields : "none"}}</div>
    <div>
        <div v-for="f in fieldIndex">
            field: {{f}}
            <AutoField :field="f" />
        </div>
    </div> -->
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
