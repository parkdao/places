/**
 * Generates a random UUID (version 4). This can be used as a decentralized way
 * to create an identifier that has such a low probability of collision that it
 * can essentially be treated as universally unique.
 *
 * @returns {string}
 */
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export { uuidv4 }
