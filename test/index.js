var storage = require('..')
var fs = require('fs')
var expect = require('chai').expect

describe('Storage', function () {
  var fileName = './foo/bar/index.json'
  var testStorage

  /**
   * Initialize storage and save a file.
   */
  before(function (done) {
    testStorage = storage('foo', 'bar')
    testStorage.save('index', {
      foo: 'bar'
    }, function (err) {
      if (err) return done(err)
      done()
    })
  })

  it('should have a data directory', function () {
    expect(testStorage).to.have.property('dir')
    expect(testStorage.dir).to.equal('foo/bar')
  })

  it('should save serialized storage to the data directory', function (done) {
    fs.readFile(fileName, function (err, data) {
      if (err) return done(err)
      var fileData

      try {
        fileData = JSON.parse(data)
      } catch (e) {
        done(e)
      }
      done(null, fileData)
    })
  })

  it('should retrive a stored file', function (done) {
    testStorage.get('index', function (err, file) {
      if (err) return done(err)
      expect(file.foo).to.equal('bar')
      done()
    })
  })

  it('should clean the storage directory', function (done) {
    testStorage.reset(function () {
      fs.stat('./foo/bar', function (err, stats) {
        if (err && err.code === 'ENOENT') return done()
        done('file still exists!')
      })
    })
  })
})
