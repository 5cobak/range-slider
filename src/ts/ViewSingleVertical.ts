// ---------------------------------------   VIEW - single - vertical --------------------------------------------
import ViewTrack from './ViewTrack';
import ViewThumb from './ViewThumb';
import ViewInner from './ViewInner';
import ViewFlag from './ViewFlag';
// VIEW class
export default class ViewSingleVertical {
  settings: IsettingsTypes;
  $el: HTMLElement;
  track: ITrack;
  thumb: IClassThumb;
  inner: IClassProperties;
  flag: IClassFlag;

  constructor(element: HTMLElement, settings: IsettingsTypes) {
    this.settings = settings;
    this.$el = element;
    this.track = new ViewTrack(this.settings);
    this.thumb = new ViewThumb(this.settings);
    this.inner = new ViewInner(this.settings);
    this.flag = new ViewFlag(this.settings);
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
  }

  // add view events
  addEvents() {
    this.track.el.addEventListener('mousedown', (e: MouseEvent) => {
      const $this = this;

      this.thumb.moveSingleTypeY(e);
      this.thumb.setPosOnClickSingleTypeY(e);
      this.inner.setPosition(this.settings);

      const $settings = this.settings;
      function writeVal(): void {
        $this.flag.writeValueIn($settings);
      }
      // write value in the flags by click on track
      writeVal();
      // write value in the flags by move thumb or flag
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
    this.inner.setPosition(this.settings);
  }
}
