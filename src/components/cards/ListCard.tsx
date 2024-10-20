import classNames from "classnames"
import { useState, type FC } from "react"
import type { Task } from "../../types"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectUserById, selectUsers } from "../../store/slices/users"
import {
  deleteTask,
  selectError,
  selectStatus,
  updateTask,
} from "../../store/slices/tasks"
import { XCircleIcon } from "@heroicons/react/20/solid"
import { FormattedDate, FormattedMessage } from "react-intl"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "../button"
import { Alerts } from "../alerts"

const card = [
  "grid",
  "grid-cols-2",
  "lg:grid-cols-[1fr_0.8fr_0.8fr_1fr_0.8fr_0.2fr_0.4fr]",
  "justify-between",
  "items-center",
  "border",
  "border-gray-light",
  "border-solid",
  "p-4",
  "rounded-xl",
  "w-auto",
  "cursor-pointer",
  "mb-2",
  "gap-2",
  "bg-white",
]

const accordion = [
  "bg-gray-200",
  "p-4",
  "border",
  "border-gray-300",
  "rounded-xl",
  "bg-gray-200",
  "rounded-t-0",
  "pt-6",
  "relative",
]

const ListCard: FC<Task> = ({
  id,
  name,
  description,
  userId,
  status,
  priority,
  createdDate,
}) => {
  const statusBg =
    status === "to-do"
      ? "bg-secondary"
      : status === "done"
        ? "bg-green"
        : status === "blocked"
          ? "bg-red"
          : status === "in-progress"
            ? "bg-pink"
            : "bg-orange"

  const priorityBg =
    priority === "low"
      ? "bg-priority-low"
      : priority === "medium"
        ? "bg-priority-medium"
        : "bg-priority-high"

  const dispatch = useAppDispatch()
  const users = useAppSelector(selectUsers)
  const taskStatus = useAppSelector(selectStatus)
  const error = useAppSelector(selectError)
  const user = useAppSelector(state => selectUserById(state, userId))

  const [openToUpdate, setOpenToUpdate] = useState(false)
  const [taskUpdated, setTaskUpdated] = useState(false)
  const [formData, setFormData] = useState<Task>({
    id: id,
    userId: userId,
    priority: priority,
    status: status,
    name: name,
    description: description,
    createdDate: createdDate,
  })

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id))
  }

  const handleAccordion = () => {
    setOpenToUpdate(!openToUpdate)
  }

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
    setTaskUpdated(true)
    dispatch(updateTask(formData))
    setOpenToUpdate(false)
  }

  const renderAlerts = () => {
    if (!taskUpdated) return null

    if (taskStatus === "loading") {
      return <Alerts alertType="loading" />
    } else if (taskStatus === "idle") {
      return (
        <Alerts
          alertType="success"
          title="Success"
          description={<FormattedMessage id="user-update-success" />}
        />
      )
    } else if (taskStatus === "failed") {
      return (
        <Alerts
          alertType="error"
          title="Something went wrong!"
          description={error || <FormattedMessage id="user-update-error" />}
        />
      )
    }
    return null
  }

  return (
    <div className="relative group">
      <div className={classNames(card)}>
        <XCircleIcon
          className="absolute -top-2 -right-2 w-6 h-6 text-gray-400 hover:text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => handleDeleteTask(id)}
        />

        <h3 className={classNames("text-black")}>{name}</h3>
        <div className="flex flex-row items-center gap-2">
          <p className="lg:line-clamp-1 line-clamp-2">{user?.name}</p>
          <img src={user?.avatar} alt={"avatar"} width={40} height={40} />
        </div>
        <span className={`${statusBg} rounded-md w-fit p-1 uppercase`}>
          {status ? status : "to-do"}
        </span>
        <p className="lg:line-clamp-1 line-clamp-2">{description}</p>
        <FormattedDate
          value={createdDate}
          day="numeric"
          month="long"
          year="numeric"
        />
        <span className={`${priorityBg} w-4 h-4 rounded-full`} />
        <div className="cursor-pointer" onClick={() => handleAccordion()}>
          <FormattedMessage id="edit" />
        </div>
      </div>
      <AnimatePresence>
        {openToUpdate && (
          <motion.div
            className={classNames(accordion)}
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: 500 }}
            exit={{ opacity: 0, maxHeight: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 lg:grid-cols-6 gap-3 items-center"
            >
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full h-fit rounded-md border-0 p-1.5 min-h-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <select
                id="userID"
                name="userId"
                required
                value={formData.userId}
                onChange={handleChange}
                className="block w-full h-fit rounded-md border-0 p-1.5 min-h-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              <select
                id="status"
                name="status"
                required
                value={formData.status}
                onChange={handleChange}
                className="block w-full h-fit rounded-md border-0 p-1.5 min-h-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="to-do">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="blocked">Blocked</option>
                <option value="testing">Testing</option>
                <option value="done">Done</option>
              </select>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="block w-full h-fit rounded-md border-0 p-1.5 max-h-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />

              <select
                id="priority"
                name="priority"
                required
                value={formData.priority}
                onChange={handleChange}
                className="block w-full h-fit rounded-md border-0 p-1.5 min-h-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <div className="flex flex-col gap-2 ml-auto w-full justify-start lg:justify-end">
                <Button
                  buttonStyle="secondary"
                  label={<FormattedMessage id="cancel" />}
                  onClick={() => setOpenToUpdate(false)}
                />
                <Button
                  buttonStyle="primary"
                  label={<FormattedMessage id="save" />}
                  type="submit"
                />
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      {renderAlerts()}
    </div>
  )
}

export { ListCard }
