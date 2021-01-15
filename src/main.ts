import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';

import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

// Style
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

// Composition API
import VueCompositionAPI from '@vue/composition-api';
Vue.use(VueCompositionAPI);

// CodeMirror
import VueCodemirror from 'vue-codemirror';
import 'codemirror/mode/python/python.js';
import 'codemirror/addon/selection/active-line.js';
// import '@/assets/codemirror/addon/hint/pyNEST-hint.js';

import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/base16-dark.css'
import 'codemirror/addon/hint/show-hint.css';
Vue.use(VueCodemirror);

// Production
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
