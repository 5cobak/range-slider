import MakeObservableSubject from './Observer';
import { IModel, IsettingsTypes, IObserver, IBankModel } from './globals';

export default class Model implements IModel {
  settings: IsettingsTypes;

  modelChangedSubject: IObserver;

  bank: IBankModel;

  constructor(settings: IsettingsTypes) {
    this.settings = settings;
    this.modelChangedSubject = new MakeObservableSubject();
    this.bank = {
      generalValue: 0,
      from: this.settings.from,
      to: this.settings.to,
    };
    this.setGeneralValue(settings);
    this.validate();
  }

  private setGeneralValue(settings: IsettingsTypes) {
    let generalVal =
      settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;

    if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);

    this.bank.generalValue = generalVal;
    this.modelChangedSubject.notifyObservers();
  }

  public setCurrentVal(pos: number, stepSize: number, step: number, currentVal: string): void {
    let val = +this.settings.min + (Math.round(pos / stepSize) * (step * 10)) / 10;

    if (val > this.settings.max) val = this.settings.max;

    this.bank[currentVal] = val;
  }

  private validate() {
    if (this.settings.from < this.settings.min) this.settings.from = this.settings.min;
    if (this.settings.from > this.settings.max) this.settings.from = this.settings.max;
    if (!this.settings.to) return;
    if (this.settings.to < this.settings.min) this.settings.to = this.settings.min;
    if (this.settings.to > this.settings.max) this.settings.to = this.settings.max;
  }
}
