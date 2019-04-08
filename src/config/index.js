module.exports = {
    entities: {
        log: {
            class: require('../entity/log')
        }
    },
    handler: {
        socket: {
            message: {
                class: require('../handler/socket/message')
            }
        },
        window: {
            error: {
                class: require('../handler/window/error')
            }
        }
    },
    services: {
        logger: {
            class: require('../service/logger')
        },
        socket: {
            class: require('../service/socket')
        },
        template: {
            class: require('../service/template')
        }
    },
    utils: {
        error: {
            class: require('../util/error')
        },
        object: {
            class: require('../util/object')
        },
        string: {
            class: require('../util/string')
        }
    }
};