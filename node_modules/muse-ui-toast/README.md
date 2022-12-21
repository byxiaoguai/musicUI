# Muse-UI-Toast

Muse-UI plugin toast

<a href="https://travis-ci.org/museui/muse-ui-toast">
  <img src="https://img.shields.io/travis/museui/muse-ui-toast.svg" alt="travis ci badge">
</a>
<a href="https://www.npmjs.org/package/muse-ui-toast">
  <img src="https://img.shields.io/npm/v/muse-ui-toast.svg" alt="Downloads">
</a>
<a href="https://npmjs.org/package/muse-ui-toast">
  <img src="https://img.shields.io/npm/dm/muse-ui-toast.svg" alt="Downloads">
</a>

## Installation

```bash
npm install muse-ui-toast -S
// or
yarn add muse-ui-toast
```

## CDN

```html
<link rel="stylesheet" href="https://unpkg.com/muse-ui-loading/dist/muse-ui-toast.all.css"/>
<script src="https://unpkg.com/muse-ui-toast/dist/muse-ui-toast.js"></script>
```

## Usage

```javascript
import Vue from 'vue'
import MuseUIToast from 'muse-ui-toast';

Vue.use(MuseUIToast);

new Vue({
  methods: {
    toast () {
      this.$toast.message('hello world');
      this.$toast.success('hello world');
      this.$toast.info('hello world');
      this.$toast.warning('hello world');
      this.$toast.error('hello world');
    }
  }
});

// Or
MuseUIToast.message('hello world');
MuseUIToast.success('hello world');
MuseUIToast.info('hello world');
MuseUIToast.warning('hello world');
MuseUIToast.error('hello world');
```

## API

### config

`Vue.use(MuseUIToast, config)` change default config

```javascript
export default {
  position: 'bottom',               // position
  time: 2000,                       // show time length
  closeIcon: 'close',               // close icon
  close: true,                      // show close button
  successIcon: 'check_circle',      // success icon
  infoIcon: 'info',                 // info icon
  warningIcon: 'priority_high',     // warning icon
  errorIcon: 'warning'              // error icon
};
```

### config (config<Object>)

Change default config, Will return new config;

### message(options<String/Object>)

Show default message, Will return `id`;

### success(options<String/Object>)

Show default success message, Will return `id`;

### info(options<String/Object>)

Show default info message, Will return `id`;

### error(options<String/Object>)

Show default error message, Will return `id`;

### warning(options<String/Object>)

Show default warning message, Will return `id`;

### options

| Name | Description | Type | Accepted Values | Default |
|------|-------------|------|-----------------|---------|
| message | show message content | String | — | — |
| time | show time length | Number | — | 2000 |
| position | show position | String | top / top-start / top-end / bottom / bottom-start / bottom-end | bottom |
| close | Whether the show close button | Boolean | — | true |
| icon | left icon | String | — | — |
| actions | action buttons,  | Array, [{ action: '', click: (id) => {} }] | — | — |
| color | color | String | — | — |
| textColor | message text color | String | — | — |

### close (id)

close message


## Dependencies Muse-UI Components

* `mu-snackbar`
* `mu-button`
* `mu-icon`

## Licence

muse-ui-toast is open source and released under the MIT Licence.

Copyright (c) 2018 myron
