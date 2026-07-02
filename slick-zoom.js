$.fn.slickZoom = function (options) {
  options = options || {};

  $(this).each(function (i) {
    var container = $(this);
    var firstChild = container.children().first();

    // Set default item selector if not provided
    if (!options.item) {
      var firstChildClass = firstChild.attr("class");
      options.item = firstChildClass ? "." + firstChildClass : ".item";
    }

    var items = container.find(options.item);
    var slickOptions = options.slickOptions || {
      dots: true,
      speed: 300,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      accessibility: false,
    };

    var slickInstance =
      items.length >= 2 ? container.slick(slickOptions) : null;

    // init photoswipe
    container
      .attr("data-pswp-uid", i + 1)
      .on("click", options.item, function (e) {
        e.preventDefault();
        var slideItem = $(this);
        var index = getOriginalIndex(slideItem);
        openPhotoSwipe(index, container);
      });

    function getOriginalIndex(slideItem) {
      // Calculate the original index by accounting for cloned slides
      var clonedSlides = slideItem.siblings(".slick-slide.slick-cloned");
      var clonedCount = clonedSlides.length / 2;
      return slideItem.index() - clonedCount;
    }

    function openPhotoSwipe(index, $gallery) {
      var pswpElement = $(".pswp")[0];

      if (!pswpElement) {
        console.error(
          "PhotoSwipe element not found. Please add a .pswp element to your page.",
        );
        return;
      }

      var images = parseImages($gallery);

      if (!images || images.length === 0) {
        console.error("No images found in gallery");
        return;
      }

      // Ensure index is within bounds
      var safeIndex = Math.max(
        0,
        Math.min(parseInt(index, 10), images.length - 1),
      );

      var photoSwipeOptions = options.photoSwipeOptions || {
        index: safeIndex,
        galleryUID: $gallery.attr("data-pswp-uid"),
      };

      // Pass data to PhotoSwipe and initialize it
      var gallery = new PhotoSwipe(pswpElement, images, photoSwipeOptions);
      gallery.init();

      // slide the slick carousel in the background when the zoom carousel is moving
      if (slickInstance) {
        gallery.on("change", function () {
          if (!gallery.currSlide || !gallery.currSlide.data) {
            return;
          }

          var slideItem = $(gallery.currSlide.data.el).closest(options.item);
          if (slideItem.length) {
            var currentIndex = getOriginalIndex(slideItem);
            slickInstance.slick("slickGoTo", currentIndex);
          }
        });
      }
    }

    function parseImages(el) {
      return el
        .find(options.item + ":not(.slick-cloned) img")
        .map(function () {
          return {
            el: this,
            src: this.src,
            msrc: this.src,
            w: this.naturalWidth || this.width || 800,
            h: this.naturalHeight || this.height || 600,
          };
        })
        .get();
    }
  });
};
