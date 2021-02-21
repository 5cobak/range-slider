import ViewSingle from './ViewSingle';
import ViewDouble from './ViewDouble';
import ViewDoubleVertical from './ViewDoubleVertical';
import ViewSingleVertical from './ViewSingleVertical';
import MakeObservableSubject from './Observer';
import { IView, ISettingsTypes, ISubView, IObserver } from './globals';
// ---------------------------------------   VIEW main --------------------------------------------
export default class View implements IView {
  settings!: ISettingsTypes;

  el!: HTMLElement;

  type!: ISubView;

  changedSubject!: IObserver;

  thumbSize!: number;

  trackSize!: number;

  positions!: { to: number; from: number };

  // constructor access first argument jQuery<HTMLElement>, model's settings and general value across presenter
  constructor(element: HTMLElement, settings: ISettingsTypes, generalVal: number) {
    this.init(settings, element, generalVal);
  }

  // method for get positons from lower levels and notyfy high levels
  private getThumbsPos(): void {
    this.positions.from = this.type.positions.from;

    if (this.type.secondThumb) {
      this.positions.to = this.type.positions.to as number;
    }

    this.changedSubject.notifyObservers();
  }

  // method for choose type of range-slider: single, single-vertical, double, double-vertical
  private chooseViewType(settings: ISettingsTypes, generalVal: number): ISubView {
    let modelType: ISubView;
    if (settings.type === 'single-horizontal') {
      modelType = new ViewSingle(this.el, this.settings, generalVal);
      return modelType;
    }
    if (settings.type === 'double-horizontal') {
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

  // method set trackSize and thumbSize for model's calculation and add observer where get positons of thumbs and
  private init(settings: ISettingsTypes, element: HTMLElement, generalVal: number) {
    this.el = element;
    this.settings = settings;
    this.type = this.chooseViewType(settings, generalVal);
    this.positions = { to: 0, from: 0 };
    this.changedSubject = new MakeObservableSubject();
    this.thumbSize = settings.type.match('vertical')
      ? parseFloat(getComputedStyle(this.type.thumb.el).height)
      : parseFloat(getComputedStyle(this.type.thumb.el).width);

    this.trackSize = settings.type.match('vertical')
      ? parseFloat(getComputedStyle(this.type.track.el).height)
      : parseFloat(getComputedStyle(this.type.track.el).width);
    // add observer in type and notify this type in order to get positions from low level
    this.type.changedSubject.addObservers(() => {
      this.getThumbsPos();
    });
    this.type.changedSubject.notifyObservers();
  }
}
