// export defalut class ViewInner {
// 	constructor(settings) {
// 		this.createInner();
// 	}

// 	createInner() {
// 		const inner = document.createElement('div');
// 		inner.classList.add('range-slider__inner');
// 		this.$el = inner;
// 	}

// 	setPosition(settings) {
// 		const track = this.$el.parentElement;
// 		const thumbFirst = track.querySelector('.range-slider__thumb_first');
// 		const thumbSecond = track.querySelector('.range-slider__thumb_second');

// 		if (settings.type === 'single') {
// 			this.$el.style.width = `${parseInt(getComputedStyle(thumbFirst).left) + parseInt(getComputedStyle(thumbFirst).width) / 2}px`;
// 		} else if (settings.type === 'double') {
// 			this.$el.style.left = `${thumbFirst.offsetLeft + parseInt(getComputedStyle(thumbFirst).width) / 2}px`;
// 			this.$el.style.width = `${thumbSecond.offsetLeft - thumbFirst.offsetLeft}px`;
// 		} else if (settings.type === 'single-vertical') {
// 			this.$el.style.height = `${parseInt(getComputedStyle(thumbFirst).top) + parseInt(getComputedStyle(thumbFirst).height) / 2}px`;
// 		} else {
// 			this.$el.style.top = `${thumbFirst.offsetTop + parseInt(getComputedStyle(thumbFirst).height) / 2}px`;
// 			this.$el.style.height = `${thumbSecond.offsetTop - thumbFirst.offsetTop}px`;
// 		}
// 	}
// }
