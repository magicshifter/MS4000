<script lang="ts">
  import protobuf from 'protobufjs'

  export function promiseProtocolBuffers() {
  var promise = new Promise(function(resolve, reject) {
    protobuf.load("MS3000.proto", function (err, root) {
      if (err) {
        reject(new Error(err));
      }
      else {
        resolve(root);
      }
    })
  });

  return promise
}
</script>


<script setup lang="ts">
import {reactive, watchEffect} from "vue"





// import {getProtocolBuffersPromise} from "@/utils/protoBufLoader"

const state = reactive({ 
  modes: [],

})

const promise = promiseProtocolBuffers()
promise.then((root) => {
  console.log("the proto", root)

  state.modes = Object.keys(root).map((name) => ({
    name,
    t: root[name]
  }))
})

</script>

<template>
  <div>
    Hello Auto World!
    <div v-for="mode in state.modes">
      {{mode.name}}
    </div>
  </div>
</template>
