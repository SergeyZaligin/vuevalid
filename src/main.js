import Vue from 'vue';
import App from './App.vue';
import Car from './Car.vue';
import Counter from './Counter.vue';

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

import colorDerective from './color';

export const eventEmitter = new Vue();

Vue.directive('colored', colorDerective);

Vue.component('app-car', Car);
Vue.component('app-counter', Counter);

new Vue({
  el: '#app',
  render: h => h(App)
})


