/// <reference path="globals.d.ts" />

export default class ViewThumb implements IClassProperties {
  settings: IsettingsTypes;
  el: HTMLElement;
  constructor(settings: IsettingsTypes) {
    this.settings = settings;
    this.el = this.createElem();
  }

  private createElem(): HTMLElement {
    const thumb: HTMLElement = document.createElement('span');
    thumb.className = 'range-slider__thumb range-slider__thumb_first';
    return thumb;
  }

  // -------------------------------------------------------------  events for X type range
  moveSingleType(e: MouseEvent, settings: IsettingsTypes, step: number): void {
    const target = e.target as HTMLElement;

    const track = target.closest('.range-slider') as HTMLElement;
    const thumb = target.closest('.range-slider__thumb') as HTMLElement;
    const inner = track.querySelector('.range-slider__inner') as HTMLElement;
    if (!thumb) return;
    thumb.ondragstart = function (): boolean {
      return false;
    };

    let generalVal =
      settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;
    if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);
    const halfSizeThumb = settings.type.match('vertical')
      ? parseInt(getComputedStyle(thumb).height) / 2
      : parseInt(getComputedStyle(thumb).width) / 2;
    const thumbSize: number = settings.type.match('vertical')
      ? parseInt(getComputedStyle(thumb).height)
      : parseInt(getComputedStyle(thumb).width);
    let trackWidth: number = settings.type.match('vertical')
      ? parseInt(getComputedStyle(track).height) - thumbSize
      : parseInt(getComputedStyle(track).width) - thumbSize;
    const stepCount = generalVal / step;
    let stepSize = +(trackWidth / stepCount).toFixed(5);
    settings.type.match('vertical') ? moveAt(e.pageY) : moveAt(e.pageX);

    const offset = settings.type.match('vertical') ? 'offsetTop' : 'offsetLeft';
    const offsetSize = settings.type.match('vertical') ? 'offsetHeight' : 'offsetWidth';
    const coord = settings.type.match('vertical') ? 'top' : 'left';
    const size = settings.type.match('vertical') ? 'height' : 'width';

