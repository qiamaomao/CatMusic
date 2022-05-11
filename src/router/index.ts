import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "音乐馆",
    component: () => import("../pages/home/index.vue")
  },
  {
    path: "/Mv",
    name: "视频 (MV)",
    component: () => import("../pages/mv/index.vue")
  },
  {
    path: "/Mv/content/:id",
    name: "视频页",
    component: () => import("../pages/mv/content.vue")
  },
  {
    path: "/radio",
    name: "电台",
    component: () => import("../pages/radio/index.vue")
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router