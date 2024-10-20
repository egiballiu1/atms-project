import { configureStore } from "@reduxjs/toolkit"
import type { AuthSliceState } from "./authSlices"
import {
  authSlices,
  logout,
  selectError,
  selectIsAuthenticated,
  selectStatus,
  selectUser,
} from "./authSlices"

jest.mock("js-cookie", () => ({
  set: jest.fn(),
  remove: jest.fn(),
}))
jest.mock("../../../services/auth", () => ({
  login: jest.fn(),
  logout: jest.fn(),
}))

describe("authSlices", () => {
  let store: any

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authSlices.reducer,
      },
    })
  })

  it("should handle logout", () => {
    store.dispatch(logout())
    const state = store.getState().auth
    expect(state.isAuthenticated).toBe(false)
    expect(state.user).toBeNull()
  })

  it("should select user", () => {
    const auth = {
      user: { id: 1, name: "John Doe" },
      status: "idle",
      isAuthenticated: true,
      error: null,
    } as unknown as AuthSliceState

    expect(selectUser({ auth })).toEqual({ id: 1, name: "John Doe" })
  })

  it("should select isAuthenticated", () => {
    const auth = {
      user: { id: 1, name: "John Doe" },
      status: "idle",
      isAuthenticated: true,
      error: null,
    } as unknown as AuthSliceState

    expect(selectIsAuthenticated({ auth })).toBe(true)
  })

  it("should select status", () => {
    const auth = {
      user: { id: 1, name: "John Doe" },
      status: "loading",
      isAuthenticated: true,
      error: null,
    } as unknown as AuthSliceState

    expect(selectStatus({ auth })).toBe("loading")
  })

  it("should select error", () => {
    const auth = {
      user: { id: 1, name: "John Doe" },
      status: "failed",
      isAuthenticated: false,
      error: "Invalid credentials",
    } as unknown as AuthSliceState

    expect(selectError({ auth })).toBe("Invalid credentials")
  })
})
