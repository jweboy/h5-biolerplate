import del from 'del'
import { throws } from 'assert'

// 清理目录
module.exports = () => del(['vendor'])
    .then(paths => {
        console.log('deleted folders:\n', paths.join('\n'))
    })
    .catch(err => {
        throw err
    })
