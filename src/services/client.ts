import ky from "ky"

const BASE_URL = "http://localhost:3000"

const client = ky.extend({ prefixUrl: BASE_URL })

export { client }
