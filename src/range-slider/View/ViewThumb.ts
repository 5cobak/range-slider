import { IObserver, ISettingsTypes, IThumb, IPosition } from '../Interfaces/globals';
import MakeObservableSubject from '../Observer/Observer';

import { validateCoordsByClick, validateCoord, validateCoordsByMove, getValues } from './utils/thumbHelpers';

export default class ViewThumb implements IThumb {
  el!: HTMLElement;

  hiddenTrack!: HTMLElement;

  positions!: IPosition;

  changedSubject!: IObserver;

  isVertical!: RegExpMatchArray | null;

  generalVal!: number;

  settings!: ISettingsTypes;

  // constructor access one argument, this is validated options from modeli
  constructor(settings: ISettingsTypes, generalVal: number) {
    this.init(settings, generalVal);
  }

  // method create element and add class name
  private createElem(): void {
    const thumb: HTMLElement = document.createElement('span');
    thumb.className = 'js-range-slider__thumb_first js-range-slider__thumb range-slider__thumb range-slider__thumb_first';
    this.el = thumb;
  }

  private createHiddenTrack() {
    const hiddenTrack = document.createElement('div');
    hiddenTrack.className = 'range-slider__hidden-track';
    this.hiddenTrack = hiddenTrack;
  }

  setHeightForHiddenTrackIntoVertSl(): void {
    const parent = this.hiddenTrack.parentElement as HTMLElement;
    this.hiddenTrack.style.height = getComputedStyle(parent).height;
  }

  private makeMoveAtOnSingleType([targetThumb, trackSize, isVertical, track, halfSizeThumb]: [
    HTMLElement,
    number,
    RegExpMatchArray | null,
    HTMLElement,
    number
  ]) {
    return (e: MouseEvent | TouchEvent) => {
      if (!targetThumb) return;

      // count of steps in track
      const stepCount = this.generalVal / this.settings.step;
      // step size
      const stepSize = trackSize / stepCount;
      // choose left or top for horizontal or vertical slider
      const coord = this.settings.type.match('vertical') ? 'top' : 'left';
      // function for move thumb

      let userCoord: number;
      if (e instanceof MouseEvent) {
        userCoord = isVertical ? e.clientY : e.clientX;
      } else {
        const touch = e.touches[0] || e.changedTouches[0];
        userCoord = isVertical ? touch.clientY : touch.clientX;
      }

      const trackCoord = track.getBoundingClientRect()[coord];
      // get coordinate for click in track
      const newPos = userCoord - trackCoord - halfSizeThumb;

      // get and regulation pos of thumb by step size
      const posByStep = Math.round(newPos / stepSize) * stepSize;
      // set thumb pos
      targetThumb.style[coord] = `${(posByStep / trackSize) * 100}%`;

      // validate thumb pos in horizontal and vertical type of track, pos must not be greater then track size and less then coord 0 of track

      validateCoord(targetThumb, trackSize, isVertical);
      // set from in property position and notify observers, this observers will use this from in high level
      this.positions.from = parseFloat(targetThumb.style[coord]);
      this.changedSubject.notifyObservers();
    };
    // get observable subject, positions and isVertical

    // choose client.x or client.y for horizontal or vertical slider
  }

  // -------------------------------------------------------------  events for X type range
  // method for drap-and-drop on single and single-vertical types track
  moveSingleType(e: MouseEvent | TouchEvent): void {
    const thumb = (e.target as HTMLElement).closest('.js-range-slider__thumb');
    if (!thumb) return;
    const isTouch = e.type === 'touchstart';
    if (isTouch) document.body.classList.add('stop-scrolling');
    const { isVertical } = this;
    // get values of element which we'll use when calculate position of thumb
    // getValues is function you we'll find at ./utils/thumbHelpers.ts
    const { track, targetThumb, trackSize, halfSizeThumb } = getValues(isVertical, e);

    const paramsForMakeMoveAt = [targetThumb, trackSize, isVertical, track, halfSizeThumb] as [
      HTMLElement,
      number,
      RegExpMatchArray | null,
      HTMLElement,
      number
    ];

    const makeMoveAt = this.makeMoveAtOnSingleType.bind(this);
    // // standard drag-and-drop addition and deletion event's listeners
    const moveRangeSliderThumb = makeMoveAt(paramsForMakeMoveAt);

    const removeEventsFromRangeSliderThumb = this.removeEvents.bind(this, moveRangeSliderThumb);
    document.addEventListener('touchmove', moveRangeSliderThumb);
    document.addEventListener('mousemove', moveRangeSliderThumb);
    document.addEventListener('mouseup', removeEventsFromRangeSliderThumb);
    document.addEventListener('touchend', removeEventsFromRangeSliderThumb);
  }

