export const SIDEBAR_FILES_VISIBLE = "SIDEBAR_FILES_VISIBLE"
export const SIDEBAR_TOOLS_VISIBLE = "SIDEBAR_TOOLS_VISIBLE"
export const SIDEBAR_SELECT_FILE = 'SIDEBAR_SELECT_FILE'


export const sidebarFilesVisible = (filesVisible) => ({
  type: SIDEBAR_FILES_VISIBLE,
  filesVisible
})

export const sidebarToolsVisible = (toolsVisible) => ({
  type: SIDEBAR_TOOLS_VISIBLE,
  toolsVisible
})

export const sidebarSelectFile = (name) => ({
  type: SIDEBAR_SELECT_FILE,
  name
})


