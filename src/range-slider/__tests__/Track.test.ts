import ViewTrack from '../View/ViewTrack';
import { ITrack } from '../Interfaces/globals';

describe('test ViewTrack', () => {
  const elem = document.createElement('div');
  const settings = {
    el: elem,
    type: 'single-horizontal',
    min: 0,
    max: 10000,
    from: 0,
    to: 10000,
    step: 150,
    scale: true,
    flag: true,
  };
  let track: ITrack = new ViewTrack(settings);
  test('single type track must be defined and match string single in class', () => {
    expect(track.el).not.toBeUndefined();
    expect(track.el.className).toMatch(/single/);
  });
  test('single-vertical', () => {
    const elem = document.createElement('div');
    const settings = {
      el: elem,
      type: 'single-vertical',
      min: 0,
      max: 10000,
      from: 0,
      to: 10000,
      step: 150,
      scale: true,
      flag: true,
    };
    track = new ViewTrack(settings);
    expect(track.el.className).toMatch(/vertical/);
    expect(track.el.className).toMatch(/single/);
  });
  test('double type track must be defined and match string single in class', () => {
    const elem = document.createElement('div');
    const settings = {
      el: elem,
      type: 'double-horizontal',
      min: 0,
      max: 10000,
      from: 0,
      to: 10000,
      step: 150,
      scale: true,
      flag: true,
    };
    track = new ViewTrack(settings);
    expect(track.el.className).toMatch(/double/);
  });
  test('double-vertical type track must be defined and match string single in class', () => {
    const elem = document.createElement('div');
    const settings = {
      el: elem,
      type: 'double-vertical',
      min: 0,
      max: 10000,
      from: 0,
      to: 10000,
      step: 150,
      scale: true,
      flag: true,
    };

    track = new ViewTrack(settings);
    expect(track.el.className).toMatch(/double/);
    expect(track.el.className).toMatch(/vertical/);
  });
});
