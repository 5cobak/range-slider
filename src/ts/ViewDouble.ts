// ---------------------------------------   VIEW - double --------------------------------------------
import ViewTrack from './ViewTrack';
import ViewThumb from './ViewThumb';
import ViewInner from './ViewInner';
import ViewFlag from './ViewFlag';
import ViewScale from './ViewScale';
import { IsettingsTypes, ITrack, IClassProperties, IClassFlag, IScale } from './globals';

export default class ViewDouble {
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

  // add second thumb

  addSecondThumb() {
    // const $this = this;
    this.secondThumb = new ViewThumb(this.settings);
    this.secondThumb.el.classList.remove('range-slider__thumb_first');
    this.secondThumb.el.classList.add('range-slider__thumb_second');
    this.secondThumb.setPosition = (settings: IsettingsTypes) => {
      this.secondThumb.el.style.left = `${this.track.el.offsetWidth / 1.5}px`;
      this.secondFlag.el.className = 'range-slider__flag range-slider__flag_second';
    };
  }

  // add all elements in view
  addElements() {
    this.$el.replaceWith(this.track.el);
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

      this.thumb.moveDoubleType(e, this.settings, this.settings.step);
      this.thumb.onClickDoubleType(e, this.settings);
      this.inner.setPosition(this.settings);
    });
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
    let to: number = this.settings.to;

    let min = settings.min;
    let max = settings.max;
    if (min !== 0) {
      from = from - min;
      to = to - min;
    }

    if (settings.from < min || settings.to < min) {
      throw Error('from or to must be equal or more then min');
    } else if (settings.from > max || settings.to > max) {
      throw Error('from or to must be equal or less then max');
    }
    if (settings.from !== 0 && settings.to !== 0) {
      if (settings.from < settings.step || settings.to < settings.step) {
        throw Error('from or to must be euqal of zero or equal of step or more then step');
      }
    }

    const isAliquotFloatFrom = (settings.from % (settings.step * 10)) / 10;
    const isAliquotFloatTo = (settings.from % (settings.step * 10)) / 10;
    if (!isAliquotFloatFrom) throw Error('from must be aliquot of step');
    if (!isAliquotFloatTo) throw Error('to must be aliquot of step');
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

  // inicialize view, set position for elements
  init() {
    this.setThumbPosOnInit(this.settings);
    if (this.settings.flag) {
      this.flag.setPosition(this.settings);
      this.secondFlag.setPosition(this.settings);
    }

    this.inner.setPosition(this.settings);
    if (this.settings.scale) {
      this.scale.setCountOfLines(this.settings);
      this.scale.writeMinAndMaxValues(this.settings);
    }
  }
}
