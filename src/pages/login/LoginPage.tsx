import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  login,
  logout,
  selectStatus,
  selectUser,
} from "../../store/slices/auth"

const LoginPage = () => {
  const dispatch = useAppDispatch()

  const user = useAppSelector(selectUser)
  const status = useAppSelector(selectStatus)

  const handleLogin = () => {
    dispatch(login())
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      <div>Login</div>
      <div>User: {JSON.stringify(user)}</div>
      <div>Status: {status}</div>
      <a href="/dashboard">Go to Dashboard</a>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export { LoginPage }
