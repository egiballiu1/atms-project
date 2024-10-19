import { type FC } from "react"
import { type Task } from "../../types"
import classNames from "classnames"
import { XCircleIcon } from "@heroicons/react/20/solid"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { deleteTask } from "../../store/slices/tasks"
import { selectUserById } from "../../store/slices/users"

const card = [
  "flex",
  "flex-col",
  "justify-between",
  "border",
  "border-gray-light",
  "border-solid",
  "p-4",
  "rounded-xl",
  "w-auto",
  "shadow-md",
  "gap-3",
  "cursor-pointer",
  "h-full",
]

const titleStyle = ["font-bold", "text-black", "pb-2"]

const GridCard: FC<Task> = ({
  id,
  userId,
  name,
  description,
  status,
  priority,
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
        <h3 className={classNames(titleStyle)}>{name}</h3>
        <p className="line-clamp-2">{description}</p>

        <div className="flex justify-between items-center">
          <span className={`${statusBg} rounded-md w-fit p-1 uppercase`}>
            {status ? status : "to-do"}
          </span>
          <div>
            <img src={user?.avatar} alt={name} width={40} height={40} />
            <p className="lg:line-clamp-1 line-clamp-2">{user?.name}</p>
          </div>

          <span className={`${priorityBg} w-4 h-4 rounded-full`} />
        </div>
      </div>
    </div>
  )
}

export { GridCard }
