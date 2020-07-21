/// <reference path="globals.d.ts" />

export default class ViewThumb implements IClassProperties {
  settings: IsettingsTypes;
  el: HTMLElement;
  constructor(settings: IsettingsTypes) {
    this.settings = settings;
    this.el = this.createThumb();
  }

  createThumb(): HTMLElement {
    const thumb: HTMLElement = document.createElement('span');
    thumb.className = 'range-slider__thumb range-slider__thumb_first';
    return thumb;
  }

  setPosition(settings: IsettingsTypes): void {
    const track = this.el.parentElement;
    const widthThumb = this.el.offsetWidth;
    if (!(track instanceof HTMLElement)) return;
    if (settings.type === 'single') {
      this.el.style.left = '0px';
    } else if (settings.type === 'double') {
      this.el.style.left = `${track.offsetWidth / 4}px`;
    } else if (settings.type === 'single-vertical') {
      this.el.style.top = '0px';
    } else {
      this.el.style.top = `${track.offsetHeight / 4}px`;
    }
  }

  // -------------------------------------------------------------  events for X type range
  moveSingleTypeX(e: MouseEvent): void {
    const target = e.target as HTMLElement;

    const track = target.closest('.range-slider') as HTMLElement;
    const thumb = target.closest('.range-slider__thumb') as HTMLElement;
    const inner = track.querySelector('.range-slider__inner') as HTMLElement;
    if (!thumb) return;
    thumb.ondragstart = function (): boolean {
      return false;
    };

    moveAt(e.pageX);
    function moveAt(pageX: number) {
      const halfThumb = parseInt(getComputedStyle(thumb).width) / 2;
      const fullWidthThumb = parseInt(getComputedStyle(thumb).width);
      thumb.style.left = `${pageX - track.offsetLeft - halfThumb}px`;

      if (parseInt(getComputedStyle(thumb).left) <= 0) {
        thumb.style.left = `${0}px`;
      } else if (parseInt(getComputedStyle(thumb).left) >= track.offsetWidth - fullWidthThumb) {
        thumb.style.left = `${track.offsetWidth - fullWidthThumb}px`;
      }
      inner.style.width = `${parseInt(getComputedStyle(thumb).left) + halfThumb}px`;
    }
    function onMouseMove(e: MouseEvent) {
      moveAt(e.pageX);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', onMouseMove);
    });
  }

  moveDoubleTypeX(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const track = target.closest('.range-slider') as HTMLElement;
    const inner = track.querySelector('.range-slider__inner') as HTMLElement;
    const targetThumb = target.closest('.range-slider__thumb') as HTMLElement;
    if (!targetThumb) return;

    let targetSecondThumb: HTMLElement;
    const firstThumb = track.querySelector('.range-slider__thumb_first') as HTMLElement;
    const secondThumb = track.querySelector('.range-slider__thumb_second') as HTMLElement;

    if (targetThumb.classList.contains('range-slider__thumb_first')) {
      targetSecondThumb = secondThumb;
    } else {
      targetSecondThumb = firstThumb;
    }
    if (!targetThumb) return;
    targetThumb.style.zIndex = '100';
    targetSecondThumb.style.zIndex = '50';
    targetThumb.ondragstart = function (): boolean {
      return false;
    };

    function moveAt(pageX: number): void {
      if (!track) return;
      const halfThumb: number = parseInt(getComputedStyle(targetThumb).width) / 2;
      const fullWidthThumb: number = parseInt(getComputedStyle(targetThumb).width);

      targetThumb.style.left = `${pageX - track.offsetLeft - halfThumb}px`;
      /// min position
      if (parseInt(getComputedStyle(targetThumb).left) <= -halfThumb) {
        targetThumb.style.left = `${-halfThumb}px`;
      } else if (parseInt(getComputedStyle(targetThumb).left) >= track.offsetWidth - halfThumb) {
        targetThumb.style.left = `${track.offsetWidth - halfThumb}px`;
      }

      if (targetThumb === firstThumb && targetThumb.offsetLeft >= targetSecondThumb.offsetLeft) {
        targetThumb.style.left = `${parseInt(getComputedStyle(targetSecondThumb).left)}px`;
      } else if (
        targetThumb === secondThumb &&
        targetThumb.offsetLeft <= targetSecondThumb.offsetLeft
      ) {
        targetThumb.style.left = `${parseInt(getComputedStyle(targetSecondThumb).left)}px`;
      }
      inner.style.left = `${firstThumb.offsetLeft + firstThumb.offsetWidth / 2}px`;
      inner.style.width = `${
        parseInt(getComputedStyle(secondThumb).left) - parseInt(getComputedStyle(firstThumb).left)
      }px`;
    }
    moveAt(e.pageX);
    function onMouseMove(e: MouseEvent) {
      moveAt(e.pageX);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', (e) => {
      document.removeEventListener('mousemove', onMouseMove);
    });
  }

  setPosOnClickSingleTypeX(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    const track = target.closest('.range-slider') as HTMLElement;
    const thumb = track.querySelector('.range-slider__thumb') as HTMLElement;
    const inner = track.querySelector('.range-slider__inner') as HTMLElement;
    const flag = track.querySelector('.range-slider__flag') as HTMLElement;
    if (target === flag) return;
    moveAt(e.pageX);
    function moveAt(pageX: number) {
      const fullWidthThumb = parseInt(getComputedStyle(thumb).width);
      thumb.style.left = `${
        pageX - track.offsetLeft - parseInt(getComputedStyle(thumb).width) / 2
      }px`;
      if (parseInt(getComputedStyle(thumb).left) <= 0) thumb.style.left = `${0}px`;
      if (parseInt(getComputedStyle(thumb).left) > track.offsetWidth - fullWidthThumb) {
        thumb.style.left = `${track.offsetWidth - fullWidthThumb}px`;
      }
      inner.style.width = getComputedStyle(thumb).left;
    }
  }

  setPosOnClickDoubleTypeX(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    const track = target.closest('.range-slider') as HTMLElement;
    const clientX = e.clientX;
    const thumbs = track.querySelectorAll('.range-slider__thumb');
    let firstDifference = thumbs[0].getBoundingClientRect().right - clientX;
    let secondDifference = thumbs[1].getBoundingClientRect().left - clientX;
    let movedThumb: HTMLElement;
    if (target.classList.contains('range-slider__thumb')) return;

    if (firstDifference < 0) firstDifference = -firstDifference;
    if (secondDifference < 0) secondDifference = -secondDifference;
    if (firstDifference > secondDifference) movedThumb = thumbs[1] as HTMLElement;
    else movedThumb = thumbs[0] as HTMLElement;

    moveAt(e.pageX);

    function moveAt(pageX: number) {
      const fullWidthThumb = parseInt(getComputedStyle(movedThumb).width);
      movedThumb.style.left = `${
        pageX - track.offsetLeft - parseInt(getComputedStyle(movedThumb).width) / 2
      }px`;
      if (parseInt(getComputedStyle(movedThumb).left) <= 0) movedThumb.style.left = `${0}px`;
      if (parseInt(getComputedStyle(movedThumb).left) > track.offsetWidth - fullWidthThumb) {
        movedThumb.style.left = `${track.offsetWidth - fullWidthThumb}px`;
      }
    }
  }

  // -------------------------------------------------------------  events for Y type range
  moveSingleTypeY(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    const track = target.closest('.range-slider') as HTMLElement;
    const thumb = target.closest('.range-slider__thumb') as HTMLElement;
    const inner = track.querySelector('.range-slider__inner') as HTMLElement;
    if (!thumb) return;
    thumb.ondragstart = function () {
      return false;
    };

    moveAt(e.pageY);
    function moveAt(pageY: number) {
      const halfThumb = parseInt(getComputedStyle(thumb).height) / 2;
      const fullHeightThumb = parseInt(getComputedStyle(thumb).height);
      thumb.style.top = `${pageY - track.offsetTop - halfThumb}px`;
      if (parseInt(getComputedStyle(thumb).top) <= 0) thumb.style.top = `${0}px`;
      if (parseInt(getComputedStyle(thumb).top) >= track.offsetHeight - fullHeightThumb) {
        thumb.style.top = `${track.offsetHeight - fullHeightThumb}px`;
      }
      inner.style.height = `${parseInt(getComputedStyle(thumb).top) + halfThumb}px`;
    }
    function onMouseMove(e: MouseEvent) {
      moveAt(e.pageY);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', (e) => {
      document.removeEventListener('mousemove', onMouseMove);
    });
  }

  setPosOnClickSingleTypeY(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const track = target.closest('.range-slider') as HTMLElement;
    const thumb = track.querySelector('.range-slider__thumb') as HTMLElement;
    const inner = track.querySelector('.range-slider__inner') as HTMLElement;

    moveAt(e.pageY);

    function moveAt(pageY: number) {
      const fullHeightThumb = parseInt(getComputedStyle(thumb).height);
      thumb.style.top = `${
        pageY - track.offsetTop - parseInt(getComputedStyle(thumb).height) / 2
      }px`;
      if (parseInt(getComputedStyle(thumb).top) < 0) thumb.style.top = `${0}px`;
      if (parseInt(getComputedStyle(thumb).top) > track.offsetHeight - fullHeightThumb) {
        thumb.style.top = `${track.offsetHeight - fullHeightThumb}px`;
      }
      inner.style.height =
        getComputedStyle(thumb).top + parseInt(getComputedStyle(thumb).height) / 2;
    }
  }

  moveDoubleTypeY(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    const track = target.closest('.range-slider') as HTMLElement;
    const inner = track.querySelector('.range-slider__inner') as HTMLElement;
    const targetThumb = target.closest('.range-slider__thumb') as HTMLElement;
    if (!targetThumb) return;

    let targetSecondThumb: HTMLElement;
    const firstThumb = track.querySelector('.range-slider__thumb_first') as HTMLElement;
    const secondThumb = track.querySelector('.range-slider__thumb_second') as HTMLElement;

    if (targetThumb.classList.contains('range-slider__thumb_first')) {
      targetSecondThumb = secondThumb;
    } else {
      targetSecondThumb = firstThumb;
    }
    if (!targetThumb) return;
    targetThumb.style.zIndex = '100';
    targetSecondThumb.style.zIndex = '50';
    targetThumb.ondragstart = function () {
      return false;
    };
    const shiftY = e.clientY - parseInt(getComputedStyle(targetThumb).top);

    moveAt(e.clientY);

    function moveAt(pageX: number): void {
      if (!track) return;
      const halfThumb: number = parseInt(getComputedStyle(targetThumb).width) / 2;

      targetThumb.style.top = `${pageX - track.offsetTop - halfThumb}px`;
      /// min position
      if (parseInt(getComputedStyle(targetThumb).top) <= -halfThumb) {
        targetThumb.style.top = `${-halfThumb}px`;
      } else if (parseInt(getComputedStyle(targetThumb).top) >= track.offsetHeight - halfThumb) {
        targetThumb.style.top = `${track.offsetHeight - halfThumb}px`;
      }

      if (targetThumb === firstThumb && targetThumb.offsetTop >= targetSecondThumb.offsetTop) {
        targetThumb.style.top = `${parseInt(getComputedStyle(targetSecondThumb).top)}px`;
      } else if (
        targetThumb === secondThumb &&
        targetThumb.offsetTop <= targetSecondThumb.offsetTop
      ) {
        targetThumb.style.top = `${parseInt(getComputedStyle(targetSecondThumb).top)}px`;
      }
      inner.style.top = `${firstThumb.offsetTop + firstThumb.offsetHeight / 2}px`;
      inner.style.height = `${
        parseInt(getComputedStyle(secondThumb).top) - parseInt(getComputedStyle(firstThumb).top)
      }px`;
    }
    function onMouseMove(e: MouseEvent) {
      moveAt(e.clientY);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', onMouseMove);
    });
  }

  setPosOnClickDoubleTypeY(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const track = target.closest('.range-slider') as HTMLElement;
    const clientY = e.clientY;
    const thumbs = track.querySelectorAll('.range-slider__thumb');
    let firstDifference = thumbs[0].getBoundingClientRect().bottom - clientY;
    let secondDifference = thumbs[1].getBoundingClientRect().top - clientY;
    let movedThumb: HTMLElement;
    if (firstDifference < 0) firstDifference = -firstDifference;
    if (secondDifference < 0) secondDifference = -secondDifference;
    if (firstDifference > secondDifference) movedThumb = thumbs[1] as HTMLElement;
    else movedThumb = thumbs[0] as HTMLElement;
    moveAt(e.clientY);
    function moveAt(clientY: number) {
      const fullHeightThumb = parseInt(getComputedStyle(movedThumb).height);
      movedThumb.style.top = `${
        clientY - track.offsetTop - parseInt(getComputedStyle(movedThumb).height) / 2
      }px`;
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
