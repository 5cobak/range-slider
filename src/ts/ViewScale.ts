import { HtmlHTMLAttributes } from 'react';

export default class Scale implements IScale {
  settings: IsettingsTypes;
  el: HTMLElement;
  constructor(settings: IsettingsTypes) {
    this.settings = settings;
    this.el = this.createElement(settings);
  }

  private createElement(settings: IsettingsTypes): HTMLElement {
    const scale: HTMLElement = document.createElement('div');
    scale.className = 'range-slider__scale';
    return scale;
  }
  setCountOfLines(settings: IsettingsTypes) {
    const offset = settings.type.match('vertical') ? 'offsetTop' : 'offsetLeft';
    const offsetSize = settings.type.match('vertical') ? 'offsetHeight' : 'offsetWidth';
    const coord = settings.type.match('vertical') ? 'top' : 'left';
    const size = settings.type.match('vertical') ? 'height' : 'width';

    const track = this.el.parentElement as HTMLElement;
    const thumb = track.querySelector('.range-slider__thumb') as HTMLElement;

    const thumbSize = parseInt(getComputedStyle(thumb)[size]);
    const smallLine: HTMLElement = document.createElement('span');
    smallLine.className = 'range-slider__small-line';

    let generalVal =
      settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;

    if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);

    let trackSize: number = parseInt(getComputedStyle(track)[size]) - thumbSize;
    const stepCount = generalVal / settings.step;
    let stepSize = +(trackSize / stepCount).toFixed(1);

    let posCountSmallPercent = thumbSize / 2;
    let posCountBig = thumbSize / 2;
    if (!(stepCount > 50)) {
      for (let i = 0; i <= stepCount * 3; i += 1) {
        const smallLine: HTMLElement = document.createElement('span');
        smallLine.className = 'range-slider__small-line';
        this.el.append(smallLine);
        const smallLineSize = parseInt(getComputedStyle(smallLine)[size]);
        smallLine.style[coord] = `${posCountSmallPercent - smallLineSize / 2}px`;
        posCountSmallPercent += stepSize / 2;
      }
    }

    if (!(stepCount > 50)) {
      for (let i = 0; i <= stepCount; i += 1) {
        const bigLine: HTMLElement = document.createElement('span');
        bigLine.className = 'range-slider__big-line';
        this.el.append(bigLine);
        const bigLineSize = parseInt(getComputedStyle(bigLine)[size]);
        bigLine.style[coord] = `${posCountBig - bigLineSize / 2}px`;

        posCountBig += stepSize;
      }
    }
  }
}
