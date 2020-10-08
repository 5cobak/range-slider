/* eslint-disable no-new */
/*	eslint no-param-reassign: "off"	*/
import Presenter from './Presenter';
import { IsettingsTypes, IMethods } from './globals';

(($) => {
  $.fn.extend({
    rangeSlider(method: string, options: IsettingsTypes) {
      const $this = this as HTMLElement;

      const settings: IsettingsTypes = $.extend(
        {
          // default options object
          // $el: this,
          type: 'single',
          min: 0,
          max: 1000,
          from: 0,
          to: 1000,
          flag: true,
          step: 1,
          scale: true,
        },
        method,
      ); // custom options object

      function setData(obj: IsettingsTypes) {
        const keys = Object.keys(obj);
        const values = Object.values(obj)

        for (let i = 0; i < keys.length; i += 1) {
          const attr: string | number | boolean = $($this).data(`${keys[i]}`);
          if (!attr) $($this).data(`${keys[i]}`, values[i]);
        }
      }

      let updatedOptions = settings;
      const methods: IMethods = {
        update: () => {
          const dataObj = $($this).data();

          updatedOptions = $.extend(dataObj, options);

          $(this).children().remove();
          new Presenter(updatedOptions, $this);
          setData(updatedOptions);
        },
        init: () => {
          new Presenter(updatedOptions, $this);
          setData(updatedOptions);
        },
      };

      // set data

      return $(this).each( (...args) => {
        if (methods[method]) {
          // если запрашиваемый метод существует, мы его вызываем
          // все параметры, кроме имени метода прийдут в метод
          // this так же перекочует в метод
          return methods[method].apply(this, Array.prototype.slice.call(args, 1) as []);
        } if (typeof method === 'object' || !method) {
          // если первым параметром идет объект, либо совсем пусто
          // выполняем метод init

          return methods.init.call(this);
        }
        // если ничего не получилось
        return $.error(`Метод "${method}" не найден в плагине jQuery.rangeSlider`);
      });
    },
  });
})(jQuery);
