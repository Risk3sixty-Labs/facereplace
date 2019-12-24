## facereplace

Use [face recognition API](https://github.com/justadudewhohacks/face-api.js) to replace faces in
pictures with a picture of a face of your choice.

![Face Replace Example](https://user-images.githubusercontent.com/13718950/71393327-0da16280-25da-11ea-916e-15085b30aa8e.png)

### Usage

```js
import FaceReplace from 'facereplace'

// images on file system
const face = FaceReplace(`/tmp/catFace.png`)
const {
  name,   // face-replaced file name
  path,   // face-replaced local file path (stored in 'tmp' directory created in this repo)
  buffer  // face-replaced raw buffer for you to do as you wish
} = await face.replace(`/tmp/picToReplaceFacesWithCatFace.jpeg`)

// images on the internet
const face = FaceReplace()
face.setFacePicture(`https://acme.com/face.jpeg`)
const { name, path, buffer } = await face.replace(`https://acme.com/picFullOfFaces.png`)
```