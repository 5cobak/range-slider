import ModelSingle from './ModelSingle';
import ModelDouble from './modelDouble';
import ModelDoubleVertical from './modelDoubleVertical';
import MsodelSingleVertical from './modelSingleVertical';
import MakeObservableSubject from './Observer';

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
    let generalValue;
    generalValue = settings.max - settings.min;
    if ((generalValue % (step * 10)) / 10) generalValue -= (generalValue % (step * 10)) / 10;
    return generalValue;
  }
  setCurrentValue(pos: number, stepSize: number, step: number) {
    const currentVal = this.settings.min + (Math.round(pos / stepSize) * (step * 10)) / 10;
    return currentVal;
  }
  private validateStep(settings: IsettingsTypes) {
    if (settings.step < 0) {
      throw new Error('slider step must be more than 0');
    }
  }
}
