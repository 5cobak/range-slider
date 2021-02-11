import { IsettingsTypes } from './globals';

export default class ViewFlag {
  el!: HTMLElement;

  constructor() {
    this.init();
  }

  private createFlag() {
    const flag = document.createElement('span');
    flag.className = 'range-slider__flag range-slider__flag_first';
    this.el = flag;
  }

  // set flag's position in center of thumb and method used at mouse events and init slider like inner's method
  setPosition(settings: IsettingsTypes): void {
    this.el.innerHTML = `${settings.from}`;
    const thumb = this.el.parentElement as HTMLElement;
    const thumbLeft = parseFloat(thumb.style.left);
    const halfWidthThumb = thumb.offsetWidth / 2;
    const halfWidthFlag = this.el.offsetWidth / 2;
    const halfHeightThumb = thumb.offsetHeight / 2;
    const halfHeightFlag = this.el.offsetHeight / 2;

    const leftCoord = this.el.getBoundingClientRect().left;

    if (leftCoord - 20 < 0) {
      this.el.style.left = '0px';
    } else if (!settings.type.match('vertical')) {
      this.el.style.left = `${-halfWidthFlag + halfWidthThumb}px`;
    } else if (halfHeightFlag > halfHeightThumb) {
      this.el.style.top = `${-halfHeightFlag + halfHeightThumb}px`;
    } else this.el.style.top = `${0}px`;

    if (thumbLeft > 95) {
      this.el.style.left = 'auto';
      this.el.style.right = '0%';
    }
  }

  init(): void {
    this.createFlag();
  }
}
