import View from './View';
import Model from './Model';

export default class Presenter {
  view: any;
  model: IModel;
  settings: IsettingsTypes;
  constructor(settings: IsettingsTypes, $this: HTMLElement) {
    this.settings = settings;
    this.view = new View($this, settings);
    this.model = new Model(settings);
    this.addObserversInModel(settings);
    this.addObserversInView(settings);
    this.settings = settings;
    this.model.modelChangedSubject.notifyObservers();
  }
  private addObserversInView(settings: IsettingsTypes) {
    const flag = this.view.type.flag.el;

    this.view.modelChangedSubject.addObservers(() => {
      if (settings.type === 'single' || settings.type === 'signle-vertical') {
        flag.innerHTML = this.model.bank.currentValue;
      } else if (settings.type === 'double' || settings.type === 'double-vertical') {
        const secondFlag = this.view.type.secondFlag.el;
        flag.innerHTML = this.model.bank.currentValue;
        secondFlag.innerHTML = this.model.bank.currentValueSecond;
      }
    });
  }
  private addObserversInModel(settings: IsettingsTypes) {
    if (settings.type === 'single') {
      this.model.modelChangedSubject.addObservers(() => {
        this.changeSingleValue('width', 'left');
      });
    } else if (settings.type === 'double') {
      this.model.modelChangedSubject.addObservers(() => {
        this.changeDoubleValue('width', 'left');
      });
    } else if (settings.type === 'single-vertical') {
      this.model.modelChangedSubject.addObservers(() => {
        this.changeSingleValue('height', 'top');
      });
    } else if (settings.type === 'double-vertical') {
      this.model.modelChangedSubject.addObservers(() => {
        this.changeDoubleValue('height', 'top');
      });
    }
  }
  private changeSingleValue(offset: string, pos: string) {
    let that = this;

    function changeVal() {
      let currentValPercent: number;
      let generalVal = that.model.type.getGeneralValue(that.settings);
      const thumbSize =
        offset === 'width' ? parseInt(getComputedStyle(that.view.type.thumb.el).width) : parseInt(getComputedStyle(that.view.type.thumb.el).height);
      const step = that.settings.step;
      const trackWidth =
        offset === 'width'
          ? parseInt(getComputedStyle(that.view.type.track.el).width) - thumbSize
          : parseInt(getComputedStyle(that.view.type.track.el).height) - thumbSize;
      const flag = that.view.type.flag.el;
      const stepCount = generalVal / step;
      let stepSize = trackWidth / stepCount;
      let leftPos =
        pos === 'left' ? parseInt(getComputedStyle(that.view.type.thumb.el).left) : parseInt(getComputedStyle(that.view.type.thumb.el).top);
      that.view.modelChangedSubject.notifyObservers();
    }
    changeVal();

    this.view.type.track.el.addEventListener('mousedown', (e: MouseEvent) => {
      changeVal();
      document.addEventListener('mousemove', changeVal);
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', changeVal);
      });
    });
  }

  private changeDoubleValue(offset: string, pos: string) {
    let that = this;

    function changeVal() {
      let currentValPercent: number;
      let generalVal = that.model.type.getGeneralValue(that.settings);
      const thumbSize =
        offset === 'width' ? parseInt(getComputedStyle(that.view.type.thumb.el).width) : parseInt(getComputedStyle(that.view.type.thumb.el).height);
      const step = that.settings.step;
      const trackWidth =
        offset === 'width'
          ? parseInt(getComputedStyle(that.view.type.track.el).width) - thumbSize
          : parseInt(getComputedStyle(that.view.type.track.el).height) - thumbSize;
      const flag = that.view.type.flag.el;
      const flagSecond = that.view.type.secondFlag.el;
      const stepCount = generalVal / step;
      let stepSize = trackWidth / stepCount;
      let leftPos =
        pos === 'left' ? parseInt(getComputedStyle(that.view.type.thumb.el).left) : parseInt(getComputedStyle(that.view.type.thumb.el).top);
      let leftPosSecond =
        pos === 'left'
          ? parseInt(getComputedStyle(that.view.type.secondThumb.el).left)
          : parseInt(getComputedStyle(that.view.type.secondThumb.el).top);
      that.model.bank.currentValue = that.model.setCurrentValue(leftPos, stepSize, step);
      that.model.bank.currentValueSecond = that.model.setCurrentValue(leftPosSecond, stepSize, step);
      that.view.modelChangedSubject.notifyObservers();
    }
    changeVal();

    this.view.type.track.el.addEventListener('mousedown', (e: MouseEvent) => {
      changeVal();
      document.addEventListener('mousemove', changeVal);
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', changeVal);
      });
    });
  }
}
