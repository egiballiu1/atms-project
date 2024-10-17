import { GridCard } from "../../components"

const DashboardPageGrid = () => {
  return (
    //WIP
    <div className="grid grid-cols-1 lg:grid-cols-4 justify-between gap-4">
      <GridCard
        id="1"
        name={"Set up project"}
        userId={"src/public/assets/icons/boy.svg"}
        priority="low"
        description="This should be the description of the task explaining further details about it"
      />
      <GridCard
        id="2"
        name={"Set up json-server"}
        userId={"src/public/assets/icons/woman.svg"}
        status="to-do"
         priority="medium"
        description="This should be the description of the task explaining further details about it.This should be the description of the task explaining further details about it"
      />
      <GridCard
        id="3"
        name={"Authentication"}
        userId={"src/public/assets/icons/girl.svg"}
        status="blocked"
         priority="high"
        description="short description"
      />
    </div>
  )
}

export { DashboardPageGrid }
