## facereplace

Use [face recognition API](https://github.com/justadudewhohacks/face-api.js) to replace faces in
pictures with a face of your choice using NodeJS.

<img src="https://user-images.githubusercontent.com/13718950/71393327-0da16280-25da-11ea-916e-15085b30aa8e.png" width="400">

### Install

`npm install --save facereplace`

### CLI/Quickstart

facreplace contains a CLI utility you can use to replace faces
in pictures without writing your own script/code.

```sh
$ npm install -g facereplace
$ facereplace -f /path/to/facePic.jpeg -p /path/to/destinationPicToReplaceFaces.jpeg
Successfully replaced faces and saved your file here: /Users/yourname/facereplace_1577203511111.jpeg

$ facereplace -f https://acme.com/facePic.jpeg -p https://acme.com/destinationPicToReplaceFaces.png
Successfully replaced faces and saved your file here: /Users/yourname/facereplace_1577203511111.png
```

### API

See [Usage](#Usage) for more details

```js
const facePic = '/tmp/facePic.jpeg' // or 'https://acme.com/facePic.jpeg'
const face = FaceReplace(facePic)
```

1. `face.replace(string)` => Promise&lt;Buffer&gt;: takes a string of the local file path or public URL of the picture we want to replace faces in, and replaces them
2. `face.setFacePicture(string)` => void: takes a string of the local file path or public URL to replace the picture you want to replace all faces in your target picture(s)

### Usage

```js
import fs from 'fs'
import FaceReplace from 'facereplace'
// or
// const FaceReplace = require('facereplace').default

// images on file system
const face = FaceReplace('/tmp/catFace.png')
const imgBuffer = await face.replace('/tmp/picToReplaceFacesWithCatFace.jpeg')
await fs.promises.writeFile('/tmp/replaced.jpeg', imgBuffer)

// images on the internet
const face = FaceReplace()
face.setFacePicture('https://acme.com/face.jpeg') // resets face img, same as passing in first arg to `FaceReplace(firstArg)`
const imgBuffer = await face.replace('https://acme.com/picFullOfFaces.png')
```