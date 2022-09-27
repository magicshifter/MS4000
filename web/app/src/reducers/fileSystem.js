import {
  FILESYSTEM_REQUEST_START,
  FILESYSTEM_REQUEST_SUCCESS,
  FILESYSTEM_REQUEST_FAIL,
  FILESYSTEM_FAKE_ADD_FILE,
  FILESYSTEM_FAKE_REMOVE_FILE,
} from '../actions/filesystem'

const DEFAULT_STATE = {
  isFetching: false,
  error: null,
  files: //null,
    [
      {name: "giraffe.magicBitmap", size: 1232},
      {name: "smile.magicBitmap", size: 122},
      {name: "mario.magicBitmap", size: 1032},
      {name: "flower.magicBitmap", size: 1232},
      {name: "oneup.magicBitmap", size: 1232},
    ]
}

const fileSystem = (state = DEFAULT_STATE, action) => {
  const { files } = state

  switch (action.type) {
    case FILESYSTEM_FAKE_ADD_FILE:
      // NODE: selection is handles in other reducer as well: sidebar
      const idx = files.findIndex((f) => f.name === action.name)
      // TODO: add filesize?
      const newFiles = (idx < 0) ? [...files, {name: action.name }] : files

      return {
        ...state,
        files: newFiles
      }

    case FILESYSTEM_FAKE_REMOVE_FILE:
      const idx2 = files.findIndex((f) => f.name === action.name)
      const newFiles2 = (idx2 > 0) ? files.slice().splice(idx2, 1) : files

      return {
        ...state,
        files: newFiles2
      }

    case FILESYSTEM_REQUEST_START:
      return {
        ...state,
        isFetching: true,
        error: null,
      }

    case FILESYSTEM_REQUEST_SUCCESS:
      return {
        ...state,
        files: action.files,
        isFetching: false,
        error: null
      }

    case FILESYSTEM_REQUEST_FAIL:
      return {
        ...state,
        files: null,
        isFetching: false,
        error: action.error
      }

    default:
      return state
  }
};

export default fileSystem
