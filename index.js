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
    rimraf.sync(dir)
  }

  /**
   * Serialize and save a file to the storage directory.
   */
  function save (name, data) {
    mkdirp.sync(dir)
    fs.writeFileSync(fileName(name), JSON.stringify(data))
  }

  /**
   * Read and unserialize a file from the storage directory.
   */
  function get (name, cb) {
    var file = fileName(name)
    var fileData = fs.readFileSync(file, 'utf8')
    return JSON.parse(fileData)
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
