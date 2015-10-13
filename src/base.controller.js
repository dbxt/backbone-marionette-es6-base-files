import Marionette from "backbone.marionette";

class ControllerBase extends Marionette.Controller {
    constructor(params) {
        super(params);

        // app
        if (this.options.hasOwnProperty("app")) {
            this.app = this.options.app;
        }

        //module_container
        if (this.app.hasOwnProperty("app_container")) {
            this._module_container = this.app.app_container
        }
        if (this.options.hasOwnProperty("app_container")) {
            this._module_container = this.options.app_container;
        }
        if (this.options.hasOwnProperty("module_container")) {
            this._module_container = this.options.module_container;
        }
        if (this.options.hasOwnProperty("el")) {
            this._module_container = this.options.el
        }

        //router
        if (this.options.hasOwnProperty("router")) {
            this._router = this.options.router;
        }
    }

    get module_container() {
        return this._module_container;
    }

    set module_container(value) {
        this._module_container = value;
    }

    get router() {
        return this._router;
    }

    set router(value) {
        this._router = value;
    }
}

export default ControllerBase;
