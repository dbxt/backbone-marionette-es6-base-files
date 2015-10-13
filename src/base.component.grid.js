import Backbone from "backbone";

import "../theme/jquery.dataTables.min.css!";
import _ from "underscore";
import GridControl from "datatables";

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

export default GridComponentBase;