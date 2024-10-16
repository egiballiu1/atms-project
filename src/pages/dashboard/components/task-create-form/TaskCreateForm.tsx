import type { FC } from "react"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { getUsers, selectUsers } from "../../../../store/slices/users"
import { Button } from "../../../../components"
import { createTask } from "../../../../store/slices/tasks"

type Task = {
  id: string
  userId: string
  priority?: "low" | "medium" | "high"
  status?: "to-do" | "in-progress" | "blocked" | "testing" | "done"
  name: string
  description: string
}

const TaskCreateForm: FC = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectUsers)
  const [formData, setFormData] = useState<Omit<Task, "id">>({
    userId: "",
    priority: "medium",
    status: "to-do",
    name: "",
    description: "",
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target
    console.log("name", name)
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form Data:", formData)
    dispatch(createTask(formData))
  }

  useEffect(() => {
    dispatch(getUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log("Form Data:", formData)
  }, [formData])

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          User ID:
          <select name="userId" value={formData.userId} onChange={handleChange}>
            <option value="" disabled>
              Select a user
            </option>
            {users.map(user => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Priority:
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Status:
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="to-do">To-Do</option>
            <option value="in-progress">In-Progress</option>
            <option value="blocked">Blocked</option>
            <option value="testing">Testing</option>
            <option value="done">Done</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <Button label="Create Task" type="submit" buttonStyle="primary" />
    </form>
  )
}

export { TaskCreateForm }
