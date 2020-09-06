export default class Panel {
  el!: HTMLElement;

  flag!: HTMLInputElement;

  scale!: HTMLInputElement;

  inputs!: HTMLLabelElement[]

  constructor(labelsArray: any[]) {
    this.createPanel();
    this.createInput(labelsArray);
    this.flag = this.createCheckbox('flag') as HTMLInputElement;
    this.scale = this.createCheckbox('scale') as HTMLInputElement;
  }

  private createPanel() {
    const panel = document.createElement('form');
    panel.className = 'panel';
    this.el = panel;
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
      // labels.push(label);
      return label;
    });
    this.el.append(...labels);
  }

  private createCheckbox(name: string) {
    const checkbox = this.el.querySelector(`.input-${name}`);
    return checkbox;
  }

  onChangeVal(option: string, value: number):void {
    const inputCurrentVal = this.el.querySelector(`.input-${option}`) as HTMLInputElement;
    inputCurrentVal.value = `${value}`;
  }

  onInput(option: string, func: (val: string)=>void): void {
    const input = this.el.querySelector(`.input-${option}`) as HTMLInputElement;

    input.onchange = () => {
      func(input.value);
    };
  }

  onChangeSecondVal(value: number):void {
    const inputCurrentVal = this.el.querySelector('.input-second-value') as HTMLInputElement;
    inputCurrentVal.value = `${value}`;
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
    title: 'Минимальное значение',
    class: 'input-min',
    attr: {
      type: 'text',
      placeholder: 'Минимальное значение',
    },
  },
  {
    title: 'Максимальное значение',
    class: 'input-max',
    attr: {
      type: 'text',
      placeholder: 'Максимальное значение',
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
  {
    class: 'input-scale',
    title: 'Шкала',
    attr: {
      type: 'checkbox',
      placeholder: '',
    },
  },
]);

export const panelSecond = new Panel([
  {
    title: 'от',
    class: 'input-from',
    attr: {
      type: 'text',
      placeholder: 'Текущее значение',
    },
  },
  {
    title: 'до',
    class: 'input-to',
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
    title: 'Минимальное значение',
    class: 'input-min',
    attr: {
      type: 'text',
      placeholder: 'Минимальное значение',
    },
  },
  {
    title: 'Максимальное значение',
    class: 'input-max',
    attr: {
      type: 'text',
      placeholder: 'Максимальное значение',
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
  {
    class: 'input-scale',
    title: 'Шкала',
    attr: {
      type: 'checkbox',
      placeholder: '',
    },
  },
]);

export const panelThird = new Panel([
  {
    title: 'от',
    class: 'input-from',
    attr: {
      type: 'text',
      placeholder: 'Текущее значение',
    },
  },
  {
    title: 'до',
    class: 'input-to',
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
    title: 'Минимальное значение',
    class: 'input-min',
    attr: {
      type: 'text',
      placeholder: 'Минимальное значение',
    },
  },
  {
    title: 'Максимальное значение',
    class: 'input-max',
    attr: {
      type: 'text',
      placeholder: 'Максимальное значение',
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
  {
    class: 'input-scale',
    title: 'Шкала',
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
    title: 'Минимальное значение',
    class: 'input-min',
    attr: {
      type: 'text',
      placeholder: 'Минимальное значение',
    },
  },
  {
    title: 'Максимальное значение',
    class: 'input-max',
    attr: {
      type: 'text',
      placeholder: 'Максимальное значение',
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
  {
    class: 'input-scale',
    title: 'Шкала',
    attr: {
      type: 'checkbox',
      placeholder: '',
    },
  },
]);
