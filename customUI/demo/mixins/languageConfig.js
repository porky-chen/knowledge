export default {
  beforeMount() {
    this.$i18n.mergeLocaleMessage('zh', this.languageConfig.zh)
    this.$i18n.mergeLocaleMessage('en', this.languageConfig.en)
  }
}