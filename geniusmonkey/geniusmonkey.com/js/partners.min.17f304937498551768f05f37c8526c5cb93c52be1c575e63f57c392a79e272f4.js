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
    bindToggle("inventory"), bindToggle("audience"), bindToggle("measurement"), bindToggle("aggregator"), bindToggle("infrastructure");
  });
  function bindToggle(a) {
    var c = document.getElementById("ctrl-" + a), b = document.getElementById(a);
    if (!b)
      return;
    c.addEventListener("click", function() {
      toggle(b, a);
    });
  }
  function toggle(b, c) {
    document.querySelectorAll(".controls a").forEach(function(a2) {
      return a2.classList.remove("active");
    }), b.classList.add("active"), document.querySelectorAll(".image-grid").forEach(function(a2) {
      return a2.classList.add("hidden");
    });
    var a = document.querySelector(".image-grid.".concat(c));
    if (!a)
      return;
    a.classList.remove("hidden");
  }
})();
