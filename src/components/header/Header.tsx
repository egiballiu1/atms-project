import classNames from "classnames"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logout, selectIsAuthenticated } from "../../store/slices/auth"
import { Button } from "../button"
import { LanguageSelect } from "../language-select"

const container = [
  "px-4",
  "py-4",
  "lg:px-8",
  "lg:max-w-full",
  "mx-auto",
  "w-full",
  "grid",
  "grid-cols-[1fr_0.5fr]",
  "justify-between",
  "items-center",
]

const buttonContainer = [
  "flex",
  "flex-col",
  "lg:flex-row",
  "items-end",
  "lg:justify-end",
  "gap-2",
  "lg:gap-5"
]

const Header = () => {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className={classNames("bg-primary sticky top-0")}>
      <div className={classNames(container)}>
        <a href="/" className={classNames('w-fit')}>
          <img src="/logo.svg" alt="ATMS logo" width={60} height={60} />
        </a>
        <div className={classNames(buttonContainer)}>
          <LanguageSelect />
          {isAuthenticated && (
            <Button
              buttonStyle="secondary"
              onClick={handleLogout}
              label="Log Out"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export { Header }
