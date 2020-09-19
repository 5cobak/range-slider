/* eslint-disable @typescript-eslint/no-empty-function */
import { IThumb } from '../../ts/globals';
import ViewThumb from '../../ts/ViewThumb';

describe('test single type thumb', () => {
  const parent = document.createElement('div');
  const inner = document.createElement('div');
  parent.className = 'range-slider';
  inner.className = 'range-slider__inner';

  document.body.append(parent);
  const settings = {
    type: 'single',
    min: 0,
    max: 10000,
    from: 0,
    to: 10000,
    step: 100,
    scale: true,
    flag: true,
  };

  function triggerMouseEvent(node: Element, eventType: string) {
    const event = new MouseEvent(eventType, {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: 100,
    })
    node.dispatchEvent(event);
  }

  let thumb: IThumb;
  // ---------------------- tests

  function onMove(e: MouseEvent) {
    thumb.moveSingleType(e, settings);
  }

  function onClick(e: MouseEvent) {
    thumb.onClickSingleType(e, settings);
  }

  beforeEach(() => {
    thumb = new ViewThumb(settings);
    thumb.el.className = 'range-slider__thumb range-slider__thumb-first'
    parent.style.position = 'relative';
    parent.style.width = '400px';
    parent.style.height = '8px'

    thumb.el.style.width = '15px';
    thumb.el.style.height = '15px';
    thumb.el.style.position = 'absolute';
    thumb.el.style.left = '0';
    thumb.el.style.display = 'block';
    parent.append(thumb.el, inner);
  })
  afterEach(() => {
    parent.removeChild(thumb.el);
    parent.removeChild(inner);
  })

  test('return value not undefined', () => {
    expect(thumb).not.toBeUndefined();
  });

  test('must be instance of HTMLelement', () => {
    expect(thumb.el).toBeInstanceOf(HTMLElement);
  });

  test('thumbPos must be defined and must be a number by click', () => {
    parent.addEventListener('mousedown', onClick);
    triggerMouseEvent(parent, 'mousedown');
    expect(parseFloat(thumb.el.style.left)).not.toBeUndefined();
    expect(thumb.el.style.left).toMatch(/px/);
    parent.removeEventListener('mousedown', onClick);
  });

  test('thumbPos must be defined and must be a number by mousemove', () => {
    thumb.el.addEventListener('mousedown', onMove);
    triggerMouseEvent(thumb.el, 'mousedown');
    expect(parseFloat(thumb.el.style.left)).not.toBeUndefined();
    expect(thumb.el.style.left).toMatch(/px/);
    thumb.el.removeEventListener('mousedown', onMove);
  });

  test('thumbPos must be more then 0', () => {
    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: -100,
      })
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
      })
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
      })
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
  parent.className = 'range-slider';
  inner.className = 'range-slider__inner';

  document.body.append(parent);
  const settings = {
    type: 'double',
    min: 0,
    max: 10000,
    from: 0,
    to: 10000,
    step: 100,
    scale: true,
    flag: true,
  };

  function triggerMouseEvent(node: Element, eventType: string) {
    const event = new MouseEvent(eventType, {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: 700,
    })
    node.dispatchEvent(event);
  }

  let thumb: IThumb;
  let secondThumb: IThumb;
  // ---------------------- tests

  function onMove(e: MouseEvent) {
    thumb.moveDoubleType(e, settings);
  }

  function onClick(e: MouseEvent) {
    thumb.onClickDoubleType(e, settings);
  }

  beforeEach(() => {
    thumb = new ViewThumb(settings);
    secondThumb = new ViewThumb(settings);
    thumb.el.className = 'range-slider__thumb range-slider__thumb_first';
    secondThumb.el.className = 'range-slider__thumb range-slider__thumb_second';
    parent.style.position = 'relative';
    parent.style.width = '400px';
    parent.style.height = '8px'

    thumb.el.style.width = '15px';
    thumb.el.style.height = '15px';
    thumb.el.style.position = 'absolute';
    thumb.el.style.left = '0';
    thumb.el.style.display = 'block';

    secondThumb.el.style.width = '15px';
    secondThumb.el.style.height = '15px';
    secondThumb.el.style.position = 'absolute';
    secondThumb.el.style.left = '385px';
    secondThumb.el.style.display = 'block';

    parent.append(thumb.el, secondThumb.el, inner);

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
    }))

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
  })

  afterEach(() => {
    parent.removeChild(thumb.el);
    parent.removeChild(secondThumb.el);
    parent.removeChild(inner);
  })

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
    expect(thumb.el.style.left).toMatch(/px/);
    expect(secondThumb.el.style.left).toMatch(/px/);
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

  test('thumbPos muse be less or equal parent width by click', () => {
    thumb.el.getBoundingClientRect = jest.fn(() => ({
      width: 15,
      height: 15,
      x: 15,
      y: 15,
      bottom: 0,
      left: 400,
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
    expect(parseFloat(thumb.el.style.left)).toBe(385);
    parent.removeEventListener('mousedown', onClick);
  });

  test('thumbPos muse be less or equal parent width by click', () => {
    thumb.el.getBoundingClientRect = jest.fn(() => ({
      width: 15,
      height: 15,
      x: 15,
      y: 15,
      bottom: 0,
      left: 400,
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
      left: 300,
      right: 0,
      top: 0,
      toJSON: jest.fn(),
    }));

    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: 250,
      });
      node.dispatchEvent(event);
    }
    parent.addEventListener('mousedown', onClick);
    triggerMouseEvent(parent, 'mousedown');
    expect(parseFloat(secondThumb.el.style.left)).toBe(parseFloat(thumb.el.style.left));
    parent.removeEventListener('mousedown', onClick);
  });

  test('thumbPos must be defined and must be a number by mousemove', () => {
    thumb.el.addEventListener('mousemove', onMove);
    secondThumb.el.addEventListener('mousemove', onMove);
    triggerMouseEvent(thumb.el, 'mousemove');
    triggerMouseEvent(secondThumb.el, 'mousemove');
    expect(parseFloat(thumb.el.style.left)).not.toBeUndefined();
    expect(parseFloat(secondThumb.el.style.left)).not.toBeUndefined();
    expect(thumb.el.style.left).toMatch(/px/);
    expect(secondThumb.el.style.left).toMatch(/px/);
    thumb.el.removeEventListener('mousemove', onMove);
    secondThumb.el.removeEventListener('mousemove', onMove);
  });

  test('thumbPos must be more then 0', () => {
    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: -100,
      })
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
      })
      node.dispatchEvent(event);
    }
    thumb.el.addEventListener('mousemove', onMove);
    secondThumb.el.addEventListener('mousemove', onMove);
    triggerMouseEvent(thumb.el, 'mousemove');
    expect(parseFloat(thumb.el.style.left)).toBeLessThanOrEqual(parseFloat(parent.style.width));

    thumb.el.removeEventListener('mousemove', onMove);
    secondThumb.el.removeEventListener('mousemove', onMove);
  });

  test('secondThumbPos must be greater or equal then thumbPos', () => {
    function triggerMouseEvent(node: Element, eventType: string) {
      thumb.el.style.left = '0px';
      secondThumb.el.style.left = '-10px';
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: 300,
      })
      node.dispatchEvent(event);
    }
    secondThumb.el.addEventListener('mousemove', onMove);
    triggerMouseEvent(secondThumb.el, 'mousemove');
    expect(parseFloat(secondThumb.el.style.left)).toBeGreaterThanOrEqual(parseFloat(thumb.el.style.left));

    secondThumb.el.removeEventListener('mousedown', onMove);
  });

  test('secondThumbPos must be greater than thumbPos', () => {
    thumb.el.getBoundingClientRect = jest.fn(() => ({
      width: 15,
      height: 15,
      x: 15,
      y: 15,
      bottom: 0,
      left: 300,
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
      left: 100,
      right: 0,
      top: 0,
      toJSON: jest.fn(),
    }));
    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: 0,
      })
      node.dispatchEvent(event);
    }
    thumb.el.addEventListener('mousemove', onMove);
    triggerMouseEvent(thumb.el, 'mousemove');
    expect(parseFloat(secondThumb.el.style.left)).toBeGreaterThanOrEqual(parseFloat(thumb.el.style.left));

    thumb.el.removeEventListener('mousedown', onMove);
  });

  test('secondThumbPos must be greater than thumbPos if moved trying secondThumb be less than thumbPos', () => {
    thumb.el.getBoundingClientRect = jest.fn(() => ({
      width: 15,
      height: 15,
      x: 15,
      y: 15,
      bottom: 0,
      left: 300,
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
      left: 100,
      right: 0,
      top: 0,
      toJSON: jest.fn(),
    }));
    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: 300,
      })
      node.dispatchEvent(event);
    }
    secondThumb.el.addEventListener('mousemove', onMove);
    triggerMouseEvent(secondThumb.el, 'mousemove');
    expect(parseFloat(secondThumb.el.style.left)).toBeGreaterThanOrEqual(parseFloat(thumb.el.style.left));

    secondThumb.el.removeEventListener('mousedown', onMove);
  });
});

