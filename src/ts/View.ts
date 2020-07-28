// ---------------------------------------   VIEW --------------------------------------------
import ViewSingle from './ViewSingle';
import ViewDouble from './ViewDouble';
import ViewDoubleVertical from './ViewDoubleVertical';
import ViewSingleVertical from './ViewSingleVertical';
import MakeObservableSubject from './Observer';
import { parse } from '@babel/core';
// ---------------------------------------   VIEW main --------------------------------------------
export default class View implements IView {
  settings: IsettingsTypes;
  el: HTMLElement;
  type: ISubView;
  modelChangedSubject: IObserver;
  thumbSize: number;
  thumbPos!: number;
  trackSize: number;
  thumbPosSecond!: number;
  constructor(element: HTMLElement, settings: IsettingsTypes) {
    this.el = element;
    this.settings = settings;
    this.type = this.chooseViewType(settings);

    this.thumbSize = settings.type.match('vertical')
      ? parseInt(getComputedStyle(this.type.thumb.el).height)
      : parseInt(getComputedStyle(this.type.thumb.el).width);

    this.trackSize = settings.type.match('vertical')
      ? parseInt(getComputedStyle(this.type.track.el).height) - parseInt(getComputedStyle(this.type.thumb.el).height)
      : parseInt(getComputedStyle(this.type.track.el).width) - parseInt(getComputedStyle(this.type.thumb.el).width);

    this.modelChangedSubject = new MakeObservableSubject();

    this.modelChangedSubject.addObservers(() => {
      this.setThumbPos(settings);
    });
    this.modelChangedSubject.notifyObservers();
  }
  setThumbPos(settings: IsettingsTypes) {
    this.thumbPos = settings.type.match('vertical')
      ? parseInt(getComputedStyle(this.type.thumb.el).top)
      : parseInt(getComputedStyle(this.type.thumb.el).left);
    this.setSecondThumbPos(settings);
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
  setSecondThumbPos(settings: IsettingsTypes) {
    if (settings.type === 'double-vertical' && this.type.secondThumb) {
      this.thumbPosSecond = parseInt(getComputedStyle(this.type.secondThumb.el).top);
    } else if (settings.type === 'double' && this.type.secondThumb) {
      this.thumbPosSecond = parseInt(getComputedStyle(this.type.secondThumb.el).left);
    }
  }
}
