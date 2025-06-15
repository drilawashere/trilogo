import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Portfolio from './views/Portfolio.vue';
import Contact from './views/Contact.vue';

Vue.use(VueRouter);

const routes = [
  { 
    path: '/', 
    component: Home,
    name: 'home',
    meta: {
      title: 'Trilogoweb - High-Converting Website Design'
    }
  },
  { 
    path: '/about', 
    component: About,
    name: 'about',
    meta: {
      title: 'About Trilogoweb - Conversion-Focused Web Design'
    }
  },
  { 
    path: '/portfolio', 
    component: Portfolio,
    name: 'portfolio',
    meta: {
      title: 'Portfolio - Trilogoweb High-Converting Website Design'
    }
  },
  { 
    path: '/contact', 
    component: Contact,
    name: 'contact',
    meta: {
      title: 'Contact Trilogoweb - Get a Quote for Your Website Project'
    }
  },
  {
    // Redirect any unmatched routes to the home page
    path: '*',
    redirect: '/'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
  // Scroll to the top of the page when navigating to a new route
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

// Handle page titles
router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || 'Trilogoweb - High-Converting Website Design';
  });
});

export default router;