import { useEffect, type FC } from "react"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import {
  deleteTask,
  getTasks,
  selectTasks,
} from "../../../../store/slices/tasks"
import { Button } from "../../../../components"

const TasksList: FC = () => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(selectTasks)

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id))
  }

  useEffect(() => {
    dispatch(getTasks())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return tasks.map(task => (
    <div key={task.id}>
      {JSON.stringify(task)}
      <Button
        label="DELETE"
        buttonStyle="primary"
        onClick={() => handleDelete(task.id)}
      />
    </div>
  ))
}

export { TasksList }
