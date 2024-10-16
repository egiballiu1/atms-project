import type { FC } from "react"
import { useState } from "react"
import { useAppDispatch } from "../../../../app/hooks"
import { createUser } from "../../../../store/slices/users"
import { Button } from "../../../../components"

type User = {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  avatar: string
}

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
    dispatch(createUser(formData))
    // Add your form submission logic here
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Role:
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Avatar URL:
          <input
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <Button label="Create User" type="submit" buttonStyle="primary" />
    </form>
  )
}

export { UserCreateForm }
