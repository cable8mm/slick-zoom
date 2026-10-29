# slick-zoom

![npm Version](https://img.shields.io/npm/v/slick-zoom)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/slick-zoom)
[![NPM Downloads](https://img.shields.io/npm/dt/slick-zoom.svg)](https://www.npmjs.com/package/slick-zoom)
![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hy/slick-zoom)
![NPM Type Definitions](https://img.shields.io/npm/types/slick-zoom)
![NPM License](https://img.shields.io/npm/l/slick-zoom)

[slick-zoom](https://github.com/GingerBear/slick-zoom) - zoomable carousel for mobile is an awesome jquery library, but had no way to install via npm.

This repository make it possible.

## Installation

### CDN

Load jQuery, Slick, and the PhotoSwipe 5 core before slick-zoom. The PhotoSwipe UMD build exposes the `PhotoSwipe` global used by this plugin.

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/photoswipe@5.4.2/dist/photoswipe.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/photoswipe@5.4.2/dist/umd/photoswipe.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/slick-zoom@1.0.0/slick-zoom.js"></script>
```

### NPM

```sh
npm i slick-zoom jquery slick-carousel
```

```js
const $ = require("jquery");
require("slick-carousel");
require("slick-zoom");
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
  });
```

Each selected gallery needs at least two slide items to enable Slick. PhotoSwipe 5 creates its own viewer element, so no `.pswp` markup is needed. Each slide item should contain an `<img>`; its intrinsic dimensions are used when available.

## Testing

```sh
npm test
```

## Reference

- holapet.com

## License

The Slick Zoom project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
