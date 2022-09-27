export const FILESYSTEM_REQUEST_START = "FILESYSTEM_REQUEST_START"
export const FILESYSTEM_REQUEST_SUCCESS = "FILESYSTEM_REQUEST_SUCCESS"
export const FILESYSTEM_REQUEST_FAIL = "FILESYSTEM_REQUEST_FAIL"

export const FILESYSTEM_FAKE_ADD_FILE = "FILESYSTEM_FAKE_ADD_FILE"
export const FILESYSTEM_FAKE_REMOVE_FILE = "FAKREMOVWERefds"

export const filesystemFakeAddFile = (name) => ({
  type: FILESYSTEM_FAKE_ADD_FILE,
  name
})

export const filesystemFakeRemoveFile = (name) => ({
  type: FILESYSTEM_FAKE_REMOVE_FILE,
  name
})

const filesystemRequestStart = () => ({
  type: FILESYSTEM_REQUEST_START,
})

const filesystemRequestSuccess = (files) => ({
  type: FILESYSTEM_REQUEST_SUCCESS,
  files,
  receivedAt: Date.now()
})

const filesystemRequestFail = (error) => ({
  type: FILESYSTEM_REQUEST_FAIL,
  error
})

export const filesystemRefresh = () => (dispatch, getState) => {
  const state = getState()
  const { host } = state.ms3000

  const x = 23
  let y = 22 + x
  console.log("wfdd", y)
  console.log("fetching filesytem")
  dispatch(filesystemRequestStart())

  fetch(host + '/json/files?dir=')
    .then(data => data.json())
    .then((json) => {
      console.log("parsed filesystem json", json)
      dispatch(filesystemRequestSuccess(json.files))
    })
    .catch(error => {
      console.error('Error:', error)
      dispatch(filesystemRequestFail(error))
    });
}


