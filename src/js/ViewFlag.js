// // eslint-disable-next-line no-unused-vars
// export default class ViewFlag {
// 	constructor(settings) {
// 		this.createFlag();
// 	}

// 	createFlag() {
// 		const flag = document.createElement('span');
// 		flag.className = 'range-slider__flag range-slider__flag_first';
// 		this.$el = flag;
// 	}

// 	setPosition(settings, thumb) {
// 		if (settings.type === 'single' || settings.type === 'double') {
// 			const thumb = this.$el.parentElement;
// 			const halfWidthThumb = thumb.offsetWidth / 2;
// 			const halfWidthFlag = parseInt(getComputedStyle(this.$el).width) / 2;
// 			this.$el.style.left = `${-halfWidthFlag + halfWidthThumb + -parseInt(getComputedStyle(thumb).borderWidth)}px`;
// 		} else if (settings.type === 'single-vertical' || settings.type === 'double-vertical') {
// 			const thumb = this.$el.parentElement;
// 			const halfHeightThumb = parseInt(getComputedStyle(thumb).height) / 2;
// 			const halfHeightFlag = parseInt(getComputedStyle(this.$el).height) / 2;
// 			if (halfHeightFlag > halfHeightThumb) {
// 				this.$el.style.top = `${-halfHeightFlag + halfHeightThumb - parseInt(getComputedStyle(thumb).borderWidth)}px`;
// 			} else this.$el.style.top = `${0}px`;
// 		}
// 	}

// 	writeValueIn(settings) {
// 		if (settings.type === 'single' || settings.type === 'double') {
// 			if (!settings.flag) return;
// 			this.$el.innerHTML = parseInt(this.$el.parentElement.style.left);
// 		} else if (settings.type === 'single-vertical' || settings.type === 'double-vertical') {
// 			if (!settings.flag) return;
// 			this.$el.innerHTML = parseInt(this.$el.parentElement.style.top);
// 		}
// 	}
// }
