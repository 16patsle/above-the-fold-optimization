/*
const logConfig = config => {
    console.log(config)
    return config
}

logConfig.isMiddleware = true
*/

const disableCodeSplitting = config => {
    config.output.filename = 'static/js/[name].js'
    config.output.chunkFilename = 'static/js/[name].chunk.js'
    config.optimization.runtimeChunk = false
    config.optimization.splitChunks.name = 'abtf'
    config.optimization.splitChunks.cacheGroups = {
        default: false
    }
    return config
}

module.exports = [
    disableCodeSplitting,
    //logConfig,
]