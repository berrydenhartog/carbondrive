require('./scss/main.scss');
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import { I18n } from '@aws-amplify/core';
//import Analytics from '@aws-amplify/analytics';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);
I18n.setLanguage('nl');

Auth.configure({
  //disable storage of cookies
  //todo: rememberMe ? localStorage : sessionStorage
  storage: window.sessionStorage
});

//Analytics.configure({
//});

//Analytics.autoTrack('pageView', { enable: true, type: 'SPA', })

Vue.prototype.$Amplify = Amplify
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
