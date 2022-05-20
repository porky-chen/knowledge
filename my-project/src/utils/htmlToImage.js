/**
 * HTML 区域导出成图片
 * */
// <div id="view"></div>
// html2canvas

// 1、滚动截屏
const targetDom = document.querySelector('#admin')
const copyDom = targetDom.cloneNode(true)
copyDom.style.width = targetDom.scrollWidth + 'px'
copyDom.style.height = targetDom.scrollHeight + 'px'
document.body.appendChild(copyDom)
html2canvas(copyDom, {
  allowTaint: false, //  false   不允许跨域图片污染画布
  useCORS: true, // 允许加载跨域图片
  height: targetDom.scrollHeight,
  width: targetDom.scrollWidth
}).then(canvas => {
// canvas
});

// 下载图片
// 插入之前canvas下
html2canvas(copyDom, {
  allowTaint: false,
  useCORS: true,
  height: targetDom.scrollHeight,
  width: targetDom.scrollWidth
}).then(canvas => {
  this.printShow = true
  copyDom.parentNode.removeChild(copyDom)
  // console.log(canvas.style.width)
  canvas.style.width = parseFloat(canvas.style.width) * 0.8 + 'px'
  canvas.style.height = parseFloat(canvas.style.height) * 0.8 + 'px'
  setTimeout(() => {
    const container = document.querySelector('#view')
    while (container.hasChildNodes()) {
      container.removeChild(container.firstChild)
    }
    // toImage
    const dataImg = new Image()
    dataImg.src = canvas.toDataURL('image/png')
    document.querySelector('#view').appendChild(dataImg)

    const alink = document.createElement('a');
    alink.href = dataImg.src;
    alink.download = 'testImg.jpg';
    alink.click();
  }, 0)
});


// 容器需要形成图片的id
function getDoc(id){
  const cntElem = document.querySelector(id);

  var shareContent = cntElem; //需要截图的包裹的（原生的）DOM 对象
  var width = shareContent.offsetWidth; //获取dom 宽度
  var height = shareContent.offsetHeight; //获取dom 高度

  var canvas = document.createElement('canvas'); //创建一个canvas节点
  var scale = 2; //定义任意放大倍数 支持小数
  canvas.width = width * scale
  canvas.height = height * scale
  canvas.getContext('2d').scale(scale, scale); //获取context,设置scale

  html2Canvas(document.querySelector(id), {
    canvas,
    logging: true,
    width,height,
    allowTaint: true,
    useCORS: true,
    dpi: window.devicePixelRatio * scale,
  }).then(function (canvasData) {
      const context = canvas.getContext('2d');
      // 关闭抗锯齿形
      context.mozImageSmoothingEnabled = false;
      context.webkitImageSmoothingEnabled = false;
      context.msImageSmoothingEnabled = false;
      context.imageSmoothingEnabled = false;

      let imgData = canvasData.toDataURL('image/jpeg', 1.0);
      let aLink = document.createElement('a');
      aLink.style.display = 'none';
      aLink.href = imgData;
      aLink.download = '工作流程.jpg'
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink)
    }
  )
}
