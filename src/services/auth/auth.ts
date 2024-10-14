import { client } from "../client"

// WIP: Mock delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const login = async (body: {
  username: string
  password: string
}): Promise<{ token: string }> => {
  await sleep(2000)
  // NOTE: It should be a POST request but because of mock service, it is a GET request.
  return client.get("login").json<{ token: string }>()
}

export { login }
