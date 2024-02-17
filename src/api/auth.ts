import useAuth from "@/stores/auth"
import useFetch from "@/composables/useFetch"

const authService = {
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
