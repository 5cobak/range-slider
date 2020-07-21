export default class ModelSingle implements ISubModel {
  settings: IsettingsTypes;
  bank!: IBank;
  constructor(settings: IsettingsTypes) {
    this.settings = settings;
    this.bank = {};
    this.setStep(settings);
  }
  setValue(position: number, trackWidth: number) {
    return (position / trackWidth) * 100;
  }
  getGeneralValue(settings: IsettingsTypes) {
    if (settings.min < 0) {
      let generalValue = -settings.min + settings.max;
      return generalValue;
    } else {
      let generalValue = settings.max;
      return generalValue;
    }
  }
  setStep(settings: IsettingsTypes) {
    if (settings.step < 0) {
      throw new Error('slider step must be more than 0');
    }
  }
}
