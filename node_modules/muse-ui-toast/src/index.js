import config from './config';
import { openMessage, closeMessage } from './message';

const Toast = {
  config (options) {
    if (!options || Array.isArray(options) || typeof options !== 'object') return config;
    for (const key in options) {
      if (!options.hasOwnProperty(key)) continue;
      config[key] = options[key];
    }
    return config;
  },
  message (options) {
    if (!options) return;
    options = typeof options === 'string' ? { message: options } : options;
    const opt = {
      time: config.time,
      position: config.position,
      close: config.close,
      ...options
    };
    const id = openMessage(opt);
    if (opt.time > 0) {
      setTimeout(() => closeMessage(id), opt.time);
    }

    return id;
  }
};

[
  'success',
  'error',
  'info',
  'warning'
].forEach((type) => {
  Toast[type] = function (options) {
    if (!options) return;
    options = typeof options === 'string'
      ? {
        message: options,
        color: type,
        icon: config[type + 'Icon']
      } : {
        ...options,
        color: type,
        icon: config[type + 'Icon']
      };
    return Toast.message(options);
  };
});

Toast.close = (id) => closeMessage(id);

Toast.install = function (Vue, options) {
  Toast.config(options);
  Vue.prototype.$toast = Toast;
};

export default Toast;
