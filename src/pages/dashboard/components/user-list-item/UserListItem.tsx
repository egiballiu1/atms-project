import { XCircleIcon } from "@heroicons/react/20/solid"
import classNames from "classnames"
import { useAppDispatch } from "../../../../app/hooks"
import { type FC, useState } from "react"
import { deleteUser, updateUser } from "../../../../store/slices/users"
import type { User } from "../../../../types"
import { Button } from "../../../../components"
import { FormattedMessage } from "react-intl"
import { motion, AnimatePresence } from "framer-motion"

const card = [
  "grid",
  "grid-cols-2",
  "lg:grid-cols-[1fr_1fr_1fr_1fr_0.5fr]",
  "justify-between",
  "items-center",
  "border",
  "border-gray-light",
  "border-solid",
  "p-4",
  "rounded-xl",
  "w-auto",
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

const nameStyle = ["font-bold", "text-black"]

const UserListItem: FC<User> = ({ id, name, email, role, avatar }) => {
  const dispatch = useAppDispatch()

  const [openToUpdate, setOpenToUpdate] = useState(false)
  const [formData, setFormData] = useState<User>({
    id: id,
    name: name,
    email: email,
    role: role,
    avatar: avatar,
  })

  const handleDeleteUser = (id: string) => {
    dispatch(deleteUser(id))
  }

  const handleAccordion = () => {
    setOpenToUpdate(!openToUpdate)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(updateUser(formData))
    setOpenToUpdate(false)
  }

  return (
    <div className="relative group mb-2">
      <div className={classNames(card)}>
        <XCircleIcon
          className="absolute -top-2 -right-2 w-6 h-6 text-gray-400 hover:text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => handleDeleteUser(id)}
        />
        <h3 className={classNames(nameStyle)}>{name}</h3>
        <span className="lg:line-clamp-1 line-clamp-2">{email}</span>
        <span className="lg:line-clamp-1 line-clamp-2 capitalize">{role}</span>
        <img src={avatar} alt={"user logo"} width={40} height={40} />
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
              className="grid grid-cols-3 lg:grid-cols-4 gap-3"
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
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full h-fit rounded-md border-0 p-1.5 min-h-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <select
                id="role"
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
                className="block w-full h-fit rounded-md border-0 p-1.5 min-h-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <div className="flex gap-2 ml-auto w-full justify-start lg:justify-end">
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
    </div>
  )
}

export { UserListItem }
