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

  test('test model must be defined', () => {
    expect(model).not.toBeUndefined();
  })
  test('test model must be defined', () => {
    expect(model.bank.generalValue).toBe(10000);
  })
})
