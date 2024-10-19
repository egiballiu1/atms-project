import { XCircleIcon } from "@heroicons/react/20/solid"
import classNames from "classnames"
import { useAppDispatch } from "../../../../app/hooks"
import { type FC, useEffect } from "react"
import { deleteUser, getUsers } from "../../../../store/slices/users"
import type { User } from "../../../../types"

const card = [
  "grid",
  "grid-cols-2",
  "lg:grid-cols-4",
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

const UserListItem: FC<User> = ({ id, name, email, role, avatar }) => {
  const dispatch = useAppDispatch()

  const handleDeleteUser = (id: string) => {
    dispatch(deleteUser(id))
  }

  useEffect(() => {
    dispatch(getUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative group">
      <div className={classNames(card)}>
        <XCircleIcon
          className="absolute -top-2 -right-2 w-6 h-6 text-gray-400 hover:text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => handleDeleteUser(id)}
        />
        <h3 className={classNames(nameStyle)}>{name}</h3>
        <span className="lg:line-clamp-1 line-clamp-2">
          {email}
        </span>
        <span className="lg:line-clamp-1 line-clamp-2 capitalize">
          {role}
        </span>
        <img src={avatar} alt={"user logo"} width={40} height={40} />
      </div>
    </div>
  )
}

export { UserListItem }
