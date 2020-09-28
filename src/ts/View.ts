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

  constructor(element: HTMLElement, settings: IsettingsTypes, generalVal: number) {
    this.el = element;
    this.settings = settings;
    this.type = this.chooseViewType(settings, generalVal);

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
      this.getThumbsPos();
    });
    this.viewChangedSubject.notifyObservers();
  }

  private getThumbsPos(): void {
    const coord = this.settings.type.match('vertical') ? 'top' : 'left';
    this.thumbPos = parseFloat(getComputedStyle(this.type.thumb.el)[coord]);
    if (this.type.secondThumb) {
      this.thumbPosSecond = parseFloat(getComputedStyle(this.type.secondThumb.el)[coord]);
    }
  }

  private chooseViewType(settings: IsettingsTypes, generalVal: number): ISubView {
    let modelType: ISubView;
    if (settings.type === 'single') {
      modelType = new ViewSingle(this.el, this.settings, generalVal);
      return modelType;
    }
    if (settings.type === 'double') {
      modelType = new ViewDouble(this.el, this.settings, generalVal);
      return modelType;
    }
    if (settings.type === 'double-vertical') {
      modelType = new ViewDoubleVertical(this.el, this.settings, generalVal);
      return modelType;
    }
    modelType = new ViewSingleVertical(this.el, this.settings, generalVal);
    return modelType;
  }
}
