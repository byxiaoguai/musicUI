import swipe from '../internal/directives/swipe';
import translateUtil from '../utils/translate';
import { transitionEnd } from '../utils/dom';

export default {
  name: 'mu-slide-picker-slot',
  directives: {
    swipe: swipe
  },
  props: {
    divider: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: ''
    },
    values: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    itemHeight: {
      type: Number,
      default: 36
    },
    value: {},
    textAlign: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    visibleItemCount: {
      type: Number,
      default: 5
    }
  },
  data: function data() {
    return {
      animate: false,
      startTop: 0,
      velocityTranslate: 0,
      prevTranslate: 0
    };
  },

  computed: {
    contentHeight: function contentHeight() {
      return this.itemHeight * this.visibleItemCount;
    },
    valueIndex: function valueIndex() {
      return this.values.indexOf(this.value);
    },
    dragRange: function dragRange() {
      var values = this.values;
      var visibleItemCount = this.visibleItemCount;
      return [-this.itemHeight * (values.length - Math.ceil(visibleItemCount / 2)), this.itemHeight * Math.floor(visibleItemCount / 2)];
    }
  },
  mounted: function mounted() {
    if (!this.divider) {
      this.doOnValueChange();
    }
  },

  methods: {
    value2Translate: function value2Translate(value) {
      var values = this.values;
      var valueIndex = values.indexOf(value);
      var offset = Math.floor(this.visibleItemCount / 2);
      if (valueIndex !== -1) {
        return (valueIndex - offset) * -this.itemHeight;
      }
    },
    translate2Value: function translate2Value(translate) {
      translate = Math.round(translate / this.itemHeight) * this.itemHeight;
      var index = -(translate - Math.floor(this.visibleItemCount / 2) * this.itemHeight) / this.itemHeight;
      return this.values[index];
    },
    doOnValueChange: function doOnValueChange() {
      var value = this.value;
      var wrapper = this.$refs.wrapper;
      translateUtil.translateElement(wrapper, null, this.value2Translate(value));
    },
    doOnValuesChange: function doOnValuesChange() {
      var _this = this;

      var el = this.$el;
      var items = el.querySelectorAll('.mu-slide-picker-item');
      Array.prototype.forEach.call(items, function (item, index) {
        translateUtil.translateElement(item, null, _this.itemHeight * index);
      });
    },
    handleStart: function handleStart() {
      this.startTop = translateUtil.getElementTranslate(this.$refs.wrapper).top;
    },
    handleMove: function handleMove(pos, drag, event) {
      var el = this.$refs.wrapper;
      var translate = this.startTop + pos.y;
      translateUtil.translateElement(el, 0, translate);
      this.velocityTranslate = translate - this.prevTranslate || translate;
      this.prevTranslate = translate;
    },
    handleEnd: function handleEnd(pos, drag, event) {
      var _this2 = this;

      var el = this.$refs.wrapper;
      var momentumRatio = 7;
      var currentTranslate = translateUtil.getElementTranslate(el).top;
      var momentumTranslate = void 0;
      if (pos.time < 300) {
        momentumTranslate = currentTranslate + this.velocityTranslate * momentumRatio;
      }
      var dragRange = this.dragRange;
      this.animate = true;
      transitionEnd(el, function () {
        _this2.animate = false;
      });
      this.$nextTick(function () {
        var translate = void 0;
        if (momentumTranslate) {
          translate = Math.round(momentumTranslate / _this2.itemHeight) * _this2.itemHeight;
        } else {
          translate = Math.round(currentTranslate / _this2.itemHeight) * _this2.itemHeight;
        }
        translate = Math.max(Math.min(translate, dragRange[1]), dragRange[0]);
        translateUtil.translateElement(el, null, translate);
        _this2.$emit('change', _this2.translate2Value(translate));
      });
    }
  },
  render: function render(h) {
    var _this3 = this;

    return h('div', {
      staticClass: 'mu-slide-picker-slot',
      class: {
        'mu-slide-picker-slot-divider': this.divider
      },
      style: {
        width: this.width
      },
      on: {
        touchmove: function touchmove(e) {
          e.preventDefault();
        }
      },
      directives: this.divider ? [] : [{
        name: 'swipe',
        value: {
          start: this.handleStart,
          move: this.handleMove,
          end: this.handleEnd
        }
      }]
    }, [this.divider ? h('div', {}, this.content) : h('div', {
      staticClass: 'mu-slide-picker-slot-wrapper',
      class: {
        animate: this.animate
      },
      style: {
        height: this.contentHeight + 'px'
      },
      ref: 'wrapper'
    }, this.values.map(function (item, index) {
      return h('div', {
        staticClass: 'mu-slide-picker-item',
        style: {
          'text-align': _this3.textAlign
        },
        class: {
          selected: item === _this3.value
        },
        key: 'pick-slot-' + index
      }, item.text || item);
    }))]);
  },

  watch: {
    values: function values(newVal) {
      if (this.valueIndex === -1) {
        this.value = (newVal || [])[0];
      }
    },
    value: function value() {
      this.doOnValueChange();
    }
  }
};