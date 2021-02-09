// ---------------------------------------   VIEW - double - vertical --------------------------------------------
import ViewTrack from './ViewTrack';
import ViewThumb from './ViewThumb';
import ViewInner from './ViewInner';
import ViewFlag from './ViewFlag';
import ViewScale from './ViewScale';
import { IsettingsTypes, ITrack, IClassProperties, IFlag, IScale, IThumb, IObserver, Iposition } from './globals';
import MakeObservableSubject from './Observer';

export default class ViewDoubleVertical {
  settings!: IsettingsTypes;

  el!: HTMLElement;

  parent!: HTMLElement;

  track!: ITrack;

  thumb!: IThumb;

  inner!: IClassProperties;

  flag!: IFlag;

  secondFlag!: IFlag;

  secondThumb!: IThumb;

  scale!: IScale;

  thumbPos!: number;

  secondThumbPos!: number;

  changedSubject!: IObserver;

  positions!: Iposition;

  type!: string;

  // constructor access first argument jQuery object from jQuery plugin, settings and general value from model across presenter
  constructor(element: HTMLElement, settings: IsettingsTypes, generalVal: number) {
    this.init(settings, element, generalVal);
  }

  private createMainElement() {
    const parent = document.createElement('div');
    parent.className = 'range-slider range-slider_vertical range-slider_double';
    this.parent = parent;
  }

  // this method set thumb position at init slider and notify high level's observers
  // method used model's settings and general value from presenter across main view
  private setThumbPos(settings: IsettingsTypes, generalVal: number) {
    const thumbSize = parseFloat(getComputedStyle(this.thumb.el).height);
    const trackSize = parseFloat(getComputedStyle(this.track.el).height) - thumbSize;
    const { hiddenTrack } = this.thumb;
    hiddenTrack.style.height = `${trackSize}px`;
    const stepCount = generalVal / settings.step;
    const stepSize = trackSize / stepCount;
    let { from, to } = settings;

    const { min } = settings;

    from -= min;
    (to as number) -= min;

    from = ((stepSize * Math.round(from / settings.step)) / trackSize) * 100;
    this.thumb.el.style.top = `${from}%`;
    to = ((stepSize * Math.round((to as number) / settings.step)) / trackSize) * 100;
    this.secondThumb.el.style.top = `${to}%`;

    this.positions.from = from;
    this.positions.to = to;

    this.changedSubject.notifyObservers();
  }

  // method for addition second thumb
  private addSecondThumb(): void {
    this.secondThumb = new ViewThumb(this.settings);
    this.secondThumb.el.classList.remove('range-slider__thumb_first');
    this.secondThumb.el.classList.add('range-slider__thumb_second');
  }

  // add all elements in view
  private addElements(): void {
    this.createMainElement();
    this.el.append(this.parent);
    this.parent.append(this.track.el, this.thumb.hiddenTrack);
    this.thumb.hiddenTrack.append(this.thumb.el, this.inner.el);
    // add flag and scale if the user set in options true for them, add second thumb
    if (this.settings.flag) this.thumb.el.append(this.flag.el);

    this.addSecondThumb();

    this.thumb.hiddenTrack.append(this.secondThumb.el);
    if (this.settings.flag) this.secondThumb.el.append(this.secondFlag.el);
    if (this.settings.scale) this.parent.append(this.scale.el);
  }

  // add view events drag-and-drop and click on track from thumb
  private addEvents(generalVal: number): void {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const { thumb } = this;
    const { settings } = this;
    function onMove(e: MouseEvent | TouchEvent) {
      thumb.moveDoubleType(e, settings, generalVal);
    }
    function onClick(e: MouseEvent | TouchEvent) {
      thumb.onClickDoubleType(e, settings, generalVal);
    }

    if (isMobile) {
      this.parent.addEventListener('touchstart', onClick);
      this.parent.addEventListener('touchstart', onMove);
    } else {
      this.parent.addEventListener('mousedown', onClick);
      this.parent.addEventListener('mousedown', onMove);
    }
  }

  // initialize view, set position for elements
  // method use methods from flag and scale if it was set true in options by user
  private init(settings: IsettingsTypes, element: HTMLElement, generalVal: number): void {
    this.settings = settings;
    this.type = settings.type;
    this.el = element;
    // this property we'll pass by observer to high level, this store thumbs positions for model
    this.positions = { from: 0, to: 0 };
    // init track, thumb, inner, scale, flag
    this.track = new ViewTrack(this.settings);
    this.thumb = new ViewThumb(this.settings);
    this.inner = new ViewInner(this.settings);
    this.flag = new ViewFlag();
    this.secondFlag = new ViewFlag();
    this.scale = new ViewScale(this.settings);
    // make observable subject
    this.changedSubject = new MakeObservableSubject();
    // add all elements in track
    this.addElements();
    // add needed events for double-vertical type of slider
    this.addEvents(generalVal);

    this.setThumbPos(this.settings, generalVal);

    if (this.settings.flag) {
      this.flag.setPosition(this.settings);
      this.secondFlag.setPosition(this.settings);
    }

    this.inner.setPosition(this.settings);
    if (this.settings.scale) {
      this.scale.setCountOfLines(this.settings, generalVal);
      this.scale.writeMinAndMaxValues(this.settings);
    }
    // add Observer to thumb and get position of thumb and notify hight level
    this.thumb.changedSubject.addObservers(() => {
      this.positions.from = this.thumb.positions.from;
      this.positions.to = this.thumb.positions.to;
      this.inner.setPosition(settings);
      this.changedSubject.notifyObservers();
    });
  }
}
