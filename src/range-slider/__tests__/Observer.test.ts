import Observer from '../Observer';
import { IObserver } from '../globals';

describe('test Observer class', () => {
  const someObject = {
    currentNum: 0,
  };
  const obj: IObserver = new Observer();
  test('observer must be defined', () => {
    expect(obj).not.toBeUndefined();
  });

  test('test property addObserver method and notify', () => {
    function o(): void {
      someObject.currentNum = 9;
    }
    obj.addObservers(o);
    obj.notifyObservers();
    expect(someObject.currentNum).toBe(9);
  });

  test('test method addobservers if observer exists', () => {
    function o(): void {
      someObject.currentNum = 1;
    }
    obj.addObservers(o);
    obj.notifyObservers();
    try {
      obj.addObservers(o);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  test('test method removeObservers', () => {
    function o(): void {
      someObject.currentNum += 1;
    }
    obj.addObservers(o);
    obj.notifyObservers();
    obj.removeObserver(o);
    obj.notifyObservers();
    expect(someObject.currentNum).toBe(1);
  });
  test('test method removeObservers if observer do not exist, call removeObservers must throw Error', () => {
    function o(): void {
      someObject.currentNum += 1;
    }
    obj.addObservers(o);
    obj.notifyObservers();
    obj.removeObserver(o);
    obj.notifyObservers();

    try {
      obj.removeObserver(o);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
