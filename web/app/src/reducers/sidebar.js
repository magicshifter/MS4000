import {
  SIDEBAR_FILES_VISIBLE,
  SIDEBAR_TOOLS_VISIBLE,
  SIDEBAR_SELECT_FILE,
} from '../actions/sidebar'
import {FILESYSTEM_FAKE_ADD_FILE, FILESYSTEM_FAKE_REMOVE_FILE} from "../actions/filesystem";


const DEFAULT_STATE = {
  filesVisible: false,
  toolsVisible: true,

  selectedFile: 'mario.magicBitmap'
}

const sidebar = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SIDEBAR_FILES_VISIBLE:
      return {
        ...state,
        filesVisible: action.filesVisible
      }

    case SIDEBAR_TOOLS_VISIBLE:
      return {
        ...state,
        toolsVisible: action.toolsVisible
      }

    case SIDEBAR_SELECT_FILE:
      return {
        ...state,
        selectedFile: action.name
      }

      // NOTE handling same actions ad fake add and delete in ms3000
    case FILESYSTEM_FAKE_ADD_FILE:
      return {
        ...state,
        selectedFile: action.name,
      }

    case FILESYSTEM_FAKE_REMOVE_FILE:
      return {
        ...state,
        selectedFile: state.selectedFile === action.name ? null : state.selectedFile,
      }


    default:
      return state
  }
};

export default sidebar
