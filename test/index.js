const storage = require('..')
const fs = require('fs')
const expect = require('chai').expect

describe('Storage', function () {
  const fileName = './foo/bar/index.json'
  let testStorage

  /**
   * Initialize storage and save a file.
   */
  before(function (done) {
    testStorage = storage('foo', 'bar')
    testStorage.save('index', {
      foo: 'bar'
    }, (err) => {
      if (err) return done(err)
      done()
    })
  })

  it('should have a data directory', function () {
    expect(testStorage).to.have.property('dir')
    expect(testStorage.dir).to.equal('foo/bar')
  })

  it('should save serialized storage to the data directory', function (done) {
    fs.readFile(fileName, (err, data) => {
      if (err) return done(err)
      let fileData

      try {
        fileData = JSON.parse(data)
      } catch (e) {
        done(e)
      }
      done(null, fileData)
    })
  })

  it('should retrive a stored file', function (done) {
    testStorage.get('index', (err, file) => {
      if (err) return done(err)
      expect(file.foo).to.equal('bar')
      done()
    })
  })

  it('should clean the storage directory', function (done) {
    testStorage.reset(() => {
      fs.stat('./foo/bar', (err, stats) => {
        if (err && err.code === 'ENOENT') return done()
        done('file still exists!')
      })
    })
  })
})
