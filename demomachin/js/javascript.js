const checkVisible = (elm) => {
  var rect = elm.getBoundingClientRect();
  var viewHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight,
  );
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
};

const galleryFix = () => {
  if ($(window).width() > 993) {
    $(".section-block-gallery2").each(function (i, obj) {
      let number = $(this).attr("data-number");
      let container = $(".container").css("max-width");
      container = container.slice(0, -2);
      console.log(container);
      if ($(window).width() > 576) {
        container = container - 30;
      }
      $(this)
        .find(".row > div")
        .css("max-width", container / number + "px");
    });
  }
};
const numbersAnimation = (el) => {
  const counters = document.querySelectorAll(el);
  let speed = 500;

  counters.forEach((counter) => {
    const animate = () => {
      let rawValue = counter.getAttribute("data-value");
      let value = parseInt(rawValue, 10);
      let suffix = rawValue.replace(value, "");

      if (value < 100) {
        speed = 500;
      } else if (value < 200) {
        speed = 75;
      } else {
        speed = 50;
      }

      const data = +counter.innerText.replace(suffix, "");

      const time = value / speed;
      if (data < value) {
        counter.innerText = Math.ceil(data + time) + suffix;
        setTimeout(animate, 20);
      } else {
        counter.innerText = value + suffix;
      }
    };

    animate();
  });
};
const ImagesResize = () => {
  $(".section-block-textimage-image").each(function (index) {
    const img = new Image();
    const el = $(this);
    img.src = el.attr("src");
    img.onload = function () {
      if (img.height > img.width || img.height < 200) {
        el.addClass("horizontal");
      }
    };
  });
};
const services2carouselResize = () => {
  if ($(".services2-boxes-carousel").length > 0) {
    if ($(window).width() > 1475) {
      const w = $(window).width();
      let l = $(".footer .container").offset().left;
      const r = w - l;
      $(".services2-boxes").css("max-width", r * 0.8 + "px");
    } else {
      const w = $(".footer .container").width();
      $(".services2-boxes").css("max-width", w + "px");
    }
  }
};

