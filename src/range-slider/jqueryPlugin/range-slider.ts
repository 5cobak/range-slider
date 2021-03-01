import Presenter from '../Presenter/Presenter';
import { ISettingsTypes, IMethods } from '../Interfaces/globals';

(($) => {
  $.fn.extend({
    rangeSlider(options: ISettingsTypes, method: string) {
      // get html element which was used by user
      const htmlEl = $(this)[0] as HTMLElement;

      // get jQuery object
      const $object = $(this);
      // set default options for range-slider and extend them by user's options
      const settings: ISettingsTypes = $.extend(
        // default options object
        {
          el: htmlEl,
          type: 'single-horizontal',
          min: 0,
          max: 1000,
          from: 0,
          to: 1000,
          flag: true,
          step: 1,
          scale: true,
        },
        // custom options object
        options
      );

      // function for set data in jquery data object, data is options used by user
      function setData(obj: ISettingsTypes) {
        const keys = Object.keys(obj);
        const values = Object.values(obj);

        for (let i = 0; i < keys.length; i += 1) {
          const attr = $($object).data(`${keys[i]}`);
          if (!attr) $($object).data(keys[i], values[i]);
        }
      }

      let updatedOptions = settings;

      // set init and update methods for plugin, which user can use, we use this methods at the bundle with panel
      const methods: IMethods = {
        update: () => {
          const dataObj = $($object).data();

          updatedOptions = $.extend(dataObj, options);

          $(this).children().remove();
          const presenter = new Presenter(updatedOptions, settings.el);
          setData(presenter.model.settings);
        },
        init: () => {
          const presenter = new Presenter(updatedOptions, settings.el);
          setData(presenter.model.settings);
        },
      };

      // default return for each slider
      return $(this).each((...args) => {
        if (methods[method]) {
          // если запрашиваемый метод существует, мы его вызываем
          // все параметры, кроме имени метода придут в метод
          // this так же перекочует в метод
          return methods[method].apply(this, Array.prototype.slice.call(args, 1) as []);
        }
        if (typeof method === 'object' || !method) {
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
