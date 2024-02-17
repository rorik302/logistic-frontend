import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"
import routes from "@/router/routes"

export type RouteMeta = {
  layout?: "AuthLayout" | "DefaultLayout"
}

export type Route = RouteRecordRaw & {
  meta?: RouteMeta
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
