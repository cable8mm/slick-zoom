$.fn.slickZoom = function (options) {
  options = options || {};

  $(this).each(function(i) {
    var container = $(this);
    options.item = options.item || '.' + container.children().attr('class');
    var items = container.find(options.item);
    var slickOptions = options.slickOptions || {
      dots: true,
      speed: 300,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      accessibility: false
    };

    var slickInstance = items.length >= 2 ? container.slick(slickOptions) : null;

    // init photoswipe
    container
      .attr('data-pswp-uid', i+1)
      .on('click', options.item, function (e) {
        e.preventDefault();
        var slideItem = $(this);
        var index = slideItem.index() - (slideItem.siblings('.slick-slide.slick-cloned').length / 2);
        openPhotoSwipe(index, container);
      });

    function openPhotoSwipe(index, $gallery) {
      var pswpElement = $('.pswp')[0];
      var images = parseImages($gallery);

      var photoSwipeOptions = options.photoSwipeOptions || {
        fullscreenEl: false,
        index: parseInt(index, 10),
        galleryUID: $gallery.attr('data-pswp-uid'),
        history: false,
        getThumbBoundsFn: function(index) {
          // to make the open/close animation
          var rect = images[index].el.getBoundingClientRect();
          var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;

          return {
            x: rect.left,
            y: rect.top + pageYScroll,
            w: rect.width
          };
        }
      };

      // Pass data to PhotoSwipe and initialize it
      var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, images, photoSwipeOptions);
      gallery.init();

      // slide the slick carouel in the background when the zoom carouel is moving
      if (slickInstance) {
        gallery.listen('beforeChange', function() {
          var slideItem = $(gallery.currItem.el).closest(options.item);
          var currentIndex = slideItem.index() - (slideItem.siblings('.slick-slide.slick-cloned').length / 2);;
          slickInstance.slick('slickGoTo', currentIndex);
        });
      }
    };

    function parseImages(el) {
      return el.find(options.item + ':not(.slick-cloned) img').map(function() {
        return {
          el: this,
          src: this.src,
          msrc: this.src,
          w: this.naturalWidth,
          h: this.naturalHeight
        };
      }).get();
    }

  });
}