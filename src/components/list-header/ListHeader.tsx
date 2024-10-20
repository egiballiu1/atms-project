import classNames from "classnames"
import { type FC } from "react"
import { FormattedMessage } from "react-intl"

const card = [
  "hidden",
  "lg:grid",
  "grid-cols-2",
  "justify-between",
  "items-center",
  "border-4",
  "border-gray-light",
  "border-solid",
  "p-4",
  "rounded-xl",
  "w-auto",
  "cursor-pointer",
  "mb-4",
  "gap-2",
]

const text = ["font-medium", "text-base", "font-black"]

type ListHeaderProps = {
  type: "tasks-list" | "users-list"
}

const ListHeader: FC<ListHeaderProps> = ({ type }) => {
  return type === "tasks-list" ? (
    <div
      className={classNames(
        card,
        "lg:grid-cols-[1fr_0.8fr_0.8fr_1fr_0.8fr_0.2fr_0.4fr]",
      )}
    >
      <h3 className={classNames(text)}>
        <FormattedMessage id="task-header-list-title" />
      </h3>
      <h3 className={classNames(text)}>
        <FormattedMessage id="task-header-list-assigned-to" />
      </h3>
      <h3 className={classNames(text)}>
        <FormattedMessage id="task-header-list-status" />
      </h3>
      <h3 className={classNames(text)}>
        <FormattedMessage id="task-header-list-description" />
      </h3>
      <h3 className={classNames(text)}>
        <FormattedMessage id="task-header-list-date-created" />
      </h3>
      <h3 className={classNames(text)}>
        <FormattedMessage id="task-header-list-priority" />
      </h3>
    </div>
  ) : (
    <div className={classNames(card, "grid-cols-[1fr_1fr_1fr_1fr_0.5fr]")}>
      <h3 className={classNames(text)}>
        <FormattedMessage id="user-header-list-username" />
      </h3>
      <h3 className={classNames(text)}>
        <FormattedMessage id="user-header-list-email" />
      </h3>
      <h3 className={classNames(text)}>
        <FormattedMessage id="user-header-list-role" />
      </h3>
      <h3 className={classNames(text)}>
        <FormattedMessage id="user-header-list-date-avatar" />
      </h3>
    </div>
  )
}

export { ListHeader }
