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

interface IThumb {
  el: HTMLElement;

  moveSingleTypeX(settings: IsettingsTypes, e: MouseEvent, step: number): any;

  setPosOnClickSingleTypeX(e: MouseEvent, step: number): void;

  setPosOnClickDoubleTypeX(e: MouseEvent, step: number): void;

  moveSingleTypeY(e: MouseEvent, step: number): any;

  setPosOnClickSingleTypeY(e: MouseEvent, step: number): void;

  moveDoubleTypeY(e: MouseEvent, step: number): any;

  setPosOnClickDoubleTypeY(e: MouseEvent, step: number): void;

  setPosition(settings: IsettingsTypes, step: number): void;

  moveDoubleTypeX(e: MouseEvent, step: number): void;
}

interface IClassPropertiesJquery {
  $el: JQuery<HTMLElement>;
}

interface IObserver {
  addObservers(o: Function): void;
  notifyObservers(): void;
  removeObserver(o: Function): void;
}
interface IBankModel {
  currentValue?: number;
  currentValueSecond?: number;
  generalValue?: number;
}
interface IBankView {
  trackSize: number;
  thumbSize: number;
  thumbPos: number;
  thumbPosSecond?: number;
  setSecondThumbPos?(settings: IsettingsTypes): number;
}
interface IModel {
  modelChangedSubject: IObserver;
  bank: IBankModel;
  type: ISubModel;
  setCurrentValue(pos: number, stepSize: number, step: number): number;
  getGeneralValue(settings: IsettingsTypes): number;
  validateStep(settings: IsettingsTypes): void;
}
interface IView {
  modelChangedSubject: IObserver;
  type: ISubView;
  bank: IBankView;
}
interface ISubModel {}

interface ISubView {
  track: ITrack;
  thumb: IThumb;
  secondThumb?: IThumb;
}
