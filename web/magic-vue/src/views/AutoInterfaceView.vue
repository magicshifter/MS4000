<script>
  
</script>


<script setup lang="ts">
import {reactive, watchEffect} from "vue"

import protobuf from 'protobufjs'

export function promiseProtocolBuffers() {
  var promise = new Promise(function(resolve, reject) {
    protobuf.load("MS3000.proto", function (err, root) {
      if (err) {
        reject(new Error(err));
      }
      else {
        resolve(root, root.lookupType("MS3KG"));
      }
    })
  });

  return promise
}

// import {getProtocolBuffersPromise} from "@/utils/protoBufLoader"

const state = reactive({ 
  count: 0,

})

const promise = promiseProtocolBuffers()
promise.then((root, ms4) => {
  console.log("the proto", ms4, root)
})

</script>

<template>
  <div>
    Hello Auto World!
  </div>
</template>
