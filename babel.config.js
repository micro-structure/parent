module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
    [
      'import',
      {
        libraryName: 'esc-ui',
        style: true
      },
      'esc-ui'
    ],
    [
      'import',
      {
        libraryName: 'ant-design-vue',
        style: true
      },
      'ant-design-vue'
    ]
  ]
}
