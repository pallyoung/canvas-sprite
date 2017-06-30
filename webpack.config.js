'use strict'
var webpack = require('webpack');
var path = require('path');
module.exports = function(env){
    console.log('env',env)
    var entry = './src/index.ts';
    var output = {
        path: path.resolve(env=='dev'?'./demo':'./dist'),
        filename: 'index.bundle.js',
        chunkFilename: "[id].js",
        publicPath: "",
        library: 'CanvasSprite',
        libraryTarget: 'umd',
        umdNamedDefine: true
    }
    var modules = {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude:path.resolve('./node_modules')
            },
        ],
    };

    var resolve = {
        extensions: ['.webpack.js', '.web.js', '.ts', '.js']
    }
    var devServer =  {
        contentBase:path.resolve('./demo'),
        compress: true,
        port: 8000,
        hot:true,
        disableHostCheck: true,
    }
    return {
        entry:entry,
        output:output,
        module:modules,
        resolve:resolve,
        devServer:devServer,
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ],
    }
}