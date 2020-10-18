// ---------------------------------------   VIEW - single - vertical --------------------------------------------
import ViewTrack from './ViewTrack';
import ViewThumb from './ViewThumb';
import ViewInner from './ViewInner';
import ViewFlag from './ViewFlag';
import ViewScale from './ViewScale';
import { IsettingsTypes, ITrack, IClassProperties, IFlag, IScale, IThumb, IObserver, Iposition } from './globals';
import MakeObservableSubject from './Observer';
// VIEW class
export default class ViewSingleVertical {
  settings: IsettingsTypes;

  el: HTMLElement;

  track: ITrack;

  thumb: IThumb;

  inner: IClassProperties;

  flag: IFlag;

  scale: IScale;

  thumbPos!: number;

  changedSubject!: IObserver

  positions: Iposition;

  // constructor access first argument jQuery object from jQuery plugin, settings and general value from model across presenter
  constructor(element: HTMLElement, settings: IsettingsTypes, generalVal: number) {
    this.settings = settings;
    this.el = element;
    // this property we'll pass by observer to high level, this store thumbs positions for model
    this.positions = { from: 0, to: 0 };
    // init track, thumb, inner, scale, flag
    this.track = new ViewTrack(this.settings);
    this.thumb = new ViewThumb(this.settings);
    this.inner = new ViewInner(this.settings);
    this.flag = new ViewFlag();
    this.scale = new ViewScale(this.settings);
    // make observable subject
    this.changedSubject = new MakeObservableSubject();
    // add all elements in track
    this.addElements();
    // add needed events for single-vertical type of slider
    this.addEvents(generalVal);
    this.init(generalVal);
    // add Observer to thumb and get postion of thumb and notify hight level
    this.thumb.changedSubject.addObservers(() => {
      this.positions.from = this.thumb.positions.from;
      // set inner's position by move thumb or click on track
      this.inner.setPosition(this.settings);
      this.changedSubject.notifyObservers();
    })
  }

  // add all elements in view
  private addElements():void {
    this.el.append(this.track.el);
    this.track.el.append(this.inner.el, this.thumb.el);
    // add flag and scale if the user set in options true for them
    if (this.settings.flag) this.thumb.el.append(this.flag.el);
    if (this.settings.scale) this.track.el.append(this.scale.el);
  }

  // add view events drap-and-drop and click on track from thumb
  private addEvents(generalVal: number):void {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const thumb = this.thumb;
    const settings = this.settings;
    function onMove(e: MouseEvent | TouchEvent) {
      thumb.moveSingleType(e, settings, generalVal);
    }
    function onClick(e:MouseEvent | TouchEvent) {
      thumb.onClickSingleType(e, settings, generalVal);
    }

    if (isMobile) {
      this.track.el.addEventListener('touchstart', onClick);
      this.track.el.addEventListener('touchstart', onMove);
    } else {
      this.track.el.addEventListener('mousedown', onClick);
      this.track.el.addEventListener('mousedown', onMove);
    }
  }

  // this method set thumb position at init slider and notify high level's observers
  // method used model's settings and general value from presenter across main view
  private setThumbPos(settings: IsettingsTypes, generalVal: number) {
    const thumbSize = parseFloat(getComputedStyle(this.thumb.el).height);
    const trackSize = parseFloat(getComputedStyle(this.track.el).height) - thumbSize;
    const stepCount = generalVal / settings.step;
    const stepSize = +(trackSize / stepCount);
    let from: number = settings.from;

    const min = settings.min;

    from -= min;

    from = stepSize * Math.round(from / settings.step);

    this.thumb.el.style.top = `${from}px`;

    this.positions.from = from;

    this.changedSubject.notifyObservers();
  }

  // inicialize view, set position for elements
  // method use methods from flag and scale if it was set true by user
  private init(generalVal:number):void {
    this.setThumbPos(this.settings, generalVal);
    this.inner.setPosition(this.settings);
    if (this.settings.flag) this.flag.setPosition(this.settings);
    if (this.settings.scale) {
      this.scale.setCountOfLines(this.settings, generalVal);
      this.scale.writeMinAndMaxValues(this.settings);
    }
  }
}
