/* eslint-disable fsd/no-function-declaration-in-event-listener */
/* eslint-disable @typescript-eslint/no-empty-function */
import { IThumb } from '../globals';
import ViewThumb from '../ViewThumb';
import './Observer.test';

describe('test single type thumb', () => {
  const parent = document.createElement('div');
  const inner = document.createElement('div');
  parent.className = 'js-range-slider';
  inner.className = 'js-range-slider__inner';

  document.body.append(parent);
  const settings = {
    el: parent,
    type: 'single',
    min: 0,
    max: 10000,
    from: 0,
    to: 10000,
    step: 150,
    scale: true,
    flag: true,
  };

  let generalVal = settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;
  if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);

  function triggerMouseEvent(node: Element, eventType: string) {
    const event = new MouseEvent(eventType, {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: 100,
    });
    node.dispatchEvent(event);
  }

  let thumb: IThumb;
  // ---------------------- tests

  function onMove(e: MouseEvent) {
    thumb.moveSingleType(e, settings, generalVal);
  }

  function onClick(e: MouseEvent) {
    thumb.onClickSingleType(e, settings, generalVal);
  }

  beforeEach(() => {
    thumb = new ViewThumb(settings, generalVal);
    thumb.el.className = 'js-range-slider__thumb js-range-slider__thumb-first';
    parent.style.position = 'relative';
    parent.style.width = '400px';
    parent.style.height = '8px';

    thumb.el.style.width = '15px';
    thumb.el.style.height = '15px';
    thumb.el.style.position = 'absolute';
    thumb.el.style.left = '0%';
    thumb.el.style.display = 'block';
    parent.append(thumb.hiddenTrack);
    thumb.hiddenTrack.append(thumb.el, inner);
  });
  afterEach(() => {
    parent.removeChild(thumb.hiddenTrack);
    thumb.hiddenTrack.removeChild(thumb.el);
    thumb.hiddenTrack.removeChild(inner);
  });

  test('return value not undefined', () => {
    expect(thumb).not.toBeUndefined();
  });

  test('must be instance of HTMLElement', () => {
    expect(thumb.el).toBeInstanceOf(HTMLElement);
  });

  test('thumbPos must be defined and must be a number by click', () => {
    parent.addEventListener('mousedown', onClick);
    triggerMouseEvent(parent, 'mousedown');
    expect(parseFloat(thumb.el.style.left)).not.toBeUndefined();
    expect(thumb.el.style.left).toMatch(/%/);
    parent.removeEventListener('mousedown', onClick);
  });

  test('thumbPos must be defined and must be a number by mousemove', () => {
    thumb.el.addEventListener('mousedown', onMove);
    parent.addEventListener('mousedown', onMove);

    triggerMouseEvent(thumb.el, 'mousedown');
    triggerMouseEvent(parent, 'mousedown');
    expect(parseFloat(thumb.el.style.left)).not.toBeUndefined();
    expect(thumb.el.style.left).toMatch(/%/);
    thumb.el.removeEventListener('mousedown', onMove);
    parent.removeEventListener('mousedown', onMove);
  });

  test('thumbPos must be more then 0', () => {
    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: -100,
      });
      node.dispatchEvent(event);
    }
    thumb.el.addEventListener('mousedown', onMove);
    triggerMouseEvent(thumb.el, 'mousedown');
    expect(parseFloat(thumb.el.style.left)).toBeGreaterThanOrEqual(0);

    thumb.el.removeEventListener('mousedown', onMove);
  });
  test('thumbPos must be less then parent width', () => {
    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: 700,
      });
      node.dispatchEvent(event);
    }
    thumb.el.addEventListener('mousedown', onMove);
    triggerMouseEvent(thumb.el, 'mousedown');
    expect(parseFloat(thumb.el.style.left)).toBeLessThanOrEqual(parseFloat(parent.style.width));

    thumb.el.removeEventListener('mousedown', onMove);
  });

  test('thumbPos must be less then parent width', () => {
    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: 400,
      });
      node.dispatchEvent(event);
    }
    parent.addEventListener('mousedown', onClick);
    triggerMouseEvent(parent, 'mousedown');
    expect(parseFloat(thumb.el.style.left)).toBeLessThanOrEqual(385);

    parent.removeEventListener('mousedown', onClick);
  });
});

// -------------------------------- test double type

