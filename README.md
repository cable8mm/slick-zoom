# slick-zoom

![npm Version](https://img.shields.io/npm/v/slick-zoom)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/slick-zoom)
[![NPM Downloads](https://img.shields.io/npm/dt/npm-badger.svg)](https://www.npmjs.com/package/slick-zoom)
![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hy/slick-zoom)
![NPM Type Definitions](https://img.shields.io/npm/types/slick-zoom)
![NPM License](https://img.shields.io/npm/l/slick-zoom)

[slick-zoom](https://github.com/GingerBear/slick-zoom) - zoomable carousel for mobile is awesome jquery library, but no way to install npm.

This repository make it possible.

## Installation

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/photoswipe@5.4.2/dist/umd/photoswipe-lightbox.umd.min.js"></script>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/photoswipe@5.4.2/dist/photoswipe.min.css"
/>
<script src="https://cdn.jsdelivr.net/npm/slick-zoom@1.0.0/slick-zoom.min.js"></script>
```

### NPM

```sh
npm i slick-zoom
```

## Usage

```javascript
$(el)
  .find(".imgbox")
  .slickZoom({
    slickOptions: {
      autoplay: false,
      dots: false,
      arrows: false,
    },
    item: ".img-item",
    startIndex: $(".imgbox.slick-slider").length,
  });
```

## Reference

- holapet.com

## License

The Slick Zoom project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).