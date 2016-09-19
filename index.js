const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')

function createSimpleStorage () {
  const dir = path.join.apply(path, arguments)
  const fileName = (name) => path.resolve(dir, `${name}.json`)

  /**
   * Delete the storage directory.
   */
  const reset = (cb) => {
    rimraf(dir, (err) => {
      if (err) return cb(err)
      cb()
    })
  }

  /**
   * Serialize and save a file to the storage directory.
   */
  const save = (name, data, cb) => {
    mkdirp(dir, (err) => {
      if (err) return cb(err)
      fs.writeFile(fileName(name), JSON.stringify(data), (err, saveData) => {
        if (err) return cb(err)
        cb()
      })
    })
  }

  /**
   * Read and unserialize a file from the storage directory.
   */
  const get = (name, cb) => {
    const file = fileName(name)
    fs.readFile(file, 'utf8', (err, fileData) => {
      if (err) return cb(err)
      try {
        fileData = JSON.parse(fileData)
      } catch (e) {
        return cb(e)
      }
      cb(null, fileData)
    })
  }

  return {
    dir,
    reset,
    save,
    get
  }
}

createSimpleStorage.userDir = process.env.HOME || process.env.USERPROFILE

module.exports = createSimpleStorage
