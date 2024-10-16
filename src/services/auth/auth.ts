import { client } from "../client"
import { putCallToSleep } from "../utils"

const login = async (body: {
  username: string
  password: string
}): Promise<{ token: string }> => {
  await putCallToSleep()

  // NOTE: We do this to simulate a different response for the admin user.
  if (body.username === "admin") {
    return client.get("login-admin").json<{ token: string }>()
  }

  // NOTE: It should be a POST request but because of mock service, it is a GET request.
  return client.get("login-user").json<{ token: string }>()
}

export { login }
