import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VeeValidate from 'vee-validate';

import './assets/styles/theme.scss'

Vue.use(VeeValidate);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
