module.exports = {
    stack : function(error) {

        let stack = [];

        if('string' === typeof error.stack) {
            let lines = error.stack.split('at ');

            lines.shift();

            for(let line of lines) {

                let file = '';
                let column = 0;
                let row = 0;

                let path = line.match(/\(.+\)/g);

                if('object' === typeof path && null !== path) {
                    path = path[0].replace('(', '');
                    path = path.replace(')', '');

                    if(-1 !== path.indexOf(':')) path = path.split(':')[0];

                } else {
                    path = '';
                }

                let fileWithLineAndColumn = line.match(/\w+\.js:\d+:\d+|\w+\.\w+\.js:\d+:\d+/g);

                if(
                    null !== fileWithLineAndColumn &&
                    'object' === typeof fileWithLineAndColumn &&
                    'string' === typeof fileWithLineAndColumn[0]
                ) {
                    let parts = fileWithLineAndColumn[0].split(':');

                    if('string' === typeof parts[0]) file = parts[0];
                    if('string' === typeof parts[1]) row = parts[1];
                    if('string' === typeof parts[2]) column = parts[2];

                }

                let method = line.split('(')[0].trim();
                method = (0 === method.indexOf('new')) ? method.replace('new ', '') + '.constructor' : method;

                if(path === '' && file !== '') {
                    path = file;
                }

                let entry = {
                    path : path,
                    file : file,
                    row : row,
                    column : column,
                    method : method
                };

                stack.push(entry);
            }
        }

        return stack;
    }
};