

<script lang="ts">
  import protobuf from 'protobufjs'
import { configUpload, decodeBase64 } from "@/ms/ms4000";
import {smartStringify} from "@/utils/json"


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
import AutoType from "@/components/AutoType.vue"




const baseUrl = "http://192.168.4.1"

const templateProtoText = `
{
    "apps": {
        "current": 1,
        "shake": {
            "colorIndex": 1,
            "bounce": 3
        },
        "light": {
            "mode": 1,
            "triggerSpeed": 1000,
            "colorIndex": 1
        },
        "beat": {
            "mode": 1,
            "sensitivity": 1,
            "color": {
                "R": 255,
                "G": 121,
                "B": 0
            }
        }
    }
}
`



const state = reactive({
  autoUpdate: false,
  protoText: templateProtoText.trim(),
  protoObj: JSON.parse(templateProtoText),
  errorText: "OK",
  undefined: undefined,

})


const theRoot = ref("")

const promise = promiseProtocolBuffers()
promise.then((root) => {
  console.log("the proto", root)

  theRoot.value = root

  const rootType = root["MS4"]



  // const testDataBase64 = "ChIIADoOCAEQARoICP8BEHkY/wE="
  // const testDataBase64 = "ChIIBDoOCAEQARoICP8BEHkY/wE=" // current = 4
  // const testDataBase64 = "ChIIAToOCAEQARoICP8BEHkY/wE=" // current = 1
  const testDataBase64 = "ChIIADoOCAEQARoICP8BEHkY/wE=" // current = 1



  const decodedObj = decodeBase64(testDataBase64, rootType)
  console.log("decoded MS4", decodedObj)

  



  state.rootType = rootType
  state.root = root
  state.modes = Object.keys(rootType.fields).map((name) => ({
    id: name,
    t: rootType.fields[name],
  }))
  
})

watchEffect(()=> {
  try {
    state.protoObj = JSON.parse(state.protoText)
    state.errorText = "OK :)"

    console.log("AutoIntefrace watching for TExt cvhange done new obj stored, autoUpdate?", state.autoUpdate)

    if (state.autoUpdate)
      onClickUploadToShifter()
  }
  catch (ex) {
    state.errorText = "JSON parsing error"
  }
})


function onClickLoadFromShifter() {
  let url = baseUrl + "/protobuf"

  fetch(url).then(file => {
    console.log("fetched", file)
    file.text().then(text => {
      console.log("text", text)

      const protoObj = decodeBase64(text, state.rootType)
      console.log("proto obj:", protoObj)

      state.protoText = smartStringify(protoObj)
      state.protoObj = protoObj
    })
  })
}

function onClickUploadToShifter() {
  configUpload(state.protoObj, state.rootType)
}

// function stringToArray(bufferString) {
//   var array = new Uint8Array(new ArrayBuffer(bufferString.length));

//   for (var i = 0; i < bufferString.length; i++) {
//     array[i] = bufferString.charCodeAt(i);
//   }
//   return array
// }

// function decodeBase64(text, pbType) {
//   var decoded = atob(text)
//     console.log("b64 decoded", decoded)
//     var u8a = stringToArray(decoded);
//     //dumpU8(u8a)
//     console.log("u8", u8a)

//     try {
//       const shifterState = pbType.decode(u8a);
//       console.log("shifterState decoded MS4", shifterState)

//       var object = pbType.toObject(shifterState, {
//         longs: undefined,
//         enums: undefined,
//         bytes: undefined,
//       });

//       console.log("after toObject decoded MS4", object)

//       return object
//     }
//     catch (ex) {
//       console.error("Decoding failed", ex)
//     }
// }


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


function onChangeAuto(x) {
  console.log("AutoInterface.onChangeAuto")
  state.protoText = smartStringify(x)
  state.protoObj = x
}

let rendered = 1
</script>

<template>
  <div>
    <h1>MS4 Auto Interface</h1>
    <h2>JSON&nbsp;&nbsp;<label><input type="checkbox" v-model="state.autoUpdate"/> auto update</label></h2>
    <button @click="onClickLoadFromShifter">Get State FROM Shifter</button>
    <button @click="onClickUploadToShifter">Upload TO Shifter</button>
    <div>{{state.errorText}}</div>
    <textarea v-model="state.protoText" class="myTextarea" />
    <div>{{JSON.stringify(state.protoObj)}}</div>


    <div v-if="state.rootType != undefined">
      <div>root not undefined...</div>
      <div>{{rendered++}}</div>
      <AutoType :type="state.rootType" :modelValue="state.protoObj" @update:modelValue="onChangeAuto"/>
    </div>
  </div>
</template>
