import Vue from 'vue';
import config from './config';
const isServer = typeof window === 'undefined';
let index = 20141223;
const Message = Vue.extend({
  name: 'toast-message',
  data () {
    return {
      messages: []
    };
  },
  methods: {
    createAction (h, action, actionClick, item, isIcon = false) {
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
          click: () => actionClick && actionClick(item.id)
        }
      }, [
        action
      ]);
    },
    message (options) {
      const id = 'toast_id_' + index++;
      this.messages.push({
        ...options,
        id,
        open: true
      });
      return id;
    },
    close (id) {
      if (!id) return;
      const item = this.messages.filter((item) => item.id === id)[0];
      if (!item) return;
      item.open = false;

      setTimeout(() => {
        if (!this.messages) return;
        const messageIndex = this.messages.indexOf(item);
        if (messageIndex === -1) return;
        this.messages.splice(messageIndex, 1);
      }, 500);
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'mu-toast-plugin',
      style: {
        display: 'none'
      }
    },
    this.messages.map((item) => {
      const closeBtn = item.close
        ? this.createAction(
          h,
          h('mu-icon', {
            props: {
              value: config.closeIcon
            },
            style: {
              'margin-right': 0
            }
          }),
          (id) => this.close(id),
          item,
          true
        ) : undefined;

      return h('mu-snackbar', {
        props: {
          color: item.color,
          textColor: item.textColor,
          open: item.open,
          position: item.position
        },
        key: item.id
      }, [
        item.icon ? h('mu-icon', {
          props: {
            left: true,
            value: item.icon
          }
        }) : '',
        ...(
          item.actions && item.actions.length > 0
            ? item.actions.map(
              ({ action, click }) => this.createAction(h, action, click, item)
            )
            : []
        ),
        item.message,
        closeBtn
      ]);
    }));
  }
});

let message;

export function openMessage (options) {
  if (isServer) return;
  if (!message) {
    message = new Message({
      el: document.createElement('div')
    });
    document.body.appendChild(message.$el);
  }
  return message.message(options);
}

export function closeMessage (id) {
  if (!message) return;
  message.close(id);
}

export default function getMessage () {
  return message;
};
