import { IsettingsTypes } from './globals';

export default class ViewTrack {
  el!: HTMLElement;

  type!: string;

  // constructor access one argument, this is validated options from model
  constructor(settings: IsettingsTypes) {
    this.createElement();
    this.setType(settings.type)
  }

  // method create track element and add class .range-slider
  private createElement():void {
    const el = document.createElement('div');
    el.className = 'range-slider';
    this.el = el;
  }

  // method choose type of track(single, single-vertical, double-vertical, double ) and add current class name
  private setType(type: string):void {
    if (type === 'single') {
      this.el.className = '';
      this.el.className = 'range-slider range-slider_single';
    } else if (type === 'single-vertical') {
      this.el.className = '';
      this.el.className = 'range-slider range-slider_single range-slider_vertical';
    } else if (type === 'double') {
      this.el.className = '';
      this.el.className = 'range-slider range-slider_double';
    } else {
      this.el.className = '';
      this.el.className = 'range-slider range-slider_double range-slider_vertical';
    }
  }
}
