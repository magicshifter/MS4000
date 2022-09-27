
export const PIXEL_EDITOR_SET_PALETTE = "PIXEL_EDITOR_SET_PALETTE"
export const PIXEL_EDITOR_ADD_TO_PALETTE = "PIXEL_EDITOR_ADD_TO_PALETTE"

export const PIXEL_EDITOR_SET_IMAGE_NAME = "PIXEL_EDITOR_SET_IMAGE_NAME"
export const PIXEL_EDITOR_SET_ACTIVE_FRAME = "PIXEL_EDITOR_SET_ACTIVE_FRAME"
export const PIXEL_EDITOR_CHANGE_SIZE = "PIXEL_EDITOR_CHANGE_SIZE"
export const PIXEL_EDITOR_CHANGE_IMAGE = "PIXEL_EDITOR_CHANGE_IMAGE"
export const PIXEL_EDITOR_RESET_IMAGE = "PIXEL_EDITOR_RESET_IMAGE"
export const PIXEL_EDITOR_CHANGE_PIXEL = "CHANGE_PIXEL"
export const PIXEL_EDITOR_SCROLL_PIXEL = "PIXEL_EDITOR_SCROLL_PIXEL"

export const PIXEL_EDITOR_MOVE_FRAME = 'PIXEL_EDITOR_MOVE_FRAME'
export const PIXEL_EDITOR_ADD_NEW_FRAME = 'PIXEL_EDITOR_ADD_NEW_FRAME'
export const PIXEL_EDITOR_DUPLICATE_FRAME = 'PIXEL_EDITOR_DUPLICATE_FRAME'
export const PIXEL_EDITOR_DELETE_FRAME = 'PIXEL_EDITOR_DELETE_FRAME'
export const PIXEL_EDITOR_SET_FRAME_DELAY = 'PIXEL_EDITOR_SET_FRAME_DELAY'

export const PIXEL_EDITOR_CHANGE_TOOL = "CHANGE_TOOL"
export const PIXEL_EDITOR_CHANGE_TOOL_SIZE = "CHANGE_TOOL_SIZE"
export const PIXEL_EDITOR_SET_COLOR = "PIXEL_EDITOR_SET_COLOR"



export const pixelEditorSetTool = (tool) => ({
  type: PIXEL_EDITOR_CHANGE_TOOL,
  tool
})

export const pixelEditorSetToolSize = (toolSize) => ({
  type: PIXEL_EDITOR_CHANGE_TOOL_SIZE,
  toolSize
})

export const pixelEditorSetImageName = (name) => ({
  type: PIXEL_EDITOR_SET_IMAGE_NAME,
  name
})

export const pixelEditorSetPalette = (palette) => ({
  type: PIXEL_EDITOR_SET_PALETTE,
  palette
})

export const pixelEditorAddToPalette = (color) => ({
  type: PIXEL_EDITOR_ADD_TO_PALETTE,
  color
})


export const pixelEditorSetColor = (color) => ({
  type: PIXEL_EDITOR_SET_COLOR,
  color
})

export const pixelEditorChangeSize = (width, height) => ({
  type: PIXEL_EDITOR_CHANGE_SIZE,
  width, height
})

export const pixelEditorSetActiveFrame = (activeFrame) => {
  //console.log("pixelEditorSetActiveFrame", activeFrame)
  return {
    type: PIXEL_EDITOR_SET_ACTIVE_FRAME,
    activeFrame
  }
}


export const pixelEditorMoveFrame = (srcIdx, targetIdx) => ({
  type: PIXEL_EDITOR_MOVE_FRAME,
  srcIdx,
  targetIdx
})

export const pixelEditorAddNewFrame = () => ({
  type: PIXEL_EDITOR_ADD_NEW_FRAME,
})

export const pixelEditorDuplicteFrame = (targetIdx) => ({
  type: PIXEL_EDITOR_DUPLICATE_FRAME,
  targetIdx
})

export const pixelEditorDeleteFrame = (targetIdx) => ({
  type: PIXEL_EDITOR_DELETE_FRAME,
  targetIdx
})

export const pixelEditorSetFrameDelay = (targetIdx, delayMs) => ({
  type: PIXEL_EDITOR_SET_FRAME_DELAY,
  targetIdx,
  delayMs
})


export const pixelEditorChangeImage = (image, activeFrame = 0, name=undefined) => ({
  type: PIXEL_EDITOR_CHANGE_IMAGE,
  image,
  activeFrame,
  name
})

export const pixelEditorResetImage = () => ({
  type: PIXEL_EDITOR_RESET_IMAGE
})

export const pixelEditorChangePixel = (x, y, color, frame) => ({
  type: PIXEL_EDITOR_CHANGE_PIXEL,
  frame,
  changes: [{x, y, color}]
})

export const pixelEditorChangePixelList = (changes, frame) => ({
  type: PIXEL_EDITOR_CHANGE_PIXEL,
  frame,
  changes
})

export const pixelEditorScrollPixel = (x, y, frame) => ({
  type: PIXEL_EDITOR_SCROLL_PIXEL,
  frame,
  dir: {x, y}
})

