export default class MakeObservableSubject {
  private observers: Array<() => void>;

  constructor() {
    this.observers = [];
  }

  addObservers(observer: () => void): void {
    this.observers.forEach((item) => {
      if (item === observer) {
        throw Error('observer is already exist');
      }
    });
    this.observers.push(observer);
  }

  removeObserver(observer: () => void): void {
    this.observers.forEach((item, i) => {
      if (item === observer) {
        this.observers.splice(i, 1);
        return;
      }
      throw new Error('could not find observer in list of observers');
    });
  }

  notifyObservers(): void {
    this.observers.forEach((item) => {
      item();
    });
  }
}
