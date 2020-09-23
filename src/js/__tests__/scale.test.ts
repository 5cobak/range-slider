import ViewScale from '../../ts/ViewScale'

import { IScale, IsettingsTypes } from '../../ts/globals'

describe('test inner', () => {
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
  let generalVal =
      settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;

  if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);

  const isVertical = settings.type.match('vertical');
  const coord = isVertical ? 'top' : 'left';
  const size = isVertical ? 'height' : 'width';

  const parent = document.createElement('div');
  const thumb = document.createElement('div');
  const secondThumb = document.createElement('div');

  const scale = new ViewScale(settings, generalVal);

  thumb.className = 'range-slider__thumb_first'
  secondThumb.className = 'range-slider__thumb_second'
  parent.style[size] = '400px';
  parent.style.position = 'relative';

  thumb.style.width = '15px';
  thumb.style.height = '15px';
  thumb.style.position = 'absolute';
  thumb.style[coord] = '0px';
  thumb.className = 'range-slider__thumb'

  secondThumb.style.width = '15px'
  secondThumb.style.height = '15px'
  secondThumb.style.position = 'absolute'
  secondThumb.style[coord] = '385px';

  parent.append( thumb, secondThumb, scale.el)

  test('scale must be defined', () => {
    expect(scale).not.toBeUndefined()
  })
  test('scale must be defined', () => {
    expect(scale).not.toBeUndefined()
  })

  test('scale.el must be HTMLElement', () => {
    expect(scale.el).toBeInstanceOf(HTMLElement)
  })
  test('big-line must be in scale.el', () => {
    scale.setCountOfLines(settings);
    const bigLine = scale.el.querySelector('.range-slider__big-line') as HTMLElement;
    expect(bigLine).toBeInstanceOf(HTMLElement);
    expect(bigLine.style[coord]).toMatch(/px/);
  })

  test('small-line must be in scale.el', () => {
    scale.setCountOfLines(settings);
    const smallLine = scale.el.querySelector('.range-slider__small-line') as HTMLElement;
    expect(smallLine).toBeInstanceOf(HTMLElement);
    expect(smallLine.style[coord]).toMatch(/px/);
  })

  test('min and max value must be in range-slider', () => {
    scale.writeMinAndMaxValues(settings, generalVal);
    const min = (scale.el.querySelector('.range-slider__text') as HTMLElement).innerHTML as string;
    const max = (scale.el.querySelectorAll('.range-slider__text')[1]as HTMLElement).innerHTML as string;
    expect(min).toBe(`${settings.min}`);
    expect(max).toBe(`${settings.max}`);
  })
})

// test with count step > 50

describe('test inner', () => {
  const settings = {
    type: 'single',
    min: 0,
    max: 10000,
    from: 0,
    to: 10000,
    step: 1000,
    scale: true,
    flag: true,
  };
  let generalVal =
      settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;

  if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);

  const isVertical = settings.type.match('vertical');
  const coord = isVertical ? 'top' : 'left';
  const size = isVertical ? 'height' : 'width';

  const parent = document.createElement('div');
  const thumb = document.createElement('div');
  const secondThumb = document.createElement('div');

  const scale = new ViewScale(settings, generalVal);

  thumb.className = 'range-slider__thumb_first'
  secondThumb.className = 'range-slider__thumb_second'
  parent.style[size] = '400px';
  parent.style.position = 'relative';

  thumb.style.width = '15px';
  thumb.style.height = '15px';
  thumb.style.position = 'absolute';
  thumb.style[coord] = '0px';
  thumb.className = 'range-slider__thumb'

  secondThumb.style.width = '15px'
  secondThumb.style.height = '15px'
  secondThumb.style.position = 'absolute'
  secondThumb.style[coord] = '385px';

  parent.append( thumb, secondThumb, scale.el)

  test('scale must be defined', () => {
    expect(scale).not.toBeUndefined()
  })
  test('scale must be defined', () => {
    expect(scale).not.toBeUndefined()
  })

  test('scale.el must be HTMLElement', () => {
    expect(scale.el).toBeInstanceOf(HTMLElement)
  })
  test('big-line must be in scale.el', () => {
    scale.setCountOfLines(settings);
    const bigLine = scale.el.querySelector('.range-slider__big-line') as HTMLElement;
    expect(bigLine).toBeInstanceOf(HTMLElement);
  })

  test('small-line must be in scale.el', () => {
    scale.setCountOfLines(settings);
    const smallLine = scale.el.querySelector('.range-slider__small-line') as HTMLElement;
    expect(smallLine).toBeInstanceOf(HTMLElement);
  })

  test('min and max value must be in range-slider', () => {
    scale.writeMinAndMaxValues(settings, generalVal);
    const min = (scale.el.querySelector('.range-slider__text') as HTMLElement).innerHTML as string;
    const max = (scale.el.querySelectorAll('.range-slider__text')[1]as HTMLElement).innerHTML as string;
    expect(min).toBe(`${settings.min}`);
    expect(max).toBe(`${settings.max}`);
  })
  test('stop append smallLine if it so much', () => {
    scale.setCountOfLines(settings);
    const trackSize = parseFloat(getComputedStyle(parent)[size]);
    const smallLines = scale.el.querySelectorAll('.range-slider__small-line');
    const lastSmallLine = scale.el.querySelectorAll('.range-slider__smal-line')[smallLines.length - 1] as Element;

    const lastLineLeft = parseFloat(getComputedStyle(lastSmallLine)[coord]);
    expect(lastLineLeft).toBeLessThan(trackSize);
  })
})
