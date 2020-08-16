/*	eslint no-param-reassign: "off"	*/
/// <reference path="globals.d.ts" />
/// <reference path="jquery.range-slider.d.ts" />
import Presenter from './Presenter';
import { IsettingsTypes } from './globals';

(($) => {
  $.fn.extend({
    rangeSlider: function (method: string | object) {
      const $this = this as HTMLElement;

      let settings: IsettingsTypes = $.extend(
        {
          // default options object
          type: 'single',
          min: 0,
          max: 1000,
          from: 100,
          // to: 900,
          flag: true,
          step: 1,
          scale: true,
        },
        method
      ); // custom options object

      const methods = {
        update: (options: IsettingsTypes) => {
          let dataObj = $($this).data();
          let updatedOptions = $.extend(dataObj, options);

          $(this).children().remove();
          new Presenter(updatedOptions, $this);

          setData(updatedOptions);
        },
        init: (options: IsettingsTypes) => {
          if (!options) {
            new Presenter(settings, $this);
            setData(settings);
          } else {
            new Presenter(options, $this);
            setData(options);
          }
        },
      };

      // this dom element

      function setData(obj: IsettingsTypes) {
        for (let key in obj) {
          let attr: string | number | boolean;
          attr = $($this).data(`${key}`);
          if (!attr) $($this).data(`${key}`, `${obj[key]}`);
        }
      }

      return $(this).each(() => {
        if (methods[method]) {
          // если запрашиваемый метод существует, мы его вызываем
          // все параметры, кроме имени метода прийдут в метод
          // this так же перекочует в метод
          return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
          // если первым параметром идет объект, либо совсем пусто
          // выполняем метод init

          return methods.init.apply(this, arguments);
        } else {
          // если ничего не получилось
          $.error('Метод "' + method + '" не найден в плагине jQuery.rangeSlider');
        }
      });
    },
  });
})(jQuery);
