import type { Route } from "@/router"

const authRoutes: Route[] = [
  {
    path: "/login",
    component: () => import("@/views/auth/LoginView.vue"),
    name: "login",
    meta: {
      layout: "AuthLayout"
    }
  }
]

export default authRoutes
