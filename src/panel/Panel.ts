import IPanel from './globals';

export default class Panel implements IPanel {
  [x: string]:
    | string
    | HTMLElement
    | HTMLLabelElement[]
    | HTMLInputElement
    | (() => void)
    | ((labels: any[]) => void)
    | ((n: string) => void)
    | ((labels: any[], toggles: any[]) => void);

  el!: HTMLElement;

  flag!: HTMLInputElement;

  scale!: HTMLInputElement;

  inputs!: HTMLLabelElement[];

  radioParent!: HTMLElement;

  firstRadio!: HTMLElement;

  constructor(labelsArray: any[], toggles: any[]) {
    this.init(labelsArray, toggles);
  }

  private createPanel(): void {
    const panel = document.createElement('form');
    panel.className = 'panel';
    this.el = panel;
  }

  private createToggle(toggles: any[]): void {
    let labels: HTMLLabelElement[] = [];
    labels = toggles.map((obj) => {
      const input = document.createElement('input');
      input.className = `panel__input ${obj.class}`;
      const keys: string[] = Object.keys(obj.attr);
      const values: string[] = Object.values(obj.attr);

      for (let i = 0; i < keys.length; i += 1) {
        input.setAttribute(keys[i], values[i]);
      }
      const label = document.createElement('label');
      const title = document.createElement('span');
      title.className = 'panel__input-title';
      label.className = 'panel__label';
      title.innerHTML = obj.title;
      label.append(title, input);
      this[`${obj.class.split('-')[1]}`] = input;

      return label;
    });
    this.el.append(...labels);
  }

  private createInput(labelsArray: any[]) {
    let labels: HTMLLabelElement[] = [];
    labels = labelsArray.map((obj) => {
      const input = document.createElement('input');
      input.className = `panel__input ${obj.class}`;
      const keys: string[] = Object.keys(obj.attr);
      const values: string[] = Object.values(obj.attr);

      for (let i = 0; i < keys.length; i += 1) {
        input.setAttribute(keys[i], values[i]);
      }
      const label = document.createElement('label');
      const title = document.createElement('span');
      title.className = 'panel__input-title';
      label.className = 'panel__label';
      title.innerHTML = obj.title;
      label.append(title, input);

      this[`${obj.class.split('-')[1]}`] = input;
      return label;
    });
    this.el.append(...labels);
  }

  private init(labelsArray: any[], toggles: any[]) {
    this.createPanel();
    this.createInput(labelsArray);
    this.createToggle(toggles);
  }
}
