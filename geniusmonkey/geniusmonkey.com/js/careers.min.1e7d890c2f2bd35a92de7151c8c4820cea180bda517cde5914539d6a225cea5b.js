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

  // ns-hugo:/home/runner/work/geniusmonkey.com/geniusmonkey.com/assets/js/simple-slideshow.js
  var SimpleSlideshow = class {
    constructor(el) {
      __publicField(this, "element");
      __publicField(this, "content");
      __publicField(this, "items");
      __publicField(this, "curStep", 0);
      __publicField(this, "intervalTimeMs", 5e3);
      __publicField(this, "nextStep", () => {
        let newStep = this.calculateNextStep();
        this.changeStep(newStep);
      });
      this.element = el;
      this.findItems();
      this.injectElements();
      this.startInterval();
    }
    findItems() {
      this.items = this.element.querySelectorAll("img");
    }
    injectElements() {
      this.content = document.createElement("div");
      this.content.classList.add("gm-simple-slideshow-content");
      this.items.forEach((item) => {
        this.content.appendChild(item);
      });
      this.element.appendChild(this.content);
    }
    clearInterval() {
      window.clearInterval(this.intervaler);
    }
    startInterval() {
      this.clearInterval();
      this.intervaler = window.setInterval(this.nextStep, this.intervalTimeMs);
    }
    calculateNextStep() {
      let newStep = 0;
      if (!this.imagesAreFullScreen())
        newStep = this.curStep + 2;
      if (this.imagesAreFullScreen())
        newStep = this.curStep + 1;
      if (newStep >= this.items.length)
        newStep = 0;
      return newStep;
    }
    imagesAreFullScreen() {
      let randomPadding = 100;
      if (this.items[0].clientWidth < this.element.clientWidth - randomPadding)
        return false;
      if (this.items[0].clientWidth > this.element.clientWidth - randomPadding)
        return true;
    }
    changeStep(newStep) {
      let imageWidth = this.imagesAreFullScreen() ? this.element.clientWidth : this.element.clientWidth / 2;
      let newContentXPos = -(imageWidth * newStep);
      this.content.style.left = newContentXPos + "px";
      this.curStep = newStep;
    }
  };

  // <stdin>
  addBindListener(function() {
    document.querySelectorAll(".gm-simple-slideshow").forEach(function(a) {
      new SimpleSlideshow(a);
    });
  });
})();
