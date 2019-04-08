const ModuleDefinition = require('../common/module-definition');

class Abstract {

    constructor() {
        this._moduleDefinition = new ModuleDefinition();
        this._moduleDefinition.name = this.kernel.getModuleNameByClass(this.constructor);
    }

    get kernel() {
        return require('./kernel');
    }

    get entities() {
        return this.kernel.entities;
    }

    get services() {
        return this.kernel.services;
    }

    get logger() {

        // builing layer between real logger service to set the module definition to logger
        return {
            emergency : function(message, meta, stack) {
                this.services.logger.log(message, meta, this.moduleDefinition, stack, 0);
            }.bind(this),

            alert : function(message, meta, stack) {
                this.services.logger.log(message, meta, this.moduleDefinition, stack, 1);
            }.bind(this),

            critical : function(message, meta, stack) {
                this.services.logger.log(message, meta, this.moduleDefinition, stack, 2);
            }.bind(this),

            error : function(message, meta, stack) {
                this.services.logger.log(message, meta, this.moduleDefinition, stack, 3);
            }.bind(this),

            warning : function(message, meta, stack) {
                this.services.logger.log(message, meta, this.moduleDefinition, stack, 4);
            }.bind(this),

            notice : function(message, meta, stack) {
                this.services.logger.log(message, meta, this.moduleDefinition, stack, 5);
            }.bind(this),

            info : function(message, meta, stack) {
                this.services.logger.log(message, meta, this.moduleDefinition, stack, 6);
            }.bind(this),

            debug : function(message, meta, stack) {
                this.services.logger.log(message, meta, this.moduleDefinition, stack, 7);
            }.bind(this)
        };
    }

    get utils() {
        return this.kernel.utils;
    }

    get moduleDefinition() {
        return this._moduleDefinition;
    }

    get handler() {
        return this.kernel.handler;
    }
}

module.exports = Abstract;