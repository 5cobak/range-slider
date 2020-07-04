class ViewInner {
    constructor(settings) {
        this.createInner();
    }
    createInner() {
        const inner = document.createElement('div');
        inner.classList.add('range-slider__inner');
        this.$el = inner;
    }
    setPosition(settings) {
        const track = this.$el.parentElement;
        const thumbFirst = track.querySelector('.range-slider__thumb_first');
        const thumbSecond = track.querySelector('.range-slider__thumb_second');
        const heightThumb = parseInt(getComputedStyle(thumbFirst).height);
        const widthThumb = parseInt(getComputedStyle(thumbFirst).width);
        if (settings.type === 'single') {
            this.$el.style.width = `${parseInt(getComputedStyle(thumbFirst).left) + widthThumb / 2}px`;
        }
        else if (settings.type === 'double') {
            this.$el.style.left = `${thumbFirst.offsetLeft + widthThumb / 2}px`;
            this.$el.style.width = `${thumbSecond.offsetLeft - thumbFirst.offsetLeft}px`;
        }
        else if (settings.type === 'single-vertical') {
            this.$el.style.height = `${parseInt(getComputedStyle(thumbFirst).top) + heightThumb / 2}px`;
        }
        else {
            this.$el.style.top = `${thumbFirst.offsetTop + heightThumb / 2}px`;
            this.$el.style.height = `${thumbSecond.offsetTop - thumbFirst.offsetTop}px`;
        }
    }
}
module.exports = ViewInner;
//# sourceMappingURL=ViewInner.js.map