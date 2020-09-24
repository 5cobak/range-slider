import ViewSingle from '../../ts/ViewSingle'
import { IViewSingle } from '../../ts/globals'
import './thumb.test'
import './flag.test'
import './inner.test'
import './scale.test'
import './track.test'

describe('test ViewTrack', () => {
  const settings = {
    type: 'single',
    min: 0,
    max: 10000,
    from: 0,
    to: 10000,
    step: 150,
    scale: true,
    flag: true,
  };
  const isVertical = settings.type.match('vertical');
  const coord = isVertical ? 'top' : 'left';
  const size = isVertical ? 'height' : 'width';
  const parent = document.createElement('div');

  parent.className = 'range-slider';

  parent.style.position = 'absolute';
  parent.style[size] = '400px'

  let generalVal =
      settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;

  if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);

  const view = new ViewSingle(parent, settings, generalVal);

  document.body.append(view.el);

  view.thumb.el.style.width = '15px'
  view.thumb.el.style.height = '15px'
  view.thumb.el.style.position = 'absolute'

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
  })

  test('test click in single type', () => {
    view.addEvents(generalVal);

    function onClick(e: MouseEvent) {
      view.thumb.onClickSingleType(e, settings, generalVal);
    }
    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: 150,
      });
      node.dispatchEvent(event);
    }
    view.track.el.addEventListener('mousedown', onClick);
    triggerMouseEvent(view.track.el, 'mousedown');

    expect(view.thumb.el.style.left).toMatch(/px/)
  })
  test('test move in single type', () => {
    view.addEvents(generalVal);
    function onMove(e: MouseEvent) {
      view.thumb.moveSingleType(e, settings, generalVal);
    }

    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: 5,
      });
      node.dispatchEvent(event);
    }
    view.track.el.addEventListener('mousedown', onMove);
    triggerMouseEvent(view.track.el, 'mousedown');
    expect(view.thumb.el.style.left).toMatch(/px/);
  })
})

// test ViewSingle without scale and flag
describe('ViewSingle without scale and flag', () => {
  const settings = {
    type: 'single',
    min: 0,
    max: 10000,
    from: 0,
    to: 10000,
    step: 150,
    scale: false,
    flag: false,
  };
  const isVertical = settings.type.match('vertical');
  const coord = isVertical ? 'top' : 'left';
  const size = isVertical ? 'height' : 'width';
  const parent = document.createElement('div');

  parent.className = 'range-slider';

  parent.style.position = 'absolute';
  parent.style[size] = '400px'

  let generalVal =
      settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;

  if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);

  const view = new ViewSingle(parent, settings, generalVal);

  document.body.append(view.el);

  view.thumb.el.style.width = '15px'
  view.thumb.el.style.height = '15px'
  view.thumb.el.style.position = 'absolute'

  view.track.el.style[size] = '400px';
  view.track.el.style.position = 'relative';

  test('view must be defined and has properties: thumb, scale, inner, flag', () => {
    expect(view).not.toBeUndefined();
    expect(view.thumb).not.toBeUndefined();
    expect(view.scale).not.toBeUndefined();
    expect(view.inner).not.toBeUndefined();
    expect(view.flag).not.toBeUndefined();
  })

  test('test click in single type', () => {
    view.addEvents(generalVal);

    function onClick(e: MouseEvent) {
      view.thumb.onClickSingleType(e, settings, generalVal);
    }
    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: 150,
      });
      node.dispatchEvent(event);
    }
    view.track.el.addEventListener('mousedown', onClick);
    triggerMouseEvent(view.track.el, 'mousedown');

    expect(view.thumb.el.style.left).toMatch(/px/)
  })
  test('test move in single type', () => {
    view.addEvents(generalVal);
    function onMove(e: MouseEvent) {
      view.thumb.moveSingleType(e, settings, generalVal);
    }

    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: 5,
      });
      node.dispatchEvent(event);
    }
    view.track.el.addEventListener('mousedown', onMove);
    triggerMouseEvent(view.track.el, 'mousedown');
    expect(view.thumb.el.style.left).toMatch(/px/);
  })
  test('scale and flag must be null', () => {
    expect(view.thumb.el.querySelector('range-slider__flag')).toBeNull();
    expect(view.track.el.querySelector('range-slider__scale')).toBeNull();
  })
})
// test ViewSingle if type is single-vertical
describe('test ViewSingle if type is single-vertical', () => {
  const settings = {
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
  const coord = isVertical ? 'top' : 'left';
  const size = isVertical ? 'height' : 'width';
  const parent = document.createElement('div');

  parent.className = 'range-slider';

  parent.style.position = 'absolute';
  parent.style[size] = '400px'

  let generalVal =
      settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;

  if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);

  const view = new ViewSingle(parent, settings, generalVal);

  document.body.append(view.el);

  view.thumb.el.style.width = '15px'
  view.thumb.el.style.height = '15px'
  view.thumb.el.style.position = 'absolute'

  view.track.el.style[size] = '400px';
  view.track.el.style.position = 'relative';

  test('view must be defined and has properties: thumb, scale, inner, flag', () => {
    expect(view).not.toBeUndefined();
    expect(view.thumb).not.toBeUndefined();
    expect(view.scale).not.toBeUndefined();
    expect(view.inner).not.toBeUndefined();
    expect(view.flag).not.toBeUndefined();
  })

  test('test click in single type', () => {
    view.addEvents(generalVal);

    function onClick(e: MouseEvent) {
      view.thumb.onClickSingleType(e, settings, generalVal);
    }
    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: 150,
      });
      node.dispatchEvent(event);
    }
    view.track.el.addEventListener('mousedown', onClick);
    triggerMouseEvent(view.track.el, 'mousedown');

    expect(view.thumb.el.style.top).toMatch(/px/)
  })
  test('test move in single type', () => {
    view.addEvents(generalVal);
    function onMove(e: MouseEvent) {
      view.thumb.moveSingleType(e, settings, generalVal);
    }

    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: 5,
      });
      node.dispatchEvent(event);
    }
    view.track.el.addEventListener('mousedown', onMove);
    triggerMouseEvent(view.track.el, 'mousedown');
    expect(view.thumb.el.style.top).toMatch(/px/);
  })
  test('scale and flag must be null', () => {
    expect(view.thumb.el.querySelector('range-slider__flag')).toBeNull();
    expect(view.track.el.querySelector('range-slider__scale')).toBeNull();
  })
})
