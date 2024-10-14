import { createAppSlice } from "../../../app/createAppSlice"

type User = {
  id: string
  name: string
  email: string
}

type AuthSliceState = {
  user: User | null
  status: "idle" | "loading" | "failed"
  isAuthenticated: boolean
  error: string | null
}

const initialState: AuthSliceState = {
  user: null,
  status: "idle",
  isAuthenticated: false,
  error: null,
}

const authSlices = createAppSlice({
  name: "auth",
  initialState,
  reducers: create => ({
    login: create.reducer(state => {
      state.isAuthenticated = true
      state.user = {
        id: "1",
        name: "John Doe",
        email: "john.doe@gmail.com",
      }
    }),
    logout: create.reducer(state => {
      state.isAuthenticated = false
      state.user = null
    }),
  }),
  selectors: {
    selectUser: state => state.user,
    selectIsAuthenticated: state => state.isAuthenticated,
    selectStatus: state => state.status,
    selectError: state => state.error,
  },
})

const { login, logout } = authSlices.actions
const { selectUser, selectIsAuthenticated, selectStatus, selectError } =
  authSlices.selectors

export {
  authSlices,

  // actions
  login,
  logout,

  // selectors
  selectUser,
  selectIsAuthenticated,
  selectStatus,
  selectError,
}
