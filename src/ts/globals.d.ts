import { types } from '@babel/core';

interface IsettingsTypes {
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
  moveSingleType(e: MouseEvent, settings: IsettingsTypes, step: number): void;
  moveDoubleType(e: MouseEvent, settings: IsettingsTypes): void;
  onClickSingleType(e: MouseEvent, settings: IsettingsTypes): void;
  onClickDoubleType(e: MouseEvent, settings: IsettingsTypes): void;
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
  from?: number;
  to?: number;
  generalValue: number;
  fromValue: number;
  toValue: number;
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
  // getGeneralValue(settings: IsettingsTypes): number;
  // validateStep(settings: IsettingsTypes): void;
}
interface IView {
  modelChangedSubject: IObserver;
  type: ISubView;
}
interface ISubModel {}

interface ISubView {
  track: ITrack;
  thumb: IThumb;
  secondThumb?: IThumb;
  scale: IScale;
}

interface IScale {
  el: HTMLElement;
  writeMinAndMaxValues(settings: IsettingsTypes): void;
  setCountOfLines(settings: IsettingsTypes): void;
}

interface IMethods {
  update(options: IsettingsTypes): void;
}

interface IInput {
  title: string;
  class: string;
  attr: IAttr;
}

interface IAttr {
  type: string;
  placeholder: string;
}
