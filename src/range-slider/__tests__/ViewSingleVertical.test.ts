import ViewSingleVertical from '../View/ViewSingleVertical';

import './Thumb.test';
import './Flag.test';
import './Inner.test';
import './Scale.test';
import './Track.test';
import './Observer.test';

describe('test ViewTrack', () => {
  const parent = document.createElement('div');
  const settings = {
    el: parent,
    type: 'single-vertical',
    min: 0,
    max: 10000,
    from: 0,
    to: 10000,
    step: 150,
    scale: true,
    flag: true,
  };
  const isVertical = settings.type.match('vertical');
  const size = isVertical ? 'height' : 'width';

  parent.className = 'js-range-slider';

  parent.style.position = 'absolute';
  parent.style[size] = '400px';

  let generalVal = settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;

  if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);

  const view = new ViewSingleVertical(parent, settings, generalVal);

  document.body.append(view.el);

  view.thumb.el.style.width = '15px';
  view.thumb.el.style.height = '15px';
  view.thumb.el.style.position = 'absolute';

  view.track.el.style[size] = '400px';
  view.track.el.style.position = 'relative';

  test('view must be defined and has properties: thumb, scale, inner, flag', () => {
    expect(view).not.toBeUndefined();
    expect(view.thumb).not.toBeUndefined();
    expect(view.scale).not.toBeUndefined();
    expect(view.inner).not.toBeUndefined();
    expect(view.flag).not.toBeUndefined();

    expect(view.thumb).not.toBeUndefined();
    expect(view.scale).not.toBeUndefined();
    expect(view.inner).not.toBeUndefined();
    expect(view.flag).not.toBeUndefined();
  });
});

// test ViewSingle without scale and flag
describe('ViewSingle without scale and flag', () => {
  const parent = document.createElement('div');
  const settings = {
    el: parent,
    type: 'single-vertical',
    min: 0,
    max: 10000,
    from: 0,
    to: 10000,
    step: 150,
    scale: false,
    flag: false,
  };
  const isVertical = settings.type.match('vertical');

  const size = isVertical ? 'height' : 'width';

  parent.className = 'js-range-slider';

  parent.style.position = 'absolute';
  parent.style[size] = '400px';

  let generalVal = settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;

  if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);

  const view = new ViewSingleVertical(parent, settings, generalVal);

  document.body.append(view.el);

  view.thumb.el.style.width = '15px';
  view.thumb.el.style.height = '15px';
  view.thumb.el.style.position = 'absolute';

  view.track.el.style[size] = '400px';
  view.track.el.style.position = 'relative';

  test('view must be defined and has properties: thumb, scale, inner, flag', () => {
    expect(view).not.toBeUndefined();
    expect(view.thumb).not.toBeUndefined();
    expect(view.scale).not.toBeUndefined();
    expect(view.inner).not.toBeUndefined();
    expect(view.flag).not.toBeUndefined();
  });
  test('scale and flag must be null', () => {
    expect(view.thumb.el.querySelector('js-range-slider__flag')).toBeNull();
    expect(view.track.el.querySelector('js-range-slider__scale')).toBeNull();
  });
});
