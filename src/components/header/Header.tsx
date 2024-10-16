import classNames from "classnames"

const container = [
  "px-4",
  "py-4",
  "lg:px-6",
  "lg:max-w-screen-lg",
  "xl:max-w-screen-xl",
  "mx-auto",
  "sticky",
  "top-0",
]

const Header = () => {
  return (
    <div className="header bg-primary sticky top-0">
      <a href="/" className={classNames(container)}>
        <img src="logo.svg" alt="ATMS logo" width={60} height={60} />
      </a>
    </div>
  )
}

export { Header }
