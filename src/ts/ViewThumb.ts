/* eslint-disable no-unused-expressions */
import { IsettingsTypes, IThumb } from './globals';

export default class ViewThumb implements IThumb {
  settings: IsettingsTypes;

  el!: HTMLElement;

  thumbPos!: number;

  secondThumbPos!: number;

  constructor(settings: IsettingsTypes) {
    this.settings = settings;
    this.createElem();
  }

  private createElem():void {
    const thumb: HTMLElement = document.createElement('span');
    thumb.className = 'range-slider__thumb range-slider__thumb_first';
    this.el = thumb;
  }

  // -------------------------------------------------------------  events for X type range
  moveSingleType(e: MouseEvent, settings: IsettingsTypes, step: number): void {
    const target = e.target as HTMLElement;

    const track = target.closest('.range-slider') as HTMLElement;
    const thumb = target.closest('.range-slider__thumb') as HTMLElement;
    const inner = track.querySelector('.range-slider__inner') as HTMLElement;
    if (!thumb) return;
    thumb.ondragstart = () => false

    let generalVal =
      settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;
    if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);
    const halfSizeThumb = settings.type.match('vertical')
      ? parseFloat(getComputedStyle(thumb).height) / 2
      : parseFloat(getComputedStyle(thumb).width) / 2;
    const thumbSize: number = settings.type.match('vertical')
      ? parseFloat(getComputedStyle(thumb).height)
      : parseFloat(getComputedStyle(thumb).width);
    const trackWidth: number = settings.type.match('vertical')
      ? parseFloat(getComputedStyle(track).height) - thumbSize
      : parseFloat(getComputedStyle(track).width) - thumbSize;
    const stepCount = generalVal / step;
    const stepSize = trackWidth / stepCount;

    const offset = settings.type.match('vertical') ? 'offsetTop' : 'offsetLeft';
    const coord = settings.type.match('vertical') ? 'top' : 'left';
    const size = settings.type.match('vertical') ? 'height' : 'width';

    function moveAt(pageXorY: number) {
      const newPos = pageXorY - track[offset] - halfSizeThumb;

      const posPercent = Math.round(newPos / stepSize) * stepSize;

      thumb.style[coord] = `${posPercent}px`;
      if (parseFloat(getComputedStyle(thumb)[coord]) <= 0) {
        thumb.style[coord] = `${0}px`;
      } else if (parseFloat(getComputedStyle(thumb)[coord]) >= trackWidth) {
        thumb.style[coord] = `${trackWidth}px`;
      }

      inner.style[size] = `${parseFloat(getComputedStyle(thumb)[coord]) + halfSizeThumb}px`;
    }
    settings.type.match('vertical') ? moveAt(e.pageY) : moveAt(e.pageX);

    function onMouseMove(e: MouseEvent) {
      settings.type.match('vertical') ? moveAt(e.pageY) : moveAt(e.pageX);
    }
    function removeEventListeners() {
      document.removeEventListener('mousemove', onMouseMove);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', removeEventListeners);

    this.thumbPos = parseFloat(getComputedStyle(thumb)[coord])
  }

