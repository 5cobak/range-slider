export default class ViewTrack {
  el: HTMLElement;
  _type!: string;

  constructor(settings: IsettingsTypes) {
    this.el = this.createElement();
    this.type = settings.type;
  }

  createElement() {
    const el = document.createElement('div');
    el.className = 'range-slider';
    return el;
  }

  set type(type) {
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
    this._type = type;
  }

  get type() {
    return this._type;
  }
}
