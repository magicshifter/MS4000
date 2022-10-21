

<script lang="ts">
  import protobuf from 'protobufjs'
  import AutoMode from "@/components/AutoMode.vue"

  export function promiseProtocolBuffers() {
  var promise = new Promise(function(resolve, reject) {
    protobuf.load("MS4.proto", function (err, root) {
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
import {reactive, watchEffect, ref} from "vue"
import AutoControll from "../components/AutoControll.vue"

const state = reactive({ 

})

const theRoot = ref("")

const promise = promiseProtocolBuffers()
promise.then((root) => {
  console.log("the proto", root)

  theRoot.value = root

  const rootType = root["MS4"]["App"]

  state.root = root
  state.modes = Object.keys(rootType.fields).map((name) => ({
    id: name,
    t: rootType.fields[name],
  }))
  
})

</script>

<template>
  <div>
    <h1>MS4 Auto Interface</h1>
    <div v-for="mode in state.modes">
      <AutoMode :mode="mode" :root="theRoot"/>
      <AutoControll :field="mode.t" value="hello value world" />
    </div>
  </div>
</template>
