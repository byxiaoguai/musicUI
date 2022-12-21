/* muse-ui-toast myron.liu version 0.3.0 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(require('vue'));

var config = {
  position: 'bottom',
  time: 2000,
  closeIcon: 'close',
  close: true,
  successIcon: 'check_circle',
  infoIcon: 'info',
  warningIcon: 'priority_high',
  errorIcon: 'warning'
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var isServer = typeof window === 'undefined';
var index = 20141223;
var Message = Vue.extend({
  name: 'toast-message',
  data: function data() {
    return {
      messages: []
    };
  },

  methods: {
    createAction: function createAction(h, action, actionClick, item) {
      var isIcon = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      return h('mu-button', {
        props: {
          icon: isIcon,
          flat: !isIcon,
          color: item.color ? '#fff' : 'secondary'
        },
        style: isIcon ? {
          width: '36px',
          height: '36px'
        } : {},
        slot: 'action',
        on: {
          click: function click() {
            return actionClick && actionClick(item.id);
          }
        }
      }, [action]);
    },
    message: function message(options) {
      var id = 'toast_id_' + index++;
      this.messages.push(_extends({}, options, {
        id: id,
        open: true
      }));
      return id;
    },
    close: function close(id) {
      var _this = this;

      if (!id) return;
      var item = this.messages.filter(function (item) {
        return item.id === id;
      })[0];
      if (!item) return;
      item.open = false;

      setTimeout(function () {
        if (!_this.messages) return;
        var messageIndex = _this.messages.indexOf(item);
        if (messageIndex === -1) return;
        _this.messages.splice(messageIndex, 1);
      }, 500);
    }
  },
  render: function render(h) {
    var _this2 = this;

    return h('div', {
      staticClass: 'mu-toast-plugin',
      style: {
        display: 'none'
      }
    }, this.messages.map(function (item) {
      var closeBtn = item.close ? _this2.createAction(h, h('mu-icon', {
        props: {
          value: config.closeIcon
        },
        style: {
          'margin-right': 0
        }
      }), function (id) {
        return _this2.close(id);
      }, item, true) : undefined;

      return h('mu-snackbar', {
        props: {
          color: item.color,
          textColor: item.textColor,
          open: item.open,
          position: item.position
        },
        key: item.id
      }, [item.icon ? h('mu-icon', {
        props: {
          left: true,
          value: item.icon
        }
      }) : ''].concat(toConsumableArray(item.actions && item.actions.length > 0 ? item.actions.map(function (_ref) {
        var action = _ref.action,
            click = _ref.click;
        return _this2.createAction(h, action, click, item);
      }) : []), [item.message, closeBtn]));
    }));
  }
});

var message = void 0;

function openMessage(options) {
  if (isServer) return;
  if (!message) {
    message = new Message({
      el: document.createElement('div')
    });
    document.body.appendChild(message.$el);
  }
  return message.message(options);
}

function closeMessage(id) {
  if (!message) return;
  message.close(id);
}

var Toast = {
  config: function config$$1(options) {
    if (!options || Array.isArray(options) || (typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') return config;
    for (var key in options) {
      if (!options.hasOwnProperty(key)) continue;
      config[key] = options[key];
    }
    return config;
  },
  message: function message(options) {
    if (!options) return;
    options = typeof options === 'string' ? { message: options } : options;
    var opt = _extends({
      time: config.time,
      position: config.position,
      close: config.close
    }, options);
    var id = openMessage(opt);
    if (opt.time > 0) {
      setTimeout(function () {
        return closeMessage(id);
      }, opt.time);
    }

    return id;
  }
};

['success', 'error', 'info', 'warning'].forEach(function (type) {
  Toast[type] = function (options) {
    if (!options) return;
    options = typeof options === 'string' ? {
      message: options,
      color: type,
      icon: config[type + 'Icon']
    } : _extends({}, options, {
      color: type,
      icon: config[type + 'Icon']
    });
    return Toast.message(options);
  };
});

Toast.close = function (id) {
  return closeMessage(id);
};

Toast.install = function (Vue$$1, options) {
  Toast.config(options);
  Vue$$1.prototype.$toast = Toast;
};

module.exports = Toast;
