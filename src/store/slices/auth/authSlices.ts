import { createAppSlice } from "../../../app/createAppSlice"
import * as AuthService from "../../../services/auth"

type User = {
  id: string
  name: string
  email: string
}

type AuthSliceState = {
  user: User | null
  status: "idle" | "loading" | "failed"
  isAuthenticated: boolean
  error?: string | null
  token: string | null
}

const initialState: AuthSliceState = {
  user: null,
  status: "idle",
  isAuthenticated: false,
  error: null,
  token: null,
}

const authSlices = createAppSlice({
  name: "auth",
  initialState,
  reducers: create => ({
    login: create.asyncThunk(
      async (body: { username: string; password: string }) => {
        const response = await AuthService.login(body)
        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.token = action.payload.token
        },
        rejected: (state, action) => {
          state.status = "failed"
          state.error = action.error.message
        },
      },
    ),
    logout: create.reducer(state => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
    }),
  }),
  selectors: {
    selectUser: state => state.user,
    selectToken: state => state.token,
    selectIsAuthenticated: state => state.isAuthenticated,
    selectStatus: state => state.status,
    selectError: state => state.error,
  },
})

const { login, logout } = authSlices.actions
const {
  selectUser,
  selectToken,
  selectIsAuthenticated,
  selectStatus,
  selectError,
} = authSlices.selectors

export {
  authSlices,

  // actions
  login,
  logout,

  // selectors
  selectUser,
  selectToken,
  selectIsAuthenticated,
  selectStatus,
  selectError,
}
