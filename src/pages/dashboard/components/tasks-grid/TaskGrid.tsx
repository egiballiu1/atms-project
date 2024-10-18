import { useEffect } from "react"
import { useAppDispatch } from "../../../../app/hooks"
import { getTasks } from "../../../../store/slices/tasks"

const TaskGrid = () => {
  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(getTasks())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div>{}</div>
}

export { TaskGrid }
