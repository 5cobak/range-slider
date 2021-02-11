// ---------------------------------------   VIEW - single --------------------------------------------
// VIEW class
import ViewTrack from './ViewTrack';
import ViewThumb from './ViewThumb';
import ViewInner from './ViewInner';
import ViewFlag from './ViewFlag';
import ViewScale from './ViewScale';
import { IsettingsTypes, ITrack, IClassProperties, IFlag, IScale, IThumb, IViewSingle, IObserver } from './globals';
import MakeObservableSubject from './Observer';

export default class ViewSingle implements IViewSingle {
  settings!: IsettingsTypes;

  el!: HTMLElement;

  parent!: HTMLElement;

  track!: ITrack;

  thumb!: IThumb;

  inner!: IClassProperties;

  flag!: IFlag;

  scale!: IScale;

  changedSubject!: IObserver;

  positions!: { to: number; from: number };

  constructor(element: HTMLElement, settings: IsettingsTypes, generalVal: number) {
    this.init(settings, element, generalVal);
  }

  // add all elements in view
  private addElements(): void {
    this.createMainElement();
    this.el.append(this.parent);
    this.parent.append(this.track.el);
    this.parent.append(this.thumb.hiddenTrack);
    this.thumb.hiddenTrack.append(this.thumb.el, this.inner.el);
    // add flag and scale if the user set in options true for them
    if (this.settings.flag) this.thumb.el.append(this.flag.el);
    if (this.settings.scale) this.parent.append(this.scale.el);
  }

  private createMainElement() {
    const parent = document.createElement('div');
    parent.className = 'range-slider range-slider_single';
    this.parent = parent;
  }

  // add view events drap-and-drop and click on track from thumb
  private addEvents(generalVal: number): void {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const { thumb, flag } = this;
    const { settings } = this;
    function moveAt(e: MouseEvent | TouchEvent) {
      thumb.moveSingleType(e, settings, generalVal);
      if (flag) flag.setPosition(settings);
    }
    function onClick(e: MouseEvent | TouchEvent) {
      thumb.onClickSingleType(e, settings, generalVal);
      if (flag) flag.setPosition(settings);
    }

    if (isMobile) {
      this.parent.addEventListener('touchstart', onClick);
      this.parent.addEventListener('touchstart', moveAt);
    } else {
      this.parent.addEventListener('mousedown', onClick);
      this.parent.addEventListener('mousemove', moveAt);
    }
  }

  // this method set thumb position at init slider and notify high level's observers
  // method used model's settings and general value from presenter across main view
  private setThumbPos(settings: IsettingsTypes, generalVal: number) {
    const thumbSize = parseFloat(getComputedStyle(this.thumb.el).width);
    const trackSize = parseFloat(getComputedStyle(this.track.el).width) - thumbSize;
    const { hiddenTrack } = this.thumb;
    hiddenTrack.style.width = `${100 - (thumbSize / trackSize) * 100}%`;
    const stepCount = generalVal / settings.step;
    const stepSize = +(trackSize / stepCount);
    let { from } = settings;
    const { min } = settings;
    from -= min;
    from = ((stepSize * Math.round(from / settings.step)) / trackSize) * 100;
    this.thumb.el.style.left = `${from}%`;
    this.positions.from = from;
    this.changedSubject.notifyObservers();
  }

  // inicialize view, set position for elements
  // method use methods from flag and scale if it was set true by user
  private init(settings: IsettingsTypes, element: HTMLElement, generalVal: number): void {
    this.settings = settings;
    this.el = element;
    // this property we'll pass by observer to high level, this store thumbs positions for model
    this.positions = { to: 0, from: 0 };
    // init track, thumb, inner, scale, flag
    this.track = new ViewTrack(this.settings);
    this.thumb = new ViewThumb(this.settings);
    this.inner = new ViewInner(this.settings);
    this.flag = new ViewFlag();
    this.scale = new ViewScale(this.settings);
    // make observable subject
    this.changedSubject = new MakeObservableSubject();
    // add Observer to thumb and get postion of thumb and notify hight level
    this.thumb.changedSubject.addObservers(() => {
      this.positions.from = this.thumb.positions.from;
      // set inner's position by move thumb or click on track
      this.inner.setPosition(settings);
      this.changedSubject.notifyObservers();
    });
    // add all elements in track
    this.addElements();
    // add needed events for single type of slider
    this.addEvents(generalVal);

    this.setThumbPos(this.settings, generalVal);
    this.inner.setPosition(settings);
    if (this.settings.flag) this.flag.setPosition(this.settings);

    if (this.settings.scale) {
      this.scale.setCountOfLines(this.settings, generalVal);
      this.scale.writeMinAndMaxValues(this.settings);
    }
    this.changedSubject.notifyObservers();
  }
}
