import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { login, selectError, selectStatus } from "../../../../store/slices/auth"
import { Alerts } from "../../../../components"

const LoginForm = () => {
  const dispatch = useAppDispatch()
  const [htmlForm, sethtmlForm] = useState({ username: "", password: "" })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const status = useAppSelector(selectStatus)
  const error = useAppSelector(selectError)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    sethtmlForm({ ...htmlForm, [name]: value })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormSubmitted(true)
    dispatch(login(htmlForm))
  }

  const renderAlerts = () => {
    if (!formSubmitted) return null

    if (status === "loading") {
      return (
        <Alerts alertType="loading"/>
      )
    } else if (status === "idle") {
      return (
        <Alerts
          alertType="success"
          title="Success"
          description="Logged in successfully!"
        />
      )
    } else if (status === "failed") {
      return (
        <Alerts
          alertType="error"
          title="Something went wrong!"
          description={error || "Login failed. Try again later."}
        />
      )
    }
    return null
  }

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm max-w-[60%] m-auto">
      <div className="mt-10 sm:mx-auto">
        <h2 className="my-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Log in to your account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                required
                value={htmlForm.username}
                onChange={handleChange}
                autoComplete="text"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={htmlForm.password}
                onChange={handleChange}
                autoComplete="current-password"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Log in
          </button>
        </form>
        {renderAlerts()}
      </div>
    </div>
  )
}

export { LoginForm }
