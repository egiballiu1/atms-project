import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import { store } from "./app/store"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { IntlProvider } from "react-intl"
import messagesIt from "./translations/it.json"
import messagesDe from "./translations/de.json"
import messagesEn from "./translations/en.json"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  const messages: Record<"de" | "it" | "en", Record<string, string>> = {
    de: messagesDe,
    it: messagesIt,
    en: messagesEn,
  }

  const language = navigator.language.split(/[-_]/)[0] as "de" | "it" | "en"

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <IntlProvider locale={language} messages={messages[language]}>
            <App />
          </IntlProvider>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
