export default class ViewTrack {
	constructor(element, settings) {
		this.$el = element;
		this.type = settings.type;
	}

	set type(type) {
		if (type === 'single') {
			this.$el.removeClass().addClass('range-slider range-slider_single')
		}
		if (type === 'single-vertical') {
			this.$el.removeClass().addClass('range-slider range-slider_single range-slider_vertical')
		}
		if (type === 'double') {
			this.$el.removeClass().addClass('range-slider')
		}
		if (type === 'double-vertical') {
			this.$el.removeClass().addClass('range-slider range-slider_vertical')
		}
		this._type = type;
	}

	get type() {
		return this._type;
	}
}
