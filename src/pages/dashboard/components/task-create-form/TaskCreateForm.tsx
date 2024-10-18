import type { FC } from "react"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { getUsers, selectUsers } from "../../../../store/slices/users"
import { Alerts, Button } from "../../../../components"
import {
  createTask,
  selectStatus,
  selectError,
} from "../../../../store/slices/tasks"
import type { Task } from "../../../../types"

const TaskCreateForm: FC = () => {
  const dispatch = useAppDispatch()

  const users = useAppSelector(selectUsers)
  const status = useAppSelector(selectStatus)
  const error = useAppSelector(selectError)

  const [formSubmitted, setFormSubmitted] = useState(false)
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
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form Data:", formData)
    setFormSubmitted(true)
    dispatch(createTask(formData))
    setFormData({
      userId: "",
      priority: "medium",
      status: "to-do",
      name: "",
      description: "",
    })
  }

  useEffect(() => {
    dispatch(getUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderAlerts = () => {
    if (!formSubmitted) return null

    if (status === "loading") {
      return <Alerts alertType="loading" />
    } else if (status === "idle") {
      return (
        <Alerts
          alertType="success"
          title="Success"
          description="Task added succesfully!"
        />
      )
    } else if (status === "failed") {
      return (
        <Alerts
          alertType="error"
          title="Something went wrong!"
          description={error || "Task could not be added. Try again later."}
        />
      )
    }
    return null
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-gray-900 mb-2"
        >
          Title :
          <input
            id="name"
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            autoComplete="text"
            className="block w-full rounded-md border-0 p-1.5 min-h-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </label>

        <label
          htmlFor="userId"
          className="block text-sm font-medium leading-6 text-gray-900 mb-2"
        >
          User :
          <select
            id="userId"
            name="userId"
            required
            value={formData.userId}
            onChange={handleChange}
            className="block w-full rounded-md border-0 p-1.5 min-h-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="" disabled>
              Select a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>

        <label
          htmlFor="priority"
          className="block text-sm font-medium leading-6 text-gray-900 mb-2"
        >
          Priority:
          <select
            id="priority"
            name="priority"
            required
            value={formData.priority}
            onChange={handleChange}
            className="block w-full rounded-md border-0 p-1.5 min-h-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label
          htmlFor="status"
          className="block text-sm font-medium leading-6 text-gray-900 mb-2"
        >
          Status:
          <select
            id="status"
            name="status"
            required
            value={formData.status}
            onChange={handleChange}
            className="block w-full rounded-md border-0 p-1.5 min-h-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="to-do">To-Do</option>
            <option value="in-progress">In-Progress</option>
            <option value="blocked">Blocked</option>
            <option value="testing">Testing</option>
            <option value="done">Done</option>
          </select>
        </label>

        <label
          htmlFor="description"
          className="block text-sm font-medium leading-6 text-gray-900 mb-5"
        >
          Description:
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="block w-full rounded-md border-0 p-1.5 min-h-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </label>

        <Button label="Create Task" type="submit" buttonStyle="primary" />
      </form>
      {renderAlerts()}
    </>
  )
}

export { TaskCreateForm }