  moveDoubleType(e: MouseEvent, settings: IsettingsTypes): void {
    const target = e.target as HTMLElement;
    const track = target.closest('.range-slider') as HTMLElement;
    const inner = track.querySelector('.range-slider__inner') as HTMLElement;
    const targetThumb = target.closest('.range-slider__thumb') as HTMLElement;
    if (!targetThumb) return;

    let targetSecondThumb: HTMLElement;
    const firstThumb = track.querySelector('.range-slider__thumb_first') as HTMLElement;
    const secondThumb = track.querySelector('.range-slider__thumb_second') as HTMLElement;

    if (targetThumb.classList.contains('range-slider__thumb_first')) {
      targetSecondThumb = secondThumb;
    } else {
      targetSecondThumb = firstThumb;
    }
    targetThumb.style.zIndex = '100';
    targetSecondThumb.style.zIndex = '50';
    targetThumb.ondragstart = () => false
    let generalVal =
      settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;
    if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);

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
    function moveAt(pageXorY: number): void {
      if (!track) return;
      const newLeft = pageXorY - track[offset] - halfSizeThumb;
      const posPercent = Math.round(newLeft / stepSize) * stepSize;

      // if (settings.type.match('vertical')) {
      targetThumb.style[coord] = `${posPercent}px`;
      /// min position
      if (parseFloat(getComputedStyle(targetThumb)[coord]) <= 0) {
        targetThumb.style[coord] = `${0}px`;
      } else if (parseFloat(getComputedStyle(targetThumb)[coord]) >= trackSize) {
        targetThumb.style[coord] = `${trackSize}px`;
      }

      if (targetThumb === firstThumb && targetThumb[offset] >= targetSecondThumb[offset]) {
        targetThumb.style[coord] = `${parseFloat(getComputedStyle(targetSecondThumb)[coord])}px`;
      } else if (targetThumb === secondThumb && targetThumb[offset] <= targetSecondThumb[offset]) {
        targetThumb.style[coord] = `${parseFloat(getComputedStyle(targetSecondThumb)[coord])}px`;
      }
      inner.style[coord] = `${firstThumb[offset] + firstThumb[offseSize] / 2}px`;
      inner.style[size] = `${
        parseFloat(getComputedStyle(secondThumb)[coord]) -
        parseFloat(getComputedStyle(firstThumb)[coord])
      }px`;
    }
    settings.type.match('vertical') ? moveAt(e.pageY) : moveAt(e.pageX);

    function onMouseMove(e: MouseEvent) {
      settings.type.match('vertical') ? moveAt(e.pageY) : moveAt(e.pageX);
    }
    function removeEventListeners() {
      document.removeEventListener('mousemove', onMouseMove);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', removeEventListeners);

    this.thumbPos = parseFloat(getComputedStyle(firstThumb)[coord])
    this.secondThumbPos = parseFloat(getComputedStyle(secondThumb)[coord])
  }

  onClickSingleType(e: MouseEvent, settings: IsettingsTypes): void {
    const target = e.target as HTMLElement;
    const track = target.closest('.range-slider') as HTMLElement;
    const thumb = track.querySelector('.range-slider__thumb') as HTMLElement;
    const inner = track.querySelector('.range-slider__inner') as HTMLElement;
    // const flag = track.querySelector('.range-slider__flag') as HTMLElement;
    // if (target === flag) return;

    let generalVal =
      settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;
    if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);

    const offsetCoord = settings.type.match('vertical') ? 'offsetTop' : 'offsetLeft';
    const coord = settings.type.match('vertical') ? 'top' : 'left';
    const size = settings.type.match('vertical') ? 'height' : 'width';

    const halfThumb = parseFloat(getComputedStyle(thumb)[size]) / 2;
    const thumbWidth: number = parseFloat(getComputedStyle(thumb)[size]);
    const trackWidth: number = parseFloat(getComputedStyle(track)[size]) - thumbWidth;
    const stepCount = generalVal / settings.step;
    const stepSize = trackWidth / stepCount;

    function moveAt(pageXorY: number) {
      const newLeft = pageXorY - track[offsetCoord] - halfThumb;
      const posPercent = Math.round(newLeft / stepSize) * stepSize;

      thumb.style[coord] = `${posPercent}px`;
      if (parseFloat(getComputedStyle(thumb)[coord]) <= 0) thumb.style[coord] = `${0}px`;
      if (parseFloat(getComputedStyle(thumb)[coord]) > trackWidth) {
        thumb.style[coord] = `${trackWidth}px`;
      }
      inner.style[size] = getComputedStyle(thumb)[coord];
    }
    settings.type.match('vertical') ? moveAt(e.pageY) : moveAt(e.pageX);

