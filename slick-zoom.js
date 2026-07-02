$.fn.slickZoom = function (options) {
  options = options || {};

  $(this).each((i, container) => {
    const $container = $(container);
    const firstChild = $container.children().first();

    // Set default item selector if not provided
    if (!options.item) {
      const firstChildClass = firstChild.attr("class");
      options.item = firstChildClass ? `.${firstChildClass}` : ".item";
    }

    const items = $container.find(options.item);
    const slickOptions = options.slickOptions || {
      dots: true,
      speed: 300,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      accessibility: false,
    };

    const slickInstance =
      items.length >= 2 ? $container.slick(slickOptions) : null;

    // init photoswipe
    $container.attr("data-pswp-uid", i + 1).on("click", options.item, (e) => {
      e.preventDefault();
      const slideItem = $(e.currentTarget);
      const index = getOriginalIndex(slideItem);
      openPhotoSwipe(index, $container);
    });

    function getOriginalIndex(slideItem) {
      // Calculate the original index by accounting for cloned slides
      const clonedSlides = slideItem.siblings(".slick-slide.slick-cloned");
      const clonedCount = clonedSlides.length / 2;
      return slideItem.index() - clonedCount;
    }

    function openPhotoSwipe(index, $gallery) {
      const pswpElement = $(".pswp")[0];

      if (!pswpElement) {
        console.error(
          "PhotoSwipe element not found. Please add a .pswp element to your page.",
        );
        return;
      }

      const images = parseImages($gallery);

      if (!images || images.length === 0) {
        console.error("No images found in gallery");
        return;
      }

      // Ensure index is within bounds
      const safeIndex = Math.max(
        0,
        Math.min(parseInt(index, 10), images.length - 1),
      );

      const photoSwipeOptions = options.photoSwipeOptions || {
        index: safeIndex,
        galleryUID: $gallery.attr("data-pswp-uid"),
      };

      // Pass data to PhotoSwipe and initialize it
      const gallery = new PhotoSwipe(pswpElement, images, photoSwipeOptions);
      gallery.init();

      // slide the slick carousel in the background when the zoom carousel is moving
      if (slickInstance) {
        gallery.on("change", () => {
          if (!gallery.currSlide || !gallery.currSlide.data) {
            return;
          }

          const slideItem = $(gallery.currSlide.data.el).closest(options.item);
          if (slideItem.length) {
            const currentIndex = getOriginalIndex(slideItem);
            slickInstance.slick("slickGoTo", currentIndex);
          }
        });
      }
    }

    function parseImages(el) {
      return el
        .find(options.item + ":not(.slick-cloned) img")
        .map((i, img) => ({
          el: img,
          src: img.src,
          msrc: img.src,
          w: img.naturalWidth || img.width || 800,
          h: img.naturalHeight || img.height || 600,
        }))
        .get();
    }
  });
};
