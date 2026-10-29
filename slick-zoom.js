(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    const $ = require("jquery");
    module.exports = factory($, () =>
      typeof globalThis.PhotoSwipe === "function"
        ? Promise.resolve(globalThis.PhotoSwipe)
        : import("photoswipe"),
    );
  } else {
    factory(root.jQuery || root.$, () => Promise.resolve(root.PhotoSwipe));
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function ($, loadPhotoSwipe) {
  if (!$ || !$.fn) {
    throw new Error("slick-zoom requires jQuery to be loaded first.");
  }

  let nextGalleryUid = 1;

  $.fn.slickZoom = function (options) {
    const settings = options || {};

    return this.each(function () {
      const $container = $(this);
      const firstChildClass = $container.children().first().attr("class");
      const itemSelector =
        settings.item ||
        (firstChildClass ? `.${firstChildClass.trim().split(/\s+/)[0]}` : ".item");
      const $items = $container.find(itemSelector);
      const slickOptions = settings.slickOptions || {
        dots: true,
        speed: 300,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        accessibility: false,
      };
      const slickInstance =
        $items.length >= 2 && typeof $container.slick === "function"
          ? ($container.slick(slickOptions), $container)
          : null;
      const galleryUid = nextGalleryUid++;

      $container
        .attr("data-pswp-uid", galleryUid)
        .off("click.slickZoom", itemSelector)
        .on("click.slickZoom", itemSelector, function (event) {
          event.preventDefault();
          openPhotoSwipe(originalIndex($(this)), $container);
        });

      function originalIndex($item) {
        const slickIndex = Number.parseInt($item.attr("data-slick-index"), 10);
        const originalItems = $container.find(
          `${itemSelector}:not(.slick-cloned)`,
        );
        if (Number.isFinite(slickIndex) && originalItems.length) {
          return ((slickIndex % originalItems.length) + originalItems.length) %
            originalItems.length;
        }
        return $item
          .closest(".slick-slide")
          .index();
      }

      function parseImages() {
        return $container
          .find(`${itemSelector}:not(.slick-cloned)`)
          .map((index, item) => {
            const img = $(item).find("img").first()[0];
            if (!img) return null;
            return {
              src: img.currentSrc || img.src,
              width: img.naturalWidth || img.width || 800,
              height: img.naturalHeight || img.height || 600,
              alt: img.alt,
              element: img,
            };
          })
          .get();
      }

      function openPhotoSwipe(index) {
        const images = parseImages();
        if (!images.length) {
          console.error("No images found in gallery");
          return;
        }

        loadPhotoSwipe()
          .then((module) => {
            const PhotoSwipe = module && (module.default || module);
            if (typeof PhotoSwipe !== "function") {
              throw new Error(
                "PhotoSwipe could not be loaded. Check the PhotoSwipe script or package dependency.",
              );
            }

            const safeIndex = Math.max(
              0,
              Math.min(Number.parseInt(index, 10) || 0, images.length - 1),
            );
            const gallery = new PhotoSwipe({
              ...(settings.photoSwipeOptions || {}),
              dataSource: images,
              index: safeIndex,
            });

            if (slickInstance) {
              gallery.on("change", () => {
                slickInstance.slick("slickGoTo", gallery.currIndex);
              });
            }
            gallery.init();
          })
          .catch((error) => console.error(error));
      }
    });
  };

  return $;
});
