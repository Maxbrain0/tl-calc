import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
// import VeeValidate from 'vee-validate';

// Import fontawesome 
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import './assets/styles/theme.scss'

// Add desired icons to font awesome library
library.add(faGithub, faLinkedin, faGlobe)

// Create font awesome component
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Vue.use(VeeValidate);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
