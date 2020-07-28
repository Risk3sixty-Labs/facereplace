import Jimp from 'jimp'

export default function ImageHelpers(jimpImage=null) {
  return {
    image: jimpImage,

    // https://www.npmjs.com/package/jimp#basic-usage
    async open(src) {
      return this.image = await Jimp.read(src)
    },

    // https://www.npmjs.com/package/jimp#writing-to-buffers
    async toBuffer(jimpImg=this.image, mime=Jimp.MIME_PNG) {
      return await jimpImg.getBufferAsync(mime)
    },

    // https://github.com/oliver-moran/jimp/tree/master/packages/plugin-cover
    cover(width, height=null) {
      return this.image.cover(width, height || width)
    },

    // https://github.com/oliver-moran/jimp/tree/master/packages/plugin-mask
    composite(destImg, x, y) {
      return this.image.composite(destImg, x, y)
    }
  }
}