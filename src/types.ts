type Task = {
  id: string
  userId: string
  priority?: "low" | "medium" | "high"
  status?: "to-do" | "in-progress" | "blocked" | "testing" | "done"
  name: string
  description: string
}

type User = {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  avatar: string
}

export type { Task, User }
