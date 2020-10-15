import { IScale, IsettingsTypes } from './globals';
import { getValues, setBigLines, setSmallLines } from './utils/scaleHelpers';

export default class Scale implements IScale {
  settings: IsettingsTypes;

  el!: HTMLElement;

  smallLine!: HTMLElement;

  bigLine!: HTMLElement

  // constructor acces first argument moles's settings across presenter
  constructor(settings: IsettingsTypes) {
    this.settings = settings;
    // create thumb element and add class range-slider__thumb
    this.createElement();
  }

  // method for creation scale element and add class range-slider__scale
  private createElement(): void {
    const scale: HTMLElement = document.createElement('div');
    scale.className = 'range-slider__scale';

    const smallLine = document.createElement('span');
    smallLine.className = 'range-slider__small-line';

    const bigLine = document.createElement('span');
    bigLine.className = 'range-slider__big-line';
    this.el = scale;
    this.smallLine = smallLine;
    this.bigLine = bigLine
  }

  // write in scale min and max values
  writeMinAndMaxValues(settings: IsettingsTypes):void {
    const lineCollections = this.el.querySelectorAll('.range-slider__big-line');
    const min = document.createElement('div');

    min.className = 'range-slider__text';
    min.innerHTML = `${settings.min}`;

    const max = min.cloneNode(true) as HTMLElement;
    max.innerHTML = `${settings.max}`;

    lineCollections[0].append(min);
    lineCollections[lineCollections.length - 1].append(max);
  }

  setCountOfLines(settings: IsettingsTypes, generalVal: number): void {
    const smallLine = this.smallLine;
    const scale = this.el;
    // get values and calculate step size
    const { thumbSize, trackSize, stepCount, stepSize, posCountSmallPercent } = getValues(settings, generalVal, scale);
    // get positions for bit and small lines
    const { posCountBig } = getValues(settings, generalVal, scale);
    // add small line in scale
    this.el.append(this.smallLine);

    // calculate and append small lines in scale
    setSmallLines(settings, stepCount, posCountSmallPercent, trackSize, thumbSize, stepSize, smallLine, scale);
    // calculate and append big Lines in scale
    setBigLines(settings, stepCount, posCountBig, stepSize, trackSize, scale)
  }
}
