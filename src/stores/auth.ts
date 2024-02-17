import { defineStore } from "pinia"

const useAuth = defineStore("auth", {
  state: () => ({
    accessToken: ""
  }),
  actions: {
    setAccessToken(accessToken: string) {
      this.accessToken = accessToken
    }
  }
})

export default useAuth
