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
      if (settings.type === 'single' || settings.type === 'single-vertical') {
        const from = this.model.bank.from;
        flag.innerHTML = from;
        track.dataset.from = from;
      } else if (settings.type === 'double' || settings.type === 'double-vertical') {
        const secondFlag = this.view.type.secondFlag.el;
        const from = this.model.bank.from;
        const to = this.model.bank.to;
        flag.innerHTML = from;

        track.dataset.from = from;
        track.dataset.to = to;

        secondFlag.innerHTML = to;
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
      that.model.bank.from = that.settings.from;
      let generalVal = that.model.bank.generalValue;
      const step = that.settings.step;
      const trackSize = that.view.trackSize;
      const stepCount = generalVal / step;
      let stepSize = trackSize / stepCount;

      let thumbPos = that.view.thumbPos;

      that.model.bank.from = that.model.setCurrentValue(thumbPos, stepSize, step);

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
      that.view.viewChangedSubject.notifyObservers();

      let generalVal = that.model.bank.generalValue;
      const step = that.settings.step;
      const trackSize = that.view.trackSize;
      const stepCount = generalVal / step;
      let stepSize = trackSize / stepCount;
      let thumbPos = that.view.thumbPos;
      let thumbPosSecond = that.view.thumbPosSecond;
      that.model.bank.from = that.model.setCurrentValue(thumbPos, stepSize, step);
      that.model.bank.to = that.model.setCurrentValue(thumbPosSecond, stepSize, step);

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
}
