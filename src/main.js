import Vue from 'vue';
import App from './App.vue';
import Car from './Car.vue';
import Counter from './Counter.vue';

import VueRouter from 'vue-router';
import router from './routes';

Vue.use(VueRouter);

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

import VueResource from 'vue-resource';
Vue.use(VueResource);

Vue.http.options.root = 'http://localhost:3000/';


import colorDerective from './color';

export const eventEmitter = new Vue();

Vue.directive('colored', colorDerective);

Vue.component('app-car', Car);
Vue.component('app-counter', Counter);

new Vue({
  el: '#app',
  render: h => h(App),
  router
})


