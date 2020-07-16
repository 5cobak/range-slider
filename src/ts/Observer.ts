export default class MakeObservableSubject {
  private observers: Function[];
  constructor() {
    this.observers = [];
  }
  addObservers(o: Function) {
    for (let i = 0, ilen = this.observers.length; i < ilen; i += 1) {
      let observer = this.observers[i];
      if (observer === o) {
        throw new Error('observer already in the list');
      }
    }
    this.observers.push(o);
  }
  removeObserver(o: Function) {
    for (let i = 0, ilen = this.observers.length; i < ilen; i += 1) {
      let observer = this.observers[i];
      if (observer === o) {
        this.observers.splice(i, 1);
        return;
      }
    }

    throw new Error('could not find observer in list of observers');
  }

  notifyObservers(data: any) {
    // Make a copy of observer list in case the list
    // is mutated during the notifications.
    let observersSnapshot = this.observers.slice(0);
    for (let i = 0, ilen = observersSnapshot.length; i < ilen; i += 1) {
      observersSnapshot[i](data);
    }
  }
}
