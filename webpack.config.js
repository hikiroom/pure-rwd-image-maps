const env = process.env.NODE_ENV;
const entry = ((env) => {
    switch (env) {
        case 'production':
            return {'dist/pureRwdImageMaps': './src/ts/pureRwdImageMaps.ts'};
        case 'development':
            return {'sample/js/pureRwdImageMaps': './src/ts/pureRwdImageMaps.ts'};
        default:
            return {'sample/js/pureRwdImageMaps': './src/ts/pureRwdImageMaps.ts'};
    }
})(env);

module.exports = {
    mode: env,
    entry,
    output: {
        filename: '[name].js',
        path: __dirname,
        globalObject: 'this',
        library: {
            name: 'PureRwdImageMaps',
            type: 'umd',
            export: 'default',
        },
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
};