// ---------------------------------------   VIEW - double - vertical --------------------------------------------
import ViewTrack from './ViewTrack';
import ViewThumb from './ViewThumb';
import ViewInner from './ViewInner';
import ViewFlag from './ViewFlag';
import ViewScale from './ViewScale';
import { ISettingsTypes, ITrack, IClassProperties, IFlag, IScale, IThumb, IObserver, IPosition } from './globals';
import MakeObservableSubject from './Observer';

export default class ViewDoubleVertical {
  settings!: ISettingsTypes;

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

  positions!: IPosition;

  type!: string;

  generalVal!: number;

  // constructor access first argument jQuery object from jQuery plugin, settings and general value from model across presenter
  constructor(element: HTMLElement, settings: ISettingsTypes, generalVal: number) {
    this.init(settings, element, generalVal);
  }

  private createMainElement() {
    const parent = document.createElement('div');
    parent.className = 'range-slider range-slider_vertical range-slider_double';
    this.parent = parent;
  }

  // this method set thumb position at init slider and notify high level's observers
  // method used model's settings and general value from presenter across main view
  private setThumbPos(settings: ISettingsTypes, generalVal: number) {
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

  private setFlagPosOnMove(e: MouseEvent | TouchEvent): void {
    const currentThumb = (e.target as HTMLElement).closest('.range-slider__thumb') as HTMLElement;
    if (this.flag) {
      if (currentThumb === this.thumb.el) {
        this.flag.setPosition(this.settings, this.thumb.el);
      } else this.secondFlag.setPosition(this.settings, this.secondThumb.el);
    }
  }

  private setFlagPosOnClick(): void {
    if (this.flag) {
      this.flag.setPosition(this.settings, this.thumb.el);
      this.secondFlag.setPosition(this.settings, this.secondThumb.el);
    }
  }

  private onMove(e: MouseEvent | TouchEvent) {
    this.thumb.moveDoubleType(e, this.settings, this.generalVal);
    this.setFlagPosOnMove(e);
  }

  private onClick(e: MouseEvent | TouchEvent) {
    this.thumb.onClickDoubleType(e, this.settings, this.generalVal);
    this.setFlagPosOnClick();
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
  private addEvents(): void {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const onClick = this.onClick.bind(this);
    const onMove = this.onMove.bind(this);
    const setFlagPosOnMove = this.setFlagPosOnMove.bind(this);

    if (isMobile) {
      this.parent.addEventListener('touchstart', onClick);
      this.parent.addEventListener('touchstart', onMove);
      this.parent.addEventListener('touchmove', setFlagPosOnMove);
    } else {
      this.parent.addEventListener('mousedown', onClick);
      this.parent.addEventListener('mousedown', onMove);
      this.parent.addEventListener('mousemove', setFlagPosOnMove);
    }
  }

  private addEventsOnResize(): void {
    const updateEvents = this.addEvents.bind(this);
    window.addEventListener('resize', updateEvents);
  }

  // initialize view, set position for elements
  // method use methods from flag and scale if it was set true in options by user
  private init(settings: ISettingsTypes, element: HTMLElement, generalVal: number): void {
    this.settings = settings;
    this.generalVal = generalVal;

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
    this.addEventsOnResize();
    // add needed events for double-vertical type of slider
    this.addEvents();

    this.setThumbPos(this.settings, generalVal);

    if (this.settings.flag) {
      this.flag.setPosition(this.settings, this.thumb.el);
      this.secondFlag.setPosition(this.settings, this.secondThumb.el);
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
