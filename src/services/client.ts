import ky from "ky"

const BASE_URL = "http://localhost:3000"

const client = ky.extend({
  prefixUrl: BASE_URL,
  hooks: {
    beforeRequest: [
      request => {
        const token = sessionStorage.getItem("atms-token")
        request.headers.set("Authorization", `Bearer ${token}`)
      },
    ],
  },
})

export { client }
