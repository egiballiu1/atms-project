import type { FC, PropsWithChildren } from "react"
import { useAppSelector } from "../../app/hooks"
import { selectIsAuthenticated } from "../../store/slices/auth"
import { Navigate, useLocation } from "react-router-dom"

type RequiredAuthProps = PropsWithChildren

const RequiredAuth: FC<RequiredAuthProps> = ({ children }) => {
  const location = useLocation()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export { RequiredAuth }
