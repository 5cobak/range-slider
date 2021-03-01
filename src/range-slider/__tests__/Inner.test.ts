import ViewInner from '../View/ViewInner';

describe('test inner', () => {
  const parent = document.createElement('div');
  const settings = {
    el: parent,
    type: 'single-horizontal',
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

  const thumb = document.createElement('div');
  const secondThumb = document.createElement('div');
  thumb.className = 'js-range-slider__thumb_first';
  secondThumb.className = 'js-range-slider__thumb_second';
  parent.style[size] = '400px';
  parent.style.position = 'relative';

  thumb.style.width = '15px';
  thumb.style.height = '15px';
  thumb.style.position = 'absolute';
  thumb.style[coord] = '0px';

  secondThumb.style.width = '15px';
  secondThumb.style.height = '15px';
  secondThumb.style.position = 'absolute';
  secondThumb.style[coord] = '385px';

  const inner = new ViewInner(settings);
  parent.append(inner.el, thumb, secondThumb);
  inner.setPosition(settings);
  test('inner must be defined', () => {
    expect(inner).not.toBeUndefined();
  });
  test('inner.el must be defined and has instance HTMLElement', () => {
    expect(inner).not.toBeUndefined();
    expect(inner.el).toBeInstanceOf(HTMLElement);
  });
  test('inner.el width must be with px', () => {
    expect(inner.el.style.width).toMatch(/%/);
  });
});

describe('test inner double', () => {
  const parent = document.createElement('div');
  const settings = {
    el: parent,
    type: 'double-horizontal',
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

  const thumb = document.createElement('div');
  const secondThumb = document.createElement('div');
  thumb.className = 'js-range-slider__thumb_first';
  secondThumb.className = 'js-range-slider__thumb_second';
  parent.style[size] = '400px';
  parent.style.position = 'relative';

  thumb.style.width = '15px';
  thumb.style.height = '15px';
  thumb.style.position = 'absolute';
  thumb.style[coord] = '0px';

  secondThumb.style.width = '15px';
  secondThumb.style.height = '15px';
  secondThumb.style.position = 'absolute';
  secondThumb.style[coord] = '385px';

  const inner = new ViewInner(settings);
  parent.append(inner.el, thumb, secondThumb);
  inner.setPosition(settings);
  test('inner must be defined', () => {
    expect(inner).not.toBeUndefined();
  });
  test('inner.el must be defined and has instance HTMLElement', () => {
    expect(inner).not.toBeUndefined();
    expect(inner.el).toBeInstanceOf(HTMLElement);
  });
  test('inner.el width must be with px', () => {
    expect(inner.el.style.width).toMatch(/%/);
  });
});

describe('test inner single-vertical', () => {
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
  const coord = isVertical ? 'top' : 'left';
  const size = isVertical ? 'height' : 'width';

  const thumb = document.createElement('div');
  const secondThumb = document.createElement('div');
  thumb.className = 'js-range-slider__thumb_first';
  secondThumb.className = 'js-range-slider__thumb_second';
  parent.style[size] = '400px';
  parent.style.position = 'relative';

  thumb.style.width = '15px';
  thumb.style.height = '15px';
  thumb.style.position = 'absolute';
  thumb.style[coord] = '0px';

  secondThumb.style.width = '15px';
  secondThumb.style.height = '15px';
  secondThumb.style.position = 'absolute';
  secondThumb.style[coord] = '385px';

  const inner = new ViewInner(settings);
  parent.append(inner.el, thumb, secondThumb);
  inner.setPosition(settings);
  test('inner must be defined', () => {
    expect(inner).not.toBeUndefined();
  });
  test('inner.el must be defined and has instance HTMLElement', () => {
    expect(inner).not.toBeUndefined();
    expect(inner.el).toBeInstanceOf(HTMLElement);
  });
  test('inner.el height must be with px', () => {
    expect(inner.el.style[size]).toMatch(/px/);
  });
});

describe('test inner double-vertical', () => {
  const parent = document.createElement('div');
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
  const isVertical = settings.type.match('vertical');
  const coord = isVertical ? 'top' : 'left';
  const size = isVertical ? 'height' : 'width';

  const thumb = document.createElement('div');
  const secondThumb = document.createElement('div');
  thumb.className = 'js-range-slider__thumb_first';
  secondThumb.className = 'js-range-slider__thumb_second';
  parent.style[size] = '400px';
  parent.style.position = 'relative';

  thumb.style.width = '15px';
  thumb.style.height = '15px';
  thumb.style.position = 'absolute';
  thumb.style[coord] = '0px';

  secondThumb.style.width = '15px';
  secondThumb.style.height = '15px';
  secondThumb.style.position = 'absolute';
  secondThumb.style[coord] = '385px';

  const inner = new ViewInner(settings);
  parent.append(inner.el, thumb, secondThumb);
  inner.setPosition(settings);
  test('inner must be defined', () => {
    expect(inner).not.toBeUndefined();
  });
  test('inner.el must be defined and has instance HTMLElement', () => {
    expect(inner).not.toBeUndefined();
    expect(inner.el).toBeInstanceOf(HTMLElement);
  });
  test('inner.el height must be with px', () => {
    expect(inner.el.style[size]).toMatch(/%/);
  });
});
