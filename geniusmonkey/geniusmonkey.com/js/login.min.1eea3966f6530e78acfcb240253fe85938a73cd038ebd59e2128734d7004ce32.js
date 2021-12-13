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
    bindLoginForm();
  });
  function bindLoginForm() {
    var a = document.forms.namedItem("login");
    a === null || a === void 0 ? void 0 : a.addEventListener("input", function(a2) {
      return validateForm(a2);
    }), a === null || a === void 0 ? void 0 : a.addEventListener("submit", function(a2) {
      return onSubmit(a2);
    });
  }
  function validateForm(d) {
    var c = document.querySelector("button[type=submit]"), b, a;
    (a = d.target) !== null && a !== void 0 && (b = a.form) !== null && b !== void 0 && b.checkValidity() ? c.classList.remove("btn-invert") : c.classList.add("btn-invert");
  }
  function onSubmit(b) {
    var a, c, d, e, f;
    b.preventDefault(), document.querySelectorAll("error").forEach(function(a2) {
      return a2.classList.remove("show");
    }), a = b.target, c = a.username.value, d = a.password.value, e = env.auth + "/v1/authentication/authenticate", f = fetch(e, {method: "POST", headers: new Headers({"Content-Type": "application/x-www-form-urlencoded"}), body: new URLSearchParams({username: c, password: d})}), f.then(function(a2) {
      return handleAuth(a2);
    }).catch(function(a2) {
      return handleLoginError(a2);
    });
  }
  function handleAuth(a) {
    var b, c, d;
    a.status === 401 ? (b = document.querySelector("#invalid")) === null || b === void 0 ? void 0 : b.classList.add("show") : a.status !== 200 ? (c = document.querySelector("#server")) === null || c === void 0 ? void 0 : c.classList.add("show") : (d = a.headers.get("x-token") || "", a.json().then(function(a2) {
      return startSession(d, a2);
    }));
  }
  function handleLoginError(b) {
    var a;
    (a = document.querySelector("#server")) === null || a === void 0 ? void 0 : a.classList.add("show");
  }
  function startSession(a, b) {
    b.roles.includes("CLIENT") || b.roles.includes("ACCOUNT") ? window.location.href = env.om + "/portal/landing?token=" + a : window.location.href = env.om + "/admin/clients?token=" + a;
  }
})();
