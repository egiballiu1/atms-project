import { Fragment, useEffect, type FC } from "react"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { getTasks, selectFilteredTasks } from "../../../../store/slices/tasks"
import { ListCard, ListHeader } from "../../../../components"
import { FormattedMessage } from "react-intl"

const TasksList: FC = () => {
  const dispatch = useAppDispatch()
  const filteredTasks = useAppSelector(selectFilteredTasks)

  useEffect(() => {
    dispatch(getTasks())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <ListHeader type="tasks-list" />

        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <Fragment key={task.id}>
              <ListCard
                id={task.id}
                name={task.name}
                status={task.status}
                userId={task.userId}
                description={task.description}
                priority={task.priority}
              />
            </Fragment>
          ))
        ) : (
          <p><FormattedMessage id="no-tasks-found" /></p>
        )}
  
    </>
  )
}

export { TasksList }