$(document).ready(function () {
  Fancybox.bind("[data-fancybox]", {});

  ImagesResize();

  $(".header-language-header").click(function (e) {
    e.preventDefault();
    let dropdownBox = $(this).parent();
    if (dropdownBox.hasClass("active")) {
      dropdownBox.removeClass("active");
    } else {
      dropdownBox.addClass("active");
    }
  });

  $(".popup-activator").click(function (e) {
    $(this)
      .closest(".popup-custom")
      .children(".popup-content")
      .css("display", "block");
  });

  $(".banner:not(.banner-large) .banner-text .button-white").click(
    function (e) {
      let link = $(".banner-images .owl-item.active .banner-images-link");
      if (link.attr("href") != null) {
        e.preventDefault();
        window.location.href = link.attr("href");
      }
    },
  );
  $("body").on(
    "click",
    ".catalog-dropdowns-filter a, .catalog-left-close",
    function (e) {
      e.preventDefault();
      $(".catalog-left").toggleClass("active");
    },
  );

  $("body").on("click", ".addtocart-controls a", function (e) {
    e.preventDefault();
    const el = $(this)
      .closest(".addtocart-quantity")
      .children("input[name='quantity']");
    let operation = $(this).attr("href");
    let val = parseInt(el.val());
    if (operation == "#more") {
      el.val(val + 1);
    } else {
      if (val > 1) {
        el.val(val - 1);
      }
    }
  });

  $(".popup-content--close").click(function (e) {
    e.preventDefault();

    $(this).closest(".popup-content").css("display", "none");
  });

  // $('.banner-homepage').owlCarousel({
  //     items:1,
  //     loop:true,
  //     rewind:true,
  //     navText:["<img src='www/web/img/arrow-banner.png' alt='slider arrow' class='banner-prev'>","<img src='www/web/img/arrow-banner.png' alt='slider arrow' class='banner-next'>"],
  //     margin:1,
  //     nav:true,
  //     dots:true
  // });

  $(".section-block-textimage").owlCarousel({
    items: 1,
    loop: false,
    rewind: true,
    navText: [
      '<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12" width="16" height="12"><path id="-e-icon-arrow" class="s0" d="m15 5.5l-4.6-4.7c-0.4-0.4-1-0.4-1.4 0-0.4 0.4-0.4 1 0 1.4l2.9 3h-10.6c-0.6 0-1 0.4-1 1 0 0.5 0.4 1 1 1h10.6l-2.9 3c-0.4 0.4-0.4 1 0 1.4q0.3 0.3 0.7 0.3 0.4 0 0.7-0.3l4.6-4.7c0.2-0.2 0.2-0.5 0.2-0.7q0-0.4-0.2-0.7z"></path></svg>',
      '<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12" width="16" height="12"><path id="-e-icon-arrow" class="s0" d="m15 5.5l-4.6-4.7c-0.4-0.4-1-0.4-1.4 0-0.4 0.4-0.4 1 0 1.4l2.9 3h-10.6c-0.6 0-1 0.4-1 1 0 0.5 0.4 1 1 1h10.6l-2.9 3c-0.4 0.4-0.4 1 0 1.4q0.3 0.3 0.7 0.3 0.4 0 0.7-0.3l4.6-4.7c0.2-0.2 0.2-0.5 0.2-0.7q0-0.4-0.2-0.7z"></path></svg>',
    ],
    margin: 1,
    nav: false,
    dots: true,
  });

  $(".section-block-team-carousel").owlCarousel({
    items: 1,
    loop: false,
    rewind: true,
    navText: [
      '<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12" width="16" height="12"><path id="-e-icon-arrow" class="s0" d="m15 5.5l-4.6-4.7c-0.4-0.4-1-0.4-1.4 0-0.4 0.4-0.4 1 0 1.4l2.9 3h-10.6c-0.6 0-1 0.4-1 1 0 0.5 0.4 1 1 1h10.6l-2.9 3c-0.4 0.4-0.4 1 0 1.4q0.3 0.3 0.7 0.3 0.4 0 0.7-0.3l4.6-4.7c0.2-0.2 0.2-0.5 0.2-0.7q0-0.4-0.2-0.7z"></path></svg>',
      '<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12" width="16" height="12"><path id="-e-icon-arrow" class="s0" d="m15 5.5l-4.6-4.7c-0.4-0.4-1-0.4-1.4 0-0.4 0.4-0.4 1 0 1.4l2.9 3h-10.6c-0.6 0-1 0.4-1 1 0 0.5 0.4 1 1 1h10.6l-2.9 3c-0.4 0.4-0.4 1 0 1.4q0.3 0.3 0.7 0.3 0.4 0 0.7-0.3l4.6-4.7c0.2-0.2 0.2-0.5 0.2-0.7q0-0.4-0.2-0.7z"></path></svg>',
    ],
    margin: 24,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      993: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  });
  $(".owl-product").owlCarousel({
    items: 1,
    loop: false,
    rewind: true,
    navText: [
      '<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12" width="16" height="12"><path id="-e-icon-arrow" class="s0" d="m15 5.5l-4.6-4.7c-0.4-0.4-1-0.4-1.4 0-0.4 0.4-0.4 1 0 1.4l2.9 3h-10.6c-0.6 0-1 0.4-1 1 0 0.5 0.4 1 1 1h10.6l-2.9 3c-0.4 0.4-0.4 1 0 1.4q0.3 0.3 0.7 0.3 0.4 0 0.7-0.3l4.6-4.7c0.2-0.2 0.2-0.5 0.2-0.7q0-0.4-0.2-0.7z"></path></svg>',
      '<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12" width="16" height="12"><path id="-e-icon-arrow" class="s0" d="m15 5.5l-4.6-4.7c-0.4-0.4-1-0.4-1.4 0-0.4 0.4-0.4 1 0 1.4l2.9 3h-10.6c-0.6 0-1 0.4-1 1 0 0.5 0.4 1 1 1h10.6l-2.9 3c-0.4 0.4-0.4 1 0 1.4q0.3 0.3 0.7 0.3 0.4 0 0.7-0.3l4.6-4.7c0.2-0.2 0.2-0.5 0.2-0.7q0-0.4-0.2-0.7z"></path></svg>',
    ],
    margin: 24,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 2,
      },
      768: {
        items: 3,
      },
      993: {
        items: 2,
      },
      1200: {
        items: 3,
      },
    },
  });
  $(".services2-boxes-carousel").owlCarousel({
    items: 1,
    loop: false,
    rewind: true,
    navText: [
      '<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12" width="16" height="12"><path id="-e-icon-arrow" class="s0" d="m15 5.5l-4.6-4.7c-0.4-0.4-1-0.4-1.4 0-0.4 0.4-0.4 1 0 1.4l2.9 3h-10.6c-0.6 0-1 0.4-1 1 0 0.5 0.4 1 1 1h10.6l-2.9 3c-0.4 0.4-0.4 1 0 1.4q0.3 0.3 0.7 0.3 0.4 0 0.7-0.3l4.6-4.7c0.2-0.2 0.2-0.5 0.2-0.7q0-0.4-0.2-0.7z"></path></svg>',
      '<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12" width="16" height="12"><path id="-e-icon-arrow" class="s0" d="m15 5.5l-4.6-4.7c-0.4-0.4-1-0.4-1.4 0-0.4 0.4-0.4 1 0 1.4l2.9 3h-10.6c-0.6 0-1 0.4-1 1 0 0.5 0.4 1 1 1h10.6l-2.9 3c-0.4 0.4-0.4 1 0 1.4q0.3 0.3 0.7 0.3 0.4 0 0.7-0.3l4.6-4.7c0.2-0.2 0.2-0.5 0.2-0.7q0-0.4-0.2-0.7z"></path></svg>',
    ],
    margin: 24,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1200: {
        items: 3,
      },
    },
  });
  $(".owl-catalog").owlCarousel({
    items: 1,
    loop: false,
    rewind: true,
    navText: [
      '<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12" width="16" height="12"><path id="-e-icon-arrow" class="s0" d="m15 5.5l-4.6-4.7c-0.4-0.4-1-0.4-1.4 0-0.4 0.4-0.4 1 0 1.4l2.9 3h-10.6c-0.6 0-1 0.4-1 1 0 0.5 0.4 1 1 1h10.6l-2.9 3c-0.4 0.4-0.4 1 0 1.4q0.3 0.3 0.7 0.3 0.4 0 0.7-0.3l4.6-4.7c0.2-0.2 0.2-0.5 0.2-0.7q0-0.4-0.2-0.7z"></path></svg>',
      '<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12" width="16" height="12"><path id="-e-icon-arrow" class="s0" d="m15 5.5l-4.6-4.7c-0.4-0.4-1-0.4-1.4 0-0.4 0.4-0.4 1 0 1.4l2.9 3h-10.6c-0.6 0-1 0.4-1 1 0 0.5 0.4 1 1 1h10.6l-2.9 3c-0.4 0.4-0.4 1 0 1.4q0.3 0.3 0.7 0.3 0.4 0 0.7-0.3l4.6-4.7c0.2-0.2 0.2-0.5 0.2-0.7q0-0.4-0.2-0.7z"></path></svg>',
    ],
    margin: 24,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1200: {
        items: 3,
      },
      1600: {
        items: 4,
      },
    },
  });
  $(".section-block-services-carousel").owlCarousel({
    items: 1,
    loop: false,
    rewind: true,
    navText: [
      '<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12" width="16" height="12"><path id="-e-icon-arrow" class="s0" d="m15 5.5l-4.6-4.7c-0.4-0.4-1-0.4-1.4 0-0.4 0.4-0.4 1 0 1.4l2.9 3h-10.6c-0.6 0-1 0.4-1 1 0 0.5 0.4 1 1 1h10.6l-2.9 3c-0.4 0.4-0.4 1 0 1.4q0.3 0.3 0.7 0.3 0.4 0 0.7-0.3l4.6-4.7c0.2-0.2 0.2-0.5 0.2-0.7q0-0.4-0.2-0.7z"></path></svg>',
      '<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12" width="16" height="12"><path id="-e-icon-arrow" class="s0" d="m15 5.5l-4.6-4.7c-0.4-0.4-1-0.4-1.4 0-0.4 0.4-0.4 1 0 1.4l2.9 3h-10.6c-0.6 0-1 0.4-1 1 0 0.5 0.4 1 1 1h10.6l-2.9 3c-0.4 0.4-0.4 1 0 1.4q0.3 0.3 0.7 0.3 0.4 0 0.7-0.3l4.6-4.7c0.2-0.2 0.2-0.5 0.2-0.7q0-0.4-0.2-0.7z"></path></svg>',
    ],
    margin: 24,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      993: {
        items: 2,
      },
      1200: {
        items: 3,
      },
    },
  });

  $(".section-block-gallery").each(function () {
    let count;
    $(this).hasClass("count-3")
      ? (count = 3)
      : $(this).hasClass("count-5")
        ? (count = 5)
        : (count = 4);
    $(this).owlCarousel({
      items: 1,
      loop: false,
      rewind: true,
      navText: [
        '<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12" width="16" height="12"><path id="-e-icon-arrow" class="s0" d="m15 5.5l-4.6-4.7c-0.4-0.4-1-0.4-1.4 0-0.4 0.4-0.4 1 0 1.4l2.9 3h-10.6c-0.6 0-1 0.4-1 1 0 0.5 0.4 1 1 1h10.6l-2.9 3c-0.4 0.4-0.4 1 0 1.4q0.3 0.3 0.7 0.3 0.4 0 0.7-0.3l4.6-4.7c0.2-0.2 0.2-0.5 0.2-0.7q0-0.4-0.2-0.7z"></path></svg>',
        '<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12" width="16" height="12"><path id="-e-icon-arrow" class="s0" d="m15 5.5l-4.6-4.7c-0.4-0.4-1-0.4-1.4 0-0.4 0.4-0.4 1 0 1.4l2.9 3h-10.6c-0.6 0-1 0.4-1 1 0 0.5 0.4 1 1 1h10.6l-2.9 3c-0.4 0.4-0.4 1 0 1.4q0.3 0.3 0.7 0.3 0.4 0 0.7-0.3l4.6-4.7c0.2-0.2 0.2-0.5 0.2-0.7q0-0.4-0.2-0.7z"></path></svg>',
      ],
      margin: 24,
      nav: true,
      dots: false,
      responsive: {
        0: {
          items: 1,
        },
        576: {
          items: 2,
        },
        993: {
          items: count == 5 ? 3 : count - 1,
        },
        1200: {
          items: count == 3 ? 3 : count - 1,
        },
        1400: {
          items: count,
        },
      },
    });
  });

  $(".linkedin-carousel").owlCarousel({
    items: 1,
    loop: false,
    rewind: true,
    navText: [
      '<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12" width="16" height="12"><path id="-e-icon-arrow" class="s0" d="m15 5.5l-4.6-4.7c-0.4-0.4-1-0.4-1.4 0-0.4 0.4-0.4 1 0 1.4l2.9 3h-10.6c-0.6 0-1 0.4-1 1 0 0.5 0.4 1 1 1h10.6l-2.9 3c-0.4 0.4-0.4 1 0 1.4q0.3 0.3 0.7 0.3 0.4 0 0.7-0.3l4.6-4.7c0.2-0.2 0.2-0.5 0.2-0.7q0-0.4-0.2-0.7z"></path></svg>',
      '<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12" width="16" height="12"><path id="-e-icon-arrow" class="s0" d="m15 5.5l-4.6-4.7c-0.4-0.4-1-0.4-1.4 0-0.4 0.4-0.4 1 0 1.4l2.9 3h-10.6c-0.6 0-1 0.4-1 1 0 0.5 0.4 1 1 1h10.6l-2.9 3c-0.4 0.4-0.4 1 0 1.4q0.3 0.3 0.7 0.3 0.4 0 0.7-0.3l4.6-4.7c0.2-0.2 0.2-0.5 0.2-0.7q0-0.4-0.2-0.7z"></path></svg>',
    ],
    margin: 24,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      993: {
        items: 3,
      },
      1200: {
        items: 3,
      },
    },
  });
  $(".instagram-carousel").owlCarousel({
    items: 1,
    loop: false,
    rewind: true,
    navText: [
      '<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12" width="16" height="12"><path id="-e-icon-arrow" class="s0" d="m15 5.5l-4.6-4.7c-0.4-0.4-1-0.4-1.4 0-0.4 0.4-0.4 1 0 1.4l2.9 3h-10.6c-0.6 0-1 0.4-1 1 0 0.5 0.4 1 1 1h10.6l-2.9 3c-0.4 0.4-0.4 1 0 1.4q0.3 0.3 0.7 0.3 0.4 0 0.7-0.3l4.6-4.7c0.2-0.2 0.2-0.5 0.2-0.7q0-0.4-0.2-0.7z"></path></svg>',
      '<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12" width="16" height="12"><path id="-e-icon-arrow" class="s0" d="m15 5.5l-4.6-4.7c-0.4-0.4-1-0.4-1.4 0-0.4 0.4-0.4 1 0 1.4l2.9 3h-10.6c-0.6 0-1 0.4-1 1 0 0.5 0.4 1 1 1h10.6l-2.9 3c-0.4 0.4-0.4 1 0 1.4q0.3 0.3 0.7 0.3 0.4 0 0.7-0.3l4.6-4.7c0.2-0.2 0.2-0.5 0.2-0.7q0-0.4-0.2-0.7z"></path></svg>',
    ],
    margin: 0,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
        stagePadding: 25,
      },
      576: {
        items: 2,
        stagePadding: 0,
      },
      993: {
        items: 3,
        stagePadding: 0,
      },
      1200: {
        items: 4,
        stagePadding: 0,
      },
      1475: {
        items: 5,
        stagePadding: 0,
      },
    },
  });

  $(".section-block-dropdowns-header").click(function (e) {
    e.preventDefault();
    let body = $(this).parent();
    if (body.hasClass("active")) {
      body.removeClass("active");
    } else {
      body.addClass("active");
    }
  });

  if (localStorage.getItem("header-message") != null) {
    $(".header-message").addClass("d-none");
  }

  $(".header-message-close").click(function (e) {
    e.preventDefault();
    $(".header-message").addClass("d-none");

    localStorage.setItem("header-message", false);

    var now = new Date().getTime();
    var setupTime = localStorage.getItem("header-message-time");

    if (setupTime == null) {
      localStorage.setItem("header-message-time", now);
    } else {
      if (now - setupTime > 72 * 60 * 60 * 1000) {
        localStorage.clear();
        localStorage.setItem("header-message-time", now);
      }
    }
  });

  galleryFix();

  if ($(window).width() < 768) {
    $(".nav-item.dropdown-hover > a").click(function (e) {
      e.preventDefault();
    });
  }

  $(".reviews2-slider").owlCarousel({
    items: 3,
    loop: false,
    rewind: true,
    navText: [
      '<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12" width="16" height="12"><path id="-e-icon-arrow" class="s0" d="m15 5.5l-4.6-4.7c-0.4-0.4-1-0.4-1.4 0-0.4 0.4-0.4 1 0 1.4l2.9 3h-10.6c-0.6 0-1 0.4-1 1 0 0.5 0.4 1 1 1h10.6l-2.9 3c-0.4 0.4-0.4 1 0 1.4q0.3 0.3 0.7 0.3 0.4 0 0.7-0.3l4.6-4.7c0.2-0.2 0.2-0.5 0.2-0.7q0-0.4-0.2-0.7z"></path></svg>',
      '<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12" width="16" height="12"><path id="-e-icon-arrow" class="s0" d="m15 5.5l-4.6-4.7c-0.4-0.4-1-0.4-1.4 0-0.4 0.4-0.4 1 0 1.4l2.9 3h-10.6c-0.6 0-1 0.4-1 1 0 0.5 0.4 1 1 1h10.6l-2.9 3c-0.4 0.4-0.4 1 0 1.4q0.3 0.3 0.7 0.3 0.4 0 0.7-0.3l4.6-4.7c0.2-0.2 0.2-0.5 0.2-0.7q0-0.4-0.2-0.7z"></path></svg>',
    ],
    margin: 20,
    nav: true,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
    },
  });

  if (localStorage.getItem("header-message") != null) {
    $(".header-message").addClass("d-none");
  }

  $(".header-message-close").click(function (e) {
    e.preventDefault();
    $(".header-message").addClass("d-none");

    localStorage.setItem("header-message", false);

    var now = new Date().getTime();
    var setupTime = localStorage.getItem("header-message-time");

    if (setupTime == null) {
      localStorage.setItem("header-message-time", now);
    } else {
      if (now - setupTime > 72 * 60 * 60 * 1000) {
        localStorage.clear();
        localStorage.setItem("header-message-time", now);
      }
    }
  });

  services2carouselResize();
});
$(window).resize(function () {
  galleryFix();
  services2carouselResize();
});

var run = false;
$(window).scroll(function () {
  if ($(".numbers-col-text").length) {
    if (checkVisible(document.querySelector(".numbers-col-text")) && !run) {
      run = true;
      setTimeout(function () {
        numbersAnimation(".numbers-col-number");
      });
    }
  }
  if ($(".about2-counters").length) {
    if (
      checkVisible(document.querySelector(".about2-counters-item-number")) &&
      !run
    ) {
      run = true;
      setTimeout(function () {
        numbersAnimation(".about2-counters-item-number span");
      });
    }
  }
});
