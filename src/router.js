import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import SignUp from './views/SignUp.vue';
import Main from './views/Main.vue';
import userServices from './lib/userServices.js';


Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        auth: false,
      },
    },
    {
      path: '/sign-up',
      name: 'signup',
      component: SignUp,
      meta: {
        auth: false,
      },
    },
    {
      path: '/',
      name: 'main',
      component: Main,
      meta: {
        auth: true,
      },
    },
  ],
});
router.beforeEach((to, _from, next) => {
  const isSignedIn = userServices.isSignedIn();
  if (to.meta && to.meta.auth !== undefined) {
    if (to.meta.auth) {
      if (!isSignedIn) {
        router.push('/Login');
      } else {
        next();
      }
    } else if (!isSignedIn) {
      next();
    } else {
      router.push({ name: 'main' });
    }
  } else {
    next();
  }
});
export default router;
