// ---------------------------------------   VIEW - double --------------------------------------------
import ViewTrack from './ViewTrack';
import ViewThumb from './ViewThumb';
import ViewInner from './ViewInner';
import ViewFlag from './ViewFlag';
import ViewScale from './ViewScale';
import { ISettingsTypes, ITrack, IClassProperties, IFlag, IScale, IThumb, IObserver } from '../Interfaces/globals';
import MakeObservableSubject from '../Observer/Observer';

export default class ViewDouble {
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

  changedSubject!: IObserver;

  positions!: { from: number; to: number };

  generalVal!: number;

  // constructor access first argument jQuery object from jQuery plugin, settings and general value from model across presenter
  constructor(element: HTMLElement, settings: ISettingsTypes, generalVal: number) {
    this.init(settings, element, generalVal);
  }

  private createMainElement() {
    const parent = document.createElement('div');
    parent.className = 'js-range-slider range-slider range-slider_double';
    this.parent = parent;
  }

  // this method set thumb position at init slider and notify high level's observers
  // method used model's settings and general value from presenter across main view
  private setThumbPos(settings: ISettingsTypes, generalVal: number) {
    const thumbSize = parseFloat(getComputedStyle(this.thumb.el).width);
    const trackSize = parseFloat(getComputedStyle(this.track.el).width) - thumbSize;
    const { hiddenTrack } = this.thumb;
    hiddenTrack.style.width = `${100 - (thumbSize / trackSize) * 100}%`;
    const stepCount = generalVal / settings.step;
    const stepSize = trackSize / stepCount;
    let { from } = settings;
    let to = settings.to as number;
    const { min } = settings;
    from -= min;
    to -= min;
    from = ((stepSize * Math.round(from / settings.step)) / trackSize) * 100;
    this.thumb.el.style.left = `${from}%`;
    to = ((stepSize * Math.round(to / settings.step)) / trackSize) * 100;
    if (to > 100) to = 100;
    this.secondThumb.el.style.left = `${to}%`;
    this.positions.from = from;
    this.positions.to = to;
    this.changedSubject.notifyObservers();
  }

  // method for addition second thumb

  private setFlagPosOnMove(e: MouseEvent | TouchEvent): void {
    const currentThumb = (e.target as HTMLElement).closest('.js-range-slider__thumb') as HTMLElement;
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

  private changeValOnClickSlider(e: MouseEvent | TouchEvent) {
    this.thumb.moveDoubleType(e, this.settings, this.generalVal);
    this.setFlagPosOnMove(e);
  }

  private changeValByMoveThumb(e: MouseEvent | TouchEvent) {
    this.thumb.onClickDoubleType(e, this.settings, this.generalVal);
    this.setFlagPosOnClick();
  }

  // method for addition second thumb
  private addSecondThumb(): void {
    this.secondThumb = new ViewThumb(this.settings, this.generalVal);
    this.secondThumb.el.className = 'range-slider__thumb_second js-range-slider__thumb_second js-range-slider__thumb range-slider__thumb';
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

    const changeValOnClickSlider = this.changeValOnClickSlider.bind(this);
    const changeValByMoveThumb = this.changeValByMoveThumb.bind(this);
    const setFlagPosOnMove = this.setFlagPosOnMove.bind(this);

    if (isMobile) {
      this.parent.addEventListener('touchstart', changeValOnClickSlider);
      this.parent.addEventListener('touchstart', changeValByMoveThumb);
      this.parent.addEventListener('touchmove', setFlagPosOnMove);
    } else {
      this.parent.addEventListener('mousedown', changeValOnClickSlider);
      this.parent.addEventListener('mousedown', changeValByMoveThumb);
      this.parent.addEventListener('mousemove', setFlagPosOnMove);
    }
  }

  private addEventsOnResize(): void {
    const updateEvents = this.addEvents.bind(this);
    window.addEventListener('resize', updateEvents);
  }

  // initialize view, set position for elements
  // method use methods from flag and scale if it was set true by user
  private init(settings: ISettingsTypes, element: HTMLElement, generalVal: number): void {
    this.settings = settings;
    this.el = element;
    this.generalVal = generalVal;
    // this property we'll pass by observer to high level, this store thumbs positions for model
    this.positions = { from: 0, to: 0 };
    // init track, thumb, inner, scale, flag
    this.track = new ViewTrack(this.settings);
    this.thumb = new ViewThumb(this.settings, generalVal);
    this.inner = new ViewInner(this.settings);
    this.flag = new ViewFlag();
    this.secondFlag = new ViewFlag();
    this.scale = new ViewScale(this.settings);
    // make observable subject
    this.changedSubject = new MakeObservableSubject();

    // add all elements in track
    this.addElements();
    // add needed events for double type of slider
    this.addEvents();
    this.addEventsOnResize();

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
    this.changedSubject.notifyObservers();

    this.thumb.changedSubject.addObservers(() => {
      this.positions.from = this.thumb.positions.from;
      this.positions.to = this.thumb.positions.to;
      this.inner.setPosition(settings);
      this.changedSubject.notifyObservers();
    });
  }
}
