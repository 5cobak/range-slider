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
        settings: IsettingsTypes;
        constructor(settings: IsettingsTypes, view: any, model: IModel) {
          this.view = view;
          this.model = model;
          this.addObservers(settings);
          this.settings = settings;
          this.model.modelChangedSubject.notifyObservers();
        }
        private addObservers(settings: IsettingsTypes) {
          if (settings.type === 'single') {
            this.model.modelChangedSubject.addObservers(() => {
              this.changeSingleValueX();
              this.view.type.flag.setPosition(settings);
            });
          } else if (settings.type === 'double') {
            this.model.modelChangedSubject.addObservers(() => {
              this.changeDoubleValX();
              this.view.type.flag.setPosition(settings);
              this.view.type.secondFlag.setPosition(settings);
            });
          } else if (settings.type === 'single-vertical') {
            this.model.modelChangedSubject.addObservers(() => {
              this.changeSingleValueY();
              this.view.type.flag.setPosition(settings);
            });
          } else if (settings.type === 'double-vertical') {
            this.model.modelChangedSubject.addObservers(() => {
              this.changeDoubleValY();
              this.view.type.flag.setPosition(settings);
            });
          }
        }
        private changeSingleValueX() {
          let that = this;

          function changeVal() {
            let thumbLeft = parseInt(getComputedStyle(that.view.type.thumb.el).left);
            let widthThumb = parseInt(getComputedStyle(that.view.type.thumb.el).width);
            let thumbPos: number = thumbLeft;
            let trackwidth: number = parseInt(getComputedStyle(that.view.type.track.el).width);
            let currentValPercent: number;
            let generalVal = that.model.type.getGeneralValue(settings);
            if (thumbLeft < trackwidth - widthThumb) {
              currentValPercent = that.model.type.setValue(
                Math.floor(thumbPos),
                trackwidth - widthThumb
              );
            } else {
              currentValPercent = that.model.type.setValue(
                Math.ceil(thumbPos),
                trackwidth - widthThumb
              );
            }
            that.view.type.flag.setPosition(settings);
            that.view.type.flag.el.innerHTML =
              settings.min + Math.floor((currentValPercent * generalVal) / 100);
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
        private changeSingleValueY() {
          let that = this;

          function changeVal() {
            let thumbTop = parseInt(getComputedStyle(that.view.type.thumb.el).top);
            let heightThumb = parseInt(getComputedStyle(that.view.type.thumb.el).height);
            let thumbPos: number = thumbTop;
            let trackHeight: number = parseInt(getComputedStyle(that.view.type.track.el).height);
            let currentValPercent: number;
            let generalVal = that.model.type.getGeneralValue(settings);
            if (thumbTop < trackHeight - heightThumb) {
              currentValPercent = that.model.type.setValue(
                Math.floor(thumbPos),
                trackHeight - heightThumb
              );
            } else {
              currentValPercent = that.model.type.setValue(
                Math.ceil(thumbPos),
                trackHeight - heightThumb
              );
            }
            that.view.type.flag.setPosition(that.settings);
            that.view.type.flag.el.innerHTML =
              settings.min + Math.floor((currentValPercent * generalVal) / 100);
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
        private changeDoubleValX() {
          let that = this;

          function changeVal() {
            let thumbFirstLeft = parseInt(getComputedStyle(that.view.type.thumb.el).left);
            let thumbSecondLeft = parseInt(getComputedStyle(that.view.type.secondThumb.el).left);
            let thumbHalfWidth = parseInt(getComputedStyle(that.view.type.thumb.el).width) / 2;
            let widthThumb = parseInt(getComputedStyle(that.view.type.thumb.el).width);
            let thumbFirstPos: number = thumbFirstLeft + thumbHalfWidth;
            let thumbSecondPos: number = thumbSecondLeft + thumbHalfWidth;
            let trackwidth: number = parseInt(getComputedStyle(that.view.type.track.el).width);
            let valFirstPercent: number;
            let valSecondPercent: number;
            let generalVal = that.model.type.getGeneralValue(settings);

            if (thumbFirstLeft < trackwidth - widthThumb) {
              valFirstPercent = that.model.type.setValue(Math.floor(thumbFirstPos), trackwidth);
            } else {
              valFirstPercent = that.model.type.setValue(Math.ceil(thumbFirstPos), trackwidth);
            }

            if (thumbSecondLeft < trackwidth - widthThumb) {
              valSecondPercent = that.model.type.setValue(Math.floor(thumbSecondPos), trackwidth);
            } else {
              valSecondPercent = that.model.type.setValue(Math.ceil(thumbSecondPos), trackwidth);
            }

            that.view.type.flag.el.innerHTML =
              settings.min + Math.floor((valFirstPercent * generalVal) / 100);

            that.view.type.secondFlag.el.innerHTML =
              settings.min + Math.floor((valSecondPercent * generalVal) / 100);

            that.view.type.flag.setPosition(that.settings);
            that.view.type.secondFlag.setPosition(that.settings);
          }
          changeVal();

          this.view.type.track.el.addEventListener('mousedown', () => {
            changeVal();
            document.addEventListener('mousemove', changeVal);
            document.addEventListener('mouseup', () => {
              document.removeEventListener('mousemove', changeVal);
            });
          });
        }
        private changeDoubleValY() {
          let that = this;

          function changeVal() {
            let thumbFirstTop = parseInt(getComputedStyle(that.view.type.thumb.el).top);
            let thumbSecondLeft = parseInt(getComputedStyle(that.view.type.secondThumb.el).top);
            let thumbHalfHeight = parseInt(getComputedStyle(that.view.type.thumb.el).height) / 2;
            let heightThumb = parseInt(getComputedStyle(that.view.type.thumb.el).height);
            let thumbFirstPos: number = thumbFirstTop + thumbHalfHeight;
            let thumbSecondPos: number = thumbSecondLeft + thumbHalfHeight;
            let trackHeight: number = parseInt(getComputedStyle(that.view.type.track.el).height);
            let valFirstPercent: number;
            let valSecondPercent: number;
            let generalVal = that.model.type.getGeneralValue(settings);

            if (thumbFirstTop < trackHeight - heightThumb) {
              valFirstPercent = that.model.type.setValue(Math.floor(thumbFirstPos), trackHeight);
            } else {
              valFirstPercent = that.model.type.setValue(Math.ceil(thumbFirstPos), trackHeight);
            }

            if (thumbSecondLeft < trackHeight - heightThumb) {
              valSecondPercent = that.model.type.setValue(Math.floor(thumbSecondPos), trackHeight);
            } else {
              valSecondPercent = that.model.type.setValue(Math.ceil(thumbSecondPos), trackHeight);
            }

            that.view.type.flag.el.innerHTML =
              settings.min + Math.floor((valFirstPercent * generalVal) / 100);

            that.view.type.secondFlag.el.innerHTML =
              settings.min + Math.floor((valSecondPercent * generalVal) / 100);

            that.view.type.flag.setPosition(that.settings);
            that.view.type.secondFlag.setPosition(that.settings);
          }
          changeVal();

          this.view.type.track.el.addEventListener('mousedown', () => {
            changeVal();
            document.addEventListener('mousemove', changeVal);
            document.addEventListener('mouseup', () => {
              document.removeEventListener('mousemove', changeVal);
            });
          });
        }
      }
      const presenter = new Presenter(settings, view, model);

      return this;
    },
  });
})(jQuery);
