import Backbone from "backbone";

class PageViewBase extends Backbone.View {
    constructor(config, params, template) {
        super(config);
        $(config.el).html(template);
    }
}

export default PageViewBase;