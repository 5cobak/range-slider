/*	eslint no-param-reassign: "off"	*/
/// <reference path="globals.d.ts" />
/// <reference path="jquery.range-slider.d.ts" />
import Presenter from './Presenter';
(($) => {
  $.fn.extend({
    myPlugin: function (options: IsettingsTypes) {
      const $this = this as HTMLElement; // this dom element
      const settings: IsettingsTypes = $.extend(
        {
          // default options object
          $el: $this,
          min: 0,
          max: 1000,
          type: 'single',
          // from: 100,
          // to: 900,
          flag: false,
          step: 1,
        },
        options // custom options object
      );

      const presenter = new Presenter(settings, $this);
      const methods = {
        update: (options: IsettingsTypes) => {},
      };
      return this;
    },
  });
})(jQuery);
