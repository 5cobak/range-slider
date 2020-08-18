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

  onChangeVal(option: string, value: number) {
    const inputCurrentVal = this.el.querySelector(`.input-${option}`) as HTMLInputElement;
    inputCurrentVal.value = `${value}`;
  }

  onInput(option: string, func: Function) {
    const input = this.el.querySelector(`.input-${option}`) as HTMLInputElement;

    input.onchange = (e: Event) => {
      func(input.value);
    };
  }
  onChangeSecondVal(value: number) {
    const inputCurrentVal = this.el.querySelector('.input-second-value') as HTMLInputElement;
    inputCurrentVal.value = `${value}`;
  }
  setStepOnInput(value: number) {
    const inputStep = this.el.querySelector('.input-step') as HTMLInputElement;
    inputStep.value = `${value}`;
  }
  setFlagCheck(boo: boolean) {
    const inputFlag = this.el.querySelector('.input-flag') as HTMLInputElement;
    inputFlag.checked = boo;
  }
}

export const panelFirst = new Panel([
  {
    title: 'Текущее значение',
    class: 'input-from',
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

export const panelSecond = new Panel([
  {
    title: 'От',
    class: 'input-from',
    attr: {
      type: 'text',
      placeholder: 'от',
    },
  },
  {
    title: 'до',
    class: 'input-to',
    attr: {
      type: 'text',
      placeholder: 'до',
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

export const panelThird = new Panel([
  {
    title: 'От',
    class: 'input-from',
    attr: {
      type: 'text',
      placeholder: 'от',
    },
  },
  {
    title: 'до',
    class: 'input-to',
    attr: {
      type: 'text',
      placeholder: 'до',
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

export const panelFourth = new Panel([
  {
    title: 'Текущее значение',
    class: 'input-from',
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
