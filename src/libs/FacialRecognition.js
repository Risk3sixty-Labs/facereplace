import path from 'path'

// import nodejs bindings to native tensorflow,
// not required, but will speed up things drastically (python required)
import '@tensorflow/tfjs-node'

import * as canvas from 'canvas'
import * as faceapi from 'face-api.js'

// patch nodejs environment, we need to provide an implementation of
// HTMLCanvasElement and HTMLImageElement
const { Canvas, Image, ImageData } = canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

const faceDetectionNet = faceapi.nets.ssdMobilenetv1

export default function FacialRecognition() {
  return {
    async drawFaceOutlines(imagePathOrUrl) {
      await faceDetectionNet.loadFromDisk(path.join(__dirname, '..', '..', 'weights'))
      const img = await canvas.loadImage(imagePathOrUrl)
      const detections = await faceapi.detectAllFaces(img, this.getFaceDetectorOptions(faceDetectionNet))
      
      const out = faceapi.createCanvasFromMedia(img)
      faceapi.draw.drawDetections(out, detections)

      return [
        detections,
        out.toBuffer('image/jpeg')
      ]
    },

    getFaceDetectorOptions(net) {
      // SsdMobilenetv1Options
      const minConfidence = 0.5

      // TinyFaceDetectorOptions
      const inputSize = 408
      const scoreThreshold = 0.5

      return (net === faceapi.nets.ssdMobilenetv1)
        ? new faceapi.SsdMobilenetv1Options({ minConfidence })
        : new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
    }
  }
}