import { IsettingsTypes } from './globals';

export default class ViewFlag {
  el: HTMLElement;

  constructor() {
    this.el = this.createFlag();
  }

  private createFlag() {
    const flag = document.createElement('span');
    flag.className = 'range-slider__flag range-slider__flag_first';
    return flag;
  }

  // set flag's position in center of thumb and method used at mouse events and init slider like inner's method
  setPosition(settings: IsettingsTypes):void {
    const thumb = this.el.parentElement as HTMLElement;
    const halfWidthThumb = parseFloat(getComputedStyle(thumb).width) / 2;
    const halfWidthFlag = parseFloat(getComputedStyle(this.el).width) / 2;
    const borderThumbWidth = parseFloat(getComputedStyle(thumb).borderWidth);
    const halfHeightThumb = parseFloat(getComputedStyle(thumb).height) / 2;
    const halfHeightFlag = parseFloat(getComputedStyle(this.el).height) / 2;

    if (!settings.type.match('vertical')) {
      this.el.style.left = `${-halfWidthFlag + halfWidthThumb - borderThumbWidth}px`;
    } else if (halfHeightFlag > halfHeightThumb) {
      this.el.style.top = `${-halfHeightFlag + halfHeightThumb - borderThumbWidth}px`;
    } else this.el.style.top = `${0}px`;
  }
}
