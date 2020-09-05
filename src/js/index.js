import { panelFirst, panelSecond, panelThird, panelFourth } from '../ts/panel';
/* ----------------------------------------------- first slider with panel -------------------------- */

const rangeFirst = $('.js-range-slider-1').rangeSlider({
  min: 0,
  max: 10000,
  from: 0,
  to: 10000,
  step: 1,
});

rangeFirst.after(panelFirst.el);

panelFirst.onChangeVal('from', rangeFirst.data('from'));
panelFirst.onChangeVal('step', rangeFirst.data('step'));
panelFirst.onChangeVal('min', rangeFirst.data('min'));
panelFirst.onChangeVal('max', rangeFirst.data('max'));

function onMove(e) {
  const target = e.target;
  const track = target.closest('.range-slider');
  if (!track ) return;
  function changeVal() {
    panelFirst.onChangeVal('from', +track.dataset.from);

  }
  function updateVal() {
    rangeFirst.rangeSlider('update', { from: track.dataset.from });
  }
  function removeEventListeners() {
    document.removeEventListener('mouseup', changeVal);
    document.removeEventListener('mouseup', updateVal);
  }
  changeVal();
  document.addEventListener('mousemove', changeVal);
  document.addEventListener('mouseup', updateVal);
  document.addEventListener('mouseup', removeEventListeners);
}

rangeFirst.on('mousedown', onMove);

panelFirst.onInput('from', (value) => {
  rangeFirst.rangeSlider('update', { from: value });
});

panelFirst.onInput('min', (value) => {
  rangeFirst.rangeSlider('update', { min: value });
});

panelFirst.onInput('max', (value) => {
  rangeFirst.rangeSlider('update', { max: value });
});

panelFirst.onInput('step', (value) => {
  rangeFirst.rangeSlider('update', { step: value });
});

panelFirst.flag.checked = rangeFirst.data('flag')
panelFirst.scale.checked = rangeFirst.data('scale')

panelFirst.flag.onchange = () => {
  rangeFirst.rangeSlider('update', { flag: panelFirst.flag.checked });

};

panelFirst.scale.onchange = () => {
  rangeFirst.rangeSlider('update', { scale: panelFirst.scale.checked });
};
// /* ----------------------------------------------- second slider with panel -------------------------- */

const rangeSecond = $('.js-range-slider-2').rangeSlider({
  type: 'double',
  flag: true,
  scale: true,
  min: -2000,
  max: 10000,
  from: -2000,
  to: 10000,
  step: 1
});

rangeSecond.after(panelSecond.el);

panelSecond.onChangeVal('from',rangeSecond.data('from'));
panelSecond.onChangeVal('to',rangeSecond.data('to'));
panelSecond.onChangeVal('step',rangeSecond.data('step'));
panelSecond.onChangeVal('min',rangeSecond.data('min'));
panelSecond.onChangeVal('max',rangeSecond.data('max'));

rangeSecond.on('mousedown', (e) => {
  const target = e.target.closest('.range-slider');
  function changeVal() {
    panelSecond.onChangeVal('from', target.dataset.from);
    panelSecond.onChangeVal('to', target.dataset.to);
  }
  changeVal();
  document.addEventListener('mousemove', changeVal);
  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', changeVal);
  });
});

panelSecond.onInput('from', (value) => {
  rangeSecond.rangeSlider('update', { from: value });
});

panelSecond.onInput('to', (value) => {
  rangeSecond.rangeSlider('update', { to: value });
});

panelSecond.onInput('min', (value) => {
  rangeSecond.rangeSlider('update', { min: value });
});

panelSecond.onInput('max', (value) => {
  rangeSecond.rangeSlider('update', { max: value });
});

panelSecond.onInput('step', (value) => {
  rangeSecond.rangeSlider('update', { step: value });
});

panelSecond.flag.checked = rangeSecond.data('flag')
panelSecond.scale.checked = rangeSecond.data('scale')

panelSecond.flag.onchange = () => {
  rangeSecond.rangeSlider('update', { flag: panelSecond.flag.checked });
};

panelSecond.scale.onchange = () => {
  rangeSecond.rangeSlider('update', { scale: panelSecond.scale.checked });
};

/* ----------------------------------------------- third slider with panel -------------------------- */

const rangeThird = $('.js-range-slider-3').rangeSlider({
  type: 'double-vertical',
  min: 0,
  max: 10000,
  from: 0,
  to: 10000,
  step: 1000
});

rangeThird.after(panelThird.el);

panelThird.onChangeVal('from',rangeThird.data('from'));
panelThird.onChangeVal('to',rangeThird.data('to'));
panelThird.onChangeVal('step',rangeThird.data('step'));
panelThird.onChangeVal('min',rangeThird.data('min'));
panelThird.onChangeVal('max',rangeThird.data('max'));

rangeThird.on('mousedown', (e) => {
  const target = e.target.closest('.range-slider');
  if(!target) return;
  function changeVal() {
    panelThird.onChangeVal('from', target.dataset.from);
    panelThird.onChangeVal('to', target.dataset.to);

  }
  changeVal();
  document.addEventListener('mousemove', changeVal);
  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', changeVal);
  });
});

panelThird.onInput('from', (value) => {
  rangeThird.rangeSlider('update', { from: value });
});

panelThird.onInput('to', (value) => {
  rangeThird.rangeSlider('update', { to: value });
});

panelThird.onInput('min', (value) => {
  rangeThird.rangeSlider('update', { min: value });
});

panelThird.onInput('to', (value) => {
  rangeThird.rangeSlider('update', { to: value });
});

panelThird.onInput('max', (value) => {
  rangeThird.rangeSlider('update', { max: value });
});

panelThird.flag.checked = rangeThird.data('flag')
panelThird.scale.checked = rangeThird.data('scale')

panelThird.flag.onchange = () => {
  rangeThird.rangeSlider('update', { flag: panelThird.flag.checked });
};

panelThird.scale.onchange = () => {
  rangeThird.rangeSlider('update', { scale: panelThird.scale.checked });
};

/* ----------------------------------------------- fourth slider with panel -------------------------- */

// const rangeFourth = $('.js-range-slider-4').rangeSlider({
//   type: 'single-vertical',
//   min: 0,
//   max: 10000,
//   from: 0,
//   to: 10000,
//   step: 1000
// });

// rangeFourth.after(panelFourth.el);

// panelFourth.onChangeVal('from',rangeFourth.data('from'));

// rangeFourth.on('mousedown', (e) => {
//   const target = e.target.closest('.range-slider');
//   if(!target) return;
//   function changeVal() {
//     panelFourth.onChangeVal('from', target.dataset.from);
//   }
//   changeVal();
//   document.addEventListener('mousemove', changeVal);
//   document.addEventListener('mouseup', () => {
//     document.removeEventListener('mousemove', changeVal);
//   });
// });

// panelFourth.onInput('from', (value) => {
//   rangeFourth.rangeSlider('update', { from: value });
// });

// panelFourth.onInput('step', (value) => {
//   rangeFourth.rangeSlider('update', { step: value });
// });

// panelFourth.setStepOnInput(rangeFourth.data('step'));

// panelFourth.setFlagCheck(rangeFourth.data('flag'));

// panelFourth.flag.onchange = () => {
//   rangeFourth.rangeSlider('update', { flag: panelFourth.flag.checked });
// };
