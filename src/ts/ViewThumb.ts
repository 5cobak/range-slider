/* eslint-disable no-unused-expressions */
import { IObserver, IsettingsTypes, IThumb, Iposition } from './globals';
import MakeObservableSubject from './Observer';

import { getSizes, validateCoordsByClick, validateCoord, validateCoordsByMove } from './utils/utils'

export default class ViewThumb implements IThumb {
  el!: HTMLElement;

  positions!: Iposition;

  changedSubject!: IObserver;

  isVertical: RegExpMatchArray | null;

  constructor(settings: IsettingsTypes) {
    this.createElem();
    this.changedSubject = new MakeObservableSubject();
    this.isVertical = settings.type.match('vertical');
    this.positions = {
      to: 0,
      from: 0,
    }
  }

  private createElem():void {
    const thumb: HTMLElement = document.createElement('span');
    thumb.className = 'range-slider__thumb range-slider__thumb_first';
    this.el = thumb;
  }

  // -------------------------------------------------------------  events for X type range
  moveSingleType(e: MouseEvent, settings: IsettingsTypes, generalVal: number): void {
    const { changedSubject, positions, isVertical } = this;
    const target = e.target as HTMLElement;
    const track = target.closest('.range-slider') as HTMLElement;
    const thumb = target.closest('.range-slider__thumb') as HTMLElement;
    const clientCoord = isVertical ? 'clientY' : 'clientX';
    if (!thumb) return;
    const { trackSize, halfSizeThumb } = getSizes(thumb, track, isVertical);
    const stepCount = generalVal / settings.step;
    const stepSize = trackSize / stepCount;

    const coord = settings.type.match('vertical') ? 'top' : 'left';

    function moveAt(pageXorY: number) {
      const trackCoord = track.getBoundingClientRect()[coord];
      const newPos = pageXorY - trackCoord - halfSizeThumb;

      const posPercent = Math.round(newPos / stepSize) * stepSize;

      thumb.style[coord] = `${posPercent}px`;

      validateCoord(thumb, trackSize, isVertical)

      positions.from = parseFloat(thumb.style[coord]);

      changedSubject.notifyObservers();
    }

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
    const { changedSubject, positions, isVertical } = this;
    const target = e.target as HTMLElement;
    const track = target.closest('.range-slider') as HTMLElement;
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

    const { trackSize, halfSizeThumb } = getSizes(targetThumb, track, isVertical)

    const stepCount = generalVal / settings.step;

    const stepSize = trackSize / stepCount;
    const coord = isVertical ? 'top' : 'left';
    const clientCoord = isVertical ? 'clientY' : 'clientX';

    function moveAt(pageXorY: number): void {
      const trackCoord = isVertical ? track.getBoundingClientRect().top : track.getBoundingClientRect().left;

      const newLeft = pageXorY - trackCoord - halfSizeThumb;
      const posPercent = Math.round(newLeft / stepSize) * stepSize;

      targetThumb.style[coord] = `${posPercent}px`;

      validateCoordsByMove(targetThumb, targetSecondThumb, trackSize, firstThumb, secondThumb, isVertical)

      positions.from = parseFloat(firstThumb.style[coord])
      positions.to = parseFloat(secondThumb.style[coord]);

      changedSubject.notifyObservers();
    }

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
    const { changedSubject, positions, isVertical } = this;

    const target = e.target as HTMLElement;
    const track = target.closest('.range-slider') as HTMLElement;
    const thumb = track.querySelector('.range-slider__thumb') as HTMLElement;
    const clientCoord = isVertical ? 'clientY' : 'clientX';

    const coord = settings.type.match('vertical') ? 'top' : 'left';
    const size = settings.type.match('vertical') ? 'height' : 'width';

    const halfThumb = parseFloat(getComputedStyle(thumb)[size]) / 2;
    const { trackSize } = getSizes(thumb, track, isVertical)
    const stepCount = generalVal / settings.step;
    const stepSize = trackSize / stepCount;

    function moveAt(clientXorY: number) {
      const trackCoord = track.getBoundingClientRect()[coord];
      const newLeft = clientXorY - trackCoord - halfThumb;
      const posPercent = Math.round(newLeft / stepSize) * stepSize;

      thumb.style[coord] = `${posPercent}px`;

      validateCoord(thumb, trackSize, isVertical)

      positions.from = parseFloat(thumb.style[coord]);
      changedSubject.notifyObservers();
    }
    moveAt(e[clientCoord])
  }

  onClickDoubleType(e: MouseEvent, settings: IsettingsTypes, generalVal: number): void {
    const { changedSubject, positions, isVertical } = this
    const target = e.target as HTMLElement;
    const track = target.closest('.range-slider') as HTMLElement;
    const clientCoord = isVertical ? 'clientY' : 'clientX';
    const thumbs = track.querySelectorAll('.range-slider__thumb');
    const firstThumb = thumbs[0] as HTMLElement;
    const secondThumb = thumbs[1] as HTMLElement;

    const coord = isVertical ? 'top' : 'left';
    const secondCoord = isVertical ? 'bottom' : 'right';

    let firstDifference: number;
    let secondDifference: number;

    firstDifference = thumbs[0].getBoundingClientRect()[coord] - e[clientCoord];
    secondDifference = thumbs[1].getBoundingClientRect()[secondCoord] - e[clientCoord];

    let movedThumb: HTMLElement;

    if (firstDifference < 0) firstDifference = -firstDifference;
    else if (secondDifference < 0) secondDifference = -secondDifference;

    if (firstDifference > secondDifference) movedThumb = thumbs[1] as HTMLElement;
    else movedThumb = thumbs[0] as HTMLElement;

    const { trackSize, halfSizeThumb } = getSizes(movedThumb, track, isVertical)
    const stepCount = generalVal / settings.step;
    const stepSize = trackSize / stepCount;

    function moveAt(clientCoord: number) {
      const trackCoord = isVertical ? track.getBoundingClientRect().top : track.getBoundingClientRect().left;

      const newLeft = clientCoord - trackCoord - halfSizeThumb;
      const posPercent = Math.round(newLeft / stepSize) * stepSize;

      movedThumb.style[coord] = `${posPercent}px`;

      validateCoordsByClick(movedThumb, trackSize, firstThumb, secondThumb, isVertical)

      positions.from = parseFloat(firstThumb.style[coord])
      positions.to = parseFloat(secondThumb.style[coord])
      changedSubject.notifyObservers();
    }

    moveAt(e[clientCoord])
  }
}
