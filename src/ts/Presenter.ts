import View from './View';
import Model from './Model';
import { IModel, IsettingsTypes, IView } from './globals';

export default class Presenter {
  view: IView;

  model: IModel;

  settings: IsettingsTypes;

  constructor(settings: IsettingsTypes, $this: HTMLElement) {
    this.settings = settings;
    this.model = new Model(settings);
    this.view = new View($this, settings, this.model.bank.generalValue);
    this.addObserversInView(settings);
    this.addObserversInModel(settings);
    this.settings = settings;
    this.model.modelChangedSubject.notifyObservers();
    this.view.viewChangedSubject.notifyObservers();
  }

  private addObserversInView(settings: IsettingsTypes) {
    const flag = this.view.type.flag.el;
    const track = this.view.type.track.el;

    this.view.viewChangedSubject.addObservers(() => {
      if (settings.type === 'single' || settings.type === 'single-vertical') {
        const from = this.model.bank.from;
        flag.innerHTML = `${from}`;
        track.dataset.from = `${from}`;
      } else if (settings.type === 'double' || settings.type === 'double-vertical') {
        if (!this.view.type.secondFlag) return;
        const secondFlag = this.view.type.secondFlag.el;
        const from = this.model.bank.from;
        const to = this.model.bank.to;
        flag.innerHTML = `${from}`;

        track.dataset.from = `${from}`;
        track.dataset.to = `${to}`;

        secondFlag.innerHTML = `${to}`;
      }
    });
  }

  private addObserversInModel(settings: IsettingsTypes) {
    if (settings.type === 'single') {
      this.model.modelChangedSubject.addObservers(() => {
        this.changeSingleValue(settings);
      });
    } else if (settings.type === 'double') {
      this.model.modelChangedSubject.addObservers(() => {
        this.changeDoubleValue(settings);
      });
    } else if (settings.type === 'single-vertical') {
      this.model.modelChangedSubject.addObservers(() => {
        this.changeSingleValue(settings);
      });
    } else if (settings.type === 'double-vertical') {
      this.model.modelChangedSubject.addObservers(() => {
        this.changeDoubleValue(settings);
      });
    }
  }

  private changeSingleValue(settings: IsettingsTypes) {
    const view = this.view;
    const model = this.model;

    function changeVal() {
      view.viewChangedSubject.notifyObservers();
      model.bank.from = settings.from;
      const generalVal = model.bank.generalValue;
      const step = settings.step;
      const trackSize = view.trackSize;
      const stepCount = generalVal / step;
      const stepSize = trackSize / stepCount;

      const thumbPos = view.thumbPos;

      model.bank.from = model.setCurrentValue(thumbPos, stepSize, step);

      view.viewChangedSubject.notifyObservers();
    }
    changeVal();

    function onMove() {
      changeVal();
      document.addEventListener('mousemove', changeVal);
      function onMouseUp() {
        document.removeEventListener('mousemove', changeVal);
      }

      document.addEventListener('mouseup', onMouseUp)
    }

    this.view.type.track.el.addEventListener('mousedown', onMove);
  }

  private changeDoubleValue(settings: IsettingsTypes) {
    const view = this.view;
    const model = this.model;

    function changeVal() {
      view.viewChangedSubject.notifyObservers();

      const generalVal = model.bank.generalValue;
      const step = settings.step;
      const trackSize = view.trackSize;
      const stepCount = generalVal / step;
      const stepSize = trackSize / stepCount;
      const thumbPos = view.thumbPos;
      const thumbPosSecond = view.thumbPosSecond;
      model.bank.from = model.setCurrentValue(thumbPos, stepSize, step);
      model.bank.to = model.setCurrentValue(thumbPosSecond, stepSize, step);

      view.viewChangedSubject.notifyObservers();
    }
    changeVal();

    function onMove() {
      changeVal();
      document.addEventListener('mousemove', changeVal);
      function onMouseUp() {
        document.removeEventListener('mousemove', changeVal);
      }

      document.addEventListener('mouseup', onMouseUp)
    }

    this.view.type.track.el.addEventListener('mousedown', onMove);
  }
}
