import View from './View';
import Model from './Model';
import { IFlag, IModel, IsettingsTypes, IView } from './globals';

export default class Presenter {
  view: IView;

  model: IModel;

  settings: IsettingsTypes;

  isDouble: RegExpMatchArray | null;

  constructor(settings: IsettingsTypes, $this: HTMLElement) {
    this.settings = settings;
    this.isDouble = settings.type.match('double');
    this.model = new Model(settings);
    this.view = new View($this, settings, this.model.bank.generalValue);

    this.view.changedSubject.addObservers(() => {
      const flag = this.view.type.flag.el;
      const track = this.view.type.track.el;

      this.model.modelChangedSubject.notifyObservers();
      if (!this.isDouble) {
        const from = this.model.bank.from;
        flag.innerHTML = `${from}`;
        track.dataset.from = `${from}`;
      } else {
        const from = this.model.bank.from;
        const to = this.model.bank.to;

        track.dataset.from = `${from}`;
        track.dataset.to = `${to}`;

        const secondFlag = (this.view.type.secondFlag as IFlag).el;
        flag.innerHTML = `${from}`;
        secondFlag.innerHTML = `${to}`;
      }
    });

    this.model.modelChangedSubject.addObservers(() => {
      if (this.isDouble) this.changeDoubleValue(settings)
      else this.changeSingleValue(settings);
    });

    this.changeSingleValue(settings);
    this.view.changedSubject.notifyObservers();
  }

  private changeSingleValue(settings: IsettingsTypes) {
    const view = this.view;
    const model = this.model;
    function changeVal() {
      const generalVal = model.bank.generalValue;
      const step = settings.step;
      const trackSize = view.trackSize;
      const stepCount = generalVal / step;
      const stepSize = trackSize / stepCount;
      const thumbPosFrom = view.positions.from;

      model.setCurrentVal(thumbPosFrom, stepSize, step, 'from');
    }
    changeVal();
  }

  private changeDoubleValue(settings: IsettingsTypes) {
    const view = this.view;
    const model = this.model;

    function changeVal() {
      const generalVal = model.bank.generalValue;
      const step = settings.step;
      const trackSize = view.trackSize;
      const stepCount = generalVal / step;
      const stepSize = trackSize / stepCount;
      const thumbPosFrom = view.positions.from;
      const thumbPosTo = view.positions.to;

      model.setCurrentVal(thumbPosFrom, stepSize, step, 'from');
      model.setCurrentVal(thumbPosTo, stepSize, step, 'to');
    }
    changeVal();
  }
}
