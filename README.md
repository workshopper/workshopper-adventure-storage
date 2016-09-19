# workshopper-adventure-storage

Simple storage for [workshopper-adventure](https://github.com/workshopper/workshopper-adventure)

Based on work from [Martin Heidegger](https://github.com/martinheidegger)

## Install

```
npm install workshopper-adventure --save
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
