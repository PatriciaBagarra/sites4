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
    document.querySelectorAll(".question").forEach(function(a) {
      return a.addEventListener("click", toggleQuestion);
    });
  });
  function toggleQuestion(b) {
    var c = b.target, a = c.parentElement;
    a.classList.contains("open") ? a.classList.remove("open") : (document.querySelectorAll("div.open").forEach(function(a2) {
      return a2.classList.remove("open");
    }), a.classList.add("open"));
  }
})();