// ------------ test single vertical

describe('test single type thumb', () => {
  const parent = document.createElement('div');
  const inner = document.createElement('div');
  parent.className = 'range-slider';
  inner.className = 'range-slider__inner';

  document.body.append(parent);
  const settings = {
    type: 'single-vertical',
    min: 0,
    max: 10000,
    from: 0,
    to: 10000,
    step: 100,
    scale: true,
    flag: true,
  };

  function triggerMouseEvent(node: Element, eventType: string) {
    const event = new MouseEvent(eventType, {
      view: window,
      bubbles: true,
      cancelable: true,
      clientY: 0,
    })
    node.dispatchEvent(event);
  }

  let thumb: IThumb;
  // ---------------------- tests

  function onMove(e: MouseEvent) {
    thumb.moveSingleType(e, settings);
  }

  function onClick(e: MouseEvent) {
    thumb.onClickSingleType(e, settings);
  }

  beforeEach(() => {
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
    thumb = new ViewThumb(settings);
    thumb.el.className = 'range-slider__thumb range-slider__thumb-first'
    parent.style.position = 'relative';
    parent.style.height = '400px';
    parent.style.width = '8px'

    thumb.el.style.width = '15px';
    thumb.el.style.height = '15px';
    thumb.el.style.position = 'absolute';
    thumb.el.style.top = '0';
    thumb.el.style.display = 'block';
    parent.append(thumb.el, inner);
  })
  afterEach(() => {
    parent.removeChild(thumb.el);
    parent.removeChild(inner);
  })

  test('return value not undefined', () => {
    expect(thumb).not.toBeUndefined();
  });

  test('must be instance of HTMLelement and has class .range-slider__thumb', () => {
    expect(thumb.el).toBeInstanceOf(HTMLElement);
    expect(thumb.el.className).toMatch(/thumb/);
  });

  test('thumbPos must be defined and must be a number by click', () => {
    parent.addEventListener('mousedown', onClick);
    triggerMouseEvent(parent, 'mousedown');
    expect(parseFloat(thumb.el.style.top)).not.toBeUndefined();
    expect(thumb.el.style.top).toMatch(/px/);
    parent.removeEventListener('mousedown', onClick);
  });

  test('thumbPos must be defined and must be a number by mousemove', () => {
    thumb.el.addEventListener('mousedown', onMove);
    triggerMouseEvent(thumb.el, 'mousedown');
    expect(parseFloat(thumb.el.style.top)).not.toBeUndefined();
    expect(thumb.el.style.top).toMatch(/px/);
    thumb.el.removeEventListener('mousedown', onMove);
  });

  test('thumbPos must be more then 0', () => {
    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientY: -100,
      })
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
      })
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
      })
      node.dispatchEvent(event);
    }
    parent.addEventListener('mousedown', onClick);
    triggerMouseEvent(parent, 'mousedown');
    expect(parseFloat(thumb.el.style.top)).toBeLessThanOrEqual(385);

    parent.removeEventListener('mousedown', onClick);
  });
});

