import View from '../View/View';
import Model from '../Model/Model';
import { IFlag, IModel, ISettingsTypes, IView } from '../Interfaces/globals';

export default class Presenter {
  private view!: IView;

  model!: IModel;

  private isDouble!: RegExpMatchArray | null;

  // settings is options from user or from init slider
  constructor(settings: ISettingsTypes, element: HTMLElement) {
    this.init(settings, element);
  }

  // method for calculate from in model by using thumb position from view
  private changeSingleValue(settings: ISettingsTypes) {
    const { view, model } = this;

    const generalVal = model.bank.generalValue;
    const { step } = settings;
    const { trackSize } = view;
    const stepCount = generalVal / step;
    const stepSize = trackSize / stepCount;
    const thumbPosFrom = (view.positions.from / 100) * trackSize;
    const thumbPosPercentFrom = view.positions.from;
    model.setCurrentVal(thumbPosFrom, thumbPosPercentFrom, stepSize, step, 'from');
  }

  // method for calculate from and to in model by using thumbs position from view
  private changeDoubleValue(settings: ISettingsTypes) {
    const { view, model } = this;

    const generalVal = model.bank.generalValue;
    const { step } = settings;
    const { trackSize } = view;
    const stepCount = generalVal / step;
    const stepSize = trackSize / stepCount;
    const thumbPosFrom = (view.positions.from / 100) * trackSize;
    const thumbPosTo = (view.positions.to / 100) * trackSize;
    const thumbPosPercentFrom = view.positions.from;
    const thumbPosPercentTo = view.positions.to;
    // set value in model.bank.from, which will be used in view's observer above
    model.setCurrentVal(thumbPosFrom, thumbPosPercentFrom, stepSize, step, 'from');
    // set value in model.bank.to, which will be used in view's observer above
    model.setCurrentVal(thumbPosTo, thumbPosPercentTo, stepSize, step, 'to');
  }

  private init(settings: ISettingsTypes, element: HTMLElement) {
    // this property help us to know which type slider was used
    this.isDouble = settings.type.match('double');
    // init model
    this.model = new Model(settings);
    // init view
    // give to view settings from model, because model validate this and return right settings
    // give to view general value which was calculated and will be used in view
    this.view = new View(element, this.model.settings, this.model.bank.generalValue);
    // add observer to view
    // set current values for to and from for data set and flags
    this.view.changedSubject.addObservers(() => {
      const flag = this.view.type.flag.el;
      const { parent } = this.view.type;
      // notify model and model calculate current vals for from and to
      this.model.modelChangedSubject.notifyObservers();
      if (!this.isDouble) {
        const { from } = this.model.bank;
        // set model.bank.from from model.bank to dataset and flag
        flag.innerHTML = `${from}`;
        // set dataset for help us at bundle with panel
        parent.dataset.from = `${from}`;
      } else {
        const { from, to } = this.model.bank;
        // set model.bank.from and model.bank.to to dataset and flags
        parent.dataset.from = `${from}`;
        parent.dataset.to = `${to}`;

        const secondFlag = (this.view.type.secondFlag as IFlag).el;
        flag.innerHTML = `${from}`;
        secondFlag.innerHTML = `${to}`;
      }
    });
    // add observer to model where we'll calculate from and to
    this.model.modelChangedSubject.addObservers(() => {
      if (this.isDouble) this.changeDoubleValue(settings);
      else this.changeSingleValue(settings);
    });

    this.changeSingleValue(settings);
    this.view.changedSubject.notifyObservers();
  }
}
