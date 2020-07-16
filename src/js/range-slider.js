import View from './view.js'
import Model from './model.js'

(($) => {
	$.fn.myPlugin = function(options) {
		const $this = this; // dom element this

		const settings = $.extend( { // options object
			$el: $this,
			min: 0,
			max: 1000,
			type: 'single',
			from: 100, 
			to: 900,
			flag: false
		}, options);


		let rangeContainer      = document.createElement('div');
		let rangeTo             = document.createElement('span');

		const view = new View($this, settings);
		const model = new Model(settings);

		
		


		// first - replace dom element with our created elements
		// seconds - set default type of view rangeSlider or let user set type

	};
})(jQuery);