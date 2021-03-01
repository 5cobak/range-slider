import { ISettingsTypes } from '../Interfaces/globals';

export default class ViewTrack {
  el!: HTMLElement;

  type!: string;

  // constructor access one argument, this is validated options from model
  constructor(settings: ISettingsTypes) {
    this.createElement();
    this.setType(settings.type);
  }

  // method create track element and add class .range-slider
  private createElement(): void {
    const el = document.createElement('div');
    el.className = 'range-slider__track';
    this.el = el;
  }

  // method choose type of track(single, single-vertical, double-vertical, double ) and add current class name
  private setType(type: string): void {
    if (type === 'single-horizontal') {
      this.el.className = '';
      this.el.className = 'range-slider__track range-slider__track_single';
    } else if (type === 'single-vertical') {
      this.el.className = '';
      this.el.className = 'range-slider__track range-slider_single range-slider__track_vertical';
    } else if (type === 'double') {
      this.el.className = '';
      this.el.className = 'range-slider__track range-slider__track_double';
    } else {
      this.el.className = '';
      this.el.className = 'range-slider__track range-slider__track_double range-slider__track_vertical';
    }
  }
}
