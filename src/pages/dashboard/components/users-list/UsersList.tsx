import { useEffect, type FC } from "react"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import {
  deleteUser,
  getUsers,
  selectUsers,
} from "../../../../store/slices/users"
import { Button } from "../../../../components"

const UsersList: FC = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectUsers)

  const handleDelete = (id: string) => {
    dispatch(deleteUser(id))
  }

  useEffect(() => {
    dispatch(getUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return users.map(user => (
    <div key={user.id}>
      {JSON.stringify(user)}
      <Button
        label="DELETE"
        buttonStyle="primary"
        onClick={() => handleDelete(user.id)}
      />
    </div>
  ))
}

export { UsersList }
