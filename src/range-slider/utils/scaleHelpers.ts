import { IsettingsTypes } from '../globals.d';

function toFixed(num: number) {
  num = Number(num.toFixed(20));
  return num;
}

export function getValues(
  settings: IsettingsTypes,
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
  const thumb = track.querySelector('.range-slider__thumb') as HTMLElement;
  const size = settings.type.match('vertical') ? 'height' : 'width';
  const coord = settings.type.match('vertical') ? 'top' : 'left';
  const thumbSize = parseFloat(getComputedStyle(thumb)[size]);
  const isVertical = settings.type.match('vertical');
  const trackSize: number = parseFloat(getComputedStyle(track)[size]) - thumbSize;
  const scaleEl = track.querySelector('.range-slider__scale') as HTMLElement;
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

export function setSmallLines(
  settings: IsettingsTypes,
  stepCount: number,
  posCountSmallPercent: number,
  trackSize: number,
  thumbSize: number,
  stepSize: number,
  smallLine: HTMLElement,
  scale: HTMLElement
): void {
  const coord = settings.type.match('vertical') ? 'top' : 'left';
  const size = settings.type.match('vertical') ? 'height' : 'width';
  scale.innerHTML = '';
  if (!(stepCount > 50)) {
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
    // if (scale.querySelector('.range-slider__small-line')) scale.removeChild(smallLine);
  } else {
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
}

export function setBigLines(
  settings: IsettingsTypes,
  stepCount: number,
  posCountBig: number,
  stepSize: number,
  trackSize: number,
  scale: HTMLElement
): void {
  const coord = settings.type.match('vertical') ? 'top' : 'left';
  const size = settings.type.match('vertical') ? 'height' : 'width';

  if (!(stepCount > 50)) {
    let posLine = 0;
    for (let i = 0; i <= stepCount; i += 1) {
      const bigLine: HTMLElement = document.createElement('span');
      bigLine.className = 'range-slider__big-line';
      scale.append(bigLine);
      const bigLineSize = parseFloat(getComputedStyle(bigLine)[size]);

      const bigLineCoord = ((posLine - bigLineSize / 2) / trackSize) * 100;
      bigLine.style[coord] = `${toFixed(bigLineCoord)}%`;
      posLine += stepSize;
    }
  } else {
    const firstBigLine: HTMLElement = document.createElement('span');
    firstBigLine.className = 'range-slider__big-line';

    const lastBigLine = firstBigLine.cloneNode(true) as HTMLElement;
    scale.append(firstBigLine, lastBigLine);
    const bigLineSize = parseFloat(getComputedStyle(firstBigLine)[size]);

    firstBigLine.style[coord] = `${(0 / trackSize) * 100}%`;
    const secondLineCoord = ((trackSize - bigLineSize / 2) / trackSize) * 100;
    lastBigLine.style[coord] = `${toFixed(secondLineCoord)}%`;
  }
}
