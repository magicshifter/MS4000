

<script lang="ts">
  import protobuf from 'protobufjs'


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
import AutoControll from "@/components/AutoControll.vue"
import AutoMode from "@/components/AutoMode.vue"
  import AutoType from "@/components/AutoType.vue"

const state = reactive({ 

})

const theRoot = ref("")

const promise = promiseProtocolBuffers()
promise.then((root) => {
  console.log("the proto", root)

  theRoot.value = root

  const rootType = root["MS4"]



  // const testDataBase64 = "ChIIADoOCAEQARoICP8BEHkY/wE="
  const testDataBase64 = "ChIIBDoOCAEQARoICP8BEHkY/wE=" // current = 4
  // const testDataBase64 = "ChIIAToOCAEQARoICP8BEHkY/wE=" // current = 1

  const decodedObj = decodeBase64(testDataBase64, rootType)
  console.log("decoded MS4", decodedObj)

  



  state.rootType = rootType
  state.root = root
  state.modes = Object.keys(rootType.fields).map((name) => ({
    id: name,
    t: rootType.fields[name],
  }))
  
})


function stringToArray(bufferString) {
  var array = new Uint8Array(new ArrayBuffer(bufferString.length));

  for (var i = 0; i < bufferString.length; i++) {
    array[i] = bufferString.charCodeAt(i);
  }
  return array
}

function decodeBase64(text, pbType) {
  var decoded = atob(text)
    console.log("b64 decoded", decoded)
    var u8a = stringToArray(decoded);
    //dumpU8(u8a)
    console.log("u8", u8a)

    try {
      const shifterState = pbType.decode(u8a);
      console.log("shifterState decoded MS4", shifterState)

      var object = pbType.toObject(shifterState, {
        longs: undefined,
        enums: undefined,
        bytes: undefined,
      });

      console.log("after toObject decoded MS4", object)

      return object
    }
    catch (ex) {
      console.error("Decoding failed", ex)
    }
}


  // // const host = 'http://MS3000-7161.local'
  // const host = 'http://192.168.4.1'
  // // const host = ""

  // fetch(host + '/protobuf')
  //   .then(data => data.text())
  //   .then(text => {
  //     var decoded = atob(text)
  //     console.log("b64 decoded", decoded)
  //     var u8a = stringToArray(decoded);
  //     //dumpU8(u8a)
  //     console.log("u8", u8a)

  //     try {
  //       const shifterState = pb.MS3KG.decode(u8a);

  //       var object = pb.MS3KG.toObject(shifterState, {
  //         longs: undefined,
  //         enums: undefined,
  //         bytes: undefined,
  //       });

  //       dispatch(configDownloadSuccess())
  //       dispatch(configUpdate(object))
  //     }
  //     catch (ex) {
  //       dispatch(configDownloadFail("shifterstate fetch decode error: " + ex))
  //     }
  //   })
  //   .catch(error => {
  //     console.error('Error:', error)
  //     dispatch(configDownloadFail(error))
  //   });

</script>

<template>
  <div>
    <h1>MS4 Auto Interface</h1>
    <div>
      <AutoType v-if="state.rootType" :type="state.rootType" value="???" />
    </div>
  </div>
</template>
