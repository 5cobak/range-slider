import { IsettingsTypes } from './globals';

export default class ViewInner {
  settings: IsettingsTypes;

  el: HTMLElement;

  // constructor acces first argument from model's settings across presenter
  constructor(settings: IsettingsTypes) {
    this.settings = settings;
    this.el = this.createInner();
  }

  // method for create inner el
  private createInner():HTMLElement {
    const inner = document.createElement('div');
    inner.classList.add('range-slider__inner');
    return inner;
  }

  // public method for set inner's position, used at init slider and mouse events
  setPosition(settings: IsettingsTypes):void {
    const track = this.el.parentElement as HTMLElement;
    const thumbFirst = track.querySelector('.range-slider__thumb_first') as HTMLElement;

    const heightThumb = parseFloat(getComputedStyle(thumbFirst).height);
    const widthThumb = parseFloat(getComputedStyle(thumbFirst).width);
    // choose type inner and set behavior in various slider
    if (settings.type === 'single') {
      this.el.style.width = `${parseFloat(getComputedStyle(thumbFirst).left) + widthThumb / 2}px`;
    } else if (settings.type === 'double') {
      const thumbSecond = track.querySelector('.range-slider__thumb_second') as HTMLElement;
      this.el.style.left = `${thumbFirst.offsetLeft + widthThumb / 2}px`;
      this.el.style.width = `${thumbSecond.offsetLeft - thumbFirst.offsetLeft}px`;
    } else if (settings.type === 'single-vertical') {
      this.el.style.height = `${parseFloat(getComputedStyle(thumbFirst).top) + heightThumb / 2}px`;
    } else {
      const thumbSecond = track.querySelector('.range-slider__thumb_second') as HTMLElement;
      this.el.style.top = `${thumbFirst.offsetTop + heightThumb / 2}px`;
      this.el.style.height = `${thumbSecond.offsetTop - thumbFirst.offsetTop}px`;
    }
  }
}
