import fs from 'fs'
import path from 'path'
import colors from 'colors'
import minimist from 'minimist'

const argv = minimist(process.argv.slice(2))

;(async function faceReplace() {
  try {
    const facePicture = argv.f || argv.face
    const destPicture = argv.p || argv.pic

    if (!facePicture)
      throw new Error(`enter the path or URL to a picture of a face to replace in your target picture`)

    if (!destPicture)
      throw new Error(`enter the path or URL to a picture to replace faces in`)

    const FaceReplace = require('../index').default

    const fileExt = path.extname(destPicture)
    const newFilePath = path.join(process.env.HOME || process.env.USERPROFILE, `facereplace_${Date.now()}${fileExt || 'jpeg'}`)
    const face = FaceReplace(facePicture)
    const imgBuffer = await face.replace(destPicture)
    await fs.promises.writeFile(newFilePath, imgBuffer)
    console.log(`Successfully replaced faces and saved your file here: ${newFilePath}`.green)

  } catch(err) {
    console.error(`Error replacing faces`, err)
  } finally {
    process.exit()
  }
})()