// ---------------------------------------   VIEW --------------------------------------------
const Thumb = require('./ViewThumb.ts');
const Track = require('./ViewTrack.ts');
const Inner = require('./ViewInner.ts');
const Flag = require('./ViewFlag.ts');
// VIEW class
class View {
  settings: IsettingsTypes;
  el: HTMLElement;
  track: IClassPropertiesJquery;
  thumb: IClassThumb;
  inner: IClassProperties;
  flag: IClassFlag;
  secondFlag: IClassFlag;
  secondThumb!: IClassThumb;

  constructor(element: HTMLElement, settings: IsettingsTypes) {
    this.settings = settings;
    this.el = element;
    this.track = new Track(this.el, this.settings);
    this.thumb = new Thumb(this.settings);
    this.inner = new Inner(this.settings);
    this.flag = new Flag(this.settings);
    this.secondFlag = new Flag(this.settings);
    this.addElements();
    this.addEvents();
    this.init();
  }

  // add second thumb, if it needed
  addSecondThumb(): void {
    const $this = this;

    if (this.settings.type === 'double' || this.settings.type === 'double-vertical') {
      this.secondThumb = new Thumb(this.settings);
      this.secondThumb.el.classList.remove('range-slider__thumb_first');
      this.secondThumb.el.classList.add('range-slider__thumb_second');
      this.secondThumb.setPosition = (settings: IsettingsTypes) => {
        if (settings.type === 'double') {
          this.el.style.left = `${(this.track.$el.outerWidth() as number) / 1.5}px`;
          this.secondFlag.el.className = 'range-slider__flag range-slider__flag_second';
          this.el.append(this.secondFlag.el);
        } else if (settings.type === 'double-vertical') {
          this.el.style.top = `${(this.track.$el.outerHeight() as number) / 1.5}px`;
          this.secondFlag.el.className = 'range-slider__flag range-slider__flag_second';
          this.el.append(this.secondFlag.el);
        }
      };
    }
  }

  // add all elements in view
  addElements(): void {
    this.track.$el.append(this.inner.el, this.thumb.el);
    if (this.settings.flag) this.thumb.el.append(this.flag.el);
    if (this.settings.type === 'double') {
      this.addSecondThumb();
      this.track.$el.append(this.secondThumb.el);

      if (this.settings.flag) {
        this.secondThumb.el.append(this.secondFlag.el);
        // this.secondFlag.setPosition(this.settings);
      }
    } else if (this.settings.type === 'double-vertical') {
      this.addSecondThumb();
      this.track.el.append(this.secondThumb.el);
    }
  }

  // add view events
  addEvents() {
    this.track.$el.on('mousedown', (e: MouseEvent) => {
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
      const $settings = this.settings;
      function writeVal(): void {
        $this.flag.writeValueIn($settings);
        if ($settings.type === 'single' || $settings.type === 'single-vertical') return;
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
    if (this.settings.type === 'double') {
      this.secondThumb.setPosition(this.settings);
      this.secondFlag.setPosition(this.settings);
      this.secondFlag.writeValueIn(this.settings);
    } else if (this.settings.type === 'double-vertical') {
      this.secondThumb.setPosition(this.settings);
      this.secondFlag.setPosition(this.settings);
      this.secondFlag.writeValueIn(this.settings);
    }
    this.inner.setPosition(this.settings);
  }
}

module.exports = View;
