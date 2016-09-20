# workshopper-adventure-storage [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]

Simple storage for [workshopper-adventure](https://github.com/workshopper/workshopper-adventure)

Originally included as part of workshopper-adventure, mostly written by [Martin Heidegger](https://github.com/martinheidegger)

Based on prior work of:
[@substack](https://github.com/substack)
[@rvagg](https://github.com/rvagg)

## Install

```
npm install workshopper-adventure-storage --save
```

```js
const storage = require('workshopper-adventure-storage')
```

## Properties

## storage.dir
The path to store data in.

## storage.userDir
A default path to store data in.

## Methods
```js
const storage = require('workshopper-adventure-storage')
```

## storage([dir[, ...]])
Accepts a sequence of paths for `path.resolve` to use as the storage directory.

## storage.save('name', data', cb)
JSON encodes and writes a file to the storage directory. The following will
save the file as `index.json`.

```js
storage.save('index', {
  foo: 'bar'
}, (err) => {
  if (err) throw err
})
```

## storage.get('name')
JSON encodes and writes a file to the storage directory.

```js
const data = {
  foo: 'bar'
}
storage.save('index', data, (err) => {
  if (err) throw err
})
```

## storage.get('name', cb)
Retrieves and unserializes a file from storage.

```js
storage.get('index', (err, data) => {
  if (err) throw err
  console.log(file)
})
```

## storage.reset(cb)
Clears the storage directory.

```js
storage.reset((err) => {
  if (err) throw err
})
```

[downloads-image]: http://img.shields.io/npm/dm/workshopper-adventure-storage.svg
[npm-url]: https://npmjs.org/package/workshopper-adventure-storage
[npm-image]: http://img.shields.io/npm/v/workshopper-adventure-storage.svg

[travis-url]: https://travis-ci.org/kid-icarus/workshopper-adventure-storage
[travis-image]: https://travis-ci.org/kid-icarus/workshopper-adventure-storage.png?branch=master
