module.exports = {
    entry: {
        main: './src/main.ts',
    },
    resolve: {
        extensions: [".ts"]
    },
    output: {
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    }
};
