import './modal.less';
export default {
  name: 'mu-modal',
  props: {
    title: String,
    icon: String,
    iconSize: Number,
    mode: {
      type: String,
      default: 'alert',
      validator (val) {
        return ['alert', 'confirm', 'prompt'].indexOf(val) !== -1;
      }
    },
    type: {
      type: String,
      default: '',
      validator: (val) => ['', 'success', 'info', 'warning', 'error'].indexOf(val) !== -1
    },
    content: [String, Function],
    width: [Number, String],
    maxWidth: [Number, String],
    className: String,
    transition: String,
    beforeClose: Function,
    okLabel: String,
    cancelLabel: String,
    inputType: String,
    inputPlaceholder: String,
    inputValue: [String, Number],
    validator: Function
  },
  data () {
    return {
      open: false,
      value: this.inputValue,
      errorText: ''
    };
  },
  methods: {
    handleClose (result) {
      if (this.beforeClose) {
        return this.beforeClose(result, this, () => this.close(result));
      }
      return this.close(result);
    },
    close (isOk) {
      if (isOk && this.mode === 'prompt' && this.validator) {
        const result = this.validator(this.value);
        if (!result.valid) {
          this.errorText = result.message;
          return;
        }
        this.errorText = '';
      }
      this.open = false;
      this.$emit('close', isOk, this.value);
      return isOk;
    },
    createInput (h) {
      if (this.mode !== 'prompt') return;
      return h('mu-text-field', {
        attrs: {
          type: this.inputType,
          placeholder: this.inputPlaceholder
        },
        props: {
          value: this.value,
          errorText: this.errorText,
          fullWidth: true
        },
        on: {
          input: val => (this.value = val),
          keydown: (e) => {
            if (e.keyCode === 13) {
              this.handleClose(true);
            }
          }
        }
      });
    },
    createContent (h) {
      const content = typeof this.content === 'function' ? this.content(h) : this.content;
      return h('div', {
        class: 'mu-modal-content'
      }, [
        this.icon ? h('mu-icon', {
          staticClass: 'mu-modal-icon',
          props: {
            value: this.icon,
            color: this.type,
            size: this.iconSize
          }
        }) : undefined,
        h('div', {
          staticClass: 'mu-modal-inner'
        }, [
          content,
          this.createInput(h)
        ])
      ]);
    },
    createActions (h) {
      const actions = [];
      actions.push(
        h('mu-button', {
          props: {
            flat: true,
            color: 'primary'
          },
          slot: 'actions',
          on: {
            click: () => this.handleClose(true)
          }
        }, this.okLabel)
      );
      if (this.mode !== 'alert') {
        actions.unshift(h('mu-button', {
          props: {
            flat: true
          },
          slot: 'actions',
          on: {
            click: () => this.handleClose(false)
          }
        }, this.cancelLabel));
      }
      return actions;
    }
  },
  render (h) {
    return h('mu-dialog', {
      props: {
        open: this.open,
        title: this.title,
        width: this.width,
        maxWidth: this.maxWidth,
        dialogClass: this.className,
        transition: this.transition,
        overlayClose: false,
        escPressClose: false
      }
    }, [
      this.createContent(h),
      ...this.createActions(h)
    ]);
  }
};
