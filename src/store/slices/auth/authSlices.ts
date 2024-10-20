import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import { createAppSlice } from "../../../app/createAppSlice"
import * as AuthService from "../../../services/auth"
import type { User } from "../../../types"

type AuthSliceState = {
  user: User | null
  status: "idle" | "loading" | "failed"
  isAuthenticated: boolean
  error?: string | null
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
    login: create.asyncThunk(
      async (body: { username: string; password: string }) => {
        const response = await AuthService.login(body)
        const user = jwtDecode(response.token) as User

        Cookies?.set(`atms-token`, response.token, {
          expires: 1,
          secure: true,
        })

        return user
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.user = action.payload
          state.isAuthenticated = true
        },
        rejected: (state, action) => {
          state.status = "failed"
          state.error = action.error.message
          state.isAuthenticated = false
          state.user = null
        },
      },
    ),
    logout: create.reducer(state => {
      state.isAuthenticated = false
      state.user = null
      Cookies?.remove(`atms-token`)
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

export type { AuthSliceState }
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
