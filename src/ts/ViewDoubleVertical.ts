// ---------------------------------------   VIEW - double - vertical --------------------------------------------
import ViewTrack from './ViewTrack';
import ViewThumb from './ViewThumb';
import ViewInner from './ViewInner';
import ViewFlag from './ViewFlag';

export default class ViewDoubleVertical {
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
      this.secondThumb.el.style.top = `${this.track.el.offsetHeight / 1.5}px`;
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
  }

  // add view events
  addEvents() {
    this.track.el.addEventListener('mousedown', (e: MouseEvent) => {
      const $this = this;

      this.thumb.moveDoubleTypeY(e);
      this.thumb.setPosOnClickDoubleTypeY(e);
      this.inner.setPosition(this.settings);

      const $settings = this.settings;

      function writeVal(): void {
        $this.flag.writeValueIn($settings);
        $this.secondFlag.writeValueIn($settings);
      }
      // write value in flags by click on track
      writeVal();
      // write value in flags by move thumb or flag
      document.addEventListener('mousemove', writeVal);
      // eslint-disable-next-line fsd/no-function-declaration-in-event-listener
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', writeVal);
      });
    });
  }

  // inicialize view, set position for elements
  init() {
    this.thumb.setPosition(this.settings);
    this.flag.setPosition(this.settings);
    this.flag.writeValueIn(this.settings);

    this.secondThumb.setPosition(this.settings);
    this.secondFlag.setPosition(this.settings);
    this.secondFlag.writeValueIn(this.settings);

    this.inner.setPosition(this.settings);
  }
}