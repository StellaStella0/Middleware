const Middleware = require('./middleware');

class Router{
    constructor(){
        this.callStack = [];

        this.use = function(cmd, ...fn) {
            if(fn.length === 0) throw new TypeError('Router requires middlewear, please pass one.');
            
            for (const callback of fn) {
                this.callStack.push(new Middleware(cmd, callback, {}));
            }
        }

        this.handleRequest = (cmd, options) => {
            let idx = 0; // Index of the middlewares that were checked already
            const { callStack } = this;

            function next(){
                let match; // If a first middleware is found, break the loop
                let middleware;

                while(idx < callStack.length && !match){
                    middleware = callStack[idx];
                    idx += 1;

                    match = middleware.match(cmd);
                }
                
                if(!match) return;

                middleware.handle(options, next);
            }

            next();
        }
    }
}


module.exports = Router;