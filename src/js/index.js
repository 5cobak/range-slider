function requireAll(r) {
	r.keys().forEach(r);
}
requireAll(require.context('../assets/img/icons/', true, /\.svg$/));
$('.js-range-slider-4').myPlugin({ 
	type: 'single',
	flag: true,
	min: 1000,
	max: 100000,
	step: 10000,
	scale: true,
	from: 18000,
});

const range = $('.js-range-slider-3').myPlugin({ 
	type: 'double',
	flag: true,
	min: 10000,
	max: 100000,
	step: 10000,
	scale: true,
	from: 10000,
	to: 18000
});


$('.js-range-slider-2').myPlugin({ 
	type: 'double-vertical',
	flag: true,
	min: 10000,
	max: 100000,
	step: 10000,
	scale: true,
	from: 18000,
	to: 25000
});


$('.js-range-slider-1').myPlugin({ 
	type: 'single-vertical',
	flag: true,
	min: 1000,
	max: 100000,
	step: 10000,
	scale: true,
	from: 18000,
});
