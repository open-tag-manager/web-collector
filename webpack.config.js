const path = require('path')

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/web_main.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist-web'),
    filename: 'web-collector.js'
  },
  resolve: {
    extensions: [
      '.ts', '.js'
    ]
  }
}
