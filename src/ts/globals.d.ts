interface IsettingsTypes {
  $el: HTMLElement;
  min: number;
  max: number;
  type: string;
  from: number;
  to: number;
  flag: boolean;
  firstValue?: number;
  secondValue?: number;
}

interface IClassProperties {
  el: HTMLElement;
  setPosition(settings: IsettingsTypes): void;
}

interface IClassFlag {
  el: HTMLElement;
  writeValueIn(settings: IsettingsTypes): void;
  setPosition(settings: IsettingsTypes): void;
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
