import Panel from '../ts/panel';
import { panelFirst, panelSecond, panelThird, panelFourth } from '../ts/panel';

/* ----------------------------------------------- first slider with panel -------------------------- */

// const rangeFirst = $('.js-range-slider-1').rangeSlider({
//   min: 0,
//   max: 10000,
//   from: 0,
//   to: 10000,
//   step: 1
// });

// rangeFirst.after(panelFirst.el);

// panelFirst.onChangeVal('from', rangeFirst.data('from'));
// panelFirst.setStepOnInput(rangeFirst.data('step'));

// rangeFirst.on('mousedown', (e) => {
//   const target = e.target.closest('.range-slider');
//   function changeVal() {
//     panelFirst.onChangeVal('from', target.dataset.currentVal);

//   }
//   changeVal();
//   document.addEventListener('mousemove', changeVal);
//   document.addEventListener('mouseup', updateVal);
//   document.addEventListener('mouseup', () => {
//     document.removeEventListener('mousemove', changeVal);
//     document.removeEventListener('mouseup', updateVal);
    
//   });
//   function updateVal() {
//     rangeFirst.rangeSlider('update',{ from : target.dataset.currentVal});
//   }
  
// });

// panelFirst.onInput('from', (value) => {
//   rangeFirst.rangeSlider('update', {from: value});
// })

// panelFirst.onInput('step', (value) => {
//   rangeFirst.rangeSlider('update', {step: value});
// });


// panelFirst.setFlagCheck(rangeFirst.data('flag'));

// panelFirst.flag.onchange = () => {
//   rangeFirst.rangeSlider('update', { flag: panelFirst.flag.checked });
// };
// /* ----------------------------------------------- second slider with panel -------------------------- */

// const rangeSecond = $('.js-range-slider-2').rangeSlider({
//   type: 'double',
//   flag: true,
//   scale: true, 
//   min: -2000,
//   max: 10000,
//   from: -2000,
//   to: 10000,
//   step: 1
// });

// rangeSecond.after(panelSecond.el);

// panelSecond.onChangeVal('from',rangeSecond.data('from'));
// panelSecond.onChangeVal('to',rangeSecond.data('to'));


// rangeSecond.on('mousedown', (e) => {
//   const target = e.target.closest('.range-slider');
//   function changeVal() {
//     panelSecond.onChangeVal('from', target.dataset.from);
//     panelSecond.onChangeVal('to', target.dataset.to);


//   }
//   changeVal();
//   document.addEventListener('mousemove', changeVal);
//   document.addEventListener('mouseup', () => {
//     document.removeEventListener('mousemove', changeVal);
//   });
// });

// panelSecond.onInput('from', (value) => {
//   rangeSecond.rangeSlider('update', { from: value });
// });

// panelSecond.onInput('to', (value) => {
//   rangeSecond.rangeSlider('update', { to: value });
// });

// panelSecond.onInput('step', (value) => {
//   rangeSecond.rangeSlider('update', { step: value });
// });


// panelSecond.setStepOnInput(rangeSecond.data('step'));

// panelSecond.setFlagCheck(rangeSecond.data('flag'));

// panelSecond.flag.onchange = () => {
//   rangeSecond.rangeSlider('update', { flag: panelSecond.flag.checked });
// };

/* ----------------------------------------------- third slider with panel -------------------------- */

// const rangeThird = $('.js-range-slider-3').rangeSlider({
//   type: 'double-vertical',
//   min: 0,
//   max: 10000,
//   from: 0,
//   to: 10000,
//   step: 1000
// });

// rangeThird.after(panelThird.el);

// panelThird.onChangeVal('from',rangeThird.data('from'));
// panelThird.onChangeVal('to',rangeThird.data('to'));


// rangeThird.on('mousedown', (e) => {
//   const target = e.target.closest('.range-slider');
//   if(!target) return;
//   function changeVal() {
//     panelThird.onChangeVal('from', target.dataset.from);
//     panelThird.onChangeVal('to', target.dataset.to);


//   }
//   changeVal();
//   document.addEventListener('mousemove', changeVal);
//   document.addEventListener('mouseup', () => {
//     document.removeEventListener('mousemove', changeVal);
//   });
// });

// panelThird.onInput('from', (value) => {
//   rangeThird.rangeSlider('update', { from: value });
// });

// panelThird.onInput('to', (value) => {
//   rangeThird.rangeSlider('update', { to: value });
// });

// panelThird.onInput('step', (value) => {
//   rangeThird.rangeSlider('update', { step: value });
// });


// panelThird.setStepOnInput(rangeThird.data('step'));

// panelThird.setFlagCheck(rangeThird.data('flag'));

// panelThird.flag.onchange = () => {
//   rangeThird.rangeSlider('update', { flag: panelThird.flag.checked });
// };

/* ----------------------------------------------- fourth slider with panel -------------------------- */

const rangeFourth = $('.js-range-slider-4').rangeSlider({
  type: 'single-vertical',
  min: 0,
  max: 10000,
  from: 0,
  to: 10000,
  step: 1000
});

rangeFourth.after(panelFourth.el);

panelFourth.onChangeVal('from',rangeFourth.data('from'));


rangeFourth.on('mousedown', (e) => {
  const target = e.target.closest('.range-slider');
  if(!target) return;
  function changeVal() {
    panelFourth.onChangeVal('from', target.dataset.from);
  }
  changeVal();
  document.addEventListener('mousemove', changeVal);
  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', changeVal);
  });
});

panelFourth.onInput('from', (value) => {
  rangeFourth.rangeSlider('update', { from: value });
});

panelFourth.onInput('step', (value) => {
  rangeFourth.rangeSlider('update', { step: value });
});


panelFourth.setStepOnInput(rangeFourth.data('step'));

panelFourth.setFlagCheck(rangeFourth.data('flag'));

panelFourth.flag.onchange = () => {
  rangeFourth.rangeSlider('update', { flag: panelFourth.flag.checked });
};
