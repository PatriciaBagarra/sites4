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
  addBindListener(function() {
    bindToggle("business"), bindToggle("enterprise"), bindToggle("agencies");
  });
  function bindToggle(b) {
    var a = document.getElementById(b);
    if (!a)
      return;
    a.addEventListener("click", function() {
      toggle(a, b);
    });
  }
  function toggle(b, c) {
    document.querySelectorAll(".sub-menu a").forEach(function(a2) {
      return a2.classList.remove("active");
    }), b.classList.add("active"), document.querySelectorAll(".middle-content").forEach(function(a2) {
      return a2.classList.add("hidden");
    });
    var a = document.querySelector(".middle-content.".concat(c));
    if (!a)
      return;
    a.classList.remove("hidden");
  }
})();
