function requireAll(r) {
	r.keys().forEach(r);
}
requireAll(require.context('../assets/img/icons/', true, /\.svg$/));
$('.js-range-slider-4').myPlugin({ 
	type: 'single',
	flag: true,
	min: 0,
	max: 1000,
	step: 50
});

// $('.js-range-slider-3').myPlugin({ 
// 	type: 'double',
// 	flag: true,
// 	min: -10,
// 	max: 10,
// 	step: 1
// });


// $('.js-range-slider-2').myPlugin({ 
// 	type: 'double-vertical',
// 	flag: true,
// 	min: 0,
// 	max: 1000000,
// 	step: 1000
// });


// $('.js-range-slider-1').myPlugin({ 
// 	type: 'single-vertical',
// 	flag: true,
// 	min: 0,
// 	max: 5,
// 	step: 1
// });
