import classNames from "classnames"
import { Footer } from "../footer"
import { Header } from "../header"
import type { PropsWithChildren } from "react"

type LayoutProps = PropsWithChildren

const layoutContainer = [
  "px-4",
  "lg:px-6",
  "lg:max-w-screen-lg",
  "xl:max-w-screen-xl",
  "mx-auto",
]

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-[100vh] flex flex-col justify-between">
      <Header />
      <main className={classNames(layoutContainer)}>
        {children as JSX.Element | JSX.Element[]}
      </main>
      <Footer />
    </div>
  )
}

export { Layout }
