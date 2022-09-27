import {List} from 'immutable'
import UPNG from 'upng-js'
import {RGB} from '../utils/color'
import {isInteger} from '../utils/types'

export default class Image {
  constructor(width, height, frames, delayMsOrArray) {
    this.width = width
    this.height = height
    this.frames = frames

    if (isInteger(delayMsOrArray)) {
      this.framesDelays = []
      for (var i = 0; i < frames.length; i++) {
        this.framesDelays.push(delayMsOrArray)
      }
    }
    else {
      if (delayMsOrArray.length !== frames.length) {
        throw "Image.constructor delays dont have same len as frames: " + delayMsOrArray.length + " " + frames.length
      }
      this.framesDelays = delayMsOrArray
    }
  }

  toPNG() {
    const { width, height, frames, framesDelays } = this

    const fS = frames.length
    const buffers = []

    for (var i=0; i < fS; i++) {
      const pixel = frames[i]

      const rgba = new Uint8Array(width * height * 4);

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = y * width + x
          const rgbaIdx = (y * width + x) * 4
          const rgb = pixel.get(idx)

          rgba[rgbaIdx + 0] = rgb.R
          rgba[rgbaIdx + 1] = rgb.G
          rgba[rgbaIdx + 2] = rgb.B
          rgba[rgbaIdx + 3] = 255
        }
      }
      buffers.push(rgba.buffer)
    }

    if (buffers.length !== framesDelays.length) {
      throw "Image.toPNG delays dont have same len as frames: " + buffers.length + " " + framesDelays.length
    }

    return UPNG.encode(buffers, width, height, 0, framesDelays)
  }

  static fromPNG(arrayBuffer) {
    var png = UPNG.decode(arrayBuffer);

    console.log("fromPNG", png.frames)

    const sizeX = png.width
    const sizeY = png.height
    // if (sizeY !== 16) {
    //   alert("PNG must be 16 pixel high. the given one is " + sizeY)
    //   return
    // }

    if (sizeY > 1000 || sizeX > 1000) {
      alert("PNG is largert than 1000px no thanx! " + sizeX + "/" + sizeY)
      return
    }


    const frames = []
    const delays = []
    const pngRGBAs = UPNG.toRGBA8(png)
    for (var i = 0; i < pngRGBAs.length; i++) {
      let delay = png.frames.length > i ? png.frames[i].delay : 1234

      delays.push(delay)
      const pngRGBA = new Uint8Array(pngRGBAs[i])
      //console.log("working on frame", i, pngRGBA)

      const patternData = []

      for (let yy = 0; yy < sizeY; yy++) {
        for (let xx = 0; xx < sizeX; xx++) {
          const idxPng = (yy * sizeX + xx) * 4
          const r = pngRGBA[idxPng]
          const g = pngRGBA[idxPng + 1]
          const b = pngRGBA[idxPng + 2]
          //console.log("pixel png", r, g, b, idxPng)
          const rgb = RGB(r, g, b)
          patternData.push(rgb)
        }
      }

      frames.push(List(patternData))
    }

    console.log("decoded PNG", frames)
    return new Image(sizeX, sizeY, frames, delays)
  }

  static fromMagicBitmap(arrayBuffer) {
   throw "Not implemented yet"
  }

  static toMagicBitmap() {
    throw "Not implemented yet"
  }

  clone() {
    const { width, height, frames } = this
    return new Image(width, height, frames)
  }

  mirror(x, y) {
    throw Error('TODO: implement flip')
  }

  rotate(rad) {
    // const { channels, width, height, patternData: oldData } = this
    // const [nW, nH] = Utils.rotate2DSize(width, height, rad)
    // const [nWS, nHS] = Utils.rotate2D(width, height, rad)
    //
    //
    // const newPatternData = new Uint8Array(nW * nH * channels)
    //
    // for (let y = 0; y < height; y++) {
    //   for (let x = 0; x < width; x++) {
    //     const idx = (y * width + x) * channels
    //     let [xx, yy] = Utils.rotate2D(x, y, rad)
    //     if (nWS < 0) xx = (nW - 1) + xx
    //     if (nHS < 0) yy = (nH - 1) + yy
    //     const newIdx = (yy * nW + xx) * channels
    //     for (let i = 0; i < channels; i++) {
    //       newPatternData[newIdx + i] = oldData[idx + i]
    //     }
    //   }
    // }
    // this.width = nW
    // this.height = nH
    // this.patternData = newPatternData
  }
}
