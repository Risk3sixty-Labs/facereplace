import assert from 'assert'
// import fs from 'fs'
import path from 'path'
import FacialRecognition from './FacialRecognition'

describe('FacialRecognition', function() {
  const face = FacialRecognition()
  const imagesPath = path.join(__dirname, '..', '..', 'images') 
  const imgPath = path.join(imagesPath, 'familypic.png')

  describe('#drawFaceOutlines', function() {
    it(`should get and draw facial detections on a source image`, async function() {
      // detections: [
      //   FaceDetection {
      //     _imageDims: Dimensions { _width: 200, _height: 200 },
      //     _score: 0.9984129071235657,
      //     _classScore: 0.9984129071235657,
      //     _className: '',
      //     _box: Box {
      //       _x: 63.03645968437195,
      //       _y: 49.69329535961151,
      //       _width: 69.07597184181213,
      //       _height: 76.01962387561798
      //     }
      //   }
      // ]
      const [ detections, newBuffer ] = await face.drawFaceOutlines(imgPath)
      // await fs.promises.writeFile(path.join(imagesPath, 'new.jpeg'), newBuffer)

      assert.equal(5, detections.length)
      assert.equal(860, detections[0]._imageDims._width)
      assert.equal(460, detections[0]._imageDims._height)
    })
  })
})
