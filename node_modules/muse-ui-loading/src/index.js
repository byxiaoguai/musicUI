import Vue from 'vue';
import config from './config';
import loadingOpt from './loading';

const LoadingConstructor = Vue.extend(loadingOpt);
const isServer = typeof window === 'undefined';
const Loading = function (options = {}) {
  if (isServer) return;
  const target = options.target && typeof options.target.appendChild === 'function'
    ? options.target : document.body;
  if (target._isLoading) return;

  let loading = new LoadingConstructor({
    el: document.createElement('div'),
    propsData: {
      ...config,
      fixed: !options.target,
      ...options
    }
  });

  target.appendChild(loading.$el);
  target._isLoading = true;
  loading.show = true;
  return {
    instance: loading,
    close () {
      if (!loading) return;
      loading.show = false;
      this.instance && (this.instance = null);
      setTimeout(() => {
        loading.$el.parentNode && loading.$el.parentNode.removeChild(loading.$el);
        loading.$destroy();
        loading = null;
        target._isLoading = false;
      }, 500);
    }
  };
};

function toggleLoading (el, isLoading) {
  if (isLoading) {
    const options = {
      target: el
    };
    el.hasAttribute('data-mu-loading-color') && (options.color = el.getAttribute('data-mu-loading-color'));
    el.hasAttribute('data-mu-loading-overlay-color') && (options.overlayColor = el.getAttribute('data-mu-loading-overlay-color'));
    el.hasAttribute('data-mu-loading-text') && (options.text = el.getAttribute('data-mu-loading-text'));
    el.hasAttribute('data-mu-loading-size') && (options.size = Number(el.getAttribute('data-mu-loading-size') || config.size));
    el.hasAttribute('data-mu-loading-class') && (options.className = el.getAttribute('data-mu-loading-class'));
    el._loading = Loading(options);
  } else {
    if (el._loading) {
      el._loading.close();
      el._loading = null;
    };
  }
}

const directive = {
  name: 'loading',
  inserted (el, { value }) {
    toggleLoading(el, value);
  },
  update (el, { value }) {
    if (el._loading) {
      !value && toggleLoading(el, false);
    } else {
      value && toggleLoading(el, true);
    }
  },
  unbind (el, binding) {
    if (el._loading) el._loading.close();
  }
};

Loading.config = function (options) {
  if (!options || Array.isArray(options) || typeof options !== 'object') return config;
  for (const key in options) {
    if (!options.hasOwnProperty(key)) continue;
    config[key] = options[key];
  }
  return config;
};

Loading.install = function (Vue, options) {
  Loading.config(options);
  Vue.prototype.$loading = Loading;
  Vue.directive(directive.name, directive);
};

export default Loading;
