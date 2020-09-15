export interface IsettingsTypes {
  min: number;
  max: number;
  type: string;
  from: number;
  to?: number;
  flag: boolean;
  scale: boolean;
  step: number;
  firstValue?: number;
  secondValue?: number;
}

export interface IClassProperties {
  el: HTMLElement;
  setPosition(settings: IsettingsTypes): void;
}
export interface ITrack {
  el: HTMLElement;
}

export interface IFlag {
  el: HTMLElement;
  setPosition(settings: IsettingsTypes): void;
}

export interface IThumb {
  el: HTMLElement;
  moveSingleType(e: MouseEvent, settings: IsettingsTypes): void;
  moveDoubleType(e: MouseEvent, settings: IsettingsTypes): void;
  onClickSingleType(e: MouseEvent, settings: IsettingsTypes): void;
  onClickDoubleType(e: MouseEvent, settings: IsettingsTypes): void;
  thumbPos: number;

}

export interface IClassPropertiesJquery {
  $el: JQuery<HTMLElement>;
}

export interface IObserver {
  addObservers(o: ()=>void): void;
  notifyObservers(): void;
  removeObserver(o: ()=>void): void;
}
export interface IBankModel {
  from?: number;
  to?: number;
  generalValue: number;
  fromValue?: number;
  toValue?: number;
}
export interface IBankView {
  trackSize: number;
  thumbSize: number;
  thumbPos: number;
  thumbPosSecond?: number;
  setSecondThumbPos?(settings: IsettingsTypes): number;
}
export interface IScale {
  el: HTMLElement;
  writeMinAndMaxValues(settings: IsettingsTypes): void;
  setCountOfLines(settings: IsettingsTypes): void;
}
export interface ISubView {
  track: ITrack;
  thumb: IThumb;
  secondThumb?: IThumb;
  scale: IScale;
  flag: IFlag;
  secondFlag?: IFlag;
}
export interface IModel {
  modelChangedSubject: IObserver;
  bank: IBankModel;
  setCurrentValue(pos: number, stepSize: number, step: number): number;
  // getGeneralValue(settings: IsettingsTypes): number;
  // validateStep(settings: IsettingsTypes): void;
}
export interface IView {
  viewChangedSubject: IObserver;
  type: ISubView;
  trackSize: number;
  thumbPos: number;
  thumbPosSecond: number
}

export interface IViewSingle {
  el: HTMLElement
}
export interface IMethods {
  [x: string]: ()=>void;
  update(): void;
  init(): void;
}

export interface IAttr {
  type: string;
  placeholder: string;
}
export interface IInput {
  title: string;
  class: string;
  attr: IAttr;
}