describe('test double type thumb', () => {
  const parent = document.createElement('div');
  const inner = document.createElement('div');
  parent.className = 'js-range-slider';
  inner.className = 'js-range-slider__inner';

  document.body.append(parent);
  const settings = {
    el: parent,
    type: 'double',
    min: 0,
    max: 10000,
    from: 0,
    to: 10000,
    step: 150,
    scale: true,
    flag: true,
  };
  let generalVal = settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;
  if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);

  function triggerMouseEvent(node: Element, eventType: string) {
    const event = new MouseEvent(eventType, {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: 700,
    });
    node.dispatchEvent(event);
  }

  let thumb: IThumb;
  let secondThumb: IThumb;

  function onMove(e: MouseEvent) {
    thumb.moveDoubleType(e, settings, generalVal);
  }

  function onClick(e: MouseEvent) {
    thumb.onClickDoubleType(e, settings, generalVal);
  }

  beforeEach(() => {
    thumb = new ViewThumb(settings, generalVal);
    secondThumb = new ViewThumb(settings, generalVal);
    thumb.el.className = 'js-range-slider__thumb js-range-slider__thumb_first';
    secondThumb.el.className = 'js-range-slider__thumb js-range-slider__thumb_second';
    parent.style.position = 'relative';
    parent.style.width = '400px';
    parent.style.height = '8px';

    thumb.el.style.width = '15px';
    thumb.el.style.height = '15px';
    thumb.el.style.position = 'absolute';
    thumb.el.style.left = '0%';
    thumb.el.style.display = 'block';

    secondThumb.el.style.width = '15px';
    secondThumb.el.style.height = '15px';
    secondThumb.el.style.position = 'absolute';
    secondThumb.el.style.left = '100%';
    secondThumb.el.style.display = 'block';

    parent.append(thumb.hiddenTrack);

    thumb.hiddenTrack.append(thumb.el, secondThumb.el, inner);

    parent.getBoundingClientRect = jest.fn(() => ({
      width: 400,
      height: 0,
      x: 0,
      y: 0,
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
      toJSON: jest.fn(),
    }));

    thumb.el.getBoundingClientRect = jest.fn(() => ({
      width: 15,
      height: 15,
      x: 15,
      y: 15,
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
      toJSON: jest.fn(),
    }));

    secondThumb.el.getBoundingClientRect = jest.fn(() => ({
      width: 15,
      height: 15,
      x: 400,
      y: 15,
      bottom: 0,
      left: 385,
      right: 0,
      top: 0,
      toJSON: jest.fn(),
    }));
  });

  afterEach(() => {
    parent.removeChild(thumb.hiddenTrack);
    thumb.hiddenTrack.removeChild(thumb.el);
    thumb.hiddenTrack.removeChild(secondThumb.el);
    thumb.hiddenTrack.removeChild(inner);
  });

  test('return value not undefined', () => {
    expect(thumb).not.toBeUndefined();
    expect(secondThumb).not.toBeUndefined();
  });

  test('must be instance of HTMLelement', () => {
    expect(thumb.el).toBeInstanceOf(HTMLElement);
    expect(secondThumb.el).toBeInstanceOf(HTMLElement);
  });

  test('thumbPos and secondThumbPos must be defined and must be a number by click', () => {
    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: 350,
      });
      node.dispatchEvent(event);
    }
    parent.addEventListener('mousedown', onClick);
    triggerMouseEvent(parent, 'mousedown');
    expect(parseFloat(thumb.el.style.left)).not.toBeUndefined();

    expect(parseFloat(secondThumb.el.style.left)).not.toBeUndefined();
    expect(thumb.el.style.left).toMatch(/%/);
    expect(secondThumb.el.style.left).toMatch(/%/);
    expect(secondThumb.el.className).toMatch(/second/);
    parent.removeEventListener('mousedown', onClick);
  });

  test('thumbPos and secondThumbPos must be defined and must be a number by click', () => {
    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: 100,
      });
      node.dispatchEvent(event);
    }
    parent.addEventListener('mousedown', onClick);
    triggerMouseEvent(parent, 'mousedown');
    expect(thumb.el.className).toMatch(/first/);
    parent.removeEventListener('mousedown', onClick);
  });

  test('thumbPos must be defined and must be a number by mousemove', () => {
    thumb.el.addEventListener('mousemove', onMove);
    secondThumb.el.addEventListener('mousemove', onMove);
    parent.addEventListener('mousemove', onMove);
    triggerMouseEvent(thumb.el, 'mousemove');
    triggerMouseEvent(secondThumb.el, 'mousemove');
    triggerMouseEvent(parent, 'mousemove');
    expect(parseFloat(thumb.el.style.left)).not.toBeUndefined();
    expect(parseFloat(secondThumb.el.style.left)).not.toBeUndefined();
    expect(thumb.el.style.left).toMatch(/%/);
    expect(secondThumb.el.style.left).toMatch(/%/);
    thumb.el.removeEventListener('mousemove', onMove);
    secondThumb.el.removeEventListener('mousemove', onMove);
    parent.removeEventListener('mousemove', onMove);
  });

  test('thumbPos must be more then 0', () => {
    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: -100,
      });
      node.dispatchEvent(event);
    }
    thumb.el.addEventListener('mousedown', onMove);
    thumb.el.addEventListener('mouseup', onMove);
    secondThumb.el.addEventListener('mousedown', onMove);
    secondThumb.el.addEventListener('mouseup', onMove);
    triggerMouseEvent(thumb.el, 'mousedown');
    triggerMouseEvent(thumb.el, 'mouseup');
    triggerMouseEvent(secondThumb.el, 'mousedown');
    triggerMouseEvent(secondThumb.el, 'mouseup');
    expect(parseFloat(thumb.el.style.left)).toBeGreaterThanOrEqual(0);
    expect(parseFloat(secondThumb.el.style.left)).toBeGreaterThanOrEqual(0);

    thumb.el.removeEventListener('mousedown', onMove);
    secondThumb.el.removeEventListener('mousedown', onMove);
  });
  test('thumbPos must be less then parent width', () => {
    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: 700,
      });
      node.dispatchEvent(event);
    }
    thumb.el.addEventListener('mousemove', onMove);
    secondThumb.el.addEventListener('mousemove', onMove);
    triggerMouseEvent(thumb.el, 'mousemove');
    expect(parseFloat(thumb.el.style.left)).toBeLessThanOrEqual(parseFloat(parent.style.width));

    thumb.el.removeEventListener('mousemove', onMove);
    secondThumb.el.removeEventListener('mousemove', onMove);
  });
});