    this.thumbPos = parseFloat(getComputedStyle(thumb)[coord])
  }

  onClickDoubleType(e: MouseEvent, settings: IsettingsTypes): void {
    const target = e.target as HTMLElement;
    const track = target.closest('.range-slider') as HTMLElement;
    const inner = track.querySelector('.range-slider__inner') as HTMLElement;
    const clientXorY = settings.type.match('vertical') ? e.clientY : e.clientX
    const thumbs = track.querySelectorAll('.range-slider__thumb');
    const firstThumb = thumbs[0] as HTMLElement;
    const secondThumb = thumbs[1] as HTMLElement;

    const offsetCoord = settings.type.match('vertical') ? 'offsetTop' : 'offsetLeft';
    const offsetSize = settings.type.match('vertical') ? 'offsetHeight' : 'offsetWidth';
    const coord = settings.type.match('vertical') ? 'top' : 'left';
    const size = settings.type.match('vertical') ? 'height' : 'width';

    const firstThumbCoord = settings.type.match('vertical') ? thumbs[0].getBoundingClientRect().bottom : thumbs[0].getBoundingClientRect().right;
    const secondThumbCoord = settings.type.match('vertical') ? thumbs[0].getBoundingClientRect().top : thumbs[0].getBoundingClientRect().left;

    let firstDifference = firstThumbCoord - clientXorY;
    let secondDifference = secondThumbCoord - clientXorY;
    let movedThumb: HTMLElement;
    if (target.closest('.range-slider__thumb')) return;

    if (firstDifference < 0) firstDifference = -firstDifference;
    if (secondDifference < 0) secondDifference = -secondDifference;
    if (firstDifference > secondDifference) movedThumb = thumbs[1] as HTMLElement;
    else movedThumb = thumbs[0] as HTMLElement;

    let generalVal =
      settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;
    if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);

    const halfThumb = parseFloat(getComputedStyle(movedThumb)[size]) / 2;
    const thumbSize: number = parseFloat(getComputedStyle(movedThumb)[size]);
    const trackSize: number = parseFloat(getComputedStyle(track)[size]) - thumbSize;
    const stepCount = generalVal / settings.step;
    const stepSize = trackSize / stepCount;

    function moveAt(pageXorY: number) {
      const newLeft = pageXorY - track[offsetCoord] - halfThumb;
      const posPercent = Math.round(newLeft / stepSize) * stepSize;

      movedThumb.style[coord] = `${posPercent}px`;
      if (parseFloat(getComputedStyle(movedThumb)[coord]) <= 0) movedThumb.style[coord] = `${0}px`;
      if (parseFloat(getComputedStyle(movedThumb)[coord]) > trackSize) {
        movedThumb.style[coord] = `${trackSize}px`;
      }
      if (movedThumb === firstThumb && firstThumb[offsetCoord] >= secondThumb[offsetCoord]) {
        movedThumb.style[coord] = `${parseFloat(getComputedStyle(secondThumb)[coord])}px`;
      } else if (
        movedThumb === secondThumb &&
        secondThumb[offsetCoord] <= firstThumb[offsetCoord]
      ) {
        movedThumb.style[coord] = `${parseFloat(getComputedStyle(firstThumb)[coord])}px`;
      }

      inner.style[coord] = `${firstThumb[offsetCoord] + firstThumb[offsetSize] / 2}px`;
      inner.style[size] = `${
        parseFloat(getComputedStyle(secondThumb)[coord]) -
        parseFloat(getComputedStyle(firstThumb)[coord])
      }px`;
    }

    settings.type.match('vertical') ? moveAt(e.pageY) : moveAt(e.pageX);

    this.thumbPos = parseFloat(getComputedStyle( thumbs[0])[coord]);
    this.secondThumbPos = parseFloat(getComputedStyle( thumbs[1])[coord]);
  }
}
