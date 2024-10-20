import { createAppSlice } from "../../../app/createAppSlice"
import type { User } from "../../../types"
import * as UserService from "../../../services/users"
import { getRandomAvatar } from "../../../services/utils"

type UsersSliceState = {
  users: User[]
  status: "idle" | "loading" | "failed"
  error?: string | null
}

const initialState: UsersSliceState = {
  users: [],
  status: "idle",
  error: null,
}

const usersSlices = createAppSlice({
  name: "users",
  initialState,
  reducers: create => ({
    createUser: create.asyncThunk(
      async (user: Omit<User, "id">) => {
        const avatar = getRandomAvatar()
        const response = await UserService.createUser({ ...user, avatar })

        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.users.push(action.payload)
        },
        rejected: (state, action) => {
          state.status = "failed"
          state.error = action.error.message
        },
      },
    ),
    getUsers: create.asyncThunk(
      async () => {
        const response = await UserService.getUsers()

        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.users = action.payload
        },
        rejected: (state, action) => {
          state.status = "failed"
          state.error = action.error.message
        },
      },
    ),
    getUser: create.asyncThunk(
      async (id: string) => {
        const response = await UserService.getUser(id)

        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.users.push(action.payload)
        },
        rejected: (state, action) => {
          state.status = "failed"
          state.error = action.error.message
        },
      },
    ),
    updateUser: create.asyncThunk(
      async (user: User) => {
        const response = await UserService.updateUser(user)

        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.users = state.users.map(user =>
            user.id === action.payload.id ? action.payload : user,
          )
        },
        rejected: (state, action) => {
          state.status = "failed"
          state.error = action.error.message
        },
      },
    ),
    deleteUser: create.asyncThunk(
      async (id: string) => {
        const response = await UserService.deleteUser(id)

        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.users = state.users.filter(user => user.id !== action.meta.arg)
        },
        rejected: (state, action) => {
          state.status = "failed"
          state.error = action.error.message
        },
      },
    ),
  }),
  selectors: {
    selectUsers: state => state.users,
    selectStatus: state => state.status,
    selectError: state => state.error,
    selectUserById: (state, id: string) =>
      state.users.find(user => user.id === id),
    selectUserByRole: (state, role: User["role"]) =>
      state.users.filter(user => user.role === role),
  },
})

const { createUser, getUsers, updateUser, deleteUser, getUser } =
  usersSlices.actions
const {
  selectUsers,
  selectUserById,
  selectUserByRole,
  selectStatus,
  selectError,
} = usersSlices.selectors

export {
  usersSlices,

  // actions
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,

  // selectors
  selectUsers,
  selectStatus,
  selectError,
  selectUserById,
  selectUserByRole,
}
