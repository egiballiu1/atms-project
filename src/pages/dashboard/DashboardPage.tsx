import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logout } from "../../store/slices/auth"
import {
  createTask,
  getTasks,
  selectTasks,
  selectTasksByStatus,
} from "../../store/slices/tasks"
import { Layout } from "../../components/layout"

const DashboardPage = () => {
  const dispatch = useAppDispatch()

  const tasks = useAppSelector(selectTasks)
  const todoTasks = useAppSelector(state =>
    selectTasksByStatus(state, "blocked"),
  )

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleTaskCreation = () => {
    dispatch(
      createTask({
        id: "task123",
        userId: "user123",
        priority: "high",
        status: "to-do",
        name: "Implement authentication",
        description: "Develop the authentication module for the application.",
      }),
    )
  }

  useEffect(() => {
    dispatch(getTasks())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      <div>
        <pre>{JSON.stringify(tasks)}</pre>
      </div>
      <div>
        <pre>{JSON.stringify(todoTasks)}</pre>
      </div>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleTaskCreation}>Create Task</button>
    </Layout>
  )
}

export { DashboardPage }
