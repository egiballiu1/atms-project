import classNames from "classnames"
import { Button } from "../../components/button"
import { Layout } from "../../components/layout"
import { GridCard, ListCard } from "../../components/cards"

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
const HomePage = () => {
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-[55%_40%] gap-4 lg:gap-10 items-center justify-between py-4">
        <div className="flex flex-col items-center lg:items-start">
          <h1 className={classNames(title)}>
            Advanced Tasks Management System
          </h1>
          <h3 className={classNames(subtitle)}>
            Master Your Tasks, Optimize Your Time.
          </h3>
          <Button label="Login" url="/login" buttonStyle="secondary" />
        </div>
        <img
          src="/src/public/assets/atms.svg"
          alt="ATSM logo"
          width={500}
          height={350}
          className="m-auto"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 justify-between gap-4">
        <GridCard
          id="1"
          name={"Set up project"}
          userId={"src/public/assets/icons/boy.svg"}
          description="This should be the description of the task explaining further details about it"
        />
        <GridCard
          id="2"
          name={"Set up json-server"}
          userId={"src/public/assets/icons/woman.svg"}
          status="to-do"
          description="This should be the description of the task explaining further details about it.This should be the description of the task explaining further details about it"
        />
        <GridCard
          id="3"
          name={"Authentication"}
          userId={"src/public/assets/icons/girl.svg"}
          status="blocked"
          description="short description"
        />
      </div>

      <div className="mt-10">
        TASKS ON LIST
        <ListCard
          id="1"
          name={"Set up project"}
          userId={"src/public/assets/icons/boy.svg"}
          description="This should be the description of the task explaining further details about it"
        />
        <ListCard
          id="2"
          name={"Set up json-server"}
          userId={"src/public/assets/icons/woman.svg"}
          status="to-do"
          description="This should be the description of the task explaining further details about it.This should be the description of the task explaining further details about it"
        />
      </div>
    </Layout>
  )
}

export { HomePage }
