import classNames from "classnames"
import type { FC } from "react"
import type { Task } from "../../types"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectUserById } from "../../store/slices/users"
import { deleteTask } from "../../store/slices/tasks"
import { XCircleIcon } from "@heroicons/react/20/solid"
import { FormattedDate } from "react-intl"

const card = [
  "grid",
  "grid-cols-2",
  "lg:grid-cols-[1fr_0.8fr_0.8fr_1fr_0.8fr_0.2fr]",
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
]

const nameStyle = ["font-bold", "text-black"]

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

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id))
  }

  const user = useAppSelector(state => selectUserById(state, userId))

  return (
    <div className="relative group">
      <div className={classNames(card)}>
        <XCircleIcon
          className="absolute -top-2 -right-2 w-6 h-6 text-gray-400 hover:text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => handleDeleteTask(id)}
        />

        <h3 className={classNames(nameStyle)}>{name}</h3>
        <div className="flex flex-row items-center gap-2">
          <p className="lg:line-clamp-1 line-clamp-2">{user?.name}</p>
          <img src={user?.avatar} alt={"avatar"} width={40} height={40} />
        </div>
        <span className={`${statusBg} rounded-md w-fit p-1 uppercase`}>
          {status ? status : "to-do"}
        </span>
        <p className="lg:line-clamp-1 line-clamp-2 order-5 lg:order-4">
          {description}
        </p>
        <FormattedDate
          value={createdDate}
          day="numeric"
          month="long"
          year="numeric"
        />
        <span
          className={`${priorityBg} w-4 h-4 rounded-full order-4`}
        />
      </div>
    </div>
  )
}

export { ListCard }
