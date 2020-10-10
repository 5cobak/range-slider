// ---------------------------------------   VIEW - double - vertical --------------------------------------------
import ViewTrack from './ViewTrack';
import ViewThumb from './ViewThumb';
import ViewInner from './ViewInner';
import ViewFlag from './ViewFlag';
import ViewScale from './ViewScale';
import { IsettingsTypes, ITrack, IClassProperties, IFlag, IScale, IThumb, IObserver, Iposition } from './globals';
import MakeObservableSubject from './Observer';

export default class ViewDoubleVertical {
  settings: IsettingsTypes;

  el: HTMLElement;

  track: ITrack;

  thumb: IThumb;

  inner: IClassProperties;

  flag:IFlag;

  secondFlag: IFlag;

  secondThumb!: IThumb;

  scale: IScale;

  thumbPos!: number;

  secondThumbPos!: number;

  changedSubject: IObserver

  positions!: Iposition

  constructor(element: HTMLElement, settings: IsettingsTypes, generalVal: number) {
    this.settings = settings;
    this.el = element;
    this.positions = { from: 0, to: 0 };
    this.track = new ViewTrack(this.settings);
    this.thumb = new ViewThumb(this.settings);
    this.inner = new ViewInner(this.settings);
    this.flag = new ViewFlag();
    this.secondFlag = new ViewFlag();
    this.scale = new ViewScale(this.settings);
    this.changedSubject = new MakeObservableSubject()
    this.addElements();
    this.addEvents(generalVal);
    this.init(generalVal);
    this.thumb.changedSubject.addObservers(() => {
      this.positions.from = this.thumb.positions.from;
      this.positions.to = this.thumb.positions.to;
      this.inner.setPosition(settings);
      this.changedSubject.notifyObservers();
    })
  }

  private setThumbPos(settings: IsettingsTypes, generalVal: number) {
    const thumbSize = parseFloat(getComputedStyle(this.thumb.el).height);
    const trackSize = parseFloat(getComputedStyle(this.track.el).height) - thumbSize;
    const stepCount = generalVal / settings.step;
    const stepSize = +(trackSize / stepCount);
    let from: number = settings.from;
    let to = settings.to as number;

    const min = settings.min;

    from -= min;
    to -= min;

    from = stepSize * Math.round(from / settings.step);
    to = stepSize * Math.round(to / settings.step);

    this.thumb.el.style.top = `${from}px`;
    this.secondThumb.el.style.top = `${to}px`;

    this.positions.from = from;
    this.positions.to = to;
    this.changedSubject.notifyObservers();
  }

  // add second thumb
  private addSecondThumb():void {
    this.secondThumb = new ViewThumb(this.settings);
    this.secondThumb.el.classList.remove('range-slider__thumb_first');
    this.secondThumb.el.classList.add('range-slider__thumb_second');
  }

  // add all elements in view
  private addElements():void {
    this.el.append(this.track.el);
    this.track.el.append(this.inner.el, this.thumb.el);
    if (this.settings.flag) this.thumb.el.append(this.flag.el);

    this.addSecondThumb();
    this.track.el.append(this.secondThumb.el);
    if (this.settings.flag) this.secondThumb.el.append(this.secondFlag.el);
    if (this.settings.scale) this.track.el.append(this.scale.el);
  }

  // add view events
  private addEvents(generalVal: number):void {
    const thumb = this.thumb;
    const settings = this.settings;
    const inner = this.inner;
    function onMove(e:MouseEvent) {
      thumb.moveDoubleType(e, settings, generalVal);
      inner.setPosition(settings);
    }
    function onClick(e:MouseEvent) {
      thumb.onClickDoubleType(e, settings, generalVal);
      inner.setPosition(settings);
    }
    this.track.el.addEventListener('mousedown', onMove);
    this.track.el.addEventListener('mousedown', onClick);
  }

  // inicialize view, set position for elements
  private init(generalVal:number):void {
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
  }
}
