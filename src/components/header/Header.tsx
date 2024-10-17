import classNames from "classnames"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logout, selectIsAuthenticated } from "../../store/slices/auth"
import { Button } from "../button"

const container = [
  "px-4",
  "py-4",
  "lg:px-6",
  "lg:max-w-screen-lg",
  "xl:max-w-screen-xl",
  "2xl:max-w-full",
  "mx-auto",
  "w-full",
  "flex",
  "justify-between",
  "items-center",
]

const Header = () => {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className={classNames("header bg-primary sticky top-0")}>
      <div className={classNames(container)}>
        <a href="/" className={classNames()}>
          <img src="/logo.svg" alt="ATMS logo" width={60} height={60} />
        </a>
        {isAuthenticated && (
          <Button
            buttonStyle="secondary"
            onClick={handleLogout}
            label="Log Out"
          />
        )}
      </div>{" "}
    </div>
  )
}

export { Header }
