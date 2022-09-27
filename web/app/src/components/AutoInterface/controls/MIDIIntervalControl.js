import React, {Component} from 'react'
import PropTypes from "prop-types";
import Color from "color"



const nrOfOctaves = 12
const firstOctave = -1

const boxSize = 64
const boxSpace = boxSize + 5
const offsetX = 1
const offsetY = 1


function getRelativeNDC(element, event) {
  let totalOffsetX = 0
  let totalOffsetY = 0

  const elementWidth = element.offsetWidth
  const elementHeight = element.offsetHeight

  do {
    totalOffsetX += element.offsetLeft
    totalOffsetY += element.offsetTop
    element = element.offsetParent
  } while (element)

  const canvasX = event.pageX - totalOffsetX
  const canvasY = event.pageY - totalOffsetY

  const ndcX = (1.0 * canvasX) / elementWidth
  const ndcY = 1 - (1.0 * canvasY) / elementHeight

  return [ndcX, ndcY]
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}



export default class MIDIIntervalControl extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
  }

  componentDidMount() {
    var c = this.canvasRef
    this.canvas = c

    var ctx = c.getContext("2d");
    this.canvasContext = ctx

    this.redraw()
  }

  render() {
    const value = this.getValue()

    this.redraw()


    // TODO: why -4 ??? margin??
    return (
      <span>
        <canvas style={{border: "0px solid green"}}
                height={boxSpace * nrOfOctaves + offsetX - 4}
                width={boxSpace + offsetY -4} ref={this.setupRefCanvas}
                onMouseDown={this.onMouseDownCanvas}
                onMouseMove={this.onMouseMoveCanvas}
                onMouseLeave={this.onMouseLeaveCanvas}
        />
      </span>
    )
  }

  redraw = () => {
    const ctx = this.canvasContext
    if (!ctx) return

    const v = this.getValue()

    console.log("gettin", v)



    for (let i = 0; i < nrOfOctaves; i++) {

      const oV = i + firstOctave

      ctx.beginPath();
      ctx.rect(offsetX, offsetY + i * boxSpace, boxSize, boxSize);
      ctx.stroke();
      if (v === oV) {
        ctx.fillStyle = "yellow";
        ctx.fill();
      }
      else {
        ctx.fillStyle = "black";
        ctx.fill();
      }
    }
  }

  getValue = () => {
    let { value} = this.props
    value = value ? value.v : 0
    return value
  }

  setupRefCanvas = (theCanvas) => {
    this.canvasRef = theCanvas
  }

  // onClickCanvas = (evt) => {
  //   const pos  = getRelativeNDC(this.canvasRef, evt)
  //   console.log("clicked", pos)
  // }

  getPos = (evt) => {
    const p = getMousePos(this.canvasRef, evt)
    return Math.floor(p.y / boxSpace) + firstOctave
    //return  getRelativeNDC(this.canvasRef, evt)
  }


  useTool = (evt) => {
    evt.preventDefault()

    const p = this.getPos(evt)
    console.log("using tool", p)

    this.props.onChange({ v: p}, this.props.field)
  }

  drawMouseOver = (evt) => {
    evt.preventDefault()

    const p = this.getPos(evt)
    console.log("drawin mouseover", p)
  }


  onMouseDownCanvas = (evt) => {
    this.useTool(evt)
  }

  onMouseMoveCanvas = (evt) => {
    //console.log("movin...")
    evt.preventDefault()

    if (evt.buttons) {
      this.useTool(evt, 'move')
    }
    else {
      this.drawMouseOver(evt)
    }
  }

  // clearing tool preview
  onMouseLeaveCanvas = (evt) => {
    evt.preventDefault()
    this.redraw()
  }

}
