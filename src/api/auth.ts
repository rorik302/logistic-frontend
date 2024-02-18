import useAuth from "@/stores/auth"
import useFetch from "@/composables/useFetch"

export type LoginData = {
  email: string
  password: string
}

const authService = {
  login: async (data: LoginData) => {
    return useFetch("/api/v1/auth/login", { method: "POST", data }).execute()
  },
  refreshToken: async () => {
    return useFetch("/api/v1/auth/refresh", { method: "POST" })
      .execute()
      .then((response) => {
        const authStore = useAuth()
        const accessToken = response.headers["authorization"].split(" ")[1]
        authStore.setAccessToken(accessToken)
      })
  }
}

export default authService
