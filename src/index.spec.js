import assert from 'assert'
import fs from 'fs'
import path from 'path'
import FaceReplace from './index'

const imagesPath = path.join(__dirname, '..', 'images') 
const tmpPath = path.join(__dirname, '..', 'tmp')

describe('FaceReplace', function() {
  const imgPath = path.join(imagesPath, 'familypic.png')

  describe('#setFacePicture', function() {
    it(`should set the face picture path`, function() {
      const face2 = FaceReplace('abc')
      assert.equal('abc', face2.faceReplacePath)

      face2.setFacePicture('123')
      assert.equal('123', face2.faceReplacePath)
    })
  })

  describe('#replace', function() {
    it(`should run and replace all faces with replacement pic stored locally without error`, async function() {
      this.timeout(5000)
      const face = FaceReplace(path.join(imagesPath, 'catface.png'))
      await face.replace(imgPath)
    })

    it(`should run and replace all faces with replacement pic as URL without error`, async function() {
      this.timeout(5000)
      const face = FaceReplace(`http://clipart-library.com/images_k/cat-face-transparent/cat-face-transparent-10.png`)
      await face.replace(`https://static.voices.com/wp-content/uploads/multiple-faces-male-and-female-actors-smiling-2.jpg`)
    })
  })
})