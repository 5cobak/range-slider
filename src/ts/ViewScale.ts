import { IScale, IsettingsTypes } from './globals';

export default class Scale implements IScale {
  settings: IsettingsTypes;

  el: HTMLElement;

  constructor(settings: IsettingsTypes, generalVal:number) {
    this.settings = settings;
    this.el = this.createElement();
  }

  private createElement(): HTMLElement {
    const scale: HTMLElement = document.createElement('div');
    scale.className = 'range-slider__scale';
    return scale;
  }

  writeMinAndMaxValues(settings: IsettingsTypes, generalVal: number):void {
    const lineCollections = this.el.querySelectorAll('.range-slider__big-line');
    const min = document.createElement('div');

    min.className = 'range-slider__text';
    min.innerHTML = `${settings.min}`;

    const max = min.cloneNode(true) as HTMLElement;
    max.innerHTML = `${settings.max}`;

    lineCollections[0].append(min);
    lineCollections[lineCollections.length - 1].append(max);
  }

  setCountOfLines(settings: IsettingsTypes): void {
    const coord = settings.type.match('vertical') ? 'top' : 'left';
    const size = settings.type.match('vertical') ? 'height' : 'width';

    const track = this.el.parentElement as HTMLElement;
    const thumb = track.querySelector('.range-slider__thumb') as HTMLElement;

    const thumbSize = parseFloat(getComputedStyle(thumb)[size]);
    const smallLine: HTMLElement = document.createElement('span');
    smallLine.className = 'range-slider__small-line';

    let generalVal =
      settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;

    if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);
    const trackSize: number = parseFloat(getComputedStyle(track)[size]) - thumbSize;
    const stepCount = generalVal / settings.step;

    const stepSize = +(trackSize / stepCount).toFixed(1);

    let posCountSmallPercent = thumbSize / 2;
    let posCountBig = thumbSize / 2;
    if (!(stepCount > 50)) {
      for (let i = 0; i <= stepCount * 3; i += 1) {
        const smallLine: HTMLElement = document.createElement('span');
        smallLine.className = 'range-slider__small-line';
        this.el.append(smallLine);
        const smallLineSize = parseFloat(getComputedStyle(smallLine)[size]);

        smallLine.style[coord] = `${posCountSmallPercent - smallLineSize / 2}px`;
        const excessLinePos = posCountSmallPercent - smallLineSize / 2;
        if (excessLinePos >= trackSize) break;
        posCountSmallPercent += stepSize / 2;
      }
    } else {
      for (let i = 0; i <= stepCount; i += 1) {
        const smallLine: HTMLElement = document.createElement('span');
        smallLine.className = 'range-slider__small-line';
        this.el.append(smallLine);
        const smallLineSize = parseFloat(getComputedStyle(smallLine)[size]);
        const excessLinePos = posCountSmallPercent - smallLineSize / 2;
        if (excessLinePos >= trackSize) {
          smallLine.remove();
          break;
        }
        smallLine.style[coord] = `${posCountSmallPercent}px`;
        posCountSmallPercent += thumbSize;
      }
    }

    if (!(stepCount > 50)) {
      for (let i = 0; i <= stepCount; i += 1) {
        const bigLine: HTMLElement = document.createElement('span');
        bigLine.className = 'range-slider__big-line';
        this.el.append(bigLine);
        const bigLineSize = parseFloat(getComputedStyle(bigLine)[size]);
        bigLine.style[coord] = `${posCountBig - bigLineSize / 2}px`;

        posCountBig += stepSize;
      }
    } else {
      const firstBigLine: HTMLElement = document.createElement('span');
      firstBigLine.className = 'range-slider__big-line';
      const lastBigLine = firstBigLine.cloneNode(true) as HTMLElement;
      this.el.append(firstBigLine, lastBigLine);
      firstBigLine.style[coord] = `${posCountBig}px`;
      lastBigLine.style[coord] = `${trackSize + posCountBig}px`;
    }
  }
}
