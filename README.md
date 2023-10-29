# slick-zoom

## About

[![npm version](https://badge.fury.io/js/slick-zoom.svg)](https://badge.fury.io/js/slick-zoom)
[![NPM Downloads](https://img.shields.io/npm/dt/npm-badger.svg)](https://www.npmjs.com/package/slick-zoom)
[![](https://data.jsdelivr.com/v1/package/npm/slick-zoom/badge?style=rounded)](https://www.jsdelivr.com/package/npm/slick-zoom)

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
