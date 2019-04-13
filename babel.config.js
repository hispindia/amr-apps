module.exports = function(api) {
    api.cache.forever()

    return {
        presets: [
            ['@babel/preset-env'],
            ['@babel/preset-react', { modules: 'commonjs' }]
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-transform-react-constant-elements'
        ]
    }
}
