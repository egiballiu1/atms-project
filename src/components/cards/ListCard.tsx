import classNames from "classnames"
import type { FC } from "react"
import type { Task } from "../../types"
import { useAppSelector } from "../../app/hooks"
import { selectUserById } from "../../store/slices/users"

const card = [
  "grid",
  "grid-cols-2",
  "lg:grid-cols-[1fr_0.6fr_0.6fr_2fr_0.2fr]",
  "justify-between",
  "items-center",
  "border",
  "border-gray-light",
  "border-solid",
  "p-4",
  "rounded-xl",
  "w-auto",
  "cursor-pointer",
  "mb-1",
  "gap-2",
]

const nameStyle = ["font-bold", "text-black"]

const ListCard: FC<Task> = ({
  name,
  description,
  userId,
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

  const user = useAppSelector(state => selectUserById(state, userId))

  return (
    <div className={classNames(card)}>
      <h3 className={classNames(nameStyle)}>{name}</h3>
      <div className="flex flex-row items-center gap-2">
        <p className="lg:line-clamp-1 line-clamp-2">{user?.name}</p>
        {/* <img src={userId} alt={'user logo'} width={40} height={40} /> */}
      </div>
      <span className={`${statusBg} rounded-md w-fit p-1 uppercase`}>
        {status ? status : "to-do"}
      </span>
      <p className="lg:line-clamp-1 line-clamp-2 order-5 lg:order-4">
        {description}
      </p>
      <span
        className={`${priorityBg} w-4 h-4 rounded-full order-4 lg:order-4`}
      />
    </div>
  )
}

export { ListCard }
