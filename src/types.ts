type Task = {
  id: string
  userId: string
  priority?: "low" | "medium" | "high"
  status?: "to-do" | "in-progress" | "blocked" | "testing" | "done"
  name: string
  description: string
  createdDate?: Date
}

type User = {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  avatar: string
}

type Language = {
  id: string
  code: string
}

export type { Task, User, Language }
