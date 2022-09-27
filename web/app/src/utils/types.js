export function isString(myVar) {
  return typeof myVar === 'string' || myVar instanceof String
}

export function isFloat(n) {
  return n === +n && n !== (n | 0)
}

export function  isInteger(n) {
  return n === +n && n === (n | 0)
}

export function defaultParseInt(s, def = 0, radix = 10) {
  const v = parseInt(s, radix)
  if (isNaN(v))
    return def
  return v
}