// ------------ test single vertical

describe('test single-vertical type thumb', () => {
  const parent = document.createElement('div');
  const inner = document.createElement('div');
  parent.className = 'js-range-slider';
  inner.className = 'js-range-slider__inner';

  document.body.append(parent);
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
  let generalVal = settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;
  if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);

  function triggerMouseEvent(node: Element, eventType: string) {
    const event = new MouseEvent(eventType, {
      view: window,
      bubbles: true,
      cancelable: true,
      clientY: 0,
    });
    node.dispatchEvent(event);
  }

  let thumb: IThumb;
  // ---------------------- tests

  function onMove(e: MouseEvent) {
    thumb.moveSingleType(e, settings, generalVal);
  }

  function onClick(e: MouseEvent) {
    thumb.onClickSingleType(e, settings, generalVal);
  }

  beforeEach(() => {
    thumb = new ViewThumb(settings, generalVal);
    thumb.el.className = 'js-range-slider__thumb js-range-slider__thumb-first';
    parent.style.position = 'relative';
    parent.style.height = '400px';
    parent.style.width = '8px';

    thumb.el.style.width = '15px';
    thumb.el.style.height = '15px';
    thumb.el.style.position = 'absolute';
    thumb.el.style.top = '0%';
    thumb.el.style.display = 'block';
    parent.append(thumb.hiddenTrack);
    thumb.hiddenTrack.append(thumb.el, inner);
  });
  afterEach(() => {
    parent.removeChild(thumb.hiddenTrack);
    thumb.hiddenTrack.removeChild(inner);
    thumb.hiddenTrack.removeChild(thumb.el);
  });

  test('return value not undefined', () => {
    expect(thumb).not.toBeUndefined();
  });

  test('must be instance of HTMLelement and has class .js-range-slider__thumb', () => {
    expect(thumb.el).toBeInstanceOf(HTMLElement);
    expect(thumb.el.className).toMatch(/thumb/);
  });

  test('thumbPos must be defined and must be a number by click', () => {
    parent.addEventListener('mousedown', onClick);
    triggerMouseEvent(parent, 'mousedown');
    expect(parseFloat(thumb.el.style.top)).not.toBeUndefined();
    expect(thumb.el.style.top).toMatch(/%/);
    parent.removeEventListener('mousedown', onClick);
  });

  test('thumbPos must be defined and must be a number by mousemove', () => {
    thumb.el.addEventListener('mousedown', onMove);
    triggerMouseEvent(thumb.el, 'mousedown');
    expect(parseFloat(thumb.el.style.top)).not.toBeUndefined();
    expect(thumb.el.style.top).toMatch(/%/);
    thumb.el.removeEventListener('mousedown', onMove);
  });

  test('thumbPos must be more then 0', () => {
    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientY: -100,
      });
      node.dispatchEvent(event);
    }
    thumb.el.addEventListener('mousedown', onMove);
    triggerMouseEvent(thumb.el, 'mousedown');
    expect(parseFloat(thumb.el.style.top)).toBeGreaterThanOrEqual(0);

    thumb.el.removeEventListener('mousedown', onMove);
  });
  test('thumbPos must be less then parent width', () => {
    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientY: 700,
      });
      node.dispatchEvent(event);
    }
    thumb.el.addEventListener('mousedown', onMove);
    triggerMouseEvent(thumb.el, 'mousedown');
    expect(parseFloat(thumb.el.style.top)).toBeLessThanOrEqual(parseFloat(parent.style.height));

    thumb.el.removeEventListener('mousedown', onMove);
  });

  test('thumbPos must be less then parent width', () => {
    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientY: 400,
      });
      node.dispatchEvent(event);
    }
    parent.addEventListener('mousedown', onClick);
    triggerMouseEvent(parent, 'mousedown');
    expect(parseFloat(thumb.el.style.top)).toBeLessThanOrEqual(385);

    parent.removeEventListener('mousedown', onClick);
  });
});

