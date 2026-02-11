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
        document.querySelector("body").classList.toggle("modal-open");
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

  $(".productbox-option-header:not(.modal-trigger)").on("click", function (e) {
    let $wrapper = $(this).closest(".productbox-option-wrapper");
    let $body = $wrapper.find(".productbox-option-body");

    $(".productbox-option-wrapper")
      .not($wrapper)
      .removeClass("is-open")
      .find(".productbox-option-body")
      .slideUp(200);

    $wrapper.toggleClass("is-open");
    $body.slideToggle(200);
  });

  $(".productbox-option-swatch").on("click", function (e) {
    e.preventDefault();
    let $item = $(this);
    let title = $item.data("title");
    let id = $item.data("value");
    let $wrapper = $item.closest(".productbox-option-wrapper");

    $wrapper.find(".productbox-option-value").text(title);
    $wrapper.addClass("is-filled");
    $wrapper.find(".productbox-option-hidden-input").val(id);

    $wrapper.find(".active").removeClass("active");
    $item.addClass("active");

    $wrapper.removeClass("is-open");
    $wrapper.find(".productbox-option-body").slideUp(200);
  });

  $(".modal-trigger").on("click", function (e) {
    e.preventDefault();
    let $wrapper = $(this).closest(".modal-inside");
    let $modal = $wrapper.find(".modal");
    let $body = $("body");

    if ($modal.length) {
      if ($wrapper.hasClass("productbox-option-wrapper")) {
        $(".productbox-option-wrapper")
          .removeClass("is-open")
          .find(".productbox-option-body")
          .slideUp(200);
      }

      $body.addClass("modal-open");
      $modal.fadeIn(300).css("display", "flex");
    }
  });

  $(".modal-close").on("click", function (e) {
    e.preventDefault();
    let $modal = $(this).closest(".modal");

    $("body").removeClass("modal-open");
    $modal.fadeOut(300, function () {
      $modal.find(".calculation2-order").addClass("active");
      $modal.find(".calculation2-final").removeClass("active");

      $modal.find(".js-same-address").prop("checked", true);
      $modal.find(".calculation2-final-shipping-fields").hide();
    });
  });

  $(".selection-item-button").on("click", function (e) {
    e.preventDefault();
    let $item = $(this);
    let title = $item.data("title");
    let id = $item.data("value");
    let $body = $("body");

    let $currentItem = $item.closest(".selection-item");

    $item
      .closest(".selection-wrapper")
      .find(".selection-item")
      .removeClass("active");

    $currentItem.addClass("active");

    let $wrapper = $item.closest(".productbox-option-wrapper");

    $wrapper.find(".productbox-option-value").text(title);
    $wrapper.addClass("is-filled");
    $wrapper.find(".productbox-option-hidden-input").val(id);

    $body.removeClass("modal-open");
    $item.closest(".modal").fadeOut(300);
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest(".productbox-option-wrapper").length) {
      $(".productbox-option-wrapper")
        .removeClass("is-open")
        .find(".productbox-option-body")
        .slideUp(200);
    }

    if ($(".header-menu").hasClass("active")) {
      if (
        !$(e.target).closest(".header-menu").length &&
        !$(e.target).closest(".header-toggler").length
      ) {
        $(".header-menu").removeClass("active");
        $(".header-toggler").removeClass("active");
        $("body").removeClass("modal-open");
      }
    }

    if ($("body").hasClass("modal-open") && $(".modal:visible").length) {
      if (
        !$(e.target).closest(".modal").length &&
        !$(e.target).closest(".modal-trigger").length &&
        !$(e.target).closest(".selection-item-image").length
      ) {
        $("body").removeClass("modal-open");

        $(".modal:visible").fadeOut(300, function () {
          $(this).find(".calculation2-order").addClass("active");
          $(this).find(".calculation2-final").removeClass("active");
          $(this).find(".js-same-address").prop("checked", true);
          $(this).find(".calculation2-final-shipping-fields").hide();
        });
      }
    }
  });

  $(".amount-buttons-minus, .amount-buttons-plus").on("click", function (e) {
    e.preventDefault();

    let $btn = $(this);
    let $input = $btn
      .closest(".amount-buttons")
      .find("input.amount-buttons-amount-input");

    let val = parseInt($input.val()) || 0;
    let min = parseInt($input.attr("min")) || 1;

    if ($btn.hasClass("amount-buttons-plus")) {
      $input.val(val + 1);
    } else {
      if (val > min) {
        $input.val(val - 1);
      }
    }

    $input.trigger("change");
  });

  $(".selection-item-image").on("click", function (e) {
    e.preventDefault();

    let $item = $(this).closest(".selection-item");
    let imgSrc = $(this).find(".selection-item-image-img").attr("src");
    let $modalBody = $(this).closest(".modal-simple-section-body");
    let $inspector = $modalBody.find(".selection-imageinspector");
    let $inspectorImg = $inspector.find("img");

    $inspectorImg.attr("src", imgSrc);
    $inspector.fadeIn(300);
    $inspector.data("origin-item", $item);
  });

  $(".selection-imageinspector-close").on("click", function (e) {
    e.preventDefault();

    let $inspector = $(this).closest(".selection-imageinspector");
    $inspector.fadeOut(300, function () {
      $(this).find("img").attr("src", "");
    });
  });

  const gallery = document.querySelector(".gallery");

  if (gallery) {
    const mainContainer = gallery.querySelector(".gallery-main");
    const imgA = mainContainer.querySelector(".image-a");
    const imgB = mainContainer.querySelector(".image-b");
    const nextBtn = gallery.querySelector(".gallery-controls-right");
    const prevBtn = gallery.querySelector(".gallery-controls-left");
    const thumbnails = gallery.querySelectorAll(
      ".gallery-sidebar-content-item",
    );

    let currentIndex = 0;
    let showingA = true;

    function updateActiveThumbnail(index) {
      thumbnails.forEach((thumb) => thumb.classList.remove("active"));
      thumbnails[index].classList.add("active");
      thumbnails[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }

    function fadeTo(index) {
      const sourceImg = thumbnails[index].querySelector("img");
      const newSrc = sourceImg.src;
      const newAlt = sourceImg.alt;

      if (showingA) {
        imgB.src = newSrc;
        imgB.alt = newAlt;
        imgB.classList.add("visible");
        imgA.classList.remove("visible");
      } else {
        imgA.src = newSrc;
        imgA.alt = newAlt;
        imgA.classList.add("visible");
        imgB.classList.remove("visible");
      }

      showingA = !showingA;
      updateActiveThumbnail(index);
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % thumbnails.length;
      fadeTo(currentIndex);
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
      fadeTo(currentIndex);
    }

    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentIndex !== index) {
          currentIndex = index;
          fadeTo(currentIndex);
        }
      });
    });

    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showNext();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showPrev();
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        showNext();
      }
      if (e.key === "ArrowLeft") {
        showPrev();
      }
    });
  }

  $(".modal-overflow").each(function () {
    let $content = $(this);
    let $parent = $content.parent();

    let $scrollbar = $(
      '<div class="custom-scrollbar"><div class="custom-scrollbar-thumb"></div></div>',
    );
    $parent.append($scrollbar);

    let $thumb = $scrollbar.find(".custom-scrollbar-thumb");

    function updateScrollbar() {
      let contentHeight = $content[0].scrollHeight;
      let visibleHeight = $content[0].clientHeight;
      let scrollTop = $content.scrollTop();

      if (contentHeight <= visibleHeight) {
        $scrollbar.css("opacity", "0");
      } else {
        $scrollbar.css("opacity", "1");
      }

      let thumbHeightPercent = (visibleHeight / contentHeight) * 100;
      if (thumbHeightPercent < 10) thumbHeightPercent = 10;

      let scrollPercent = scrollTop / (contentHeight - visibleHeight);
      let topPercent = scrollPercent * (100 - thumbHeightPercent);

      $thumb.css({
        height: thumbHeightPercent + "%",
        top: topPercent + "%",
      });
    }

    $content.on("scroll", updateScrollbar);
    $(window).on("resize", updateScrollbar);
    $parent.on("mouseenter click", updateScrollbar);
  });

  $(".calculation2-order-continuetofinal").on("click", function (e) {
    e.preventDefault();
    $(".calculation2-order").removeClass("active");
    $(".calculation2-final").addClass("active");
    $(this).closest(".modal-overflow").animate({ scrollTop: 0 }, 300);
  });

  $(".js-same-address").on("change", function () {
    let $shippingFields = $(".calculation2-final-shipping-fields");
    if ($(this).is(":checked")) {
      $shippingFields.slideUp(300);
    } else {
      $shippingFields.slideDown(300);
    }
  });
});
