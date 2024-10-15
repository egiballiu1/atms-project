import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { login, selectIsAuthenticated } from "../../store/slices/auth"
import { useEffect, useState } from "react"
import { Layout } from "../../components/layout"

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [form, setForm] = useState({ username: "", password: "" })

  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(login(form))
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </Layout>
  )
}

export { LoginPage }
