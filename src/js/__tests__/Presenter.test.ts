import Presenter from '../../ts/Presenter'
import { IsettingsTypes } from '../../ts/globals';

import './Thumb.test'
import './Flag.test'
import './Inner.test'
import './Scale.test'
import './Track.test'
import './ViewSingle.test'
import './ViewSingleVertical.test'
import './ViewDouble.test'
import './ViewDoubleVertical.test'
import './Observer.test'
import './Model.test'
import './View.test'

describe('test class Presenter with single type', () => {
  const parent = document.createElement('div');
  const settings: IsettingsTypes =
    {
      type: 'single',
      min: 0,
      max: 1000,
      from: 0,
      to: 1000,
      flag: true,
      step: 1,
      scale: true,
    }

  let generalVal =
      settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;

  if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);

  const presenter = new Presenter(settings, parent );

  test('test presenter must be defined', () => {
    expect(presenter).not.toBeUndefined();
  })
})
describe('test class Presenter with double type', () => {
  const parent = document.createElement('div');
  const settings: IsettingsTypes =
    {
      type: 'single-vertical',
      min: 0,
      max: 1000,
      from: 0,
      to: 1000,
      flag: true,
      step: 1,
      scale: true,
    }

  const presenter = new Presenter(settings, parent );

  test('test presenter must be defined', () => {
    expect(presenter).not.toBeUndefined();
  })
})
describe('test class Presenter with double type', () => {
  const parent = document.createElement('div');
  const settings: IsettingsTypes =
    {
      type: 'double',
      min: 0,
      max: 1000,
      from: 0,
      to: 1000,
      flag: true,
      step: 1,
      scale: true,
    }
  let generalVal =
      settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;

  if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);
  const presenter = new Presenter(settings, parent );

  test('test presenter must be defined', () => {
    expect(presenter).not.toBeUndefined();
  })
})
describe('test class Presenter with double-vertical type', () => {
  const parent = document.createElement('div');
  const settings: IsettingsTypes =
    {
      type: 'double-vertical',
      min: 0,
      max: 1000,
      from: 0,
      to: 1000,
      flag: true,
      step: 1,
      scale: true,
    }
  let generalVal =
      settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;

  if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);
  const presenter = new Presenter(settings, parent );

  test('test presenter must be defined', () => {
    expect(presenter).not.toBeUndefined();
  })
})
describe('test class Presenter without', () => {
  const parent = document.createElement('div');
  const settings: IsettingsTypes =
    {
      type: 'double-vertical',
      min: 0,
      max: 1000,
      from: 0,
      to: 1000,
      flag: true,
      step: 1,
      scale: true,
    }
  let generalVal =
      settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;

  if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);
  const presenter = new Presenter(settings, parent );

  test('test presenter must be defined', () => {
    expect(presenter).not.toBeUndefined();
  })
})
