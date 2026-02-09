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

  // 1. Otevření/Zavření (Klik na header)
  // --- A. Logika pro KLASICKÝ Dropdown (Overlay) ---
  // Kliknutí na hlavičku, která NEMA třídu modal-trigger
  $(".productbox-option-header:not(.modal-trigger)").on("click", function (e) {
    var $wrapper = $(this).closest(".productbox-option-wrapper");
    var $body = $wrapper.find(".productbox-option-body");

    // Zavřít ostatní otevřené dropdowny
    $(".productbox-option-wrapper")
      .not($wrapper)
      .removeClass("is-open")
      .find(".productbox-option-body")
      .slideUp(200);

    $wrapper.toggleClass("is-open");
    $body.slideToggle(200);
  });

  // Výběr ve Swatches (kuličky)
  $(".productbox-option-swatch").on("click", function (e) {
    e.preventDefault();
    var $item = $(this);
    var title = $item.data("title");
    var id = $item.data("value");
    var $wrapper = $item.closest(".productbox-option-wrapper");

    // Update UI
    $wrapper.find(".productbox-option-value").text(title);
    $wrapper.addClass("is-filled");
    $wrapper.find(".productbox-option-hidden-input").val(id);

    // Active class
    $wrapper.find(".active").removeClass("active");
    $item.addClass("active");

    // Close
    $wrapper.removeClass("is-open");
    $wrapper.find(".productbox-option-body").slideUp(200);
  });

  // --- B. Logika pro MODAL (Popup) ---

  // Kliknutí na hlavičku s třídou .modal-trigger
  $(".modal-trigger").on("click", function (e) {
    e.preventDefault();
    var $wrapper = $(this).closest(".productbox-option-wrapper");
    var $modal = $wrapper.find(".modal"); // Najdi modal uvnitř tohoto wrapperu

    if ($modal.length) {
      // Zavřít všechny ostatní dropdowny, aby nestrašily na pozadí
      $(".productbox-option-wrapper")
        .removeClass("is-open")
        .find(".productbox-option-body")
        .slideUp(200);

      // Otevřít modal
      $modal.fadeIn(300).css("display", "flex");
    }
  });

  // Zavření modalu
  $(".modal-close").on("click", function (e) {
    e.preventDefault();
    $(this).closest(".modal").fadeOut(300);
  });

  // Výběr položky v modalu
  $(".modal-item").on("click", function (e) {
    e.preventDefault();
    var $item = $(this);
    var title = $item.data("title");
    var id = $item.data("value");

    // Najdeme wrapper (rodič modalu)
    var $wrapper = $item.closest(".productbox-option-wrapper");

    // Update UI na stránce
    $wrapper.find(".productbox-option-value").text(title);
    $wrapper.addClass("is-filled");
    $wrapper.find(".productbox-option-hidden-input").val(id);

    // Zavřít modal
    $item.closest(".modal").fadeOut(300);
  });

  // --- C. Společné (Kliknutí mimo) ---
  $(document).on("click", function (e) {
    // Zavíráme jen dropdowny, modaly se řeší přes overlay
    if (!$(e.target).closest(".productbox-option-wrapper").length) {
      $(".productbox-option-wrapper")
        .removeClass("is-open")
        .find(".productbox-option-body")
        .slideUp(200);
    }
  });

  // --- OVLÁDÁNÍ MNOŽSTVÍ (+/-) ---
  $(".amount-buttons-minus, .amount-buttons-plus").on("click", function (e) {
    e.preventDefault();

    var $btn = $(this);
    // Najdeme input uvnitř stejného rodiče (.amount-buttons)
    var $input = $btn
      .closest(".amount-buttons")
      .find("input.amount-buttons-amount-input");

    var val = parseInt($input.val()) || 0;
    var min = parseInt($input.attr("min")) || 1;

    if ($btn.hasClass("amount-buttons-plus")) {
      $input.val(val + 1);
    } else {
      if (val > min) {
        $input.val(val - 1);
      }
    }

    $input.trigger("change");
  });
});
