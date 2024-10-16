import type { User } from "../../types"
import { client } from "../client"
import { putCallToSleep } from "../utils"

const createUser = async (user: Omit<User, "id">): Promise<User> => {
  await putCallToSleep()

  return client.post("users", { json: user }).json<User>()
}

const getUsers = async (): Promise<User[]> => {
  await putCallToSleep()

  return client.get("users").json<User[]>()
}

const getUser = async (id: string): Promise<User> => {
  await putCallToSleep()

  return client.get(`users/${id}`).json<User>()
}

const updateUser = async (user: User): Promise<User> => {
  await putCallToSleep()

  return client.put(`users/${user.id}`, { json: user }).json<User>()
}

const deleteUser = async (id: string): Promise<void> => {
  await putCallToSleep()

  return client.delete(`users/${id}`).json<void>()
}

export { createUser, getUsers, getUser, updateUser, deleteUser }
