import { client } from "../client"

const login = async (body: {
  username: string
  password: string
}): Promise<{ token: string }> => {
  // NOTE: It should be a POST request but because of mock service, it is a GET request.
  return client.get("login").json<{ token: string }>()
}

export { login }
