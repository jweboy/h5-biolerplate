export default {
    dev: {
        port: 8888,
        ui: {
            port: 8889,
            weinre: {
                port: 8886
            }
        },
        server: {
            baseDir: 'release/'
        },
        open: false,
        logPrefix: 'H5Biolerplate',
        reloadOnRestart: true
    },
    build: {
        port: 9999,
        ui: false,
        server: {
            baseDir: 'release/'
        },
        open: 'external'
    }
}
