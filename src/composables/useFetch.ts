import fetcher from "@/api/axios"

interface FetchOptions {
  method: "GET" | "POST" | "PATCH" | "DELETE"
  data?: Record<string, any>
}

const useFetch = (url: string, options: FetchOptions) => {
  const execute = () => {
    return fetcher(url, options)
  }

  return { execute }
}

export default useFetch
