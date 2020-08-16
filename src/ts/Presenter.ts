import View from './View';
import Model from './Model';
import { IModel, IsettingsTypes } from './globals';

export default class Presenter {
  view: any;
  model: IModel;
  settings: IsettingsTypes;
  constructor(settings: IsettingsTypes, $this: HTMLElement) {
    this.settings = settings;
    this.view = new View($this, settings);
    this.model = new Model(settings);
    this.addObserversInView(settings);
    this.addObserversInModel(settings);
    this.settings = settings;
    this.view.viewChangedSubject.notifyObservers();
    this.model.modelChangedSubject.notifyObservers();
  }
  private addObserversInView(settings: IsettingsTypes) {
    const flag = this.view.type.flag.el;
    const track = this.view.type.track.el;
    this.view.viewChangedSubject.addObservers(() => {
      const currentValue = this.model.bank.currentValue;

      track.dataset.currentVal = currentValue;
      if (settings.type === 'single' || settings.type === 'single-vertical') {
        flag.innerHTML = currentValue;
      } else if (settings.type === 'double' || settings.type === 'double-vertical') {
        const secondFlag = this.view.type.secondFlag.el;

        flag.innerHTML = this.model.bank.currentValue;

        secondFlag.innerHTML = this.model.bank.currentValueSecond;
      }
    });
  }
  private addObserversInModel(settings: IsettingsTypes) {
    if (settings.type === 'single') {
      this.model.modelChangedSubject.addObservers(() => {
        this.changeSingleValue('width', 'left');
      });
    } else if (settings.type === 'double') {
      this.model.modelChangedSubject.addObservers(() => {
        this.changeDoubleValue('width', 'left');
      });
    } else if (settings.type === 'single-vertical') {
      this.model.modelChangedSubject.addObservers(() => {
        this.changeSingleValue('height', 'top');
      });
    } else if (settings.type === 'double-vertical') {
      this.model.modelChangedSubject.addObservers(() => {
        this.changeDoubleValue('height', 'top');
      });
    }
  }
  private changeSingleValue(offset: string, pos: string) {
    let that = this;

    function changeVal() {
      that.view.viewChangedSubject.notifyObservers();
      that.model.bank.currentValue = that.settings.from;
      let generalVal = that.model.bank.generalValue;
      const step = that.settings.step;
      const trackSize = that.view.trackSize;
      const stepCount = generalVal / step;
      let stepSize = trackSize / stepCount;

      let thumbPos = that.view.thumbPos;

      that.model.bank.currentValue = that.model.setCurrentValue(thumbPos, stepSize, step);

      that.view.viewChangedSubject.notifyObservers();
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

  private changeDoubleValue(offset: string, pos: string) {
    let that = this;

    function changeVal() {
      that.view.modelChangedSubject.notifyObservers();

      let generalVal = that.model.bank.generalValue;
      const step = that.settings.step;
      const trackSize = that.view.trackSize;
      const stepCount = generalVal / step;
      let stepSize = trackSize / stepCount;
      let thumbPos = that.view.thumbPos;
      let thumbPosSecond = that.view.thumbPosSecond;
      that.model.bank.currentValue = that.model.setCurrentValue(thumbPos, stepSize, step);
      that.model.bank.currentValueSecond = that.model.setCurrentValue(
        thumbPosSecond,
        stepSize,
        step
      );

      that.view.modelChangedSubject.notifyObservers();
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
}
