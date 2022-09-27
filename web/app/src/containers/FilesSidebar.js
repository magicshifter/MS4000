import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import Sidebar from '../components/Sidebar'
import SelectableList from '../components/inputs/SelectableList'

import {faFolder, faSyncAlt, faDownload } from '@fortawesome/free-solid-svg-icons'


import './App.css';
import IconButton from "../components/inputs/IconButton";

import { sidebarFilesVisible, sidebarSelectFile } from '../actions/sidebar'
import { filesystemRefresh } from "../actions/filesystem";
import { imageDownload } from '../actions/ms3000'


function bitmapFilter(file) {
  const n = file.name.toLowerCase()
  return n.endsWith('.magicbitmap') || (n.endsWith('.magicfont'))
}

class FilesSidebar extends Component {
  static propTypes = {
    filesVisible: PropTypes.bool.isRequired,
    selectedFile: PropTypes.string,

    isFetching: PropTypes.bool.isRequired,
    files: PropTypes.array,
    filesError: PropTypes.any,

    isDownloading: PropTypes.bool.isRequired,
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.filesVisible !== nextProps.filesVisible ||
      this.props.selectedFile !== nextProps.selectedFile ||
      this.props.isFetching !== nextProps.isFetching ||
      this.props.files !== nextProps.files ||
      this.props.filesError !== nextProps.filesError ||
      this.props.isDownloading !== nextProps.isDownloading
      ) {
      return true;
    }
    console.log("no redraw sidebar")
    return false;
  }

  onChangeFilesSidebar = (newState) => {
    const { dispatch } = this.props
    dispatch(sidebarFilesVisible(newState))
  }

  onClickRefresh = () => {
    const { dispatch } = this.props
    dispatch(filesystemRefresh())
  }

  doubleClickFile = (name) => {
    const { dispatch } = this.props
    dispatch(imageDownload(name))
  }

  onClickDownload = () => {
    const { dispatch, selectedFile } = this.props
    dispatch(imageDownload(selectedFile))
  }

  selectFile = (name) => {
    console.log("selected", name)
    const { dispatch } = this.props
    dispatch(sidebarSelectFile(name))
  }



  render() {
    const { filesVisible, selectedFile, files, isFetching, filesError, downloadError, isDownloading } = this.props

    return (
      <Sidebar enlarged={filesVisible} onChange={this.onChangeFilesSidebar} icon={faFolder} tooltip='MS3000 Filesystem'
        right={0} top={0} >

        <IconButton icon={faSyncAlt} tooltip='refresh file list' onClick={this.onClickRefresh} rotate={isFetching}/>
        <IconButton icon={faDownload} tooltip='download image' onClick={this.onClickDownload} rotate={isDownloading}/>
        {filesError ? <p style={{color: 'red'}}>Filelist: {filesError.toString()}</p> : null}
        {downloadError ? <p style={{color: 'red'}}>Download: {downloadError.toString()}</p> : null}
        {!files ?
          <p>Please press refresh to update the filelist</p> :
          <SelectableList listItems={files} fieldId='name' fieldText='name' lines={30}
                          selectedId={selectedFile}
                          select={this.selectFile} doubleClick={this.doubleClickFile}
                          filter={bitmapFilter}/>
        }
      </Sidebar>
    )
  }
}

const mapStateToProps = state => {
  const { filesVisible, selectedFile } = state.sidebar
  const { files, isFetching, error } = state.fileSystem

  const { isDownloading, downloadError } = state.ms3000

  return {
    filesVisible,
    selectedFile,

    isFetching,
    files, filesError: error,

    isDownloading, downloadError
  }
}

export default connect(mapStateToProps)(FilesSidebar)
