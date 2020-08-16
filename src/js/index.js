import Panel from '../ts/panel'
import {panelFirst} from '../ts/panel'
function requireAll(r) {
	r.keys().forEach(r);
}
requireAll(require.context('../assets/img/icons/', true, /\.svg$/));

// const range = $('.js-range-slider-1').rangeSlider({ 
// 	type: 'single',
// 	flag: true,
// 	min: 100,
// 	max: 1000,
// 	step: 100,
// 	scale: true,
// 	from: 100, 
// });

const rangeSecond = $('.js-range-slider-2').rangeSlider()

rangeSecond.after(panelFirst.el)

panelFirst.onChangeVal(+rangeSecond.data('from'))

rangeSecond.on('mousedown', (e)=> {
	const target = e.target.closest('.range-slider');
	function changeVal() {
		panelFirst.onChangeVal(target.dataset.currentVal)
	}
	changeVal();
	document.addEventListener('mousemove', changeVal);
	document.addEventListener('mouseup', ()=>{
		document.removeEventListener('mousemove', changeVal);
	});

})

panelFirst.onInputVal((value)=>{
	rangeSecond.rangeSlider('update', {from: value})

})

panelFirst.onInputStep((value)=>{
	rangeSecond.rangeSlider('update', {step: value});
})

panelFirst.setStepOnInput(+rangeSecond.data('step'));

panelFirst.setFlagCheck(rangeSecond.data('flag'))

panelFirst.flag.onchange = () => {
	rangeSecond.rangeSlider('update', {flag: panelFirst.flag.checked})
}

// panelFirst.onInputStep((value)=> {
// 	rangeSecond.rangeSlider('update', {step: value});
// })



// const range = $('.js-range-slider-2').rangeSlider({ 
// 	type: 'double',
// 	flag: true,
// 	min: 10000,
// 	max: 100000,
// 	step: 10000,
// 	scale: true,
// 	from: 10000,
// 	to: 20000
// });


// $('.js-range-slider-3').rangeSlider({ 
// 	type: 'double-vertical',
// 	flag: true,
// 	min: 10000,
// 	max: 100000,
// 	step: 10000,
// 	scale: true,
// 	from: 18000,
// 	to: 25000
// });


// $('.js-range-slider-4').rangeSlider({ 
// 	type: 'single-vertical',
// 	flag: true,
// 	min: 10000,
// 	max: 100000,
// 	step: 10000,
// 	scale: true,
// 	from: 20000,
// });
