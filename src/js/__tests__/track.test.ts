import ViewTrack from '../../ts/ViewTrack'
import { ITrack } from '../../ts/globals'

describe('test ViewTrack', () => {
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
  let track: ITrack = new ViewTrack(settings);
  test('single type track must be defined and match string single in class', () => {
    expect(track.el).not.toBeUndefined();
    expect(track.el.className).toMatch(/single/);
  })
  test('single-vertical', () => {
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
    track = new ViewTrack(settings);
    expect(track.el.className).toMatch(/vertical/);
    expect(track.el.className).toMatch(/single/);
  })
  test('double type track must be defined and match string single in class', () => {
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
    track = new ViewTrack(settings);
    expect(track.el.className).toMatch(/double/);
  })
  test('double-vertical type track must be defined and match string single in class', () => {
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

    track = new ViewTrack(settings);
    expect(track.el.className).toMatch(/double/);
    expect(track.el.className).toMatch(/vertical/);
  })
})
