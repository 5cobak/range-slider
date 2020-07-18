import ModelSingle from './ModelSingle';
import modelDouble from './modelDouble';
import modelDoubleVertical from './modelDoubleVertical';
import modelSingleVertical from './modelSingleVertical';
import MakeObservableSubject from './Observer';

export default class Model implements IModel {
  settings: IsettingsTypes;
  type: ISubModel;
  modelChangedSubject: IObserver;
  constructor(settings: IsettingsTypes) {
    this.settings = settings;
    this.type = this.chooseModelType(settings);
    this.modelChangedSubject = new MakeObservableSubject();
  }
  chooseModelType(settings: IsettingsTypes) {
    let type: ISubModel;
    if (settings.type === 'single') {
      return (type = new ModelSingle(settings));
    } else if (settings.type === 'double') {
      return (type = new modelDouble());
    } else if (settings.type === 'double-vertical') {
      return (type = new modelDoubleVertical());
    } else return (type = new modelSingleVertical());
  }
}
