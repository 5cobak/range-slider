import { IsettingsTypes } from './globals';

export default class ViewTrack {
  el!: HTMLElement;

  type!: string;

  constructor(settings: IsettingsTypes) {
    this.createElement();
    this.setType(settings.type)
  }

  createElement():void {
    const el = document.createElement('div');
    el.className = 'range-slider';
    this.el = el;
  }

  setType(type: string):void {
    if (type === 'single') {
      this.el.className = '';
      this.el.className = 'range-slider range-slider_single';
    } else if (type === 'single-vertical') {
      this.el.className = '';
      this.el.className = 'range-slider range-slider_single range-slider_vertical';
    } else if (type === 'double') {
      this.el.className = '';
      this.el.className = 'range-slider range-slider_double';
    } else if (type === 'double-vertical') {
      this.el.className = '';
      this.el.className = 'range-slider range-slider_double range-slider_vertical';
    }
  }
}
