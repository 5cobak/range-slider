/*	eslint no-param-reassign: "off"	*/
/// <reference path="globals.d.ts" />
/// <reference path="jquery.range-slider.d.ts" />
const ViewSlider = require('./View.ts');
(($) => {
  $.fn.extend({
    myPlugin: function (options: IsettingsTypes) {
      const $this = this as JQuery; // this dom element
      const settings: IsettingsTypes = $.extend(
        {
          // default options object
          $el: $this,
          min: 0,
          max: 1000,
          type: 'single',
          from: 100,
          to: 900,
          flag: false,
        },
        options // custom options object
      );
      const view = new ViewSlider($this, settings);
      const presenter = new Presenter(view, model);
      return this;
    },
  });
})(jQuery);
