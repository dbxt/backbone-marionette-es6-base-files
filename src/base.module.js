import Marionette from "backbone.marionette";
import Radio from 'backbone.radio';

class ModuleBase extends Marionette.Application {
    constructor(params, options) {
        super(params, options);

        // Layout
        this.addRegions({
            container: this.el
        });
    }

    get nav_channel() {
        return this._nav_channel = Radio.channel("lab_navigation");
    }

    set nav_channel(value) {
        this._nav_channel = value;
    }
}

export default ModuleBase;