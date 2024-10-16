import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { selectIsAuthenticated } from "../../store/slices/auth"
import { useEffect } from "react"
import { Layout, LoginForm } from "../../components"

const LoginPage = () => {
  const navigate = useNavigate()

  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  return (
    <Layout>
      <LoginForm />
    </Layout>
  )
}

export { LoginPage }
