export function validateCoordsByClick(
  movedThumb: HTMLElement,
  trackSize: number,
  firstThumb: HTMLElement,
  secondThumb: HTMLElement,
  isVertical: RegExpMatchArray | null
): void {
  const coord = isVertical ? 'top' : 'left';
  const firstThumbCoord = firstThumb.getBoundingClientRect()[coord];
  const secondThumbCoord = secondThumb.getBoundingClientRect()[coord];

  if (parseFloat(getComputedStyle(movedThumb)[coord]) <= 0) movedThumb.style[coord] = `${0}%`;
  else if (parseFloat(getComputedStyle(movedThumb)[coord]) > trackSize) {
    movedThumb.style[coord] = `${(trackSize / trackSize) * 100}%`;
  }
  if (movedThumb === firstThumb && firstThumbCoord > secondThumbCoord) {
    movedThumb.style[coord] = `${parseFloat(getComputedStyle(secondThumb)[coord])}%`;
  } else if (movedThumb === secondThumb && secondThumbCoord < firstThumbCoord) {
    movedThumb.style[coord] = `${parseFloat(getComputedStyle(firstThumb)[coord])}%`;
  }
}

export function validateCoord(thumb: HTMLElement, trackSize: number, isVertical: RegExpMatchArray | null): void {
  const coord = isVertical ? 'top' : 'left';
  const size = isVertical ? 'height' : 'width';
  const thumbSize = parseFloat(getComputedStyle(thumb)[size]);

  if (parseFloat(getComputedStyle(thumb)[coord]) <= 0) thumb.style[coord] = `${0}%`;
  else if (parseFloat(getComputedStyle(thumb)[coord]) >= trackSize) {
    thumb.style[coord] = `${100}%`;
  }
}

export function validateCoordsByMove(
  targetThumb: HTMLElement,
  targetSecondThumb: HTMLElement | null,
  trackSize: number,
  firstThumb: HTMLElement,
  secondThumb: HTMLElement,
  isVertical: RegExpMatchArray | null
): void {
  const targetSecondThumbCoord = isVertical
    ? (targetSecondThumb as HTMLElement).getBoundingClientRect().top
    : (targetSecondThumb as HTMLElement).getBoundingClientRect().left;
  const targetThumbCoord = isVertical ? targetThumb.getBoundingClientRect().top : targetThumb.getBoundingClientRect().left;
  const coord = isVertical ? 'top' : 'left';
  const hiddenTrack = firstThumb.parentElement;
  const size = isVertical ? 'height' : 'width';
  const hiddenTrackSize = parseFloat(getComputedStyle(hiddenTrack as HTMLElement)[size]);

  if (parseFloat(getComputedStyle(targetThumb)[coord]) <= 0) {
    targetThumb.style[coord] = '0';
  } else if (parseFloat(getComputedStyle(targetThumb)[coord]) >= trackSize) {
    targetThumb.style[coord] = '100%';
  }
  if (targetThumb === firstThumb && targetThumbCoord >= targetSecondThumbCoord) {
    targetThumb.style[coord] = `${(parseFloat(getComputedStyle(secondThumb as HTMLElement)[coord]) / hiddenTrackSize) * 100}%`;
  } else if (targetThumb === secondThumb && targetThumbCoord <= targetSecondThumbCoord) {
    targetThumb.style[coord] = `${(parseFloat(getComputedStyle(firstThumb as HTMLElement)[coord]) / hiddenTrackSize) * 100}%`;
  }
}

export function getValues(
  isVertical: RegExpMatchArray | null,
  e: MouseEvent | TouchEvent
): {
  secondCoord: string;
  track: HTMLElement;
  firstThumb: HTMLElement;
  secondThumb: HTMLElement;
  targetThumb: HTMLElement;
  targetSecondThumb: HTMLElement | null;
  halfSizeThumb: number;
  thumbSize: number;
  trackSize: number;
} {
  const track = (e.target as HTMLElement).closest('.range-slider') as HTMLElement;
  const thumbs = track.querySelectorAll('.range-slider__thumb');
  const targetThumb = (e.target as HTMLElement).closest('.range-slider__thumb') as HTMLElement;

  let targetSecondThumb: HTMLElement | null = null;
  const firstThumb = thumbs[0] as HTMLElement;
  const secondThumb = thumbs[1] as HTMLElement;

  const thumbSize = isVertical ? parseFloat(getComputedStyle(firstThumb).height) : parseFloat(getComputedStyle(firstThumb).width);

  if (targetThumb) {
    if (targetThumb.classList.contains('range-slider__thumb_first')) {
      targetSecondThumb = secondThumb;
    } else {
      targetSecondThumb = firstThumb;
    }
  }

  return {
    secondCoord: isVertical ? 'bottom' : 'right',
    track,
    firstThumb,
    secondThumb,
    targetThumb,
    targetSecondThumb,
    halfSizeThumb: isVertical ? parseFloat(getComputedStyle(firstThumb).height) / 2 : parseFloat(getComputedStyle(firstThumb).width) / 2,
    thumbSize,
    trackSize: isVertical ? parseFloat(getComputedStyle(track).height) - thumbSize : parseFloat(getComputedStyle(track).width) - thumbSize,
  };
}
