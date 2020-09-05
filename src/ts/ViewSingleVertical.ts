// ---------------------------------------   VIEW - single - vertical --------------------------------------------
import ViewTrack from './ViewTrack';
import ViewThumb from './ViewThumb';
import ViewInner from './ViewInner';
import ViewFlag from './ViewFlag';
import ViewScale from './ViewScale';
import { IsettingsTypes, ITrack, IClassProperties, IFlag, IScale, IThumb } from './globals';
// VIEW class
export default class ViewSingleVertical {
  settings: IsettingsTypes;

  $el: HTMLElement;

  track: ITrack;

  thumb: IThumb;

  inner: IClassProperties;

  flag: IFlag;

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
  addElements():void {
    this.$el.append(this.track.el);
    this.track.el.append(this.inner.el, this.thumb.el);
    if (this.settings.flag) this.thumb.el.append(this.flag.el);
    if (this.settings.scale) this.track.el.append(this.scale.el);
  }

  // add view events
  addEvents():void {
    const thumb = this.thumb;
    const settings = this.settings;
    function onMove(e: MouseEvent) {
      thumb.moveSingleType(e, settings, settings.step);
    }
    function onClick(e: MouseEvent) {
      thumb.onClickSingleType(e, settings);
    }
    this.track.el.addEventListener('mousedown', onMove);
    this.track.el.addEventListener('mousedown', onClick);
  }

  private setThumbPosOnInit(settings: IsettingsTypes) {
    const coord = settings.type.match('vertical') ? 'top' : 'left';
    const size = settings.type.match('vertical') ? 'height' : 'width';
    if (this.settings.min > 0 && this.settings.min < settings.step) {
      this.settings.step = this.settings.min;
    } else if (this.settings.min < 0 && this.settings.min < settings.step) { this.settings.step = -this.settings.min; }

    let generalVal =
      settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;

    if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);
    const thumbSize = parseFloat(getComputedStyle(this.thumb.el)[size]);
    const trackSize = parseFloat(getComputedStyle(this.track.el)[size]) - thumbSize;
    const stepCount = generalVal / settings.step;
    const stepSize = +(trackSize / stepCount);
    let from: number = this.settings.from;

    const min = settings.min;
    const max = settings.max;
    if (min !== 0) {
      from -= min;
    }

    if (settings.from < min) {
      throw Error('from must be equal or more then min');
    } else if (settings.from > max) {
      throw Error('from must be equal or less then max');
    }
    if (settings.from !== 0) {
      if (settings.from < settings.step) {
        throw Error('from must be euqal of zero or equal of step or more then step');
      }
    }

    const isAliquotFloatFrom = ((settings.from * 10) % (settings.step * 10)) / 10;
    if (isAliquotFloatFrom) throw Error('from must be aliquot of step');

    from = stepSize * (from / this.settings.step);

    this.thumb.el.style[coord] = `${from}px`;
  }

  // inicialize view, set position for elements
  init():void {
    this.setThumbPosOnInit(this.settings);
    if (this.settings.flag) this.flag.setPosition(this.settings);
    this.inner.setPosition(this.settings);
    if (this.settings.scale) this.scale.setCountOfLines(this.settings);
    this.scale.writeMinAndMaxValues(this.settings);
  }
}
