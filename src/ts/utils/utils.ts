/* eslint-disable no-param-reassign */
export function validateCoordsByClick(movedThumb: HTMLElement, trackSize: number, firstThumb: HTMLElement, secondThumb:HTMLElement, isVertical:RegExpMatchArray | null): void {
  const firstThumbCoord = isVertical ? firstThumb.getBoundingClientRect().top : firstThumb.getBoundingClientRect().left;
  const secondThumbCoord = isVertical ? secondThumb.getBoundingClientRect().top : secondThumb.getBoundingClientRect().left;
  const coord = isVertical ? 'top' : 'left';

  if (parseFloat(getComputedStyle(movedThumb)[coord]) <= 0) movedThumb.style[coord] = `${0}px`;
  else if (parseFloat(getComputedStyle(movedThumb)[coord]) > trackSize) {
    movedThumb.style[coord] = `${trackSize}px`;
  }
  if (movedThumb === firstThumb && firstThumbCoord > secondThumbCoord) {
    movedThumb.style[coord] = `${parseFloat(getComputedStyle(secondThumb)[coord])}px`;
  } else if (
    movedThumb === secondThumb && secondThumbCoord < firstThumbCoord) {
    movedThumb.style[coord] = `${parseFloat(getComputedStyle(firstThumb)[coord])}px`;
  }
}

export function validateCoord(thumb: HTMLElement, trackSize: number, isVertical:RegExpMatchArray | null): void {
  const coord = isVertical ? 'top' : 'left';
  if (parseFloat(getComputedStyle(thumb)[coord]) <= 0) thumb.style[coord] = `${0}px`;
  else if (parseFloat(getComputedStyle(thumb)[coord]) > trackSize) {
    thumb.style[coord] = `${trackSize}px`;
  }
}

export function validateCoordsByMove(targetThumb: HTMLElement,
  targetSecondThumb: HTMLElement,
  trackSize: number, firstThumb:
  HTMLElement,
  secondThumb:HTMLElement,
  isVertical:RegExpMatchArray | null): void {
  const targetSecondThumbCoord = isVertical ? targetSecondThumb.getBoundingClientRect().top : targetSecondThumb.getBoundingClientRect().left;
  const targetThumbCoord = isVertical ? targetThumb.getBoundingClientRect().top : targetThumb.getBoundingClientRect().left;
  const coord = isVertical ? 'top' : 'left';
  if (parseFloat(getComputedStyle(targetThumb)[coord]) <= 0) {
    targetThumb.style[coord] = `${0}px`;
  } else if (parseFloat(getComputedStyle(targetThumb)[coord]) >= trackSize) {
    targetThumb.style[coord] = `${trackSize}px`;
  }

  if (targetThumb === firstThumb && targetThumbCoord >= targetSecondThumbCoord) {
    targetThumb.style[coord] = `${parseFloat(getComputedStyle(targetSecondThumb)[coord])}px`;
  } else if (targetThumb === secondThumb && targetThumbCoord <= targetSecondThumbCoord) {
    targetThumb.style[coord] = `${parseFloat(getComputedStyle(targetSecondThumb)[coord])}px`;
  }
}

export function getSizes(thumb: HTMLElement, track: HTMLElement, isVertical: RegExpMatchArray | null): {trackSize: number; halfSizeThumb: number, thumbSize: number} {
  const halfSizeThumb = isVertical
    ? parseFloat(getComputedStyle(thumb).height) / 2
    : parseFloat(getComputedStyle(thumb).width) / 2;
  const thumbSize: number = isVertical
    ? parseFloat(getComputedStyle(thumb).height)
    : parseFloat(getComputedStyle(thumb).width);
  const trackSize: number = isVertical
    ? parseFloat(getComputedStyle(track).height) - thumbSize
    : parseFloat(getComputedStyle(track).width) - thumbSize;

  return {
    trackSize,
    halfSizeThumb,
    thumbSize,
  }
}
