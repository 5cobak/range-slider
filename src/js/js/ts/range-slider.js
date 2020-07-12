"use strict";
const ViewSlider = require('./View.ts');
(($) => {
    $.fn.extend({
        myPlugin: function (options) {
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
            const view = new ViewSlider($this, settings);
            return this;
        },
    });
})(jQuery);
//# sourceMappingURL=range-slider.js.map