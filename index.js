var fs = require('fs')
var path = require('path')
var rimraf = require('rimraf')

function createSimpleStorage () {
  var dir = path.join.apply(path, arguments)

  function fileName (name) {
    return path.resolve(dir, name + '.json')
  }

  /**
   * Delete the storage directory.
   */
  function reset () {
    rimraf.sync(dir)
  }
  function resetPromise () {
    return new Promise(function (resolve, reject) {
      rimraf(dir, function (error) {
        if (error) {
          return reject(error)
        }
        resolve(error)
      })
    })
  }

  /**
   * Serialize and save a file to the storage directory.
   */
  function save (name, data) {
    fs.mkdirSync(dir, { recursive: true })
    try {
      fs.writeFileSync(fileName(name), JSON.stringify(data, null, 2))
    } catch (e) {
      // TODO: write this error in a log
    }
  }
  function savePromise (name, data) {
    return fs.promises.mkdir(dir, { recursive: true })
      .then(function () {
        return fs.promises.writeFile(fileName(name), JSON.stringify(data, null, 2))
      })
      .catch(function () {
        // TODO: write this error in a log
      })
  }

  /**
   * Read and unserialize a file from the storage directory.
   */
  function get (name) {
    var file = fileName(name)
    try {
      var fileData = fs.readFileSync(file, 'utf8')
    } catch (e) {
      // TODO: write this error in a log
      return null
    }
    try {
      return JSON.parse(fileData)
    } catch (e) {
      // TODO: write this error in a log
      return null
    }
  }
  function getPromise (name) {
    return fs.promises.readFile(fileName(name), 'utf8')
      .then(function (fileData) {
        return JSON.parse(fileData)
      })
      .catch(function () {
        // TODO: write this error in a log
        return null
      })
  }

  return {
    dir: dir,
    reset: reset,
    save: save,
    get: get,
    promises: {
      dir: dir,
      reset: resetPromise,
      save: savePromise,
      get: getPromise
    }
  }
}

createSimpleStorage.userDir = process.env.HOME || process.env.USERPROFILE

module.exports = createSimpleStorage
