<script setup lang="ts">
import { enumNumberMember, numberLiteralTypeAnnotation, type EnumNumberMember } from "@babel/types";
import {reactive, watchEffect, ref} from "vue"

type rgbaArr = [r: number, g:number, b:number, a: number]

interface RGBA {
  r: number
  g: number
  b: number
  a: number
}

const LEDS = 100


const state = reactive({ 
  // ledValues: new Array(LEDS * 4),
  ledValues: [{r:255, g:110, b:0, a: 23}, {r:255, g:255, b:0, a: 0}, {r:255, g:0, b:255, a: 100}, {r:0, g:0, b:255, a: 255}, {r:255, g:255, b:0, a: 255}]
})

watchEffect(()=> {
})

// function setPixel(i, [r, g, b, a]) {
//   const idx = i * 4
//   state.ledValues[idx] = r
//   state.ledValues[idx] = r
//   state.ledValues[idx] = r
//   state.ledValues[idx] = r
// }

</script>

<template>
  <div>
    <h1>Direct LEDS</h1>
    <template v-for="ledValue, idx in state.ledValues">
      <p>
        <div :style="{'background-color':
          `rgb(${ledValue.r} ${ledValue.g} ${ledValue.b})`}">
          <input type="number" v-model="ledValue.r" min="0" max="256" step="16" />
          <input type="number" v-model="ledValue.g" min="0" max="256" step="16" />
          <input type="number" v-model="ledValue.b" min="0" max="256" step="16" />
          <input type="number" v-model="ledValue.a" min="0" max="256" step="16" />
        </div></p>
    </template>
  </div>
</template>