    function moveAt(pageXorY: number) {
      let newPos = pageXorY - track[offset] - halfSizeThumb;

      let posPercent = Math.round(newPos / stepSize) * stepSize;

      thumb.style[coord] = `${posPercent}px`;
      if (parseInt(getComputedStyle(thumb)[coord]) <= 0) {
        thumb.style[coord] = `${0}px`;
      } else if (parseInt(getComputedStyle(thumb)[coord]) >= trackWidth) {
        thumb.style[coord] = `${trackWidth}px`;
      }

      inner.style[size] = `${parseInt(getComputedStyle(thumb)[coord]) + halfSizeThumb}px`;
    }
    function onMouseMove(e: MouseEvent) {
      settings.type.match('vertical') ? moveAt(e.pageY) : moveAt(e.pageX);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', onMouseMove);
    });
  }

  moveDoubleType(e: MouseEvent, settings: IsettingsTypes) {
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
    targetThumb.ondragstart = function (): boolean {
      return false;
    };
    let generalVal =
      settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;
    if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);

    const halfSizeThumb = settings.type.match('vertical')
      ? parseInt(getComputedStyle(targetThumb).height) / 2
      : parseInt(getComputedStyle(targetThumb).width) / 2;
    const thumbSize: number = settings.type.match('vertical')
      ? parseInt(getComputedStyle(targetThumb).height)
      : parseInt(getComputedStyle(targetThumb).width);
    let trackSize: number = settings.type.match('vertical')
      ? parseInt(getComputedStyle(track).height) - thumbSize
      : parseInt(getComputedStyle(track).width) - thumbSize;
    const stepCount = generalVal / settings.step;

    let stepSize = +(trackSize / stepCount).toFixed(5);
    const offset = settings.type.match('vertical') ? 'offsetTop' : 'offsetLeft';
    const offseSize = settings.type.match('vertical') ? 'offsetHeight' : 'offsetWidth';
    const coord = settings.type.match('vertical') ? 'top' : 'left';
    const size = settings.type.match('vertical') ? 'height' : 'width';
    function moveAt(pageXorY: number): void {
      if (!track) return;
      let newLeft = pageXorY - track[offset] - halfSizeThumb;
      let posPercent = Math.round(newLeft / stepSize) * stepSize;

      // if (settings.type.match('vertical')) {
      targetThumb.style[coord] = `${posPercent}px`;
      /// min position
      if (parseInt(getComputedStyle(targetThumb)[coord]) <= -halfSizeThumb) {
        targetThumb.style[coord] = `${0}px`;
      } else if (parseInt(getComputedStyle(targetThumb)[coord]) >= trackSize) {
        targetThumb.style[coord] = `${trackSize}px`;
      }

      if (targetThumb === firstThumb && targetThumb[offset] >= targetSecondThumb[offset]) {
        targetThumb.style[coord] = `${parseInt(getComputedStyle(targetSecondThumb)[coord])}px`;
      } else if (targetThumb === secondThumb && targetThumb[offset] <= targetSecondThumb[offset]) {
        targetThumb.style[coord] = `${parseInt(getComputedStyle(targetSecondThumb)[coord])}px`;
      }
      inner.style[coord] = `${firstThumb[offset] + firstThumb[offseSize] / 2}px`;
      inner.style[size] = `${
        parseInt(getComputedStyle(secondThumb)[coord]) -
        parseInt(getComputedStyle(firstThumb)[coord])
      }px`;
    }
    settings.type.match('vertical') ? moveAt(e.pageY) : moveAt(e.pageX);
    function onMouseMove(e: MouseEvent) {
      settings.type.match('vertical') ? moveAt(e.pageY) : moveAt(e.pageX);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', (e) => {
      document.removeEventListener('mousemove', onMouseMove);
    });
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
    const offseSize = settings.type.match('vertical') ? 'offsetHeight' : 'offsetWidth';
    const coord = settings.type.match('vertical') ? 'top' : 'left';
    const size = settings.type.match('vertical') ? 'height' : 'width';

    const halfThumb = parseInt(getComputedStyle(thumb)[size]) / 2;
    const thumbWidth: number = parseInt(getComputedStyle(thumb)[size]);
    let trackWidth: number = parseInt(getComputedStyle(track)[size]) - thumbWidth;
    const stepCount = generalVal / settings.step;
    let stepSize = +(trackWidth / stepCount).toFixed(5);

    settings.type.match('vertical') ? moveAt(e.pageY) : moveAt(e.pageX);
    function setCurrentValue(pos: number, stepSize: number, step: number) {
      const currentVal = settings.min + (Math.round(pos / stepSize) * (step * 10)) / 10;
      return currentVal;
    }
    function moveAt(pageXorY: number) {
      let newLeft = pageXorY - track[offsetCoord] - halfThumb;
      let posPercent = Math.round(newLeft / stepSize) * stepSize;

      thumb.style[coord] = posPercent + 'px';
      if (parseInt(getComputedStyle(thumb)[coord]) <= 0) thumb.style[coord] = `${0}px`;
      if (parseInt(getComputedStyle(thumb)[coord]) > trackWidth) {
        thumb.style[coord] = `${trackWidth}px`;
      }
      inner.style[size] = getComputedStyle(thumb)[coord];
    }
  }

  onClickDoubleType(e: MouseEvent, settings: IsettingsTypes): void {
    const target = e.target as HTMLElement;
    const track = target.closest('.range-slider') as HTMLElement;
    const inner = track.querySelector('.range-slider__inner') as HTMLElement;
    const clientX = e.clientX;
    const thumbs = track.querySelectorAll('.range-slider__thumb');
    const firstThumb = thumbs[0] as HTMLElement;
    const secondThumb = thumbs[1] as HTMLElement;

    let firstDifference = thumbs[0].getBoundingClientRect().right - clientX;
    let secondDifference = thumbs[1].getBoundingClientRect().left - clientX;
    let movedThumb: HTMLElement;
    if (target.closest('.range-slider__thumb')) return;

    if (firstDifference < 0) firstDifference = -firstDifference;
    if (secondDifference < 0) secondDifference = -secondDifference;
    if (firstDifference > secondDifference) movedThumb = thumbs[1] as HTMLElement;
    else movedThumb = thumbs[0] as HTMLElement;

    let generalVal =
      settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;
    if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);

    const offsetCoord = settings.type.match('vertical') ? 'offsetTop' : 'offsetLeft';
    const offsetSize = settings.type.match('vertical') ? 'offsetHeight' : 'offsetWidth';
    const coord = settings.type.match('vertical') ? 'top' : 'left';
    const size = settings.type.match('vertical') ? 'height' : 'width';

    const halfThumb = parseInt(getComputedStyle(movedThumb)[size]) / 2;
    const thumbSize: number = parseInt(getComputedStyle(movedThumb)[size]);
    let trackSize: number = parseInt(getComputedStyle(track)[size]) - thumbSize;
    const stepCount = generalVal / settings.step;
    let stepSize = +(trackSize / stepCount).toFixed(5);

    settings.type.match('vertical') ? moveAt(e.pageY) : moveAt(e.pageX);

    function moveAt(pageX: number) {
      let newLeft = pageX - track[offsetCoord] - halfThumb;
      let posPercent = Math.round(newLeft / stepSize) * stepSize;

      movedThumb.style[coord] = `${posPercent}px`;
      if (parseInt(getComputedStyle(movedThumb)[coord]) <= 0) movedThumb.style[coord] = `${0}px`;
      if (parseInt(getComputedStyle(movedThumb)[coord]) > trackSize) {
        movedThumb.style[coord] = `${trackSize}px`;
      }
      if (movedThumb === firstThumb && firstThumb[offsetCoord] >= secondThumb[offsetCoord]) {
        movedThumb.style[coord] = `${parseInt(getComputedStyle(secondThumb)[coord])}px`;
      } else if (
        movedThumb === secondThumb &&
        secondThumb[offsetCoord] <= firstThumb[offsetCoord]
      ) {
        movedThumb.style[coord] = `${parseInt(getComputedStyle(firstThumb)[coord])}px`;
      }

      inner.style[coord] = `${firstThumb[offsetCoord] + firstThumb[offsetSize] / 2}px`;
      inner.style[size] = `${
        parseInt(getComputedStyle(secondThumb)[coord]) -
        parseInt(getComputedStyle(firstThumb)[coord])
      }px`;
    }
  }
}
