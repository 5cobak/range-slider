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
  thumbPos: number;
  trackSize: number;
  thumbPosSecond?: number;
  constructor(element: HTMLElement, settings: IsettingsTypes) {
    this.el = element;
    this.settings = settings;
    this.type = this.chooseViewType(settings);
    this.modelChangedSubject = new MakeObservableSubject();
    this.thumbSize = settings.type.match('vertical')
    ? parseInt(getComputedStyle(this.type.thumb.el).height)
    : parseInt(getComputedStyle(this.type.thumb.el).width);
    this.trackSize = settings.type.match('vertical')
        ? parseInt(getComputedStyle(this.type.track.el).height) - parseInt(getComputedStyle(this.type.thumb.el).height)
        : parseInt(getComputedStyle(this.type.track.el).width) - parseInt(getComputedStyle(this.type.thumb.el).width);
    this.thumbPosSecond: setSecondThumbPos(settings),
    this.thumbPos: 
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
    if (settings.type === 'double-vertical') {
      return parseInt(getComputedStyle(this.type.secondThumb.el).top);
    } else return parseInt(getComputedStyle(this.type.secondThumb.el).left);
  }
}
