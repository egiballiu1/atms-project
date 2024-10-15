type Task = {
  id: string
  userId: string
  priority?: "low" | "medium" | "high"
  status?: "to-do" | "in-progress" | "blocked" | "testing" | "done"
  name: string
  description: string
}

export type { Task }
