import classNames from "classnames"
import type { FC } from "react"
import type { Task } from "../../types"

const card = [
  "grid",
  "grid-cols-1",
  "lg:grid-cols-[1fr_0.3fr_0.3fr_2fr]",
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
]

const nameStyle = ["font-bold", "text-black", "pb-2"]

const ListCard: FC<Task> = ({ name, description, userId, status }) => {
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

  return (
    <div className={classNames(card)}>
      <h3 className={classNames(nameStyle)}>{name}</h3>
      <img src={userId} alt={name} width={40} height={40} />
      <span className={`${statusBg} rounded-md w-fit p-1 uppercase`}>
        {status ? status : "to-do"}
      </span>
      <p className="lg:line-clamp-1 line-clamp-2">{description}</p>
    </div>
  )
}

export { ListCard }
