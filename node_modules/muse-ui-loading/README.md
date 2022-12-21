# Muse-UI-Loading

Muse-UI plugin loading

<a href="https://travis-ci.org/museui/muse-ui-loading">
  <img src="https://img.shields.io/travis/museui/muse-ui-loading.svg" alt="travis ci badge">
</a>
<a href="https://www.npmjs.org/package/muse-ui-loading">
  <img src="https://img.shields.io/npm/v/muse-ui-loading.svg" alt="Downloads">
</a>
<a href="https://npmjs.org/package/muse-ui-loading">
  <img src="https://img.shields.io/npm/dm/muse-ui-loading.svg" alt="Downloads">
</a>

## Installation

```bash
npm install -S muse-ui-loading
// or
yarn add muse-ui-loading
```

## CDN

```html
<link rel="stylesheet" href="https://unpkg.com/muse-ui-loading/dist/muse-ui-loading.all.css"/>
<script src="https://unpkg.com/muse-ui-loading/dist/muse-ui-loading.js"></script>
```

## Usage

```javascript
import 'muse-ui-loading/dist/muse-ui-loading.css'; // load css
import Vue from 'vue';
import MuseUILoading from 'muse-ui-loading';
Vue.use(MuseUILoading);

new Vue({
  methods: {
    loading () {
      const loading = this.$loading({
        // ...options
      });
      setTimeout(() => {
        loading.close();
      }, 3000)
    }
  }
});

// or
const loading = MuseUILoading({
  // ...options
});
setTimeout(() => {
  loading.close();
}, 3000)
```

use `v-loading` in element, use `data-mu-loading-*` set option

```html
<div v-loading="true" data-mu-loading-overlay-color="rgba(0, 0, 0, .6)" style="position: relative; width: 500px; height: 400px;"></div>
```

element `position` is can`t `static`;

## API

### config

`Vue.use(MuseUILoading, config)` change default config

```javascript
{
  overlayColor: 'hsla(0,0%,100%,.9)',        // overlay color
  size: 48,                                  // circle progress size
  color: 'primary',                           // color
  className: ''                               // loading class name
}
```

### config (config<Object>)

Change default config, Will return new config.

### Loading (options)

Show loading , Will return object ({ instance, close }).

### Options

| Name | Description | Type | Accepted Values | Default |
|------|-------------|------|-----------------|---------|
| overlayColor | overlay color | String | — | hsla(0,0%,100%,.9) |
| color | loading color, loading text color | String | — | primary |
| size | loading size | Number | — | 48 |
| text | loading text | String | — | — |
| className | loading class | String | — | — |
| target | the DOM node Loading needs to cover | Element | — | document.body |

### v-loading

`v-loading="true"`

* data-mu-loading-overlay-color
* data-mu-loading-color
* data-mu-loading-size
* data-mu-loading-text
* data-mu-loading-class


## Dependencies Muse-UI

* `mu-circle-progress`
* `mu-fade-transition`
* muse-ui/lib/internal/mixins/color
* muse-ui/lib/internal/mixins/popup/utils

## Licence

muse-ui is open source and released under the MIT Licence.

Copyright (c) 2018 myron
