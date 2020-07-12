/// <reference path="globals.d.ts" />
class ViewFlag {
  el: HTMLElement;
  constructor(settings: IsettingsTypes) {
    this.el = this.createFlag();
  }

  private createFlag() {
    const flag = document.createElement('span');
    flag.className = 'range-slider__flag range-slider__flag_first';
    return flag;
  }

  setPosition(settings: IsettingsTypes) {
    const thumb = this.el.parentElement as HTMLElement;
    const halfWidthThumb = thumb.offsetWidth / 2;
    const halfWidthFlag = parseInt(getComputedStyle(this.el).width) / 2;
    const borderThumbWidth = parseInt(getComputedStyle(thumb).borderWidth);
    const halfHeightThumb = parseInt(getComputedStyle(thumb).height) / 2;
    const halfHeightFlag = parseInt(getComputedStyle(this.el).height) / 2;

    if (settings.type === 'single' || settings.type === 'double') {
      this.el.style.left = `${-halfWidthFlag + halfWidthThumb + -borderThumbWidth}px`;
    } else if (settings.type === 'single-vertical' || settings.type === 'double-vertical') {
      if (halfHeightFlag > halfHeightThumb) {
        this.el.style.top = `${-halfHeightFlag + halfHeightThumb - borderThumbWidth}px`;
      } else this.el.style.top = `${0}px`;
    }
  }

  writeValueIn(settings: IsettingsTypes) {
    let parentEl = this.el.parentElement as HTMLElement;

    if (!settings.flag) return;

    if (settings.type === 'single' || settings.type === 'double') {
      this.el.innerHTML = `${parseInt(parentEl.style.left)}`;
    } else if (settings.type === 'single-vertical' || settings.type === 'double-vertical') {
      this.el.innerHTML = `${parseInt(parentEl.style.top)}`;
    }
  }
}
module.exports = ViewFlag;
