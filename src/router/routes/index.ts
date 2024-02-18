import type { Route } from "@/router"
import authRoutes from "@/router/routes/auth"

const routes: Route[] = [...authRoutes]

export default routes
