import Vue from 'vue';
import Snackbar from 'muse-ui/lib/Snackbar';
import Button from 'muse-ui/lib/Button';
import Icon from 'muse-ui/lib/Icon';
import Toast from './index';
import 'muse-ui/lib/styles/theme.less';

Vue.use(Snackbar);
Vue.use(Button);
Vue.use(Icon);

if (typeof window !== undefined && window.Vue) window.Vue.use(Toast);

export default Toast;
