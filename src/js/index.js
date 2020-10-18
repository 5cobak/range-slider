import { panelFirst, panelSecond, panelThird, panelFourth } from '../ts/panel';
/* ----------------------------------------------- first slider with panel -------------------------- */

const rangeFirst = $('.js-range-slider-1').rangeSlider({
  min: 0,
  max: 10000,
  from: 1000,
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
    rangeFirst.rangeSlider( { from: +track.dataset.from },'update');
  }
  function removeEventListeners() {
    setTimeout(()=>{
      document.removeEventListener('mousemove', changeVal);
      document.removeEventListener('touchmove', changeVal);
    document.removeEventListener('mouseup', updateVal);
    },100);
  }
  changeVal();
  document.addEventListener('mousemove', changeVal);
  document.addEventListener('touchmove', changeVal);
  document.addEventListener('mouseup', updateVal);
  document.addEventListener('mouseup', removeEventListeners);
}

rangeFirst.on('mousedown', onMove);
rangeFirst.on('touchmove', onMove);

panelFirst.onInput('from', (value) => {
  rangeFirst.rangeSlider({ from: +value },'update');
  panelFirst.onChangeVal('from', +rangeFirst.data('from'));
  const track = rangeFirst.data('el').querySelector('.range-slider')
  const from = track.dataset.from;
  return from;
});

panelFirst.onInput('min', (value) => {
  rangeFirst.rangeSlider({ min: +value },'update');
  panelFirst.onChangeVal('from', +rangeFirst.data('from'));
  return rangeFirst.data('min');
});

panelFirst.onInput('max', (value) => {
  rangeFirst.rangeSlider( { max: +value },'update');
  panelFirst.onChangeVal('from', +rangeFirst.data('from'));
  return rangeFirst.data('max');
});

panelFirst.onInput('step', (value) => {
  rangeFirst.rangeSlider({ step: value },'update');
  const track = rangeFirst.data('el').querySelector('.range-slider');
  const from = track.dataset.from;
  panelFirst.el.querySelector('.input-from').value = from;
  return rangeFirst.data('step')
});

panelFirst.flag.checked = rangeFirst.data('flag')
panelFirst.scale.checked = rangeFirst.data('scale')

panelFirst.flag.onchange = () => {
  rangeFirst.rangeSlider({ flag: panelFirst.flag.checked },'update');

};

panelFirst.scale.onchange = () => {
  rangeFirst.rangeSlider({ scale: panelFirst.scale.checked },'update');
};
// /* ----------------------------------------------- second slider with panel -------------------------- */

const rangeSecond = $('.js-range-slider-2').rangeSlider({
  type: 'double',
  flag: true,
  scale: true,
  min: -2000,
  max: 10000,
  from: 1000,
  to: -1000,
  step: 1
});

rangeSecond.after(panelSecond.el);

panelSecond.onChangeVal('from',rangeSecond.data('from'));
panelSecond.onChangeVal('to', rangeSecond.data('to'));
panelSecond.onChangeVal('step',rangeSecond.data('step'));
panelSecond.onChangeVal('min',rangeSecond.data('min'));
panelSecond.onChangeVal('max',rangeSecond.data('max'));

function onMoveSec(e) {
  const target = e.target;
  const track = target.closest('.range-slider');
  if (!track ) return;
  function changeVal() {
    panelSecond.onChangeVal('from', +track.dataset.from);
    panelSecond.onChangeVal('to', +track.dataset.to);
  }
  function updateVal() {
    rangeSecond.rangeSlider({ from: +track.dataset.from },'update');
    rangeSecond.rangeSlider( { to: +track.dataset.to },'update');
  }
  function removeEventListeners() {
    setTimeout(()=>{
      document.removeEventListener('mousemove', changeVal);
    document.removeEventListener('mouseup', updateVal);
    },100)
  }
  changeVal();
  document.addEventListener('mousemove', changeVal);
  document.addEventListener('mouseup', updateVal);
  // document.addEventListener('mouseup', removeEventListeners);
}

rangeSecond.on('mousedown', onMoveSec);

panelSecond.onInput('from', (value) => {
  rangeSecond.rangeSlider({ from: +value },'update');
  panelSecond.onChangeVal('from', +rangeSecond.data('from'));
  panelSecond.onChangeVal('to', +rangeSecond.data('to'));
  const track = rangeSecond.data('el').querySelector('.range-slider')
  const from = track.dataset.from;
  const to = track.dataset.to;
  panelSecond.el.querySelector('.input-from').value = from;
  panelSecond.el.querySelector('.input-to').value = to;
  return from;
});

