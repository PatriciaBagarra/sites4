(() => {
  // ns-hugo:/home/runner/work/geniusmonkey.com/geniusmonkey.com/assets/js/component/menu.js
  var visible = false;
  function bindMenu() {
    var _a, _b;
    (_a = document.querySelector(".hamburger")) == null ? void 0 : _a.addEventListener("click", onNavToggle);
    document.querySelectorAll("header .mobile .close").forEach((e) => e.addEventListener("click", onNavToggle));
    (_b = document.querySelectorAll("header [data-menu]")) == null ? void 0 : _b.forEach((e) => {
      e.addEventListener("click", onMobileNav);
    });
  }
  function onMobileNav(e) {
    var _a;
    let el = e.target;
    let selected = el.dataset.menu;
    if (!selected) {
      console.error("unknown menu", el);
      return;
    }
    document.querySelectorAll("header .mobile .current").forEach((e2) => e2.classList.remove("current"));
    (_a = document.getElementById(selected)) == null ? void 0 : _a.classList.add("current");
  }
  function onNavToggle() {
    visible = !visible;
    let el = document.querySelector("header .mobile");
    if (!el)
      return;
    if (visible) {
      el.classList.add("show");
    } else {
      el.classList.remove("show");
    }
  }

  // ns-hugo:/home/runner/work/geniusmonkey.com/geniusmonkey.com/assets/js/component/video.js
  var playerSelector = "[data-youtube-id]";
  var player = null;
  var youtubeBound = false;
  var targetVideo = false;
  function bindVideo() {
    document.querySelectorAll(playerSelector).forEach((el) => {
      el.addEventListener("click", () => onPlayVideo(el));
    });
    document.querySelector("#overlay .icon.close").addEventListener("click", () => {
      onCloseModal();
    });
  }
  function onPlayVideo(el) {
    targetVideo = el.dataset.youtubeId;
    bindYoutube(() => {
      showModal();
      loadPlayer(el.querySelector(".video"), targetVideo);
    });
  }
  function onCloseModal() {
    if (player) {
      player.stopVideo();
    }
    document.getElementById("overlay").classList.add("hidden");
  }
  function showModal() {
    document.getElementById("overlay").classList.remove("hidden");
  }
  function bindYoutube(callback) {
    var _a;
    if (!youtubeBound) {
      window.onYouTubePlayerAPIReady = () => {
        callback();
      };
      let tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      let firstScriptTag = document.getElementsByTagName("script")[0];
      (_a = firstScriptTag.parentNode) == null ? void 0 : _a.insertBefore(tag, firstScriptTag);
      window.gm = window.gm || {};
      youtubeBound = true;
    } else {
      callback();
    }
  }
  function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
      updateCurrent(event.target);
    } else if (event.data === YT.PlayerState.ENDING) {
      updateCurrent(null);
    }
  }
  function updateCurrent(player2) {
    if (player2 === player2) {
      return;
    }
    if (player2 != null) {
      player2.stopVideo();
    }
  }
  function loadPlayer(el, videoId, playlist) {
    if (!player) {
      let config = {
        videoId,
        playerVars: {
          fs: 1,
          autoplay: 1,
          listType: "player",
          rel: 0,
          playlist: playlist || ""
        },
        events: {
          onReady: () => loadVideo(videoId),
          onStateChange: onPlayerStateChange
        }
      };
      player = new YT.Player("ytplayer", config);
    } else {
      loadVideo(videoId);
    }
  }
  function loadVideo(videoId) {
    if (!player) {
      return;
    }
    player.loadVideoById(videoId);
  }

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

  // ns-hugo:/home/runner/work/geniusmonkey.com/geniusmonkey.com/assets/js/core/forms.js
  function disableForm(form) {
    toggleForm(form, true);
  }
  function toggleForm(form, disabled) {
    form.querySelectorAll("input, button, textarea").forEach((n) => {
      if (n instanceof HTMLButtonElement) {
        n.disabled = disabled;
        n.innerText = "Submitted";
      } else {
        n.disabled = disabled;
      }
    });
  }

  // ns-hugo:/home/runner/work/geniusmonkey.com/geniusmonkey.com/assets/js/core/gclid.js
  var KEY = "gclid";
  function recordGclId(params2) {
    let gclIdParam = params2.get("gclid");
    let gclSrcParam = params2.get("gclsrc");
    if (!gclIdParam) {
      return;
    }
    let valid = !gclSrcParam || gclSrcParam.indexOf("aw") !== -1;
    if (gclIdParam && valid) {
      const Dur90Days = 120 * 24 * 60 * 60 * 1e3;
      let record = {
        value: gclIdParam,
        expireAt: new Date().getTime() + Dur90Days
      };
      localStorage.setItem(KEY, JSON.stringify(record));
    }
  }
  function lookupGlcId() {
    let item = localStorage.getItem(KEY);
    if (!item) {
      return null;
    }
    let record = JSON.parse(item);
    if (new Date().getTime() < record.expireAt) {
      return record.value;
    } else {
      return null;
    }
  }

  // ns-hugo:/home/runner/work/geniusmonkey.com/geniusmonkey.com/assets/js/core/gmcrefid.js
  var KEY2 = "gmcrefid";
  function recordGmcrefid(item) {
    if (!item) {
      return;
    }
    localStorage.setItem(KEY2, JSON.stringify(item));
  }
  function lookupGmcrefid() {
    let item = localStorage.getItem(KEY2);
    if (!item) {
      return null;
    }
    return item;
  }

  // ns-hugo:/home/runner/work/geniusmonkey.com/geniusmonkey.com/assets/js/component/contact.js
  var pixel = null;
  var origin = null;
  var params = null;
  function bindContactForms() {
    let els = document.querySelectorAll("form[name=contact]");
    els.forEach((el) => el.addEventListener("submit", onSubmit));
    if (els.length !== 0) {
      params = new URLSearchParams(window.location.search);
      bindPixel();
    }
  }
  function bindPixel() {
    pixel = params.get("gmpix");
    origin = params.get("gmref");
    origin = origin || window.location.href.replace(window.location.origin, "");
    if (!pixel) {
      let meta = document.querySelector("meta[name=pm-pixel]");
      if (meta) {
        pixel = meta.content;
      }
    }
  }
  function onSubmit(e) {
    e.preventDefault();
    let form = e.target;
    disableForm(form);
    submitContactForm(form);
  }
  function submitContactForm(form) {
    let url = env.api + "/lead";
    let loc = window.location;
    let contact = "";
    if (form["contact"]) {
      contact = form["contact"].value;
    } else {
      contact = `${form["firstName"].value} ${form["lastName"].value}`;
    }
    let resp = fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        formUrl: origin,
        contactName: contact,
        companyName: form["company"].value,
        companyDescription: form["solution"].value,
        email: form["email"].value,
        phone: form["phone"].value,
        help: form["help"].value,
        gclid: lookupGlcId(),
        honeypot: form["honeypot"].value,
        utmCampaign: localStorage.getItem("utm_campaign"),
        utmSource: localStorage.getItem("utm_source"),
        utmMedium: localStorage.getItem("utm_medium"),
        gmcrefid: lookupGmcrefid()
      })
    });
    resp.then(function(r) {
      fireConversion();
    }).catch(function(e) {
      console.error(e);
    });
  }
  function fireConversion() {
    if (!pixel) {
      redirect();
      return;
    }
    let pixelId = pixel;
    let pixelLoc = `https://pm.geniusmonkey.com/gm.png?id=${pixelId}`;
    ga("send", "event", "form", "contact", pixelId);
    let img = new Image();
    img.onload = function() {
      redirect();
    };
    img.src = pixelLoc;
  }
  function redirect() {
    location.href = "/thank-you/";
  }

  // ns-hugo:/home/runner/work/geniusmonkey.com/geniusmonkey.com/assets/js/component/click.js
  function bindClickNav() {
    document.querySelectorAll("[data-href]").forEach((el) => el.addEventListener("click", onClick));
  }
  function onClick(e) {
    let el = e.target;
    location.href = el.dataset.href;
  }

  // ns-hugo:/home/runner/work/geniusmonkey.com/geniusmonkey.com/assets/js/component/newsletter.js
  function bindSubmit(el) {
    let form = el.querySelector("form");
    if (!form)
      return;
    form.addEventListener("submit", (e) => handleSubmit(e));
  }
  function bindNewsletter() {
    document.querySelectorAll(".newsletter").forEach((el) => {
      bindSubmit(el);
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    let form = e.target;
    if (!form)
      return;
    fetch(`${env.api}/newsletter`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        email: form["email"].value,
        honeypot: form["honey"].value
      })
    }).then((r) => handleSuccess()).catch((e2) => handleSuccess());
  }
  function handleSuccess() {
    let form = document.querySelector(".newsletter .form");
    if (form == null)
      return;
    form.classList.add("hidden");
    let resp = document.querySelector(".newsletter .success");
    if (resp == null)
      return;
    let img = new Image(1, 1);
    img.src = "//googleads.g.doubleclick.net/pagead/viewthroughconversion/998670247/?value=0&amp;guid=ON&amp;script=0";
    img.alt = "Google";
    img.style.borderStyle = "none";
    resp.append(img);
    resp.classList.remove("hidden");
  }

  // ns-hugo:/home/runner/work/geniusmonkey.com/geniusmonkey.com/assets/js/uuid.js
  function generateUUID() {
    let dt = new Date().getTime();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      let r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === "x" ? r : r & 3 | 8).toString(16);
    });
  }

  // <stdin>
  addBindListener(bind);
  function bindSelectNav() {
    document.querySelectorAll("select.nav").forEach(function(a) {
      return a.addEventListener("change", navigate);
    });
  }
  function navigate(b) {
    var a = b.target;
    if (a instanceof HTMLSelectElement) {
      if (a.value === "")
        return;
      location.href = a.value;
    }
  }
  function bind() {
    bindMenu(), bindVideo(), bindSelectNav(), bindContactForms(), bindClickNav(), bindNewsletter(), consumeParams(), generateGmcredfid(), bindCopy(), bindSearchBtn();
  }
  function generateGmcredfid() {
    var a = lookupGmcrefid();
    a || (a = generateUUID(), localStorage.setItem("gmcrefid", a));
  }
  function consumeParams() {
    var b = "gmcrefid", a = new URLSearchParams(window.location.search), c = a.get("utm_campaign"), d = a.get("utm_source"), e = a.get("utm_medium");
    a.has("gclid") && recordGclId(a), a.has(b) && recordGmcrefid(a.get(b)), c != null && localStorage.setItem("utm_campaign", JSON.stringify(c)), e != null && localStorage.setItem("utm_source", JSON.stringify(d)), d != null && localStorage.setItem("utm_medium", JSON.stringify(e));
  }
  function bindCopy() {
    var a = document.getElementById("copy");
    a && a.addEventListener("click", copyLink);
  }
  function copyLink() {
    var a = document.createElement("input"), b = window.location.href;
    document.body.appendChild(a), a.value = b, a.select(), document.execCommand("copy");
  }
  function bindSearchBtn() {
    var a = document.querySelector(".search-icon-white"), b = document.querySelector(".search-form");
    a.addEventListener("click", function(c) {
      a.classList.toggle("hidden"), b.classList.toggle("hidden");
    }), document.addEventListener("click", function(a2) {
      a2.stopPropagation();
    });
  }
})();
