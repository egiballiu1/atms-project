import { Fragment, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logout } from "../../store/slices/auth"
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  selectTasks,
} from "../../store/slices/tasks"
import { Layout } from "../../components/layout"
import { Button, GridCard, Select } from "../../components"
import type { Task } from "../../types"

const DashboardPage = () => {
  const dispatch = useAppDispatch()

  const tasks = useAppSelector(selectTasks)

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleTaskCreation = () => {
    dispatch(
      createTask({
        userId: "user555",
        priority: "low",
        status: "blocked",
        name: "JWT",
        description: "Testing actions",
      }),
    )
  }

  const handleTaskUpdation = () => {
    dispatch(
      updateTask({
        id: "task123",
        userId: "userUPDATED",
        priority: "medium",
        status: "to-do",
        name: "UPDATED : Implement authentication",
        description: "Develop the authentication module for the application.",
      }),
    )
  }

  const handleTaskDeletion = () => {
    dispatch(deleteTask("task123"))
  }

  useEffect(() => {
    dispatch(getTasks())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      <Select />

      <div className="grid grid-cols-4 justify-between gap-4 mb-6">
        <Button
          buttonStyle="secondary"
          onClick={handleTaskCreation}
          label="Create Task"
        />
        <Button
          buttonStyle="secondary"
          onClick={handleTaskUpdation}
          label="Update Task"
        />
        <Button
          buttonStyle="secondary"
          onClick={handleTaskDeletion}
          label="Delete Task"
        />
        <Button buttonStyle="primary" onClick={handleLogout} label="Logout" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 justify-between gap-4">
        {tasks.map((task: Task) => {
          return (
            <Fragment key={task.id}>
              <GridCard
                id={task.id}
                name={task.name}
                userId={"src/public/assets/icons/boy.svg"}
                status={task.status}
                description={task.description}
              />
            </Fragment>
          )
        })}
      </div>
    </Layout>
  )
}

export { DashboardPage }
