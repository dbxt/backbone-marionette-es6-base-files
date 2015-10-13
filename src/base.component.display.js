import Marionette from "backbone.marionette";
import Epoxy from "backbone.epoxy";

class DisplayComponentBase extends Marionette.ItemView {

    get bindings() {
        return this._bindings;
    }

    set bindings(value) {
        this._bindings = value;
    }

    get edit_action() {
        return this._edit_action;
    }

    set edit_action(value) {
        this._edit_action = value;
    }

    get cancel_action() {
        return this._cancel_action;
    }

    set cancel_action(value) {
        this._cancel_action = value;
    }

    get delete_action() {
        return this._delete_action;
    }

    set delete_action(value) {
        this._delete_action = value;
    }

    cancel(e) {
        e.preventDefault();
        if (typeof this.cancel_action === "function") {
            this.cancel_action(this.model.id);
        }
    }

    edit(e) {
        e.preventDefault();
        if (typeof this.edit_action === "function") {
            this.edit_action(this.model.id);
        }
    }

    delete(e) {
        e.preventDefault();
        if (typeof this.delete_action === "function") {
            this.delete_action(this.model.id);
        }
    }

    onBeforeRender() {
        Epoxy.View.mixin(this);
        this.listenTo(this, "ui:bind", this.applyBindings);
        this.listenTo(this, "before:close", this.removeBindings);
    }

    bindUIElements() {
        this.trigger("ui:bind");
        Marionette.View.prototype.bindUIElements.apply(this, arguments);
    }
}

export default DisplayComponentBase;