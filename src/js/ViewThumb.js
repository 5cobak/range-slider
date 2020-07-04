/// <reference path="globals.d.ts" />
class ViewThumb {
    constructor(settings) {
        this.settings = settings;
        this.createThumb();
    }
    createThumb() {
        const thumb = document.createElement('span');
        thumb.className = 'range-slider__thumb range-slider__thumb_first';
        this.$el = thumb;
    }
    setPosition(settings) {
        const track = this.$el.parentElement;
        if (settings.type === 'single') {
            this.$el.style.left = `${track.offsetWidth / 2}px`;
        }
        else if (settings.type === 'double') {
            this.$el.style.left = `${track.offsetWidth / 4}px`;
        }
        else if (settings.type === 'single-vertical') {
            this.$el.style.top = `${track.offsetHeight / 2}px`;
        }
        else {
            this.$el.style.top = `${track.offsetHeight / 4}px`;
        }
    }
    // -------------------------------------------------------------  events for X type range
    static moveDoubleTypeX(e) {
        const track = e.target.closest('.range-slider');
        const inner = e.target
            .closest('.range-slider')
            .querySelector('.range-slider__inner');
        const targetThumb = e.target.closest('.range-slider__thumb');
        if (!targetThumb)
            return;
        let targetSecondThumb;
        const firstThumb = e.target
            .closest('.range-slider')
            .querySelector('.range-slider__thumb_first');
        const secondThumb = e.target
            .closest('.range-slider')
            .querySelector('.range-slider__thumb_second');
        if (targetThumb.classList.contains('range-slider__thumb_first')) {
            targetSecondThumb = e.target
                .closest('.range-slider')
                .querySelector('.range-slider__thumb_second');
        }
        else {
            targetSecondThumb = e.target
                .closest('.range-slider')
                .querySelector('.range-slider__thumb_first');
        }
        if (!targetThumb)
            return;
        targetThumb.style.zIndex = '100';
        targetSecondThumb.style.zIndex = '50';
        targetThumb.ondragstart = function () {
            return false;
        };
        function moveAt(pageX) {
            // const flag = targetThumb.querySelector('.range-slider__flag');
            const halfThumb = parseInt(getComputedStyle(targetThumb).width) / 2;
            const fullWidthThumb = parseInt(getComputedStyle(targetThumb).width);
            targetThumb.style.left = `${pageX - track.offsetLeft - halfThumb}px`;
            /// min position
            if (parseInt(getComputedStyle(targetThumb).left) <= 0) {
                targetThumb.style.left = `${0}px`;
            }
            /// max position
            else if (parseInt(getComputedStyle(targetThumb).left) >= track.offsetWidth - fullWidthThumb) {
                targetThumb.style.left = `${track.offsetWidth - fullWidthThumb}px`;
            }
            if (targetThumb === firstThumb &&
                targetThumb.getBoundingClientRect().left >= targetSecondThumb.getBoundingClientRect().left) {
                targetThumb.style.left = `${parseInt(getComputedStyle(targetSecondThumb).left)}px`;
            }
            if (targetThumb === secondThumb &&
                targetThumb.getBoundingClientRect().left <= targetSecondThumb.getBoundingClientRect().left) {
                targetThumb.style.left = `${parseInt(getComputedStyle(targetSecondThumb).left)}px`;
            }
            inner.style.left = `${firstThumb.offsetLeft + firstThumb.offsetWidth / 2}px`;
            inner.style.width = `${parseInt(getComputedStyle(secondThumb).left) - parseInt(getComputedStyle(firstThumb).left)}px`;
        }
        moveAt(e.pageX);
        function onMouseMove(e) {
            moveAt(e.pageX);
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', (e) => {
            document.removeEventListener('mousemove', onMouseMove);
        });
    }
    setPosOnClickSingleTypeX(e) {
        const track = e.target.closest('.range-slider');
        const thumb = track.querySelector('.range-slider__thumb');
        const inner = track.querySelector('.range-slider__inner');
        const flag = track.querySelector('.range-slider__flag');
        if (e.target === flag)
            return;
        moveAt(e.pageX);
        function moveAt(pageX) {
            const fullWidthThumb = parseInt(getComputedStyle(thumb).width);
            thumb.style.left = `${pageX - track.offsetLeft - parseInt(getComputedStyle(thumb).width) / 2}px`;
            if (parseInt(getComputedStyle(thumb).left) <= 0)
                thumb.style.left = `${0}px`;
            if (parseInt(getComputedStyle(thumb).left) > track.offsetWidth - fullWidthThumb) {
                thumb.style.left = `${track.offsetWidth - fullWidthThumb}px`;
            }
            inner.style.width = getComputedStyle(thumb).left;
        }
    }
    setPosOnClickDoubleTypeX(e) {
        const track = e.target.closest('.range-slider');
        const clientX = e.clientX;
        const thumbs = track.querySelectorAll('.range-slider__thumb');
        let firstDifference = thumbs[0].getBoundingClientRect().right - clientX;
        let secondDifference = thumbs[1].getBoundingClientRect().left - clientX;
        let movedThumb;
        if (e.target.classList.contains('range-slider__thumb'))
            return;
        if (firstDifference < 0)
            firstDifference = -firstDifference;
        if (secondDifference < 0)
            secondDifference = -secondDifference;
        if (firstDifference > secondDifference)
            movedThumb = thumbs[1];
        else
            movedThumb = thumbs[0];
        moveAt(e.pageX);
        function moveAt(pageX) {
            const fullWidthThumb = parseInt(getComputedStyle(movedThumb).width);
            movedThumb.style.left = `${pageX - track.offsetLeft - parseInt(getComputedStyle(movedThumb).width) / 2}px`;
            if (parseInt(getComputedStyle(movedThumb).left) <= 0)
                movedThumb.style.left = `${0}px`;
            if (parseInt(getComputedStyle(movedThumb).left) > track.offsetWidth - fullWidthThumb) {
                movedThumb.style.left = `${track.offsetWidth - fullWidthThumb}px`;
            }
        }
    }
    moveSingleTypeX(e) {
        const track = e.target.closest('.range-slider');
        const thumb = e.target.closest('.range-slider__thumb');
        const inner = track.querySelector('.range-slider__inner');
        if (!thumb)
            return;
        thumb.ondragstart = function () {
            return false;
        };
        moveAt(e.pageX);
        function moveAt(pageX) {
            const halfThumb = parseInt(getComputedStyle(thumb).width) / 2;
            const fullWidthThumb = parseInt(getComputedStyle(thumb).width);
            thumb.style.left = `${pageX - track.offsetLeft - halfThumb}px`;
            if (parseInt(getComputedStyle(thumb).left) <= 0) {
                thumb.style.left = `${0}px`;
            }
            if (parseInt(getComputedStyle(thumb).left) >= track.offsetWidth - fullWidthThumb) {
                thumb.style.left = `${track.offsetWidth - fullWidthThumb}px`;
            }
            inner.style.width = `${parseInt(getComputedStyle(thumb).left) + halfThumb}px`;
        }
        function onMouseMove(e) {
            moveAt(e.pageX);
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', (e) => {
            document.removeEventListener('mousemove', onMouseMove);
        });
    }
    // -------------------------------------------------------------  events for Y type range
    moveSingleTypeY(e) {
        const track = e.target.closest('.range-slider');
        const thumb = e.target.closest('.range-slider__thumb');
        const inner = track.querySelector('.range-slider__inner');
        if (!thumb)
            return;
        thumb.ondragstart = function () {
            return false;
        };
        moveAt(e.pageY);
        function moveAt(pageY) {
            const halfThumb = parseInt(getComputedStyle(thumb).height) / 2;
            const fullHeightThumb = parseInt(getComputedStyle(thumb).height);
            thumb.style.top = `${pageY - track.offsetTop - halfThumb}px`;
            if (parseInt(getComputedStyle(thumb).top) <= 0)
                thumb.style.top = `${0}px`;
            if (parseInt(getComputedStyle(thumb).top) >= track.offsetHeight - fullHeightThumb) {
                thumb.style.top = `${track.offsetHeight - fullHeightThumb}px`;
            }
            inner.style.height = `${parseInt(getComputedStyle(thumb).top) + halfThumb}px`;
        }
        function onMouseMove(e) {
            moveAt(e.pageY);
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', (e) => {
            document.removeEventListener('mousemove', onMouseMove);
        });
    }
    setPosOnClickSingleTypeY(e) {
        const track = e.target.closest('.range-slider');
        const thumb = track.querySelector('.range-slider__thumb');
        const inner = track.querySelector('.range-slider__inner');
        moveAt(e.pageY);
        function moveAt(pageY) {
            const fullHeightThumb = parseInt(getComputedStyle(thumb).height);
            thumb.style.top = `${pageY - track.offsetTop - parseInt(getComputedStyle(thumb).height) / 2}px`;
            if (parseInt(getComputedStyle(thumb).top) < 0)
                thumb.style.top = `${0}px`;
            if (parseInt(getComputedStyle(thumb).top) > track.offsetHeight - fullHeightThumb) {
                thumb.style.top = `${track.offsetHeight - fullHeightThumb}px`;
            }
            inner.style.height =
                getComputedStyle(thumb).top + parseInt(getComputedStyle(thumb).height) / 2;
        }
    }
    moveDoubleTypeY(e) {
        const track = e.target.closest('.range-slider');
        const inner = e.target
            .closest('.range-slider')
            .querySelector('.range-slider__inner');
        const targetThumb = e.target.closest('.range-slider__thumb');
        if (!targetThumb)
            return;
        let targetSecondThumb;
        const firstThumb = e.target
            .closest('.range-slider')
            .querySelector('.range-slider__thumb_first');
        const secondThumb = e.target
            .closest('.range-slider')
            .querySelector('.range-slider__thumb_second');
        if (targetThumb.classList.contains('range-slider__thumb_first')) {
            targetSecondThumb = e.target
                .closest('.range-slider')
                .querySelector('.range-slider__thumb_second');
        }
        else {
            targetSecondThumb = e.target
                .closest('.range-slider')
                .querySelector('.range-slider__thumb_first');
        }
        if (!targetThumb)
            return;
        targetThumb.style.zIndex = '100';
        targetSecondThumb.style.zIndex = '50';
        targetThumb.ondragstart = function () {
            return false;
        };
        const shiftY = e.clientY - parseInt(getComputedStyle(targetThumb).top);
        moveAt(e.clientY);
        function moveAt(clientY) {
            const fullHeightThumb = parseInt(getComputedStyle(targetThumb).height);
            targetThumb.style.top = `${clientY - shiftY}px`;
            /// min position
            if (parseInt(getComputedStyle(targetThumb).top) <= 0) {
                targetThumb.style.top = `${0}px`;
            }
            /// max position
            else if (parseInt(getComputedStyle(targetThumb).top) >=
                track.offsetHeight - fullHeightThumb) {
                targetThumb.style.top = `${track.offsetHeight - fullHeightThumb}px`;
            }
            if (targetThumb === firstThumb &&
                targetThumb.getBoundingClientRect().top >= targetSecondThumb.getBoundingClientRect().top) {
                targetThumb.style.top = `${parseInt(getComputedStyle(targetSecondThumb).top)}px`;
            }
            if (targetThumb === secondThumb &&
                targetThumb.getBoundingClientRect().top <= targetSecondThumb.getBoundingClientRect().top) {
                targetThumb.style.top = `${parseInt(getComputedStyle(targetSecondThumb).top)}px`;
            }
            inner.style.top = `${firstThumb.offsetTop + firstThumb.offsetHeight / 2}px`;
            inner.style.height = `${parseInt(getComputedStyle(secondThumb).top) - parseInt(getComputedStyle(firstThumb).top)}px`;
        }
        function onMouseMove(e) {
            moveAt(e.clientY);
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', (e) => {
            document.removeEventListener('mousemove', onMouseMove);
        });
    }
    setPosOnClickDoubleTypeY(e) {
        const track = e.target.closest('.range-slider');
        const clientY = e.clientY;
        const thumbs = track.querySelectorAll('.range-slider__thumb');
        let firstDifference = thumbs[0].getBoundingClientRect().bottom - clientY;
        let secondDifference = thumbs[1].getBoundingClientRect().top - clientY;
        let movedThumb;
        if (firstDifference < 0)
            firstDifference = -firstDifference;
        if (secondDifference < 0)
            secondDifference = -secondDifference;
        if (firstDifference > secondDifference)
            movedThumb = thumbs[1];
        else
            movedThumb = thumbs[0];
        moveAt(e.clientY);
        function moveAt(clientY) {
            const fullHeightThumb = parseInt(getComputedStyle(movedThumb).height);
            movedThumb.style.top = `${clientY - track.offsetTop - parseInt(getComputedStyle(movedThumb).height) / 2}px`;
            /// min position
            if (parseInt(getComputedStyle(movedThumb).top) < 0) {
                movedThumb.style.top = `${0}px`;
            }
            /// max position
            if (parseInt(getComputedStyle(movedThumb).top) > track.offsetHeight - fullHeightThumb) {
                movedThumb.style.top = `${track.offsetHeight - fullHeightThumb}px`;
            }
        }
    }
}
module.exports = ViewThumb;
async function move() {
    await new Promise((resolve, reject) => {
        alert(resolve);
    });
}
//# sourceMappingURL=ViewThumb.js.map