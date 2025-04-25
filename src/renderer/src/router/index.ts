import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

type DynamicImportComponent = Promise<typeof import('@renderer/layout/index.vue')>
const Layout: () => DynamicImportComponent = () => import('@renderer/layout/index.vue')

// @unocss-include
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        meta: { title: '首页', icon: 'i-q-home-16' },
        component: () => import('@renderer/views/home/index.vue')
      },
      {
        path: 'like',
        name: 'like',
        meta: { title: '喜欢', icon: 'i-q-heart-16' }, //i-q-heart-filled-16
        component: () => import('@renderer/views/like/index.vue')
      },
      {
        path: 'history',
        name: 'history',
        meta: { title: '最近播放', icon: 'i-q-clock-16' },
        component: () => import('@renderer/views/history/index.vue')
      },
      {
        path: 'download',
        name: 'download',
        meta: { title: '本地和下载', icon: 'i-q-layout-screen-vertical-16' },
        component: () => import('@renderer/views/download/index.vue')
      },
      {
        path: 'search/:searchType/:keyword',
        name: 'search',
        meta: { title: '搜索', hidden: true },
        component: () => import('@renderer/views/search/index.vue')
        // children: [
        //   {
        //     path: 'song/:keyword',
        //     name: 'searchSong',
        //     meta: { title: '搜索', icon: 'i-q-search-16' },
        //     component: () => import('@renderer/views/search/components/song-list.vue')
        //   }
        // ]
      },
      {
        path: '404',
        meta: { title: '404', icon: 'home-filled', hidden: true },
        component: () => import('@renderer/views/error/404.vue')
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
