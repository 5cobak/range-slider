// ---------------------------------------   VIEW - single --------------------------------------------
// VIEW class
import ViewTrack from './ViewTrack';
import ViewThumb from './ViewThumb';
import ViewInner from './ViewInner';
import ViewFlag from './ViewFlag';
import ViewScale from './ViewScale';
import { IsettingsTypes, ITrack, IClassProperties, IFlag, IScale, IThumb, IViewSingle } from './globals';

export default class ViewSingle implements IViewSingle {
  settings: IsettingsTypes;

  el!: HTMLElement;

  track: ITrack;

  thumb: IThumb;

  inner: IClassProperties;

  flag: IFlag;

  scale: IScale;

  constructor(element: HTMLElement, settings: IsettingsTypes, generalVal: number) {
    this.settings = settings;
    this.el = element;

    this.track = new ViewTrack(this.settings);
    this.thumb = new ViewThumb();
    this.inner = new ViewInner(this.settings);
    this.flag = new ViewFlag();
    this.scale = new ViewScale(this.settings);

    this.addElements();
    this.addEvents(generalVal);
    this.init(generalVal);
  }

  // add second thumb, if it needed

  // add all elements in view
  private addElements():void {
    this.el.append(this.track.el);
    this.track.el.append(this.inner.el, this.thumb.el);
    if (this.settings.flag) this.thumb.el.append(this.flag.el);
    if (this.settings.scale) this.track.el.append(this.scale.el);
  }

  // add view events
  private addEvents(generalVal: number):void {
    const thumb = this.thumb;
    const settings = this.settings;
    function onMove(e: MouseEvent) {
      thumb.moveSingleType(e, settings, generalVal);
    }
    function onClick(e: MouseEvent) {
      thumb.onClickSingleType(e, settings, generalVal);
    }

    this.track.el.addEventListener('mousedown', onMove);
    this.track.el.addEventListener('mousedown', onClick);
  }

  private setThumbPos(settings: IsettingsTypes, generalVal: number) {
    const thumbSize = parseFloat(getComputedStyle(this.thumb.el).width);
    const trackSize = parseFloat(getComputedStyle(this.track.el).width) - thumbSize;
    const stepCount = generalVal / settings.step;
    const stepSize = +(trackSize / stepCount);
    let from: number = this.settings.from as number;

    const min = settings.min;

    from -= min;

    from = stepSize * Math.round(from / this.settings.step);

    this.thumb.el.style.left = `${from}px`;
    this.inner.setPosition(settings);
  }

  // inicialize single-view, set position for all required elements of single-view
  private init(generalVal: number):void{
    this.setThumbPos(this.settings, generalVal);
    if (this.settings.flag) this.flag.setPosition(this.settings);
    this.inner.setPosition(this.settings);
    if (this.settings.scale) {
      this.scale.setCountOfLines(this.settings, generalVal);
      this.scale.writeMinAndMaxValues(this.settings);
    }
  }
}
