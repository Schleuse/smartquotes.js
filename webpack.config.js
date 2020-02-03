var path = require('path');

module.exports = {
    mode: 'production',
    // Change to your "entry-point".
    entry: './lib/index',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'smartquotes.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [{
            // Include ts, tsx, js, and jsx files.
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    }
};
