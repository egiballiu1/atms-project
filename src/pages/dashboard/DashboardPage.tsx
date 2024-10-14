import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logout, selectIsAuthenticated } from "../../store/slices/auth"
import { useNavigate } from "react-router-dom"

const DashboardPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const handleLogout = () => {
    dispatch(logout())
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  return (
    <>
      <div>Dashboard Page</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export { DashboardPage }
