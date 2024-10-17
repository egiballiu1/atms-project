import type { FC } from "react"
import { useState } from "react"
import { useAppDispatch } from "../../../../app/hooks"
import { createUser } from "../../../../store/slices/users"
import { Button } from "../../../../components"
import type { User } from "../../../../types"

const UserCreateForm: FC = () => {
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    role: "user",
    avatar: "",
  })

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
    console.log(formData)
    dispatch(createUser(formData))
    setFormData({
      name: "",
      email: "",
      role: "user",
      avatar: "",
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor="name"
        className="block text-sm font-medium leading-6 text-gray-900 mb-2"
      >
        Username :
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
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900 mb-2"
      >
        Email :
        <input
          id="email"
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          autoComplete="text"
          className="block w-full rounded-md border-0 p-1.5 min-h-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </label>

      <label
        htmlFor="role"
        className="block text-sm font-medium leading-6 text-gray-900 mb-2"
      >
        Role:
        <select
          id="role"
          name="role"
          required
          value={formData.role}
          onChange={handleChange}
          className="block w-full rounded-md border-0 p-1.5 min-h-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </label>

      <div className="mt-4">
        <Button label="Add User" type="submit" buttonStyle="primary" />
      </div>
    </form>
  )
}

export { UserCreateForm }
