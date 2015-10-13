import Backbone from "backbone";

class RouterBase extends Backbone.Router {
    constructor(params, options) {
        super(params, options);
        if (params) {
            if (params.hasOwnProperty("nav_channel")) {
                this._channel = params.nav_channel;
            } else {
                throw "Router must be passed an Nav Channel";
            }
        } else {
            throw "Router must be passed required parameters";
        }
    }
    get channel() {
        return this._channel;
    }

    set channel(value) {
        this._channel = value;
    }
    get routes() {
        return this._routes;
    }

    set routes(value) {
        this._routes = value;
    }
}

export default RouterBase;