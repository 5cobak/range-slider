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
  stepSize: number
): void {
  const coord = settings.type.match('vertical') ? 'top' : 'left';
  const size = settings.type.match('vertical') ? 'height' : 'width';
  let posLine = 0;
  for (let i = 0; i <= stepCount * 3; i += 1) {
    const smallLineClone = smallLine.cloneNode(true) as HTMLElement;
    scale.append(smallLineClone);
    smallLineClone.style.display = 'none';
    const smallLineSize = parseFloat(getComputedStyle(smallLineClone as HTMLElement)[size]);
    const smallLineCoord = ((posLine - smallLineSize / 2) / trackSize) * 100;
    const excessLinePos = posLine - smallLineSize / 2;
    if (excessLinePos >= trackSize) break;
    smallLineClone.style.display = 'block';
    (smallLineClone as HTMLElement).style[coord] = `${toFixed(smallLineCoord)}%`;
    posLine += stepSize / 2;
  }
}
function setMuchSmallLine(
  stepCount: number,
  scale: HTMLElement,
  smallLine: HTMLElement,
  trackSize: number,
  settings: ISettingsTypes,
  thumbSize: number
): void {
  const coord = settings.type.match('vertical') ? 'top' : 'left';
  const size = settings.type.match('vertical') ? 'height' : 'width';
  let posLine = 0;
  for (let i = 0; i <= stepCount; i += 1) {
    const smallLineClone = smallLine.cloneNode(true);

    scale.append(smallLineClone);
    const smallLineSize = parseFloat(getComputedStyle(smallLineClone as HTMLElement)[size]);

    const smallLineCoord = (posLine / trackSize) * 100;
    const excessLinePos = posLine - smallLineSize / 2;

    if (excessLinePos >= trackSize) {
      break;
    }

    (smallLineClone as HTMLElement).style[coord] = `${smallLineCoord}%`;
    posLine += thumbSize / 2 - smallLineSize / 2;
  }

  scale.removeChild(scale.lastChild as Node);
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
  scale.innerHTML = '';
  if (!(stepCount > 50)) {
    setFewSmallLine(stepCount, scale, smallLine, trackSize, settings, stepSize);
  } else {
    setMuchSmallLine(stepCount, scale, smallLine, trackSize, settings, thumbSize);
  }
}

function setMuchBigLines(stepCount: number, scale: HTMLElement, settings: ISettingsTypes, trackSize: number, stepSize: number): void {
  const coord = settings.type.match('vertical') ? 'top' : 'left';
  const size = settings.type.match('vertical') ? 'height' : 'width';
  let posLine = 0;
  for (let i = 0; i <= stepCount; i += 1) {
    const bigLine: HTMLElement = document.createElement('span');
    bigLine.className = 'js-range-slider__big-line range-slider__big-line';
    scale.append(bigLine);
    const bigLineSize = parseFloat(getComputedStyle(bigLine)[size]);

    const bigLineCoord = ((posLine - bigLineSize / 2) / trackSize) * 100;
    bigLine.style[coord] = `${toFixed(bigLineCoord)}%`;
    posLine += stepSize;
  }
}

export function setBigLines(settings: ISettingsTypes, stepCount: number, stepSize: number, trackSize: number, scale: HTMLElement): void {
  const coord = settings.type.match('vertical') ? 'top' : 'left';
  const size = settings.type.match('vertical') ? 'height' : 'width';
  if (!(stepCount > 50)) {
    setMuchBigLines(stepCount, scale, settings, trackSize, stepSize);
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
