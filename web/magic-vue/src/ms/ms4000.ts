
function setBase64LED(data: number[]) {
    // // const host = ""

  // fetch(host + '/protobuf')
  //   .then(data => data.text())
  //   .then(text => {
  //     var decoded = atob(text)
  //     console.log("b64 decoded", decoded)
  //     var u8a = stringToArray(decoded);
  //     //dumpU8(u8a)
  //     console.log("u8", u8a)
}

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

function getProto(): Promise<any> {
    const state = getState()
    const const

    fetch(host + '/protobuf')
    .then(data => data.text())
    .then(text => {
        var decoded = atob(text)
        console.log("b64 decoded", decoded)
        var u8a = stringToArray(decoded);
        //dumpU8(u8a)
        console.log("u8", u8a)

        try {
        const shifterState = pb.MS3KG.decode(u8a);

        var object = pb.MS3KG.toObject(shifterState, {
            longs: undefined,
            enums: undefined,
            bytes: undefined,
        });

        dispatch(configDownloadSuccess())
        dispatch(configUpdate(object))
        }
        catch (ex) {
        dispatch(configDownloadFail("shifterstate fetch decode error: " + ex))
        }
    })
    .catch(error => {
        console.error('Error:', error)
        dispatch(configDownloadFail(error))
    });
}