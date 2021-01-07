const { cpus } = require('os');

module.exports = {
    devServer: {
        open: true,
        port: 8080,
    },
    parallel: cpus().length > 1,
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    javascriptEnabled: true,
                },
            },
        },
    },
};
