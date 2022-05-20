/**
 * 打印指定区域的元素
 * @param {String} selector 打印区域的根元素选择器
 * @param {Object} opts 选项
 */
function print (selector, opts = {}) {
  if (!selector) {
    console.error('selector is required.')
    return
  }

  const {
    style = `
      html,
      body {
        margin: 0;
        padding: 0;
      }

      table {
        border-collapse: collapse;
        border: 1px solid #e6e6e6;
        width: 100%;
      }

      table th,
      table td {
        border: 1px solid #e6e6e6;
      }
    `
  } = opts
  const newWindow = window.open('_blank')
  const styleEl = document.createElement('style')
  styleEl.type = 'text/css'
  styleEl.innerHTML = style
  const html = document.querySelector(selector).outerHTML
  newWindow.document.write(styleEl.outerHTML + html)
  newWindow.print()
  newWindow.close()
}

export default print
