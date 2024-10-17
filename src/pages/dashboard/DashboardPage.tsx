import { useState } from "react"
import { Layout } from "../../components/layout"
import { TasksFilter, UsersList } from "./components"
import classNames from "classnames"
import { DashboardPageGrid } from "./DashboardPageGrid"

const dashboardMenuItem = [
  "block",
  "w-full",
  "p-4",
  "hover:bg-primary-25",
  "text-center",
  "lg:text-left",
]

const DashboardPage = () => {
  const [activeMenu, setActiveMenu] = useState("list")

  const renderContent = () => {
    switch (activeMenu) {
      case "list":
        return <TasksFilter />
      case "grid":
        return <DashboardPageGrid />
      case "users":
        return <UsersList />
    }
  }

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] lg:h-screen ">
        <div className="bg-gray-lighter text-black font-bold lg:sticky lg:top-[100px]">
          <ul className="grid grid-cols-2 lg:grid-cols-1">
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
          </ul>
        </div>

        <div className="p-8">{renderContent()}</div>
      </div>
    </Layout>
  )
}

export { DashboardPage }
