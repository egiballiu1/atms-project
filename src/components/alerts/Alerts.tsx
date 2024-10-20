import classNames from "classnames"
import { type ReactNode, useState, type FC } from "react"
import { XMarkIcon } from "@heroicons/react/20/solid"

type AlertProps = {
  alertType: "info" | "error" | "success" | "loading"
  title?: string
  description?: string | ReactNode
}

const alert = [
  "absolute",
  "top-5",
  "right-5",
  "rounded-2xl",
  "p-4",
  "grid",
  "grid-cols-[20px_1fr_20px]",
  "gap-2",
  "shadow-lg",
  "transition-all",
  "z-20"
]

const Alerts: FC<AlertProps> = ({ alertType, title, description }) => {
  const [closeAlert, setCloseAlert] = useState(false)

  const bgColor =
    alertType === "info"
      ? "bg-alert-info"
      : alertType === "error"
        ? "bg-alert-error"
        : "bg-alert-success"

  const icon =
    alertType === "info"
      ? "src/public/assets/icons/warning.svg"
      : alertType === "error"
        ? "src/public/assets/icons/error.svg"
        : "src/public/assets/icons/success.svg"

  if (closeAlert) return null

  return alertType !== "loading" ? (
    <div className={classNames(alert, bgColor)}>
      {
        <>
          <img src={icon} height={24} width={24} alt="alter icon" />
          <div className="flex flex-col gap-1 justify-start">
            <h4 className="font-medium text-sm">{title}</h4>
            <p className="text-sm">{description}</p>
          </div>
          <XMarkIcon
            onClick={() => setCloseAlert(true)}
            className="cursor-pointer"
          />
        </>
      }
    </div>
  ) : (
    <div
      className={classNames(
        alert,
        "flex items-center justify-center text-gray-900 font-medium px-4 py-2 rounded-md bg-white",
      )}
    >
      <svg
        className="animate-spin h-5 w-5 mr-3 "
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="#404040"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        ></path>
      </svg>
      {title ? title : "Loading..."}
    </div>
  )
}

export { Alerts }
