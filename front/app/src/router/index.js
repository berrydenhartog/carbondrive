import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/work-in-progress',
    name: 'WorkInProgress',
    component: () => import(/* webpackChunkName: "WorkInProgress" */  '@/views/WorkInProgress.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "Contact" */  '@/views/Contact.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */  '@/views/Login.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import(/* webpackChunkName: "Account" */  '@/views/Account.vue'),
    meta: { requiresAuth: true},
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
		if (to.hash) {
      return { selector: to.hash }
		} else if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 }
    }
	}
})

// implement protected routes for only signed in users
router.beforeResolve((to, _, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    Vue.prototype.$Amplify.Auth.currentAuthenticatedUser().then((data) => {
      if (data && data.signInUserSession) {
        next()
      } 
    }).catch((e) => {
      console.log('You are trying to access a protected route. Please sign in.',e)
      next({
        name: 'Login',
        query: {
          redirect: to.fullPath,
        }
      });
    });
  }
  next()
})

export default router