  private makeMoveAtOnDoubleType([targetThumb, targetSecondThumb, trackSize, isVertical, track, halfSizeThumb, firstThumb, secondThumb]: [
    HTMLElement,
    HTMLElement,
    number,
    RegExpMatchArray | null,
    HTMLElement,
    number,
    HTMLElement,
    HTMLElement
  ]) {
    return (e: MouseEvent | TouchEvent) => {
      if (!targetThumb) return;

      // choosed thumb will have more z-index then wasn't choosed thumb
      targetThumb.style.zIndex = '100';
      (targetSecondThumb as HTMLElement).style.zIndex = '50';
      const stepCount = this.generalVal / this.settings.step;

      const stepSize = trackSize / stepCount;
      const coord = isVertical ? 'top' : 'left';

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

      targetThumb.style[coord] = `${(posPercent / trackSize) * 100}%`;

      validateCoordsByMove(targetThumb, targetSecondThumb, trackSize, firstThumb, secondThumb, isVertical);

      this.positions.from = parseFloat(firstThumb.style[coord]);
      this.positions.to = parseFloat(secondThumb.style[coord]);

      this.changedSubject.notifyObservers();
    };
  }

  // looks like method above, besides there is the second thumb element
  moveDoubleType(e: MouseEvent | TouchEvent): void {
    const isTouch = e.type === 'touchstart';
    if (isTouch) document.body.classList.add('stop-scrolling');
    const thumb = (e.target as HTMLElement).closest('.js-range-slider__thumb');
    if (!thumb) return;
    const { isVertical } = this;

    const { firstThumb, secondThumb, track, targetThumb, targetSecondThumb, trackSize, halfSizeThumb } = getValues(isVertical, e);
    const paramsForMakeMoveAt = [targetThumb, targetSecondThumb, trackSize, isVertical, track, halfSizeThumb, firstThumb, secondThumb] as [
      HTMLElement,
      HTMLElement,
      number,
      RegExpMatchArray | null,
      HTMLElement,
      number,
      HTMLElement,
      HTMLElement
    ];
    const makeMoveAt = this.makeMoveAtOnDoubleType.bind(this);
    // // standard drag-and-drop addition and deletion event's listeners
    const moveAt = makeMoveAt(paramsForMakeMoveAt);
    const removeEventsFromRangeSliderThumb = this.removeEvents.bind(this, moveAt);
    document.addEventListener('touchmove', moveAt);
    document.addEventListener('mousemove', moveAt);
    document.addEventListener('mouseup', removeEventsFromRangeSliderThumb);
    document.addEventListener('touchend', removeEventsFromRangeSliderThumb);
  }

  private removeEvents(moveAt: (e: MouseEvent | TouchEvent) => void): void {
    document.body.classList.remove('stop-scrolling');
    document.removeEventListener('mousemove', moveAt);
    document.removeEventListener('touchmove', moveAt);
  }

  // next methods look like methods above, besides type of event, it is mousedown on track

  onClickSingleType(e: MouseEvent | TouchEvent, settings: ISettingsTypes, generalVal: number): void {
    const { changedSubject, positions, isVertical } = this;
    const { track, firstThumb, trackSize, halfSizeThumb } = getValues(isVertical, e);

    const coord = settings.type.match('vertical') ? 'top' : 'left';

    const stepCount = generalVal / settings.step;
    const stepSize = trackSize / stepCount;
    let userCoord: number;
    if (e instanceof MouseEvent) {
      userCoord = isVertical ? e.clientY : e.clientX;
    } else {
      const touch = e.touches[0] || e.changedTouches[0];
      userCoord = isVertical ? touch.clientY : touch.clientX;
    }

    const trackCoord = track.getBoundingClientRect()[coord];
    const newLeft = userCoord - trackCoord - halfSizeThumb;
    const posPercent = ((Math.round(newLeft / stepSize) * stepSize) / trackSize) * 100;

    firstThumb.style[coord] = `${posPercent}%`;

    validateCoord(firstThumb, trackSize, isVertical);

    positions.from = parseFloat(firstThumb.style[coord]);
    changedSubject.notifyObservers();
  }

  onClickDoubleType(e: MouseEvent | TouchEvent, settings: ISettingsTypes, generalVal: number): void {
    const { changedSubject, positions, isVertical } = this;
    const { track, firstThumb, secondThumb, trackSize, halfSizeThumb } = getValues(isVertical, e);
    let firstDifference: number;
    let secondDifference: number;
    const coord = isVertical ? 'top' : 'left';
    const secondCoord = isVertical ? 'bottom' : 'right';

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

    const trackCoord = track.getBoundingClientRect()[coord];

    const newLeft = userCoord - trackCoord - halfSizeThumb;
    const posPercent = Math.round(newLeft / stepSize) * stepSize;

    movedThumb.style[coord] = `${(posPercent / trackSize) * 100}%`;
    validateCoordsByClick(movedThumb, trackSize, firstThumb, secondThumb, isVertical);
    // validateCoordsByClick(movedThumb, trackSize, firstThumb, secondThumb, isVertical);

    positions.from = parseFloat(firstThumb.style[coord]);
    positions.to = parseFloat(secondThumb.style[coord]);
    changedSubject.notifyObservers();
  }

  private init(settings: ISettingsTypes, generalVal: number) {
    this.settings = settings;
    this.generalVal = generalVal;
    this.createElem();
    this.createHiddenTrack();
    // create observable subject for thumb
    this.changedSubject = new MakeObservableSubject();
    // we need to know type vertical or horizontal for track to unite mdrap-and-drop to single method
    this.isVertical = settings.type.match('vertical');
    // this property we'll pass by observer to high level, this store thumbs positions for model
    this.positions = {
      to: 0,
      from: 0,
    };
  }
}
