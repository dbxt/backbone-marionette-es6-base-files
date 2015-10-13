import _ from "underscore";
import $ from "jquery";
import Backbone from "backbone";
import Epoxy from "backbone.epoxy";
import Marionette from "backbone.marionette";
import Radio from 'backbone.radio';

import GridControl from "datatables";

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

class LayoutViewBase extends Marionette.LayoutView {}

class PageViewBase extends Backbone.View {
    constructor(config, params, template) {
        super(config);
        $(config.el).html(template);
    }
}

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

class GridComponentBase extends Backbone.View {
    constructor(config, params, template) {
        super(config);
        this._template = template;

        if (params) {
            if (params.hasOwnProperty("data")) {
                this._data = params.data;
            }
            if (params.hasOwnProperty("columns")) {
                this._columns = params.columns;
            }
            if (params.hasOwnProperty("options")) {
                this._options = params.options;
            }
            if (params.hasOwnProperty("container")) {
                this._container = params.container;
            } else {
                this._container = config.el;
            }
        } else {
            this._container = config.el;
        }
    }

    get container() {
        return this._container;
    }

    set container(value) {
        this._container = value;
    }

    get columns() {
        return this._columns;
    }

    set columns(value) {
        this._columns = value;
    }

    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
    }

    get options() {
        return this._options;
    }

    set options(value) {
        this._options = value;
    }

    get rowSingleClickAction() {
        return this._row_singleclick_action;
    }

    set rowSingleClickAction(value) {
        this._row_singleclick_action = value;
    }

    get rowDoubleClickAction() {
        return this._row_doubleclick_action;
    }

    set rowDoubleClickAction(value) {
        this._row_doubleclick_action = value;
    }

    get selectedRow() {
        return this._row_selected;
    }

    set selectedRow(value) {
        this._row_selected = value;
    }

    data_fetch_error(collection, response, options) {
        console.log(collection);
        console.log(response);
        console.log(options);
    }

    render() {
        let _this = this;
        if (!this._container) {
            throw "Container is required for Grid Control.";
        }
        if (!this._columns) {
            throw "Columns is required for Grid Control.";
        }
        if (!this._data) {
            throw "Data is required for Grid Control.";
        }

        let grid_data = this._data;
        let grid = $(this._container).DataTable({
            "autoWidth": true,
            "data": grid_data,
            "info": false,
            "ordering": false,
            "paging": (grid_data.length > 20),

            "scrollX": false,
            "scrollY": false,
            "searching": false,

            "stateSave": true,

            "columns": this._columns,
            "columnDefs": [{
                "searchable": false,
                "orderable": false,
                "targets": 0
            }]
        });

        if (typeof this._row_singleclick_action === "function") {
            $(this._container).find("tbody").on('click', 'tr', function () {
                _this._row_selected = grid.row(this).data();
                _this._row_singleclick_action(_this._row_selected);
            });
        } else {
            $(this._container).find("tbody").on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                    //_this._row_selected = null;
                }
                else {
                    grid.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    _this._row_selected = grid.row(this).data();
                }
            });
        }

        $(this._container).find("tbody").on('dblclick', 'tr', function () {
            if (typeof _this._row_doubleclick_action === "function") {
                _this._row_doubleclick_action(_this._row_selected);
            } else {
                console.log(_this._row_selected);
            }
        });
    }
}

class NavComponentBase extends Marionette.ItemView {}

export { CollectionBase,
 ControllerBase,
 DisplayComponentBase,
 FormComponentBase,
 GridComponentBase,
 LayoutViewBase,
 ManagedModelBase,
 ModuleBase,
 NavComponentBase,
 PageViewBase,
 RouterBase
}