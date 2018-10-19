import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/admin/Dashboard';
import Login from '@/components/admin/pages/Login';
import AdminCoupons from '@/components/admin/pages/Coupons';
import AdminOrders from '@/components/admin/pages/Orders';
import AdminProducts from '@/components/admin/pages/Products';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'coupons',
          name: 'AdminCoupons',
          component: AdminCoupons,
          meta: { requiresAuth: true },
        },
        {
          path: 'orders',
          name: 'AdminOrders',
          component: AdminOrders,
          meta: { requiresAuth: true },
        },
        {
          path: 'products',
          name: 'AdminProducts',
          component: AdminProducts,
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
});
