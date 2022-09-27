import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  pixelEditorAddToPalette,
  pixelEditorChangeImage,
  pixelEditorChangePixelList,
  pixelEditorChangeSize,
  pixelEditorResetImage,
  pixelEditorScrollPixel,
  pixelEditorSetColor, pixelEditorSetFrameDelay,
  pixelEditorSetImageName,
  pixelEditorSetTool,
  pixelEditorSetToolSize,
} from '../actions/pixelEditor'

import {
  sidebarToolsVisible
} from '../actions/sidebar'

import {
  imageUpload
} from '../actions/ms3000'

import {ActionCreators} from 'redux-undo';

import PixelCanvas from '../components/PixelEditor/PixelCanvas'
import ToolsMenu from '../components/PixelEditor/ToolsMenu'
import ToolSizes from '../components/PixelEditor/ToolSizes'
import ColorPalette from '../components/PixelEditor/ColorPalette'
import ColorChooser from '../components/PixelEditor/ColorChooser'
import StringInput from '../components/inputs/StringInput'
import NumberInput from '../components/inputs/NumberInput'
import IconButton from '../components/inputs/IconButton'
import FrameList from '../components/PixelEditor/FrameList'
import Collapsable from '../components/Collapsable'
import ErrorBox from '../components/outputs/ErrorBox'

import Image from '../ms3000/Image'

import {saveAs} from 'file-saver'
import {connect} from "react-redux";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faArrowsAlt,
  faEraser,
  faEyeDropper,
  faFile,
  faFolderOpen,
  faPalette,
  faPencilAlt,
  faRedo,
  faSave,
  faTint,
  faUndo,
  faUpload,

  faCogs, faCloudDownloadAlt, faCloudUploadAlt,
  faPlusSquare, // add frame
  faSyncAlt, // als spinner
  faWifi,
} from '@fortawesome/free-solid-svg-icons'


import './PixelEditor.css'
import MagicBitmap from "../ms3000/MagicBitmap";


const toolbarStructure = [
  {
    name: 'draw',
    icon: faPencilAlt,
  },
  {
    name: 'fill',
    icon: faTint,
  },
  {
    name: 'erase',
    icon: faEraser,
  },
  {
    name: 'scroll',
    icon: faArrowsAlt,
  },
  {
    name: 'pick',
    icon: faEyeDropper,
  },
]

const toolSizes = [ 1, 2, 3, 4]


class PixelEditor extends Component {
  static propTypes = {
    frameIdx: PropTypes.number.isRequired,
    imageName: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    tool: PropTypes.string,
    color: PropTypes.object,
    frames: PropTypes.array.isRequired,
    palette: PropTypes.array.isRequired,
    enableUndo: PropTypes.bool,
    enableRedo: PropTypes.bool,
  }

  shortcutsKeyDown = (evt) => {
    //console.log("shortcutsKeyDown", evt.keyCodee)

    // ctrl for linux, win, meta for mac
    if (evt.ctrlKey || evt.metaKey) {
      // Z
      if (evt.keyCode === 90) {
        evt.preventDefault()
        const { dispatch } = this.props
        dispatch(ActionCreators.undo())
      }
      // Y
      else if (evt.keyCode === 89) {
        evt.preventDefault()
        const { dispatch } = this.props
        dispatch(ActionCreators.redo())
      }
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.shortcutsKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.shortcutsKeyDown, false);
  }

  onChangePixel = (pixelChanges) => {
    const { dispatch, frameIdx } = this.props
    dispatch(pixelEditorChangePixelList(pixelChanges, frameIdx))
  }

  onChangePick = (color) => {
    const { dispatch } = this.props
    dispatch(pixelEditorAddToPalette(color))
  }

  onChangeScroll = (dir) => {
    const { dispatch, frameIdx } = this.props
    dispatch(pixelEditorScrollPixel(dir.x, dir.y, frameIdx))
  }

  onChangePalette = (color) => {
    const { dispatch } = this.props
    //console.log("color selected in App from Palette", color)
    dispatch(pixelEditorSetColor(color))
  }

  onChangeWidth = (newWidth) => {
    const { dispatch } = this.props
    dispatch(pixelEditorChangeSize(newWidth))
  }

