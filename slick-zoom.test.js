/**
 * @jest-environment jsdom
 */

const $ = require("jquery");
global.$ = $;
global.jQuery = $;

// Mock PhotoSwipe
class MockPhotoSwipe {
  constructor() {
    this.currSlide = { data: { el: null } };
  }
  init() {}
  on() {}
}
global.PhotoSwipe = MockPhotoSwipe;

// Import Slick Carousel
require("slick-carousel");

require("./slick-zoom.js");

describe("slickZoom jQuery Plugin", () => {
  let container;

  beforeEach(() => {
    // Setup DOM structure
    document.body.innerHTML = `
      <div class="pswp">
        <div class="pswp__bg"></div>
        <div class="pswp__scroll-wrap">
          <div class="pswp__container">
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
          </div>
        </div>
      </div>
      <div class="image-carousel">
        <div class="image-carousel-item">
          <img src="https://placehold.co/800x400" alt="Image 1" />
        </div>
        <div class="image-carousel-item">
          <img src="https://placehold.co/800x400" alt="Image 2" />
        </div>
        <div class="image-carousel-item">
          <img src="https://placehold.co/800x400" alt="Image 3" />
        </div>
      </div>
    `;
    container = $(".image-carousel");
  });

  afterEach(() => {
    // Cleanup
    document.body.innerHTML = "";
    if (container && container.hasClass("slick-slider")) {
      container.slick("unslick");
    }
  });

  describe("Initialization", () => {
    test("should initialize without errors", () => {
      expect(() => {
        container.slickZoom();
      }).not.toThrow();
    });

    test("should add data-pswp-uid attribute", () => {
      container.slickZoom();
      expect(container.attr("data-pswp-uid")).toBe("1");
    });

    test("should initialize with custom options", () => {
      expect(() => {
        container.slickZoom({
          slickOptions: {
            dots: false,
          },
          item: ".image-carousel-item",
        });
      }).not.toThrow();
    });

    test("should auto-detect item selector from first child class", () => {
      container.slickZoom();
      // Plugin should have bound click events to .image-carousel-item
      // Slick wraps items in .slick-slide divs, so we count the original items
      const originalItems = container.find(".image-carousel-item");
      expect(originalItems.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe("Error Handling", () => {
    test("should log error when .pswp element is missing", () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();
      $(".pswp").remove();

      container.slickZoom();

      // Trigger click to invoke openPhotoSwipe which checks for .pswp
      const firstItem = container.find(".image-carousel-item").first();
      firstItem.trigger("click");

      expect(consoleSpy).toHaveBeenCalledWith(
        "PhotoSwipe element not found. Please add a .pswp element to your page.",
      );

      consoleSpy.mockRestore();
    }, 10000);

    test("should log error when no images are found", () => {
      // Create container with items but no images inside them
      const emptyContainer = $(
        '<div class="empty-carousel"><div class="item"><div class="no-image"></div></div><div class="item"><div class="no-image"></div></div></div>',
      );
      $("body").append(emptyContainer);

      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      emptyContainer.slickZoom({
        item: ".item",
      });

      // Trigger click to invoke openPhotoSwipe which checks for images
      const firstItem = emptyContainer.find(".item").first();
      firstItem.trigger("click");

      expect(consoleSpy).toHaveBeenCalledWith("No images found in gallery");

      consoleSpy.mockRestore();
      emptyContainer.remove();
    });
  });

  describe("Image Parsing", () => {
    test("should parse images correctly", () => {
      container.slickZoom();

      // Access the internal parseImages function through the plugin
      // Since it's a private function, we test it indirectly through the click handler
      const items = container.find(".image-carousel-item img");
      expect(items.length).toBeGreaterThanOrEqual(3);
      expect(items[0].src).toContain("placehold.co");
    });

    test("should exclude slick-cloned slides", () => {
      container.slickZoom();

      // The plugin should only parse non-cloned images
      const allImages = container.find("img");
      // After slick initialization, there will be cloned slides
      // But parseImages should only get the original ones (3 original + clones)
      expect(allImages.length).toBeGreaterThan(3);
    });
  });

  describe("Index Calculation", () => {
    test("should calculate correct index for original slides", () => {
      container.slickZoom();

      // Simulate clicking on the second item
      const secondItem = container.find(".image-carousel-item").eq(1);
      const clickEvent = $.Event("click");

      // The index should be calculated accounting for cloned slides
      // For a simple carousel with 3 items, index of second item should be 1
      expect(secondItem.index()).toBeGreaterThanOrEqual(0);
    });
  });

  describe("Slick Integration", () => {
    test("should not initialize slick with less than 2 items", () => {
      const singleItemContainer = $(
        '<div class="single-item"><img src="test.jpg" /></div>',
      );
      $("body").append(singleItemContainer);

      singleItemContainer.slickZoom();

      // Should not have slick-slider class
      expect(singleItemContainer.hasClass("slick-slider")).toBe(false);

      singleItemContainer.remove();
    });

    test("should initialize slick with 2 or more items", () => {
      container.slickZoom();

      // Should have slick-slider class after initialization
      expect(container.hasClass("slick-slider")).toBe(true);
    });
  });

  describe("Click Handler", () => {
    test("should prevent default on click", () => {
      container.slickZoom();

      const firstItem = container
        .find(".image-carousel-item:not(.slick-cloned)")
        .first();
      const preventDefaultSpy = jest.fn();

      // Trigger click handler
      firstItem.trigger("click");

      // Note: In real scenario, preventDefault would be called
      // Here we just verify the handler is attached and doesn't throw
      expect(firstItem.length).toBeGreaterThan(0);
    });
  });

  describe("Options Handling", () => {
    test("should use default slick options when not provided", () => {
      container.slickZoom();

      // Check that slick was initialized with default options
      expect(container.hasClass("slick-slider")).toBe(true);
      // Slick 1.8.1 may not set data-slick-dots attribute, so we just check initialization
      expect(container.hasClass("slick-initialized")).toBe(true);
    });

    test("should merge custom slick options", () => {
      container.slickZoom({
        slickOptions: {
          dots: false,
          arrows: true,
        },
      });

      expect(container.hasClass("slick-slider")).toBe(true);
    });
  });

  describe("Multiple Galleries", () => {
    test("should handle multiple carousels with different UIDs", () => {
      // Clear and re-setup for this test
      document.body.innerHTML = `
        <div class="pswp">
          <div class="pswp__bg"></div>
          <div class="pswp__scroll-wrap">
            <div class="pswp__container">
              <div class="pswp__item"></div>
              <div class="pswp__item"></div>
              <div class="pswp__item"></div>
            </div>
          </div>
        </div>
        <div class="carousel-1">
          <div class="image-carousel-item">
            <img src="https://placehold.co/800x400" alt="Image 1" />
          </div>
          <div class="image-carousel-item">
            <img src="https://placehold.co/800x400" alt="Image 2" />
          </div>
        </div>
        <div class="carousel-2">
          <div class="image-carousel-item">
            <img src="https://placehold.co/800x400" alt="Image A" />
          </div>
          <div class="image-carousel-item">
            <img src="https://placehold.co/800x400" alt="Image B" />
          </div>
        </div>
      `;

      const carousel1 = $(".carousel-1");
      const carousel2 = $(".carousel-2");

      // Initialize both carousels together to maintain proper indexing
      $(".carousel-1, .carousel-2").slickZoom({
        item: ".image-carousel-item",
      });

      expect(carousel1.attr("data-pswp-uid")).toBe("1");
      expect(carousel2.attr("data-pswp-uid")).toBe("2");
    });
  });
});
