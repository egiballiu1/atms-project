import classNames from "classnames"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logout, selectIsAuthenticated } from "../../store/slices/auth"
import { Button } from "../button"
import { useState } from "react"
import {
  selectLanguage,
  setSelectedLanguage,
} from "../../store/slices/languages"

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
  const language = useAppSelector(selectLanguage)

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedLanguage(e.target.value))
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
      </div>

      <label
        htmlFor="languageSelect"
        className="block text-sm font-medium leading-6 text-gray-900 mb-2"
      >
        Select :
        <select
          id="languageSelect"
          name="languageSelect"
          value={language}
          onChange={handleChange}
          className="block w-full rounded-md border-0 p-1.5 min-h-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="en">En</option>
          <option value="it">It</option>
          <option value="de">De</option>
        </select>
      </label>
    </div>
  )
}

export { Header }
