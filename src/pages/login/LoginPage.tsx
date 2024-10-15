import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  login,
  logout,
  selectError,
  selectIsAuthenticated,
  selectStatus,
  selectToken,
  selectUser,
} from "../../store/slices/auth"
import { useEffect } from "react"
import { Layout } from "../../components/layout"

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const isAuthenticated = useAppSelector(selectIsAuthenticated)
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

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  return (
    <Layout>
      <div>Login</div>
      <div>User: {JSON.stringify(user)}</div>
      <div>Token: {token}</div>
      <div>Error: {error}</div>
      <div>Status: {status}</div>
      <div>is authenticated? {isAuthenticated}</div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </Layout>
  )
}

export { LoginPage }
