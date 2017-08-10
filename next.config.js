const path = require('path')
const glob = require('glob')

module.exports = {
  exportPathMap: function () {
    return {
      "/": { page: "/" },
      "/game": { page: "/game" },
      "/games": { page: "/games" },
    };
  },

  webpack: (config, { dev }) => {
    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      }
    ,
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
      }
    )
    return config
  }
}