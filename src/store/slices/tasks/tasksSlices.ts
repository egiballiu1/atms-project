import { createAppSlice } from "../../../app/createAppSlice"
import type { Task } from "../../../types"
import * as TaskService from "../../../services/tasks"

type TasksSliceState = {
  tasks: Task[]
  status: "idle" | "loading" | "failed"
  error?: string | null
}

const initialState: TasksSliceState = {
  tasks: [],
  status: "idle",
  error: null,
}

const tasksSlices = createAppSlice({
  name: "tasks",
  initialState,
  reducers: create => ({
    createTask: create.asyncThunk(
      async (task: Task) => {
        const response = await TaskService.createTask(task)

        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.tasks.push(action.payload)
        },
        rejected: (state, action) => {
          state.status = "failed"
          state.error = action.error.message
        },
      },
    ),
    getTasks: create.asyncThunk(
      async () => {
        const response = await TaskService.getTasks()

        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.tasks = action.payload
        },
        rejected: (state, action) => {
          state.status = "failed"
          state.error = action.error.message
        },
      },
    ),
    updateTask: create.asyncThunk(
      async (task: Task) => {
        const response = await TaskService.updateTask(task)

        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.tasks = state.tasks.map(task =>
            task.id === action.payload.id ? action.payload : task,
          )
        },
        rejected: (state, action) => {
          state.status = "failed"
          state.error = action.error.message
        },
      },
    ),
    deleteTask: create.asyncThunk(
      async (id: string) => {
        await TaskService.deleteTask(id)

        return id
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.tasks = state.tasks.filter(task => task.id !== action.payload)
        },
        rejected: (state, action) => {
          state.status = "failed"
          state.error = action.error.message
        },
      },
    ),
  }),
  selectors: {
    selectTasks: state => state.tasks,
    selectStatus: state => state.status,
    selectError: state => state.error,
    selectTasksByStatus: (state, status: Task["status"]) =>
      state.tasks.filter(task => task.status === status),
  },
})

const { createTask, getTasks, updateTask, deleteTask } = tasksSlices.actions
const { selectTasks, selectStatus, selectError, selectTasksByStatus } =
  tasksSlices.selectors

export {
  tasksSlices,

  // actions
  createTask,
  getTasks,
  updateTask,
  deleteTask,

  // selectors
  selectTasks,
  selectStatus,
  selectError,
  selectTasksByStatus,
}
