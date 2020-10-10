/* eslint-disable no-unused-expressions */
import { IObserver, IsettingsTypes, IThumb, Iposition } from './globals';
import MakeObservableSubject from './Observer';

import { validateCoordsByClick, validateCoord, validateCoordsByMove, getValues } from './utils/thumbHelpers'

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
    const { track, targetThumb, trackSize, halfSizeThumb } = getValues(isVertical, e)
    const clientCoord = isVertical ? 'clientY' : 'clientX';
    if (!targetThumb) return;
    const stepCount = generalVal / settings.step;
    const stepSize = trackSize / stepCount;

    const coord = settings.type.match('vertical') ? 'top' : 'left';

    function moveAt(pageXorY: number) {
      const trackCoord = track.getBoundingClientRect()[coord];
      const newPos = pageXorY - trackCoord - halfSizeThumb;

      const posPercent = Math.round(newPos / stepSize) * stepSize;

      targetThumb.style[coord] = `${posPercent}px`;

      validateCoord(targetThumb, trackSize, isVertical)

      positions.from = parseFloat(targetThumb.style[coord]);

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

    const {
      firstThumb,
      secondThumb,
      track, targetThumb,
      targetSecondThumb,
      trackSize,
      halfSizeThumb,
    } = getValues(isVertical, e);

    if (!targetThumb) return;

    const stepCount = generalVal / settings.step;

    const stepSize = trackSize / stepCount;
    const coord = isVertical ? 'top' : 'left';
    const clientCoord = isVertical ? 'clientY' : 'clientX';

    function moveAt(pageXorY: number): void {
      const trackCoord = track.getBoundingClientRect()[coord];

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

    const { track, firstThumb, trackSize, halfSizeThumb } = getValues(isVertical, e)
    const clientCoord = isVertical ? 'clientY' : 'clientX';

    const coord = settings.type.match('vertical') ? 'top' : 'left';

    const stepCount = generalVal / settings.step;
    const stepSize = trackSize / stepCount;

    function moveAt(clientXorY: number) {
      const trackCoord = track.getBoundingClientRect()[coord];
      const newLeft = clientXorY - trackCoord - halfSizeThumb;
      const posPercent = Math.round(newLeft / stepSize) * stepSize;

      firstThumb.style[coord] = `${posPercent}px`;

      validateCoord(firstThumb, trackSize, isVertical)

      positions.from = parseFloat(firstThumb.style[coord]);
      changedSubject.notifyObservers();
    }
    moveAt(e[clientCoord])
  }

  onClickDoubleType(e: MouseEvent, settings: IsettingsTypes, generalVal: number): void {
    const { changedSubject, positions, isVertical } = this
    const { track, firstThumb, secondThumb, trackSize, halfSizeThumb } = getValues(isVertical, e);
    let firstDifference: number;
    let secondDifference: number;
    const clientCoord = isVertical ? 'clientY' : 'clientX';
    const coord = isVertical ? 'top' : 'left';
    const secondCoord = isVertical ? 'bottom' : 'right';

    firstDifference = firstThumb.getBoundingClientRect()[coord] - e[clientCoord];
    secondDifference = secondThumb.getBoundingClientRect()[secondCoord] - e[clientCoord];

    let movedThumb: HTMLElement;

    if (firstDifference < 0) firstDifference = -firstDifference;
    else if (secondDifference < 0) secondDifference = -secondDifference;

    if (firstDifference > secondDifference) movedThumb = secondThumb;
    else movedThumb = firstThumb;

    const stepCount = generalVal / settings.step;
    const stepSize = trackSize / stepCount;

    function moveAt(clientCoord: number) {
      const trackCoord = track.getBoundingClientRect()[coord]

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
