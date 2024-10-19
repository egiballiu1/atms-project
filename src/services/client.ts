import ky from "ky"
import Cookies from "js-cookie"

const BASE_URL = "http://localhost:3000"

const client = ky.extend({
  prefixUrl: BASE_URL,
  hooks: {
    beforeRequest: [
      request => {
        const token = Cookies.get("atms-token")
        request.headers.set("Authorization", `Bearer ${token}`)
      },
    ],
  },
})

export { client }
