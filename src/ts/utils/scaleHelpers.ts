import { IsettingsTypes } from '../globals.d';
/* eslint-disable no-param-reassign */

export function getValues(settings: IsettingsTypes, generalVal: number, scale: HTMLElement)
:{

  thumbSize:number,
  trackSize:number,
  stepSize:number,
  posCountSmallPercent:number,
  posCountBig:number,
  stepCount:number,
} {
  const track = scale.parentElement as HTMLElement;
  const thumb = track.querySelector('.range-slider__thumb') as HTMLElement;
  const size = settings.type.match('vertical') ? 'height' : 'width';
  const thumbSize = parseFloat(getComputedStyle(thumb)[size]);

  const trackSize: number = parseFloat(getComputedStyle(track)[size]) - thumbSize;
  const stepCount = generalVal / settings.step;

  const stepSize = +(trackSize / stepCount).toFixed(1);

  const posCountSmallPercent = thumbSize / 2;
  const posCountBig = thumbSize / 2;

  return {
    thumbSize,
    trackSize,
    stepSize,
    posCountSmallPercent,
    posCountBig,
    stepCount,
  }
}

export function setSmallLines(
  settings: IsettingsTypes,
  stepCount: number,
  posCountSmallPercent: number,
  trackSize: number,
  thumbSize: number,
  stepSize: number,
  smallLine: HTMLElement,
  scale: HTMLElement,
): void {
  const coord = settings.type.match('vertical') ? 'top' : 'left';
  const size = settings.type.match('vertical') ? 'height' : 'width';

  if (!(stepCount > 50)) {
    for (let i = 0; i <= stepCount * 3; i += 1) {
      const smallLineClone = smallLine.cloneNode(true);

      scale.append(smallLineClone);
      const smallLineSize = parseFloat(getComputedStyle(smallLineClone as HTMLElement)[size]);

      (smallLineClone as HTMLElement).style[coord] = `${posCountSmallPercent - smallLineSize / 2}px`;

      const excessLinePos = posCountSmallPercent - smallLineSize / 2;
      if (excessLinePos >= trackSize) break;
      posCountSmallPercent += stepSize / 2;
    }
    scale.removeChild(smallLine)
  } else {
    for (let i = 0; i <= stepCount; i += 1) {
      const smallLineClone = smallLine.cloneNode(true);

      scale.append(smallLineClone);
      const smallLineSize = parseFloat(getComputedStyle(smallLineClone as HTMLElement)[size]);
      const excessLinePos = posCountSmallPercent - smallLineSize / 2;

      if (excessLinePos >= trackSize) break;

      (smallLineClone as HTMLElement).style[coord] = `${posCountSmallPercent}px`;
      posCountSmallPercent += thumbSize;
    }
    scale.removeChild(smallLine);
    scale.removeChild(scale.lastChild as Node);
  }
}

export function setBigLines(settings: IsettingsTypes, stepCount: number, posCountBig: number, stepSize: number, trackSize: number, scale: HTMLElement): void{
  const coord = settings.type.match('vertical') ? 'top' : 'left';
  const size = settings.type.match('vertical') ? 'height' : 'width';

  if (!(stepCount > 50)) {
    for (let i = 0; i <= stepCount; i += 1) {
      const bigLine: HTMLElement = document.createElement('span');
      bigLine.className = 'range-slider__big-line';
      scale.append(bigLine);
      const bigLineSize = parseFloat(getComputedStyle(bigLine)[size]);
      bigLine.style[coord] = `${posCountBig - bigLineSize / 2}px`;

      posCountBig += stepSize;
    }
  } else {
    const firstBigLine: HTMLElement = document.createElement('span');
    firstBigLine.className = 'range-slider__big-line';
    const lastBigLine = firstBigLine.cloneNode(true) as HTMLElement;
    scale.append(firstBigLine, lastBigLine);
    firstBigLine.style[coord] = `${posCountBig}px`;
    lastBigLine.style[coord] = `${trackSize + posCountBig}px`;
  }
}
