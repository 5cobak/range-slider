import Model from '../../ts/Model'
import { IsettingsTypes } from '../../ts/globals';
import './Observer.test'

describe('test model', () => {
  const settings: IsettingsTypes = {
    type: 'double',
    min: 0,
    max: 10000,
    from: 0,
    to: 10000,
    step: 100,
    scale: true,
    flag: true,
  };

  const model = new Model(settings);

  let generalVal =
      settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;
  if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);

  test('test model must be defined', () => {
    expect(model).not.toBeUndefined();
  })
  test('test model must be defined', () => {
    expect(model.bank.generalValue).toBe(10000);
  })
  test('test model.bank.from and model.bank.to', () => {
    model.setCurrentVal(144, 10, 100, 'from');
    expect(model.bank.from).toBe(1400);
    model.setCurrentVal(144, 10, 100, 'to');
    expect(model.bank.to).toBe(1400);
  })
  test('test generalVal property', () => {
    expect(model.bank.generalValue).toBe(generalVal);
  })
  test('test from and to must be less or equal settings.max', () => {
    model.setCurrentVal(1440, 10, 100, 'from');
    expect(model.bank.from).toBeLessThanOrEqual(settings.max);
    model.setCurrentVal(144, 10, 100, 'to');
    expect(model.bank.to).toBeLessThanOrEqual(settings.max);
  })
})

describe('test model with non-multiple step', () => {
  const settings: IsettingsTypes = {
    type: 'single',
    min: 0,
    max: 10000,
    from: 0,
    to: 10000,
    step: 1,
    scale: true,
    flag: true,
  };

  const model = new Model(settings);

  let generalVal =
      settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;

  const firstGeneralVal = settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;

  if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);
  test('test generalVal with non-multiple step ', () => {
    expect(firstGeneralVal % settings.step).toBeTruthy();
  })

  test('test from if it more then max value', () => {
    model.setCurrentVal(144, 10, 100, 'to');
    expect(model.bank.from).toBeLessThanOrEqual(settings.max);
  })
  test('test from must be equal or less then max', () => {
    expect(model.settings.from).toBeLessThanOrEqual(settings.max);
  })
  test('test from must be equal or greater then max', () => {
    expect(model.settings.from).toBeGreaterThanOrEqual(settings.min);
  })
})
describe('test model with non-multiple step', () => {
  const settings: IsettingsTypes = {
    type: 'single',
    min: 0,
    max: 10000,
    from: 11000,
    to: 10000,
    step: 1,
    scale: true,
    flag: true,
  };

  const model = new Model(settings);

  test('test from must be equal or less then max', () => {
    expect(model.settings.from).toBeLessThanOrEqual(settings.max);
  })
  test('test from must be equal or greater then max', () => {
    expect(model.settings.from).toBeGreaterThanOrEqual(settings.min);
  })
})

describe('test from and to if they greater then max', () => {
  const settings: IsettingsTypes = {
    type: 'single',
    min: 0,
    max: 10000,
    from: 11000,
    to: 11000,
    step: 1,
    scale: true,
    flag: true,
  };

  const model = new Model(settings);

  test('test from must be equal or less then max', () => {
    expect(model.settings.from).toBeLessThanOrEqual(settings.max);
  })
  test('test to must be equal or greater then max', () => {
    expect(model.settings.to).toBeLessThanOrEqual(settings.max);
  })
})

describe('test from and to if they less then min', () => {
  const settings: IsettingsTypes = {
    type: 'double',
    min: 0,
    max: 10000,
    from: -1000,
    to: -12000,
    step: 1,
    scale: true,
    flag: true,
  };

  const model = new Model(settings);

  test('test from must be equal or less then max', () => {
    expect(model.settings.from).toBeLessThanOrEqual(settings.min);
  })
  test('test to must be equal or greater then max', () => {
    expect(model.settings.to).toBeLessThanOrEqual(settings.min);
  })
})
describe('test from and to if they less then min', () => {
  const settings: IsettingsTypes = {
    type: 'double',
    min: 0,
    max: 10000,
    from: -1000,
    // to: -12000,
    step: -1,
    scale: true,
    flag: true,
  };

  const model = new Model(settings);

  test('test to must be undefined', () => {
    expect(model.settings.to).toBeUndefined();
  })
  test('step must not be negative', () => {
    expect(model.settings.step).toBeGreaterThan(0);
  })
})

describe('test step if it is be zero', () => {
  const settings: IsettingsTypes = {
    type: 'double',
    min: 0,
    max: 10000,
    from: -1000,
    // to: -12000,
    step: 0,
    scale: true,
    flag: true,
  };

  const model = new Model(settings);

  test('step must not be negative', () => {
    expect(model.settings.step).toBeGreaterThan(0);
  })
})
