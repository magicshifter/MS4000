import React, {Component} from 'react'
import PropTypes from "prop-types";
import PixelPreview from './PixelPreview'
import IconButton from '../inputs/IconButton'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClone, faPlusSquare, faTrash} from '@fortawesome/free-solid-svg-icons'

// TODO: is it ok to have actions here??
import {
  pixelEditorAddNewFrame,
  pixelEditorDeleteFrame,
  pixelEditorDuplicteFrame,
  pixelEditorMoveFrame,
  pixelEditorSetActiveFrame,
} from '../../actions/pixelEditor'

import './FrameList.css'

const PREVIEW_SCALE = 3


function DummyPreview({scale, width, height, children}) {
  return (
    <div style={{height: " " + (scale * height) + "px", width: width ? "" + (PREVIEW_SCALE * width) + "px" : undefined}}>
      {children}
    </div>
  )
}

function findDataInParents(target, trys = 5) {
  let parsed

  while (trys && target && isNaN(parsed = parseInt(target.dataset["idx"], 10))) {
    target = target.parentNode;
    trys--;
  }

  return { idx: parsed, isSpace: target.dataset["spacer"] === '1' }
}

export default class FrameList extends Component {
  static propTypes = {
    activeFrame: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    frames: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired, // returns action
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.activeFrame !== nextProps.activeFrame ||
        this.props.frames !== nextProps.frames) {
      return true;
    }
    return false;
  }

  onClickFrame = (evt) => {
    const {onChange} = this.props
    const frameNr = parseInt(evt.currentTarget.dataset["frame"] || "0", 10)
    onChange(pixelEditorSetActiveFrame(frameNr))
  }

  onClickAddFrame = (evt) => {
    evt.preventDefault()
    const {onChange } = this.props
    onChange(pixelEditorAddNewFrame())
  }

  onClickDuplicateFrame = (evt) => {
    // dont let click go to select Frame!
    evt.stopPropagation();

    const {onChange } = this.props
    const frameNr = parseInt(evt.currentTarget.dataset["frame"], 10)
    if (!isNaN(frameNr))
      onChange(pixelEditorDuplicteFrame(frameNr))
  }

  onClickRemoveFrame = (evt) => {
    // dont let click go to select Frame!
    evt.stopPropagation();

    const {onChange} = this.props
    const frameNr = parseInt(evt.currentTarget.dataset["frame"], 10)
    if (!isNaN(frameNr))
      onChange(pixelEditorDeleteFrame(frameNr))
  }

  render() {
    const {frames, width, height, activeFrame} = this.props
    const fN = frames.length

    const controls = []
    for (let i = 0; i < fN; i++) {
      const elem = frames[i]

      const className = activeFrame === i ? "FrameListFrame active" : "FrameListFrame"

      controls.push(
        <div key={'s'+i} className={"FrameListSpacer"}
            onDrop={this.handleDropFrame}
            onDragOver={this.handleDragOverFrame}
            ref={"s" + i}
            data-idx={i} data-spacer={1}
            style={{display:"none"}}
        >
          <DummyPreview width={width} height={height} scale={PREVIEW_SCALE} />
        </div>)

      controls.push(
        <div key={'f'+i} className={className} data-frame={i} data-idx={i} ref={"i" + i}
            onClick={this.onClickFrame}
            draggable
            onDragStart={this.handleDragStartFrame}
            onDragEnd={this.handleDragEndFrame}
            onDragOver={this.handleDragOverFrame}
        >
          {/* <span className="FrameListDrag" data-frame={i} data-idx={i}>
            <FontAwesomeIcon color="white" icon={faArrowsAlt}/>
          </span>
          */}

          <div className="FrameListDelete" data-frame={i} onClick={this.onClickRemoveFrame}>
            <FontAwesomeIcon color="white" icon={faTrash}/>
          </div>

          <div className="FrameListDuplicate" data-frame={i} onClick={this.onClickDuplicateFrame}>
            <FontAwesomeIcon color="white" icon={faClone}/>
          </div>

          <PixelPreview data-frameNr={i} scale={PREVIEW_SCALE} width={width} height={height}
                        pixel={elem}
          />
        </div>
      )
    }

    controls.push(
      <div key={'s'+ fN}
          className={"FrameListSpacer"}
          ref={"s" + fN}
          data-idx={fN} data-spacer={1}
          style={{display:"none"}}
          onDrop={this.handleDropFrame}
          onDragOver={this.handleDragOverFrame}
      >
        <DummyPreview width={width} height={height} scale={PREVIEW_SCALE} />
      </div>)

    controls.push(

      <div key='add' className={"FrameListPlusButton"}>
        <DummyPreview height={height} scale={PREVIEW_SCALE}>
          <IconButton className="button-v-center"  icon={faPlusSquare} tooltip={"Add Frame"} onClick={this.onClickAddFrame}/>
        </DummyPreview>
      </div>

    )

    return controls
  }


  handleDragStartFrame = (evt) => {
    const { idx } = findDataInParents(evt.target)

    if (!isNaN(idx)) {
      this.dndOneShot = true
      this.dndSourceIdx = idx
      this.dndLastIdx = idx
      this.dndLastSource = evt.target
      this.dndOriginalSpacer = this.refs["s" + idx]

      //this.dndLastSource.style.opacity = 0.3
      this.dndLastSource.style.maxWidth = 10

      // not used atm
      evt.dataTransfer.setData("idx", idx);
      evt.dataTransfer.effectAllowed = 'move';
    }
    console.log("drag start", idx);
  }

  handleDragOverFrame = (evt) => {
    // get out of here as fast as possible this is called hundreds of times with each pixel movement of the mouse!
    if (this.lastTargetSpeedHack === evt.target) {
      if (this.lastTargetSpeedHackPrevent) {
        evt.preventDefault();
      }
      return
    }

    this.lastTargetSpeedHack = evt.target
    this.lastTargetSpeedHackPrevent = false

    if (this.dndOneShot) {
      this.dndLastSource.style.display = 'none'
      this.dndOriginalSpacer.style.display = ''
    }

    const { idx, isSpace } = findDataInParents(evt.target)

    //console.log("drag over passt fast defense", idx, evt.target);

    if (!isNaN(idx)) {
      var targetIdx = idx
      if (!isSpace && !this.dndOneShot) {
        if (this.dndLastIdx === idx) {
          targetIdx++
        }
      }

      if (this.dndOneShot || targetIdx !== this.dndLastIdx) {
        evt.dataTransfer.dropEffect = 'move';

        if (this.dndLastSpacer) {
          this.dndLastSpacer.style.display = 'none'
        }

        this.dndLastSpacer = this.refs["s" + targetIdx]
        this.dndLastSpacer.style.display = ''
        this.dndLastIdx = targetIdx
        this.dndOneShot = false

        //console.log("changed styles")
      }
      // do this because spacer and frame have same targetIdx
      evt.preventDefault();
      this.lastTargetSpeedHackPrevent = true
    }
  }

  handleDragEndFrame = (evt) =>
  {
    //console.log("Drag end")
    if (this.dndLastSpacer) {
      this.dndLastSpacer.style.display = 'none'
      this.dndLastSpacer = null
    }
    if (this.dndOriginalSpacer) {
      this.dndOriginalSpacer.style.display = 'none'
      this.dndOriginalSpacer = null
    }
    if (this.dndLastSource) {
      //this.dndLastSource.style.opacity = 1
      this.dndLastSource.style.display = ''
      this.dndLastSource.style.transform = ''
      this.dndLastSource = null
    }
    this.dndSourceIdx = null
    this.dndLastIdx = null
    this.dndOneShot = null
  }

  handleDropFrame = (evt) => {
    const { idx, isSpace } = findDataInParents(evt.target)
    const sourceIdx = this.dndSourceIdx
    if (isSpace && !isNaN(idx) && sourceIdx !== idx) {
      const {onChange} = this.props
      onChange(pixelEditorMoveFrame(sourceIdx, idx))
    }
  }
}
