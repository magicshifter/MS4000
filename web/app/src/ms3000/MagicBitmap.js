import {List} from 'immutable'
import {RGB} from '../utils/color'
import Image from "./Image";

function calcBufferSize(bitPerPixel, w, h) {
  if (bitPerPixel === 24) {
    return w * h * 3;
  }
  if (bitPerPixel === 8) {
    return w * h;
  }
  else if (bitPerPixel === 1) {
    if ((w * h) % 8) {
      window.alert('CalcBufferSize: Ugly 1bit BufferSize: ' + (w * h / 8));
      return Math.ceil(w * h / 8);
    }
    return w * h / 8;
  }
  else {
    window.alert('CalcBufferSize: Unknown bitPerPixel Value: ' + bitPerPixel);
  }
}

function unpackPixel(bitPerPixel, fileData, pixelNr, offset) {
  if (bitPerPixel === 24) {
    const idx = pixelNr * 3 + offset
    const r = fileData[idx]
    const g = fileData[idx+1]
    const b = fileData[idx+2]
    return RGB(r,g,b)
  }
  else if (bitPerPixel === 8) {
    const idx = pixelNr + offset
    const x = fileData[idx]
    return RGB(x,x,x)
  }
  else if (bitPerPixel === 1) {
    const bitMask = 1 << (pixelNr % 8)
    const idx = (pixelNr >> 3) + offset;
    const x = fileData[idx] & bitMask ? 255 : 0
    return RGB(x,x,x)
  }
  else {
    throw "unpackPixel: unknown pitPerPixel: " + bitPerPixel
  }
}

function packPixels(bitPerPixel, fileData, pixelNr, offset, rgb) {
  if (bitPerPixel === 24) {
    const idx = pixelNr * 3 + offset
    fileData[idx] = rgb.R
    fileData[idx+1] = rgb.G
    fileData[idx+2] = rgb.B
  }
  else if (bitPerPixel === 8) {
    const idx = pixelNr + offset
    fileData[idx] = rgb.R
  }
  else if (bitPerPixel === 1) {
    const bitMask = 1 << (pixelNr % 8)
    const idx = pixelNr >> 3;
    if (rgb.R !== 0)
    fileData[idx] |= bitMask
  }
  else {
    throw "packPixels: unknown pitPerPixel: " + bitPerPixel
  }
}

export default class MagicBitmap {
  static TYPES = {
    'bitmap': 0xBA,
    'font': 0xF0,
    'bitmap2': 0xB2 // TODO: V2 with delay for each frame
  };

  constructor(type, bitPerPixel, width, height, frames, delayOrFirstCharOrDelayArray) {
    if (!MagicBitmap.encodeType(type)) {
      const txt = "unknown type for MagicBitmap: " + type
      alert(txt)
      throw txt
    }
    this.type = type
    this.bitPerPixel = bitPerPixel
    this.width = width
    this.height = height
    this.frames = frames

    this.delayOrFirstCharOrDelayArray = delayOrFirstCharOrDelayArray

    const framesCnt = frames.length;
    this.framesCnt = framesCnt
    this.headerSize = 16;

    if (!delayOrFirstCharOrDelayArray || delayOrFirstCharOrDelayArray.length !== frames.length) {
      throw "please give array for delays or TODO: implement types"
    }
    this.framesDelays = delayOrFirstCharOrDelayArray
    // TODO: delays nach jedem frame in bitmap2
    this.delayBlockSize = 0
    this.delayBlock = null
    if (type === 'bitmap2') {
      const ds = delayOrFirstCharOrDelayArray
      const n = ds.length
      if (n !== framesCnt) {
        throw "delays must match framesCnt!!! " + n + " " + framesCnt
      }
      this.delayBlockSize = n * 2
      this.delayBlock = ds
    }
    this.firstChar = type === 'font' ? delayOrFirstCharOrDelayArray : 0
    this.delayMs = type === 'bitmap' ? delayOrFirstCharOrDelayArray : 0
  }

  toImage = () => {
    const { width, height, frames, framesDelays } = this
    return new Image(width, height,  frames,  framesDelays)
  }

  static fromImage = (type, bitsPerPixel, image) => {

  }

  static encodeType = (type) => {
    const ts = MagicBitmap.TYPES
    const kk = Object.keys(ts)

    for (var i=0; i < kk.length; i++) {
      const k = kk[i]
      const code = ts[k]

      if (k === type) {
        return code
      }
    }
    return false
  }

