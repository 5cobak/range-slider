import MakeObservableSubject from '../Observer/Observer';
import { IModel, ISettingsTypes, IObserver, IBankModel } from '../Interfaces/globals';

export default class Model implements IModel {
  settings!: ISettingsTypes;

  modelChangedSubject!: IObserver;

  bank!: IBankModel;

  // constructor access settings from user or default settings
  constructor(settings: ISettingsTypes) {
    this.init(settings);
  }

  // method for calculate general value
  private setGeneralValue(settings: ISettingsTypes) {
    let generalVal = settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;

    if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);

    this.bank.generalValue = generalVal;
    this.modelChangedSubject.notifyObservers();
  }

  // method for calculate model.bank.from or model.bank.to
  // first argument is positon to or from which come from view at the presenter
  // second argument step size of track
  // currentVal is string which point us which position to return: from or to
  public setCurrentVal(pos: number, stepSize: number, step: number, currentVal: string): void {
    let val = Number(this.settings.min) + (Math.round(pos / stepSize) * (step * 10)) / 10;

    if (val > this.settings.max) val = this.settings.max;

    this.bank[currentVal] = parseFloat(val.toFixed(10));
  }

  // method for validate settings which come from user or default
  private isFromBiggerThenTo() {
    return this.settings.type.match('double') && this.settings.from > (this.settings.to as number);
  }

  private isMaxNegativeAndLessThenMin() {
    return this.settings.max < this.settings.min && this.settings.max < 0;
  }

  private isMaxPositiveAndLessThenMin() {
    return this.settings.max < this.settings.min && this.settings.max > 0;
  }

  private validate() {
    const { from } = this.settings;
    const to = this.settings.to as number;

    if (this.isFromBiggerThenTo()) {
      this.settings.from = to;
      this.settings.to = from;
    }
    if (this.settings.max < this.settings.min) {
      const oldMax = this.settings.max;
      this.settings.max = this.settings.min;
      this.settings.min = oldMax;
    } else if (this.settings.max === this.settings.min) this.settings.max += this.settings.max;

    if (this.isMaxNegativeAndLessThenMin()) this.settings.max = -this.settings.max;

    if (this.isMaxPositiveAndLessThenMin()) this.settings.max += this.settings.min;

    if (this.settings.step < 0) this.settings.step = -this.settings.step;
    if (this.settings.step === 0) this.settings.step = 1;
    if (this.settings.from < this.settings.min) this.settings.from = this.settings.min;
    if (this.settings.from > this.settings.max) this.settings.from = this.settings.max;
    if (!this.settings.to) return;
    if (this.settings.to < this.settings.min) this.settings.to = this.settings.min;
    if (this.settings.to > this.settings.max) this.settings.to = this.settings.max;
  }

  private init(settings: ISettingsTypes) {
    this.settings = settings;
    // create observable subject for model
    this.modelChangedSubject = new MakeObservableSubject();
    // create storage for values
    this.bank = {
      generalValue: 0,
      from: this.settings.from,
      to: this.settings.to,
    };
    this.validate();
    // calculate and set general value of range-slider
    this.setGeneralValue(settings);
    // validate all settings from usder or default settings
  }
}
