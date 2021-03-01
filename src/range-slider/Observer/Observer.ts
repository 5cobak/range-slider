export default class MakeObservableSubject {
  private observers: Array<() => void>;

  constructor() {
    this.observers = [];
  }

  addObservers(o: () => void): void {
    this.observers.forEach((item) => {
      if (item === o) {
        throw Error('observer is already exist');
      }
    });
    this.observers.push(o);
  }

  removeObserver(o: () => void): void {
    this.observers.forEach((item, i) => {
      if (item === o) {
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
