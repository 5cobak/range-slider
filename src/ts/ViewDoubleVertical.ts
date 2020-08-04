// ---------------------------------------   VIEW - double - vertical --------------------------------------------
import ViewTrack from './ViewTrack';
import ViewThumb from './ViewThumb';
import ViewInner from './ViewInner';
import ViewFlag from './ViewFlag';
import ViewScale from './ViewScale';

export default class ViewDoubleVertical {
  settings: IsettingsTypes;
  $el: HTMLElement;
  track: ITrack;
  thumb: IClassThumb;
  inner: IClassProperties;
  flag: IClassFlag;
  secondFlag: IClassFlag;
  secondThumb!: IClassThumb;
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
      this.secondThumb.el.style.top = `${this.track.el.offsetHeight / 1.5}px`;
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

  // inicialize view, set position for elements
  init() {
    // this.thumb.setPosition(this.settings);
    if (this.settings.flag) {
      this.flag.setPosition(this.settings);
      this.secondFlag.setPosition(this.settings);
    }

    // this.secondThumb.setPosition(this.settings);

    this.inner.setPosition(this.settings);
    if (this.settings.scale) this.scale.setCountOfLines(this.settings);
  }
}
