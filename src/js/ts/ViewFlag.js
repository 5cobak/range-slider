class ViewFlag {
    constructor(settings) {
        this.createFlag();
    }
    createFlag() {
        const flag = document.createElement('span');
        flag.className = 'range-slider__flag range-slider__flag_first';
        this.$el = flag;
    }
    setPosition(settings, thumb) {
        if (settings.type === 'single' || settings.type === 'double') {
            const thumb = this.$el.parentElement;
            const halfWidthThumb = thumb.offsetWidth / 2;
            const halfWidthFlag = parseInt(getComputedStyle(this.$el).width) / 2;
            const borderTumbWidth = parseInt(getComputedStyle(thumb).borderWidth);
            this.$el.style.left = `${-halfWidthFlag + halfWidthThumb + -borderTumbWidth}px`;
        }
        else if (settings.type === 'single-vertical' || settings.type === 'double-vertical') {
            const thumb = this.$el.parentElement;
            const halfHeightThumb = parseInt(getComputedStyle(thumb).height) / 2;
            const halfHeightFlag = parseInt(getComputedStyle(this.$el).height) / 2;
            if (halfHeightFlag > halfHeightThumb) {
                this.$el.style.top = `${-halfHeightFlag + halfHeightThumb - borderTumbWidth}px`;
            }
            else
                this.$el.style.top = `${0}px`;
        }
    }
    writeValueIn(settings) {
        if (settings.type === 'single' || settings.type === 'double') {
            if (!settings.flag)
                return;
            this.$el.innerHTML = parseInt(this.$el.parentElement.style.left);
        }
        else if (settings.type === 'single-vertical' || settings.type === 'double-vertical') {
            if (!settings.flag)
                return;
            this.$el.innerHTML = parseInt(this.$el.parentElement.style.top);
        }
    }
}
module.exports = ViewFlag;
//# sourceMappingURL=ViewFlag.js.map