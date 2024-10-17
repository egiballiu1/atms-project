import classNames from "classnames"
import type { FC } from "react"
import type { Task } from "../../types"
import { XCircleIcon } from "@heroicons/react/20/solid"
import { useAppDispatch } from "../../app/hooks"
import { deleteTask } from "../../store/slices/tasks"

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
  name,
  description,
  userId,
  status,
  priority,
  id,
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
  return (
    <div className="relative group">
      <div className={classNames(card)}>
        <XCircleIcon
          className="absolute -top-2 -right-2 w-6 h-6 text-gray-400 hover:text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => handleDeleteTask(id)}
        />
        <div className="grid grid-cols-[1fr_50px] gap-3">
          <h3 className={classNames(titleStyle)}>{name}</h3>
          <img src={userId} alt={name} width={40} height={40} />
        </div>
        <p className="line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <span className={`${statusBg} rounded-md w-fit p-1 uppercase`}>
            {status ? status : "to-do"}
          </span>
          <span className={`${priorityBg} w-4 h-4 rounded-full`} />
        </div>
      </div>
    </div>
  )
}

export { GridCard }
