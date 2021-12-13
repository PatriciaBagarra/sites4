(() => {
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

  // <stdin>
  function gmTimeline() {
    var a = this;
    this.element, this.content, this.frame, this.items, this.prevButton, this.nextButton, this.curStep = -1, this.intervaler, this.intervalTimeMs = 5e3, this.pauser, this.pauseTimeMs = 6e4, this.init = function(b) {
      a.element = b, a.findItems(), a.injectElements(), a.attachEvents(), a.startInterval();
    }, this.findContent = function() {
      a.content = a.element.querySelectorAll(".gm-timeline-content")[0];
    }, this.findItems = function() {
      a.items = a.element.querySelectorAll("img");
    }, this.injectElements = function() {
      a.frame = document.createElement("div"), a.frame.classList.add("gm-timeline-frame"), a.content = document.createElement("div"), a.content.classList.add("gm-timeline-content"), a.items.forEach(function(b) {
        a.content.appendChild(b);
      }), a.prevButton = document.createElement("button"), a.prevButton.classList.add("gm-timeline-prev"), a.nextButton = document.createElement("button"), a.nextButton.classList.add("gm-timeline-next"), a.frame.appendChild(a.content), a.element.appendChild(a.frame), a.element.appendChild(a.prevButton), a.element.appendChild(a.nextButton);
    }, this.attachEvents = function() {
      a.element.addEventListener("click", a.onElementClick), a.prevButton.addEventListener("click", a.onPreviousButtonClick), a.nextButton.addEventListener("click", a.onNextButtonClick);
    }, this.onElementClick = function() {
      a.pauseTimeline();
    }, this.pauseTimeline = function() {
      a.clearInterval(), a.clearTimeout(), a.pauser = window.setTimeout(a.startInterval, a.pauseTimeMs);
    }, this.resetTimelinePause = function() {
      a.pauseTimeline();
    }, this.onPreviousButtonClick = function() {
      a.resetTimelinePause(), a.prevStep();
    }, this.onNextButtonClick = function() {
      a.resetTimelinePause(), a.nextStep();
    }, this.clearInterval = function() {
      window.clearInterval(a.intervaler);
    }, this.clearTimeout = function() {
      window.clearTimeout(a.pauser);
    }, this.startInterval = function() {
      a.clearInterval(), a.nextStep(), a.intervaler = window.setInterval(a.nextStep, a.intervalTimeMs);
    }, this.prevStep = function() {
      var b = a.curStep - 1;
      a.changeStep(b);
    }, this.nextStep = function() {
      var b = a.curStep + 1;
      a.changeStep(b);
    }, this.changeStep = function(b) {
      b > a.items.length - 1 && (b = 0), b < 0 && (b = 0);
      var c = -a.items[b].offsetLeft + a.element.clientWidth / 2;
      a.content.style.left = c + "px", a.curStep >= 0 && a.hideItem(a.items[a.curStep]), a.showItem(a.items[b]), a.curStep = b;
    }, this.hideItem = function(a2) {
      a2.style.width = null, a2.style.top = null, a2.style.opacity = null;
    }, this.showItem = function(b) {
      b.style.width = a.frame.clientWidth * 0.9 + "px", b.style.top = a.frame.clientHeight / 2 + "px", b.style.opacity = 1;
    };
  }
  addBindListener(function() {
    document.querySelectorAll(".gm-timeline").forEach(function(a) {
      var b = new gmTimeline();
      b.init(a);
    });
  });
})();
