import fs from 'fs'
import path from 'path'
import FacialRecognition from './libs/FacialRecognition'
import FileHelpers from './libs/FileHelpers'
import ImageHelpers from './libs/ImageHelpers'

const files = FileHelpers()

export default function FaceReplace(facePicPathOrUrl) {
  return {
    faceReplacePath: facePicPathOrUrl,
    tmpPath: path.join(__dirname, '..', 'tmp'),

    setFacePicture(pathOrUrl) {
      this.faceReplacePath = pathOrUrl
    },
  
    async replace(sourceImgPathOrUrl) {
      const img = ImageHelpers()
      const face = FacialRecognition()

      await this.confirmFacePathIsSet()
  
      let imgPath = sourceImgPathOrUrl
      if (this.isStringValidUrl(imgPath))
        imgPath = await this.getFileAndStoreLocally(imgPath)
  
      await img.open(imgPath)
      const [ detections ] = await face.drawFaceOutlines(imgPath)
      await Promise.all(
        detections.map(async detection => {
          const localFaceImg = ImageHelpers()
          await localFaceImg.open(this.faceReplacePath)
          localFaceImg.cover(parseInt(detection._box._width), parseInt(detection._box._height))
  
          img.composite(
            localFaceImg.image, 
            parseInt(detection._box._x), 
            parseInt(detection._box._y))
        })
      )
  
      const replacedImgBuffer = await img.toBuffer()
      const replacedImgName = `facereplace_${Date.now()}.jpeg`
      const replacedImgPath = path.join(this.tmpPath, replacedImgName)
      await fs.promises.writeFile(replacedImgPath, replacedImgBuffer)
  
      return {
        name: replacedImgName,
        path: replacedImgPath,
        buffer: replacedImgBuffer
      }
    },
  
    async getFileAndStoreLocally(imgUrl) {
      await files.checkAndCreateDirectory(this.tmpPath)
      const splitUrl = imgUrl.split('/')
      const localFilename = splitUrl[splitUrl.length - 1]
      const imgBuff = await files.getUrlBuffer(imgUrl)
      
      const fullPath = path.join(this.tmpPath, localFilename)
      await fs.promises.writeFile(fullPath, imgBuff)
      return fullPath
    },

    async confirmFacePathIsSet() {
      if (!this.faceReplacePath)
        throw new Error(`Make sure a face replacement picture is set`)

      if (this.isStringValidUrl(this.faceReplacePath))
        return this.faceReplacePath = await this.getFileAndStoreLocally(this.faceReplacePath)

      return this.faceReplacePath
    },

    isStringValidUrl(str) {
      return /^https*\:\/\//.test(str)
    }
  }
}