import axios, { type AxiosError } from "axios"
import settings from "@/config"
import useAuth from "@/stores/auth"
import authService from "@/api/auth"

const getValidSubdomainFromUrl = () => {
  const hostnameSplit = document.location.hostname.split(".")
  if (hostnameSplit.length < 3) {
    throw new Error("Возможно, не указан поддомен в адресной строке")
  }
  return hostnameSplit[0]
}
const getBaseUrl = () => {
  const backendHostSplit = settings.BACKEND_HOST.split("://")
  const subdomain = getValidSubdomainFromUrl()
  return `${backendHostSplit[0]}://${subdomain}.${backendHostSplit[1]}`
}

const fetcher = axios.create({
  baseURL: `${getBaseUrl()}`,
  withCredentials: true
})

let isRefreshing = false
const retryQueue: (() => void)[] = []

fetcher.interceptors.request.use((config) => {
  const authStore = useAuth()
  if (authStore.accessToken) {
    config.headers.set("Authorization", `Bearer ${authStore.accessToken}`)
  }
  return config
})

fetcher.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { response, config } = error

    if (response && response.status === 401 && config) {
      const originalRequest = config!
      const authStore = useAuth()

      if (!isRefreshing) {
        isRefreshing = true
        authService.refreshToken().then(() => {
          isRefreshing = false
          retryQueue.map((callback) => callback())
        })
      }

      return new Promise((resolve) => {
        retryQueue.push(() => {
          originalRequest.headers.set("Authorization", `Bearer ${authStore.accessToken}`)
          resolve(fetcher(originalRequest))
        })
      })
    }

    return Promise.reject(error)
  }
)

export default fetcher
