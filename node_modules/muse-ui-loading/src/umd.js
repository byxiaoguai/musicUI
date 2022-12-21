import Vue from 'vue';
import { FadeTransition } from 'muse-ui/src/internal/transitions';
import Progress from 'muse-ui/src/Progress/CircularProgress';
import Loading from './index';
import 'muse-ui/src/styles/components/progress.less';
import 'muse-ui/src/styles/theme.less';

Vue.component(Progress.name, Progress);
Vue.component(FadeTransition.name, FadeTransition);

if (typeof window !== undefined && window.Vue) window.Vue.use(Loading);
export default Loading;
