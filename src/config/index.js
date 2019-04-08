module.exports = {
    entities : {
        log : {
            class : require('../../common/entity/log')
        }
    },
    handler : {
        socket : {
            message : {
                class : require('../handler/socket/message')
            }
        },
        window : {
            error : {
                class : require('../handler/window/error')
            }
        }
    },
    services : {
        logger : {
            class : require('../service/logger')
        },
        socket : {
            class : require('../service/socket')
        },
        template : {
            class : require('../service/template')
        }
    },
    utils : {
        error : {
            class : require('../../common/util/error')
        },
        object : {
            class : require('../../common/util/object')
        },
        string : {
            class : require('../../common/util/string')
        }
    }
};