import { createAppSlice } from "../../../app/createAppSlice"
import type { Task } from "../../../types"
import * as TaskService from "../../../services/tasks"
import type { PayloadAction } from "@reduxjs/toolkit"

type TasksSliceState = {
  filteredTasks: Task[]
  tasks: Task[]
  status: "idle" | "loading" | "failed"
  error?: string | null
}

const initialState: TasksSliceState = {
  filteredTasks: [],
  tasks: [],
  status: "idle",
  error: null,
}

const tasksSlices = createAppSlice({
  name: "tasks",
  initialState,
  reducers: create => ({
    createTask: create.asyncThunk(
      async (task: Omit<Task, "id">) => {
        const createdDate = new Date()
        const response = await TaskService.createTask({ ...task, createdDate })

        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.tasks.push(action.payload)
          state.filteredTasks.push(action.payload)
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
          state.filteredTasks = action.payload
        },
        rejected: (state, action) => {
          state.status = "failed"
          state.error = action.error.message
        },
      },
    ),
    getTask: create.asyncThunk(
      async (id: string) => {
        const response = await TaskService.getTask(id)

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
          state.filteredTasks = state.filteredTasks.map(filterdTask =>
            filterdTask.id === action.payload.id ? action.payload : filterdTask,
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
          state.filteredTasks = state.filteredTasks.filter(
            filteredTask => filteredTask.id !== action.payload,
          )
        },
        rejected: (state, action) => {
          state.status = "failed"
          state.error = action.error.message
        },
      },
    ),
    filterTasks: create.reducer(
      (
        state,
        action: PayloadAction<{
          status?: Task["status"]
          search?: string
          userId?: Task["userId"]
        }>,
      ) => {
        const { status, search, userId } = action.payload

        if (!status && !search && !userId) {
          state.filteredTasks = state.tasks
          return
        }

        let filterTasks = state.tasks

        if (status) {
          filterTasks = state.tasks.filter(task => task.status === status)
        }

        if (search) {
          filterTasks = filterTasks.filter(task =>
            task.name.toLowerCase().includes(search.toLowerCase()),
          )
        }

        if (userId) {
          filterTasks = filterTasks.filter(task => task.userId === userId)
        }

        state.filteredTasks = filterTasks
      },
    ),
  }),
  selectors: {
    selectTasks: state => state.tasks,
    selectStatus: state => state.status,
    selectError: state => state.error,
    selectTaskById: (state, id: string) =>
      state.tasks.find(task => task.id === id),
    selectFilteredTasks: state => state.filteredTasks,
  },
})

const { createTask, getTasks, updateTask, deleteTask, filterTasks, getTask } =
  tasksSlices.actions

const {
  selectTasks,
  selectStatus,
  selectError,
  selectFilteredTasks,
  selectTaskById,
} = tasksSlices.selectors

export {
  tasksSlices,

  // actions
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  filterTasks,
  getTask,

  // selectors
  selectTasks,
  selectStatus,
  selectError,
  selectTaskById,
  selectFilteredTasks,
}
