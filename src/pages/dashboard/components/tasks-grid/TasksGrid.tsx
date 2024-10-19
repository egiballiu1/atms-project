import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import type { Task } from "../../../../types"
import { getTasks, selectFilteredTasks } from "../../../../store/slices/tasks"
import { GridCard } from "../../../../components"
import { FormattedMessage } from "react-intl"

const allStatuses: NonNullable<Task["status"]>[] = [
  "to-do",
  "in-progress",
  "blocked",
  "testing",
  "done",
]

const TasksGrid = () => {
  const dispatch = useAppDispatch()
  const filteredTasks = useAppSelector(selectFilteredTasks)

  useEffect(() => {
    dispatch(getTasks())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const groupedTasksByStatus = filteredTasks.reduce(
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

  return (
    <div className="flex m-2 w-full overflow-scroll">
      {allStatuses.map(status => (
        <div
          key={status}
          className="min-h-[100px] flex flex-col bg-[#f3f3f3] min-w-[341px] rounded-md p-4 mr-[45px] last-of-type:mr-0 gap-3"
        >
          <h2 className="font-bold mb-6">
            {status
              .replace("-", " ")
              .replace(/\b\w/g, char => char.toUpperCase())}
          </h2>
          {groupedTasksByStatus[status]?.length ? (
            groupedTasksByStatus[status].map(task => (
              <GridCard
                id={task.id}
                userId={task.userId}
                status={task.status}
                priority={task.priority}
                name={task.name}
                description={task.description}
              />
            ))
          ) : (
            <p className="text-gray-500">
              <FormattedMessage id="no-tasks-found-grid" />
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

export { TasksGrid }
