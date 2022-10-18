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

const state = reactive({ 
  modes: [],

})

const promise = promiseProtocolBuffers()
promise.then((root) => {
  console.log("the proto", root)

  const rootType = root["MS3KG"]["App"]

  state.modes = Object.keys(rootType).map((name) => ({
    name,
    t: rootType[name]
  }))
})

</script>

<template>
  <div>
    <h1>MS4 Auto Interface</h1>
    <div v-for="mode in state.modes">
      {{mode.name}}
    </div>
  </div>
</template>
