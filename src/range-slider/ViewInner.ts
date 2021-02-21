import { ISettingsTypes } from './globals';

export default class ViewInner {
  settings: ISettingsTypes;

  el!: HTMLElement;

  // constructor acces first argument from model's settings across presenter
  constructor(settings: ISettingsTypes) {
    this.settings = settings;
    this.createInner();
  }

  // method for create inner el
  private createInner(): void {
    const inner = document.createElement('div');
    inner.classList.add('range-slider__inner');
    this.el = inner;
  }

  // public method for set inner's position, used at init slider and mouse events
  setPosition(settings: ISettingsTypes): void {
    const hiddenTrack = this.el.parentElement as HTMLElement;
    const thumbFirst = hiddenTrack.querySelector('.range-slider__thumb_first') as HTMLElement;
    const widthThumb = parseFloat(getComputedStyle(thumbFirst).width);
    const hiddenTrackWidth = parseFloat(getComputedStyle(hiddenTrack as Element).width);
    const hiddenTrackHeight = parseFloat(getComputedStyle(hiddenTrack as Element).height);

    // choose type inner and set behavior in various slider
    if (settings.type === 'single-horizontal') {
      const widthInPx = parseFloat(getComputedStyle(thumbFirst).left) + widthThumb / 2;
      this.el.style.width = `${(widthInPx / hiddenTrackWidth) * 100}%`;
    } else if (settings.type === 'double-horizontal') {
      const thumbSecond = hiddenTrack.querySelector('.range-slider__thumb_second') as HTMLElement;

      const widthInPx = thumbSecond.offsetLeft - thumbFirst.offsetLeft;
      const leftInPx = thumbFirst.offsetLeft + widthThumb / 2;
      this.el.style.left = `${(leftInPx / hiddenTrackWidth) * 100}%`;
      this.el.style.width = `${(widthInPx / hiddenTrackWidth) * 100}%`;
    } else if (settings.type === 'single-vertical') {
      const heightInPx = thumbFirst.offsetTop + widthThumb / 2;
      this.el.style.height = `${heightInPx}px`;
    } else {
      const thumbSecond = hiddenTrack.querySelector('.range-slider__thumb_second') as HTMLElement;
      const heightInPx = thumbSecond.offsetTop - thumbFirst.offsetTop;
      const leftInPx = thumbFirst.offsetTop + widthThumb / 2;
      this.el.style.top = `${(leftInPx / hiddenTrackHeight) * 100}%`;
      this.el.style.height = `${(heightInPx / hiddenTrackHeight) * 100}%`;
    }
  }
}
