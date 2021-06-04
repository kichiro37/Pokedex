
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', 
        component: () => import('pages/Index.vue')
      }
    ]
  },

  {
    path: '/',
    component: () => import('pages/Index.vue'),
    children: [
      { path: '/inf', 
        component: () => import('components/PokeInf.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
