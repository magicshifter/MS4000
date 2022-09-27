export function createRefFunction(name, myRefs) {
  return function(element) {
    myRefs[name] = element
  }
}
