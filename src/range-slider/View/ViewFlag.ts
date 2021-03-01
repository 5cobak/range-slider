import { ISettingsTypes } from '../Interfaces/globals';

export default class ViewFlag {
  el!: HTMLElement;

  constructor() {
    this.init();
  }

  private createFlag() {
    const flag = document.createElement('span');
    flag.className = 'range-slider__flag range-slider__flag_first js-range-slider__flag js-range-slider__flag_first';
    this.el = flag;
  }

  // set flag's position in center of thumb and method used at mouse events and init slider like inner's method
  setPosition(settings: ISettingsTypes, parent: HTMLElement): void {
    const isVertical = settings.type.match('vertical');

    const thumb = parent;
    const flag = thumb.querySelector('.js-range-slider__flag') as HTMLElement;
    if (!flag) return;
    const thumbLeft = parseFloat(thumb.style.left);
    const halfHeightThumb = thumb.offsetHeight / 2;
    const halfHeightFlag = flag.offsetHeight / 2;

    if (!isVertical) {
      flag.style.left = `${-150}%`;
      flag.style.right = 'auto';
    } else if (halfHeightFlag > halfHeightThumb) {
      flag.style.top = `${-halfHeightFlag + halfHeightThumb}px`;
    } else flag.style.top = `${0}px`;

    if (thumbLeft > 95) {
      flag.style.left = 'auto';
      flag.style.right = '0%';
    }

    if (thumbLeft < 5) {
      flag.style.left = '0';
      flag.style.right = 'auto';
    }
  }

  init(): void {
    this.createFlag();
  }
}
