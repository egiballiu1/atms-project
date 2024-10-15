import type { Task } from "../../types"
import { client } from "../client"

// WIP: Mock delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const createTask = async (task: Task): Promise<Task> => {
  await sleep(2000)

  return client.post("tasks", { json: task }).json<Task>()
}

const getTasks = async (): Promise<Task[]> => {
  await sleep(2000)

  return client.get("tasks").json<Task[]>()
}

const getTask = async (id: string): Promise<Task> => {
  await sleep(2000)

  return client.get(`tasks/${id}`).json<Task>()
}

const updateTask = async (task: Task): Promise<Task> => {
  await sleep(2000)

  return client.put(`tasks/${task.id}`, { json: task }).json<Task>()
}

const deleteTask = async (id: string): Promise<void> => {
  await sleep(2000)

  return client.delete(`tasks/${id}`).json<void>()
}

export { createTask, getTasks, getTask, updateTask, deleteTask }
