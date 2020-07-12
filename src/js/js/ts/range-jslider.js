"use strict";
(($) => {
    $.fn.myPlugin = function (options) {
        const $this = this;
        const settings = $.extend({
            $el: $this,
            min: 0,
            max: 1000,
            type: 'single',
            from: 100,
            to: 900,
            flag: false,
        }, options);
        const view = new View($this, settings);
        return this;
    };
})(jQuery);
//# sourceMappingURL=range-jslider.js.map