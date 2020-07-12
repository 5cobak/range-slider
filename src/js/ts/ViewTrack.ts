class ViewTrack {
  $el: JQuery;
  _type!: string;
  constructor($element: JQuery, settings: IsettingsTypes) {
    this.$el = $element;
    this.type = settings.type;
  }

  set type(type) {
    if (type === 'single') {
      this.$el.removeClass().addClass('range-slider range-slider_single');
    }
    if (type === 'single-vertical') {
      this.$el.removeClass().addClass('range-slider range-slider_single range-slider_vertical');
    }
    if (type === 'double') {
      this.$el.removeClass().addClass('range-slider range-slider_double');
    }
    if (type === 'double-vertical') {
      this.$el.removeClass().addClass('range-slider range-slider_double range-slider_vertical');
    }
    this._type = type;
  }

  get type() {
    return this._type;
  }
}
module.exports = ViewTrack;
