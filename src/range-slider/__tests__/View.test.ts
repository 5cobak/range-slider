import View from '../View';
import './Thumb.test';
import './Flag.test';
import './Inner.test';
import './Scale.test';
import './Track.test';
import './ViewSingle.test';
import './ViewSingleVertical.test';
import './ViewDouble.test';
import './ViewDoubleVertical.test';
import './Observer.test';

import { IView } from '../globals';
import ViewDouble from '../ViewDouble';
import ViewSingle from '../ViewSingle';
import ViewDoubleVertical from '../ViewDoubleVertical';
import ViewSingleVertical from '../ViewSingleVertical';

describe('test main view class with type double ', () => {
  const parent = document.createElement('div');
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
  let generalVal = settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;

  if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);
  const view: IView = new View(parent, settings, generalVal);

  test('view must be defined and has el propery is instance of HTMLElement', () => {
    expect(view).not.toBeUndefined();
    expect(view.el).toBeInstanceOf(HTMLElement);
  });
  test('test type must be instace of ViewDouble', () => {
    expect(view.type).toBeInstanceOf(ViewDouble);
  });
});

describe('test main view class with type single ', () => {
  const parent = document.createElement('div');
  const settings = {
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
  let generalVal = settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;

  if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);
  const view: IView = new View(parent, settings, generalVal);

  test('view must be defined and has el propery is instance of HTMLElement', () => {
    expect(view).not.toBeUndefined();
    expect(view.el).toBeInstanceOf(HTMLElement);
  });
  test('test type must be instance of ViewSingle', () => {
    expect(view.type).toBeInstanceOf(ViewSingle);
  });
});

describe('test main view class with type single ', () => {
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
  let generalVal = settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;

  if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);
  const view: IView = new View(parent, settings, generalVal);

  test('view must be defined and has el propery is instance of HTMLElement', () => {
    expect(view).not.toBeUndefined();
    expect(view.el).toBeInstanceOf(HTMLElement);
  });
  test('test type must be instance of ViewDouble', () => {
    expect(view.type).toBeInstanceOf(ViewDoubleVertical);
  });
});

describe('test main view class with type single ', () => {
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
  let generalVal = settings.max - settings.min - ((settings.max - settings.min) % (settings.step / 10)) * 10;

  if (generalVal % settings.step) generalVal += settings.step - (generalVal % settings.step);
  const view: IView = new View(parent, settings, generalVal);

  test('view must be defined and has el propery is instance of HTMLElement', () => {
    expect(view).not.toBeUndefined();
    expect(view.el).toBeInstanceOf(HTMLElement);
  });
  test('test type must be equal class ViewSingleVertical', () => {
    expect(view.type).toBeInstanceOf(ViewSingleVertical);
  });
});
