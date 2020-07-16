class Model {
  settings: IsettingsTypes;
  modelType?: object;
  constructor(settings: IsettingsTypes) {
    this.settings = settings;
    this.modelType = this.chooseModelType(settings);
  }
  chooseModelType(settings: IsettingsTypes) {
    let modelType: object;
    if (settings.type === 'single') {
      return (modelType = new ModelSingle());
    } else if (settings.type === 'double') {
      return (modelType = new modelDouble());
    } else if (settings.type === 'double-vertical') {
      return (modelType = new modelDoubleVertical());
    } else return (modelType = new modelSingleVertical());
  }
}
