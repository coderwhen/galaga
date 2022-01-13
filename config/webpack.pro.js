const webpackConfig = require('../webpack.config')
webpackConfig.devtool = false
webpackConfig.mode = "production"
module.exports = webpackConfig