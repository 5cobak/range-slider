/* eslint-disable @typescript-eslint/no-empty-function */
import { IThumb } from '../../ts/globals';
import ViewThumb from '../../ts/ViewThumb';

// describe('test single type thumb', () => {
//   const parent = document.createElement('div');
//   const inner = document.createElement('div');
//   parent.className = 'range-slider';
//   inner.className = 'range-slider__inner';

//   document.body.append(parent);
//   const settings = {
//     type: 'single',
//     min: 0,
//     max: 10000,
//     from: 0,
//     to: 10000,
//     step: 100,
//     scale: true,
//     flag: true,
//   };

//   function triggerMouseEvent(node: Element, eventType: string) {
//     const event = new MouseEvent(eventType, {
//       view: window,
//       bubbles: true,
//       cancelable: true,
//       clientX: 100,
//     })
//     node.dispatchEvent(event);
//   }

//   let thumb: IThumb;
//   // ---------------------- tests

//   function onMove(e: MouseEvent) {
//     thumb.moveSingleType(e, settings);
//   }

//   function onClick(e: MouseEvent) {
//     thumb.onClickSingleType(e, settings);
//   }

//   beforeEach(() => {
//     thumb = new ViewThumb(settings);
//     thumb.el.className = 'range-slider__thumb range-slider__thumb-first'
//     parent.style.position = 'relative';
//     parent.style.width = '400px';
//     parent.style.height = '8px'

//     thumb.el.style.width = '15px';
//     thumb.el.style.height = '15px';
//     thumb.el.style.position = 'absolute';
//     thumb.el.style.display = 'block';
//     parent.append(thumb.el, inner);
//   })
//   afterEach(() => {
//     parent.removeChild(thumb.el);
//     parent.removeChild(inner);
//   })

//   test('return value not undefined', () => {
//     expect(thumb).not.toBeUndefined();
//   });

//   test('must be instance of HTMLelement', () => {
//     expect(thumb.el).toBeInstanceOf(HTMLElement);
//   });

//   test('thumbPos must be defined and must be a number by click', () => {
//     parent.addEventListener('mousedown', onClick);
//     triggerMouseEvent(parent, 'mousedown');
//     expect(parseFloat(thumb.el.style.left)).not.toBeUndefined();
//     expect(thumb.el.style.left).toMatch(/px/);
//     parent.removeEventListener('mousedown', onClick);
//   });

//   test('thumbPos must be defined and must be a number by mousemove', () => {
//     thumb.el.addEventListener('mousedown', onMove);
//     triggerMouseEvent(thumb.el, 'mousedown');
//     expect(parseFloat(thumb.el.style.left)).not.toBeUndefined();
//     expect(thumb.el.style.left).toMatch(/px/);
//     thumb.el.removeEventListener('mousedown', onMove);
//   });

//   test('thumbPos must be more then 0', () => {
//     function triggerMouseEvent(node: Element, eventType: string) {
//       const event = new MouseEvent(eventType, {
//         view: window,
//         bubbles: true,
//         cancelable: true,
//         clientX: -100,
//       })
//       node.dispatchEvent(event);
//     }
//     thumb.el.addEventListener('mousedown', onMove);
//     triggerMouseEvent(thumb.el, 'mousedown');
//     expect(parseFloat(thumb.el.style.left)).toBeGreaterThanOrEqual(0);

//     thumb.el.removeEventListener('mousedown', onMove);
//   });
//   test('thumbPos must be less then parent width', () => {
//     function triggerMouseEvent(node: Element, eventType: string) {
//       const event = new MouseEvent(eventType, {
//         view: window,
//         bubbles: true,
//         cancelable: true,
//         clientX: 700,
//       })
//       node.dispatchEvent(event);
//     }
//     thumb.el.addEventListener('mousedown', onMove);
//     triggerMouseEvent(thumb.el, 'mousedown');
//     expect(parseFloat(thumb.el.style.left)).toBeLessThanOrEqual(parseFloat(parent.style.width));

//     thumb.el.removeEventListener('mousedown', onMove);
//   });
// });

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
      clientX: 100,
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
    secondThumb = new ViewThumb(settings);
    parent.style.position = 'relative';
    parent.style.width = '400px';
    parent.style.height = '8px'

    thumb.el.style.width = '15px';
    thumb.el.style.height = '15px';
    thumb.el.style.position = 'absolute';
    thumb.el.style.display = 'block';

    secondThumb.el.style.width = '15px';
    secondThumb.el.style.height = '15px';
    secondThumb.el.style.position = 'absolute';
    secondThumb.el.style.display = 'block';

    parent.append(thumb.el, secondThumb.el, inner);
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

  test('thumbPos must be defined and must be a number by click', () => {
    parent.addEventListener('mousedown', onClick);
    triggerMouseEvent(parent, 'mousedown');
    expect(parseFloat(thumb.el.style.left)).not.toBeUndefined();
    expect(parseFloat(secondThumb.el.style.left)).not.toBeUndefined();
    // expect(thumb.el.style.left).toMatch(/px/);
    expect(secondThumb.el.style.left).toMatch(/px/);
    parent.removeEventListener('mousedown', onClick);
  });

  test('thumbPos must be defined and must be a number by mousemove', () => {
    thumb.el.addEventListener('mousedown', onMove);
    secondThumb.el.addEventListener('mousedown', onMove);
    triggerMouseEvent(thumb.el, 'mousedown');
    triggerMouseEvent(secondThumb.el, 'mousedown');
    expect(parseFloat(thumb.el.style.left)).not.toBeUndefined();
    expect(parseFloat(secondThumb.el.style.left)).not.toBeUndefined();
    expect(thumb.el.style.left).toMatch(/px/);
    expect(secondThumb.el.style.left).toMatch(/px/);
    thumb.el.removeEventListener('mousedown', onMove);
    secondThumb.el.removeEventListener('mousedown', onMove);
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
    secondThumb.el.addEventListener('mousedown', onMove);
    triggerMouseEvent(thumb.el, 'mousedown');
    triggerMouseEvent(secondThumb.el, 'mousedown');
    expect(parseFloat(thumb.el.style.left)).toBeGreaterThanOrEqual(0);
    expect(parseFloat(secondThumb.el.style.left)).toBeGreaterThanOrEqual(0);

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
    secondThumb.el.addEventListener('mousedown', onMove);
    triggerMouseEvent(thumb.el, 'mousedown');
    expect(parseFloat(thumb.el.style.left)).toBeLessThanOrEqual(parseFloat(parent.style.width));

    thumb.el.removeEventListener('mousedown', onMove);
  });
});
