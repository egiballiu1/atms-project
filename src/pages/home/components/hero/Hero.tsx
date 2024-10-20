import classNames from "classnames"
import { Button } from "../../../../components"
import { FormattedMessage } from "react-intl"
import { useLocation, useNavigate } from "react-router-dom"

const container = [
  "p-4",
  "lg:p-6",
  "lg:max-w-screen-lg",
  "xl:max-w-screen-xl",
  "mx-auto",
  "grid",
  "grid-cols-1",
  "lg:grid-cols-[55%_40%]",
  "gap-4",
  "lg:gap-10",
  "items-center",
  "justify-between",
  "h-full",
]
const title = [
  "text-black",
  "text-center",
  "text-3xl",
  "lg:text-5xl",
  "lg:text-left",
  "pb-6",
  "font-bold",
  "xl:w-4/5",
]
const subtitle = ["text-black", "text-center", "lg:text-left", "pb-10"]

const Hero = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className={classNames(container)}>
      <div className="flex flex-col items-center lg:items-start">
        <h1 className={classNames(title)}>
          <FormattedMessage id="hp-hero-title" />
        </h1>
        <h3 className={classNames(subtitle)}>
          <FormattedMessage id="hp-hero-subtitle" />
        </h3>
        <Button
          label={<FormattedMessage id="login" />}
          buttonStyle="secondary"
          onClick={() =>
            navigate("/login", { state: { from: location }, replace: true })
          }
        />
      </div>
      <img
        src="/src/public/assets/atms.svg"
        alt="ATSM logo"
        width={500}
        height={350}
        className="m-auto"
      />
    </div>
  )
}

export { Hero }
