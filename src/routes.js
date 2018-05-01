import VueRouter from 'vue-router';
import Home from './pages/Home';
// import Cars from './pages/Cars';
import Car from './pages/Car';
import ErrorCmp from './pages/Error';
import CarFull from './pages/CarFull';

// layze load
const Cars = resolve => {
  require.ensure(['./pages/Cars.vue'], () => {
    resolve(
      require('./pages/Cars.vue')
    );
  });
};

export default new VueRouter({
  routes: [
    {
      path: '',
      component: Home
    },
    {
      path: '/cars',
      component: Cars
    },
    {
      path: '/car/:id',
      component: Car,
      children: [
        {
          path: 'full',
          component: CarFull,
          name: 'carFull',
          beforeEnter: (to, from, next) => {
            console.log('before enter');
            if(true){
              next(true);
            }else{
              next(false);
            }
          }
        }
      ]
    },
    {
      path: '/none',
      redirect: '/cars'
    },
    {
      path: '*',
      component: ErrorCmp
    }
  ],
  mode: 'history'
});
