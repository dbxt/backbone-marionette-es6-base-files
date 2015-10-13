import Backbone from "backbone";

class CollectionBase extends Backbone.Collection {
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

    get url() {
        return this._url;
    }

    set url(value) {
        this._url = value;
    }

    get model() {
        return this._model;
    }

    set model(value) {
        this._model = value;
    }
}

export default CollectionBase;