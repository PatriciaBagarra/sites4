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
    bindCategory(), bindArchive();
  });
  function bindCategory() {
    var a = document.getElementById("category");
    if (!a)
      return;
    a.addEventListener("change", function() {
      if (a instanceof HTMLSelectElement) {
        if (a.value === "")
          return;
        location.href = a.value;
      }
    });
  }
  function bindArchive() {
    var a = document.getElementById("archive");
    if (!a)
      return;
    a.addEventListener("change", function() {
      if (a instanceof HTMLSelectElement) {
        if (a.value === "")
          return;
        location.href = a.value;
      }
    });
  }
})();
