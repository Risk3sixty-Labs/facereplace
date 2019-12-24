## facereplace

Use [face recognition API](https://github.com/justadudewhohacks/face-api.js) to replace faces in
pictures with a face of your choice using NodeJS.

<img src="https://user-images.githubusercontent.com/13718950/71393327-0da16280-25da-11ea-916e-15085b30aa8e.png" width="400">

### Install

`npm install --save facereplace`

### Usage

```js
import fs from 'fs'
import FaceReplace from 'facereplace'
// or
// const FaceReplace = require('facereplace').default

// images on file system
const face = FaceReplace('/tmp/catFace.png')

// returns a raw buffer of the new face-replaced image for you to do as you wish
const imgBuffer = await face.replace('/tmp/picToReplaceFacesWithCatFace.jpeg')
await fs.promises.writeFile('/tmp/replaced.jpeg', imgBuffer)

// images on the internet
const face = FaceReplace()
face.setFacePicture('https://acme.com/face.jpeg')
const imgBuffer = await face.replace('https://acme.com/picFullOfFaces.png')
```