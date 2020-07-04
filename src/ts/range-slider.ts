/*	eslint no-param-reassign: "off"	*/
/// <reference path="globals.d.ts" />
const jQuery = require('jquery');
const View = require('./View');

(($) => {
  $.fn.myPlugin = (options) => {
    const $this = this; // dom element this

    const settings: IsettingsTypes = $.extend(
      {
        // options object
        $el: $this,
        min: 0,
        max: 1000,
        type: 'single',
        from: 100,
        to: 900,
        flag: false,
      },
      options
    );

    const view = new View($this, settings);
    // const model = new Model(settings);
  };
})(jQuery);
