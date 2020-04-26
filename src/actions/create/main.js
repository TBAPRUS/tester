export const CHANGE_TITLE = 'CHANGE_TITLE'
export const CHANGE_IMG = 'CHANGE_IMG'

export function changeTitle(title) {
  return {
    type: CHANGE_TITLE,
    title
  }
}

export function changeImg(img) {
  return {
    type: CHANGE_IMG,
    img
  }
}