  onChangeFrameDelay = (newDelay) => {
    const { dispatch, frameIdx } = this.props
    dispatch(pixelEditorSetFrameDelay(frameIdx, newDelay))
  }

  onChangeName = (newName) => {
    const { dispatch } = this.props
    dispatch(pixelEditorSetImageName(newName))
  }

  onChangeFrames = (action) => {
    const { dispatch } = this.props
    //console.log("winking action throug ftom Frames", action)
    dispatch(action)
  }

  onExportImage = () => {
    const { width, height, frames, framesDelays, imageName } = this.props

    const fileName = imageName + ".png"
    const img = new Image(width, height, frames, framesDelays)
    const arrayBuffer = img.toPNG()

    //console.log("aexorting arraybuffer", arrayBuffer)

    const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' })
    saveAs(blob, fileName);
  }

  //  handles click when we dont hit label of hidden file input
  uploadClickHAck = (evt) => {
    if (evt.target != this.refs.fileUpload) {
      this.refs.fileUpload.click()
      evt.preventDefault()
    }
  }

  onImportImage = (evt) => {
    //console.log("nr of files selected: " + evt.target.files.length);
    var files = evt.target.files; // FileList object

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      //console.log(file)
      let pName = file.name;
      var reader = new FileReader();
      reader.onload = (evt) => {
        var arrayBuffer = evt.target.result;

        let i
        try {
          i = Image.fromPNG(arrayBuffer)
        }
        catch (e) {
          // try magicbitmap
          const mb = MagicBitmap.fromArrayBuffer(arrayBuffer)
          i = mb.toImage()
        }

        if (!i) {
          throw "Cant open image, unknown fileformat of " + pName
        }

        const { dispatch } = this.props
        dispatch(pixelEditorChangeImage(i, 0, pName))
      }
      reader.readAsArrayBuffer(file) // start async operation
    }
    // clear files so that next file open triggers a change even wehn same file is selected
    evt.target.value = null
  };

  onClickNew = () => {
    const { dispatch } = this.props
    dispatch(pixelEditorResetImage())
  }

  onClickUndo = () => {
    const { dispatch } = this.props
    dispatch(ActionCreators.undo())
  }

  onClickRedo = () => {
    const { dispatch } = this.props
    dispatch(ActionCreators.redo())
  }

  onChangeToolsSidebar = (newState) => {
    const { dispatch } = this.props
    dispatch(sidebarToolsVisible(newState))
  }

  render() {
    const { width, height, tool, toolSize, color, frames, framesDelays, frameIdx, palette, imagePalette, imageName, enableRedo, enableUndo, toolsVisible,
      isUploading, uploadError} = this.props
    const pixel = frames[frameIdx]

    /*<div style={{ display: 'flex', flexFlow: 'row', flex: '1 1 auto'}}>
        <div style={{border: "2px solid green", flex: '1 1 auto'}}>
          the new bar is here
        </div>
        */

    //  style={{display: 'flex', flexFlow: 'column', flex: '1 1 auto'}}
    // style={{display: 'flex', flexFlow: 'column', flex: '1 1 auto'}}

    // <Collapsable enlarged={toolsVisible} onChange={this.onChangeToolsSidebar} icon={faPalette} tooltip='Draw Tools'
    //           float="right" top={"3em"} left='1em' width='95%'>

    // accept=".png,.msb,.magicBitmap,.magicFont,.magicBitmap2,*"
    return (
        <div>
          <form className="">
            <div className="pure-g" style={{paddingBottom: "0px"}}>

                <div className="pure-u-1-1 pure-u-md-1-2">
                  <IconButton icon={faFile} tooltip='new Image' onClick={this.onClickNew} />
                  <StringInput value={imageName} max={32} onChange={this.onChangeName} placeholder="image name"/>
                  <NumberInput value={width} min={1} max={64} onChange={this.onChangeWidth} />&nbsp;px&nbsp;
                </div>
                <div className="pure-u-1-1 pure-u-md-1-2">
                  <IconButton icon={faSave} tooltip='save image on hd' onClick={this.onExportImage} />

                  <div className="icon-button ToolsMenuTooltip">
                    <div className="ToolsMenuTooltipText" style={{width: "240px"}}>
                      open PNG or MagicBitmap
                    </div>
                    <button className="pure-button" onClick={this.uploadClickHAck}>
                    <label htmlFor="ImportImage">
                      <FontAwesomeIcon icon={faFolderOpen} size="2x"/>
                      <input
                        ref="fileUpload"
                        id="ImportImage"
                        style={{display:"none"}}
                        multiple
                        type="file"
                        name="file"

                        onChange={this.onImportImage}
                      />
                    </label>
                    </button>
                  </div>

                  <IconButton icon={faUpload} tooltip='upload to MagicShifter' onClick={this.onUploadToShifter} rotate={isUploading}/>

                {enableUndo ? <IconButton icon={faUndo} tooltip='undo' onClick={this.onClickUndo} /> : null}

                {enableRedo ? <IconButton icon={faRedo} tooltip='redo' onClick={this.onClickRedo} /> : null}

                  <ErrorBox error={uploadError}/>
                </div>



            </div>

            <div className="pure-g">
              <div className="pure-u-1-1 pure-u-md-none">

                <ColorChooser color={color} onChange={this.onChangePalette}/>
              </div>
              <div className="pure-u-1-1 pure-u-md-none">
                <ToolsMenu structure={toolbarStructure} tool={tool} onChange={this.onClickTool}/>
              </div>
              <div className="pure-u-1-1 pure-u-md-none">
                <ToolSizes sizes={toolSizes} value={toolSize} onChange={this.onClickToolSize}/>
              </div>
            </div>
            <div className="pure-g">
              <div className="pure-u-1-1 pure-u-md-none">


                <div>
                  Frame delay: <br /><NumberInput value={framesDelays[frameIdx]} min={100} max={60000} onChange={this.onChangeFrameDelay} />ms&nbsp;
                </div>

                <FrameList frames={frames} width={width} height={height} activeFrame={frameIdx}
                           onChange={this.onChangeFrames} />
              </div>
            </div>
            <div className="pure-menu pure-menu-horizontal pure-menu-scrollable" style={{padding: "0px"}}>
              <ul className="pure-menu-list">
                <ColorPalette palette={palette} onChange={this.onChangePalette} activeColor={color}/>
              </ul>
            </div>
            <div className="pure-menu pure-menu-horizontal pure-menu-scrollable" style={{padding: "0px"}}>
              <ul className="pure-menu-list">
                <ColorPalette palette={imagePalette} onChange={this.onChangePalette} activeColor={color}/>
              </ul>
            </div>

          </form>

        {pixel ?
          <PixelCanvas width={width} height={height} tool={tool} toolSize={toolSize} color={color} pixel={pixel} scale={25}
                       onChange={this.onChangePixel} onPick={this.onChangePick} onScroll={this.onChangeScroll} />
          : <span>No Frames :( Are you happy now?!?</span>
        }
        </div>


    )
  }
  /*


   */

  onClickTool = (newTool) => {
    //console.log("PixelEditor tool menu changed", newTool)
    const { dispatch } = this.props
    dispatch(pixelEditorSetTool(newTool))
  }

  onClickToolSize = (newToolSize) => {
    //console.log("PixelEditor tool size changed", newToolSize)
    const { dispatch } = this.props
    dispatch(pixelEditorSetToolSize(newToolSize))
  }



  getFileName =
    () => {
      var fileName = this.refs.fileName.value;
      fileName = fileName + '.magicBitmap';
      return fileName;
    };

  onFileDownload =
    () => {
      const blob = this.getBlob();
      const fileName = this.getFileName();
      saveAs(blob, fileName);
    };

  onUploadToShifter = (evt) => {
    evt.preventDefault()
    const { dispatch } = this.props

    console.log("upload pressed")


    dispatch(imageUpload())
    };
}

const mapStateToProps = state => {
  const { width, height, color, tool, toolSize, frames, framesDelays, palette, imagePalette, frameIdx, imageName } = state.pixelEditor.present
  const { past, future } = state.pixelEditor
  const { toolsVisible } = state.sidebar
  const { isUploading, uploadError } = state.ms3000

  return {
    width, height, color, tool, toolSize,
    frameIdx, imageName,
    frames, framesDelays,
    palette, imagePalette,
    toolsVisible,
    enableUndo: past.length > 0,
    enableRedo: future.length > 0,

    isUploading, uploadError
  }
}

export default connect(mapStateToProps)(PixelEditor)
