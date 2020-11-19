

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}


export function validUsername(str) {

  return str.length > 0 && str > 0
}
