import ViewFlag from '../../ts/ViewFlag';
import { IFlag, IsettingsTypes } from '../../ts/globals';

describe('test ViewTrack single', () => {
  const parent = document.createElement('div');
  parent.className = 'range-slider__thumb';
  const settings: IsettingsTypes = {
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
  const isVertical = settings.type.match('vertical');
  const coord = isVertical ? 'top' : 'left';
  let flag: IFlag = new ViewFlag();

  parent.style.position = 'absolute';
  parent.style.width = '15px';
  parent.style.height = '15px';
  parent.style.border = '1px solid black';

  beforeEach(() => {
    flag = new ViewFlag();
    parent.append(flag.el);
    flag.el.style.position = 'absolute';
    flag.el.style.width = '35px';
    flag.el.style.height = '20px';
    flag.el.style.display = 'block';
  });
  afterEach(() => {
    parent.removeChild(flag.el);
  });
  test('flag must be defined and match in class flag', () => {
    expect(flag.el).not.toBeUndefined();
    expect(flag.el.className).toMatch(/flag/);
  });
  test('single', () => {
    flag.setPosition(settings);
    expect(flag.el.style[coord]).toMatch(/px/);
  });
});

describe('test ViewTrack double', () => {
  const parent = document.createElement('div');
  parent.className = 'range-slider__thumb';
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
  const isVertical = settings.type.match('vertical');
  const coord = isVertical ? 'top' : 'left';
  let flag: IFlag = new ViewFlag();

  parent.style.position = 'absolute';
  parent.style.width = '15px';
  parent.style.height = '15px';
  parent.style.border = '1px solid black';

  beforeEach(() => {
    flag = new ViewFlag();
    parent.append(flag.el);
    flag.el.style.position = 'absolute';
    flag.el.style.width = '35px';
    flag.el.style.height = '20px';
    flag.el.style.display = 'block';
  });
  afterEach(() => {
    parent.removeChild(flag.el);
  });
  test('flag must be defined and match in class flag', () => {
    expect(flag.el).not.toBeUndefined();
    expect(flag.el.className).toMatch(/flag/);
  });
  test('single', () => {
    flag.setPosition(settings);
    expect(flag.el.style[coord]).toMatch(/px/);
  });
});

describe('test ViewTrack double-vertical', () => {
  const parent = document.createElement('div');
  parent.className = 'range-slider__thumb';
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
  let flag: IFlag = new ViewFlag();

  parent.style.position = 'absolute';
  parent.style.width = '15px';
  parent.style.height = '15px';
  parent.style.border = '1px solid black';

  beforeEach(() => {
    flag = new ViewFlag();
    parent.append(flag.el);
    flag.el.style.position = 'absolute';
    flag.el.style.width = '35px';
    flag.el.style.height = '10px';
    flag.el.style.display = 'block';
  });
  afterEach(() => {
    parent.removeChild(flag.el);
  });
  test('flag must be defined and match in class flag', () => {
    expect(flag.el).not.toBeUndefined();
    expect(flag.el.className).toMatch(/flag/);
  });
  test('flag top must be with px', () => {
    flag.setPosition(settings);
    expect(flag.el.style[coord]).toMatch(/px/);
    expect(flag.el.style[coord]).toBe('0px');
  });
});

describe('test ViewTrack single vertical', () => {
  const parent = document.createElement('div');
  parent.className = 'range-slider__thumb';
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
  let flag: IFlag = new ViewFlag();

  parent.style.position = 'absolute';
  parent.style.width = '15px';
  parent.style.height = '15px';
  parent.style.border = '1px solid black';

  beforeEach(() => {
    flag = new ViewFlag();
    parent.append(flag.el);
    flag.el.style.position = 'absolute';
    flag.el.style.width = '35px';
    flag.el.style.height = '20px';
    flag.el.style.display = 'block';
  });
  afterEach(() => {
    parent.removeChild(flag.el);
  });
  test('flag must be defined and match in class flag', () => {
    expect(flag.el).not.toBeUndefined();
    expect(flag.el.className).toMatch(/flag/);
  });
  test('flag top must be with px', () => {
    flag.setPosition(settings);
    expect(flag.el.style[coord]).toMatch(/px/);
  });
});

describe('test ViewTrack double vertical', () => {
  const parent = document.createElement('div');
  parent.className = 'range-slider__thumb';
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
  let flag: IFlag = new ViewFlag();

  parent.style.position = 'absolute';
  parent.style.width = '15px';
  parent.style.height = '15px';
  parent.style.border = '1px solid black';

  beforeEach(() => {
    flag = new ViewFlag();
    parent.append(flag.el);
    flag.el.style.position = 'absolute';
    flag.el.style.width = '35px';
    flag.el.style.height = '20px';
    flag.el.style.display = 'block';
  });
  afterEach(() => {
    parent.removeChild(flag.el);
  });
  test('flag must be defined and match in class flag', () => {
    expect(flag.el).not.toBeUndefined();
    expect(flag.el.className).toMatch(/flag/);
  });
  test('flag top must be with px', () => {
    flag.setPosition(settings);
    expect(flag.el.style[coord]).toMatch(/px/);
  });
});

describe('test ViewTrack single vertical', () => {
  const parent = document.createElement('div');
  parent.className = 'range-slider__thumb';
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
  let flag: IFlag = new ViewFlag();

  parent.style.position = 'absolute';
  parent.style.width = '15px';
  parent.style.height = '15px';
  parent.style.border = '1px solid black';

  beforeEach(() => {
    flag = new ViewFlag();
    parent.append(flag.el);
    flag.el.style.position = 'absolute';
    flag.el.style.width = '35px';
    flag.el.style.height = '10px';
    flag.el.style.display = 'block';
  });
  afterEach(() => {
    parent.removeChild(flag.el);
  });
  test('flag must be defined and match in class flag', () => {
    expect(flag.el).not.toBeUndefined();
    expect(flag.el.className).toMatch(/flag/);
  });
  test('flag top must be 0', () => {
    flag.setPosition(settings);
    expect(flag.el.style[coord]).toMatch(/px/);
    expect(flag.el.style[coord]).toBe('0px');
  });
});
