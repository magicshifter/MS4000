<script setup lang="ts">
import { bytesToBase64 } from "@/utils/base64";
import { enumNumberMember, numberLiteralTypeAnnotation, type EnumNumberMember } from "@babel/types";
import {reactive, watchEffect, ref} from "vue"

type rgbaArr = [r: number, g:number, b:number, a: number]

interface RGBA {
  r: number
  g: number
  b: number
  a: number
}

const LEDS = 16

function rgbaArrayToPlainArray(ledValues: RGBA[]): number[] {
  const result = []

  const l = ledValues.length
  for (let i = 0; i < l; i++) {
    const led = ledValues[i]
    result.push(led.a)
    result.push(led.b)
    result.push(led.g)
    result.push(led.r)
  }
  return result
}

function createRGBA(r: number = 0, g: number = 0, b: number = 0, a: number = 255) {
  return ({
    a, r, g, b
  })
}


const state = reactive({ 
  // ledValues: new Array(LEDS * 4),
  ledValues: [{r:255, g:110, b:0, a: 23}],
  base64: "hello world!",
})

const lV = []
for (let i = 0; i < LEDS; i++) {
  lV.push(createRGBA())
}
state.ledValues = lV

watchEffect(()=> {
  state.base64 = bytesToBase64(rgbaArrayToPlainArray(state.ledValues))
})

let i = 0

function onClickUpdateLeds() {
  let url = "http://192.168.4.1/leds?b=/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAA=="

  if (i % 2 == 0) url = 'http://192.168.4.1/leds?b=' + state.base64

  i++

  fetch(url)

  // requestAnimationFrame(onClickUpdateLeds)
}

</script>

<template>
  <div>
    <h1>Direct LEDS</h1>
    <template v-for="ledValue, idx in state.ledValues">
      <p>
        <div :style="{'background-color':
          `rgb(${ledValue.r} ${ledValue.g} ${ledValue.b})`}">
          <input type="number" v-model="ledValue.r" min="0" max="255" step="16" class="decimalByte" />
          <input type="number" v-model="ledValue.g" min="0" max="255" step="16" class="decimalByte" />
          <input type="number" v-model="ledValue.b" min="0" max="255" step="16" class="decimalByte" />
          <input type="number" v-model="ledValue.a" min="0" max="255" step="16" class="decimalByte" />
        </div></p>
    </template>
    <div>
      {{state.base64}}
    </div>
    <a :href="'http://192.168.4.1/leds?b=' + state.base64" target="_blank">send to shifter</a>
    <button @click="onClickUpdateLeds">Upload to Shifter :)</button>
  </div>
</template>

<style>
.decimalByte {
  width: 4em;
}
</style>
