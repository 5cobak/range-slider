/* eslint-disable no-unused-expressions */
import { IObserver, IsettingsTypes, IThumb, Iposition } from './globals';
import MakeObservableSubject from './Observer';

import { validateCoordsByClick, validateCoord, validateCoordsByMove, getValues } from './utils/thumbHelpers'

export default class ViewThumb implements IThumb {
  el!: HTMLElement;

  positions!: Iposition;

  changedSubject!: IObserver;

  isVertical: RegExpMatchArray | null;

  // constructor access one argument, this is validated options from model
  constructor(settings: IsettingsTypes) {
    this.createElem();
    // create observable subject for thumb
    this.changedSubject = new MakeObservableSubject();
    // we need to know type vertical or horizontal for track to unite mdrap-and-drop to single method
    this.isVertical = settings.type.match('vertical');
    // this property we'll pass by observer to high level, this store thumbs positions for model
    this.positions = {
      to: 0,
      from: 0,
    }
  }

  // method create element and add class name
  private createElem():void {
    const thumb: HTMLElement = document.createElement('span');
    thumb.className = 'range-slider__thumb range-slider__thumb_first';
    this.el = thumb;
  }

  // -------------------------------------------------------------  events for X type range
  // method for drap-and-drop on single and single-vertical types track
  moveSingleType(e: MouseEvent | TouchEvent, settings: IsettingsTypes, generalVal: number): void {
    // console.log(e.type);

    // get observable subject, positions and isVertical
    const { changedSubject, positions, isVertical } = this;
    // get values of element which we'll use when calculate position of thumb
    // getValues is function you we'll find at ./utils/thumbHelpers.ts
    const { track, targetThumb, trackSize, halfSizeThumb } = getValues(isVertical, e)
    // choose client.x or client.y for horizontal or vertical slider
    const isTouch = e.type === 'touchstart';

    if (!targetThumb) return;

    if (isTouch) {
      document.body.classList.add('stop-scrolling');
    }
    // count of steps in track
    const stepCount = generalVal / settings.step;
    // step size
    const stepSize = trackSize / stepCount;
    // choose left or top for horizontal or vertical slider
    const coord = settings.type.match('vertical') ? 'top' : 'left';

    // function for move thumb
    function moveAt(e: MouseEvent | TouchEvent) {
      let userCoord: number;
      if (e instanceof MouseEvent) {
        userCoord = isVertical ? e.clientY : e.clientX;
      } else {
        const touch = e.touches[0] || e.changedTouches[0];
        userCoord = isVertical ? touch.clientY : touch.clientX;
      }
      const trackCoord = track.getBoundingClientRect()[coord];
      // get coord for click in track
      const newPos = userCoord - trackCoord - halfSizeThumb;

      // get and regulation pos of thumb by step size
      const posByStep = Math.round(newPos / stepSize) * stepSize;
      // set thumb pos
      targetThumb.style[coord] = `${posByStep}px`;
      // valudate thumb pos in horizontal and vertical type of track, pos must not be greater then track size and less then coord 0 of track
      validateCoord(targetThumb, trackSize, isVertical)
      // set from in property position and notify observers, this observers will use this from in high level
      positions.from = parseFloat(targetThumb.style[coord]);
      changedSubject.notifyObservers();
    }
    // standart drag-and-drop addition and deletion event's listeners
    function onMouseMove(e: MouseEvent | TouchEvent) {
      moveAt(e)
    }
    function removeEventListeners() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchmove', onMouseMove);
      // document.body.classList.remove('stop-scrolling')
    }
    document.addEventListener('touchmove', onMouseMove)
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', removeEventListeners);
    document.addEventListener('touchend', removeEventListeners);
  }

  // looks like method above, besides there is the second thumb element
  moveDoubleType(e: MouseEvent | TouchEvent, settings: IsettingsTypes, generalVal: number): void {
    const { changedSubject, positions, isVertical } = this;

    const isTouch = e.type === 'touchstart';

    const {
      firstThumb,
      secondThumb,
      track, targetThumb,
      targetSecondThumb,
      trackSize,
      halfSizeThumb,
    } = getValues(isVertical, e);

    if (!targetThumb) return;
    if (isTouch) document.body.classList.add('stop-scrolling')
    // choosed thumb will have more z-index then wasn't choosed thumb
    targetThumb.style.zIndex = '100';
    (targetSecondThumb as HTMLElement).style.zIndex = '50'
    const stepCount = generalVal / settings.step;

    const stepSize = trackSize / stepCount;
    const coord = isVertical ? 'top' : 'left';

    function moveAt(e: MouseEvent | TouchEvent): void {
      let userCoord: number;
      if (e instanceof MouseEvent) {
        userCoord = isVertical ? e.clientY : e.clientX;
      } else {
        const touch = e.touches[0] || e.changedTouches[0];
        userCoord = isVertical ? touch.clientY : touch.clientX;
      }
      const trackCoord = track.getBoundingClientRect()[coord];

      const newLeft = userCoord - trackCoord - halfSizeThumb;
      const posPercent = Math.round(newLeft / stepSize) * stepSize;

      targetThumb.style[coord] = `${posPercent}px`;

      validateCoordsByMove(targetThumb, targetSecondThumb, trackSize, firstThumb, secondThumb, isVertical)

      positions.from = parseFloat(firstThumb.style[coord])
      positions.to = parseFloat(secondThumb.style[coord]);

      changedSubject.notifyObservers();
    }

    function onMouseMove(e: MouseEvent | TouchEvent) {
      moveAt(e)
    }
    function removeEventListeners() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchmove', onMouseMove);
      document.body.classList.remove('stop-scrolling')
    }
    document.addEventListener('touchmove', onMouseMove)
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', removeEventListeners);
    document.addEventListener('touchend', removeEventListeners);
  }

  // next methods look like methods above, besides type of event, it is mousedown on track

  onClickSingleType(e: MouseEvent | TouchEvent, settings: IsettingsTypes, generalVal: number): void {
    const { changedSubject, positions, isVertical } = this;
    const { track, firstThumb, trackSize, halfSizeThumb } = getValues(isVertical, e)

    const coord = settings.type.match('vertical') ? 'top' : 'left';

    const stepCount = generalVal / settings.step;
    const stepSize = trackSize / stepCount;

    function moveAt(e: MouseEvent | TouchEvent) {
      let userCoord: number;
      if (e instanceof MouseEvent) {
        userCoord = isVertical ? e.clientY : e.clientX;
      } else {
        const touch = e.touches[0] || e.changedTouches[0];
        userCoord = isVertical ? touch.clientY : touch.clientX;
      }
      const trackCoord = track.getBoundingClientRect()[coord];
      const newLeft = userCoord - trackCoord - halfSizeThumb;
      const posPercent = Math.round(newLeft / stepSize) * stepSize;

      firstThumb.style[coord] = `${posPercent}px`;

      validateCoord(firstThumb, trackSize, isVertical)

      positions.from = parseFloat(firstThumb.style[coord]);
      changedSubject.notifyObservers();
    }
    moveAt(e)
  }

  onClickDoubleType(e: MouseEvent | TouchEvent, settings: IsettingsTypes, generalVal: number): void {
    const { changedSubject, positions, isVertical } = this
    const { track, firstThumb, secondThumb, trackSize, halfSizeThumb } = getValues(isVertical, e);
    let firstDifference: number;
    let secondDifference: number;
    const coord = isVertical ? 'top' : 'left';
    const secondCoord = isVertical ? 'bottom' : 'right';

    function moveAt(e: MouseEvent | TouchEvent) {
      let userCoord: number;
      if (e instanceof MouseEvent) {
        userCoord = isVertical ? e.clientY : e.clientX;
      } else {
        const touch = e.touches[0] || e.changedTouches[0];
        userCoord = isVertical ? touch.clientY : touch.clientX;
      }
      firstDifference = firstThumb.getBoundingClientRect()[coord] - userCoord;
      secondDifference = secondThumb.getBoundingClientRect()[secondCoord] - userCoord;

      let movedThumb: HTMLElement;

      if (firstDifference < 0) firstDifference = -firstDifference;
      else if (secondDifference < 0) secondDifference = -secondDifference;

      if (firstDifference > secondDifference) movedThumb = secondThumb;
      else movedThumb = firstThumb;

      const stepCount = generalVal / settings.step;
      const stepSize = trackSize / stepCount;

      const trackCoord = track.getBoundingClientRect()[coord]

      const newLeft = userCoord - trackCoord - halfSizeThumb;
      const posPercent = Math.round(newLeft / stepSize) * stepSize;

      movedThumb.style[coord] = `${posPercent}px`;

      validateCoordsByClick(movedThumb, trackSize, firstThumb, secondThumb, isVertical)

      positions.from = parseFloat(firstThumb.style[coord])
      positions.to = parseFloat(secondThumb.style[coord])
      changedSubject.notifyObservers();
    }

    moveAt(e)
  }
}
