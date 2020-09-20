/* eslint-disable no-unused-expressions */
import { IsettingsTypes, IThumb } from './globals';

export default class ViewThumb implements IThumb {
  el!: HTMLElement;

  thumbPos!: number;

  secondThumbPos!: number;

  constructor() {
    this.createElem();
  }

  private createElem():void {
    const thumb: HTMLElement = document.createElement('span');
    thumb.className = 'range-slider__thumb range-slider__thumb_first';
    this.el = thumb;
  }

  // -------------------------------------------------------------  events for X type range
  moveSingleType(e: MouseEvent, settings: IsettingsTypes, generalVal: number): void {
    const target = e.target as HTMLElement;
    const isVertical = settings.type.match('vertical');
    const track = target.closest('.range-slider') as HTMLElement;
    const thumb = target.closest('.range-slider__thumb') as HTMLElement;
    const inner = track.querySelector('.range-slider__inner') as HTMLElement;
    const clientCoord = isVertical ? 'clientY' : 'clientX';
    if (!thumb) return;

    const halfSizeThumb = settings.type.match('vertical')
      ? parseFloat(getComputedStyle(thumb).height) / 2
      : parseFloat(getComputedStyle(thumb).width) / 2;
    const thumbSize: number = settings.type.match('vertical')
      ? parseFloat(getComputedStyle(thumb).height)
      : parseFloat(getComputedStyle(thumb).width);
    const trackWidth: number = settings.type.match('vertical')
      ? parseFloat(getComputedStyle(track).height) - thumbSize
      : parseFloat(getComputedStyle(track).width) - thumbSize;
    const stepCount = generalVal / settings.step;
    const stepSize = trackWidth / stepCount;

    const coord = settings.type.match('vertical') ? 'top' : 'left';
    const size = settings.type.match('vertical') ? 'height' : 'width';

    function moveAt(pageXorY: number) {
      const trackCoord = track.getBoundingClientRect()[coord];
      const newPos = pageXorY - trackCoord - halfSizeThumb;

      const posPercent = Math.round(newPos / stepSize) * stepSize;

      thumb.style[coord] = `${posPercent}px`;

      if (parseFloat(getComputedStyle(thumb)[coord]) <= 0) {
        thumb.style[coord] = `${0}px`;
      } else if (parseFloat(getComputedStyle(thumb)[coord]) >= trackWidth) {
        thumb.style[coord] = `${trackWidth}px`;
      }

      inner.style[size] = `${parseFloat(getComputedStyle(thumb)[coord]) + halfSizeThumb}px`;
    }
    moveAt(e[clientCoord])

    function onMouseMove(e: MouseEvent) {
      moveAt(e[clientCoord])
    }
    function removeEventListeners() {
      document.removeEventListener('mousemove', onMouseMove);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', removeEventListeners);
  }

  moveDoubleType(e: MouseEvent, settings: IsettingsTypes, generalVal: number): void {
    const isVertical = settings.type.match('vertical');
    const target = e.target as HTMLElement;
    const track = target.closest('.range-slider') as HTMLElement;
    const inner = track.querySelector('.range-slider__inner') as HTMLElement;
    const targetThumb = target.closest('.range-slider__thumb') as HTMLElement;

    let targetSecondThumb: HTMLElement;
    const firstThumb = track.querySelector('.range-slider__thumb_first') as HTMLElement;
    const secondThumb = track.querySelector('.range-slider__thumb_second') as HTMLElement;

    if (!targetThumb) return;

    if (targetThumb.classList.contains('range-slider__thumb_first')) {
      targetSecondThumb = secondThumb;
    } else {
      targetSecondThumb = firstThumb;
    }
    targetThumb.style.zIndex = '100';
    targetSecondThumb.style.zIndex = '50';

    const halfSizeThumb = settings.type.match('vertical')
      ? parseFloat(getComputedStyle(targetThumb).height) / 2
      : parseFloat(getComputedStyle(targetThumb).width) / 2;
    const thumbSize: number = settings.type.match('vertical')
      ? parseFloat(getComputedStyle(targetThumb).height)
      : parseFloat(getComputedStyle(targetThumb).width);
    const trackSize: number = settings.type.match('vertical')
      ? parseFloat(getComputedStyle(track).height) - thumbSize
      : parseFloat(getComputedStyle(track).width) - thumbSize;
    const stepCount = generalVal / settings.step;

    const stepSize = trackSize / stepCount;
    const offset = settings.type.match('vertical') ? 'offsetTop' : 'offsetLeft';
    const offseSize = settings.type.match('vertical') ? 'offsetHeight' : 'offsetWidth';
    const coord = settings.type.match('vertical') ? 'top' : 'left';
    const size = settings.type.match('vertical') ? 'height' : 'width';
    const clientCoord = isVertical ? 'clientY' : 'clientX';
    function moveAt(pageXorY: number): void {
      const trackCoord = isVertical ? track.getBoundingClientRect().top : track.getBoundingClientRect().left;

      const newLeft = pageXorY - trackCoord - halfSizeThumb;
      const posPercent = Math.round(newLeft / stepSize) * stepSize;

      targetThumb.style[coord] = `${posPercent}px`;
      const targetThumbCoord = isVertical ? targetThumb.getBoundingClientRect().top : targetThumb.getBoundingClientRect().left;
      const targetSecondThumbCoord = isVertical ? targetSecondThumb.getBoundingClientRect().top : targetSecondThumb.getBoundingClientRect().left;
      /// min position
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

      inner.style[coord] = `${firstThumb[offset] + firstThumb[offseSize] / 2}px`;
      inner.style[size] = `${
        parseFloat(getComputedStyle(secondThumb)[coord]) -
        parseFloat(getComputedStyle(firstThumb)[coord])
      }px`;
    }
    moveAt(e[clientCoord])

    function onMouseMove(e: MouseEvent) {
      moveAt(e[clientCoord]);
    }
    function removeEventListeners() {
      document.removeEventListener('mousemove', onMouseMove);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', removeEventListeners);
  }

  onClickSingleType(e: MouseEvent, settings: IsettingsTypes, generalVal: number): void {
    const isVertical = settings.type.match('vertical');
    const target = e.target as HTMLElement;
    const track = target.closest('.range-slider') as HTMLElement;
    const thumb = track.querySelector('.range-slider__thumb') as HTMLElement;
    const inner = track.querySelector('.range-slider__inner') as HTMLElement;
    const clientCoord = isVertical ? 'clientY' : 'clientX';

    const coord = settings.type.match('vertical') ? 'top' : 'left';
    const size = settings.type.match('vertical') ? 'height' : 'width';

    const halfThumb = parseFloat(getComputedStyle(thumb)[size]) / 2;
    const thumbWidth: number = parseFloat(getComputedStyle(thumb)[size]);
    const trackWidth: number = parseFloat(getComputedStyle(track)[size]) - thumbWidth;
    const stepCount = generalVal / settings.step;
    const stepSize = trackWidth / stepCount;

    function moveAt(clientXorY: number) {
      const trackCoord = track.getBoundingClientRect()[coord];
      const newLeft = clientXorY - trackCoord - halfThumb;
      const posPercent = Math.round(newLeft / stepSize) * stepSize;

      thumb.style[coord] = `${posPercent}px`;
      if (parseFloat(getComputedStyle(thumb)[coord]) <= 0) thumb.style[coord] = `${0}px`;
      if (parseFloat(getComputedStyle(thumb)[coord]) > trackWidth) {
        thumb.style[coord] = `${trackWidth}px`;
      }

      inner.style[size] = getComputedStyle(thumb)[coord];
    }
    moveAt(e[clientCoord])
  }

  onClickDoubleType(e: MouseEvent, settings: IsettingsTypes, generalVal: number): void {
    const isVertical = settings.type.match('vertical');
    const target = e.target as HTMLElement;
    const track = target.closest('.range-slider') as HTMLElement;
    const inner = track.querySelector('.range-slider__inner') as HTMLElement;
    const clientCoord = isVertical ? 'clientY' : 'clientX';
    const thumbs = track.querySelectorAll('.range-slider__thumb');
    const firstThumb = thumbs[0] as HTMLElement;
    const secondThumb = thumbs[1] as HTMLElement;

    const offsetCoord = isVertical ? 'offsetTop' : 'offsetLeft';
    const offsetSize = isVertical ? 'offsetHeight' : 'offsetWidth';
    const coord = isVertical ? 'top' : 'left';
    const size = isVertical ? 'height' : 'width';

    let firstDifference: number;
    let secondDifference: number;

    firstDifference = thumbs[0].getBoundingClientRect()[coord] - e[clientCoord];
    secondDifference = thumbs[1].getBoundingClientRect()[coord] - e[clientCoord];

    let movedThumb: HTMLElement;
    // if (target.closest('.range-slider__thumb')) return;

    if (firstDifference < 0) firstDifference = -firstDifference;
    if (secondDifference < 0) secondDifference = -secondDifference;
    if (firstDifference > secondDifference) movedThumb = thumbs[1] as HTMLElement;
    else movedThumb = thumbs[0] as HTMLElement;

    const halfThumb = parseFloat(getComputedStyle(movedThumb)[size]) / 2;
    const thumbSize: number = parseFloat(getComputedStyle(movedThumb)[size]);
    const trackSize: number = parseFloat(getComputedStyle(track)[size]) - thumbSize;
    const stepCount = generalVal / settings.step;
    const stepSize = trackSize / stepCount;

    function moveAt(pageX: number) {
      const trackCoord = isVertical ? track.getBoundingClientRect().top : track.getBoundingClientRect().left;

      const newLeft = pageX - trackCoord - halfThumb;
      const posPercent = Math.round(newLeft / stepSize) * stepSize;

      movedThumb.style[coord] = `${posPercent}px`;
      const firstThumbCoord = isVertical ? firstThumb.getBoundingClientRect().top : firstThumb.getBoundingClientRect().left;
      const secondThumbCoord = isVertical ? secondThumb.getBoundingClientRect().top : secondThumb.getBoundingClientRect().left;

      if (parseFloat(getComputedStyle(movedThumb)[coord]) <= 0) movedThumb.style[coord] = `${0}px`;
      if (parseFloat(getComputedStyle(movedThumb)[coord]) > trackSize) {
        movedThumb.style[coord] = `${trackSize}px`;
      }
      if (movedThumb === firstThumb && firstThumbCoord >= secondThumbCoord) {
        movedThumb.style[coord] = `${parseFloat(getComputedStyle(secondThumb)[coord])}px`;
      } else if (
        movedThumb === secondThumb &&
        secondThumbCoord <= firstThumbCoord
      ) {
        movedThumb.style[coord] = `${parseFloat(getComputedStyle(firstThumb)[coord])}px`;
      }

      inner.style[coord] = `${firstThumb[offsetCoord] + firstThumb[offsetSize] / 2}px`;
      inner.style[size] = `${
        parseFloat(getComputedStyle(secondThumb)[coord]) -
        parseFloat(getComputedStyle(firstThumb)[coord])
      }px`;
    }

    moveAt(e[clientCoord])
  }
}
