import ViewScale from '../../ts/ViewScale'

import { IScale, IsettingsTypes } from '../../ts/globals'

describe('test inner in single', () => {
  const settings: IsettingsTypes = {
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

  const scale: IScale = new ViewScale(settings);

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

  scale.smallLine.style.width = '2px';
  scale.smallLine.style.height = '10px'

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
    scale.setCountOfLines(settings, generalVal);
    const bigLine = scale.el.querySelector('.range-slider__big-line') as HTMLElement;
    expect(bigLine).toBeInstanceOf(HTMLElement);
    expect(bigLine.style[coord]).toMatch(/px/);
  })

  test('small-line must be in scale.el', () => {
    scale.setCountOfLines(settings, generalVal);
    const smallLineClone = scale.el.querySelector('.range-slider__small-line') as HTMLElement;
    expect(smallLineClone).toBeInstanceOf(HTMLElement);
    expect(smallLineClone.style[coord]).toMatch(/px/);
  })

  test('min and max value must be in range-slider', () => {
    scale.writeMinAndMaxValues(settings);
    const min = (scale.el.querySelector('.range-slider__text') as HTMLElement).innerHTML as string;
    const max = (scale.el.querySelectorAll('.range-slider__text')[1]as HTMLElement).innerHTML as string;
    expect(min).toBe(`${settings.min}`);
    expect(max).toBe(`${settings.max}`);
  })
})

// test with count step > 50

describe('test inner', () => {
  const settings: IsettingsTypes = {
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

  const scale: IScale = new ViewScale(settings);
  scale.el.style.position = 'relative';
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

  scale.smallLine.style.width = '2px';
  scale.smallLine.style.height = '10px'

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
    scale.setCountOfLines(settings, generalVal);
    const bigLine = scale.el.querySelector('.range-slider__big-line') as HTMLElement;
    expect(bigLine).toBeInstanceOf(HTMLElement);
  })

  test('small-line must be in scale.el', () => {
    scale.setCountOfLines(settings, generalVal);
    const smallLine = scale.el.querySelector('.range-slider__small-line') as HTMLElement;
    expect(smallLine).toBeInstanceOf(HTMLElement);
  })

  test('min and max value must be in range-slider', () => {
    scale.writeMinAndMaxValues(settings);
    const min = (scale.el.querySelector('.range-slider__text') as HTMLElement).innerHTML as string;
    const max = (scale.el.querySelectorAll('.range-slider__text')[1]as HTMLElement).innerHTML as string;
    expect(min).toBe(`${settings.min}`);
    expect(max).toBe(`${settings.max}`);
  })
  test('stop append smallLine if it so much', () => {
    scale.setCountOfLines(settings, generalVal);
    const trackSize = parseFloat(getComputedStyle(parent)[size]);
    const lastSmallLine = scale.el.querySelectorAll('.range-slider__small-line')[0] as HTMLElement;

    const lastLineLeft = parseFloat(getComputedStyle(lastSmallLine)[coord]);
    expect(lastLineLeft).toBeLessThan(trackSize);
  })
})

// test single-vertical

describe('test inner in single-vertical', () => {
  const settings: IsettingsTypes = {
    type: 'single-vertical',
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

  const scale: IScale = new ViewScale(settings);

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

  scale.smallLine.style.width = '10px';
  scale.smallLine.style.height = '2px'

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
    scale.setCountOfLines(settings, generalVal);
    const bigLine = scale.el.querySelector('.range-slider__big-line') as HTMLElement;
    expect(bigLine).toBeInstanceOf(HTMLElement);
    expect(bigLine.style[coord]).toMatch(/px/);
  })

  test('small-line must be in scale.el', () => {
    scale.setCountOfLines(settings, generalVal);
    const smallLine = scale.el.querySelector('.range-slider__small-line') as HTMLElement;
    expect(smallLine).toBeInstanceOf(HTMLElement);
    expect(smallLine.style[coord]).toMatch(/px/);
  })

  test('min and max value must be in range-slider', () => {
    scale.writeMinAndMaxValues(settings);
    const min = (scale.el.querySelector('.range-slider__text') as HTMLElement).innerHTML as string;
    const max = (scale.el.querySelectorAll('.range-slider__text')[1]as HTMLElement).innerHTML as string;
    expect(min).toBe(`${settings.min}`);
    expect(max).toBe(`${settings.max}`);
  })
})

// test with count step > 50

describe('test inner', () => {
  const settings: IsettingsTypes = {
    type: 'double',
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

  const scale: IScale = new ViewScale(settings);
  scale.el.style.position = 'relative';
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

  scale.smallLine.style.width = '2px';
  scale.smallLine.style.height = '10px'

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
    scale.setCountOfLines(settings, generalVal);
    const bigLine = scale.el.querySelector('.range-slider__big-line') as HTMLElement;
    expect(bigLine).toBeInstanceOf(HTMLElement);
  })

  test('small-line must be in scale.el', () => {
    scale.setCountOfLines(settings, generalVal);
    const smallLine = scale.el.querySelector('.range-slider__small-line') as HTMLElement;
    expect(smallLine).toBeInstanceOf(HTMLElement);
  })

  test('min and max value must be in range-slider', () => {
    scale.writeMinAndMaxValues(settings);
    const min = (scale.el.querySelector('.range-slider__text') as HTMLElement).innerHTML as string;
    const max = (scale.el.querySelectorAll('.range-slider__text')[1]as HTMLElement).innerHTML as string;
    expect(min).toBe(`${settings.min}`);
    expect(max).toBe(`${settings.max}`);
  })
  test('stop append smallLine if it so much', () => {
    const smallLine = document.createElement('span');
    smallLine.className = 'range-slider__small-line';
    scale.setCountOfLines(settings, generalVal);
    const trackSize = parseFloat(getComputedStyle(parent)[size]);
    const smallLines = scale.el.querySelectorAll('.range-slider__small-line');
    const lastSmallLine = scale.el.querySelectorAll('.range-slider__small-line')[0] as HTMLElement;

    for (let i = 0; i < smallLines.length; i += 1) {
      (smallLines[i] as HTMLElement).style.position = 'absolute';
      (smallLines[i] as HTMLElement).style.display = 'block';
      (smallLines[i] as HTMLElement).style.width = '2px';
      (smallLines[i] as HTMLElement).style.height = '10px';
    }
    const lastLineLeft = parseFloat(getComputedStyle(lastSmallLine)[coord]);
    expect(lastLineLeft).toBeLessThan(trackSize);
  })
})
