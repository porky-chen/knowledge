### 单张图片预览

::: demo

```html

<su-button @click='previewImageFile'>图片预览</su-button>
<script>
  export default {
    data() {
      return {
        imageUrl: 'http://hsptest.sunrtnet.com:8888/bridge-linear/05669e6a8331450e8a8d696f54f0ceb2.jpg',
      }
    },
    methods: {
      previewImageFile() {
        this.$su.previewFile({
          fileUrl: this.imageUrl,
          fileName: '这个是文件的名称'
        })
      }
    }
  }
</script>
```

:::

### 多张图片预览

::: demo

```html

<su-button @click='previewMultipleImageFile'>图片2预览</su-button>
<script>
  export default {
    data() {
      return {
        image1Url: 'http://hsptest.sunrtnet.com:8888/bridge-linear/05669e6a8331450e8a8d696f54f0ceb2.jpg',
        image2Url: 'https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/9c16fdfaaf51f3dee3fbb43696eef01f3a297912.jpg',
      }
    },
    methods: {
      previewMultipleImageFile() {
        this.$su.previewImages({
          imageList: [
            {
              larger: this.image1Url,
              thumb: this.image1Url,
              name: '这个是文件1的名称'
            },
            {
              larger: this.image2Url,
              thumb: this.image2Url,
              name: '这个是文件2的名称'
            }
          ],
          previewIndex: 1
        })
      }
    }
  }
</script>
```

:::

### 图片预览方法 - previewFile

| 参数名称 | 说明| 类型 | 可选值 | 默认值 |
|---------- | ------- |---------- |-------- |-------- |
| fileUrl | pdf文件的url，可访问的 | string | — | — |
| fileName | 文件名称 | string | — | - |

### 图片预览方法 - previewImages

| 参数名称 | 说明| 类型 | 可选值 | 默认值 |
|---------- | ------- |---------- |-------- |-------- |
| imageList | 图片资源集合 | array | — | — |
| previewIndex | 预览图片的下标 | number | — | 0 |

### imageList集合内对象属性

| 参数名称 | 说明| 类型 | 可选值 | 默认值 |
|---------- | ------- |---------- |-------- |-------- |
| larger | 大图的url | string | — | — |
| thumb | 缩略图的url | string | — | - |
| name | 文件名称 | string | — | - |
