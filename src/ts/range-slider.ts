/*	eslint no-param-reassign: "off"	*/
/// <reference path="globals.d.ts" />
/// <reference path="jquery.range-slider.d.ts" />
import View from './View';
import Model from './Model';

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
          from: 100,
          to: 900,
          flag: false,
        },
        options // custom options object
      );
      const view = new View($this, settings);
      const model = new Model(settings);
      class Presenter {
        view: any;
        model: IModel;
        constructor(settings: IsettingsTypes, view: any, model: IModel) {
          this.view = view;
          this.model = model;
          this.addObservers(settings);

          this.model.modelChangedSubject.notifyObservers();
        }
        private addObservers(settings: IsettingsTypes) {
          if (settings.type === 'single') {
            this.model.modelChangedSubject.addObservers(() => {
              this.changeSingleValue();
              this.view.type.flag.setPosition(settings);
            });
          } else if (settings.type === 'double') {
            this.model.modelChangedSubject.addObservers(() => {
              this.changeSingleValue();
              this.view.type.flag.setPosition(settings);
            });
          }
        }
        private changeSingleValue() {
          let that = this;

          function changeVal() {
            let thumbLeft = parseInt(getComputedStyle(that.view.type.thumb.el).left);
            let thumbHalfWidth = parseInt(getComputedStyle(that.view.type.thumb.el).width) / 2;
            let thumbPos: number = thumbLeft + thumbHalfWidth;
            let trackwidth: number = parseInt(getComputedStyle(that.view.type.track.el).width);
            let currentValPercent: number;
            let generalVal = that.model.type.getGeneralValue(settings);

            if (thumbLeft < thumbHalfWidth) {
              currentValPercent = that.model.type.setCurrentValue(Math.floor(thumbPos), trackwidth);
            } else {
              currentValPercent = that.model.type.setCurrentValue(Math.ceil(thumbPos), trackwidth);
            }

            that.view.type.flag.el.innerHTML = Math.floor((currentValPercent * generalVal) / 100);
          }
          changeVal();

          this.view.type.track.el.addEventListener('mousedown', (e: MouseEvent) => {
            changeVal();
            document.addEventListener('mousemove', changeVal);
            document.addEventListener('mouseup', () => {
              document.removeEventListener('mousemove', changeVal);
            });
          });
        }
        private changeDoubleVal() {
          let that = this;
        }
      }
      const presenter = new Presenter(settings, view, model);

      return this;
    },
  });
})(jQuery);
