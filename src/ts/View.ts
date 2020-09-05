import ViewSingle from './ViewSingle';
import ViewDouble from './ViewDouble';
import ViewDoubleVertical from './ViewDoubleVertical';
import ViewSingleVertical from './ViewSingleVertical';
import MakeObservableSubject from './Observer';
import { IView, IsettingsTypes, ISubView, IObserver } from './globals';
// ---------------------------------------   VIEW main --------------------------------------------
export default class View implements IView {
  settings: IsettingsTypes;

  el: HTMLElement;

  type: ISubView;

  viewChangedSubject: IObserver;

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

    this.viewChangedSubject = new MakeObservableSubject();

    this.viewChangedSubject.addObservers(() => {
      const coord = this.settings.type.match('vertical') ? 'top' : 'left';

      this.setThumbPos();
      this.setSecondThumbPos();
      this.type.thumb.el.style[coord] = `${this.thumbPos}px`;

      if (this.type.secondThumb) this.type.secondThumb.el.style[coord] = `${this.thumbPosSecond}px`;
    });
    this.viewChangedSubject.notifyObservers();
  }

  setThumbPos(): void {
    const coord = this.settings.type.match('vertical') ? 'top' : 'left';
    this.thumbPos = parseFloat(getComputedStyle(this.type.thumb.el)[coord]);
  }

  chooseViewType(settings: IsettingsTypes): ISubView {
    let modelType: ISubView;
    if (settings.type === 'single') {
      modelType = new ViewSingle(this.el, this.settings);
      return modelType;
    }
    if (settings.type === 'double') {
      modelType = new ViewDouble(this.el, this.settings);
      return modelType;
    }
    if (settings.type === 'double-vertical') {
      modelType = new ViewDoubleVertical(this.el, this.settings);
      return modelType;
    }
    modelType = new ViewSingleVertical(this.el, this.settings);
    return modelType;
  }

  setSecondThumbPos(): void {
    const coord = this.settings.type.match('vertical') ? 'top' : 'left';

    if (this.type.secondThumb) {
      this.thumbPosSecond = parseFloat(getComputedStyle(this.type.secondThumb.el)[coord]);
    }
  }
}
