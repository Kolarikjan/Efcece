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

  $(".banner-owl").owlCarousel({
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
    singleItem: true,
    animateIn: "fadeIn",
    animateOut: "fadeOut",
  });
  $(".faq-item-question").on("click", function () {
    var item = $(this).closest(".faq-item");
    var answer = item.find(".faq-item-answer");

    if (item.hasClass("active")) {
      item.removeClass("active");
      answer.css("height", 0);
    } else {
      $(".faq-item").removeClass("active");
      $(".faq-item-answer").css("height", 0);

      item.addClass("active");
      var scrollHeight = answer.prop("scrollHeight");
      answer.css("height", scrollHeight + "px");
    }
  });
});
