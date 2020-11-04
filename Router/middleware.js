class Middleware{
    constructor(cmd, fn, options){
        this.cmd = cmd;
        this.fn = fn;
        this.options = options;

        this.match = function match(cmd){
            return cmd == this.cmd;
        }

        this.handle = function handle(options, next){
            try {
                this.fn(options, next)
            } catch (error) {
                throw new TypeError(error);
            }
        }
    }
}

module.exports = Middleware;
