import classNames from "classnames"
import { Fragment } from "react/jsx-runtime"

type ButtonProps = {
  label: string
  url?: string
  type?: "button" | "submit" | "reset"
  buttonStyle: "primary" | "secondary"
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const button = [
  "py-2",
  "px-4",
  "w-fit",
  "rounded-2xl",
  "font-bold",
  "uppercase",
  "cursor-pointer",
  "border-2",
  "border-primary",
  "hover:border-primary-50",
  "transition-all",
]
const Button: React.FC<ButtonProps> = ({
  label,
  url,
  buttonStyle = "primary",
  type = "button",
  onClick,
  ...props
}) => {
  return (
    <Fragment>
      {url ? (
        <a
          href={url}
          {...props}
          className={classNames(
            button,
            `button ${buttonStyle === "primary" ? "bg-primary text-white hover:bg-primary-50" : "text-primary bg-white"}`,
          )}
        >
          {label}
        </a>
      ) : (
        <button
          type={type}
          onClick={onClick ? onClick : undefined}
          {...props}
          className={classNames(
            button,
            `button ${buttonStyle === "primary" ? "bg-primary text-white hover:bg-primary-50" : "text-primary bg-white"}`,
          )}
        >
          {label}
        </button>
      )}
    </Fragment>
  )
}

export { Button }
