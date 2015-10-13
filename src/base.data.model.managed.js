import Backbone from 'backbone';
import Epoxy from "backbone.epoxy";

class ManagedModelBase extends Epoxy.Model {
    constructor(config, params) {
        super(config);
        if (params) {
            if (params.hasOwnProperty("url")) {
                this._url = params.url;
            }
            if (params.hasOwnProperty("model")) {
                this._model = params.model;
            }
        }
    }
}

export default ManagedModelBase;