var fs = require('fs')
var path = require('path')
var mkdirp = require('mkdirp')
var rimraf = require('rimraf')

function createSimpleStorage () {
  var dir = path.join.apply(path, arguments)

  function fileName (name) {
    return path.resolve(dir, name + '.json')
  }

  /**
   * Delete the storage directory.
   */
  function reset (cb) {
    rimraf(dir, function (err) {
      if (err) return cb(err)
      cb()
    })
  }

  /**
   * Serialize and save a file to the storage directory.
   */
  function save (name, data, cb) {
    mkdirp(dir, function (err) {
      if (err) return cb(err)
      fs.writeFile(fileName(name), JSON.stringify(data), function (err, saveData) {
        if (err) return cb(err)
        cb()
      })
    })
  }

  /**
   * Read and unserialize a file from the storage directory.
   */
  function get (name, cb) {
    var file = fileName(name)
    fs.readFile(file, 'utf8', function (err, fileData) {
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
    dir: dir,
    reset: reset,
    save: save,
    get: get
  }
}

createSimpleStorage.userDir = process.env.HOME || process.env.USERPROFILE

module.exports = createSimpleStorage
