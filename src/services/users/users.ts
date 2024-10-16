import type { User } from "../../types"
import { client } from "../client"

// WIP: Mock delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const createUser = async (user: Omit<User, "id">): Promise<User> => {
  await sleep(2000)

  return client.post("users", { json: user }).json<User>()
}

const getUsers = async (): Promise<User[]> => {
  await sleep(2000)

  return client.get("users").json<User[]>()
}

const getUser = async (id: string): Promise<User> => {
  await sleep(2000)

  return client.get(`users/${id}`).json<User>()
}

const updateUser = async (user: User): Promise<User> => {
  await sleep(2000)

  return client.put(`users/${user.id}`, { json: user }).json<User>()
}

const deleteUser = async (id: string): Promise<void> => {
  await sleep(2000)

  return client.delete(`users/${id}`).json<void>()
}

export { createUser, getUsers, getUser, updateUser, deleteUser }
