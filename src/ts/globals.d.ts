export interface IsettingsTypes {
  [x: string]: number | string | boolean | undefined;
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
export interface IObserver {
  addObservers(o: ()=>void): void;
  notifyObservers(): void;
  removeObserver(o: ()=>void): void;
}

export interface IThumb {
  [x: string]: any;
  el: HTMLElement;
  moveSingleType(e: MouseEvent, settings: IsettingsTypes, generalVal: number): void;
  moveDoubleType(e: MouseEvent, settings: IsettingsTypes, generalVal: number): void;
  onClickSingleType(e: MouseEvent, settings: IsettingsTypes, generalVal: number): void;
  onClickDoubleType(e: MouseEvent, settings: IsettingsTypes, generalVal: number): void;
  positions: {to: number, from: number}
  changedSubject: IObserver;

}

export interface IClassPropertiesJquery {
  $el: JQuery<HTMLElement>;
}

export interface IBankModel {
  [x: string]: number | undefined;
  from: number ;
  to?: number ;
  generalValue: number;

}
export interface IBankView {
  trackSize: number;
  thumbSize: number;
  thumbPos: number;
  thumbPosSecond?: number;
}
export interface IScale {
  el: HTMLElement;
  smallLine: HTMLElement;
  bigLine: HTMLElement;
  writeMinAndMaxValues(settings: IsettingsTypes): void;
  setCountOfLines(settings: IsettingsTypes, generalVal: number): void;
}
export interface ISubView {
  track: ITrack;
  thumb: IThumb;
  secondThumb?: IThumb;
  scale: IScale;
  flag: IFlag;
  secondFlag?: IFlag;
  changedSubject: IObserver;
  positions: {to: number, from: number}
  setThumbPos(settings: IsettingsTypes, generalVal: number, position: string): void;
}
export interface IModel {
  modelChangedSubject: IObserver;
  bank: IBankModel;
  setCurrentVal(pos: number, stepSize: number, step: number, currentVal: string): void;
}
export interface IView {
  el: HTMLElement
  changedSubject: IObserver;
  type: ISubView;
  trackSize: number;
  positions: {to: number, from: number}

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

export interface Iposition {
  [x: string]: number;
  from: number;
  to: number;
}
