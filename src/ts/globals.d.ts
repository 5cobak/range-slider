interface IsettingsTypes {
  $el: HTMLElement;
  min: number;
  max: number;
  type: string;
  from: number;
  to: number;
  flag: boolean;
  step: number;
  firstValue?: number;
  secondValue?: number;
}

interface IClassProperties {
  el: HTMLElement;
  setPosition(settings: IsettingsTypes): void;
}
interface ITrack {
  el: HTMLElement;
}

interface IClassFlag {
  el: HTMLElement;
  setPosition(settings: IsettingsTypes): any;
}

type $MouseDown = JQuery.MouseDownEvent<HTMLElement, null, HTMLElement, HTMLElement>;

interface IClassThumb {
  el: HTMLElement;

  moveSingleTypeX(e: MouseEvent): any;

  setPosOnClickSingleTypeX(e: MouseEvent): void;

  setPosOnClickDoubleTypeX(e: MouseEvent): void;

  moveSingleTypeY(e: MouseEvent): any;

  setPosOnClickSingleTypeY(e: MouseEvent): void;

  moveDoubleTypeY(e: MouseEvent): any;

  setPosOnClickDoubleTypeY(e: MouseEvent): void;

  setPosition(settings: IsettingsTypes): void;

  moveDoubleTypeX(e: MouseEvent): void;
}

interface IClassPropertiesJquery {
  $el: JQuery<HTMLElement>;
}

interface IObserver {
  addObservers(o: Function): void;
  notifyObservers(): void;
  removeObserver(o: Function): void;
}
interface IBank {
  currentValue?: number;
  currentSecondValue?: number;
  generalVal?: number;
}
interface IModel {
  modelChangedSubject: IObserver;
  bank?: IBank;
  type: ISubModel;
}
interface ISubModel {
  bank: IBank;
  setValue(thumbPos: number, trackWidth: number): number;
  getGeneralValue(settings: IsettingsTypes): number;
}
