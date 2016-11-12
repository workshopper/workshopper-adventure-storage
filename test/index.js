var storage = require('..')
var fs = require('fs')
var expect = require('chai').expect

describe('Storage', function () {
  var fileName = './foo/bar/index.json'
  var invalidJson = './foo/bar/invalid.json'
  var testStorage = storage('foo', 'bar')

  /**
   * Initialize storage and save a file.
   */
  beforeEach(function () {
    testStorage.reset()
    testStorage.save('index', { foo: 'bar' })
    fs.writeFileSync(invalidJson, '{')
  })

  it('should have a data directory', function () {
    expect(testStorage).to.have.property('dir')
    expect(testStorage.dir).to.equal('foo/bar')
  })

  describe('#save', function () {
    it('should save serialized storage to the data directory', function (done) {
      fs.readFile(fileName, function (err, data) {
        if (err) return done(err)
        try {
          JSON.parse(data)
        } catch (e) {
          done(e)
        }
        done()
      })
    })
  })

  describe('#get', function () {
    it('should retrive a stored file', function (done) {
      var file = testStorage.get('index')
      expect(file.foo).to.equal('bar')
      done()
    })

    it('handle invalid JSON', function (done) {
      fs.readFile(invalidJson, function (err, data) {
        if (err) return done(err)
        try {
          JSON.parse(data)
        } catch (e) {
          return done(err)
        }
        done()
      })
    })
  })

  describe('#reset', function () {
    it('should clean the storage directory', function (done) {
      testStorage.reset()
      fs.stat('./foo/bar', function (err, stats) {
        if (err && err.code === 'ENOENT') return done()
        done('file still exists!')
      })
    })
  })
})
