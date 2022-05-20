const { promisify } = require('util')
const figlet = promisify(require('figlet'))

const chalk = require('chalk')
const log = (content, color) => console.log(chalk[color](content))
module.exports = {
  showChlk: async (msg, color) => {
    // 打印
    const data = await figlet(msg)
    log(data, color)
  }
}