# slick-zoom

![npm Version](https://img.shields.io/npm/v/slick-zoom)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/slick-zoom)
[![NPM Downloads](https://img.shields.io/npm/dt/npm-badger.svg)](https://www.npmjs.com/package/slick-zoom)
![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hy/slick-zoom)
![NPM Type Definitions](https://img.shields.io/npm/types/slick-zoom)
![NPM License](https://img.shields.io/npm/l/slick-zoom)

[slick-zoom](https://github.com/GingerBear/slick-zoom) - zoomable carousel for mobile is an awesome jquery library, but had no way to install via npm.

This repository make it possible.

## Installation

### CDN

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<link
  href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
  media="all"
  rel="stylesheet"
/>
<link
  href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"
  media="all"
  rel="stylesheet"
/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"></script>
<link
  href="https://cdn.jsdelivr.net/npm/photoswipe@5.4.2/dist/photoswipe.min.css"
  media="all"
  rel="stylesheet"
/>
<script type="module" src="https://cdn.jsdelivr.net/npm/photoswipe@5.4.2/dist/photoswipe-lightbox.umd.min.js"></script>
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
  });
```

## Testing

```sh
npm test
```

## Reference

- holapet.com

## License

The Slick Zoom project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
