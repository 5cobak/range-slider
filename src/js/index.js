function requireAll(r) {
	r.keys().forEach(r);
}
requireAll(require.context('../assets/img/icons/', true, /\.svg$/));
$('.js-range-slider-4').myPlugin({ 
	type: 'single',
	flag: true,
	min: 0,
	max: 900,
	step: 100,
	scale: true,
	from: 200,
	// to: 5
});

// $('.js-range-slider-3').myPlugin({ 
// 	type: 'double',
// 	flag: true,
// 	min: -1000,
// 	max: 1000,
// 	step: 150,
// 	scale: true
// });


// $('.js-range-slider-2').myPlugin({ 
// 	type: 'double-vertical',
// 	flag: true,
// 	min: 0,
// 	max: 10000,
// 	step: 3000,
// 	scale: true
// });


// $('.js-range-slider-1').myPlugin({ 
// 	type: 'single-vertical',
// 	flag: true,
// 	min: 0,
// 	max: 900,
// 	step: 300,
// 	scale: true
// });
