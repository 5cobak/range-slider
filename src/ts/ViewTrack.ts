import { IsettingsTypes } from './globals';

export default class ViewTrack {
  el!: HTMLElement;

  type!: string;

  constructor(settings: IsettingsTypes) {
    this.createElement();
    this.type = settings.type as string;
    this.setType(this.type)
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
    }
    if (type === 'single-vertical') {
      this.el.className = '';
      this.el.className = 'range-slider range-slider_single range-slider_vertical';
    }
    if (type === 'double') {
      this.el.className = '';
      this.el.className = 'range-slider range-slider_double';
    }
    if (type === 'double-vertical') {
      this.el.className = '';
      this.el.className = 'range-slider range-slider_double range-slider_vertical';
    }
  }
}
