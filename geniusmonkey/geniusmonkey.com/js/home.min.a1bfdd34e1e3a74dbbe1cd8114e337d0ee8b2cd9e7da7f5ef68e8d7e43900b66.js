(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // ns-hugo:/home/runner/work/geniusmonkey.com/geniusmonkey.com/assets/js/core/bind.js
  function addBindListener(listener) {
    let bound = false;
    function onBound() {
      if (bound) {
        return;
      }
      bound = true;
      listener();
    }
    if (document.readyState !== "loading") {
      onBound();
    } else {
      document.addEventListener("DOMContentLoaded", () => onBound());
    }
  }

  // ns-hugo:/home/runner/work/geniusmonkey.com/geniusmonkey.com/assets/js/component/carousel.js
  var Carousel = class {
    constructor(el) {
      __publicField(this, "element");
      __publicField(this, "content");
      __publicField(this, "items");
      __publicField(this, "prevButton");
      __publicField(this, "nextButton");
      __publicField(this, "curIndex", 0);
      __publicField(this, "numColumns");
      __publicField(this, "maxItemWidth");
      this.element = el;
      this.findItems();
      this.injectElements();
      this.attachEvents();
      this.resetCarouselPosition();
    }
    findItems() {
      this.items = this.element.querySelectorAll(".item");
    }
    injectElements() {
      this.content = document.createElement("div");
      this.content.classList.add("items");
      this.items.forEach((item) => {
        this.content.appendChild(item);
      });
      this.prevButton = document.createElement("button");
      this.prevButton.setAttribute("aria-label", "previous button");
      this.prevButton.classList.add("prev");
      this.nextButton = document.createElement("button");
      this.nextButton.setAttribute("aria-label", "next button");
      this.nextButton.classList.add("next");
      this.element.appendChild(this.prevButton);
      this.element.appendChild(this.content);
      this.element.appendChild(this.nextButton);
    }
    configureNumColumns() {
      let itemWidth = this.items[0].clientWidth;
      let visibleWidth = this.content.clientWidth;
      this.numColumns = Math.floor(visibleWidth / itemWidth);
      let itemMargin = (visibleWidth - this.numColumns * itemWidth) / this.numColumns / 2;
      this.maxItemWidth = itemWidth + itemMargin * 2;
      this.items.forEach((el) => {
        el.style.marginLeft = `${itemMargin}px`;
        el.style.marginRight = `${itemMargin}px`;
      });
    }
    attachEvents() {
      window.addEventListener("load", () => this.configureNumColumns());
      window.addEventListener("resize", () => this.onWindowResize);
      this.prevButton.addEventListener("click", () => this.onPreviousButtonClick());
      this.nextButton.addEventListener("click", () => this.onNextButtonClick());
    }
    onWindowResize() {
      this.configureNumColumns();
      this.resetCarouselPosition();
    }
    onPreviousButtonClick() {
      let len = this.items.length - this.numColumns;
      this.curIndex = (this.curIndex + len - 1) % len;
      this.moveCarouselPosition();
    }
    onNextButtonClick() {
      let len = this.items.length - this.numColumns;
      this.curIndex = (this.curIndex + len + 1) % len;
      this.moveCarouselPosition();
    }
    resetCarouselPosition() {
      this.curIndex = 0;
      this.moveCarouselPosition();
    }
    moveCarouselPosition() {
      let newLeft = this.curIndex * this.maxItemWidth;
      this.content.style.left = -newLeft + "px";
    }
  };

  // ns-hugo:/home/runner/work/geniusmonkey.com/geniusmonkey.com/assets/js/component/3d-spinner.js
  var Spinner = class {
    constructor(element) {
      __publicField(this, "element");
      __publicField(this, "items");
      __publicField(this, "intervaler");
      __publicField(this, "intervalTimeMs", 3500);
      __publicField(this, "positions", [
        "first-position",
        "second-position",
        "third-position",
        "fourth-position",
        "fifth-position"
      ]);
      this.element = element;
      this.findItems();
      this.startInterval();
    }
    findItems() {
      this.items = this.element.querySelectorAll("img");
    }
    startInterval() {
      window.clearInterval(this.intervaler);
      this.intervaler = window.setInterval(() => this.changeAllItemsToNextPosition(), this.intervalTimeMs);
    }
    changeAllItemsToNextPosition() {
      this.items.forEach((el) => this.changeSingleItemToNextPosition(el));
    }
    changeSingleItemToNextPosition(item) {
      let curPosition = this.getItemCurrentPosition(item);
      let newPosition = this.getNextPosition(curPosition);
      item.classList.remove(curPosition);
      item.classList.add(newPosition);
    }
    changeAllItemsToPrevPosition() {
      this.items.forEach((el) => this.changeSingleItemToPrevPosition(el));
    }
    changeSingleItemToPrevPosition(item) {
      let curPosition = this.getItemCurrentPosition(item);
      let newPosition = this.getPrevPosition(curPosition);
      item.classList.remove(curPosition);
      item.classList.add(newPosition);
    }
    getItemCurrentPosition(item) {
      let classes = item.classList;
      let curPosition;
      for (let i = 0; i < classes.length; i++) {
        const theClass = classes[i];
        if (theClass.indexOf("position")) {
          curPosition = theClass;
          break;
        }
      }
      return curPosition;
    }
    getNextPosition(curPosition) {
      let curIdx = this.positions.indexOf(curPosition);
      let nextIdx = (curIdx + 1) % this.positions.length;
      return this.positions[nextIdx];
    }
    getPrevPosition(curPosition) {
      let curIdx = this.positions.indexOf(curPosition);
      let nextIdx = (curIdx - 1) % this.positions.length;
      return this.positions[nextIdx];
    }
  };

  // <stdin>
  addBindListener(function() {
    document.querySelectorAll(".gm-carousel").forEach(function(a) {
      new Carousel(a);
    }), document.querySelectorAll("header .spinner").forEach(function(a) {
      new Spinner(a);
    });
  });
})();
