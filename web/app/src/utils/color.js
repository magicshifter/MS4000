import Color from "color"
import {List} from "immutable";

export function emptyPixel(w, h) {
  const pixel = []
  const black = {R:0, G: 0, B: 0} // all share same black :)
  for (var i = 0; i < w*h; i++) {
    pixel.push(black)
  }
  return List(pixel)
}

export function createRGB(r, g, b) {
  return {
    R: r, G: g, B: b
  }
}
export const RGB = createRGB

export function createRGBFromHex(hex) {
  const color = Color(hex)
  return createRGBFromColor(color)
}

export function createRGBFromColor(color) {
  return createRGB(color.red(), color.green(), color.blue())
}

export function hexFromRGB(c) {
  const color = Color.rgb(c.R, c.G, c.B)
  return color.hex()
}

export function equRGB(a, b) {
  return a.R === b.R && a.G === b.G && a.B === b.B
}

export function avg(rgb) {
  const avg = (rgb.R + rgb.G + rgb.B)/3;
  return avg
}


export function paletteFromImage(frames) {
  const colors = {}

  console.log("paletteFromImag")

  for (var fNr = 0; fNr < frames.length; fNr++) {
    const pixel = frames[fNr]
    for (var i = 0; i < pixel.size; i++) {
      var c = pixel.get(i)
      var hex = hexFromRGB(c)
      colors[hex] = true
    }
  }

  const keys = Object.keys(colors).sort((a, b) => {
    var c1 = Color(a)
    var c2 = Color(b)
    return c1.hue() - c2.hue()
  })

  const p = keys.map(hex => createRGBFromHex(hex))
  return p
}


export function shadeRGB(rgb, offset=100) {
  const a = avg(rgb)

  if (a > 127) {
    return RGB(
      Math.max(rgb.R - offset, 0),
      Math.max(rgb.G - offset, 0),
      Math.max(rgb.B - offset, 0)
    )
  }
  else {
    return RGB(
      Math.min(rgb.R + offset, 255),
      Math.min(rgb.G + offset, 255),
      Math.min(rgb.B + offset, 255)
    )
  }

}

