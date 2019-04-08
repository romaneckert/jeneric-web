module.exports = {
    merge : function(obj1, obj2) {
        for(let key in obj2) {
            if('object' === typeof obj1[key] && 'object' === typeof obj2[key]) {
                obj1[key] = this.merge(obj1[key], obj2[key]);
            } else {
                obj1[key] = obj2[key];
            }
        }
        return obj1;
    }
};