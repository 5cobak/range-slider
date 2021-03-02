import { panelFirst, panelSecond } from './panel/panels';
import Controller from './controller/Controller';
/* ----------------------------------------------- first slider with panel -------------------------- */

const rangeFirst = $('.js-range-slider-1').rangeSlider({
  type: 'single-horizontal',
  min: -1,
  max: 1,
  from: 100,
  step: 0.3,
});

rangeFirst.after(panelFirst.el);

new Controller(rangeFirst, panelFirst);

// // /* ----------------------------------------------- second slider with panel -------------------------- */

const rangeSecond = $('.js-range-slider-2').rangeSlider({
  type: 'double-horizontal',
  flag: true,
  scale: true,
  min: -2000,
  max: 10000,
  from: -2000,
  to: 3000,
  step: 1,
});

rangeSecond.after(panelSecond.el);

new Controller(rangeSecond, panelSecond);
