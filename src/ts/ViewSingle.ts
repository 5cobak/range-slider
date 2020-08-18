// ---------------------------------------   VIEW - single --------------------------------------------
// VIEW class
import ViewTrack from './ViewTrack';
import ViewThumb from './ViewThumb';
import ViewInner from './ViewInner';
import ViewFlag from './ViewFlag';
import ViewScale from './ViewScale';
import { IsettingsTypes, ITrack, IClassProperties, IClassFlag, IScale, IThumb } from './globals';

export default class ViewSingle {
  settings: IsettingsTypes;
  $el: HTMLElement;
  track: ITrack;
  thumb: IThumb;
  inner: IClassProperties;
  flag: IClassFlag;
  scale: IScale;
  constructor(element: HTMLElement, settings: IsettingsTypes) {
    this.settings = settings;
    this.$el = element;
    this.track = new ViewTrack(this.settings);
    this.thumb = new ViewThumb(this.settings);
    this.inner = new ViewInner(this.settings);
    this.flag = new ViewFlag(this.settings);
    this.scale = new ViewScale(this.settings);

    this.addElements();
    this.addEvents();
    this.init();
  }

  // add second thumb, if it needed

  // add all elements in view
  addElements() {
    this.$el.append(this.track.el);
    this.track.el.append(this.inner.el, this.thumb.el);
    if (this.settings.flag) this.thumb.el.append(this.flag.el);
    if (this.settings.scale) this.track.el.append(this.scale.el);
  }

  // add view events
  addEvents() {
    this.track.el.addEventListener('mousedown', (e: MouseEvent) => {
      this.thumb.moveSingleType(e, this.settings, this.settings.step);
      this.thumb.onClickSingleType(e, this.settings);
    });
  }

  private setThumbPos(settings: IsettingsTypes, currentValue?: number) {
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
    let from: number = this.settings.from as number;
    if (currentValue) from = currentValue;

    let min = settings.min;
    let max = settings.max;
    if (!from) from = min;
    if (min !== 0) {
      from = from - min;
    }

    if (settings.from < min) {
      throw Error('from must be equal or more then min');
    } else if (settings.from > max) {
      throw Error('from must be equal or less then max');
    }

    const isAliquotFloatFrom = ((settings.from * 10) % (settings.step * 10)) / 10;
    if (isAliquotFloatFrom) throw Error('from must be aliquot of step');

    from = stepSize * (from / this.settings.step);

    this.thumb.el.style[coord] = `${from}px`;
    this.inner.setPosition(settings);
  }

  // inicialize single-view, set position for all required elements of single-view
  init() {
    this.setThumbPos(this.settings);
    if (this.settings.flag) this.flag.setPosition(this.settings);
    this.inner.setPosition(this.settings);
    if (this.settings.scale) {
      this.scale.setCountOfLines(this.settings);
      this.scale.writeMinAndMaxValues(this.settings);
    }
  }
}
