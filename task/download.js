import fs from 'fs'
import download from 'download'
import { cdn, script } from '../config/vendor'

// 自动从cdn下载配置的依赖模块
module.exports = async () => {
  const url = cdn + script.fastclick
  try {
    await fs.mkdirSync('vendor')
    await download(url, 'vendor')
    await console.log('vendor download is ok')
  } catch (err) { 
    console.log('download error =>', err);
  }

}
