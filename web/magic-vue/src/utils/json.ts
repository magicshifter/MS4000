
export function smartStringify(json) {
  const simpleTxt = JSON.stringify(json)
  if (simpleTxt && simpleTxt.length > 100) {
    //return JSON.stringify(json, undefined, " ")
    return nicerStringify(json)
  }
  return simpleTxt
}

// TODO rename smartStringify to smthng better because of clash with smartInputBinding
export const compactJSONStringify = smartStringify

export function nicerStringify(json) {
  return smartGroupArrays(JSON.stringify(json, undefined, " "), 0)
}

export function smartGroupArrays(str, maxChar) {
  const lines = str.split("\n");

  //console.log("smartGroupArrays", lines)

  let result = ""
  let lineAcc  = ""

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    const tl = line.trim()

    const testAcc = lineAcc + tl
    if (tl.endsWith('{') || tl === '}' || tl === '},') {
      if (lineAcc !== "") {
        result += lineAcc + "\n"
      }
      result += line + "\n"
      lineAcc = ""
    }
    else if (tl.includes(':')) {
      if (lineAcc !== "") {
        result += lineAcc + "\n"
      }
      lineAcc = line
    }
    else if (maxChar && testAcc.length > maxChar) {
      result += lineAcc + "\n"
      lineAcc = line
    }
    else {
      if (lineAcc === "") {
        lineAcc = line
      }
      else {
        lineAcc +=  " " + tl
      }
    }
  }
  if (lineAcc !== "") {
    result += lineAcc
  }

  return result
}
