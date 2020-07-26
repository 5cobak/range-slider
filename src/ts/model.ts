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
    this.bank = {};
    this.bank.generalValue = this.getGeneralValue(settings);
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
  private getGeneralValue(settings: IsettingsTypes) {
    if (settings.min < 0) {
      let generalValue = -settings.min + settings.max;
      return generalValue;
    } else {
      let generalValue = settings.max;
      return generalValue;
    }
  }
  setCurrentValue(pos: number, stepSize: number, step: number) {
    return Math.round(pos / stepSize) * step;
  }
  private validateStep(settings: IsettingsTypes) {
    if (settings.step < 0) {
      throw new Error('slider step must be more than 0');
    }
  }
}
