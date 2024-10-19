import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react"
import { Field, Input } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import {
  filterTasks,
  getTasks,
  selectFilteredTasks,
} from "../../../../store/slices/tasks"
import { getUsers, selectUsers } from "../../../../store/slices/users"
import type { FC } from "react"
import { Fragment, useEffect, useState } from "react"
import type { Task, User } from "../../../../types"
import { ListCard } from "../../../../components/cards"
import classNames from "classnames"
import { ListHeader, Modal } from "../../../../components"
import { TaskCreateForm } from "../task-create-form"

const filterContainer = [
  "grid",
  "grid-cols-1",
  "lg:grid-cols-[1fr_1fr_2fr]",
  "gap-4",
  "justify-between",
  "items-center",
]

const statusOptions: Task["status"][] = [
  "to-do",
  "in-progress",
  "blocked",
  "testing",
  "done",
]

const TasksFilter: FC = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectUsers)
  const filteredTasks = useAppSelector(selectFilteredTasks)

  const [search, setSearch] = useState<string>()
  const [selectedUserId, setSelectedUserId] = useState<User["id"]>()
  const [statusSelected, setstatusSelected] = useState<Task["status"]>()

  useEffect(() => {
    dispatch(getUsers())
    dispatch(getTasks())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    dispatch(
      filterTasks({ status: statusSelected, search, userId: selectedUserId }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusSelected, search, selectedUserId])

  return (
    <>
      <div className={classNames(filterContainer)}>
        <div className="w-full max-w-md px-4">
          <Field>
            <Input
              value={search}
              onChange={handleSearchTerm}
              className={classNames(
                "block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-gray-900",
                "relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
              )}
            />
          </Field>
        </div>

        <Listbox value={statusSelected} onChange={setstatusSelected}>
          <div className="relative">
            <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className="ml-3 block truncate">
                  {!statusSelected
                    ? "All statuses"
                    : statusSelected || "Select status"}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-400"
                />
              </span>
            </ListboxButton>

            <ListboxOptions
              transition
              className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
            >
              <ListboxOption
                value={"all-statuses"}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
              >
                <div className="flex items-center">
                  <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                    {"All status"}
                  </span>
                </div>

                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                  <CheckIcon aria-hidden="true" className="h-5 w-5" />
                </span>
              </ListboxOption>

              {statusOptions.map(status => (
                //WIP - fix user name on select
                <ListboxOption
                  key={status}
                  value={status}
                  className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                >
                  <div className="flex items-center">
                    <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                      {status}
                    </span>
                  </div>

                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                    <CheckIcon aria-hidden="true" className="h-5 w-5" />
                  </span>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>

        <Listbox value={selectedUserId} onChange={setSelectedUserId}>
          <div className="relative">
            <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className="ml-3 block truncate">
                  {!selectedUserId
                    ? "All users"
                    : selectedUserId || "Select user"}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-400"
                />
              </span>
            </ListboxButton>

            <ListboxOptions
              transition
              className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
            >
              <ListboxOption
                value={"all-users"}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
              >
                <div className="flex items-center">
                  <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                    {"All users"}
                  </span>
                </div>

                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                  <CheckIcon aria-hidden="true" className="h-5 w-5" />
                </span>
              </ListboxOption>
              {users.map(user => (
                //WIP - fix user name on select
                <ListboxOption
                  key={user.id}
                  value={user.id}
                  className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                >
                  <div className="flex items-center">
                    <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                      {user.name}
                    </span>
                  </div>

                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                    <CheckIcon aria-hidden="true" className="h-5 w-5" />
                  </span>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>

        <div className="ml-auto">
          <Modal label={"Add task"}>
            <TaskCreateForm />
          </Modal>
        </div>
      </div>

      <ListHeader type="tasks-list" />
      <div className="mt-10">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <Fragment key={task.id}>
              <ListCard
                id={task.id}
                name={task.name}
                status={task.status}
                userId={task.userId}
                description={task.description}
                priority={task.priority}
              />
            </Fragment>
          ))
        ) : (
          <p>No tasks found</p>
        )}
      </div>
    </>
  )
}

export { TasksFilter }
