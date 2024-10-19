import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/home"
import { DashboardPage } from "./pages/dashboard"
import { LoginPage } from "./pages/login"
import { RequiredAuth } from "./components"
import { NotFound } from "./pages/404"
import { useAppSelector } from "./app/hooks"
import { selectLanguage } from "./store/slices/languages"
import messagesIt from "./translations/it.json"
import messagesDe from "./translations/de.json"
import messagesEn from "./translations/en.json"
import { IntlProvider } from "react-intl"

const messages: Record<"de" | "it" | "en", Record<string, string>> = {
  de: messagesDe,
  it: messagesIt,
  en: messagesEn,
}

const App = () => {
  const locale = useAppSelector(selectLanguage) as "de" | "it" | "en"

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
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
    </IntlProvider>
  )
}

export default App
