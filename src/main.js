import Vue from 'vue'
import App from './App.vue'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import 'muse-ui-loading/dist/muse-ui-loading.css'; // load css
import Toast from 'muse-ui-toast';
// import theme from 'muse-ui/lib/theme';
// theme.use('light');
import 'muse-ui-message/dist/muse-ui-message.css';
import Message from 'muse-ui-message';
import Loading from 'muse-ui-loading';
Vue.config.productionTip = false
Vue.use(MuseUI);
Vue.use(Message);
Vue.use(Loading);
Vue.use(Toast);
new Vue({
	render: h => h(App)
}).$mount('#app')
