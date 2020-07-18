export default class ModelDouble implements ISubModel {
  settings: IsettingsTypes;
  bank!: IBank;
  constructor(settings: IsettingsTypes) {
    this.settings = settings;
    this.bank = {};
  }
  setCurrentValue(position: number, trackWidth: number) {
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
}