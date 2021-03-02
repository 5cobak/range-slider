import { ISettingsTypes } from '../../Interfaces/globals';

function toFixed(num: number) {
  num = Number(num.toFixed(20));
  return num;
}

export function getValues(
  settings: ISettingsTypes,
  generalVal: number,
  scale: HTMLElement
): {
  thumbSize: number;
  trackSize: number;
  stepSize: number;
  posCountSmallPercent: number;
  posCountBig: number;
  stepCount: number;
} {
  const track = scale.parentElement as HTMLElement;
  const thumb = track.querySelector('.js-range-slider__thumb') as HTMLElement;
  const size = settings.type.match('vertical') ? 'height' : 'width';
  const coord = settings.type.match('vertical') ? 'top' : 'left';
  const thumbSize = parseFloat(getComputedStyle(thumb)[size]);
  const isVertical = settings.type.match('vertical');
  const trackSize: number = parseFloat(getComputedStyle(track)[size]) - thumbSize;
  const scaleEl = track.querySelector('.js-range-slider__scale') as HTMLElement;
  const thumbSizePercent = (thumbSize / trackSize) * 100;
  scaleEl.style[size] = `${100 - thumbSizePercent}%`;
  scaleEl.style[coord] = `${thumbSizePercent / 2}%`;
  if (isVertical) {
    scaleEl.style[size] = `${trackSize}px`;
    scaleEl.style[coord] = `${thumbSize / 2}px`;
  }

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
  };
}

function setFewSmallLine(
  stepCount: number,
  scale: HTMLElement,
  smallLine: HTMLElement,
  trackSize: number,
  settings: ISettingsTypes,
  stepSize: number,
  posLine: number
): void {
  const coord = settings.type.match('vertical') ? 'top' : 'left';
  const size = settings.type.match('vertical') ? 'height' : 'width';

  const smallLineClone = smallLine.cloneNode(true) as HTMLElement;
  scale.append(smallLineClone);
  smallLineClone.style.display = 'none';
  const smallLineSize = parseFloat(getComputedStyle(smallLineClone as HTMLElement)[size]);
  const smallLineCoord = ((posLine - smallLineSize / 2) / trackSize) * 100;
  const excessLinePos = posLine - smallLineSize / 2;
  if (excessLinePos >= trackSize) return;
  smallLineClone.style.display = 'block';
  (smallLineClone as HTMLElement).style[coord] = `${toFixed(smallLineCoord)}%`;
  posLine += stepSize / 2;
  setFewSmallLine(stepCount, scale, smallLine, trackSize, settings, stepSize, posLine);
}

function setMuchSmallLine(
  stepCount: number,
  scale: HTMLElement,
  smallLine: HTMLElement,
  trackSize: number,
  settings: ISettingsTypes,
  thumbSize: number,
  posLine: number
): void {
  const coord = settings.type.match('vertical') ? 'top' : 'left';
  const size = settings.type.match('vertical') ? 'height' : 'width';

  const smallLineClone = smallLine.cloneNode(true);

  scale.append(smallLineClone);
  const smallLineSize = parseFloat(getComputedStyle(smallLineClone as HTMLElement)[size]);

  const smallLineCoord = (posLine / trackSize) * 100;

  const excessLinePos = posLine - smallLineSize / 2;
  if (excessLinePos >= trackSize) {
    return;
  }

  (smallLineClone as HTMLElement).style[coord] = `${smallLineCoord}%`;
  posLine += thumbSize / 2 - smallLineSize / 2;
  setMuchSmallLine(stepCount, scale, smallLine, trackSize, settings, thumbSize, posLine);
}

export function setSmallLines(
  settings: ISettingsTypes,
  stepCount: number,
  trackSize: number,
  thumbSize: number,
  stepSize: number,
  smallLine: HTMLElement,
  scale: HTMLElement
): void {
  const posLine = 0;
  scale.innerHTML = '';
  if (!(stepCount > 50)) {
    setFewSmallLine(stepCount, scale, smallLine, trackSize, settings, stepSize, posLine);
  } else {
    setMuchSmallLine(stepCount, scale, smallLine, trackSize, settings, thumbSize, posLine);
  }
}

function setMuchBigLines(scale: HTMLElement, settings: ISettingsTypes, trackSize: number, stepSize: number, posLine: number): void {
  const coord = settings.type.match('vertical') ? 'top' : 'left';
  const size = settings.type.match('vertical') ? 'height' : 'width';

  const bigLine: HTMLElement = document.createElement('span');
  bigLine.className = 'js-range-slider__big-line range-slider__big-line';
  scale.append(bigLine);
  const bigLineSize = parseFloat(getComputedStyle(bigLine)[size]);

  const bigLineCoord = ((posLine - bigLineSize / 2) / trackSize) * 100;
  if (bigLineCoord >= 100) {
    (scale.querySelector('.js-range-slider__big-line:last-child') as HTMLElement).remove();
    return;
  }
  bigLine.style[coord] = `${toFixed(bigLineCoord)}%`;
  posLine += stepSize;

  setMuchBigLines(scale, settings, trackSize, stepSize, posLine);
}

export function setBigLines(settings: ISettingsTypes, stepCount: number, stepSize: number, trackSize: number, scale: HTMLElement): void {
  const coord = settings.type.match('vertical') ? 'top' : 'left';
  const size = settings.type.match('vertical') ? 'height' : 'width';
  const posLine = 0;
  if (!(stepCount > 50)) {
    setMuchBigLines(scale, settings, trackSize, stepSize, posLine);
  } else {
    const firstBigLine: HTMLElement = document.createElement('span');
    firstBigLine.className = 'js-range-slider__big-line range-slider__big-line';

    const lastBigLine = firstBigLine.cloneNode(true) as HTMLElement;
    scale.append(firstBigLine, lastBigLine);
    const bigLineSize = parseFloat(getComputedStyle(firstBigLine)[size]);

    firstBigLine.style[coord] = `${(0 / trackSize) * 100}%`;
    const secondLineCoord = ((trackSize - bigLineSize / 2) / trackSize) * 100;
    lastBigLine.style[coord] = `${toFixed(secondLineCoord)}%`;
  }
}
