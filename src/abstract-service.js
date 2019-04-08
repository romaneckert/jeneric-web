const Abstract = require('./abstract');

class AbstractService extends Abstract {
    constructor() {
        super();

        this._moduleDefinition.type = 'service';

        this._config = {};
    }

    get config() {
        return this._config;
    }

    get ready() {
        return true;
    }

}

module.exports = AbstractService;