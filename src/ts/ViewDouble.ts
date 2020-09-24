// ---------------------------------------   VIEW - double --------------------------------------------
import ViewTrack from './ViewTrack';
import ViewThumb from './ViewThumb';
import ViewInner from './ViewInner';
import ViewFlag from './ViewFlag';
import ViewScale from './ViewScale';
import { IsettingsTypes, ITrack, IClassProperties, IFlag, IScale, IThumb } from './globals';

export default class ViewDouble {
  settings: IsettingsTypes;

  $el: HTMLElement;

  track: ITrack;

  thumb: IThumb;

  inner: IClassProperties;

  flag: IFlag;

  secondFlag: IFlag;

  secondThumb!: IThumb;

  scale: IScale;

  constructor(element: HTMLElement, settings: IsettingsTypes, generalVal: number) {
    this.settings = settings;
    this.$el = element;
    this.track = new ViewTrack(this.settings);
    this.thumb = new ViewThumb();
    this.inner = new ViewInner(this.settings);
    this.flag = new ViewFlag();
    this.secondFlag = new ViewFlag();
    this.scale = new ViewScale(this.settings);
    this.addElements();
    this.addEvents(generalVal);
    this.init(generalVal);
  }

  // add second thumb

  addSecondThumb():void {
    // const $this = this;
    this.secondThumb = new ViewThumb();
    this.secondThumb.el.classList.remove('range-slider__thumb_first');
    this.secondThumb.el.classList.add('range-slider__thumb_second');
  }

  // add all elements in view
  addElements():void {
    this.$el.append(this.track.el);
    this.track.el.append(this.inner.el, this.thumb.el);
    if (this.settings.flag) this.thumb.el.append(this.flag.el);

    this.addSecondThumb();
    this.track.el.append(this.secondThumb.el);
    if (this.settings.flag) this.secondThumb.el.append(this.secondFlag.el);
    if (this.settings.scale) this.track.el.append(this.scale.el);
  }

  // add view events
  addEvents(generalVal: number):void {
    const thumb = this.thumb;
    const settings = this.settings;
    function onMove(e:MouseEvent) {
      thumb.moveDoubleType(e, settings, generalVal);
    }
    function onClick(e:MouseEvent) {
      thumb.onClickDoubleType(e, settings, generalVal);
    }
    this.track.el.addEventListener('mousedown', onMove);
    this.track.el.addEventListener('mousedown', onClick);
  }

  private setThumbPos(settings: IsettingsTypes) {
    const coord = settings.type.match('vertical') ? 'top' : 'left';
    const size = settings.type.match('vertical') ? 'height' : 'width';

    let generalVal =
      settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;

    if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);
    const thumbSize = parseFloat(getComputedStyle(this.thumb.el)[size]);
    const trackSize = parseFloat(getComputedStyle(this.track.el)[size]) - thumbSize;
    const stepCount = generalVal / settings.step;
    const stepSize = +(trackSize / stepCount);
    let from: number = this.settings.from;
    let to = this.settings.to as number;

    const min = settings.min;
    if (min !== 0) {
      from -= min;
      to -= min;
    }

    from = stepSize * Math.round(from / this.settings.step);
    to = stepSize * Math.round(to / this.settings.step);

    from = Number.isNaN(from) ? 0 : from;
    to = Number.isNaN(to) ? trackSize : to;
    from = from > to ? to : from;
    to = to < from ? from : to;
    this.thumb.el.style[coord] = `${from}px`;
    this.secondThumb.el.style[coord] = `${to}px`;
  }

  // inicialize view, set position for elements
  init(generalVal:number):void {
    this.setThumbPos(this.settings);
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
