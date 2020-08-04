// ---------------------------------------   VIEW - single - vertical --------------------------------------------
import ViewTrack from './ViewTrack';
import ViewThumb from './ViewThumb';
import ViewInner from './ViewInner';
import ViewFlag from './ViewFlag';
import ViewScale from './ViewScale';
// VIEW class
export default class ViewSingleVertical {
  settings: IsettingsTypes;
  $el: HTMLElement;
  track: ITrack;
  thumb: IClassThumb;
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
    this.$el.replaceWith(this.track.el);
    this.track.el.append(this.inner.el, this.thumb.el);
    if (this.settings.flag) this.thumb.el.append(this.flag.el);
    if (this.settings.scale) this.track.el.append(this.scale.el);
  }

  // add view events
  addEvents() {
    this.track.el.addEventListener('mousedown', (e: MouseEvent) => {
      const $this = this;

      this.thumb.moveSingleType(e, this.settings, this.settings.step);
      this.thumb.onClickSingleType(e, this.settings);
    });
  }

  // inicialize view, set position for elements
  init() {
    this.flag.setPosition(this.settings);
    this.inner.setPosition(this.settings);
    if (this.settings.scale) this.scale.setCountOfLines(this.settings);
  }
}
