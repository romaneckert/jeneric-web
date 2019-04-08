const ModuleDefinition = require('./src/module-definition');

class Kernel {

    constructor() {
        this._config = require('./config');
        this._services = {};
        this._entities = {};
        this._utils = {};
        this._handler = {};
        this._moduleDefinition = new ModuleDefinition();
        this._moduleDefinition.type = 'core';
        this._moduleDefinition.name = 'kernel';
    }

    init(config) {

        // load core utils
        for (let util in this._config.utils) {
            this._utils[util] = this._config.utils[util].class;
        }

        // merge application specific config with default config
        if ('object' === typeof config) this._utils.object.merge(this._config, config);

        // load additional utils which are in custom config
        for (let util in this._config.utils) {
            if ('undefined' === typeof this._utils[util]) {
                this._utils[util] = this._config.utils[util].class;
            }
        }

        this._instantiateHandler(this._handler, this._config.handler);

        // make entities application wide available
        for (let entityName in this._config.entities) {
            this._entities[entityName] = this._config.entities[entityName].class;
        }

        // instantiate services
        for (let serviceName in this._config.services) {

            let service = this._config.services[serviceName];
            this._services[serviceName] = new service.class(service.config);
        }

        // debug config
        this.services.logger.log('application config', this._config, this._moduleDefinition, undefined, 7);
    }

    _instantiateHandler(handler, handlerConfig) {

        for (let conf in handlerConfig) {

            if ('function' === typeof handlerConfig[conf].class) {
                handler[conf] = new handlerConfig[conf].class();
            } else {
                handler[conf] = {};
                this._instantiateHandler(handler[conf], handlerConfig[conf]);
            }
        }

        return true;
    }

    get config() {
        return this._config;
    }

    get utils() {
        return this._utils;
    }

    get handler() {
        return this._handler;
    }

    get services() {
        return this._services;
    }

    get entities() {
        return this._entities;
    }

    get ready() {

        for (let serviceName in this.services) {

            let service = this.services[serviceName];

            if (!service.ready) return false;

        }

        return true;
    }

    getModuleNameByClass(clazz) {
        let path = [];
        this._getConfigPathByAttribute(this._config, 'class', clazz, path);

        if (path.length > 1) {
            // removes first path segement like service or handler
            path.shift();
            return path.join('/');
        }

        return null;
    }

    _getConfigPathByAttribute(obj, searchAttr, searchValue, path) {

        for (let attribute in obj) {

            if (attribute === searchAttr && obj[attribute] === searchValue) {
                return true;
            } else {
                if ('object' === typeof obj[attribute]) {
                    if (this._getConfigPathByAttribute(obj[attribute], searchAttr, searchValue, path)) {
                        path.unshift(attribute);
                        return true;
                    }
                }
            }
        }

        return false;
    }

}

module.exports = new Kernel();