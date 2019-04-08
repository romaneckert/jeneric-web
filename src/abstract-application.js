const Abstract = require('./abstract');

class AbstractApplication extends Abstract {
    constructor(config) {
        super();

        this._moduleDefinition.type = 'core';
        this._moduleDefinition.name = 'application';

        this.kernel.init(config);

        this._initialCheck = false;
        this._loopInterval = setInterval(this.checkLoop.bind(this), 8);
    }

    checkLoop() {

        if (false === this.systemCheck) {

            // check system, if initial check correct but system check not correct stop running update method
            if (true === this._initialCheck) {
                clearInterval(this._loopInterval);
                throw new Error('system check false but initial check true.');
            }

            return false;

        }

        if (!this._initialCheck) {
            this._initialCheck = true;
            this._registerHandler();
            this.start();
        }

    }

    _registerHandler() {

        this.logger.debug('register handler', this.kernel.handler);

        for (let l1 in this.kernel.handler) {
            switch (l1) {
                case 'window':
                    for (let l2 in this.kernel.handler[l1]) {
                        $(window).on(l2, function (e) {
                            this.logger.debug('handle ' + l1 + '/' + l2, { event: e });
                            this.kernel.handler[l1][l2].handle(e);
                        }.bind(this));
                    }
                    break;

                case 'document':
                    for (let l2 in this.kernel.handler[l1]) {
                        for (let l3 in this.kernel.handler[l1][l2]) {

                            if ('function' === typeof this.kernel.handler[l1][l2][l3].handle) {
                                this._registerDocumentHandlerByType(l3, l2);
                            } else {
                                for (let l4 in this.kernel.handler[l1][l2][l3]) {
                                    this._registerDocumentHandlerByType(l4, l2, l3);
                                }
                            }
                        }
                    }
                    break;
            }
        }
    }

    _registerDocumentHandlerByType(type, class1, class2) {

        let selector = '.' + class1;
        let logMessage = 'handle document/' + class1;

        if ('string' === typeof class2) {
            selector += ' .' + class2;
            logMessage += '/' + class2;
        }

        logMessage += '/' + type;

        switch (type) {
            case 'scroll':
                $(selector).on(type, function (e) {
                    this.logger.debug(logMessage, { event: e });

                    if ('string' === typeof class2) {
                        this.kernel.handler.document[class1][class2][type].handle(e);
                    } else {
                        this.kernel.handler.document[class1][type].handle(e);
                    }

                }.bind(this));
                break;
            default:
                $(document).on(type, selector, function (e) {
                    this.logger.debug(logMessage, { event: e });

                    if ('string' === typeof class2) {
                        this.kernel.handler.document[class1][class2][type].handle(e);
                    } else {
                        this.kernel.handler.document[class1][type].handle(e);
                    }

                }.bind(this));
        }


    }

    start() {
        throw Error('implement start method');
    }

    get systemCheck() {
        return this.kernel.ready;
    }
}

module.exports = AbstractApplication;