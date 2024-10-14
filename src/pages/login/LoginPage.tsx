import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  login,
  logout,
  selectError,
  selectStatus,
  selectToken,
  selectUser,
} from "../../store/slices/auth"

const LoginPage = () => {
  const dispatch = useAppDispatch()

  const user = useAppSelector(selectUser)
  const token = useAppSelector(selectToken)
  const error = useAppSelector(selectError)
  const status = useAppSelector(selectStatus)

  const handleLogin = () => {
    dispatch(login({ username: "admin", password: "admin" }))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      <div>Login</div>
      <div>User: {JSON.stringify(user)}</div>
      <div>Token: {token}</div>
      <div>Error: {error}</div>
      <div>Status: {status}</div>
      <a href="/dashboard">Go to Dashboard</a>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export { LoginPage }
