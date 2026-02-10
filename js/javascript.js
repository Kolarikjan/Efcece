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
    var $wrapper = $(this).closest(".modal-inside");
    var $modal = $wrapper.find(".modal");
    var $body = $("body"); // Najdi modal uvnitř tohoto wrapperu

    if ($modal.length) {
      if ($wrapper.hasClass("productbox-option-wrapper")) {
        $(".productbox-option-wrapper")
          .removeClass("is-open")
          .find(".productbox-option-body")
          .slideUp(200);
      }

      // Otevřít modal
      $body.addClass("modal-open");
      $modal.fadeIn(300).css("display", "flex");
    }
  });

  // Zavření modalu
  $(".modal-close").on("click", function (e) {
    e.preventDefault();
    $("body").removeClass("modal-open");
    $(this).closest(".modal").fadeOut(300);
  });

  // Výběr položky v modalu
  $(".selection-item-button").on("click", function (e) {
    e.preventDefault();
    var $item = $(this);
    var title = $item.data("title");
    var id = $item.data("value");
    var $body = $("body");

    // Najdeme wrapper (rodič modalu)
    var $wrapper = $item.closest(".productbox-option-wrapper");

    // Update UI na stránce
    $wrapper.find(".productbox-option-value").text(title);
    $wrapper.addClass("is-filled");
    $wrapper.find(".productbox-option-hidden-input").val(id);

    // Zavřít modal
    $body.removeClass("modal-open");
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

  $(".selection-item-image").on("click", function (e) {
    e.preventDefault();

    var $item = $(this).closest(".selection-item");
    var imgSrc = $(this).find(".selection-item-image-img").attr("src");
    var $modalBody = $(this).closest(".modal-simple-section-body");
    var $inspector = $modalBody.find(".selection-imageinspector");
    var $inspectorImg = $inspector.find("img");

    // 1. Nastavit obrázek
    $inspectorImg.attr("src", imgSrc);

    // 2. Zobrazit inspektor
    $inspector.fadeIn(300);

    $inspector.data("origin-item", $item);
  });

  // Zavření inspektoru
  $(".selection-imageinspector-close").on("click", function (e) {
    e.preventDefault();

    var $inspector = $(this).closest(".selection-imageinspector");
    // 1. Skrýt inspektor
    $inspector.fadeOut(300, function () {
      // Callback po zmizení: Vyčistit src (volitelné)
      $(this).find("img").attr("src", "");
    });
  });

  $(".selection-item-button").on("click", function (e) {
    e.preventDefault();
    var $btn = $(this); // Tlačítko, na které se kliklo
    var title = $btn.data("title");
    var id = $btn.data("value");
    var $body = $("body");

    // --- LOGIKA PRO ACTIVE CLASS ---
    // 1. Najdeme rodičovskou kartu (.selection-item)
    var $currentItem = $btn.closest(".selection-item");

    // 2. Najdeme kontejner a odebereme active všem ostatním položkám v něm
    $btn
      .closest(".selection-wrapper")
      .find(".selection-item")
      .removeClass("active");

    // 3. Přidáme active aktuální položce
    $currentItem.addClass("active");
    // -------------------------------

    // Najdeme wrapper (rodič modalu - input na stránce)
    var $wrapper = $btn.closest(".productbox-option-wrapper");

    // Update UI na stránce
    $wrapper.find(".productbox-option-value").text(title);
    $wrapper.addClass("is-filled");
    $wrapper.find(".productbox-option-hidden-input").val(id);

    // Zavřít modal
    $body.removeClass("modal-open");
    $btn.closest(".modal").fadeOut(300);
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
      // Najdeme img uvnitř thumbnailu (odkazuje na něj 'this' nebo index)
      const sourceImg = thumbnails[index].querySelector("img");
      const newSrc = sourceImg.src; // Nebo dataset, pokud používáš high-res
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

    // Click na náhledy
    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentIndex !== index) {
          currentIndex = index;
          fadeTo(currentIndex);
        }
      });
    });

    // Click na tlačítka (myší)
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

    // Klávesnice (Šipky)
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
    var $content = $(this);
    var $parent = $content.parent(); // .modal-simple-section

    // 1. Vložíme HTML pro náš scrollbar do rodiče
    var $scrollbar = $(
      '<div class="custom-scrollbar"><div class="custom-scrollbar-thumb"></div></div>',
    );
    $parent.append($scrollbar);

    var $thumb = $scrollbar.find(".custom-scrollbar-thumb");

    // Funkce pro výpočet pozice a velikosti
    function updateScrollbar() {
      var contentHeight = $content[0].scrollHeight;
      var visibleHeight = $content[0].clientHeight;
      var scrollTop = $content.scrollTop();

      // Pokud se obsah vejde, scrollbar skryjeme
      if (contentHeight <= visibleHeight) {
        $scrollbar.css("opacity", "0");
      } else {
        $scrollbar.css("opacity", "1");
      }

      // Výpočet výšky jezdce (poměr viditelného ku celkovému)
      var thumbHeightPercent = (visibleHeight / contentHeight) * 100;
      // Omezíme, aby nebyl jezdec příliš malý (min 10%)
      if (thumbHeightPercent < 10) thumbHeightPercent = 10;

      // Výpočet pozice shora (v procentech)
      // Kolik % jsme odscrollovali z celkového neviditelného prostoru
      var scrollPercent = scrollTop / (contentHeight - visibleHeight);

      // Přepočet na % v rámci dráhy scrollbaru (musíme odečíst výšku jezdce)
      var topPercent = scrollPercent * (100 - thumbHeightPercent);

      // Aplikace stylů
      $thumb.css({
        height: thumbHeightPercent + "%",
        top: topPercent + "%",
      });
    }

    // Eventy: Při scrollu a při změně velikosti okna přepočítat
    $content.on("scroll", updateScrollbar);
    $(window).on("resize", updateScrollbar);

    // Inicializace (pro případ, že je modal už otevřený nebo se otevře)
    // Používáme MutationObserver nebo interval, pokud se obsah mění dynamicky,
    // ale pro základ stačí zavolat při otevření modalu.
    // Pro jistotu navážeme i na hover, aby se přepočítalo, kdyby se něco načetlo pozdě.
    $parent.on("mouseenter click", updateScrollbar);
  });
});
