import ModelSingle from './ModelSingle';
import ModelDouble from './modelDouble';
import ModelDoubleVertical from './modelDoubleVertical';
import MsodelSingleVertical from './modelSingleVertical';
import MakeObservableSubject from './Observer';
import { IModel, IsettingsTypes, ISubModel, IObserver, IBankModel } from './globals';

export default class Model implements IModel {
  settings: IsettingsTypes;
  type: ISubModel;
  modelChangedSubject: IObserver;
  bank: IBankModel;
  constructor(settings: IsettingsTypes) {
    this.settings = settings;
    this.type = this.chooseModelType(settings);
    this.modelChangedSubject = new MakeObservableSubject();
    this.bank = {
      generalValue: 0,
    };
    this.bank.fromValue = this.settings.from ? this.settings.from : this.settings.min;
    this.bank.toValue = this.settings.to ? this.settings.to : this.settings.max;
    this.bank.generalValue = this.getGeneralValue(settings, settings.step);
    this.validateStep(settings);
  }
  private chooseModelType(settings: IsettingsTypes) {
    let type: ISubModel;
    if (settings.type === 'single') {
      return (type = new ModelSingle(settings));
    } else if (settings.type === 'double') {
      return (type = new ModelDouble(settings));
    } else if (settings.type === 'double-vertical') {
      return (type = new ModelDoubleVertical(settings));
    } else return (type = new MsodelSingleVertical(settings));
  }
  private getGeneralValue(settings: IsettingsTypes, step: number) {
    let generalVal =
      settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;
    if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);
    return generalVal;
  }

  setCurrentValue(pos: number, stepSize: number, step: number) {
    if (this.settings.min > 0 && this.settings.min < step) step = this.settings.min;
    else if (this.settings.min < 0 && this.settings.min < step) step = -this.settings.min;
    let currentVal = +this.settings.min + (Math.round(pos / stepSize) * (step * 10)) / 10;

    if (currentVal > this.settings.max) currentVal = this.settings.max;
    return currentVal;
  }
  private validateStep(settings: IsettingsTypes) {
    if (settings.step < 0) {
      throw new Error('slider step must be more than 0');
    }
  }
}
