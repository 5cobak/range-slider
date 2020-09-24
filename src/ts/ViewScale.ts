import { IScale, IsettingsTypes } from './globals';

export default class Scale implements IScale {
  settings: IsettingsTypes;

  el!: HTMLElement;

  smallLine!: HTMLElement;

  bigLine!: HTMLElement

  constructor(settings: IsettingsTypes) {
    this.settings = settings;
    this.createElement();
  }

  private createElement(): void {
    const scale: HTMLElement = document.createElement('div');
    scale.className = 'range-slider__scale';

    const smallLine = document.createElement('span');
    smallLine.className = 'range-slider__small-line';

    const bigLine = document.createElement('span');
    bigLine.className = 'range-slider__big-line';
    this.el = scale;
    this.smallLine = smallLine;
    this.bigLine = bigLine
  }

  writeMinAndMaxValues(settings: IsettingsTypes):void {
    const lineCollections = this.el.querySelectorAll('.range-slider__big-line');
    const min = document.createElement('div');

    min.className = 'range-slider__text';
    min.innerHTML = `${settings.min}`;

    const max = min.cloneNode(true) as HTMLElement;
    max.innerHTML = `${settings.max}`;

    lineCollections[0].append(min);
    lineCollections[lineCollections.length - 1].append(max);
  }

  setCountOfLines(settings: IsettingsTypes, generalVal: number): void {
    const coord = settings.type.match('vertical') ? 'top' : 'left';
    const size = settings.type.match('vertical') ? 'height' : 'width';

    const track = this.el.parentElement as HTMLElement;
    const thumb = track.querySelector('.range-slider__thumb') as HTMLElement;

    const thumbSize = parseFloat(getComputedStyle(thumb)[size]);

    const trackSize: number = parseFloat(getComputedStyle(track)[size]) - thumbSize;
    const stepCount = generalVal / settings.step;

    const stepSize = +(trackSize / stepCount).toFixed(1);

    let posCountSmallPercent = thumbSize / 2;
    let posCountBig = thumbSize / 2;
    this.el.append(this.smallLine);
    if (!(stepCount > 50)) {
      for (let i = 0; i <= stepCount * 3; i += 1) {
        const smallLineClone = this.smallLine.cloneNode(true);

        this.el.append(smallLineClone);
        const smallLineSize = parseFloat(getComputedStyle(smallLineClone as HTMLElement)[size]);

        (smallLineClone as HTMLElement).style[coord] = `${posCountSmallPercent - smallLineSize / 2}px`;

        const excessLinePos = posCountSmallPercent - smallLineSize / 2;
        if (excessLinePos >= trackSize) break;
        posCountSmallPercent += stepSize / 2;
      }
      this.el.removeChild(this.smallLine)
    } else {
      for (let i = 0; i <= stepCount; i += 1) {
        const smallLineClone = this.smallLine.cloneNode(true);

        this.el.append(smallLineClone);
        const smallLineSize = parseFloat(getComputedStyle(smallLineClone as HTMLElement)[size]);
        const excessLinePos = posCountSmallPercent - smallLineSize / 2;

        if (excessLinePos >= trackSize) break;

        (smallLineClone as HTMLElement).style[coord] = `${posCountSmallPercent}px`;
        posCountSmallPercent += thumbSize;
      }
      this.el.removeChild(this.smallLine);
      this.el.removeChild(this.el.lastChild as Node);
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
