import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/home"
import { DashboardPage } from "./pages/dashboard"
import { LoginPage } from "./pages/login"
import { RequiredAuth } from "./components"
import { NotFound } from "./pages/404"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <RequiredAuth>
            <DashboardPage />
          </RequiredAuth>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
