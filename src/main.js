// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'bootstrap';
import axios from 'axios';
import VueAxios from 'vue-axios';

import App from './App';
import router from './router';
import './bus';

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

// 前端 axios 請求附帶 Cookies 設定要把 cookie 的開關打開
axios.defaults.withCredentials = true;

/* eslint-disable no-new */
/* eslint-disable */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.API_PATH}/api/user/check`;
    const vm = this;
    axios.post(api).then(response => {
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login',
        });
        vm.$bus.$emit('showError', response.data.message);
      }
    });
  } else {
    next();
  }
});
