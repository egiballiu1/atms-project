import { useEffect, useState, type FC } from "react"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import {
  getTasks,
  selectFilteredTasks,
} from "../../../../store/slices/tasks"
import { ListCard, ListHeader } from "../../../../components"
import { FormattedMessage } from "react-intl"
import { Reorder } from "framer-motion"

const TasksList: FC = () => {
  const dispatch = useAppDispatch()
  const filteredTasks = useAppSelector(selectFilteredTasks)

  const [orderTasks, setOrderTasks] = useState(filteredTasks)

  useEffect(() => {
    dispatch(getTasks())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setOrderTasks(filteredTasks)
  }, [filteredTasks])

  return (
    <>
      <ListHeader type="tasks-list" />

      <Reorder.Group axis="y" values={filteredTasks} onReorder={setOrderTasks}>
        {orderTasks.length > 0 ? (
          orderTasks.map(task => (
            <Reorder.Item key={task.id} value={task}>
              <ListCard
                id={task.id}
                name={task.name}
                status={task.status}
                userId={task.userId}
                description={task.description}
                priority={task.priority}
              />
            </Reorder.Item>
          ))
        ) : (
          <p>
            <FormattedMessage id="no-tasks-found" />
          </p>
        )}
      </Reorder.Group>
    </>
  )
}

export { TasksList }
