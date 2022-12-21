# Muse-UI-Message

Muse-UI plugin message dialog

<a href="https://travis-ci.org/museui/muse-ui-message">
  <img src="https://img.shields.io/travis/museui/muse-ui-message.svg" alt="travis ci badge">
</a>
<a href="https://www.npmjs.org/package/muse-ui-message">
  <img src="https://img.shields.io/npm/v/muse-ui-message.svg" alt="Downloads">
</a>
<a href="https://npmjs.org/package/muse-ui-message">
  <img src="https://img.shields.io/npm/dm/muse-ui-message.svg" alt="Downloads">
</a>

## Installation

```bash
npm install -S muse-ui-message
// or
yarn add muse-ui-message
```

## CDN

```html
<link rel="stylesheet" href="https://unpkg.com/muse-ui-message/dist/muse-ui-message.all.css"/>
<script src="https://unpkg.com/muse-ui-message/dist/muse-ui-message.js"></script>
```

## Usage

```javascript
import 'muse-ui-message/dist/muse-ui-message.css';
import Vue from 'vue';
import MuseUIMessage from 'muse-ui-message';
Vue.use(MuseUIMessage);

new Vue({
  methods: {
    open () {
      this.$alert('Hello world');
      this.$confirm('Hello world ?');
      this.$prompt('Input Some I');
    }
  }
})

// or
MuseUIMessage.alert('Hello world');
MuseUIMessage.confirm('Hello world ?');
MuseUIMessage.prompt('Input Some I');

// use with router

router.beforeEach(() => {
  MuseUIMessage.close();
});
```


## API

### config

```javascript
export default {
  successIcon: 'check_circle',                    // success icon
  infoIcon: 'info',                               // info icon
  warningIcon: 'priority_high',                   // warning icon
  errorIcon: 'warning',                           // error icon
  iconSize: 24,                                   // icon size
  width: 350,                                     // dialog width
  maxWidth: '80%',                                // dialog max width
  className: '',                                  // dialog class
  okLabel: '确定',                                 // dialog ok label
  cancelLabel: '取消',                             // dialog cancel label
  transition: 'scale'                             // 'slide-top', 'slide-bottom', 'slide-left', 'slide-right', 'fade', 'scale'
};
```

### config (config<Object>)

Change default config, Will return new config.

### Methods

* $alerts(content, title, options) 或 $alerts(content, options)
* $confirm(content, title, options) 或 $confirm(content, options)
* $prompt(content, title, options) 或 $prompt(content, options)

Will return Promise, ({ resule, value })

```javascript
this.$confirm('confirm ?')
  .then(({ result, value }) => {
    // result:  true click ok Button, false click cancel button
    // value: input value
  })
```

### Options

| Name | Description | Type | Accepted Values | Default |
|------|-------------|------|-----------------|---------|
| title | dialog title | String | — | — |
| content | dialog content， support render function | String, Function | — | — |
| mode | dialog mode | String | alert / confirm / prompt | alert |
| type | dailog level type | String | success / info / error / warning | — |
| icon | dialog icon | String | — | — |
| iconSize | icon size | Number | — | 24 |
| width | dialog width | Number / String | — | 350 |
| maxWidth | max width | Number / String | — | 80% |
| className | dialog class | String | — | — |
| transition | transition animate | String | slide-top / slide-bottom / slide-left / slide-right / fade / scale | scale |
| beforeClose | before close callback  (result, instance, done) | Function | — | — |
| okLabel | ok button label | String | — | — |
| cancelLabel | cancel button label | String | — | — |
| inputType | input type | String | — | — |
| inputPlaceholder | input placeholder | String | — | — |
| inputValue | input default value | String | — | — |
| validator | input validator function (val), will return { valid, message } | Function | — | — |

## Dependencies Muse-UI

* `mu-dialog`
* `mu-icon`
* `mu-text-field`
* `mu-button`

## Licence

muse-ui-message is open source and released under the MIT Licence.

Copyright (c) 2018 myron
