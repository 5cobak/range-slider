// ---------------------------------------   VIEW - double --------------------------------------------
import ViewTrack from './ViewTrack';
import ViewThumb from './ViewThumb';
import ViewInner from './ViewInner';
import ViewFlag from './ViewFlag';

export default class ViewDouble {
  settings: IsettingsTypes;
  $el: HTMLElement;
  track: ITrack;
  thumb: IClassThumb;
  inner: IClassProperties;
  flag: IClassFlag;
  secondFlag: IClassFlag;
  secondThumb!: IClassThumb;

  constructor(element: HTMLElement, settings: IsettingsTypes) {
    this.settings = settings;
    this.$el = element;
    this.track = new ViewTrack(this.settings);
    this.thumb = new ViewThumb(this.settings);
    this.inner = new ViewInner(this.settings);
    this.flag = new ViewFlag(this.settings);
    this.secondFlag = new ViewFlag(this.settings);
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
      this.secondThumb.el.append(this.secondFlag.el);
    };
  }

  // add all elements in view
  addElements() {
    this.$el.replaceWith(this.track.el);
    this.track.el.append(this.inner.el, this.thumb.el);
    if (this.settings.flag) this.thumb.el.append(this.flag.el);

    this.addSecondThumb();
    this.track.el.append(this.secondThumb.el);

    if (this.settings.flag) {
      this.secondThumb.el.append(this.secondFlag.el);
      // this.secondFlag.setPosition(this.settings);
    }
  }

  // add view events
  addEvents() {
    this.track.el.addEventListener('mousedown', (e: MouseEvent) => {
      const $this = this;
      if (this.settings.type === 'single') {
        this.thumb.moveSingleTypeX(e);
        this.thumb.setPosOnClickSingleTypeX(e);
        this.inner.setPosition(this.settings);
      } else if (this.settings.type === 'double') {
        this.thumb.moveDoubleTypeX(e);
        this.thumb.setPosOnClickDoubleTypeX(e);
        this.inner.setPosition(this.settings);
      } else if (this.settings.type === 'single-vertical') {
        this.thumb.moveSingleTypeY(e);
        this.thumb.setPosOnClickSingleTypeY(e);
        this.inner.setPosition(this.settings);
      } else {
        this.thumb.moveDoubleTypeY(e);
        this.thumb.setPosOnClickDoubleTypeY(e);
        this.inner.setPosition(this.settings);
      }
    });
  }

  // inicialize view, set position for elements
  init() {
    this.thumb.setPosition(this.settings);
    this.flag.setPosition(this.settings);

    if (this.settings.type === 'double') {
      this.secondThumb.setPosition(this.settings);
      this.secondFlag.setPosition(this.settings);
    } else if (this.settings.type === 'double-vertical') {
      this.secondThumb.setPosition(this.settings);
      this.secondFlag.setPosition(this.settings);
    }
    this.inner.setPosition(this.settings);
  }
}
