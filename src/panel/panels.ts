import Panel from './Panel';

export const panelFirst = new Panel(
  [
    {
      title: 'Текущее значение',
      class: 'input-from js-input-from',
      attr: {
        type: 'text',
        placeholder: 'Текущее значение',
      },
    },
    {
      title: 'Шаг',
      class: 'input-step js-input-step',
      attr: {
        type: 'text',
        placeholder: 'Шаг',
      },
    },
    {
      title: 'Минимальное значение',
      class: 'input-min js-input-min',
      attr: {
        type: 'text',
        placeholder: 'Минимальное значение',
      },
    },
    {
      title: 'Максимальное значение',
      class: 'input-max js-input-max',
      attr: {
        type: 'text',
        placeholder: 'Максимальное значение',
      },
    },
    {
      class: 'input-flag js-input-flag',
      title: 'Флаг',
      attr: {
        type: 'checkbox',
        placeholder: '',
      },
    },
    {
      class: 'input-scale js-input-scale',
      title: 'Шкала',
      attr: {
        type: 'checkbox',
        placeholder: '',
      },
    },
  ],
  [
    {
      class: 'input-horizontal js-input-horizontal',
      title: 'Горизонтальный',
      attr: {
        value: 'single-horizontal',
        name: 'type-of-slider',
        type: 'radio',
      },
    },
    {
      class: 'input-vertical js-input-vertical',
      title: 'Вертикальный',
      attr: {
        value: 'single-vertical',
        name: 'type-of-slider',
        type: 'radio',
      },
    },
  ]
);

export const panelSecond = new Panel(
  [
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
      class: 'input-step js-input-step',
      attr: {
        type: 'text',
        placeholder: 'Шаг',
      },
    },
    {
      title: 'Минимальное значение',
      class: 'input-min js-input-min',
      attr: {
        type: 'text',
        placeholder: 'Минимальное значение',
      },
    },
    {
      title: 'Максимальное значение',
      class: 'input-max js-input-max',
      attr: {
        type: 'text',
        placeholder: 'Максимальное значение',
      },
    },
    {
      class: 'input-flag js-input-flag',
      title: 'Флаг',
      attr: {
        type: 'checkbox',
        placeholder: '',
      },
    },
    {
      class: 'input-scale js-input-scale',
      title: 'Шкала',
      attr: {
        type: 'checkbox',
        placeholder: '',
      },
    },
  ],
  [
    {
      class: 'input-horizontal js-input-horizontal',
      title: 'Горизонтальный',
      attr: {
        value: 'double-horizontal',
        name: 'type-of-slider',
        type: 'radio',
      },
    },
    {
      class: 'input-vertical js-input-vertical',
      title: 'Вертикальный',
      attr: {
        value: 'double-vertical',
        name: 'type-of-slider',
        type: 'radio',
      },
    },
  ]
);
