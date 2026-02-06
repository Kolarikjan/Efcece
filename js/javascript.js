$(document).ready(function () {
  Fancybox.bind("[data-fancybox]", {});

  document
    .querySelectorAll(".header-toggler, .header-menu-close")
    .forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        document.querySelector(".header-menu").classList.toggle("active");
        document.querySelector(".header-toggler").classList.toggle("active");
      });
    });
  $(".faq-item-question").on("click", function () {
    let item = $(this).closest(".faq-item");
    let answer = item.find(".faq-item-answer");

    if (item.hasClass("active")) {
      item.removeClass("active");
      answer.css("height", 0);
    } else {
      $(".faq-item").removeClass("active");
      $(".faq-item-answer").css("height", 0);

      item.addClass("active");
      let scrollHeight = answer.prop("scrollHeight");
      answer.css("height", scrollHeight + "px");
    }
  });
  const $bannerOwl = $(".banner-owl");

  function alignDotsToContainer() {
    let $dots = $bannerOwl.find(".owl-dots");
    let $container = $bannerOwl.find(".owl-item.active .container");

    if ($container.length === 0) {
      $container = $bannerOwl.find(".banner-item .container").first();
    }

    if ($(window).width() > 993) {
      if ($container.length > 0 && $dots.length > 0) {
        let windowWidth = $(window).width();
        let containerWidth = $container.outerWidth();
        let containerOffsetLeft = $container.offset().left;

        let rightPosition =
          windowWidth - (containerOffsetLeft + containerWidth);

        $dots.css({
          left: "auto",
          right: rightPosition + "px",
          transform: "none",
        });
      }
    } else {
      $dots.css({
        left: "",
        right: "",
        transform: "",
      });
    }
  }

  $bannerOwl.owlCarousel({
    items: 1,
    loop: false,
    rewind: true,
    margin: 0,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 10000,
    autoplayHoverPause: false,
    mouseDrag: false,
    onInitialized: alignDotsToContainer,
    onResized: alignDotsToContainer,
    onRefreshed: alignDotsToContainer,
  });
  $(window).on("resize", function () {
    alignDotsToContainer();
  });
});
