function requireAll(r) {
	r.keys().forEach(r);
}
requireAll(require.context('../assets/img/icons/', true, /\.svg$/));
$('.js-range-slider-4').myPlugin({ type: 'double', flag: true });

