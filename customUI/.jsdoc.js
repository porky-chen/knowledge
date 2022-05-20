module.exports = {
  'plugins': [
    'node_modules/jsdoc-vuejs',
  ],
  'source': {
    include: [
      'src/',
      'src/components/',
      'src/components/su-base',
      'src/components/su-button',
      'src/components/su-dynamic-actions',
      'src/components/su-dynamic-form',
      'src/components/su-ezuikit',
      'src/components/su-form',
      'src/components/su-images',
      'src/components/su-input',
      'src/components/su-search',
      'src/components/su-select',
      'src/components/su-upload',
      'src/components/su-validate-code',
      'src/components/su-viewer-modal',
    ],
    'includePattern': '\\.(vue|js)$',
  },
}