panelSecond.onInput('to', (value) => {
  rangeSecond.rangeSlider( { to: +value },'update');
  panelSecond.onChangeVal('from', +rangeSecond.data('from'));
  panelSecond.onChangeVal('to', +rangeSecond.data('to'));
  const track = rangeSecond.data('el').querySelector('.range-slider')
  const to = track.dataset.to;
  const from = track.dataset.from;
  panelSecond.el.querySelector('.input-to').value = to;
  panelSecond.el.querySelector('.input-from').value = from;
  return to;
});

panelSecond.onInput('min', (value) => {
  rangeSecond.rangeSlider( { min: value },'update');
  panelSecond.onChangeVal('from', +rangeSecond.data('from'));
  panelSecond.onChangeVal('to', +rangeSecond.data('to'));
  return rangeSecond.data('min');
});

panelSecond.onInput('max', (value) => {
  rangeSecond.rangeSlider({ max: +value },'update');
  panelSecond.onChangeVal('from', +rangeSecond.data('from'));
  panelSecond.onChangeVal('to', +rangeSecond.data('to'));
  return rangeSecond.data('max');
});

panelSecond.onInput('step', (value) => {
  rangeSecond.rangeSlider({ step: +value },'update');
  const track = rangeSecond.data('el').querySelector('.range-slider')
  const from = track.dataset.from;
  const to = track.dataset.to;
  panelSecond.el.querySelector('.input-from').value = from;
  panelSecond.el.querySelector('.input-to').value = to;
  return rangeSecond.data('step')
});

panelSecond.flag.checked = rangeSecond.data('flag')
panelSecond.scale.checked = rangeSecond.data('scale')

panelSecond.flag.onchange = () => {
  rangeSecond.rangeSlider({ flag: panelSecond.flag.checked },'update', );
};

panelSecond.scale.onchange = () => {
  rangeSecond.rangeSlider({ scale: panelSecond.scale.checked },'update', );
};

// /* ----------------------------------------------- third slider with panel -------------------------- */

const rangeThird = $('.js-range-slider-3').rangeSlider({
  type: 'double-vertical',
  min: -2000,
  max: 10000,
  from: 0,
  to: -2000,
  step: 1000
});

rangeThird.after(panelThird.el);

panelThird.onChangeVal('from', rangeThird.data('from'));
panelThird.onChangeVal('to', rangeThird.data('to'));
panelThird.onChangeVal('step',rangeThird.data('step'));
panelThird.onChangeVal('min',rangeThird.data('min'));
panelThird.onChangeVal('max',rangeThird.data('max'));

function onMoveThird(e) {
  const target = e.target;
  const track = target.closest('.range-slider');
  if (!track ) return;
  function changeVal() {
    panelThird.onChangeVal('from', +track.dataset.from);
    panelThird.onChangeVal('to', +track.dataset.to);

  }
  function updateVal() {
    rangeThird.rangeSlider({ from: track.dataset.from },'update' );
    rangeThird.rangeSlider({ to: track.dataset.to },'update');
  }
  function removeEventListeners() {
    setTimeout(()=>{
      document.removeEventListener('mousemove', changeVal);
    document.removeEventListener('mouseup', updateVal);
    },100)
  }
  changeVal();
  document.addEventListener('mousemove', changeVal);
  document.addEventListener('mouseup', updateVal);
  document.addEventListener('mouseup', removeEventListeners);
}

rangeThird.on('mousedown', onMoveThird);

panelThird.onInput('from', (value) => {
  rangeThird.rangeSlider({ from: +value },'update');
  panelThird.onChangeVal('from', +rangeThird.data('from'));
  panelThird.onChangeVal('to', +rangeThird.data('to'));
  const track = rangeThird.data('el').querySelector('.range-slider')
  const from = track.dataset.from;
  const to = track.dataset.to;
  panelThird.el.querySelector('.input-from').value = from;
  panelThird.el.querySelector('.input-to').value = to;
  return from;
});

panelThird.onInput('to', (value) => {
  rangeThird.rangeSlider( { to: +value },'update');
  panelThird.onChangeVal('from', +rangeThird.data('from'));
  panelThird.onChangeVal('to', +rangeThird.data('to'));
  const track = rangeThird.data('el').querySelector('.range-slider')
  const to = track.dataset.to;
  const from = track.dataset.from;
  panelThird.el.querySelector('.input-to').value = to;
  panelThird.el.querySelector('.input-from').value = from;
  return to;
});

