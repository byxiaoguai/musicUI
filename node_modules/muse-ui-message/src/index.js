import Vue from 'vue';
import config from './config';
import ModalOpt from './modal';

const Modal = Vue.extend(ModalOpt);

const isServer = typeof window === 'undefined';
const instances = [];
const Message = function (options) {
  if (isServer) return;
  return new Promise((resolve) => {
    let modal = new Modal({
      el: document.createElement('div'),
      propsData: {
        ...config,
        icon: config[options.type + 'Icon'] || '',
        ...options
      }
    });
    document.body.appendChild(modal.$el);
    modal.open = true;
    if (modal.mode === 'prompt') {
      setTimeout(() => {
        modal.$el && modal.$el.querySelector('input').focus();
      }, 200);
    }

    instances.push(modal);
    modal.$on('close', function (result, value) {
      setTimeout(() => {
        modal.$el && modal.$el.parentNode && modal.$el.parentNode.removeChild(modal.$el);
        modal.$destroy();
        modal = null;
      }, 500);

      const index = instances.indexOf(modal);
      if (index !== -1) {
        instances.splice(index, 1);
      }
      return resolve({ result, value });
    });
  });
};

Message.config = function (options) {
  if (!options || Array.isArray(options) || typeof options !== 'object') return config;
  for (const key in options) {
    if (!options.hasOwnProperty(key)) continue;
    config[key] = options[key];
  }
  return config;
};

Message.close = function () {
  instances.forEach((modal) => {
    modal.close(false);
  });
};

['alert', 'confirm', 'prompt'].forEach((mode) => {
  Message[mode] = function (content, options) {
    if (!content && arguments.length < 2) return;
    let title = '';
    switch (arguments.length) {
      case 1:
        options = {};
        break;
      case 2:
        if (typeof options === 'string') {
          title = options;
          options = {};
        }
        break;
      default:
        title = arguments[1];
        options = arguments[2];
        break;
    }
    return Message({
      title,
      content,
      ...options,
      mode: mode
    });
  };
});

Message.install = function (Vue, options) {
  Message.config(options);
  Vue.prototype.$message = Message;
  Vue.prototype.$alert = Message.alert;
  Vue.prototype.$confirm = Message.confirm;
  Vue.prototype.$prompt = Message.prompt;
};

export default Message;
