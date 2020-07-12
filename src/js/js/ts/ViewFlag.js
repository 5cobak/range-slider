"use strict";
class ViewFlag {
    constructor(settings) {
        this.el = this.createFlag();
    }
    createFlag() {
        const flag = document.createElement('span');
        flag.className = 'range-slider__flag range-slider__flag_first';
        return flag;
    }
    setPosition(settings) {
        const thumb = this.el.parentElement;
        const halfWidthThumb = thumb.offsetWidth / 2;
        const halfWidthFlag = parseInt(getComputedStyle(this.el).width) / 2;
        const borderThumbWidth = parseInt(getComputedStyle(thumb).borderWidth);
        const halfHeightThumb = parseInt(getComputedStyle(thumb).height) / 2;
        const halfHeightFlag = parseInt(getComputedStyle(this.el).height) / 2;
        if (settings.type === 'single' || settings.type === 'double') {
            this.el.style.left = `${-halfWidthFlag + halfWidthThumb + -borderThumbWidth}px`;
        }
        else if (settings.type === 'single-vertical' || settings.type === 'double-vertical') {
            if (halfHeightFlag > halfHeightThumb) {
                this.el.style.top = `${-halfHeightFlag + halfHeightThumb - borderThumbWidth}px`;
            }
            else
                this.el.style.top = `${0}px`;
        }
    }
    writeValueIn(settings) {
        let parentEl = this.el.parentElement;
        if (!settings.flag)
            return;
        if (settings.type === 'single' || settings.type === 'double') {
            this.el.innerHTML = `${parseInt(parentEl.style.left)}`;
        }
        else if (settings.type === 'single-vertical' || settings.type === 'double-vertical') {
            this.el.innerHTML = `${parseInt(parentEl.style.top)}`;
        }
    }
}
module.exports = ViewFlag;
//# sourceMappingURL=ViewFlag.js.map