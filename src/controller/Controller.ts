import IPanel from '../panel/globals';
import IController from './globals';

export default class Controller implements IController {
  slider: any;

  panel!: IPanel;

  constructor(slider: any, panel: IPanel) {
    this.init(slider, panel);
  }

  private changeVal(option: string, value: number): void {
    const { panel } = this;
    if (!panel[option]) return;
    (panel[option] as HTMLInputElement).value = `${value}`;
  }

  private setCheckedOption(option: string, value: boolean) {
    const { panel } = this;
    if (value) (panel[option] as HTMLInputElement).checked = value;
  }

  private selectCurrentType(option: string, value: string): void {
    const { panel } = this;
    const radioButton = panel[option] as HTMLInputElement;

    if (radioButton.value === value) {
      radioButton.checked = true;
    } else radioButton.checked = false;
  }

  private updateVal() {
    const sliderEl = this.getElementOfSlider();
    const from = sliderEl.dataset.from as string;
    const to = sliderEl.dataset.to as string;
    if (sliderEl.dataset.to) this.slider.rangeSlider({ to }, 'update');
    this.slider.rangeSlider({ from }, 'update');

    const inputFrom = this.panel.from as HTMLInputElement;
    const inputTo = this.panel.to as HTMLInputElement;
    const newFrom = this.slider.data('from') as string;
    const newTo = this.slider.data('to') as string;

    inputFrom.value = newFrom;
    if (inputTo) inputTo.value = newTo;
  }

  private changeValInPanel() {
    const sliderEl = this.getElementOfSlider();

    const inputFrom = this.panel.from as HTMLInputElement;
    if (sliderEl.dataset.to) {
      const inputTo = this.panel.to as HTMLInputElement;
      inputTo.value = sliderEl.dataset.to as string;
    }
    inputFrom.value = sliderEl.dataset.from as string;
  }

  private removeEventMouseTouchEvents() {
    const changeVal = this.changeValInPanel.bind(this);
    const updateVal = this.updateVal.bind(this);
    document.removeEventListener('mousemove', changeVal);
    document.removeEventListener('touchmove', changeVal);
    document.removeEventListener('mouseup', updateVal);
  }

  private changeValOnSlider() {
    const sliderEl = this.getElementOfSlider();

    const removeEvents = this.removeEventMouseTouchEvents.bind(this);
    const changeVal = this.changeValInPanel.bind(this);
    if (!sliderEl) return;
    changeVal();
    document.addEventListener('mousemove', changeVal);
    document.addEventListener('touchstart', changeVal);
    document.addEventListener('mouseup', removeEvents);
  }

  private changeStepOnSlider(e: Event) {
    const stepInput = (e.target as HTMLElement).closest('.input-step') as HTMLInputElement;

    this.slider.rangeSlider({ step: stepInput.value }, 'update');
    this.updateVal();
  }

  private changeMinOnSlider(e: Event) {
    const inputMin = (e.target as HTMLElement).closest('.input-min') as HTMLInputElement;
    const inputFrom = this.panel.from as HTMLInputElement;

    this.slider.rangeSlider({ min: inputMin.value }, 'update');
    inputFrom.value = this.slider.data('from');
    this.updateVal();
  }

  private changeMaxOnSlider(e: Event) {
    const maxInput = (e.target as HTMLElement).closest('.input-max') as HTMLInputElement;
    this.slider.rangeSlider({ max: maxInput.value }, 'update');
    this.updateVal();
  }

  private changeStartValOnSlider(e: Event) {
    const fromInput = (e.target as HTMLElement).closest('.input-from') as HTMLInputElement;
    this.slider.rangeSlider({ from: fromInput.value }, 'update');
    const { from } = this.slider.data('el').querySelector('.range-slider').dataset;
    fromInput.value = `${from}`;
  }

  private changeSecondValueOnSlider(e: Event) {
    const toInput = (e.target as HTMLElement).closest('.input-to') as HTMLInputElement;
    this.slider.rangeSlider({ to: toInput.value }, 'update');
    const { to } = this.slider.data('el').querySelector('.range-slider').dataset;
    toInput.value = `${to}`;
  }

  private showHideFlag(e: Event) {
    const stepInput = (e.target as HTMLElement).closest('.input-flag') as HTMLInputElement;
    this.slider.rangeSlider({ flag: stepInput.checked }, 'update');
    this.updateVal();
  }

  private showHideScale(e: Event) {
    const stepInput = (e.target as HTMLElement).closest('.input-scale') as HTMLInputElement;
    this.updateVal();
    this.slider.rangeSlider({ scale: stepInput.checked }, 'update');
  }

  private changeTypeOfSlider(e: Event) {
    const radio = e.target as HTMLInputElement;
    this.updateVal();
    this.slider.rangeSlider({ type: radio.value }, 'update');
  }

  private addEventsOnSlider(): void {
    const changeVal = this.changeValOnSlider.bind(this);
    this.slider.on('mousemove', changeVal);
    this.slider.on('touchmove', changeVal);
  }

  private addEventsOnPanel() {
    const step = this.panel.step as HTMLElement;
    const changeStepOnSlider = this.changeStepOnSlider.bind(this);
    const min = this.panel.min as HTMLElement;
    const changeMinOnSlider = this.changeMinOnSlider.bind(this);
    const max = this.panel.max as HTMLElement;
    const changeMaxOnSlider = this.changeMaxOnSlider.bind(this);
    const from = this.panel.from as HTMLElement;
    const changeStartValOnSlider = this.changeStartValOnSlider.bind(this);
    const to = this.panel.to as HTMLElement;
    const changeSecondValueOnSlider = this.changeSecondValueOnSlider.bind(this);
    const flag = this.panel.flag as HTMLElement;
    const showHideFlag = this.showHideFlag.bind(this);
    const scale = this.panel.scale as HTMLElement;
    const showHideScale = this.showHideScale.bind(this);
    const horizontalToggle = this.panel.horizontal as HTMLElement;
    const verticalToggle = this.panel.vertical as HTMLElement;
    const changeTypeOfSlider = this.changeTypeOfSlider.bind(this);
    step.addEventListener('change', changeStepOnSlider);
    min.addEventListener('change', changeMinOnSlider);
    max.addEventListener('change', changeMaxOnSlider);
    from.addEventListener('change', changeStartValOnSlider);
    if (to) to.addEventListener('change', changeSecondValueOnSlider);
    flag.addEventListener('change', showHideFlag);
    scale.addEventListener('change', showHideScale);
    horizontalToggle.addEventListener('change', changeTypeOfSlider);
    verticalToggle.addEventListener('change', changeTypeOfSlider);
  }

  private getElementOfSlider(): HTMLElement {
    return this.slider.data('el').querySelector('.range-slider') as HTMLElement;
  }

  private init(slider: any, panel: IPanel): void {
    this.slider = slider;
    this.panel = panel;
    this.changeVal('from', this.slider.data('from'));
    this.changeVal('to', this.slider.data('to'));
    this.changeVal('min', this.slider.data('min'));
    this.changeVal('max', this.slider.data('max'));
    this.changeVal('step', this.slider.data('step'));
    this.setCheckedOption('flag', this.slider.data('flag'));
    this.setCheckedOption('scale', this.slider.data('scale'));
    this.selectCurrentType('horizontal', this.slider.data('type'));
    this.selectCurrentType('vertical', this.slider.data('type'));
    this.addEventsOnSlider();
    this.addEventsOnPanel();
  }
}
