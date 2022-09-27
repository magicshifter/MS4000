
// sadly the Arry.map function is slow
export function arrayMap(array, fn) {
  const arrNew = [];
  for (var i = 0; i < array.length; i++) {
    arrNew.push(fn(array[i], i, array));
  }
  return arrNew;
}

export function arrayForEach(array, fn) {
  for (var i = 0; i < array.length; i++) {
    fn(array[i], i, array)
  }
}

export function objectForEach(object, fn) {
  const keys = Object.keys(object)
  const keysLen = keys.length
  for (let i = 0; i < keysLen; i++) {
    const key = keys[i]
    const node = object[key]
    fn(node, key, object)
  }
}

export function arrayAny(array, fn) {
  for (var i = 0; i < array.length; i++) {
    if (fn(array[i], i, array))
      return true
  }
  return false
}
