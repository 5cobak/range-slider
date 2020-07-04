// ---------------------------------------   VIEW --------------------------------------------
const ViewThumb = require('./ViewThumb');
import ViewTrack from './ViewTrack';
import ViewInner from './ViewInner';
import ViewFlag from './ViewFlag';
// VIEW class
class View {
    constructor(element, settings) {
        this.settings = settings;
        this.$el = element;
        this.track = new ViewTrack(this.$el, this.settings);
        this.thumb = new ViewThumb(this.settings);
        this.inner = new ViewInner(this.settings);
        this.flag = new ViewFlag(this.settings);
        this.secondFlag = new ViewFlag(this.settings);
        this.addElements();
        this.addEvents();
        this.init();
    }
    // add second thumb, if it needed
    addSecondThumb() {
        const $this = this;
        if (this.settings.type === 'double' || this.settings.type === 'double-vertical') {
            this.secondThumb = new ViewThumb(this.settings);
            this.secondThumb.$el.classList.remove('range-slider__thumb_first');
            this.secondThumb.$el.classList.add('range-slider__thumb_second');
            this.secondThumb.setPosition = (settings) => {
                if (settings.type === 'double') {
                    this.$el.style.left = `${$this.track.$el.outerWidth() / 1.5}px`;
                    $this.secondFlag.$el.className = 'range-slider__flag range-slider__flag_second';
                    this.$el.append($this.secondFlag.$el);
                }
                else if (settings.type === 'double-vertical') {
                    this.$el.style.top = `${$this.track.$el.outerHeight() / 1.5}px`;
                    $this.secondFlag.$el.className = 'range-slider__flag range-slider__flag_second';
                    this.$el.append($this.secondFlag.$el);
                }
            };
        }
    }
    // add all elements in view
    addElements() {
        this.track.$el.append(this.inner.$el, this.thumb.$el);
        this.thumb.$el.append(this.flag.$el);
        if (this.settings.type === 'double') {
            this.addSecondThumb();
            this.track.$el.append(this.secondThumb.$el);
            if (this.settings.flag) {
                this.secondThumb.$el.append(this.secondFlag.$el);
                this.secondFlag.setPosition(this.settings);
            }
        }
        else if (this.settings.type === 'double-vertical') {
            this.addSecondThumb();
            this.track.$el.append(this.secondThumb.$el);
        }
    }
    // add view events
    addEvents() {
        this.track.$el.mousedown((e) => {
            const $this = this;
            if (this.settings.type === 'single') {
                this.thumb.moveSingleTypeX(e);
                this.thumb.setPosOnClickSingleTypeX(e);
                this.inner.setPosition(this.settings);
            }
            else if (this.settings.type === 'double') {
                this.thumb.moveDoubleTypeX(e);
                this.thumb.setPosOnClickDoubleTypeX(e);
                this.inner.setPosition(this.settings);
            }
            else if (this.settings.type === 'single-vertical') {
                this.thumb.moveSingleTypeY(e);
                this.thumb.setPosOnClickSingleTypeY(e);
                this.inner.setPosition(this.settings);
            }
            else {
                this.thumb.moveDoubleTypeY(e);
                this.thumb.setPosOnClickDoubleTypeY(e);
                this.inner.setPosition(this.settings);
            }
            const $settings = this.settings;
            function writeVal() {
                $this.flag.writeValueIn($settings);
                if ($settings.type === 'single' || $settings.type === 'single-vertical')
                    return;
                $this.secondFlag.writeValueIn($settings);
            }
            // write value in flags by click on track
            writeVal();
            // write value in flags by move thumb or flag
            document.addEventListener('mousemove', writeVal);
            // eslint-disable-next-line fsd/no-function-declaration-in-event-listener
            document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', writeVal);
            });
        });
    }
    // inicialize view, set position for elements
    init() {
        this.thumb.setPosition(this.settings);
        this.flag.setPosition(this.settings);
        this.flag.writeValueIn(this.settings);
        if (this.settings.type === 'double') {
            this.secondThumb.setPosition(this.settings);
            this.secondFlag.setPosition(this.settings);
            this.secondFlag.writeValueIn(this.settings);
        }
        else if (this.settings.type === 'double-vertical') {
            this.secondThumb.setPosition(this.settings);
            this.secondFlag.setPosition(this.settings);
            this.secondFlag.writeValueIn(this.settings);
        }
        this.inner.setPosition(this.settings);
        if (!this.settings.flag) {
            this.thumb.$el.querySelector('.range-slider__flag').remove();
            if (this.settings.type === 'double' || this.settings.type === 'double-vertical') {
                this.secondThumb.$el.querySelector('.range-slider__flag').remove();
            }
        }
    }
}
module.exports = View;
