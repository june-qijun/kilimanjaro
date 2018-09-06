export function loadState(state) {
  return {
    type: 'LOAD_STATE',
    state
  }
}

export function urlClick(url) {
  return {
    type: 'URL_CLICK',
    url
  }
}

export function urlIconClick(url) {
  return {
    type: 'URL_ICON_CLICK',
    url
  }
}

export function contentChange(content) {
  return {
    type: 'CONTENT_CHANGE',
    content
  }
}

export function exportState() {
  return {
    type: 'EXPORT_STATE'
  }
}

export function deleteUrl(url) {
  return {
    type: 'DELETE_URL',
    url
  }
}

export function addUrl(url) {
  return {
    type: 'ADD_URL',
    url
  }
}

export function showAddUrlModal(isShow) {
  return {
    type: 'SHOW_ADD_URL',
    isShow
  }
}

export function saveState() {
  return {
    type: 'SAVE_STATE'
  }
}

export function openWorld() {
  return {
    type: 'OPEN_WORLD'
  }
}

export function chooseWorldNode(id) {
  return {
    type: 'CHOOSE_WORLD_NODE',
    id
  }
}