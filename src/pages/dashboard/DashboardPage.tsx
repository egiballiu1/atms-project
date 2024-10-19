import { useState } from "react"
import { Layout } from "../../components/layout"
import { TasksFilter, TasksGrid, TasksList, UsersList } from "./components"
import classNames from "classnames"
import { useAppSelector } from "../../app/hooks"
import { selectUser } from "../../store/slices/auth"

const dashboardMenuItem = [
  "block",
  "w-full",
  "py-4",
  "px-8",
  "hover:bg-primary-25",
  "text-center",
  "lg:text-left",
]

const DashboardPage = () => {
  const [activeMenu, setActiveMenu] = useState("list")

  const user = useAppSelector(selectUser)

  const renderContent = () => {
    switch (activeMenu) {
      case "list":
        return (
          <>
            <TasksFilter />
            <TasksList />
          </>
        )
      case "grid":
        return (
          <>
            <TasksFilter />
            <TasksGrid />
          </>
        )
      case "users":
        return <UsersList />
    }
  }

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] lg:h-screen ">
        <div className="bg-gray-lighter text-black font-bold lg:sticky lg:top-[100px] lg:left-0 z-50">
          <ul
            className={`grid ${user?.role === "admin" ? "grid-cols-3" : "grid-cols-2"} lg:grid-cols-1`}
          >
            <li>
              <button
                className={classNames(dashboardMenuItem, {
                  "bg-primary-25": activeMenu === "list",
                })}
                onClick={() => setActiveMenu("list")}
              >
                List
              </button>
            </li>
            <li>
              <button
                className={classNames(dashboardMenuItem, {
                  "bg-primary-25": activeMenu === "grid",
                })}
                onClick={() => setActiveMenu("grid")}
              >
                Grid
              </button>
            </li>
            {user?.role === "admin" && (
              <li>
                <button
                  className={classNames(dashboardMenuItem, {
                    "bg-primary-25": activeMenu === "users",
                  })}
                  onClick={() => setActiveMenu("users")}
                >
                  Users
                </button>
              </li>
            )}
          </ul>
        </div>

        <div className="p-8 w-auto overflow-x-hidden">{renderContent()}</div>
      </div>
    </Layout>
  )
}

export { DashboardPage }
