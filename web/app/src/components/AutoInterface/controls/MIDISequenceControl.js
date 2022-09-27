import React, {Component} from 'react'
import PropTypes from "prop-types";
import Color from "color"
import {arrayForEach} from "../../../utils/functional";
import MIDIOctaveControl from "./MIDIOctaveControl";
import MIDIIntervalControl from "./MIDIIntervalControl";



const nrOfOctaves = 10
const firstOctave = -1

const boxSize = 128
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



export default class MIDISequenceControl extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
  }

  onChangeOctaveControl = (newValue, field) => {

    console.log("onChanged", newValue, field)
    const v = this.getValue()
    v.steps[field].octave = newValue

    this.props.onChange(v, this.props.field)
  }

  onChangeIntervalControl = (newValue, field) => {

    console.log("onChanged", newValue, field)
    const v = this.getValue()
    v.steps[field].interval = newValue

    this.props.onChange(v, this.props.field)
  }

  render() {
    const { field } = this.props
    const value = this.getValue()

    console.log("RENDER MIDISequ", field)

    const controls = []
    const controlsI = []
    arrayForEach(value.steps, (step, i) => {
      controls.push(<MIDIOctaveControl field={i} onChange={this.onChangeOctaveControl} value={step.octave}/>)
      controlsI.push(<MIDIIntervalControl field={i} onChange={this.onChangeIntervalControl} value={step.interval}/>)
    })


    // TODO: why -4 ??? margin??
    return (
        <div>
          {controlsI}<br /><br />
          {controls}
        </div>
    )
  }

  getValue = () => {
    let { value} = this.props
    value = value ? value : {
      steps: [
        { interval: { v: 0}, octave: { o: 5 }, mode: 0 },
        { interval: { v: 0}, octave: { o: 5 }, mode: 0 },
        { interval: { v: 0}, octave: { o: 5 }, mode: 0 },
        { interval: { v: 0}, octave: { o: 5 }, mode: 0 },
        { interval: { v: 0}, octave: { o: 5 }, mode: 0 },
        { interval: { v: 0}, octave: { o: 5 }, mode: 0 },
        { interval: { v: 0}, octave: { o: 5 }, mode: 0 },
        { interval: { v: 0}, octave: { o: 5 }, mode: 0 },
      ],
    }
    return value
  }
}
