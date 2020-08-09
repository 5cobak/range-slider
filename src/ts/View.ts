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
      ? parseFloat(getComputedStyle(this.type.thumb.el).height)
      : parseFloat(getComputedStyle(this.type.thumb.el).width);

    this.trackSize = settings.type.match('vertical')
      ? parseFloat(getComputedStyle(this.type.track.el).height) -
        parseFloat(getComputedStyle(this.type.thumb.el).height)
      : parseFloat(getComputedStyle(this.type.track.el).width) -
        parseFloat(getComputedStyle(this.type.thumb.el).width);

    this.modelChangedSubject = new MakeObservableSubject();

    this.modelChangedSubject.addObservers(() => {
      const coord = this.settings.type.match('vertical') ? 'top' : 'left';

      this.setThumbPos(settings);
      this.setSecondThumbPos(settings);
      this.type.thumb.el.style[coord] = `${this.thumbPos}px`;
      if (this.type.secondThumb) this.type.secondThumb.el.style[coord] = `${this.thumbPosSecond}px`;
    });
    this.modelChangedSubject.notifyObservers();
  }

  setThumbPos(settings: IsettingsTypes) {
    const coord = this.settings.type.match('vertical') ? 'top' : 'left';
    this.thumbPos = parseFloat(getComputedStyle(this.type.thumb.el)[coord]);
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
    const coord = this.settings.type.match('vertical') ? 'top' : 'left';

    if (this.type.secondThumb) {
      this.thumbPosSecond = parseFloat(getComputedStyle(this.type.secondThumb.el)[coord]);
    }
  }
}