  static decodeType = (c) => {
    const ts = MagicBitmap.TYPES
    const kk = Object.keys(ts)

    for (var i=0; i < kk.length; i++) {
      const k = kk[i]
      const code = ts[k]

      if (code === c) {
        return k
      }
    }
    return false
  }

  toBlob = () => {
      const {type, bitPerPixel, width, height, frames, delayOrFirstCharOrDelayArray} = this;
      const { framesCnt, headerSize, firstChar, delayMs, delayBlock, delayBlockSize } = this

      const typeByte = MagicBitmap.encodeType(type)

      if (!typeByte) {
        throw "UNKNOWN MagicBitmap type: " + type
      }

      const fileSize = framesCnt * calcBufferSize(bitPerPixel, width, height) + headerSize + delayBlockSize
      const fileData = new Uint8Array(fileSize);

      // write header
      fileData[0] = 0x23;
      fileData[1] = (fileSize & 0xFF0000) >> 16;
      fileData[2] = (fileSize & 0xFF00) >> 8;
      fileData[3] = (fileSize & 0xFF) >> 0;

      fileData[4] = bitPerPixel;
      fileData[5] = (framesCnt - 1); // 0 for static images larger for animations and fonts
      fileData[6] = width;
      fileData[7] = height;

      fileData[8] = typeByte
      fileData[9] = firstChar; // >= 1 for fonts/ 0 for animations
      fileData[10] = (delayMs & 0xFF00) >> 8; // 0 for fonts
      fileData[11] = (delayMs & 0xFF) >> 0;


      for (var i = 0; i < framesCnt; i++) {
        const pixels = frames[i]

        for (let x = 0; x < width; x++) {
          for (let y = 0; y < height; y++) {
            const idx = x + (y * width);
            const pixel = pixels.get(idx)
            //
            //
            // const fileDataIdx = headerSize + 3 * (width * height * i + y + x * height);
            //
            // fileData[fileDataIdx + 0] = pixel.R;
            // fileData[fileDataIdx + 1] = pixel.G;
            // fileData[fileDataIdx + 2] = pixel.B;
            packPixels(bitPerPixel, fileData, width * height * i + y + x * height, headerSize,pixel)
          }
        }
      }

      const blob = new window.Blob([fileData]);
      return blob;
    };


  static fromArrayBuffer(arrayBuffer) {
    const fileData = new Uint8Array(arrayBuffer)


    if (fileData[0] !== 0x23) {
      throw "File is not an MagicBitmap file"
    }
    var fileSize = fileData[1] << 16;
    fileSize += fileData[2] << 8;
    fileSize += fileData[3]

    const headerSize = 16

    if (fileSize !== fileData.length) {
      throw "File is not a Magicbitmap, corrupted fileSize"
    }

    const bitPerPixel = fileData[4];
    const framesCnt = fileData[5] + 1 // 0 for static images larger for animations and fonts
    const width = fileData[6];
    const height = fileData[7];

    const typeByte = fileData[8]

    const type = MagicBitmap.decodeType(typeByte)
    if (!type) {
      throw "File is not a Magicbitmap, unknown type: " + typeByte
    }
    console.log("decoded as: ", type)


    const firstChar =  fileData[9]; // >= 1 for fonts/ 0 for animations
    let delayMs = fileData[10] << 8; // 0 for fonts
    delayMs += fileData[11]


    let delayOrFirstCharOrDelayArray = type === 'font' ? firstChar : delayMs

    const frames = []

    // TODO: fix delaysHACK
    const delaysHACK = []
    for (var i = 0; i < framesCnt; i++) {
      const pixels = []

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          // const fileDataIdx = headerSize + 3 * (width * height * i + y + x * height);
          // const r = fileData[fileDataIdx + 0]
          // const g = fileData[fileDataIdx + 1]
          // const b = fileData[fileDataIdx + 2]

          const rgb = unpackPixel(bitPerPixel, fileData, width * height * i + y + x * height, headerSize)

          //const rgb = RGB(r,g,b)
          pixels.push(rgb)
        }
      }

      frames.push(List(pixels))
      delaysHACK.push(2323)
    }

    return new MagicBitmap(type, bitPerPixel, width, height, frames, delaysHACK) //delayOrFirstCharOrDelayArray)
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
