const path = require('path');
const infiniteCanvasWebpackConfig = require('../infinite-canvas-webpack-config');

module.exports = function(destination, excludeInfiniteCanvas){
    const fullDestination = path.resolve(destination);
    const parallel = [
        {
            type: 'copyFiles',
            source: __dirname,
            destination: destination,
            fileNames: ['index.html', 'style.css']
        },
        {
            type: 'buildScripts',
            source: __dirname,
            destination: destination,
            fileNames: ['script.js']
        }
    ];
    if(!excludeInfiniteCanvas){
        parallel.push({
            type: 'webpack',
            config: (forProduction) => infiniteCanvasWebpackConfig(fullDestination, forProduction)
        });
    }
    return {steps: [{parallel}]};
}