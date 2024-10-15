import classNames from "classnames"
import type { FC } from "react"
import type { Task } from "../../types"

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
]

const titleStyle = ["font-bold", "text-black", "pb-2"]

const GridCard: FC<Task> = ({ name, description, userId, status }) => {
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
      <div className="grid grid-cols-[1fr_50px] gap-3">
        <h3 className={classNames(titleStyle)}>{name}</h3>
        <img src={userId} alt={name} width={40} height={40} />
      </div>
      <p className="line-clamp-2">{description}</p>
      <span className={`${statusBg} rounded-md w-fit p-1 uppercase`}>
        {status ? status : "to-do"}
      </span>
    </div>
  )
}

export { GridCard }
