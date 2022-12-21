import Vue from 'vue';
import Dialog from 'muse-ui/src/Dialog';
import Button from 'muse-ui/src/Button';
import Icon from 'muse-ui/src/Icon';
import TextField from 'muse-ui/src/TextField';
import Message from './index';
import 'muse-ui/src/styles/theme.less';

Vue.use(Dialog);
Vue.use(Button);
Vue.use(Icon);
Vue.use(TextField);

if (typeof window !== undefined && window.Vue) window.Vue.use(Message);

export default Message;
