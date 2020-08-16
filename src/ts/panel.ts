import { IInput } from './globals';

export default class Panel {
  el: HTMLElement;
  flag: HTMLElement;
  constructor(labelsArray: any[]) {
    this.el = this.createPanel();
    this.el.append(...this.createInput(labelsArray));
    this.flag = this.el.querySelector('.input-flag') as HTMLElement;
  }

  createPanel() {
    const panel = document.createElement('form');
    panel.className = 'panel';
    return panel;
  }

  createInput(labelsArray: any[]) {
    const labels: HTMLLabelElement[] = [];
    labelsArray.map((obj) => {
      const input = document.createElement('input');
      input.className = `panel__input ${obj.class}`;
      for (let key in obj.attr) {
        input.setAttribute(key, obj.attr[key]);
      }
      const label = document.createElement('label');
      const title = document.createElement('span');
      title.className = 'panel__input-title';
      title.innerHTML = obj.title;
      label.append(title, input);
      labels.push(label);
    });
    return labels;
  }

  onChangeVal(value: number) {
    const inputCurrentVal = this.el.querySelector('.input-current-value') as HTMLInputElement;
    inputCurrentVal.value = `${value}`;
  }

  onInputVal(func: Function) {
    const inputCurrentVal = this.el.querySelector('.input-current-value') as HTMLInputElement;
    inputCurrentVal.onchange = (e: Event) => {
      let input = e.target as HTMLInputElement;
      func(input.value);
    };
  }
  setStepOnInput(value: number) {
    const inputStep = this.el.querySelector('.input-step') as HTMLInputElement;
    inputStep.value = `${value}`;
  }
  onInputStep(value: Function) {
    const inputStep = this.el.querySelector('.input-step') as HTMLInputElement;
    inputStep.onchange = (e: Event) => {
      value(inputStep.value);
    };
  }
  setFlagCheck(boo: boolean) {
    const inputFlag = this.el.querySelector('.input-flag') as HTMLInputElement;
    inputFlag.checked = boo;
  }
}

export const panelFirst = new Panel([
  {
    title: 'Текущее значение',
    class: 'input-current-value',
    attr: {
      type: 'text',
      placeholder: 'Текущее значение',
    },
  },
  {
    title: 'Шаг',
    class: 'input-step',
    attr: {
      type: 'text',
      placeholder: 'Шаг',
    },
  },
  {
    class: 'input-flag',
    title: 'Флаг',
    attr: {
      type: 'checkbox',
      placeholder: '',
    },
  },
]);