// -------------------------------- test double-vertical type

describe('test double type thumb', () => {
  const parent = document.createElement('div');
  const inner = document.createElement('div');
  parent.className = 'range-slider';
  inner.className = 'range-slider__inner';

  document.body.append(parent);
  const settings = {
    type: 'double-vertical',
    min: 0,
    max: 10000,
    from: 0,
    to: 10000,
    step: 100,
    scale: true,
    flag: true,
  };

  function triggerMouseEvent(node: Element, eventType: string) {
    const event = new MouseEvent(eventType, {
      view: window,
      bubbles: true,
      cancelable: true,
      clientY: 700,
    })
    node.dispatchEvent(event);
  }

  let thumb: IThumb;
  let secondThumb: IThumb;
  // ---------------------- tests

  function onMove(e: MouseEvent) {
    thumb.moveDoubleType(e, settings);
  }

  function onClick(e: MouseEvent) {
    thumb.onClickDoubleType(e, settings);
  }

  beforeEach(() => {
    thumb = new ViewThumb(settings);
    secondThumb = new ViewThumb(settings);
    thumb.el.className = 'range-slider__thumb range-slider__thumb_first';
    secondThumb.el.className = 'range-slider__thumb range-slider__thumb_second';
    parent.style.position = 'relative';
    parent.style.height = '400px';
    parent.style.width = '8px'

    thumb.el.style.width = '15px';
    thumb.el.style.height = '15px';
    thumb.el.style.position = 'absolute';
    thumb.el.style.top = '0';
    thumb.el.style.display = 'block';

    secondThumb.el.style.width = '15px';
    secondThumb.el.style.height = '15px';
    secondThumb.el.style.position = 'absolute';
    secondThumb.el.style.top = '385px';
    secondThumb.el.style.display = 'block';

    parent.append(thumb.el, secondThumb.el, inner);

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
    }))

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
  })

  afterEach(() => {
    parent.removeChild(thumb.el);
    parent.removeChild(secondThumb.el);
    parent.removeChild(inner);
  })

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
        clientY: 350,
      });
      node.dispatchEvent(event);
    }
    parent.addEventListener('mousedown', onClick);
    triggerMouseEvent(parent, 'mousedown');
    expect(parseFloat(thumb.el.style.top)).not.toBeUndefined();

    expect(parseFloat(secondThumb.el.style.top)).not.toBeUndefined();
    expect(thumb.el.style.top).toMatch(/px/);
    expect(secondThumb.el.style.top).toMatch(/px/);
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

  test('thumbPos muse be less or equal parent width by click', () => {
    thumb.el.getBoundingClientRect = jest.fn(() => ({
      width: 15,
      height: 15,
      x: 15,
      y: 15,
      bottom: 0,
      left: 0,
      right: 0,
      top: 400,
      toJSON: jest.fn(),
    }));

    secondThumb.el.getBoundingClientRect = jest.fn(() => ({
      width: 15,
      height: 15,
      x: 15,
      y: 400,
      bottom: 0,
      left: 0,
      right: 0,
      top: 385,
      toJSON: jest.fn(),
    }));

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
    expect(parseFloat(thumb.el.style.top)).toBe(385);
    parent.removeEventListener('mousedown', onClick);
  });

  test('thumbPos muse be less or equal parent width by click', () => {
    thumb.el.getBoundingClientRect = jest.fn(() => ({
      width: 15,
      height: 15,
      x: 15,
      y: 15,
      bottom: 0,
      left: 0,
      right: 0,
      top: 400,
      toJSON: jest.fn(),
    }));

    secondThumb.el.getBoundingClientRect = jest.fn(() => ({
      width: 15,
      height: 15,
      x: 15,
      y: 400,
      bottom: 0,
      left: 0,
      right: 0,
      top: 300,
      toJSON: jest.fn(),
    }));

    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientY: 250,
      });
      node.dispatchEvent(event);
    }
    parent.addEventListener('mousedown', onClick);
    triggerMouseEvent(parent, 'mousedown');
    expect(parseFloat(secondThumb.el.style.top)).toBe(parseFloat(thumb.el.style.top));
    parent.removeEventListener('mousedown', onClick);
  });

  test('thumbPos must be defined and must be a number by mousemove', () => {
    thumb.el.addEventListener('mousemove', onMove);
    secondThumb.el.addEventListener('mousemove', onMove);
    triggerMouseEvent(thumb.el, 'mousemove');
    triggerMouseEvent(secondThumb.el, 'mousemove');
    expect(parseFloat(thumb.el.style.top)).not.toBeUndefined();
    expect(parseFloat(secondThumb.el.style.top)).not.toBeUndefined();
    expect(thumb.el.style.top).toMatch(/px/);
    expect(secondThumb.el.style.top).toMatch(/px/);
    thumb.el.removeEventListener('mousemove', onMove);
    secondThumb.el.removeEventListener('mousemove', onMove);
  });

  test('thumbPos must be more then 0 by move', () => {
    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientY: -100,
      })
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
      })
      node.dispatchEvent(event);
    }

    secondThumb.el.addEventListener('mousedown', onMove);
    secondThumb.el.addEventListener('mouseup', onMove);

    triggerMouseEvent(secondThumb.el, 'mousedown');
    triggerMouseEvent(secondThumb.el, 'mouseup');

    expect(parseFloat(secondThumb.el.style.top)).toBeGreaterThanOrEqual(0);

    secondThumb.el.removeEventListener('mousedown', onMove);
  });

  test('thumbPos must be more then 0 by click', () => {
    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientY: 0,
      })
      node.dispatchEvent(event);
    }

    thumb.el.addEventListener('mousedown', onClick);
    thumb.el.addEventListener('mouseup', onClick);

    triggerMouseEvent(thumb.el, 'mousedown');
    triggerMouseEvent(thumb.el, 'mouseup');

    expect(parseFloat(thumb.el.style.top)).toBeGreaterThanOrEqual(0);

    thumb.el.removeEventListener('mousedown', onClick);
  });
  test('secondThumbPos must be more then 0 by click', () => {
    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientY: 350,
      })
      node.dispatchEvent(event);
    }

    secondThumb.el.addEventListener('mousedown', onClick);
    secondThumb.el.addEventListener('mouseup', onClick);

    triggerMouseEvent(secondThumb.el, 'mousedown');
    triggerMouseEvent(secondThumb.el, 'mouseup');

    expect(parseFloat(secondThumb.el.style.top)).toBeGreaterThanOrEqual(0);

    secondThumb.el.removeEventListener('mousedown', onClick);
  });
  test('thumbPos must be less then parent width', () => {
    function triggerMouseEvent(node: Element, eventType: string) {
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientY: 700,
      })
      node.dispatchEvent(event);
    }
    thumb.el.addEventListener('mousemove', onMove);
    secondThumb.el.addEventListener('mousemove', onMove);
    triggerMouseEvent(thumb.el, 'mousemove');
    expect(parseFloat(thumb.el.style.top)).toBeLessThanOrEqual(parseFloat(parent.style.height));

    thumb.el.removeEventListener('mousemove', onMove);
    secondThumb.el.removeEventListener('mousemove', onMove);
  });

  test('secondThumbPos must be greater or equal then thumbPos', () => {
    function triggerMouseEvent(node: Element, eventType: string) {
      thumb.el.style.top = '0px';
      secondThumb.el.style.top = '-10px';
      const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientY: 300,
      })
      node.dispatchEvent(event);
    }
    secondThumb.el.addEventListener('mousemove', onMove);
    triggerMouseEvent(secondThumb.el, 'mousemove');
    expect(parseFloat(secondThumb.el.style.top)).toBeGreaterThanOrEqual(parseFloat(thumb.el.style.top));

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
      })
      node.dispatchEvent(event);
    }
    thumb.el.addEventListener('mousemove', onMove);
    triggerMouseEvent(thumb.el, 'mousemove');
    expect(parseFloat(secondThumb.el.style.top)).toBeGreaterThanOrEqual(parseFloat(thumb.el.style.top));

    thumb.el.removeEventListener('mousedown', onMove);
  });

  test('secondThumbPos must be greater than thumbPos if moved trying secondThumb be less than thumbPos', () => {
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
        clientY: 300,
      })
      node.dispatchEvent(event);
    }
    secondThumb.el.addEventListener('mousemove', onMove);
    triggerMouseEvent(secondThumb.el, 'mousemove');
    expect(parseFloat(secondThumb.el.style.top)).toBeGreaterThanOrEqual(parseFloat(thumb.el.style.top));

    secondThumb.el.removeEventListener('mousedown', onMove);
  });
});