panelThird.onInput('min', (value) => {
  rangeThird.rangeSlider({ min: value },'update');
  panelThird.onChangeVal('from', +rangeThird.data('from'));
  panelThird.onChangeVal('to', +rangeThird.data('to'));
  return rangeThird.data('min');
});

panelThird.onInput('max', (value) => {
  rangeThird.rangeSlider({ max: +value },'update');
  panelThird.onChangeVal('from', +rangeThird.data('from'));
  panelThird.onChangeVal('to', +rangeThird.data('to'));
  return rangeThird.data('max')
});

panelThird.onInput('step', (value) => {
  rangeThird.rangeSlider({ step: +value },'update');
  panelThird.onChangeVal('from', +rangeThird.data('step'));
  const track = rangeThird.data('el').querySelector('.range-slider')
  const from = track.dataset.from;
  const to = track.dataset.to;
  panelThird.el.querySelector('.input-from').value = from;
  panelThird.el.querySelector('.input-to').value = to;
  return rangeThird.data('step')
});

panelThird.flag.checked = rangeThird.data('flag')
panelThird.scale.checked = rangeThird.data('scale')

panelThird.flag.onchange = () => {
  rangeThird.rangeSlider({ flag: panelThird.flag.checked },'update');
};

panelThird.scale.onchange = () => {
  rangeThird.rangeSlider({ scale: panelThird.scale.checked },'update');
};

// /* ----------------------------------------------- fourth slider with panel -------------------------- */

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
panelFourth.onChangeVal('step',rangeFourth.data('step'));


panelFourth.onChangeVal('from',rangeFourth.data('from'));
panelFourth.onChangeVal('step',rangeFourth.data('step'));
panelFourth.onChangeVal('min',rangeFourth.data('min'));
panelFourth.onChangeVal('max',rangeFourth.data('max'));

function onMoveForth(e) {
  const target = e.target;
  const track = target.closest('.range-slider');
  if (!track ) return;
  function changeVal() {
    panelFourth.onChangeVal('from', +track.dataset.from);

  }
  function updateVal() {
    rangeFourth.rangeSlider({ from: track.dataset.from },'update');
  }
  function removeEventListeners() {
    setTimeout(()=>{
      document.removeEventListener('mousemove', changeVal);
    document.removeEventListener('mouseup', updateVal);
    },100)
  }
  changeVal();
  document.addEventListener('mousemove', changeVal);
  document.addEventListener('mouseup', updateVal);
  document.addEventListener('mouseup', removeEventListeners);
}

rangeFourth.on('mousedown', onMoveForth);

panelFourth.onInput('from', (value) => {
  rangeFourth.rangeSlider({ from: +value },'update');
  panelFourth.onChangeVal('from', +rangeFourth.data('from'));
  const track = rangeFourth.data('el').querySelector('.range-slider')
  const from = track.dataset.from;
  panelFourth.el.querySelector('.input-from').value = from;
  return from;
});

panelFourth.onInput('step', (value) => {
  rangeFourth.rangeSlider({ step: +value },'update');
  const track = rangeFourth.data('el').querySelector('.range-slider')
  const from = track.dataset.from;
  panelFourth.el.querySelector('.input-from').value = from;
  return rangeFourth.data('step');
});

panelFourth.onInput('min', (value) => {
  rangeFourth.rangeSlider({ min: +value },'update');
  const track = rangeFourth.data('el').querySelector('.range-slider')
  const from = track.dataset.from;
  panelFourth.el.querySelector('.input-from').value = from;
  return rangeFourth.data('min');
});

panelFourth.onInput('max', (value) => {
  rangeFourth.rangeSlider( { max: +value },'update');
  panelFourth.onChangeVal('from', +rangeFourth.data('from'));
  const track = rangeFourth.data('el').querySelector('.range-slider')
  const from = track.dataset.from;
  panelFourth.el.querySelector('.input-from').value = from;
  return rangeFourth.data('max')
});

panelFourth.flag.checked = rangeFourth.data('flag')
panelFourth.scale.checked = rangeFourth.data('scale')

panelFourth.flag.onchange = () => {
  rangeFourth.rangeSlider({ flag: panelFourth.flag.checked },'update');
};

panelFourth.scale.onchange = () => {
  rangeFourth.rangeSlider({ scale: panelFourth.scale.checked },'update');
};
