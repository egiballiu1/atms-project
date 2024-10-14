import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { HomePage } from "./pages/home"
import { DashboardPage } from "./pages/dashboard"
import { LoginPage } from "./pages/login"

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/dashboard", element: <DashboardPage /> },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
