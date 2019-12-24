import fs from 'fs'
import request from 'request-promise-native'

export default function FileHelpers() {
  return {
    async getUrlBuffer(url) {
      return await request({
        method: 'GET',
        url: url,
        encoding: null
      })
    },

    async checkAndCreateDirectory(dirPath) {
      try {
        if (!(await this.doesDirectoryExist(dirPath)))
          await fs.promises.mkdir(dirPath)

        return true

      } catch(err) {
        if (err.code == 'EEXIST')
          return true

        throw err
      }
    },

    async doesDirectoryExist(filePath) {
      try {
        const stats = await fs.promises.stat(filePath)
        return stats.isDirectory()
      } catch(e) {
        return false
      }
    }
  }
}