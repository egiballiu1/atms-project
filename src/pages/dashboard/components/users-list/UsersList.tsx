import { useEffect, type FC } from "react"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { getUsers, selectUsers } from "../../../../store/slices/users"
import { UserListItem } from "../user-list-item"
import { ListHeader, Modal } from "../../../../components"
import { UserCreateForm } from "../user-create-form"

const UsersList: FC = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectUsers)

  useEffect(() => {
    dispatch(getUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col gap-5 ">
      <div className="ml-auto">
        <Modal label="Add user" modalTitle="Add a new user">
          <UserCreateForm />
        </Modal>
      </div>

      <div>
        <ListHeader type="users-list" />
        {users.map(user => (
          <div key={user.id}>
            <UserListItem
              id={user.id}
              name={user.name}
              email={user.email}
              role={user.role}
              avatar={user.avatar}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export { UsersList }
