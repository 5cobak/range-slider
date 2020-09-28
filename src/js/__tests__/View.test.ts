import View from '../../ts/View'
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

import { IView } from '../../ts/globals'
import ViewDouble from '../../ts/ViewDouble'
import ViewSingle from '../../ts/ViewSingle'
import ViewDoubleVertical from '../../ts/ViewDoubleVertical'
import ViewSingleVertical from '../../ts/ViewSingleVertical'

describe('test main view class with type double ', () => {
  const parent = document.createElement('div');
  const settings = {
    type: 'double',
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
  const view: IView = new View(parent, settings, generalVal);

  test('view must be defined and has el propery is instance of HTMLElement', () => {
    expect(view).not.toBeUndefined();
    expect(view.el).toBeInstanceOf(HTMLElement)
  })
  test('test type must be ViewDouble', () => {
    expect(view.type).toEqual(new ViewDouble(parent, settings, generalVal))
  })
})

describe('test main view class with type single ', () => {
  const parent = document.createElement('div');
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
  const view: IView = new View(parent, settings, generalVal);

  test('view must be defined and has el propery is instance of HTMLElement', () => {
    expect(view).not.toBeUndefined();
    expect(view.el).toBeInstanceOf(HTMLElement)
  })
  test('test type must be ViewDouble', () => {
    expect(view.type).toEqual(new ViewSingle(parent, settings, generalVal))
  })
})

describe('test main view class with type single ', () => {
  const parent = document.createElement('div');
  const settings = {
    type: 'double-vertical',
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
  const view: IView = new View(parent, settings, generalVal);

  test('view must be defined and has el propery is instance of HTMLElement', () => {
    expect(view).not.toBeUndefined();
    expect(view.el).toBeInstanceOf(HTMLElement)
  })
  test('test type must be ViewDouble', () => {
    expect(view.type).toEqual(new ViewDoubleVertical(parent, settings, generalVal))
  })
})

describe('test main view class with type single ', () => {
  const parent = document.createElement('div');
  const settings = {
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
  const view: IView = new View(parent, settings, generalVal);

  test('view must be defined and has el propery is instance of HTMLElement', () => {
    expect(view).not.toBeUndefined();
    expect(view.el).toBeInstanceOf(HTMLElement)
  })
  test('test type must be ViewDouble', () => {
    expect(view.type).toEqual(new ViewSingleVertical(parent, settings, generalVal))
  })
})
