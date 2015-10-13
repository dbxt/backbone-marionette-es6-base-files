import Marionette from "backbone.marionette";
import Epoxy from "backbone.epoxy";

class FormComponentBase extends Marionette.ItemView {

    get bindings() {
        return this._bindings;
    }

    set bindings(value) {
        this._bindings = value;
    }

    get save_action() {
        return this._save_action;
    }

    set save_action(value) {
        this._save_action = value;
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

    get events() {
        return this._events;
    }

    set events(value) {
        this._events = value;
    }

    cancel(e) {
        e.preventDefault();
        if (typeof this.cancel_action === "function") {
            this.cancel_action(this.model.id);
        }
    }

    save(e) {
        e.preventDefault();
        if (typeof this.save_action === "function") {
            this.save_action(this.model.id);
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

export default FormComponentBase;