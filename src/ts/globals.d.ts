export interface IsettingsTypes {
  [x: string]: number | string | boolean | HTMLElement | null;
  $el: HTMLElement,
  min: number;
  max: number;
  type: string;
  from: number;
  to: number | null;
  flag: boolean;
  scale: boolean;
  step: number;
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
  el: HTMLElement;
  moveSingleType(e: MouseEvent, settings: IsettingsTypes, generalVal: number): void;
  moveDoubleType(e: MouseEvent, settings: IsettingsTypes, generalVal: number): void;
  onClickSingleType(e: MouseEvent, settings: IsettingsTypes, generalVal: number): void;
  onClickDoubleType(e: MouseEvent, settings: IsettingsTypes, generalVal: number): void;
  isVertical: RegExpMatchArray | null;
  positions: {to: number, from: number}
  changedSubject: IObserver;

}

export interface IClassPropertiesJquery {
  $el: JQuery<HTMLElement>;
}

export interface IBankModel {
  [x: string]: number | null;
  from: number;
  to: number | null;
  generalValue: number;

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
}
export interface IModel {
  modelChangedSubject: IObserver;
  bank: IBankModel;
  setCurrentVal(pos: number, stepSize: number, step: number, currentVal: string): void;
  settings: IsettingsTypes;
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
