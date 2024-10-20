import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getTasks, selectTasks } from "../../store/slices/tasks"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts"
import type { Task } from "../../types"
import { FormattedMessage } from "react-intl"

const allStatuses: NonNullable<Task["status"]>[] = [
  "to-do",
  "in-progress",
  "blocked",
  "testing",
  "done",
]

const priorities: NonNullable<Task["priority"]>[] = ["low", "medium", "high"]

const Charts = () => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(selectTasks)

  useEffect(() => {
    dispatch(getTasks())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const groupTasksByStatus = tasks.reduce(
    (acc, task) => {
      const status = task.status || "unknown"
      if (!acc[status]) {
        acc[status] = []
      }
      acc[status].push(task)
      return acc
    },
    {} as Record<string, Task[]>,
  )

  const groupTasksByPriority = tasks.reduce(
    (acc, task) => {
      const priority = task.priority || "unknown"
      if (!acc[priority]) {
        acc[priority] = []
      }
      acc[priority].push(task)
      return acc
    },
    {} as Record<string, Task[]>,
  )

  const tasksByStatus = allStatuses.map(status => ({
    status,
    count: groupTasksByStatus[status]?.length || 0,
  }))

  const tasksByPriority = priorities.map(priority => ({
    priority,
    count: groupTasksByPriority[priority]?.length || 0,
  }))

  return (
    <div className="grid">
      <div className="mb-10">
        <h3 className="font-bold pb-4">
          <FormattedMessage id="chart-tasks-by-status" />
        </h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={330} height={250} data={tasksByStatus}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="count" fill="#ff7300" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div>
        <h3 className="font-bold pb-4">
          <FormattedMessage id="chart-tasks-by-priority" />
        </h3>
        <PieChart width={330} height={250}>
          <Pie
            data={tasksByPriority}
            dataKey="count"
            nameKey="priority"
            outerRadius={100}
            fill="#82ca9d"
            label
            className="max-w-300"
          />
          <Tooltip />
        </PieChart>
      </div>
    </div>
  )
}

export { Charts }
