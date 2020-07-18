// ---------------------------------------   VIEW --------------------------------------------
import ViewSingle from './ViewSingle';
import ViewDouble from './ViewDouble';
import ViewDoubleVertical from './ViewDoubleVertical';
import ViewSingleVertical from './ViewSingleVertical';
// ---------------------------------------   VIEW main --------------------------------------------
export default class View {
  settings: IsettingsTypes;
  el: HTMLElement;
  type: object;
  constructor(element: HTMLElement, settings: IsettingsTypes) {
    this.el = element;
    this.settings = settings;
    this.type = this.chooseViewType(settings);
  }
  chooseViewType(settings: IsettingsTypes) {
    let _modelType: object;
    if (settings.type === 'single') {
      return (_modelType = new ViewSingle(this.el, this.settings));
    } else if (settings.type === 'double') {
      return (_modelType = new ViewDouble(this.el, this.settings));
    } else if (settings.type === 'double-vertical') {
      return (_modelType = new ViewDoubleVertical(this.el, this.settings));
    } else return (_modelType = new ViewSingleVertical(this.el, this.settings));
  }
}
