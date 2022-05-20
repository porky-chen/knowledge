## PDF 预览组件

PDF 预览组件

::: demo

```html

<su-button @click='previewPdfFile'>pdf预览</su-button>
<script>
  export default {
    data() {
      return {
        pdfurl: 'http://192.168.0.56:9698//image//construction/2021/9/e9da667021c144648a0dac077579140d.pdf',
      }
    },
    methods: {
      previewPdfFile() {
        this.$su.previewFile({
          fileUrl: this.pdfurl,
          fileName: '这个是文件的名称'
        })
      }
    }
  }
</script>
```

:::

### pdf方法参数

| 参数名称 | 说明| 类型 | 可选值 | 默认值 |
|---------- | ------- |---------- |-------- |-------- |
| fileUrl | pdf文件的url，可访问的 | string | — | — |
| fileName | 文件名称 | string | — | - |
