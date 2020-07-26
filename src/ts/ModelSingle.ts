import { numberLiteralTypeAnnotation } from '@babel/types';

export default class ModelSingle implements ISubModel {
  settings: IsettingsTypes;
  constructor(settings: IsettingsTypes) {
    this.settings = settings;
  }
}