// -------------------------------- test double-vertical type

describe('test double-vertical type thumb', () => {
  const parent = document.createElement('div');
  const inner = document.createElement('div');
  parent.className = 'js-range-slider';
  inner.className = 'js-range-slider__inner';

  document.body.append(parent);
  const settings = {
    el: parent,
    type: 'double-vertical',
    min: 0,
    max: 10000,
    from: 0,
    to: 10000,
    step: 150,
    scale: true,
    flag: true,
  };
  let generalVal = settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;
  if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);

  function triggerMouseEvent(node: Element, eventType: string) {
    const event = new MouseEvent(eventType, {
      view: window,
      bubbles: true,
      cancelable: true,
      clientY: 700,
    });
    node.dispatchEvent(event);
  }

  let thumb: IThumb;
  let secondThumb: IThumb;
  // ---------------------- tests

  function onMove(e: MouseEvent) {
    thumb.moveDoubleType(e, settings, generalVal);
  }

  function onClick(e: MouseEvent) {
    thumb.onClickDoubleType(e, settings, generalVal);
  }

  beforeEach(() => {
    thumb = new ViewThumb(settings, generalVal);
    secondThumb = new ViewThumb(settings, generalVal);
    thumb.el.className = 'js-range-slider__thumb js-range-slider__thumb_first';
    secondThumb.el.className = 'js-range-slider__thumb js-range-slider__thumb_second';
    parent.style.position = 'relative';
    parent.style.height = '400px';
    parent.style.width = '8px';

    thumb.el.style.width = '15px';
    thumb.el.style.height = '15px';
    thumb.el.style.position = 'absolute';
    thumb.el.style.top = '0%';
    thumb.el.style.display = 'block';

    secondThumb.el.style.width = '15px';
    secondThumb.el.style.height = '15px';
    secondThumb.el.style.position = 'absolute';
    secondThumb.el.style.top = '100%';
    secondThumb.el.style.display = 'block';

    parent.append(thumb.hiddenTrack);
    thumb.hiddenTrack.append(thumb.el, secondThumb.el, inner);

    parent.getBoundingClientRect = jest.fn(() => ({
      width: 0,
      height: 400,
      x: 0,
      y: 0,
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
      toJSON: jest.fn(),
    }));

    thumb.el.getBoundingClientRect = jest.fn(() => ({
      width: 15,
      height: 15,
      x: 15,
      y: 15,
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
      toJSON: jest.fn(),
    }));

    secondThumb.el.getBoundingClientRect = jest.fn(() => ({
      width: 15,
      height: 15,
      x: 400,
      y: 15,
      bottom: 0,
      left: 0,
      right: 0,
      top: 385,
      toJSON: jest.fn(),
    }));
  });

  afterEach(() => {
    parent.removeChild(thumb.hiddenTrack);
    thumb.hiddenTrack.removeChild(secondThumb.el);
    thumb.hiddenTrack.removeChild(thumb.el);
    thumb.hiddenTrack.removeChild(inner);
  });

  test('return value not undefined', () => {
    expect(thumb).not.toBeUndefined();
    expect(secondThumb).not.toBeUndefined();
  });

  test('must be instance of HTMLElement', () => {
    expect(thumb.el).toBeInstanceOf(HTMLElement);
    expect(secondThumb.el).toBeInstanceOf(HTMLElement);
  });

  test('thumbPos and secondThumbPos must be defined and must be a number by click', () => {
    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientY: 350,
      });
      node.dispatchEvent(event);
    }
    parent.addEventListener('mousedown', onClick);
    triggerMouseEvent(parent, 'mousedown');
    expect(parseFloat(thumb.el.style.top)).not.toBeUndefined();

    expect(parseFloat(secondThumb.el.style.top)).not.toBeUndefined();
    expect(thumb.el.style.top).toMatch(/%/);
    expect(secondThumb.el.style.top).toMatch(/%/);
    expect(secondThumb.el.className).toMatch(/second/);
    parent.removeEventListener('mousedown', onClick);
  });

  test('thumbPos and secondThumbPos must be defined and must be a number by click', () => {
    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientY: 100,
      });
      node.dispatchEvent(event);
    }
    parent.addEventListener('mousedown', onClick);
    triggerMouseEvent(parent, 'mousedown');
    expect(thumb.el.className).toMatch(/first/);
    parent.removeEventListener('mousedown', onClick);
  });

  test('test general val', () => {
    function triggerMouseEvent(node: Element, eventType: string) {
      const settings = {
        el: parent,
        type: 'double-vertical',
        min: 0,
        max: 10000,
        from: 0,
        to: 10000,
        step: 150,
        scale: true,
        flag: true,
      };
      let generalVal = settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;
      if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientY: 100,
      });
      node.dispatchEvent(event);
    }
    parent.addEventListener('mousedown', onClick);
    triggerMouseEvent(parent, 'mousedown');

    parent.removeEventListener('mousedown', onClick);
  });

  test('thumbPos must be more then 0 by move', () => {
    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientY: -100,
      });
      node.dispatchEvent(event);
    }
    thumb.el.addEventListener('mousedown', onMove);
    thumb.el.addEventListener('mouseup', onMove);

    triggerMouseEvent(thumb.el, 'mousedown');
    triggerMouseEvent(thumb.el, 'mouseup');
    expect(parseFloat(thumb.el.style.top)).toBeGreaterThanOrEqual(0);

    thumb.el.removeEventListener('mousedown', onMove);
  });

  test('secondThumbPos must be more then 0 by move', () => {
    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientY: 350,
      });
      node.dispatchEvent(event);
    }

    secondThumb.el.addEventListener('mousedown', onMove);
    secondThumb.el.addEventListener('mouseup', onMove);

    triggerMouseEvent(secondThumb.el, 'mousedown');
    triggerMouseEvent(secondThumb.el, 'mouseup');

    expect(parseFloat(secondThumb.el.style.top)).toBeGreaterThanOrEqual(0);

    secondThumb.el.removeEventListener('mousedown', onMove);
  });

  test('secondThumbPos must be greater than thumbPos', () => {
    thumb.el.getBoundingClientRect = jest.fn(() => ({
      width: 15,
      height: 15,
      x: 15,
      y: 15,
      bottom: 0,
      left: 0,
      right: 0,
      top: 300,
      toJSON: jest.fn(),
    }));

    secondThumb.el.getBoundingClientRect = jest.fn(() => ({
      width: 15,
      height: 15,
      x: 400,
      y: 15,
      bottom: 0,
      left: 0,
      right: 0,
      top: 100,
      toJSON: jest.fn(),
    }));
    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientY: 0,
      });
      node.dispatchEvent(event);
    }
    thumb.el.addEventListener('mousemove', onMove);
    triggerMouseEvent(thumb.el, 'mousemove');
    expect(parseFloat(secondThumb.el.style.top)).toBeGreaterThanOrEqual(parseFloat(thumb.el.style.top));

    thumb.el.removeEventListener('mousedown', onMove);
  });
});
