import type { Task } from "../../types"
import { client } from "../client"
import { putCallToSleep } from "../utils"

const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  await putCallToSleep()

  return client.post("tasks", { json: task }).json<Task>()
}

const getTasks = async (): Promise<Task[]> => {
  await putCallToSleep()

  return client.get("tasks").json<Task[]>()
}

const getTask = async (id: string): Promise<Task> => {
  await putCallToSleep()

  return client.get(`tasks/${id}`).json<Task>()
}

const updateTask = async (task: Task): Promise<Task> => {
  await putCallToSleep()

  return client.put(`tasks/${task.id}`, { json: task }).json<Task>()
}

const deleteTask = async (id: string): Promise<void> => {
  await putCallToSleep()

  return client.delete(`tasks/${id}`).json<void>()
}

export { createTask, getTasks, getTask, updateTask, deleteTask }
