import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

type DynamicImportComponent = Promise<typeof import('@renderer/layout/index.vue')>
const Layout: () => DynamicImportComponent = () => import('@renderer/layout/index.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        meta: { title: '首页', icon: 'home-filled', breadcrumb: false },
        component: () => import('@renderer/views/home/index.vue')
      },
      {
        path: '404',
        meta: { title: '首页', icon: 'home-filled', breadcrumb: false },
        component: () => import('@renderer/views/home/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, _, next) => {
  if (to.matched.length > 0) {
    return next()
  }
  return next('/404')
})

export default router
