// ---------------------------------------   VIEW - double - vertical --------------------------------------------
import ViewTrack from './ViewTrack';
import ViewThumb from './ViewThumb';
import ViewInner from './ViewInner';
import ViewFlag from './ViewFlag';
import ViewScale from './ViewScale';
import { IsettingsTypes, ITrack, IClassProperties, IClassFlag, IScale, IThumb } from './globals';

export default class ViewDoubleVertical {
  settings: IsettingsTypes;
  $el: HTMLElement;
  track: ITrack;
  thumb: IThumb;
  inner: IClassProperties;
  flag: IClassFlag;
  secondFlag: IClassFlag;
  secondThumb!: IThumb;
  scale: IScale;
  constructor(element: HTMLElement, settings: IsettingsTypes) {
    this.settings = settings;
    this.$el = element;
    this.track = new ViewTrack(this.settings);
    this.thumb = new ViewThumb(this.settings);
    this.inner = new ViewInner(this.settings);
    this.flag = new ViewFlag(this.settings);
    this.secondFlag = new ViewFlag(this.settings);
    this.scale = new ViewScale(this.settings);
    this.addElements();
    this.addEvents();
    this.init();
  }
  private setThumbPosOnInit(settings: IsettingsTypes) {
    const offset = settings.type.match('vertical') ? 'offsetTop' : 'offsetLeft';
    const offsetSize = settings.type.match('vertical') ? 'offsetHeight' : 'offsetWidth';
    const coord = settings.type.match('vertical') ? 'top' : 'left';
    const size = settings.type.match('vertical') ? 'height' : 'width';
    if (this.settings.min > 0 && this.settings.min < settings.step) {
      settings.step = this.settings.min;
    } else if (this.settings.min < 0 && this.settings.min < settings.step)
      settings.step = -this.settings.min;

    let generalVal =
      settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;

    if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);
    const thumbSize = parseInt(getComputedStyle(this.thumb.el)[size]);
    const trackSize = parseInt(getComputedStyle(this.track.el)[size]) - thumbSize;
    const stepCount = generalVal / settings.step;
    let stepSize = +(trackSize / stepCount);
    let from: number = this.settings.from;
    let to = this.settings.to as number;

    let min = settings.min;
    let max = settings.max;
    if (min !== 0) {
      from = from - min;
      to = to - min;
    }

    if (settings.from < min || (settings.to as number) < min) {
      throw Error('from or to must be equal or more then min');
    } else if (settings.from > max || (settings.to as number) > max) {
      throw Error('from or to must be equal or less then max');
    }
    const isAliquotFloatFrom = ((settings.from * 10) % (settings.step * 10)) / 10;
    if (isAliquotFloatFrom) throw Error('from must be aliquot of step');
    const isAliquotFloatTo = ((settings.to! * 10) % (settings.step * 10)) / 10;
    if (isAliquotFloatTo) throw Error('to must be aliquot of step');

    from = stepSize * (from / this.settings.step);
    to = stepSize * (to / this.settings.step);

    // if (to < thumbSize / 2) {
    //   to = thumbSize / 2;
    // } else if (to > trackSize) {
    //   to = trackSize;
    // }
    from = isNaN(from) ? 0 : from;
    to = isNaN(to) ? trackSize : to;
    from = from > to ? to : from;
    to = to < from ? from : to;
    this.thumb.el.style[coord] = `${from}px`;
    this.secondThumb.el.style[coord] = `${to}px`;
  }

  // add second thumb
  addSecondThumb() {
    this.secondThumb = new ViewThumb(this.settings);
    this.secondThumb.el.classList.remove('range-slider__thumb_first');
    this.secondThumb.el.classList.add('range-slider__thumb_second');
  }

  // add all elements in view
  addElements() {
    this.$el.append(this.track.el);
    this.track.el.append(this.inner.el, this.thumb.el);
    if (this.settings.flag) this.thumb.el.append(this.flag.el);

    this.addSecondThumb();
    this.track.el.append(this.secondThumb.el);
    if (this.settings.flag) this.secondThumb.el.append(this.secondFlag.el);
    if (this.settings.scale) this.track.el.append(this.scale.el);
  }

  // add view events
  addEvents() {
    this.track.el.addEventListener('mousedown', (e: MouseEvent) => {
      const $this = this;

      this.thumb.moveDoubleType(e, this.settings);
      this.thumb.onClickDoubleType(e, this.settings);
      this.inner.setPosition(this.settings);
    });
  }

  // inicialize view, set position for elements
  init() {
    this.setThumbPosOnInit(this.settings);
    // this.thumb.setPosition(this.settings);
    if (this.settings.flag) {
      this.flag.setPosition(this.settings);
      this.secondFlag.setPosition(this.settings);
    }

    // this.secondThumb.setPosition(this.settings);

    this.inner.setPosition(this.settings);
    if (this.settings.scale) this.scale.setCountOfLines(this.settings);
    this.scale.writeMinAndMaxValues(this.settings);
  }
}
